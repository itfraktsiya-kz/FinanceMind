// ============================================================================
// SERVER.JS - FINANCEMIND BACKEND V8.1
// ИСПРАВЛЕНО: URL для AI запросов, добавлен прокси /api/ai/chat
// ============================================================================

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const pdfParse = require('pdf-parse');
const iconv = require('iconv-lite');
const helmet = require('helmet');
require('dotenv').config();

// Node fetch для API запросов
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// ============================================================================
// [AI] ИМПОРТ AI МОДУЛЕЙ
// ============================================================================
const aiRoutes = require('./routes/aiRoutes');
const aiService = require('./services/aiService');

// ============================================================================
// ИМПОРТ НОВЫХ МОДУЛЕЙ
// ============================================================================
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

// ============================================================================
// [UPLOAD] ИМПОРТ UPLOAD CONTROLLER
// ============================================================================
const uploadController = require('./controllers/uploadController');

// ============================================================================
// КОНФИГУРАЦИЯ
// ============================================================================
const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'financemind-super-secret-key-change-in-production';
const JWT_EXPIRES_IN = '7d';

// Инициализация Prisma
const prisma = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

// ============================================================================
// [AI] ДОБАВЛЯЕМ prisma В ГЛОБАЛЬНЫЙ КОНТЕКСТ
// ============================================================================
global.prisma = prisma;

// ============================================================================
// ФУНКЦИИ JWT
// ============================================================================
function generateToken(userId, email) {
    return jwt.sign(
        { userId, email },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );
}

function verifyToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
}

// ============================================================================
// MIDDLEWARE AUTH
// ============================================================================
async function authMiddleware(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            // Для тестов пропускаем
            if (req.body.userId === 'test123' || req.query.userId === 'test123') {
                req.user = { id: 'test123', plan: 'FREE' };
                return next();
            }
            return res.status(401).json({ error: 'No token provided' });
        }
        
        const token = authHeader.split(' ')[1];
        const decoded = verifyToken(token);
        
        if (!decoded) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: {
                id: true,
                email: true,
                name: true,
                plan: true,
                fincoinBalance: true,
                level: true,
                xp: true,
                dailyAIRequests: true,
                totalTokensUsed: true,
                totalRequests: true,
                lastAIRequestReset: true,
            }
        });
        
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }
        
        const aiLimits = {
            FREE: { requestsPerDay: 10, tokensPerDay: 10000, maxMessageLength: 2000 },
            PRO: { requestsPerDay: 500, tokensPerDay: 500000, maxMessageLength: 8000 },
            ELITE: { requestsPerDay: null, tokensPerDay: null, maxMessageLength: 12000 }
        };
        
        req.user = {
            ...user,
            aiLimits: aiLimits[user.plan] || aiLimits.FREE
        };
        
        next();
        
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// ============================================================================
// RATE LIMITING MIDDLEWARE
// ============================================================================
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { error: 'Too many requests, please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
});

// ============================================================================
// SECURITY MIDDLEWARE
// ============================================================================
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    contentSecurityPolicy: false,
}));

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    credentials: true,
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// ============================================================================
// [AI] AI ROUTES - ПРАВИЛЬНЫЙ URL /api/v1/ai
// ============================================================================
app.use('/api/v1/ai', authMiddleware, aiRoutes);

// ============================================================================
// ✅ ИСПРАВЛЕНИЕ ПРОБЛЕМЫ №2: ПРОКСИ ДЛЯ /api/ai/chat
// ============================================================================
app.post('/api/ai/chat', authMiddleware, async (req, res) => {
    console.log('\n' + '='.repeat(70));
    console.log('🔄 ПРОКСИ ЗАПРОС: /api/ai/chat → /api/v1/ai/chat');
    console.log('='.repeat(70));
    
    try {
        const { message, userId, userData, conversationHistory } = req.body;
        
        console.log(`📝 Сообщение: "${message}"`);
        console.log(`👤 Пользователь: ${userId || req.user?.id}`);
        console.log(`📊 Данные от фронтенда: ${!!userData}`);
        console.log(`📊 Транзакций: ${userData?.transactions?.length || 0}`);
        console.log(`💰 Доходы: ${userData?.totalIncome || 0}`);
        console.log(`💸 Расходы: ${userData?.totalExpense || 0}`);
        
        // Используем aiService.chatWithData для обработки с данными от фронтенда
        const result = await aiService.chatWithData(
            userId || req.user?.id || 'test123',
            message,
            userData || null,
            conversationHistory || []
        );
        
        console.log(`📥 Результат: success=${result.success}`);
        
        if (result.success) {
            res.json({ 
                success: true, 
                response: result.response,
                timestamp: result.timestamp
            });
        } else {
            res.status(result.statusCode || 500).json({
                success: false,
                error: result.error || 'AI request failed'
            });
        }
    } catch (error) {
        console.error('❌ Прокси AI ошибка:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Internal server error'
        });
    }
});

