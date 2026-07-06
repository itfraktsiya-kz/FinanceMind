// middleware/aiRateLimit.js
// AI-specific rate limiting middleware
const rateLimit = require('express-rate-limit');
const { PrismaClient } = require('@prisma/client');
const { logger } = require('../utils/logger');

const prisma = new PrismaClient();

/**
 * Валидация AI запроса
 */
const validateAIRequest = (req, res, next) => {
    const { message } = req.body;
    
    if (!message || typeof message !== 'string') {
        return res.status(400).json({
            success: false,
            error: 'Поле "message" обязательно и должно быть строкой'
        });
    }
    
    if (message.trim().length === 0) {
        return res.status(400).json({
            success: false,
            error: 'Сообщение не может быть пустым'
        });
    }
    
    const maxLength = parseInt(process.env.AI_MAX_MESSAGE_LENGTH) || 4000;
    if (message.length > maxLength) {
        return res.status(400).json({
            success: false,
            error: `Сообщение не может превышать ${maxLength} символов`
        });
    }
    
    next();
};

/**
 * Rate limiter для AI запросов (в минуту)
 */
const aiRateLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 минута
    max: 30, // максимум 30 запросов в минуту
    message: {
        success: false,
        error: 'Слишком много AI запросов. Пожалуйста, подождите минуту.'
    },
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => {
        return req.user?.id || req.ip;
    },
    skip: (req) => {
        return req.user?.plan === 'ELITE';
    }
});

/**
 * Проверка дневного лимита запросов
 */
async function checkDailyRequestLimit(req, res, next) {
    try {
        const user = req.user;
        if (!user) {
            if (next) return next();
            return res.status(401).json({ error: 'Unauthorized' });
        }
        
        // Определяем лимиты для тарифа
        const tierLimits = {
            FREE: { requestsPerDay: 10, tokensPerDay: 10000 },
            PRO: { requestsPerDay: 500, tokensPerDay: 500000 },
            ELITE: { requestsPerDay: null, tokensPerDay: null }
        };
        
        const limits = tierLimits[user.plan] || tierLimits.FREE;
        
        // ELITE имеет безлимит
        if (limits.requestsPerDay === null) {
            req.tierLimits = limits;
            if (next) return next();
            return;
        }
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        // Получаем или создаем запись дневного лимита
        let dailyLimit = await prisma.dailyLimit.findUnique({
            where: {
                userId_date: {
                    userId: user.id,
                    date: today,
                },
            },
        });
        
        if (!dailyLimit) {
            dailyLimit = await prisma.dailyLimit.create({
                data: {
                    userId: user.id,
                    date: today,
                    requestsCount: 0,
                    tokensUsed: 0,
                },
            });
        }
        
        // Проверяем превышение лимита
        if (dailyLimit.requestsCount >= limits.requestsPerDay) {
            const resetAt = new Date(today);
            resetAt.setDate(resetAt.getDate() + 1);
            
            if (next) {
                const error = new Error(`Daily request limit of ${limits.requestsPerDay} exceeded`);
                error.resetAt = resetAt;
                error.limitType = 'requests';
                error.statusCode = 429;
                return next(error);
            }
            
            return res.status(429).json({
                success: false,
                error: `Достигнут дневной лимит AI запросов (${limits.requestsPerDay}). Лимит обновится завтра.`,
                resetAt: resetAt.toISOString(),
                limitType: 'requests'
            });
        }
        
        // Прикрепляем dailyLimit к запросу для последующего инкремента
        req.dailyLimit = dailyLimit;
        req.tierLimits = limits;
        
        if (next) return next();
        
    } catch (error) {
        logger.error('Rate limit check error:', error);
        if (next) return next(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

/**
 * Проверка дневного лимита токенов
 */
async function checkDailyTokenLimit(req, res, next) {
    try {
        const user = req.user;
        if (!user) {
            if (next) return next();
            return;
        }
        
        const tierLimits = {
            FREE: { requestsPerDay: 10, tokensPerDay: 10000 },
            PRO: { requestsPerDay: 500, tokensPerDay: 500000 },
            ELITE: { requestsPerDay: null, tokensPerDay: null }
        };
        
        const limits = tierLimits[user.plan] || tierLimits.FREE;
        
        if (limits.tokensPerDay === null) {
            if (next) return next();
            return;
        }
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        let dailyLimit = await prisma.dailyLimit.findUnique({
            where: {
                userId_date: {
                    userId: user.id,
                    date: today,
                },
            },
        });
        
        if (dailyLimit && dailyLimit.tokensUsed >= limits.tokensPerDay) {
            const resetAt = new Date(today);
            resetAt.setDate(resetAt.getDate() + 1);
            
            if (next) {
                const error = new Error(`Daily token limit of ${limits.tokensPerDay} exceeded`);
                error.resetAt = resetAt;
                error.limitType = 'tokens';
                error.statusCode = 429;
                return next(error);
            }
            
            return res.status(429).json({
                success: false,
                error: `Достигнут дневной лимит токенов (${limits.tokensPerDay}). Лимит обновится завтра.`,
                resetAt: resetAt.toISOString(),
                limitType: 'tokens'
            });
        }
        
        if (next) return next();
        
    } catch (error) {
        logger.error('Token limit check error:', error);
        if (next) return next(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

/**
 * Инкремент счетчика запросов после успешного AI вызова
 */
async function incrementRequestCount(req, res, next) {
    if (req.dailyLimit && req.dailyLimit.id) {
        try {
            await prisma.dailyLimit.update({
                where: { id: req.dailyLimit.id },
                data: { requestsCount: { increment: 1 } },
            });
        } catch (error) {
            logger.error('Failed to increment request count:', error);
        }
    }
    if (next) next();
}

/**
 * Инкремент использования токенов
 */
async function incrementTokenUsage(userId, tokensUsed) {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        await prisma.dailyLimit.upsert({
            where: {
                userId_date: {
                    userId: userId,
                    date: today,
                },
            },
            update: {
                tokensUsed: { increment: tokensUsed },
            },
            create: {
                userId: userId,
                date: today,
                requestsCount: 0,
                tokensUsed: tokensUsed,
            },
        });
        
        // Также обновляем общую статистику пользователя
        await prisma.user.update({
            where: { id: userId },
            data: {
                totalTokensUsed: { increment: tokensUsed },
                totalRequests: { increment: 1 },
            },
        });
    } catch (error) {
        logger.error('Failed to increment token usage:', error);
    }
}

// Комбинированный middleware для rate limiting
const rateLimitAI = [aiRateLimiter, checkDailyRequestLimit];

module.exports = {
    validateAIRequest,
    rateLimitAI,
    aiRateLimiter,
    checkDailyRequestLimit,
    checkDailyTokenLimit,
    incrementRequestCount,
    incrementTokenUsage
};