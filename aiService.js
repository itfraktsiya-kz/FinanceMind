// services/aiService.js
const geminiService = require('./geminiService');
const dataService = require('./dataService');
const { AI_PROMPTS, AI_CONFIG, USER_TIERS } = require('../config/ai.config');

class AIService {
    constructor() {
        this.useGemini = process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== '';
        console.log(`✅ AI Service initialized with ${this.useGemini ? 'Gemini' : 'OpenAI (fallback)'}`);
    }

    // ==========================================================
    // 1. MAIN CHAT
    // ==========================================================
    async chat(userId, userQuestion, conversationHistory = []) {
        console.log('💬 AI Chat вызван');
        console.log(`👤 Пользователь: ${userId}`);
        console.log(`❓ Вопрос: ${userQuestion}`);

        try {
            const financialData = await dataService.getUserFinancialData(userId);
            const userProfile = await dataService.getUserProfile(userId);

            const userData = {
                profile: userProfile,
                financial: financialData,
                recentTransactions: await dataService.getTransactions(userId, 20),
                goals: financialData.goals || [],
                alerts: await dataService.getUserAlerts(userId, 5)
            };

            const systemPrompt = AI_PROMPTS.chat.system;
            const userPrompt = AI_PROMPTS.chat.user
                .replace('{{userData}}', JSON.stringify(userData, null, 2))
                .replace('{{userQuestion}}', userQuestion);

            let fullPrompt = systemPrompt + '\n\n' + userPrompt;
            if (conversationHistory && conversationHistory.length > 0) {
                const history = conversationHistory.slice(-5).map(msg => 
                    `${msg.role}: ${msg.content}`
                ).join('\n');
                fullPrompt += '\n\n## ИСТОРИЯ ДИАЛОГА\n' + history;
            }

            const response = await geminiService.generateResponse(fullPrompt, userData);

            return {
                success: true,
                response: response,
                timestamp: new Date().toISOString()
            };

        } catch (error) {
            console.error('❌ AI Chat Error:', error);
            return {
                success: false,
                error: error.message || 'Failed to get AI response',
                statusCode: error.statusCode || 500
            };
        }
    }

