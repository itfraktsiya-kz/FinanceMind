// controllers/uploadController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');

class UploadController {
    // ============================================================================
    // ЗАГРУЗКА ФАЙЛА
    // ============================================================================
    uploadFile = async (req, res) => {
        try {
            console.log('======================================================================');
            console.log('📥 ЗАГРУЗКА ФАЙЛА');
            console.log('======================================================================');
            console.log('📄 Файл:', req.file?.originalname);
            console.log('📏 Размер:', req.file?.size, 'байт');
            console.log('👤 Пользователь:', req.body.userId || req.user?.id || 'test123');
            
            const file = req.file;
            const userId = req.body.userId || req.user?.id || 'test123';
            
            if (!file) {
                return res.status(400).json({
                    success: false,
                    error: 'Файл не выбран'
                });
            }
            
            // Парсим файл
            const result = await this.parseFile(file.path, file.originalname);
            const transactions = result.transactions || [];
            
            console.log(`📊 Найдено ${transactions.length} транзакций`);
            
            if (transactions.length === 0) {
                return res.status(400).json({
                    success: false,
                    error: 'Не удалось распознать транзакции в файле'
                });
            }
            
            // ================================================================
            // ✅ СОХРАНЯЕМ ТРАНЗАКЦИИ В БД
            // ================================================================
            let savedCount = 0;
            let errors = [];
            
            for (const tx of transactions) {
                try {
                    const amount = parseFloat(tx.amount) || 0;
                    const type = tx.type || (amount > 0 ? 'income' : 'expense');
                    const category = tx.category || 'Другое';
                    const description = tx.description || tx.merchant || 'Операция';
                    
                    // Определяем дату
                    let date = tx.date ? new Date(tx.date) : new Date();
                    if (isNaN(date.getTime())) {
                        date = new Date();
                    }
                    
                    await prisma.transaction.create({
                        data: {
                            userId: userId,
                            amount: Math.abs(amount),
                            type: type,
                            category: category,
                            description: description,
                            date: date,
                            createdAt: new Date()
                        }
                    });
                    savedCount++;
                } catch (err) {
                    console.error('❌ Ошибка сохранения транзакции:', err.message);
                    errors.push(err.message);
                }
            }
            
            console.log(`✅ СОХРАНЕНО ${savedCount} из ${transactions.length} транзакций в БД`);
            
            // Проверяем результат
            const totalInDb = await prisma.transaction.count({
                where: { userId: userId }
            });
            console.log(`📊 Всего транзакций для пользователя ${userId}: ${totalInDb}`);
            
            // Статистика
            const incomeAgg = await prisma.transaction.aggregate({
                where: { 
                    userId: userId, 
                    type: 'income' 
                },
                _sum: { amount: true }
            });
            const expenseAgg = await prisma.transaction.aggregate({
                where: { 
                    userId: userId, 
                    type: 'expense' 
                },
                _sum: { amount: true }
            });
            
            const totalIncome = incomeAgg._sum.amount || 0;
            const totalExpense = expenseAgg._sum.amount || 0;
            
            console.log(`📈 Всего доходов: ${totalIncome} ₸`);
            console.log(`📉 Всего расходов: ${totalExpense} ₸`);
            console.log(`💰 Баланс: ${totalIncome - totalExpense} ₸`);
            
            // ================================================================
            
            res.json({
                success: true,
                message: `Загружено ${savedCount} транзакций`,
                transactions: transactions.slice(0, 20),
                total: savedCount,
                totalInDb: totalInDb,
                income: totalIncome,
                expense: totalExpense,
                balance: totalIncome - totalExpense,
                errors: errors.length > 0 ? errors : undefined
            });
            
        } catch (error) {
            console.error('❌ Ошибка загрузки:', error);
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    };
    
    // ============================================================================
    // ПАРСИНГ ФАЙЛА
    // ============================================================================
    async parseFile(filePath, fileName) {
        console.log('📄 Парсинг файла:', fileName);
        
        try {
            // PDF
            if (fileName.toLowerCase().endsWith('.pdf')) {
                return await this.parsePDF(filePath);
            }
            
            // Excel / CSV
            if (fileName.toLowerCase().match(/\.(xlsx|xls|csv)$/)) {
                return await this.parseExcel(filePath);
            }
            
            // TXT
            if (fileName.toLowerCase().endsWith('.txt')) {
                return await this.parseTXT(filePath);
            }
            
            console.warn('⚠️ Неподдерживаемый формат файла');
            return { transactions: [], income: 0, expense: 0 };
            
        } catch (error) {
            console.error('❌ Ошибка парсинга:', error);
            return { transactions: [], income: 0, expense: 0 };
        }
    }
    
    // ============================================================================
    // ПАРСИНГ PDF
    // ============================================================================
    async parsePDF(filePath) {
        console.log('📄 ПАРСЕР PDF');
        
        try {
            const dataBuffer = fs.readFileSync(filePath);
            const pdfData = await pdfParse(dataBuffer);
            const text = pdfData.text;
            
            console.log(`📄 Страниц: ${pdfData.numpages}`);
            
            // Разбиваем на строки
            const lines = text.split('\n').filter(line => line.trim());
            console.log(`📊 Всего строк: ${lines.length}`);
            
            const transactions = [];
            let income = 0;
            let expense = 0;
            
            // Регулярные выражения для поиска транзакций
            const amountRegex = /(\d+[\s,.]*\d*)\s*(?:₸|тенге|KZT|тг)/i;
            const dateRegex = /(\d{2})[.\/](\d{2})[.\/](\d{4})/;
            const amountWithSignRegex = /([+-]?\d+[\s,.]*\d*)\s*(?:₸|тенге|KZT|тг)/i;
            
            let currentTransaction = null;
            
            for (const line of lines) {
                const trimmed = line.trim();
                
                // Пропускаем пустые строки
                if (!trimmed) continue;
                
                // Ищем дату
                const dateMatch = trimmed.match(dateRegex);
                const amountMatch = trimmed.match(amountRegex);
                const amountWithSignMatch = trimmed.match(amountWithSignRegex);
                
                // Если есть дата и сумма - это новая транзакция
                if (dateMatch && (amountMatch || amountWithSignMatch)) {
                    // Сохраняем предыдущую транзакцию
                    if (currentTransaction) {
                        transactions.push(currentTransaction);
                        if (currentTransaction.type === 'income') {
                            income += currentTransaction.amount;
                        } else {
                            expense += currentTransaction.amount;
                        }
                    }
                    
                    const amount = amountMatch ? parseFloat(amountMatch[1].replace(/\s/g, '').replace(/,/g, '.')) : 
                                  amountWithSignMatch ? Math.abs(parseFloat(amountWithSignMatch[1].replace(/\s/g, '').replace(/,/g, '.'))) : 0;
                    
                    const isIncome = trimmed.toLowerCase().includes('доход') || 
                                    trimmed.toLowerCase().includes('приход') ||
                                    trimmed.toLowerCase().includes('зачисление') ||
                                    trimmed.toLowerCase().includes('поступление') ||
                                    (amountWithSignMatch && amountWithSignMatch[1].startsWith('+'));
                    
                    const isExpense = trimmed.toLowerCase().includes('расход') || 
                                     trimmed.toLowerCase().includes('списание') ||
                                     trimmed.toLowerCase().includes('оплата') ||
                                     trimmed.toLowerCase().includes('покупка') ||
                                     (amountWithSignMatch && amountWithSignMatch[1].startsWith('-'));
                    
                    // Определяем категорию
                    let category = 'Другое';
                    const lowerLine = trimmed.toLowerCase();
                    if (lowerLine.includes('продукт') || lowerLine.includes('еда') || lowerLine.includes('супермаркет')) {
                        category = 'Продукты';
                    } else if (lowerLine.includes('такси') || lowerLine.includes('транспорт') || lowerLine.includes('бензин')) {
                        category = 'Транспорт';
                    } else if (lowerLine.includes('кафе') || lowerLine.includes('ресторан')) {
                        category = 'Рестораны и кафе';
                    } else if (lowerLine.includes('кино') || lowerLine.includes('развлечение') || lowerLine.includes('игры')) {
                        category = 'Развлечения';
                    } else if (lowerLine.includes('подписк') || lowerLine.includes('netflix') || lowerLine.includes('spotify')) {
                        category = 'Подписки';
                    } else if (lowerLine.includes('одежд') || lowerLine.includes('покупк')) {
                        category = 'Покупки';
                    } else if (lowerLine.includes('здоров') || lowerLine.includes('аптек') || lowerLine.includes('лекарств')) {
                        category = 'Здоровье';
                    } else if (lowerLine.includes('зарплат') || lowerLine.includes('зп')) {
                        category = 'Зарплата';
                    } else if (lowerLine.includes('перевод')) {
                        category = 'Переводы';
                    }
                    
                    const type = isIncome ? 'income' : (isExpense ? 'expense' : (amount > 0 ? 'income' : 'expense'));
                    
                    // Создаем описание
                    let description = trimmed;
                    // Убираем дату и сумму из описания
                    description = description.replace(dateRegex, '').replace(amountRegex, '').trim();
                    if (description.length > 100) {
                        description = description.substring(0, 100) + '...';
                    }
                    if (!description) {
                        description = `Транзакция ${transactions.length + 1}`;
                    }
                    
                    currentTransaction = {
                        amount: Math.abs(amount),
                        type: type,
                        category: category,
                        description: description,
                        date: new Date(
                            parseInt(dateMatch[3]),
                            parseInt(dateMatch[2]) - 1,
                            parseInt(dateMatch[1])
                        )
                    };
                }
            }
            
            // Добавляем последнюю транзакцию
            if (currentTransaction) {
                transactions.push(currentTransaction);
                if (currentTransaction.type === 'income') {
                    income += currentTransaction.amount;
                } else {
                    expense += currentTransaction.amount;
                }
            }
            
            console.log(`✅ НАЙДЕНО В PDF: ${transactions.length} транзакций`);
            console.log(`   📈 Доходы: ${income.toFixed(2)} ₸`);
            console.log(`   📉 Расходы: ${expense.toFixed(2)} ₸`);
            
            return { transactions, income, expense };
            
        } catch (error) {
            console.error('❌ Ошибка парсинга PDF:', error);
            return { transactions: [], income: 0, expense: 0 };
        }
    }
    
    // ============================================================================
    // ПАРСИНГ EXCEL
    // ============================================================================
    async parseExcel(filePath) {
        console.log('📊 ПАРСЕР EXCEL');
        
        try {
            const workbook = XLSX.readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
            
            console.log(`📊 Найдено ${data.length} строк в Excel`);
            
            const transactions = [];
            let income = 0;
            let expense = 0;
            
            // Ищем столбцы
            const headers = Object.keys(data[0] || {});
            console.log('📋 Заголовки:', headers);
            
            // Определяем столбцы
            const amountCol = this.findColumn(headers, ['сумма', 'amount', 'операция', 'transaction', 'price', 'sum', 'стоимость']);
            const dateCol = this.findColumn(headers, ['дата', 'date', 'день', 'day']);
            const descCol = this.findColumn(headers, ['описание', 'description', 'назначение', 'purpose', 'merchant', 'контрагент', 'наименование']);
            const typeCol = this.findColumn(headers, ['тип', 'type', 'категория', 'category']);
            
            console.log(`📌 Столбцы: сумма=${amountCol}, дата=${dateCol}, описание=${descCol}, тип=${typeCol}`);
            
            for (const row of data) {
                try {
                    let amount = 0;
                    let date = new Date();
                    let description = '';
                    let category = 'Другое';
                    let type = 'expense';
                    
                    // Сумма
                    if (amountCol && row[amountCol] !== undefined) {
                        amount = parseFloat(String(row[amountCol]).replace(/\s/g, '').replace(/,/g, '.')) || 0;
                    }
                    
                    // Дата
                    if (dateCol && row[dateCol]) {
                        const dateVal = row[dateCol];
                        if (dateVal instanceof Date) {
                            date = dateVal;
                        } else {
                            const dateStr = String(dateVal);
                            const dateMatch = dateStr.match(/(\d{2})[.\/](\d{2})[.\/](\d{4})/);
                            if (dateMatch) {
                                date = new Date(
                                    parseInt(dateMatch[3]),
                                    parseInt(dateMatch[2]) - 1,
                                    parseInt(dateMatch[1])
                                );
                            }
                        }
                    }
                    
                    // Описание
                    if (descCol && row[descCol]) {
                        description = String(row[descCol]);
                    }
                    
                    // Тип
                    if (typeCol && row[typeCol]) {
                        const typeVal = String(row[typeCol]).toLowerCase();
                        if (typeVal.includes('доход') || typeVal.includes('income') || typeVal.includes('приход')) {
                            type = 'income';
                        } else if (typeVal.includes('расход') || typeVal.includes('expense') || typeVal.includes('списание')) {
                            type = 'expense';
                        }
                    }
                    
                    // Если тип не определен, определяем по знаку суммы
                    if (!type || type === '') {
                        type = amount >= 0 ? 'income' : 'expense';
                        amount = Math.abs(amount);
                    }
                    
                    // Категория
                    if (descCol && row[descCol]) {
                        const lowerDesc = String(row[descCol]).toLowerCase();
                        if (lowerDesc.includes('продукт') || lowerDesc.includes('еда') || lowerDesc.includes('супермаркет')) {
                            category = 'Продукты';
                        } else if (lowerDesc.includes('такси') || lowerDesc.includes('транспорт') || lowerDesc.includes('бензин')) {
                            category = 'Транспорт';
                        } else if (lowerDesc.includes('кафе') || lowerDesc.includes('ресторан')) {
                            category = 'Рестораны и кафе';
                        } else if (lowerDesc.includes('развлечение') || lowerDesc.includes('игры')) {
                            category = 'Развлечения';
                        } else if (lowerDesc.includes('подписк') || lowerDesc.includes('netflix')) {
                            category = 'Подписки';
                        } else if (lowerDesc.includes('одежд') || lowerDesc.includes('покупк')) {
                            category = 'Покупки';
                        } else if (lowerDesc.includes('здоров') || lowerDesc.includes('аптек')) {
                            category = 'Здоровье';
                        } else if (lowerDesc.includes('зарплат') || lowerDesc.includes('зп')) {
                            category = 'Зарплата';
                        }
                    }
                    
                    if (amount > 0) {
                        const tx = {
                            amount: Math.abs(amount),
                            type: type,
                            category: category,
                            description: description || `Транзакция ${transactions.length + 1}`,
                            date: date
                        };
                        
                        transactions.push(tx);
                        
                        if (type === 'income') {
                            income += tx.amount;
                        } else {
                            expense += tx.amount;
                        }
                    }
                    
                } catch (err) {
                    console.warn('⚠️ Ошибка парсинга строки:', err.message);
                }
            }
            
            console.log(`✅ НАЙДЕНО В EXCEL: ${transactions.length} транзакций`);
            console.log(`   📈 Доходы: ${income.toFixed(2)} ₸`);
            console.log(`   📉 Расходы: ${expense.toFixed(2)} ₸`);
            
            return { transactions, income, expense };
            
        } catch (error) {
            console.error('❌ Ошибка парсинга Excel:', error);
            return { transactions: [], income: 0, expense: 0 };
        }
    }
    
    // ============================================================================
    // ПАРСИНГ TXT
    // ============================================================================
    async parseTXT(filePath) {
        console.log('📄 ПАРСЕР TXT');
        
        try {
            const text = fs.readFileSync(filePath, 'utf8');
            const lines = text.split('\n').filter(line => line.trim());
            
            console.log(`📊 Всего строк: ${lines.length}`);
            
            const transactions = [];
            let income = 0;
            let expense = 0;
            
            const amountRegex = /(\d+[\s,.]*\d*)\s*(?:₸|тенге|KZT|тг)/i;
            const dateRegex = /(\d{2})[.\/](\d{2})[.\/](\d{4})/;
            
            for (const line of lines) {
                const trimmed = line.trim();
                if (!trimmed) continue;
                
                const dateMatch = trimmed.match(dateRegex);
                const amountMatch = trimmed.match(amountRegex);
                
                if (dateMatch && amountMatch) {
                    const amount = parseFloat(amountMatch[1].replace(/\s/g, '').replace(/,/g, '.'));
                    const isIncome = trimmed.toLowerCase().includes('доход') || trimmed.toLowerCase().includes('приход');
                    const isExpense = trimmed.toLowerCase().includes('расход') || trimmed.toLowerCase().includes('списание');
                    
                    const type = isIncome ? 'income' : (isExpense ? 'expense' : (amount > 0 ? 'income' : 'expense'));
                    
                    transactions.push({
                        amount: Math.abs(amount),
                        type: type,
                        category: 'Другое',
                        description: trimmed.replace(dateRegex, '').replace(amountRegex, '').trim() || `Транзакция ${transactions.length + 1}`,
                        date: new Date(
                            parseInt(dateMatch[3]),
                            parseInt(dateMatch[2]) - 1,
                            parseInt(dateMatch[1])
                        )
                    });
                    
                    if (type === 'income') {
                        income += Math.abs(amount);
                    } else {
                        expense += Math.abs(amount);
                    }
                }
            }
            
            console.log(`✅ НАЙДЕНО В TXT: ${transactions.length} транзакций`);
            return { transactions, income, expense };
            
        } catch (error) {
            console.error('❌ Ошибка парсинга TXT:', error);
            return { transactions: [], income: 0, expense: 0 };
        }
    }
    
    // ============================================================================
    // ВСПОМОГАТЕЛЬНЫЕ МЕТОДЫ
    // ============================================================================
    findColumn(headers, possibleNames) {
        for (const name of possibleNames) {
            const lowerName = name.toLowerCase();
            for (const header of headers) {
                if (header.toLowerCase().includes(lowerName)) {
                    return header;
                }
            }
        }
        return null;
    }
    
    // ============================================================================
    // ПОЛУЧЕНИЕ ВСЕХ ТРАНЗАКЦИЙ ПОЛЬЗОВАТЕЛЯ
    // ============================================================================
    getTransactions = async (req, res) => {
        try {
            const userId = req.query.userId || req.user?.id || 'test123';
            
            const transactions = await prisma.transaction.findMany({
                where: { userId: userId },
                orderBy: { date: 'desc' },
                take: 100
            });
            
            const total = await prisma.transaction.count({
                where: { userId: userId }
            });
            
            res.json({
                success: true,
                transactions: transactions,
                total: total
            });
            
        } catch (error) {
            console.error('❌ Ошибка получения транзакций:', error);
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    };
    
    // ============================================================================
    // УДАЛЕНИЕ ВСЕХ ТРАНЗАКЦИЙ ПОЛЬЗОВАТЕЛЯ
    // ============================================================================
    deleteAllTransactions = async (req, res) => {
        try {
            const userId = req.query.userId || req.user?.id || 'test123';
            
            const deleted = await prisma.transaction.deleteMany({
                where: { userId: userId }
            });
            
            console.log(`🗑️ Удалено ${deleted.count} транзакций для пользователя ${userId}`);
            
            res.json({
                success: true,
                message: `Удалено ${deleted.count} транзакций`
            });
            
        } catch (error) {
            console.error('❌ Ошибка удаления:', error);
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    };
}

module.exports = new UploadController();