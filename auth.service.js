// services/auth.service.js
const prisma = require('../config/db');
const { generateTokens, generateSecureToken, verifyRefreshToken } = require('../utils/jwt');
const { 
  AppError, 
  AuthenticationError, 
  NotFoundError,
  ConflictError 
} = require('../middleware/error.middleware');
const logger = require('../utils/logger');

class AuthService {
  // Create or find user by Google ID
  async findOrCreateGoogleUser(googleProfile, ipAddress, userAgent) {
    try {
      let user = await prisma.user.findUnique({
        where: { googleId: googleProfile.id },
      });
      
      if (!user) {
        user = await prisma.user.findUnique({
          where: { email: googleProfile.email },
        });
        
        if (user) {
          user = await prisma.user.update({
            where: { id: user.id },
            data: { 
              googleId: googleProfile.id,
              lastLoginAt: new Date(),
            },
          });
          logger.info(`Google account linked to existing user: ${user.email}`);
        } else {
          user = await prisma.user.create({
            data: {
              googleId: googleProfile.id,
              email: googleProfile.email,
              name: googleProfile.displayName || googleProfile.email.split('@')[0],
              avatar: googleProfile.photos?.[0]?.value,
              fincoinBalance: 0,
              xp: 0,
              level: 1,
              lastLoginAt: new Date(),
              settings: {
                language: 'ru',
                theme: 'dark',
                currency: 'KZT',
              },
            },
          });
          logger.info(`New user created via Google: ${user.email}`);
        }
      } else {
        user = await prisma.user.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() },
        });
      }
      
      // Update daily/monthly usage
      await this.updateUserActivity(user.id);
      
      // Create session
      const session = await this.createSession(user.id, ipAddress, userAgent);
      
      // Generate tokens
      const tokens = generateTokens(user.id, user.email, session.refreshToken, user.role);
      
      return { user, tokens, session };
      
    } catch (error) {
      logger.error('Auth service error:', error);
      throw new AppError('Authentication failed', 500);
    }
  }
  
  // Refresh tokens
  async refreshTokens(refreshToken, ipAddress, userAgent) {
    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded) {
      throw new AuthenticationError('Invalid refresh token');
    }
    
    const session = await prisma.userSession.findUnique({
      where: { refreshToken: decoded.sessionId },
      include: { user: true },
    });
    
    if (!session || session.isRevoked || session.refreshExpiresAt < new Date()) {
      throw new AuthenticationError('Session expired or invalid');
    }
    
    // Revoke old session
    await prisma.userSession.update({
      where: { id: session.id },
      data: { isRevoked: true },
    });
    
    // Create new session
    const newSession = await this.createSession(session.userId, ipAddress, userAgent);
    
    // Generate new tokens
    const tokens = generateTokens(
      session.user.id, 
      session.user.email, 
      newSession.refreshToken,
      session.user.role
    );
    
    return { tokens, session: newSession };
  }
  
  // Logout
  async logout(refreshToken) {
    if (!refreshToken) return { success: true };
    
    const decoded = verifyRefreshToken(refreshToken);
    if (decoded && decoded.sessionId) {
      await prisma.userSession.updateMany({
        where: { refreshToken: decoded.sessionId },
        data: { isRevoked: true },
      });
    }
    
    return { success: true };
  }
  
  // Create session
  async createSession(userId, ipAddress = null, userAgent = null) {
    const refreshToken = generateSecureToken();
    const expiresAt = new Date();
    const refreshExpiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 15); // 15 minutes
    refreshExpiresAt.setDate(refreshExpiresAt.getDate() + 7); // 7 days
    
    const session = await prisma.userSession.create({
      data: {
        userId,
        token: generateSecureToken(),
        refreshToken,
        expiresAt,
        refreshExpiresAt,
        ipAddress,
        userAgent,
      },
    });
    
    return session;
  }
  
  // Update user activity
  async updateUserActivity(userId) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    
    const lastActivityDate = user.lastActivityDate ? new Date(user.lastActivityDate) : null;
    const isNewDay = !lastActivityDate || lastActivityDate < today;
    
    await prisma.user.update({
      where: { id: userId },
      data: {
        lastActivityDate: new Date(),
        dailyUsage: isNewDay ? 1 : { increment: 1 },
        monthlyUsage: { increment: 1 },
      },
    });
  }
  
  // Get user by ID
  async getUserById(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 50,
        },
        subscriptions: true,
      },
    });
    
    if (!user) {
      throw new NotFoundError('User');
    }
    
    // Parse settings from JSON
    if (user.settings && typeof user.settings === 'string') {
      try {
        user.settings = JSON.parse(user.settings);
      } catch (e) {
        user.settings = {};
      }
    }
    
    return user;
  }
  
  // Update user settings
  async updateSettings(userId, settings) {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { 
        settings: JSON.stringify(settings),
      },
    });
    
    return JSON.parse(user.settings);
  }
  
  // Update user profile
  async updateProfile(userId, data) {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        name: data.name,
        avatar: data.avatar,
      },
    });
    
    return user;
  }
  
  // Update fincoin
  async updateFincoin(userId, delta) {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        fincoinBalance: {
          increment: delta,
        },
      },
    });
    
    return user.fincoinBalance;
  }
  
  // Update XP and level
  async updateXP(userId, xpGain) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    
    let newXP = user.xp + xpGain;
    let newLevel = Math.floor(newXP / 100) + 1;
    let leveledUp = newLevel > user.level;
    let bonus = 0;
    
    if (leveledUp) {
      bonus = (newLevel - user.level) * 50;
      await this.updateFincoin(userId, bonus);
    }
    
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        xp: newXP,
        level: newLevel,
      },
    });
    
    return {
      xp: updatedUser.xp,
      level: updatedUser.level,
      leveledUp,
      bonus,
    };
  }
  
  // Get user sessions
  async getUserSessions(userId) {
    const sessions = await prisma.userSession.findMany({
      where: { 
        userId,
        isRevoked: false,
        refreshExpiresAt: { gt: new Date() },
      },
      orderBy: { lastUsedAt: 'desc' },
    });
    
    return sessions;
  }
  
  // Revoke session
  async revokeSession(sessionId, userId) {
    const session = await prisma.userSession.updateMany({
      where: { 
        id: sessionId,
        userId,
      },
      data: { isRevoked: true },
    });
    
    return session.count > 0;
  }
  
  // Deactivate user account
  async deactivateUser(userId) {
    // Revoke all sessions
    await prisma.userSession.updateMany({
      where: { userId },
      data: { isRevoked: true },
    });
    
    // Deactivate user
    const user = await prisma.user.update({
      where: { id: userId },
      data: { isActive: false },
    });
    
    return user;
  }
}

module.exports = new AuthService();