    // ==========================================================
    // 1.1 CHAT WITH DATA (НОВЫЙ МЕТОД ДЛЯ ФРОНТЕНДА)
    // ==========================================================
    async chatWithData(userId, userQuestion, userData = null, conversationHistory = []) {
        console.log('💬 AI ChatWithData вызван');
        console.log(`👤 Пользователь: ${userId}`);
        console.log(`❓ Вопрос: ${userQuestion}`);
        console.log(`📊 Данные от фронтенда: ${!!userData}`);
        console.log(`📊 Транзакций: ${userData?.transactions?.length || 0}`);

        try {
            // Если данные не переданы, получаем из БД
            let financialData;
            if (userData) {
                // Используем данные от фронтенда
                financialData = {
                    balance: userData.balance || 0,
                    totalIncome: userData.totalIncome || 0,
                    totalExpenses: userData.totalExpense || 0,
                    monthlyIncome: userData.monthlyIncome || 0,
                    monthlyExpenses: userData.monthlyExpense || 0,
                    monthlySavings: (userData.monthlyIncome || 0) - (userData.monthlyExpense || 0),
                    savingsRate: userData.savingsRate || 0,
                    expensesByCategory: userData.expensesByCategory || {},
                    largestExpenseCategory: userData.largestExpenseCategory || 'Нет данных',
                    goals: userData.goals || [],
                    recentTransactions: userData.transactions || [],
                    transactionCount: userData.transactions?.length || 0,
                    financialScore: userData.financialScore || 50,
                    oneMonthForecast: userData.oneMonthForecast || 'Нет данных',
                    sixMonthForecast: userData.sixMonthForecast || 'Нет данных',
                    currency: userData.currency || '₸'
                };
            } else {
                // Получаем из БД
                financialData = await dataService.getUserFinancialData(userId);
            }

            console.log('📊 Финансовые данные собраны:', {
                balance: financialData.balance,
                totalIncome: financialData.totalIncome,
                totalExpenses: financialData.totalExpenses,
                transactionCount: financialData.transactionCount,
                savingsRate: financialData.savingsRate
            });

            // Форматируем данные для промпта
            const context = {
                balance: financialData.balance || 0,
                totalIncome: financialData.totalIncome || 0,
                totalExpenses: financialData.totalExpenses || 0,
                monthlyIncome: financialData.monthlyIncome || 0,
                monthlyExpenses: financialData.monthlyExpenses || 0,
                monthlySavings: financialData.monthlySavings || 0,
                savingsRate: financialData.savingsRate || 0,
                expensesByCategory: financialData.expensesByCategory || {},
                largestExpenseCategory: financialData.largestExpenseCategory || 'Нет данных',
                goals: financialData.goals || [],
                recentTransactions: financialData.recentTransactions || [],
                transactionCount: financialData.transactionCount || 0,
                financialScore: financialData.financialScore || 50,
                oneMonthForecast: financialData.oneMonthForecast || 'Нет данных',
                sixMonthForecast: financialData.sixMonthForecast || 'Нет данных',
                currency: financialData.currency || '₸'
            };

            // Формируем историю диалога
            let history = '';
            if (conversationHistory && conversationHistory.length > 0) {
                const lastMessages = conversationHistory.slice(-5);
                history = lastMessages.map(msg => 
                    `${msg.role === 'user' ? 'Пользователь' : 'AI'}: ${msg.content}`
                ).join('\n');
            }

            // Строим полный промпт
            const prompt = `
Ты - FinanceMind AI, персональный финансовый ассистент. У тебя есть доступ к реальным финансовым данным пользователя.

ДАННЫЕ ПОЛЬЗОВАТЕЛЯ:
- Баланс: ${context.balance} ${context.currency}
- Общий доход: ${context.totalIncome} ${context.currency}
- Общие расходы: ${context.totalExpenses} ${context.currency}
- Ежемесячный доход: ${context.monthlyIncome} ${context.currency}
- Ежемесячные расходы: ${context.monthlyExpenses} ${context.currency}
- Ежемесячные сбережения: ${context.monthlySavings} ${context.currency}
- Процент сбережений: ${context.savingsRate}%
- Количество транзакций: ${context.transactionCount}
- Расходы по категориям: ${JSON.stringify(context.expensesByCategory, null, 2)}
- Самая затратная категория: ${context.largestExpenseCategory}
- Цели: ${context.goals.length > 0 ? JSON.stringify(context.goals, null, 2) : 'Нет активных целей'}
- Финансовый рейтинг: ${context.financialScore}/100
- Прогноз на 1 месяц: ${context.oneMonthForecast}
- Прогноз на 6 месяцев: ${context.sixMonthForecast}

${history ? `ИСТОРИЯ ДИАЛОГА:\n${history}\n` : ''}

ВОПРОС ПОЛЬЗОВАТЕЛЯ:
${userQuestion}

ОТВЕТЬ на вопрос пользователя, используя ТОЛЬКО реальные данные из его финансов.
Будь конкретным, давай практические советы с реальными числами.
Если пользователь спрашивает про категории расходов - назови конкретные категории и суммы.
Если спрашивает про цели - скажи, сколько осталось и что можно сделать.
Отвечай на русском языке.
`;

            console.log('📤 Отправка промпта в Gemini...');
            
            // Отправляем в Gemini
            const result = await geminiService.generateResponse(prompt, context);

            if (result.success) {
                console.log('✅ Ответ получен от Gemini');
                return {
                    success: true,
                    response: result.response,
                    timestamp: new Date().toISOString()
                };
            } else {
                console.error('❌ Ошибка Gemini:', result.error);
                // Возвращаем fallback ответ
                return {
                    success: true,
                    response: this.getFallbackResponse(userQuestion, context),
                    timestamp: new Date().toISOString()
                };
            }

        } catch (error) {
            console.error('❌ AI ChatWithData Error:', error);
            return {
                success: false,
                error: error.message || 'Failed to get AI response',
                statusCode: error.statusCode || 500
            };
        }
    }

