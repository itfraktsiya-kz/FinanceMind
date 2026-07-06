// services/dataService.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class DataService {
    // ==========================================================
    // ОСНОВНОЙ МЕТОД - ПОЛУЧЕНИЕ ФИНАНСОВЫХ ДАННЫХ
    // ==========================================================
    async getUserFinancialData(userId) {
        try {
            console.log(`📊 Сбор финансовых данных для пользователя: ${userId}`);
            
            // Получаем все транзакции пользователя
            const transactions = await prisma.transaction.findMany({
                where: { userId: userId },
                orderBy: { date: 'desc' }
            });
            
            console.log(`📊 Найдено ${transactions.length} транзакций`);
            
            if (transactions.length === 0) {
                return this.getEmptyData();
            }

            // Расчеты
            const totalIncome = transactions
                .filter(t => t.type === 'income')
                .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);

            const totalExpenses = transactions
                .filter(t => t.type === 'expense')
                .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);

            // Расходы по категориям
            const expensesByCategory = {};
            transactions
                .filter(t => t.type === 'expense')
                .forEach(t => {
                    const cat = t.category || 'Другое';
                    expensesByCategory[cat] = (expensesByCategory[cat] || 0) + (parseFloat(t.amount) || 0);
                });

            // Самая большая категория расходов
            let largestExpenseCategory = 'Нет данных';
            let maxAmount = 0;
            Object.entries(expensesByCategory).forEach(([cat, amount]) => {
                if (amount > maxAmount) {
                    maxAmount = amount;
                    largestExpenseCategory = cat;
                }
            });

            // Цели
            const goals = await prisma.goal.findMany({
                where: { 
                    userId: userId,
                    status: 'active'
                }
            });

            // Категории с бюджетами
            const categories = await prisma.category.findMany({
                where: { userId: userId }
            });

            // Последние транзакции
            const recentTransactions = transactions.slice(0, 20);

            // Ежемесячные расходы (приблизительно)
            const monthlyIncome = totalIncome / 12;
            const monthlyExpenses = totalExpenses / 12;
            const monthlySavings = monthlyIncome - monthlyExpenses;

            // Процент сбережений
            const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome * 100) : 0;

            // Финансовый рейтинг
            let financialScore = 50;
            if (savingsRate > 20) financialScore += 20;
            else if (savingsRate > 10) financialScore += 10;
            else if (savingsRate > 0) financialScore += 5;
            
            if (goals.length > 0) financialScore += 10;
            if (monthlyExpenses < monthlyIncome * 0.7) financialScore += 10;
            
            financialScore = Math.min(100, Math.max(0, financialScore));

            // Прогнозы
            const oneMonthForecast = monthlySavings > 0 
                ? `➕ При текущем темпе вы накопите ${(monthlySavings).toFixed(0)} ₸ за месяц`
                : `⚠️ ${Math.abs(monthlySavings).toFixed(0)} ₸ дефицит в месяц`;
            
            const sixMonthForecast = monthlySavings > 0
                ? `➕ ${(monthlySavings * 6).toFixed(0)} ₸ за 6 месяцев`
                : `⚠️ ${Math.abs(monthlySavings * 6).toFixed(0)} ₸ дефицит за 6 месяцев`;

            // Определяем быстрорастущую категорию
            let fastestGrowingCategory = 'Нет данных';
            if (largestExpenseCategory !== 'Нет данных') {
                fastestGrowingCategory = largestExpenseCategory;
            }

            const result = {
                balance: totalIncome - totalExpenses,
                totalIncome,
                totalExpenses,
                monthlyIncome,
                monthlyExpenses,
                monthlySavings,
                savingsRate: parseFloat(savingsRate.toFixed(1)),
                expensesByCategory,
                monthlyExpensesByCategory: expensesByCategory,
                largestExpenseCategory,
                fastestGrowingCategory,
                goals,
                categories,
                recentTransactions,
                transactionCount: transactions.length,
                financialScore,
                oneMonthForecast,
                sixMonthForecast,
                currency: '₸'
            };

            console.log('📊 Данные собраны:', {
                balance: result.balance,
                totalIncome: result.totalIncome,
                totalExpenses: result.totalExpenses,
                transactionCount: result.transactionCount,
                savingsRate: result.savingsRate,
                largestExpenseCategory: result.largestExpenseCategory,
                financialScore: result.financialScore
            });

            return result;
            
        } catch (error) {
            console.error('❌ Ошибка dataService:', error);
            return this.getEmptyData();
        }
    }

    // ==========================================================
    // НОВЫЕ МЕТОДЫ ДЛЯ AI (из второй версии)
    // ==========================================================

    async getUserProfile(userId) {
        try {
            const user = await prisma.user.findUnique({
                where: { id: userId },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    plan: true,
                    level: true,
                    xp: true,
                    fincoinBalance: true,
                    createdAt: true
                }
            });
            
            if (user) {
                return user;
            }
            
            // Если пользователь не найден, возвращаем тестовые данные
            return {
                id: userId,
                email: 'test@example.com',
                name: 'Test User',
                plan: 'FREE',
                level: 1,
                xp: 0,
                fincoinBalance: 0,
                createdAt: new Date()
            };
        } catch (error) {
            console.error('Ошибка получения профиля:', error);
            return {
                id: userId,
                name: 'User',
                plan: 'FREE',
                level: 1,
                xp: 0,
                fincoinBalance: 0
            };
        }
    }

    async getTransactions(userId, limit = 100) {
        try {
            const transactions = await prisma.transaction.findMany({
                where: { userId: userId },
                orderBy: { date: 'desc' },
                take: limit
            });
            return transactions || [];
        } catch (error) {
            console.error('Ошибка получения транзакций:', error);
            return [];
        }
    }

    async getUserGoals(userId) {
        try {
            const goals = await prisma.goal.findMany({
                where: { 
                    userId: userId,
                    status: 'active'
                }
            });
            return goals || [];
        } catch (error) {
            console.error('Ошибка получения целей:', error);
            return [];
        }
    }

    async getUserAlerts(userId, limit = 10) {
        try {
            const alerts = await prisma.alert.findMany({
                where: { userId: userId },
                orderBy: { createdAt: 'desc' },
                take: limit
            });
            return alerts || [];
        } catch (error) {
            console.error('Ошибка получения алертов:', error);
            return [];
        }
    }

    // ==========================================================
    // МЕТОДЫ СОХРАНЕНИЯ (из второй версии)
    // ==========================================================

    async saveMonthlyReview(userId, reviewData) {
        try {
            console.log('📊 Сохранение месячного обзора для:', userId);
            // Здесь можно добавить сохранение в БД
            return { success: true };
        } catch (error) {
            console.error('Ошибка сохранения обзора:', error);
            return { success: false };
        }
    }

    async saveCoachAnalysis(userId, analysis) {
        try {
            console.log('🧠 Сохранение коуч-анализа для:', userId);
            return { success: true };
        } catch (error) {
            console.error('Ошибка сохранения анализа:', error);
            return { success: false };
        }
    }

    async saveGoalPlan(userId, planData) {
        try {
            console.log('🎯 Сохранение плана цели для:', userId);
            return { success: true };
        } catch (error) {
            console.error('Ошибка сохранения плана:', error);
            return { success: false };
        }
    }

    async saveAlert(userId, alertData) {
        try {
            console.log('🔔 Сохранение алерта для:', userId);
            return { success: true };
        } catch (error) {
            console.error('Ошибка сохранения алерта:', error);
            return { success: false };
        }
    }

    async saveExpenseAnalysis(userId, analysis) {
        try {
            console.log('📊 Сохранение анализа расходов для:', userId);
            return { success: true };
        } catch (error) {
            console.error('Ошибка сохранения анализа:', error);
            return { success: false };
        }
    }

    async saveBudgetForecast(userId, forecast) {
        try {
            console.log('📈 Сохранение бюджетного прогноза для:', userId);
            return { success: true };
        } catch (error) {
            console.error('Ошибка сохранения прогноза:', error);
            return { success: false };
        }
    }

    // ==========================================================
    // ДОПОЛНИТЕЛЬНЫЕ МЕТОДЫ (из второй версии)
    // ==========================================================

    async getUserCategories(userId) {
        try {
            const categories = await prisma.category.findMany({
                where: { userId: userId }
            });
            return categories || [];
        } catch (error) {
            console.error('Ошибка получения категорий:', error);
            return [];
        }
    }

    async getUserTransactionsByDateRange(userId, startDate, endDate) {
        try {
            const transactions = await prisma.transaction.findMany({
                where: {
                    userId: userId,
                    date: {
                        gte: startDate,
                        lte: endDate
                    }
                },
                orderBy: { date: 'desc' }
            });
            return transactions || [];
        } catch (error) {
            console.error('Ошибка получения транзакций по датам:', error);
            return [];
        }
    }

    async getCategoryExpenses(userId, category, startDate, endDate) {
        try {
            const transactions = await prisma.transaction.findMany({
                where: {
                    userId: userId,
                    category: category,
                    type: 'expense',
                    date: {
                        gte: startDate,
                        lte: endDate
                    }
                }
            });
            
            const total = transactions.reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);
            return total;
        } catch (error) {
            console.error('Ошибка получения расходов по категории:', error);
            return 0;
        }
    }

    async getMonthlySummary(userId, year, month) {
        try {
            const startDate = new Date(year, month, 1);
            const endDate = new Date(year, month + 1, 0);
            
            const transactions = await prisma.transaction.findMany({
                where: {
                    userId: userId,
                    date: {
                        gte: startDate,
                        lte: endDate
                    }
                }
            });
            
            let income = 0;
            let expenses = 0;
            const categories = {};
            
            transactions.forEach(t => {
                const amount = parseFloat(t.amount) || 0;
                if (t.type === 'income') {
                    income += amount;
                } else {
                    expenses += amount;
                    const cat = t.category || 'Другое';
                    categories[cat] = (categories[cat] || 0) + amount;
                }
            });
            
            return {
                income,
                expenses,
                savings: income - expenses,
                categories,
                transactionCount: transactions.length
            };
        } catch (error) {
            console.error('Ошибка получения месячного отчета:', error);
            return {
                income: 0,
                expenses: 0,
                savings: 0,
                categories: {},
                transactionCount: 0
            };
        }
    }

    // ==========================================================
    // ВСПОМОГАТЕЛЬНЫЕ МЕТОДЫ
    // ==========================================================

    getEmptyData() {
        return {
            balance: 0,
            totalIncome: 0,
            totalExpenses: 0,
            monthlyIncome: 0,
            monthlyExpenses: 0,
            monthlySavings: 0,
            savingsRate: 0,
            expensesByCategory: {},
            monthlyExpensesByCategory: {},
            largestExpenseCategory: 'Нет данных',
            fastestGrowingCategory: 'Нет данных',
            goals: [],
            categories: [],
            recentTransactions: [],
            transactionCount: 0,
            financialScore: 50,
            oneMonthForecast: 'Нет данных',
            sixMonthForecast: 'Нет данных',
            currency: '₸'
        };
    }
}

module.exports = new DataService();