// ============================================================================
// [AI] ТЕСТОВЫЙ МАРШРУТ
// ============================================================================
app.post('/api/test/sync', async (req, res) => {
    try {
        const { email, name } = req.body;
        
        const testUser = {
            id: 'test_' + Date.now(),
            email: email || 'test@example.com',
            name: name || 'Test User',
            plan: 'FREE',
            aiLimits: { requestsPerDay: 10, tokensPerDay: 10000, maxMessageLength: 2000 }
        };
        
        const testToken = jwt.sign(
            { userId: testUser.id, email: testUser.email },
            JWT_SECRET,
            { expiresIn: '7d' }
        );
        
        res.json({
            success: true,
            token: testToken,
            user: testUser
        });
    } catch (error) {
        console.error('Test sync error:', error);
        res.status(500).json({ error: error.message });
    }
});

// ============================================================================
// НАСТРОЙКА ЗАГРУЗКИ ФАЙЛОВ
// ============================================================================
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log('📁 Создана папка для загрузок:', uploadDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const cleanName = file.originalname.replace(/[^a-zA-Zа-яА-Я0-9.]/g, '_');
        const uniqueName = `${Date.now()}-${cleanName}`;
        cb(null, uniqueName);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const allowedExtensions = ['.csv', '.txt', '.xls', '.xlsx', '.xlsm', '.xlsb', '.pdf'];
        
        if (allowedExtensions.includes(ext)) {
            cb(null, true);
        } else {
            cb(new Error('Неподдерживаемый формат'));
        }
    }
});

const userData = new Map();

function parseDate(dateStr) {
    if (!dateStr) return null;
    
    const str = dateStr.toString().trim();
    
    let match = str.match(/^(\d{2})\.(\d{2})\.(\d{2,4})$/);
    if (match) {
        let day = match[1];
        let month = match[2];
        let year = match[3];
        
        if (year.length === 2) {
            year = '20' + year;
        }
        
        const dayNum = parseInt(day, 10);
        const monthNum = parseInt(month, 10);
        const yearNum = parseInt(year, 10);
        
        if (dayNum >= 1 && dayNum <= 31 && monthNum >= 1 && monthNum <= 12 && yearNum >= 2000 && yearNum <= 2030) {
            return {
                display: `${day}.${month}.${year}`,
                iso: `${year}-${month}-${day}`,
                timestamp: new Date(yearNum, monthNum - 1, dayNum).getTime()
            };
        }
    }
    
    return null;
}

function parseAmount(amountStr) {
    if (!amountStr) return 0;
    
    let str = amountStr.toString().trim();
    
    let sign = 1;
    if (str.startsWith('-')) {
        sign = -1;
        str = str.substring(1);
    } else if (str.startsWith('+')) {
        str = str.substring(1);
    }
    
    str = str.replace(/\s/g, '').replace(/\xA0/g, '');
    str = str.replace(',', '.');
    str = str.replace(/[₸$€₽тгKZTkzt]/g, '');
    
    const amount = parseFloat(str);
    if (isNaN(amount)) return 0;
    
    return sign * amount;
}

function formatAmount(amount) {
    if (!amount || amount === 0) return '0,00 ₸';
    const formatted = Math.abs(amount).toFixed(2).replace('.', ',');
    const parts = formatted.split(',');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return (amount < 0 ? '-' : '') + parts.join(',') + ' ₸';
}

function detectCategory(description, amount) {
    if (!description) return 'Другое';
    
    const d = description.toLowerCase();
    const isIncome = amount > 0;
    
    if (isIncome) {
        if (d.includes('зарплата') || d.includes('зп') || d.includes('salary')) return 'Зарплата';
        if (d.includes('бонус') || d.includes('премия')) return 'Бонусы';
        if (d.includes('кэшбэк') || d.includes('cashback')) return 'Кэшбэк';
        if (d.includes('пополнение') || d.includes('поступление')) return 'Пополнения';
        if (d.includes('перевод') && (d.includes('от') || d.includes('получил'))) return 'Переводы';
        return 'Доход';
    }
    
    if (d.includes('magnum') || d.includes('small') || d.includes('продукты') || d.includes('супермаркет') || d.includes('galmart')) return 'Продукты';
    if (d.includes('ресторан') || d.includes('кафе') || d.includes('kfc') || d.includes('доставка')) return 'Рестораны и кафе';
    if (d.includes('такси') || d.includes('яндекс') || d.includes('uber') || d.includes('бензин')) return 'Транспорт';
    if (d.includes('одежда') || d.includes('wildberries') || d.includes('ozon')) return 'Покупки';
    if (d.includes('кино') || d.includes('игры') || d.includes('netflix')) return 'Развлечения';
    if (d.includes('аптека') || d.includes('лекарство')) return 'Здоровье';
    if (d.includes('квартира') || d.includes('аренда') || d.includes('жкх')) return 'Жильё и коммунальные';
    if (d.includes('связь') || d.includes('телефон') || d.includes('интернет')) return 'Связь и интернет';
    if (d.includes('перевод')) return 'Переводы';
    
    return 'Другое';
}