    // Fallback ответ, если Gemini не работает
    getFallbackResponse(question, context) {
        const q = question.toLowerCase();
        const balance = context.balance || 0;
        const income = context.totalIncome || 0;
        const expenses = context.totalExpenses || 0;
        const savingsRate = context.savingsRate || 0;
        const largestCategory = context.largestExpenseCategory || 'неопределенной категории';
        const goals = context.goals || [];
        
        if (q.includes('баланс') || q.includes('деньги') || q.includes('сколько')) {
            return `📊 Ваш текущий баланс: ${balance.toFixed(0)} ₸. Доходы: ${income.toFixed(0)} ₸. Расходы: ${expenses.toFixed(0)} ₸. Процент сбережений: ${savingsRate}%.`;
        }
        
        if (q.includes('расход') || q.includes('трат')) {
            return `💸 Ваши общие расходы: ${expenses.toFixed(0)} ₸. Больше всего вы тратите на "${largestCategory}". Рекомендую обратить внимание на эту категорию для оптимизации бюджета.`;
        }
        
        if (q.includes('совет') || q.includes('рекоменд') || q.includes('оптимиз')) {
            if (balance < 0) {
                return `⚠️ Ваши расходы превышают доходы на ${Math.abs(balance).toFixed(0)} ₸. Совет: сократите траты на "${largestCategory}" или найдите дополнительный источник дохода.`;
            } else if (savingsRate > 20) {
                return `🌟 Отлично! Вы экономите ${savingsRate}% дохода. Рекомендую инвестировать часть сбережений или создать резервный фонд.`;
            } else {
                return `📈 Старайтесь откладывать хотя бы 10-20% дохода. Используйте правило 50/30/20: 50% на необходимое, 30% на желания, 20% на сбережения.`;
            }
        }
        
        if (q.includes('цель') || q.includes('мечт')) {
            if (goals.length > 0) {
                return `🎯 У вас ${goals.length} активных целей. Общая сумма целей: ${goals.reduce((s, g) => s + (g.targetAmount || 0), 0).toFixed(0)} ₸. Уже накоплено: ${goals.reduce((s, g) => s + (g.currentAmount || 0), 0).toFixed(0)} ₸.`;
            } else {
                return `🎯 У вас пока нет целей. Создайте свою первую цель!`;
            }
        }
        
        return `🤖 Я ваш финансовый ассистент. Могу помочь с анализом баланса, расходов, дать советы по оптимизации бюджета, помочь с целями. Задайте конкретный вопрос!`;
    }

    // ==========================================================
    // 2. MONTHLY FINANCIAL REVIEW
    // ==========================================================
    async monthlyReview(userId) {
        console.log('📊 Monthly Financial Review вызван');
        console.log(`👤 Пользователь: ${userId}`);

        try {
            const financialData = await dataService.getUserFinancialData(userId);
            const userProfile = await dataService.getUserProfile(userId);
            const transactions = await dataService.getTransactions(userId, 100);
            const goals = await dataService.getUserGoals(userId);

            const userData = {
                profile: userProfile,
                financial: financialData,
                recentTransactions: transactions,
                goals: goals || []
            };

            const systemPrompt = AI_PROMPTS.monthlyReview.system;
            const userPrompt = AI_PROMPTS.monthlyReview.user
                .replace('{{userData}}', JSON.stringify(userData, null, 2));

            const fullPrompt = systemPrompt + '\n\n' + userPrompt;

            const response = await geminiService.generateResponse(fullPrompt, userData);

            // Если ответ в виде строки, парсим в JSON
            let parsedResponse = response;
            if (typeof response === 'string') {
                try {
                    const jsonMatch = response.match(/\{[\s\S]*\}/);
                    if (jsonMatch) {
                        parsedResponse = JSON.parse(jsonMatch[0]);
                    }
                } catch (e) {
                    console.warn('Не удалось распарсить JSON, используем строку');
                    parsedResponse = response;
                }
            }

            const schema = {
                problems: [],
                recommendations: [],
                largestExpenseCategory: financialData.largestExpenseCategory || 'Не определено',
                fastestGrowingCategory: financialData.largestExpenseCategory || 'Не определено',
                savingsRate: financialData.savingsRate || '0%',
                oneMonthForecast: financialData.oneMonthForecast || 'Нет данных',
                sixMonthForecast: financialData.sixMonthForecast || 'Нет данных',
                financialScore: financialData.financialScore || 50,
                summary: `Ваш финансовый рейтинг: ${financialData.financialScore || 50}/100. ${(financialData.savingsRate || 0) > 10 ? 'Хороший уровень сбережений' : 'Рекомендуется увеличить сбережения'}`
            };

            let result = { ...schema };
            if (typeof parsedResponse === 'object' && parsedResponse !== null) {
                result = { ...schema, ...parsedResponse };
            } else if (typeof parsedResponse === 'string') {
                result.summary = parsedResponse;
            }

            return {
                success: true,
                data: result,
                timestamp: new Date().toISOString()
            };

        } catch (error) {
            console.error('❌ Monthly Review Error:', error);
            return {
                success: false,
                error: error.message || 'Failed to generate monthly review',
                statusCode: error.statusCode || 500
            };
        }
    }

