// controllers/aiController.js
const aiService = require('../services/aiService');
const logger = require('../utils/logger');

// ================================================================
// CHAT
// ================================================================

exports.chat = async (req, res) => {
    try {
        const { message, userId, conversationHistory } = req.body;
        const userIdFromToken = req.user?.id || userId || 'test123';
        
        console.log('📨 AI Chat запрос от:', userIdFromToken);
        console.log('📝 Сообщение:', message);
        
        const result = await aiService.chatWithData(
            userIdFromToken,
            message,
            req.body.userData || null,
            conversationHistory || []
        );
        
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
        logger.error('Chat error:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message || 'Internal server error' 
        });
    }
};

exports.chatStream = async (req, res) => {
    try {
        const { message, userId } = req.body;
        const userIdFromToken = req.user?.id || userId || 'test123';
        
        // Устанавливаем заголовки для SSE
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        
        // Получаем данные пользователя
        const financialData = await dataService.getUserFinancialData(userIdFromToken);
        
        // Формируем промпт
        const prompt = `
Ты - финансовый ассистент. Отвечай кратко и по делу.
Данные пользователя:
- Баланс: ${financialData.balance || 0} ₸
- Доходы: ${financialData.totalIncome || 0} ₸
- Расходы: ${financialData.totalExpenses || 0} ₸
- Процент сбережений: ${financialData.savingsRate || 0}%

Вопрос: ${message}

Отвечай по частям, разделяя абзацы.
`;

        const result = await geminiService.generateResponse(prompt, financialData);
        
        if (result.success) {
            // Отправляем ответ по частям
            const words = result.response.split(' ');
            let currentChunk = '';
            
            for (const word of words) {
                currentChunk += word + ' ';
                if (currentChunk.length > 50) {
                    res.write(`data: ${JSON.stringify({ chunk: currentChunk })}\n\n`);
                    currentChunk = '';
                    // Небольшая задержка для эффекта стриминга
                    await new Promise(resolve => setTimeout(resolve, 50));
                }
            }
            
            if (currentChunk) {
                res.write(`data: ${JSON.stringify({ chunk: currentChunk })}\n\n`);
            }
            
            res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
            res.end();
        } else {
            res.write(`data: ${JSON.stringify({ error: result.error })}\n\n`);
            res.end();
        }
    } catch (error) {
        logger.error('Stream error:', error);
        res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
        res.end();
    }
};

// ================================================================
// FINANCIAL REVIEW
// ================================================================

