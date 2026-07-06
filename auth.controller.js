// controllers/auth.controller.js
const authService = require('../services/auth.service');
const { ValidationError } = require('../utils/errors');

// Простой wrapper для async обработчиков
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

class AuthController {
    // Google OAuth callback
    googleCallback = asyncHandler(async (req, res) => {
        const { googleProfile } = req.body;
        
        if (!googleProfile || !googleProfile.id) {
            throw new ValidationError('Invalid Google profile');
        }
        
        const { user, tokens, session } = await authService.findOrCreateGoogleUser(
            googleProfile,
            req.ip,
            req.headers['user-agent']
        );
        
        res.json({
            success: true,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            expiresIn: tokens.expiresIn,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                avatar: user.avatar,
                plan: user.plan,
                role: user.role,
                fincoinBalance: user.fincoinBalance,
                level: user.level,
                xp: user.xp,
            },
        });
    });
    
    // Refresh token
    refreshToken = asyncHandler(async (req, res) => {
        const { refreshToken } = req.body;
        
        if (!refreshToken) {
            throw new ValidationError('Refresh token is required');
        }
        
        const { tokens } = await authService.refreshTokens(
            refreshToken,
            req.ip,
            req.headers['user-agent']
        );
        
        res.json({
            success: true,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            expiresIn: tokens.expiresIn,
        });
    });
    
    // Logout
    logout = asyncHandler(async (req, res) => {
        const refreshToken = req.body.refreshToken || req.headers['x-refresh-token'];
        await authService.logout(refreshToken);
        
        res.json({ success: true, message: 'Logged out successfully' });
    });
    
    // Get current user
    me = asyncHandler(async (req, res) => {
        const user = await authService.getUserById(req.user.id);
        
        res.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                avatar: user.avatar,
                plan: user.plan,
                role: user.role,
                fincoinBalance: user.fincoinBalance,
                level: user.level,
                xp: user.xp,
                settings: user.settings,
                messagesUsed: user.messagesUsed,
                dailyUsage: user.dailyUsage,
                monthlyUsage: user.monthlyUsage,
                createdAt: user.createdAt,
                lastLoginAt: user.lastLoginAt,
            },
        });
    });
    
    // Update profile
    updateProfile = asyncHandler(async (req, res) => {
        const { name, avatar } = req.body;
        const user = await authService.updateProfile(req.user.id, { name, avatar });
        
        res.json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                avatar: user.avatar,
            },
        });
    });
    
    // Update settings
    updateSettings = asyncHandler(async (req, res) => {
        const settings = await authService.updateSettings(req.user.id, req.body.settings);
        
        res.json({
            success: true,
            settings,
        });
    });
    
    // Get user sessions
    getSessions = asyncHandler(async (req, res) => {
        const sessions = await authService.getUserSessions(req.user.id);
        
        res.json({
            success: true,
            sessions: sessions.map(s => ({
                id: s.id,
                createdAt: s.createdAt,
                lastUsedAt: s.lastUsedAt,
                ipAddress: s.ipAddress,
                userAgent: s.userAgent,
            })),
        });
    });
    
    // Revoke session
    revokeSession = asyncHandler(async (req, res) => {
        const { sessionId } = req.params;
        const revoked = await authService.revokeSession(sessionId, req.user.id);
        
        if (!revoked) {
            return res.status(404).json({ success: false, error: 'Session not found' });
        }
        
        res.json({ success: true, message: 'Session revoked' });
    });
    
    // Deactivate account
    deactivateAccount = asyncHandler(async (req, res) => {
        await authService.deactivateUser(req.user.id);
        
        res.json({ success: true, message: 'Account deactivated' });
    });
}

module.exports = new AuthController();