    // ==========================================================
    // 3. FINANCIAL COACH
    // ==========================================================
    async financialCoach(userId) {
        console.log('🧠 Financial Coach вызван');
        console.log(`👤 Пользователь: ${userId}`);

        try {
            const financialData = await dataService.getUserFinancialData(userId);
            const userProfile = await dataService.getUserProfile(userId);
            const transactions = await dataService.getTransactions(userId, 100);
            const goals = await dataService.getUserGoals(userId);

            const userData = {
                profile: userProfile,
                financial: financialData,
                recentTransactions: transactions,
                goals: goals || []
            };

            const systemPrompt = AI_PROMPTS.financialCoach.system;
            const userPrompt = AI_PROMPTS.financialCoach.user
                .replace('{{userData}}', JSON.stringify(userData, null, 2));

            const fullPrompt = systemPrompt + '\n\n' + userPrompt;

            const response = await geminiService.generateResponse(fullPrompt, userData);

            return {
                success: true,
                response: response,
                timestamp: new Date().toISOString()
            };

        } catch (error) {
            console.error('❌ Financial Coach Error:', error);
            return {
                success: false,
                error: error.message || 'Failed to generate coach analysis',
                statusCode: error.statusCode || 500
            };
        }
    }

    // ==========================================================
    // 4. GOAL PLANNER
    // ==========================================================
    async goalPlanner(userId, goalName, targetAmount, deadline, currentSavings = 0) {
        console.log('🎯 Goal Planner вызван');
        console.log(`👤 Пользователь: ${userId}`);
        console.log(`🎯 Цель: ${goalName} - ${targetAmount} ₸ через ${deadline}`);

        try {
            const financialData = await dataService.getUserFinancialData(userId);
            const userProfile = await dataService.getUserProfile(userId);

            const deadlineDate = new Date(deadline);
            const now = new Date();
            const monthsUntilDeadline = Math.max(1, Math.ceil((deadlineDate - now) / (1000 * 60 * 60 * 24 * 30)));
            
            const monthlyIncome = financialData.monthlyIncome || 0;
            const monthlyExpenses = financialData.monthlyExpenses || 0;
            const freeCash = monthlyIncome - monthlyExpenses;
            const requiredMonthly = targetAmount / monthsUntilDeadline;

            const probability = this.calculateGoalProbability(freeCash, requiredMonthly);
            const currentSavingsActual = currentSavings || financialData.balance || 0;

            const userData = {
                profile: userProfile,
                financial: financialData,
                goalName: goalName,
                goalAmount: targetAmount,
                goalDeadline: deadline,
                monthlyIncome: monthlyIncome,
                monthlyExpenses: monthlyExpenses,
                freeCash: freeCash,
                currentSavings: currentSavingsActual,
                requiredMonthly: requiredMonthly
            };

            const systemPrompt = AI_PROMPTS.goalPlanner.system;
            const userPrompt = AI_PROMPTS.goalPlanner.user
                .replace('{{userData}}', JSON.stringify(userData, null, 2))
                .replace('{{goalName}}', goalName)
                .replace('{{goalAmount}}', targetAmount)
                .replace('{{goalDeadline}}', deadline)
                .replace('{{monthlyIncome}}', monthlyIncome)
                .replace('{{monthlyExpenses}}', monthlyExpenses)
                .replace('{{freeCash}}', freeCash);

            const fullPrompt = systemPrompt + '\n\n' + userPrompt;

            const response = await geminiService.generateResponse(fullPrompt, userData);

            // Создаем структурированный ответ
            const result = {
                goalName: goalName,
                targetAmount: targetAmount,
                deadline: deadline,
                monthsUntilDeadline: monthsUntilDeadline,
                requiredMonthly: requiredMonthly,
                currentSavings: currentSavingsActual,
                freeCash: freeCash,
                probability: probability,
                text: response || `Для достижения цели "${goalName}" вам нужно откладывать ${requiredMonthly.toFixed(0)} ₸ в месяц. Текущий свободный доход: ${freeCash.toFixed(0)} ₸.`
            };

            return {
                success: true,
                data: result,
                timestamp: new Date().toISOString()
            };

        } catch (error) {
            console.error('❌ Goal Planner Error:', error);
            return {
                success: false,
                error: error.message || 'Failed to generate goal plan',
                statusCode: error.statusCode || 500
            };
        }
    }