// ============================================================================
// ПАРСЕР PDF
// ============================================================================
async function parseKaspiPDF(filePath) {
    console.log('\n' + '='.repeat(70));
    console.log('📄 ПАРСЕР PDF (УНИВЕРСАЛЬНЫЙ V2)');
    console.log('='.repeat(70));
    
    try {
        const dataBuffer = fs.readFileSync(filePath);
        const pdfData = await pdfParse(dataBuffer);
        const text = pdfData.text;
        
        console.log(`📄 Страниц: ${pdfData.numpages}`);
        
        const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
        console.log(`📊 Всего строк: ${lines.length}`);
        
        console.log('📝 Первые 30 строк PDF:');
        lines.slice(0, 30).forEach((line, i) => {
            console.log(`   ${i+1}: ${line.substring(0, 100)}`);
        });
        
        const transactions = [];
        let totalIncome = 0;
        let totalExpense = 0;
        
        const datePattern = /(\d{2}\.\d{2}\.\d{2})/;
        const amountPattern = /([+-]?\s*[\d\s.,]+)\s*[₸₽]/;
        
        let i = 0;
        let found = 0;
        
        while (i < lines.length) {
            const line = lines[i];
            
            const dateMatch = line.match(datePattern);
            const amountMatch = line.match(amountPattern);
            
            if (dateMatch && amountMatch) {
                const dateStr = dateMatch[1];
                const amountRaw = amountMatch[1];
                const amount = parseAmount(amountRaw);
                
                if (amount !== 0) {
                    const absAmount = Math.abs(amount);
                    const type = amount > 0 ? 'income' : 'expense';
                    
                    const dateParts = dateStr.split('.');
                    let year = 2000 + parseInt(dateParts[2]);
                    if (year > 2030) year -= 100;
                    const month = parseInt(dateParts[1]) - 1;
                    const day = parseInt(dateParts[0]);
                    const dateObj = new Date(year, month, day);
                    
                    let description = line
                        .replace(dateMatch[0], '')
                        .replace(amountMatch[0], '')
                        .trim();
                    
                    if (description.length === 0 && i + 1 < lines.length) {
                        const nextLine = lines[i + 1];
                        if (!nextLine.match(datePattern) && !nextLine.match(amountPattern)) {
                            description = nextLine.trim();
                            i++;
                        }
                    }
                    
                    if (description.length === 0) {
                        description = type === 'income' ? 'Пополнение' : 'Списание';
                    }
                    
                    let category = 'Другое';
                    const lowerDesc = description.toLowerCase();
                    if (lowerDesc.includes('поступление') || lowerDesc.includes('пополнение')) {
                        category = 'Пополнения';
                    } else if (lowerDesc.includes('зарплата') || lowerDesc.includes('зп')) {
                        category = 'Зарплата';
                    } else if (lowerDesc.includes('перевод')) {
                        category = 'Переводы';
                    } else if (lowerDesc.includes('покупка') || lowerDesc.includes('market') || lowerDesc.includes('магазин')) {
                        category = 'Покупки';
                    } else if (lowerDesc.includes('снятие')) {
                        category = 'Снятия';
                    } else if (lowerDesc.includes('комиссия')) {
                        category = 'Комиссии';
                    }
                    
                    const displayDate = `${String(day).padStart(2, '0')}.${String(month + 1).padStart(2, '0')}.${year}`;
                    
                    const tx = {
                        id: uuidv4(),
                        amount: absAmount,
                        type: type,
                        category: category,
                        description: description,
                        cleanDescription: description,
                        date: displayDate,
                        isoDate: `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
                        timestamp: dateObj.getTime(),
                        bank: 'kaspi',
                        bankName: 'Kaspi Bank'
                    };
                    
                    transactions.push(tx);
                    found++;
                    
                    if (type === 'income') {
                        totalIncome += absAmount;
                    } else {
                        totalExpense += absAmount;
                    }
                    
                    console.log(`   ✅ ${displayDate} | ${absAmount}₸ | ${type} | ${category}`);
                }
            }
            
            i++;
        }
        
        if (transactions.length === 0) {
            console.log('🔄 Пробуем альтернативный метод парсинга...');
            
            for (const line of lines) {
                const dateMatch = line.match(/(\d{2}\.\d{2}\.\d{2})/);
                if (!dateMatch) continue;
                
                const numbers = line.match(/[\d\s.,]+/g);
                if (!numbers) continue;
                
                for (const numStr of numbers) {
                    const cleaned = numStr.replace(/\s/g, '').replace(/,/g, '.');
                    const amount = parseFloat(cleaned);
                    if (amount > 0 && amount < 10000000) {
                        const dateStr = dateMatch[1];
                        const lowerLine = line.toLowerCase();
                        
                        let type = 'expense';
                        if (lowerLine.includes('зарплата') || lowerLine.includes('кэшбэк') || lowerLine.includes('пополнение') || lowerLine.includes('поступление')) {
                            type = 'income';
                        }
                        
                        const dateParts = dateStr.split('.');
                        let year = 2000 + parseInt(dateParts[2]);
                        if (year > 2030) year -= 100;
                        const month = parseInt(dateParts[1]) - 1;
                        const day = parseInt(dateParts[0]);
                        const displayDate = `${String(day).padStart(2, '0')}.${String(month + 1).padStart(2, '0')}.${year}`;
                        
                        let description = line.replace(dateStr, '').trim();
                        if (description.length === 0) {
                            description = `Транзакция ${transactions.length + 1}`;
                        }
                        
                        let category = 'Другое';
                        const lowerDesc = description.toLowerCase();
                        if (lowerDesc.includes('поступление') || lowerDesc.includes('пополнение')) category = 'Пополнения';
                        else if (lowerDesc.includes('перевод')) category = 'Переводы';
                        else if (lowerDesc.includes('покупка') || lowerDesc.includes('market')) category = 'Покупки';
                        
                        const tx = {
                            id: uuidv4(),
                            amount: amount,
                            type: type,
                            category: category,
                            description: description,
                            cleanDescription: description,
                            date: displayDate,
                            isoDate: `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
                            timestamp: new Date(year, month, day).getTime(),
                            bank: 'kaspi',
                            bankName: 'Kaspi Bank'
                        };
                        
                        transactions.push(tx);
                        found++;
                        
                        if (type === 'income') totalIncome += amount;
                        else totalExpense += amount;
                        
                        console.log(`   ✅ ${displayDate} | ${amount}₸ | ${type} | ${category}`);
                        break;
                    }
                }
            }
        }
        
        console.log(`\n✅ НАЙДЕНО В PDF: ${transactions.length} транзакций`);
        console.log(`   📈 Доходы: ${totalIncome.toFixed(2)} ₸`);
        console.log(`   📉 Расходы: ${totalExpense.toFixed(2)} ₸`);
        
        if (transactions.length > 0) {
            console.log('📋 Первые 5 транзакций:');
            transactions.slice(0, 5).forEach((tx, idx) => {
                console.log(`   ${idx+1}. ${tx.date} | ${tx.amount}₸ | ${tx.type} | ${tx.category} | ${tx.description.substring(0, 30)}`);
            });
        }
        
        return { transactions, totalIncome, totalExpense };
        
    } catch (error) {
        console.error('❌ Ошибка при парсинге PDF:', error);
        return null;
    }
}

