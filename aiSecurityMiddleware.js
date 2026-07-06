import { PromptInjectionError } from '../utils/errors.js';
import logger from '../utils/logger.js';
import aiConfig from '../config/ai.config.js';
import prisma from '../config/db.js';

/**
 * Sanitize and validate user input for prompt injection
 */
export async function sanitizeInput(req, res, next) {  // <-- ДОБАВЛЕН async
  try {
    const { message } = req.body;
    
    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        error: 'Invalid message format',
        code: 'INVALID_MESSAGE',
      });
    }
    
    // Check length limits
    const maxLength = req.user?.aiLimits?.maxMessageLength || aiConfig.security.maxPromptLength;
    if (message.length > maxLength) {
      return res.status(400).json({
        error: `Message exceeds maximum length of ${maxLength} characters`,
        code: 'MESSAGE_TOO_LONG',
      });
    }
    
    // Check for forbidden patterns
    let detectedPattern = null;
    let category = null;
    
    for (const pattern of aiConfig.security.forbiddenPatterns) {
      if (pattern.test(message)) {
        detectedPattern = pattern.toString();
        category = 'prompt_injection';
        break;
      }
    }
    
    // Check for sensitive topics
    const lowerMessage = message.toLowerCase();
    for (const topic of aiConfig.security.sensitiveTopics) {
      if (lowerMessage.includes(topic)) {
        detectedPattern = topic;
        category = 'sensitive_topic';
        break;
      }
    }
    
    if (detectedPattern) {
      // Log security event
      logger.warn('Prompt injection detected', {
        userId: req.user?.id,
        pattern: detectedPattern,
        category,
        messagePreview: message.substring(0, 200),
      });
      
      // Save to AI log (исправлено: aILog -> AILog)
      await prisma.aILog.create({
        data: {
          userId: req.user?.id,
          prompt: message.substring(0, 1000),
          promptInjectionDetected: true,
          jailbreakAttempt: category === 'prompt_injection',
          blockedReason: `Detected pattern: ${detectedPattern}`,
          success: false,
        },
      });
      
      throw new PromptInjectionError(
        'Message contains prohibited content',
        detectedPattern,
        category
      );
    }
    
    // Basic sanitization
    req.sanitizedMessage = message
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/[\x00-\x1F\x7F-\x9F]/g, '') // Remove control characters
      .trim();
    
    next();
  } catch (error) {
    if (error instanceof PromptInjectionError) {
      return res.status(400).json({
        error: error.message,
        code: error.code,
        category: error.category,
      });
    }
    next(error);
  }
}

/**
 * Validate request size
 */
export function validateRequestSize(req, res, next) {
  const contentLength = parseInt(req.headers['content-length'] || '0');
  const maxSize = 1024 * 1024; // 1MB
  
  if (contentLength > maxSize) {
    return res.status(413).json({
      error: 'Request too large',
      code: 'REQUEST_TOO_LARGE',
      maxSize: `${Math.floor(maxSize / 1024)}KB`,
    });
  }
  
  next();
}

/**
 * Rate limiting for AI endpoints (per minute, not per day)
 */
const requestCounts = new Map();

export function perMinuteRateLimit(req, res, next) {
  const userId = req.user?.id || req.ip;
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 30; // 30 requests per minute
  
  const userRequests = requestCounts.get(userId) || [];
  const recentRequests = userRequests.filter(timestamp => now - timestamp < windowMs);
  
  if (recentRequests.length >= maxRequests) {
    return res.status(429).json({
      error: `Too many requests. Limit: ${maxRequests} per minute`,
      code: 'RATE_LIMIT_PER_MINUTE',
      retryAfter: 60,
    });
  }
  
  recentRequests.push(now);
  requestCounts.set(userId, recentRequests);
  
  next();
}

/**
 * Clean up old rate limit entries periodically
 */
setInterval(() => {
  const now = Date.now();
  const windowMs = 60 * 1000;
  
  for (const [userId, timestamps] of requestCounts.entries()) {
    const valid = timestamps.filter(ts => now - ts < windowMs);
    if (valid.length === 0) {
      requestCounts.delete(userId);
    } else {
      requestCounts.set(userId, valid);
    }
  }
}, 60000); // Clean up every minute