    // ==========================================================
    // 5. AI ALERTS
    // ==========================================================
    async generateAlerts(userId) {
        console.log('🔔 AI Alerts вызван');
        console.log(`👤 Пользователь: ${userId}`);

        try {
            const financialData = await dataService.getUserFinancialData(userId);
            const userProfile = await dataService.getUserProfile(userId);
            const transactions = await dataService.getTransactions(userId, 100);
            const goals = await dataService.getUserGoals(userId);

            // Генерируем простые алерты на основе данных
            const alerts = [];
            const balance = financialData.balance || 0;
            const savingsRate = financialData.savingsRate || 0;

            if (balance < 0) {
                alerts.push({
                    id: `alert_${Date.now()}_1`,
                    title: '⚠️ Отрицательный баланс',
                    message: `Ваш баланс отрицательный: ${balance.toFixed(0)} ₸. Срочно пересмотрите бюджет!`,
                    severity: 'danger',
                    createdAt: new Date().toISOString()
                });
            }

            if (savingsRate < 10 && savingsRate > 0) {
                alerts.push({
                    id: `alert_${Date.now()}_2`,
                    title: '📉 Низкий уровень сбережений',
                    message: `Ваш уровень сбережений составляет ${savingsRate}%. Рекомендуется увеличить до 10-20%.`,
                    severity: 'warning',
                    createdAt: new Date().toISOString()
                });
            }

            if (savingsRate === 0) {
                alerts.push({
                    id: `alert_${Date.now()}_3`,
                    title: '💰 Нет сбережений',
                    message: 'Вы не откладываете деньги. Начните с малого - 5% от дохода.',
                    severity: 'warning',
                    createdAt: new Date().toISOString()
                });
            }

            if (financialData.largestExpenseCategory && financialData.largestExpenseCategory !== 'Нет данных') {
                const expenses = financialData.expensesByCategory || {};
                const amount = expenses[financialData.largestExpenseCategory] || 0;
                if (amount > 0 && amount > financialData.totalIncome * 0.4) {
                    alerts.push({
                        id: `alert_${Date.now()}_4`,
                        title: '💸 Высокие расходы на категорию',
                        message: `Вы тратите ${amount.toFixed(0)} ₸ на "${financialData.largestExpenseCategory}" - это ${(amount / financialData.totalIncome * 100).toFixed(0)}% дохода.`,
                        severity: 'warning',
                        createdAt: new Date().toISOString()
                    });
                }
            }

            return {
                success: true,
                alerts: alerts,
                count: alerts.length,
                timestamp: new Date().toISOString()
            };

        } catch (error) {
            console.error('❌ Alerts Generation Error:', error);
            return {
                success: false,
                error: error.message || 'Failed to generate alerts',
                statusCode: error.statusCode || 500,
                alerts: []
            };
        }
    }

    // ==========================================================
    // 6. EXPENSE ANALYZER
    // ==========================================================
    async analyzeExpenses(userId, period = 30) {
        console.log('📊 Expense Analyzer вызван');
        console.log(`👤 Пользователь: ${userId}`);
        console.log(`📅 Период: ${period} дней`);

        try {
            const financialData = await dataService.getUserFinancialData(userId);
            const transactions = await dataService.getTransactions(userId, period * 2);
            
            const expenseData = {
                transactions: transactions.filter(t => t.type === 'expense'),
                categories: financialData.expensesByCategory || {},
                totalExpenses: financialData.totalExpenses || 0,
                monthlyExpenses: financialData.monthlyExpenses || 0,
                period: period,
                largestCategory: financialData.largestExpenseCategory || 'Не определено',
                savingsRate: financialData.savingsRate || 0
            };

            // Генерируем текстовый анализ
            let analysis = `📊 Анализ расходов за последние ${period} дней\n\n`;
            analysis += `Всего расходов: ${financialData.totalExpenses?.toFixed(0) || 0} ₸\n`;
            analysis += `Ежемесячные расходы: ${financialData.monthlyExpenses?.toFixed(0) || 0} ₸\n`;
            analysis += `Самая затратная категория: ${financialData.largestExpenseCategory || 'Не определено'}\n`;
            analysis += `Процент сбережений: ${financialData.savingsRate || 0}%\n\n`;
            
            analysis += `📋 Расходы по категориям:\n`;
            const categories = financialData.expensesByCategory || {};
            const sortedCats = Object.entries(categories).sort((a, b) => b[1] - a[1]);
            sortedCats.forEach(([cat, amount]) => {
                const percent = financialData.totalExpenses > 0 ? (amount / financialData.totalExpenses * 100).toFixed(1) : 0;
                analysis += `  • ${cat}: ${amount.toFixed(0)} ₸ (${percent}%)\n`;
            });

            return {
                success: true,
                data: analysis,
                period: period,
                timestamp: new Date().toISOString()
            };

        } catch (error) {
            console.error('❌ Expense Analysis Error:', error);
            return {
                success: false,
                error: error.message || 'Failed to analyze expenses',
                statusCode: error.statusCode || 500
            };
        }
    }

