// routes/auth.routes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { authMiddleware } = require('../middleware/auth.middleware');
const { validate } = require('../middleware/validate.middleware');
const { refreshTokenSchema } = require('../middleware/validate.middleware');

// Public routes
router.post('/google/callback', authController.googleCallback);
router.post('/refresh', validate(refreshTokenSchema), authController.refreshToken);
router.post('/logout', authController.logout);

// Protected routes
router.get('/me', authMiddleware, authController.me);
router.put('/profile', authMiddleware, authController.updateProfile);
router.put('/settings', authMiddleware, authController.updateSettings);
router.get('/sessions', authMiddleware, authController.getSessions);
router.delete('/sessions/:sessionId', authMiddleware, authController.revokeSession);
router.post('/deactivate', authMiddleware, authController.deactivateAccount);

module.exports = router;