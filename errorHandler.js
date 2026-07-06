// middleware/errorHandler.js
// Centralized error handler for the application
const { logger } = require('../utils/logger');
const { AppError } = require('../utils/errors');

function errorHandler(err, req, res, next) {
    // Логируем ошибку
    logger.error('Error occurred', {
        error: {
            name: err.name,
            message: err.message,
            code: err.code,
            stack: err.stack,
            originalStack: err.originalStack,
            model: err.model,
            openAICode: err.openAICode,
            prismaCode: err.prismaCode
        },
        request: {
            method: req.method,
            url: req.url,
            body: req.body,
            query: req.query,
            params: req.params,
            userId: req.user?.id,
            userAgent: req.headers['user-agent'],
            ip: req.ip
        }
    });

    // Если ошибка уже имеет статус код - используем его
    const statusCode = err.statusCode || 500;
    const errorCode = err.code || 'INTERNAL_ERROR';
    
    // Формируем ответ
    const errorResponse = {
        success: false,
        error: err.message || 'Internal server error',
        code: errorCode,
        timestamp: err.timestamp || new Date().toISOString()
    };
    
    // Добавляем дополнительные поля для определенных ошибок
    if (err instanceof AppError) {
        if (err.resetAt) {
            errorResponse.resetAt = err.resetAt;
        }
        if (err.limitType) {
            errorResponse.limitType = err.limitType;
        }
        if (err.model) {
            errorResponse.model = err.model;
        }
        if (err.feature) {
            errorResponse.feature = err.feature;
            errorResponse.requiredPlan = err.requiredPlan;
        }
    }
    
    // В режиме разработки добавляем стек
    if (process.env.NODE_ENV === 'development') {
        errorResponse.stack = err.stack;
        if (err.originalStack) {
            errorResponse.originalStack = err.originalStack;
        }
    }
    
    // Специфичные статус коды для определенных ошибок
    if (err.name === 'ValidationError') {
        errorResponse.error = err.message;
    } else if (err.name === 'RateLimitError') {
        errorResponse.error = err.message;
        errorResponse.retryAfter = err.resetAt ? 
            Math.ceil((new Date(err.resetAt) - new Date()) / 1000) : 3600;
    } else if (err.name === 'OpenAIApiError') {
        errorResponse.error = 'OpenAI API error';
        errorResponse.details = err.message;
    } else if (err.name === 'NetworkError') {
        errorResponse.error = 'Network connectivity issue';
        errorResponse.details = err.message;
    } else if (statusCode === 500) {
        // Не показываем детали внутренних ошибок в production
        if (process.env.NODE_ENV === 'production') {
            errorResponse.error = 'Internal server error';
        }
    }
    
    res.status(statusCode).json(errorResponse);
}

// Асинхронный обработчик для роутов
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = {
    errorHandler,
    asyncHandler
};