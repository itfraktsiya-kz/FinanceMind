// utils/errors.js
const { logger } = require('./logger');

// ============================================================================
// БАЗОВЫЕ ОШИБКИ ПРОЕКТА
// ============================================================================

class AppError extends Error {
  constructor(message, statusCode, code = 'INTERNAL_ERROR') {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;
    
    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends AppError {
  constructor(message, details = null) {
    super(message, 400, 'VALIDATION_ERROR');
    this.details = details;
  }
}

class AuthenticationError extends AppError {
  constructor(message = 'Authentication failed') {
    super(message, 401, 'AUTHENTICATION_ERROR');
  }
}

class AuthorizationError extends AppError {
  constructor(message = 'Insufficient permissions') {
    super(message, 403, 'AUTHORIZATION_ERROR');
  }
}

class NotFoundError extends AppError {
  constructor(resource = 'Resource') {
    super(`${resource} not found`, 404, 'NOT_FOUND');
  }
}

class ConflictError extends AppError {
  constructor(message = 'Resource already exists') {
    super(message, 409, 'CONFLICT_ERROR');
  }
}

class RateLimitAppError extends AppError {
  constructor(message = 'Too many requests') {
    super(message, 429, 'RATE_LIMIT_ERROR');
  }
}

// ============================================================================
// AI СПЕЦИФИЧЕСКИЕ ОШИБКИ
// ============================================================================

/**
 * Базовый класс для всех AI ошибок
 */
class AIError extends AppError {
  constructor(message, code, statusCode = 500, context = {}) {
    super(message, statusCode, code);
    this.name = 'AIError';
    this.context = context;
    this.timestamp = new Date().toISOString();
    
    // Логируем AI ошибки
    logger.error(`[AI] ${code}: ${message}`, { context, stack: this.stack });
  }
}

/**
 * Ошибка превышения лимита запросов (по тарифу)
 */
class RateLimitError extends AIError {
  constructor(message, resetAt, limitType = 'requests') {
    super(message, 'RATE_LIMIT_EXCEEDED', 429, { resetAt, limitType });
    this.resetAt = resetAt;
    this.limitType = limitType;
  }
}

/**
 * Ошибка превышения лимита токенов
 */
class TokenLimitError extends AIError {
  constructor(message, limit, current, limitType = 'daily') {
    super(message, 'TOKEN_LIMIT_EXCEEDED', 429, { limit, current, limitType });
    this.limit = limit;
    this.current = current;
    this.limitType = limitType;
  }
}

/**
 * Ошибка обнаружения вредоносного промпта (injection/jailbreak)
 */
class PromptInjectionError extends AIError {
  constructor(message, pattern, category = 'injection') {
    super(message, 'PROMPT_INJECTION_DETECTED', 400, { pattern, category });
    this.pattern = pattern;
    this.category = category;
  }
}

/**
 * Ошибка таймаута OpenAI
 */
class OpenAITimeoutError extends AIError {
  constructor(message, timeoutMs) {
    super(message, 'OPENAI_TIMEOUT', 504, { timeoutMs });
    this.timeoutMs = timeoutMs;
  }
}

/**
 * Ошибка переполнения контекстного окна
 */
class ContextOverflowError extends AIError {
  constructor(message, tokensUsed, maxTokens) {
    super(message, 'CONTEXT_OVERFLOW', 400, { tokensUsed, maxTokens });
    this.tokensUsed = tokensUsed;
    this.maxTokens = maxTokens;
  }
}

/**
 * Ошибка прерывания стриминга (пользователь отменил)
 */
class StreamingAbortedError extends AIError {
  constructor(message, streamId) {
    super(message, 'STREAMING_ABORTED', 499, { streamId });
    this.streamId = streamId;
  }
}

/**
 * Ошибка исчерпания попыток ретрая OpenAI
 */
class OpenAIRetryExhaustedError extends AIError {
  constructor(message, attempts, lastError) {
    super(message, 'OPENAI_RETRY_EXHAUSTED', 503, { attempts, lastError: lastError?.message });
    this.attempts = attempts;
    this.lastError = lastError;
  }
}

/**
 * Ошибка превышения максимальной длины сообщения
 */
class MessageTooLongError extends AIError {
  constructor(message, maxLength, currentLength) {
    super(message, 'MESSAGE_TOO_LONG', 400, { maxLength, currentLength });
    this.maxLength = maxLength;
    this.currentLength = currentLength;
  }
}

/**
 * Ошибка недостаточного баланса OpenAI квоты
 */
class OpenAIQuotaError extends AIError {
  constructor(message = 'OpenAI API quota exceeded') {
    super(message, 'OPENAI_QUOTA_EXCEEDED', 429);
  }
}

/**
 * Ошибка конфигурации AI (неправильный API ключ и т.д.)
 */
class AIConfigError extends AIError {
  constructor(message, configKey = null) {
    super(message, 'AI_CONFIG_ERROR', 500, { configKey });
    this.configKey = configKey;
  }
}

/**
 * Ошибка при сохранении/загрузке контекста разговора
 */
class ContextSaveError extends AIError {
  constructor(message, conversationId, operation) {
    super(message, 'CONTEXT_SAVE_ERROR', 500, { conversationId, operation });
    this.conversationId = conversationId;
    this.operation = operation;
  }
}

/**
 * Ошибка при суммаризации разговора
 */
class SummarizationError extends AIError {
  constructor(message, conversationId, originalError = null) {
    super(message, 'SUMMARIZATION_ERROR', 500, { conversationId, originalError: originalError?.message });
    this.conversationId = conversationId;
    this.originalError = originalError;
  }
}

// ============================================================================
// ЭКСПОРТ ВСЕХ КЛАССОВ ОШИБОК
// ============================================================================

module.exports = {
  // Базовые ошибки
  AppError,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ConflictError,
  RateLimitAppError,
  
  // AI ошибки
  AIError,
  RateLimitError,
  TokenLimitError,
  PromptInjectionError,
  OpenAITimeoutError,
  ContextOverflowError,
  StreamingAbortedError,
  OpenAIRetryExhaustedError,
  MessageTooLongError,
  OpenAIQuotaError,
  AIConfigError,
  ContextSaveError,
  SummarizationError,
};