function parseKaspiGoldStatement(filePath) {
    console.log('\n' + '='.repeat(70));
    console.log('💰 ПАРСЕР KASPI GOLD (TXT/CSV)');
    console.log('='.repeat(70));
    
    try {
        let content;
        try {
            content = fs.readFileSync(filePath, 'utf8');
            console.log('📄 Файл прочитан в UTF-8');
        } catch (e) {
            const buffer = fs.readFileSync(filePath);
            content = iconv.decode(buffer, 'win1251');
            console.log('📄 Файл прочитан в WIN1251');
        }
        
        content = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
        const lines = content.split('\n');
        console.log(`📊 Всего строк: ${lines.length}`);
        
        const transactions = [];
        let totalIncome = 0;
        let totalExpense = 0;
        
        const skipKeywords = [
            'Краткое содержание', 'Лимит на снятие', 'Остаток зарплатных',
            'Доступно на', 'ДатаСуммаОперация', 'Детали'
        ];
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line.length === 0) continue;
            
            let shouldSkip = false;
            for (const keyword of skipKeywords) {
                if (line.includes(keyword)) {
                    shouldSkip = true;
                    break;
                }
            }
            if (shouldSkip) continue;
            
            const dateMatch = line.match(/(\d{2}\.\d{2}\.\d{2,4})/);
            if (!dateMatch) continue;
            
            const dateStr = dateMatch[1];
            
            const amountMatch = line.match(/([+-]?\s*[\d\s.,]+)\s*[₸]/);
            if (!amountMatch) continue;
            
            const amountRaw = amountMatch[1];
            const amount = parseAmount(amountRaw);
            if (amount === 0) continue;
            
            const datePos = line.indexOf(dateStr);
            const amountPos = line.indexOf(amountRaw);
            
            let description = '';
            
            if (datePos !== -1 && amountPos !== -1 && amountPos > datePos) {
                let between = line.substring(datePos + dateStr.length, amountPos).trim();
                let after = line.substring(amountPos + amountRaw.length).trim();
                description = (between + ' ' + after).trim();
            } else {
                description = line.replace(dateStr, '').replace(amountRaw, '').trim();
            }
            
            description = description.replace(/\s+/g, ' ').trim();
            if (description.length === 0) description = 'Операция';
            
            let type = amount > 0 ? 'income' : 'expense';
            const absAmount = Math.abs(amount);
            
            const lowerDesc = description.toLowerCase();
            if (lowerDesc.includes('покупка') || lowerDesc.includes('оплата')) type = 'expense';
            if (lowerDesc.includes('пополнение') || lowerDesc.includes('зарплата')) type = 'income';
            
            const dateObj = parseDate(dateStr);
            if (!dateObj) continue;
            
            const category = detectCategory(description, type === 'income' ? absAmount : -absAmount);
            
            if (type === 'income') totalIncome += absAmount;
            else totalExpense += absAmount;
            
            transactions.push({
                id: uuidv4(),
                date: dateObj.display,
                isoDate: dateObj.iso,
                timestamp: dateObj.timestamp,
                amount: absAmount,
                type: type,
                description: description,
                cleanDescription: description,
                category: category,
                bank: 'kaspi',
                bankName: 'Kaspi Bank'
            });
        }
        
        if (transactions.length === 0) return null;
        
        console.log(`\n✅ НАЙДЕНО ТРАНЗАКЦИЙ: ${transactions.length}`);
        console.log(`   📈 Доходы: ${totalIncome.toFixed(2)} ₸`);
        console.log(`   📉 Расходы: ${totalExpense.toFixed(2)} ₸`);
        
        return { transactions, totalIncome, totalExpense };
        
    } catch (error) {
        console.error('❌ Ошибка парсинга текста:', error);
        return null;
    }
}