exports.financialReview = async (req, res) => {
    try {
        const userId = req.user?.id || req.body.userId || 'test123';
        const result = await aiService.monthlyReview(userId);
        
        if (result.success) {
            res.json({ success: true, review: result.data });
        } else {
            res.status(result.statusCode || 500).json({
                success: false,
                error: result.error || 'Failed to generate financial review'
            });
        }
    } catch (error) {
        logger.error('Financial review error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

// ================================================================
// FINANCIAL COACH
// ================================================================

exports.financialCoach = async (req, res) => {
    try {
        const userId = req.user?.id || req.body.userId || 'test123';
        const result = await aiService.financialCoach(userId);
        
        if (result.success) {
            res.json({ success: true, coaching: result.response });
        } else {
            res.status(result.statusCode || 500).json({
                success: false,
                error: result.error || 'Failed to generate coach analysis'
            });
        }
    } catch (error) {
        logger.error('Financial coach error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

// ================================================================
// GOAL PLANNER
// ================================================================

exports.goalPlanner = async (req, res) => {
    try {
        const { goalName, targetAmount, deadline } = req.body;
        const userId = req.user?.id || req.body.userId || 'test123';
        
        if (!goalName || !targetAmount || !deadline) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields: goalName, targetAmount, deadline'
            });
        }
        
        const result = await aiService.goalPlanner(userId, goalName, parseFloat(targetAmount), deadline);
        
        if (result.success) {
            res.json({ success: true, plan: result.data });
        } else {
            res.status(result.statusCode || 500).json({
                success: false,
                error: result.error || 'Failed to generate goal plan'
            });
        }
    } catch (error) {
        logger.error('Goal planner error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

// ================================================================
// ALERTS
// ================================================================

exports.getAlerts = async (req, res) => {
    try {
        const userId = req.user?.id || 'test123';
        const result = await aiService.generateAlerts(userId);
        
        if (result.success) {
            res.json({ success: true, alerts: result.alerts });
        } else {
            res.json({ success: true, alerts: [] });
        }
    } catch (error) {
        logger.error('Alerts error:', error);
        res.json({ success: true, alerts: [] });
    }
};

// ================================================================
// USAGE STATS
// ================================================================

exports.getUsageStats = async (req, res) => {
    try {
        const userId = req.user?.id || 'test123';
        const user = req.user || {};
        
        res.json({
            success: true,
            stats: {
                plan: user.plan || 'FREE',
                requestsUsed: user.dailyAIRequests || 0,
                requestsLimit: user.aiLimits?.requestsPerDay || 10,
                tokensUsed: user.totalTokensUsed || 0,
                tokensLimit: user.aiLimits?.tokensPerDay || 10000,
                isUnlimited: user.aiLimits?.requestsPerDay === null
            }
        });
    } catch (error) {
        logger.error('Usage stats error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

// ================================================================
// HEALTH CHECK
// ================================================================

exports.checkHealth = async (req, res) => {
    try {
        const health = await aiService.checkHealth();
        res.json(health);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// ================================================================
// EXPENSE ANALYZER
// ================================================================

exports.analyzeExpenses = async (req, res) => {
    try {
        const userId = req.user?.id || req.body.userId || 'test123';
        const period = req.body.period || 30;
        const result = await aiService.analyzeExpenses(userId, period);
        res.json(result);
    } catch (error) {
        logger.error('Expense analysis error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

// ================================================================
// BUDGET FORECAST
// ================================================================

exports.budgetForecast = async (req, res) => {
    try {
        const userId = req.user?.id || req.body.userId || 'test123';
        const result = await aiService.budgetForecast(userId);
        res.json(result);
    } catch (error) {
        logger.error('Budget forecast error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

// ================================================================
// ADVICE
// ================================================================

exports.getAdvice = async (req, res) => {
    try {
        const userId = req.user?.id || req.body.userId || 'test123';
        const { question } = req.body;
        const result = await aiService.chatWithData(
            userId, 
            question || 'Дай совет по финансам',
            req.body.userData || null
        );
        res.json(result);
    } catch (error) {
        logger.error('Advice error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

// ================================================================
// GOAL RECOMMENDATIONS
// ================================================================

exports.goalRecommendations = async (req, res) => {
    try {
        const userId = req.user?.id || req.body.userId || 'test123';
        const financialData = await dataService.getUserFinancialData(userId);
        
        let recommendations = '🎯 Рекомендации по целям:\n\n';
        const monthlyIncome = financialData.monthlyIncome || 0;
        const monthlyExpenses = financialData.monthlyExpenses || 0;
        const freeCash = monthlyIncome - monthlyExpenses;
        
        if (freeCash > 0) {
            recommendations += `✅ У вас есть ${freeCash.toFixed(0)} ₸ свободных средств в месяц.\n`;
            recommendations += `💰 Рекомендуемая сумма для цели: ${(freeCash * 0.7).toFixed(0)} ₸ в месяц\n`;
            recommendations += `⏰ Время достижения цели за 12 месяцев: ${(freeCash * 0.7 * 12).toFixed(0)} ₸\n`;
        } else {
            recommendations += `⚠️ У вас нет свободных средств. Рекомендуется:\n`;
            recommendations += `  • Сократить расходы на ${Math.abs(freeCash).toFixed(0)} ₸ в месяц\n`;
            recommendations += `  • Найти дополнительный источник дохода\n`;
        }
        
        res.json({ success: true, recommendations });
    } catch (error) {
        logger.error('Goal recommendations error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

// ================================================================
// CONVERSATIONS
// ================================================================

exports.getConversations = async (req, res) => {
    try {
        const userId = req.user?.id || 'test123';
        // Можно реализовать сохранение истории в БД позже
        res.json({ success: true, conversations: [] });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.deleteConversation = async (req, res) => {
    try {
        const { conversationId } = req.params;
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.clearConversations = async (req, res) => {
    try {
        const userId = req.user?.id || 'test123';
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};