    // ==========================================================
    // 7. BUDGET FORECASTER
    // ==========================================================
    async budgetForecast(userId) {
        console.log('📈 Budget Forecaster вызван');
        console.log(`👤 Пользователь: ${userId}`);

        try {
            const financialData = await dataService.getUserFinancialData(userId);
            const transactions = await dataService.getTransactions(userId, 90);

            const monthlyIncome = financialData.monthlyIncome || 0;
            const monthlyExpenses = financialData.monthlyExpenses || 0;
            const monthlySavings = monthlyIncome - monthlyExpenses;
            const balance = financialData.balance || 0;

            const forecast = {
                currentMonth: {
                    income: monthlyIncome,
                    expenses: monthlyExpenses,
                    savings: monthlySavings,
                    balance: balance
                },
                nextMonth: {
                    income: monthlyIncome,
                    expenses: monthlyExpenses * 1.02, // +2% рост расходов
                    savings: monthlyIncome - monthlyExpenses * 1.02,
                    balance: balance + monthlySavings
                },
                threeMonths: {
                    savings: monthlySavings * 3,
                    balance: balance + monthlySavings * 3
                },
                sixMonths: {
                    savings: monthlySavings * 6,
                    balance: balance + monthlySavings * 6
                }
            };

            let text = `📈 Бюджетный прогноз\n\n`;
            text += `💰 Текущий баланс: ${balance.toFixed(0)} ₸\n`;
            text += `💵 Ежемесячный доход: ${monthlyIncome.toFixed(0)} ₸\n`;
            text += `💸 Ежемесячные расходы: ${monthlyExpenses.toFixed(0)} ₸\n`;
            text += `📊 Ежемесячные сбережения: ${monthlySavings.toFixed(0)} ₸\n\n`;
            text += `📅 Прогноз на 1 месяц: ${(balance + monthlySavings).toFixed(0)} ₸\n`;
            text += `📅 Прогноз на 3 месяца: ${(balance + monthlySavings * 3).toFixed(0)} ₸\n`;
            text += `📅 Прогноз на 6 месяцев: ${(balance + monthlySavings * 6).toFixed(0)} ₸\n`;

            if (monthlySavings < 0) {
                text += `\n⚠️ ВНИМАНИЕ: При текущем темпе ваш баланс будет уменьшаться на ${Math.abs(monthlySavings).toFixed(0)} ₸ каждый месяц!`;
            }

            return {
                success: true,
                data: text,
                forecast: forecast,
                timestamp: new Date().toISOString()
            };

        } catch (error) {
            console.error('❌ Budget Forecast Error:', error);
            return {
                success: false,
                error: error.message || 'Failed to generate budget forecast',
                statusCode: error.statusCode || 500
            };
        }
    }

    // ==========================================================
    // HELPER METHODS
    // ==========================================================

    calculateGoalProbability(freeCash, requiredMonthly) {
        if (freeCash <= 0) return { value: 0, label: 'Низкая', color: 'red' };
        const ratio = freeCash / requiredMonthly;
        if (ratio >= 1.2) return { value: 90, label: 'Очень высокая', color: 'green' };
        if (ratio >= 0.8) return { value: 70, label: 'Высокая', color: 'blue' };
        if (ratio >= 0.5) return { value: 50, label: 'Средняя', color: 'yellow' };
        if (ratio >= 0.3) return { value: 30, label: 'Низкая', color: 'orange' };
        return { value: 10, label: 'Очень низкая', color: 'red' };
    }

    async checkHealth() {
        return {
            success: true,
            status: 'operational',
            provider: this.useGemini ? 'gemini' : 'openai',
            useGemini: this.useGemini,
            timestamp: new Date().toISOString()
        };
    }
}

module.exports = new AIService();