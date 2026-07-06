// utils/errors.js
// Custom error classes for AI module with improved error handling

// ============================================================================
// БАЗОВЫЙ КЛАСС ДЛЯ ВСЕХ ОШИБОК ПРИЛОЖЕНИЯ
// ============================================================================
class AppError extends Error {
    constructor(message, statusCode, code, originalError = null) {
        super(message);
        
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.code = code;
        this.timestamp = new Date().toISOString();
        
        // Сохраняем стек оригинальной ошибки если доступен
        if (originalError?.stack) {
            this.originalStack = originalError.stack;
            this.stack = originalError.stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
        
        // Дополнительная информация об оригинальной ошибке
        if (originalError) {
            this.originalMessage = originalError.message;
            this.originalName = originalError.name;
        }
    }
    
    toJSON() {
        return {
            name: this.name,
            message: this.message,
            code: this.code,
            statusCode: this.statusCode,
            timestamp: this.timestamp,
            ...(this.model && { model: this.model }),
            ...(this.resetAt && { resetAt: this.resetAt }),
            ...(this.limitType && { limitType: this.limitType }),
            ...(process.env.NODE_ENV === 'development' && { stack: this.stack })
        };
    }
}

// ============================================================================
// VALIDATION ERRORS (4xx)
// ============================================================================
class ValidationError extends AppError {
    constructor(message, originalError = null) {
        super(message, 400, 'VALIDATION_ERROR', originalError);
    }
}

class AuthenticationError extends AppError {
    constructor(message, originalError = null) {
        super(message, 401, 'AUTH_ERROR', originalError);
    }
}

class AuthorizationError extends AppError {
    constructor(message = 'Access denied', originalError = null) {
        super(message, 403, 'FORBIDDEN', originalError);
    }
}

class NotFoundError extends AppError {
    constructor(resource = 'Resource', originalError = null) {
        super(`${resource} not found`, 404, 'NOT_FOUND', originalError);
    }
}

class TimeoutError extends AppError {
    constructor(message = 'Request timeout', originalError = null) {
        super(message, 408, 'REQUEST_TIMEOUT', originalError);
    }
}

class RateLimitError extends AppError {
    constructor(message, resetAt = null, limitType = 'requests', originalError = null) {
        super(message, 429, 'RATE_LIMIT_EXCEEDED', originalError);
        this.resetAt = resetAt;
        this.limitType = limitType;
    }
}

// ============================================================================
// OPENAI SPECIFIC ERRORS (5xx)
// ============================================================================
class OpenAIApiError extends AppError {
    constructor(message, originalError = null, statusCode = 500, model = null) {
        super(message, statusCode, 'OPENAI_API_ERROR', originalError);
        this.model = model;
        
        // Определяем подтип ошибки на основе кода OpenAI
        if (originalError) {
            this.openAICode = originalError.code;
            this.openAIType = originalError.type;
            this.openAIStatus = originalError.status;
            
            // Уточняем статус код в зависимости от типа ошибки
            if (originalError.code === 'invalid_api_key') {
                this.statusCode = 401;
                this.code = 'OPENAI_AUTH_ERROR';
            } else if (originalError.code === 'rate_limit_exceeded') {
                this.statusCode = 429;
                this.code = 'OPENAI_RATE_LIMIT';
            } else if (originalError.code === 'insufficient_quota') {
                this.statusCode = 402;
                this.code = 'OPENAI_QUOTA_ERROR';
            }
        }
    }
}

class OpenAITimeoutError extends TimeoutError {
    constructor(model = null, originalError = null) {
        super(`OpenAI API timeout for model: ${model || 'unknown'}`, originalError);
        this.name = 'OpenAITimeoutError';
        this.code = 'OPENAI_TIMEOUT';
        this.model = model;
    }
}

class OpenAIAuthError extends AppError {
    constructor(message = 'OpenAI authentication failed', originalError = null) {
        super(message, 401, 'OPENAI_AUTH_ERROR', originalError);
    }
}

class OpenAIQuotaError extends AppError {
    constructor(message = 'OpenAI API quota exceeded', originalError = null) {
        super(message, 402, 'OPENAI_QUOTA_ERROR', originalError);
    }
}

// ============================================================================
// NETWORK ERRORS
// ============================================================================
class NetworkError extends AppError {
    constructor(message = 'Network error occurred', originalError = null) {
        super(message, 503, 'NETWORK_ERROR', originalError);
        
        // Определяем тип сетевой ошибки
        if (originalError) {
            if (originalError.code === 'ENOTFOUND') {
                this.message = 'DNS lookup failed - cannot reach OpenAI servers';
                this.code = 'NETWORK_DNS_ERROR';
            } else if (originalError.code === 'ECONNREFUSED') {
                this.message = 'Connection refused - OpenAI server is not responding';
                this.code = 'NETWORK_CONNECTION_REFUSED';
            } else if (originalError.code === 'ECONNRESET') {
                this.message = 'Connection reset - connection was interrupted';
                this.code = 'NETWORK_CONNECTION_RESET';
            } else if (originalError.code === 'ETIMEDOUT') {
                this.message = 'Connection timeout - server took too long to respond';
                this.code = 'NETWORK_TIMEOUT';
            }
        }
    }
}

// ============================================================================
// DATABASE ERRORS
// ============================================================================
class DatabaseError extends AppError {
    constructor(message = 'Database operation failed', originalError = null) {
        super(message, 500, 'DATABASE_ERROR', originalError);
    }
}

class PrismaError extends DatabaseError {
    constructor(message, originalError = null) {
        super(message, originalError);
        this.code = 'PRISMA_ERROR';
        
        // Определяем тип Prisma ошибки
        if (originalError?.code) {
            this.prismaCode = originalError.code;
            
            if (originalError.code === 'P2002') {
                this.message = 'Unique constraint violation';
                this.code = 'PRISMA_UNIQUE_VIOLATION';
            } else if (originalError.code === 'P2025') {
                this.message = 'Record not found';
                this.code = 'PRISMA_RECORD_NOT_FOUND';
                this.statusCode = 404;
            }
        }
    }
}

// ============================================================================
// BUSINESS LOGIC ERRORS
// ============================================================================
class InsufficientFundsError extends AppError {
    constructor(message = 'Insufficient FinCoin balance', originalError = null) {
        super(message, 400, 'INSUFFICIENT_FUNDS', originalError);
    }
}

class SubscriptionError extends AppError {
    constructor(message, originalError = null) {
        super(message, 402, 'SUBSCRIPTION_ERROR', originalError);
    }
}

class FeatureNotAvailableError extends AppError {
    constructor(feature, plan = null, originalError = null) {
        const message = plan 
            ? `Feature "${feature}" requires ${plan} plan or higher`
            : `Feature "${feature}" is not available`;
        super(message, 403, 'FEATURE_NOT_AVAILABLE', originalError);
        this.feature = feature;
        this.requiredPlan = plan;
    }
}

// ============================================================================
// ЭКСПОРТ
// ============================================================================
module.exports = {
    // Base
    AppError,
    
    // Validation (4xx)
    ValidationError,
    AuthenticationError,
    AuthorizationError,
    NotFoundError,
    TimeoutError,
    RateLimitError,
    
    // OpenAI specific
    OpenAIApiError,
    OpenAITimeoutError,
    OpenAIAuthError,
    OpenAIQuotaError,
    
    // Network
    NetworkError,
    
    // Database
    DatabaseError,
    PrismaError,
    
    // Business
    InsufficientFundsError,
    SubscriptionError,
    FeatureNotAvailableError
};