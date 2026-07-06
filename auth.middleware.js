// middleware/auth.middleware.js
const { verifyAccessToken } = require('../utils/jwt');
const prisma = require('../config/db');
const logger = require('../utils/logger');

async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false, 
        error: 'No token provided',
        code: 'MISSING_TOKEN'
      });
    }
    
    const token = authHeader.split(' ')[1];
    const decoded = verifyAccessToken(token);
    
    if (!decoded) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid or expired token',
        code: 'INVALID_TOKEN'
      });
    }
    
    // Проверяем существование пользователя (расширено для AI)
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true,
        plan: true,
        role: true,
        fincoinBalance: true, // [AI] оставляем существующие поля
        level: true,
        xp: true,
        isActive: true,
        // [AI] добавляем AI-related поля для rate limiting
        dailyAIRequests: true,
        totalTokensUsed: true,
        totalRequests: true,
      }
    });
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        error: 'User not found',
        code: 'USER_NOT_FOUND'
      });
    }
    
    if (!user.isActive) {
      return res.status(403).json({ 
        success: false, 
        error: 'Account is deactivated',
        code: 'ACCOUNT_INACTIVE'
      });
    }
    
    // [AI] Добавляем AI plan limits к req.user
    const aiLimits = {
      FREE: { requestsPerDay: 10, tokensPerDay: 10000, maxMessageLength: 2000 },
      PRO: { requestsPerDay: 500, tokensPerDay: 500000, maxMessageLength: 8000 },
      ELITE: { requestsPerDay: null, tokensPerDay: null, maxMessageLength: 12000 }
    };
    
    req.user = {
      ...user,
      aiLimits: aiLimits[user.plan] || aiLimits.FREE
    };
    
    // Обновляем lastUsedAt сессии
    if (decoded.sessionId) {
      await prisma.userSession.updateMany({
        where: { 
          refreshToken: decoded.sessionId,
          isRevoked: false 
        },
        data: { lastUsedAt: new Date() }
      });
    }
    
    req.user = user;
    req.tokenData = decoded;
    next();
    
  } catch (error) {
    logger.error('Auth middleware error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error',
      code: 'AUTH_ERROR'
    });
  }
}

// Middleware для опциональной авторизации
async function optionalAuthMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = verifyAccessToken(token);
      
      if (decoded) {
        const user = await prisma.user.findUnique({
          where: { id: decoded.userId },
          select: { 
            id: true, 
            email: true, 
            name: true, 
            role: true,
            plan: true,  // [AI] добавили plan
            dailyAIRequests: true  // [AI] добавили
          }
        });
        if (user && user.isActive) req.user = user;
      }
    }
    
    next();
  } catch (error) {
    next();
  }
}

// Middleware для проверки роли
function requireRole(roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        error: 'Authentication required',
        code: 'AUTH_REQUIRED'
      });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        error: 'Insufficient permissions',
        code: 'FORBIDDEN'
      });
    }
    
    next();
  };
}

// [AI] Новая функция: middleware для получения AI лимитов пользователя
function injectAILimits(req, res, next) {
  if (req.user) {
    const limits = {
      FREE: { requestsPerDay: 10, tokensPerDay: 10000, maxMessageLength: 2000 },
      PRO: { requestsPerDay: 500, tokensPerDay: 500000, maxMessageLength: 8000 },
      ELITE: { requestsPerDay: null, tokensPerDay: null, maxMessageLength: 12000 }
    };
    req.user.aiLimits = limits[req.user.plan] || limits.FREE;
  }
  next();
}

module.exports = { 
  authMiddleware, 
  optionalAuthMiddleware,
  requireRole,
  injectAILimits  // [AI] экспортируем новый middleware
};