async function fetchExchangeRates() {
    try {
        console.log('🔄 [СЕРВЕР] Загрузка курсов валют...');
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        
        const response = await fetch('https://v6.exchangerate-api.com/v6/06b5b1c50ff1f49be741b4f2/latest/USD', {
            signal: controller.signal,
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'FinanceMind-Server/1.0'
            }
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.result === 'success' && data.conversion_rates) {
            const rates = data.conversion_rates;
            const kzt = rates.KZT;
            
            if (!kzt) throw new Error('Курс KZT не найден');
            if (!rates.EUR || !rates.RUB || !rates.CNY) throw new Error('Не найдены курсы валют');
            
            const result = {
                usd: kzt,
                eur: kzt / rates.EUR,
                rub: kzt / rates.RUB,
                cny: kzt / rates.CNY
            };
            
            console.log('✅ [СЕРВЕР] Курсы получены:', result);
            return result;
        }
        
        throw new Error('Ошибка в ответе API');
        
    } catch (error) {
        console.error('❌ [СЕРВЕР] Ошибка загрузки курсов:', error.message);
        console.log('📦 [СЕРВЕР] Использую fallback значения');
        
        return {
            usd: 460,
            eur: 500,
            rub: 5,
            cny: 64
        };
    }
}

// ============================================================================
// API МАРШРУТЫ
// ============================================================================

// Health check
app.get('/api/health', async (req, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`;
        res.json({
            status: 'ok',
            version: '2.0.0',
            timestamp: new Date().toISOString(),
            database: 'connected',
        });
    } catch (error) {
        res.json({
            status: 'degraded',
            version: '2.0.0',
            timestamp: new Date().toISOString(),
            database: 'disconnected',
        });
    }
});

// Auth sync
app.post('/api/auth/sync', async (req, res) => {
    try {
        const { email, name, avatar } = req.body;
        
        console.log(`🔄 Синхронизация пользователя: ${email}`);
        
        let user = await prisma.user.findUnique({
            where: { email },
        });
        
        if (!user) {
            user = await prisma.user.create({
                data: {
                    email,
                    name: name || email.split('@')[0],
                    avatar: avatar || null,
                    fincoinBalance: 0,
                    xp: 0,
                    level: 1,
                    settings: JSON.stringify({
                        language: 'ru',
                        theme: 'dark',
                        currency: 'KZT',
                    }),
                },
            });
            console.log(`✅ Новый пользователь создан: ${email}`);
        } else {
            user = await prisma.user.update({
                where: { id: user.id },
                data: { 
                    lastLoginAt: new Date(),
                    name: name || user.name,
                    avatar: avatar || user.avatar,
                },
            });
            console.log(`✅ Пользователь обновлен: ${email}`);
        }
        
        const token = generateToken(user.id, user.email);
        
        res.json({
            success: true,
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                avatar: user.avatar,
                plan: user.plan,
                fincoinBalance: user.fincoinBalance,
                level: user.level,
                xp: user.xp,
            },
        });
        
    } catch (error) {
        console.error('❌ Sync error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get current user
app.get('/api/user/me', authMiddleware, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            include: {
                messages: {
                    orderBy: { createdAt: 'desc' },
                    take: 50,
                },
            },
        });
        
        if (user && user.settings && typeof user.settings === 'string') {
            try {
                user.settings = JSON.parse(user.settings);
            } catch (e) {
                user.settings = {};
            }
        }
        
        res.json(user);
    } catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update FinCoin
app.post('/api/user/fincoin', authMiddleware, async (req, res) => {
    try {
        const { delta } = req.body;
        
        const user = await prisma.user.update({
            where: { id: req.user.id },
            data: {
                fincoinBalance: {
                    increment: delta,
                },
            },
        });
        
        res.json({ success: true, fincoinBalance: user.fincoinBalance });
    } catch (error) {
        console.error('Error updating fincoin:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update XP
app.post('/api/user/xp', authMiddleware, async (req, res) => {
    try {
        const { xpGain } = req.body;
        
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
        });
        
        let newXP = user.xp + xpGain;
        let newLevel = Math.floor(newXP / 100) + 1;
        let leveledUp = newLevel > user.level;
        let bonus = 0;
        
        if (leveledUp) {
            bonus = (newLevel - user.level) * 50;
            await prisma.user.update({
                where: { id: req.user.id },
                data: {
                    fincoinBalance: {
                        increment: bonus,
                    },
                },
            });
        }
        
        const updatedUser = await prisma.user.update({
            where: { id: req.user.id },
            data: {
                xp: newXP,
                level: newLevel,
            },
        });
        
        res.json({
            success: true,
            xp: updatedUser.xp,
            level: updatedUser.level,
            leveledUp,
            bonus,
            fincoinBalance: updatedUser.fincoinBalance,
        });
    } catch (error) {
        console.error('Error updating XP:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Save message
app.post('/api/messages', authMiddleware, async (req, res) => {
    try {
        const { role, content } = req.body;
        
        const message = await prisma.message.create({
            data: {
                userId: req.user.id,
                role,
                content,
            },
        });
        
        await prisma.user.update({
            where: { id: req.user.id },
            data: {
                messagesUsed: {
                    increment: 1,
                },
            },
        });
        
        res.json({ success: true, message });
    } catch (error) {
        console.error('Error saving message:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get messages
app.get('/api/messages', authMiddleware, async (req, res) => {
    try {
        const messages = await prisma.message.findMany({
            where: { userId: req.user.id },
            orderBy: { createdAt: 'desc' },
            take: 100,
        });
        
        res.json(messages.reverse());
    } catch (error) {
        console.error('Error getting messages:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Currency rates
app.get('/api/rates', async (req, res) => {
    console.log('\n🔄 Запрос курсов валют от клиента');
    
    try {
        const rates = await fetchExchangeRates();
        console.log('✅ Курсы отправлены клиенту:', rates);
        res.json(rates);
    } catch (error) {
        console.error('❌ Ошибка в /api/rates:', error);
        res.json({ usd: 460, eur: 500, rub: 5, cny: 64 });
    }
});

// ============================================================================
// [UPLOAD] МАРШРУТЫ ЗАГРУЗКИ
// ============================================================================

app.post('/upload', upload.single('file'), uploadController.uploadFile);

app.get('/api/transactions', authMiddleware, uploadController.getTransactions);

app.delete('/api/transactions', authMiddleware, uploadController.deleteAllTransactions);

// ============================================================================
// СТАРЫЙ МАРШРУТ ЗАГРУЗКИ
// ============================================================================
app.post('/upload/old', upload.single('file'), async (req, res) => {
    console.log('\n' + '='.repeat(70));
    console.log('📥 ЗАГРУЗКА ФАЙЛА (СТАРЫЙ МАРШРУТ)');
    console.log('='.repeat(70));
    
    let filePath = null;
    
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, error: 'Файл не загружен' });
        }
        
        filePath = req.file.path;
        const originalName = req.file.originalname;
        const ext = path.extname(originalName).toLowerCase();
        
        console.log(`📄 Файл: ${originalName}`);
        console.log(`📏 Размер: ${req.file.size} байт`);
        
        if (req.file.size === 0) {
            fs.unlinkSync(filePath);
            return res.status(400).json({ success: false, error: 'Файл пустой' });
        }
        
        let result = null;
        
        if (ext === '.pdf') {
            console.log('📄 Парсинг PDF (УНИВЕРСАЛЬНЫЙ V2)...');
            result = await parseKaspiPDF(filePath);
        } else {
            console.log('📄 Парсинг текста...');
            result = parseKaspiGoldStatement(filePath);
        }
        
        if (!result || result.transactions.length === 0) {
            fs.unlinkSync(filePath);
            return res.status(400).json({
                success: false,
                error: 'Не удалось найти транзакции в файле. Убедитесь, что файл содержит выписку Kaspi Gold.'
            });
        }
        
        console.log(`✅ Найдено ${result.transactions.length} транзакций`);
        
        const userId = req.body.userId || `user_${Date.now()}`;
        
        if (!userData.has(userId)) {
            userData.set(userId, { 
                files: [], 
                transactions: [], 
                createdAt: new Date().toISOString() 
            });
        }
        
        const user = userData.get(userId);
        const fileId = uuidv4();
        
        const transactionsWithFileId = result.transactions.map(tx => ({ ...tx, fileId }));
        
        const fileInfo = {
            id: fileId,
            name: originalName,
            uploadedAt: new Date().toISOString(),
            transactionCount: result.transactions.length,
            type: ext,
            income: result.totalIncome,
            expense: result.totalExpense
        };
        
        if (!user.files) user.files = [];
        user.files.push(fileInfo);
        
        user.transactions.push(...transactionsWithFileId);
        
        if (user.transactions.length > 10000) {
            user.transactions = user.transactions.slice(-10000);
        }
        
        fs.unlinkSync(filePath);
        
        let totalAmount = 0;
        result.transactions.forEach(tx => {
            if (tx.type === 'income') totalAmount += tx.amount;
            else totalAmount -= tx.amount;
        });
        
        console.log(`\n📊 ОТВЕТ СЕРВЕРА:`);
        console.log(`   Транзакций: ${result.transactions.length}`);
        console.log(`   Доходы: ${result.totalIncome.toFixed(2)} ₸`);
        console.log(`   Расходы: ${result.totalExpense.toFixed(2)} ₸`);
        
        res.json({
            success: true,
            transactions: transactionsWithFileId,
            summary: {
                totalIncome: result.totalIncome,
                totalExpense: result.totalExpense,
                totalIncomeFormatted: formatAmount(result.totalIncome),
                totalExpenseFormatted: formatAmount(result.totalExpense),
                totalAmount: totalAmount,
                totalAmountFormatted: formatAmount(totalAmount),
                transactionCount: result.transactions.length
            },
            fileInfo: fileInfo
        });
        
    } catch (error) {
        console.error('❌ Ошибка при обработке:', error);
        
        if (filePath && fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get user data
app.get('/user/:userId', (req, res) => {
    const userId = req.params.userId;
    const user = userData.get(userId);
    
    if (!user) {
        return res.json({
            userId,
            exists: false,
            files: [],
            transactions: [],
            summary: {
                totalIncome: 0,
                totalExpense: 0,
                totalAmount: 0,
                balance: 0
            }
        });
    }
    
    let totalIncome = 0;
    let totalExpense = 0;
    let totalAmount = 0;
    
    user.transactions.forEach(tx => {
        if (tx.type === 'income') {
            totalIncome += tx.amount;
            totalAmount += tx.amount;
        } else {
            totalExpense += tx.amount;
            totalAmount -= tx.amount;
        }
    });
    
    console.log(`\n📊 GET /user/${userId}:`);
    console.log(`   Транзакций: ${user.transactions.length}`);
    console.log(`   Доходы: ${totalIncome.toFixed(2)} ₸`);
    console.log(`   Расходы: ${totalExpense.toFixed(2)} ₸`);
    
    res.json({
        userId,
        exists: true,
        files: user.files || [],
        transactions: user.transactions.slice(-500),
        summary: {
            totalIncome,
            totalExpense,
            totalAmount,
            balance: totalIncome - totalExpense,
            totalIncomeFormatted: formatAmount(totalIncome),
            totalExpenseFormatted: formatAmount(totalExpense),
            totalAmountFormatted: formatAmount(totalAmount),
            balanceFormatted: formatAmount(totalIncome - totalExpense),
            transactionCount: user.transactions.length
        }
    });
});

// Reset user data
app.delete('/user/:userId/reset', (req, res) => {
    const userId = req.params.userId;
    if (userData.has(userId)) {
        userData.delete(userId);
        console.log(`🗑️ Данные ${userId} удалены`);
        res.json({ success: true, message: 'Данные сброшены' });
    } else {
        res.json({ success: true, message: 'Пользователь не найден' });
    }
});

// Clear user data
app.post('/user/:userId/clear', (req, res) => {
    const userId = req.params.userId;
    if (userData.has(userId)) {
        userData.set(userId, { 
            files: [], 
            transactions: [], 
            createdAt: new Date().toISOString() 
        });
        console.log(`🧹 Данные ${userId} очищены`);
        res.json({ success: true, message: 'Данные очищены' });
    } else {
        res.json({ success: true, message: 'Пользователь не найден' });
    }
});

// Apply rate limiter to API routes
app.use('/api/', limiter);

// ============================================================================
// ERROR HANDLER
// ============================================================================
const { errorHandler } = require('./middleware/errorHandler');

app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: `Route ${req.method} ${req.url} not found`,
        code: 'ROUTE_NOT_FOUND'
    });
});

app.use(errorHandler);

// ============================================================================
// ЗАПУСК СЕРВЕРА
// ============================================================================
async function startServer() {
    try {
        await prisma.$connect();
        console.log('✅ База данных подключена через Prisma');
        
        app.listen(PORT, '0.0.0.0', () => {
            console.log('\n' + '═'.repeat(70));
            console.log('        🚀 FINANCEMIND СЕРВЕР V8.1 ЗАПУЩЕН');
            console.log('═'.repeat(70));
            console.log(`   📍 Адрес: http://localhost:${PORT}`);
            console.log(`   💱 API курсов: http://localhost:${PORT}/api/rates`);
            console.log(`   🔐 JWT Auth: http://localhost:${PORT}/api/auth/sync`);
            console.log(`   🧪 [TEST] JWT без БД: http://localhost:${PORT}/api/test/sync`);
            console.log(`   💾 Database: SQLite + Prisma`);
            console.log(`   👤 User API: http://localhost:${PORT}/api/user/me`);
            console.log(`   🤖 [AI] CHAT API: http://localhost:${PORT}/api/v1/ai/chat`);
            console.log(`   🤖 [AI] CHAT PROXY: http://localhost:${PORT}/api/ai/chat ✅`);
            console.log(`   📊 [AI] Usage Stats: http://localhost:${PORT}/api/v1/ai/usage/stats`);
            console.log(`   📤 [UPLOAD] POST /upload - загрузка файлов`);
            console.log(`   📊 [UPLOAD] GET /api/transactions - получение транзакций`);
            console.log(`   🗑️ [UPLOAD] DELETE /api/transactions - удаление транзакций`);
            console.log('═'.repeat(70));
            console.log('   ✅ ИСПРАВЛЕНИЯ:');
            console.log('   ✅ ПРОБЛЕМА 2: Прокси /api/ai/chat → /api/v1/ai/chat');
            console.log('═'.repeat(70) + '\n');
        });
        
    } catch (error) {
        console.error('❌ Ошибка запуска сервера:', error);
        console.log('\n⚠️ Сервер запускается без базы данных (только локальное хранилище)\n');
        
        app.listen(PORT, '0.0.0.0', () => {
            console.log('\n' + '═'.repeat(70));
            console.log('        🚀 FINANCEMIND СЕРВЕР V8.1 (FALLBACK РЕЖИМ)');
            console.log('═'.repeat(70));
            console.log(`   📍 Адрес: http://localhost:${PORT}`);
            console.log(`   🤖 [AI] CHAT PROXY: http://localhost:${PORT}/api/ai/chat ✅`);
            console.log('═'.repeat(70) + '\n');
        });
    }
}

process.on('SIGTERM', async () => {
    console.log('SIGTERM received, closing server...');
    await prisma.$disconnect();
    process.exit(0);
});

process.on('SIGINT', async () => {
    console.log('SIGINT received, closing server...');
    await prisma.$disconnect();
    process.exit(0);
});

startServer();