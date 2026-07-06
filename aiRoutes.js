// routes/aiRoutes.js
const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const { authMiddleware } = require('../middleware/auth.middleware');

// ================================================================
// AI CHAT
// ================================================================
router.post('/chat', authMiddleware, aiController.chat);
router.post('/chat/stream', authMiddleware, aiController.chatStream);

// ================================================================
// FINANCIAL ANALYSIS
// ================================================================
router.post('/analyze/expenses', authMiddleware, aiController.analyzeExpenses);
router.post('/financial-review', authMiddleware, aiController.financialReview);

// ================================================================
// AI COACH
// ================================================================
router.post('/coach', authMiddleware, aiController.financialCoach);

// ================================================================
// GOAL PLANNER
// ================================================================
router.post('/goal-planner', authMiddleware, aiController.goalPlanner);

// ================================================================
// AI ADVICE
// ================================================================
router.post('/advice', authMiddleware, aiController.getAdvice);

// ================================================================
// BUDGET FORECAST
// ================================================================
router.post('/forecast/budget', authMiddleware, aiController.budgetForecast);

// ================================================================
// GOAL RECOMMENDATIONS
// ================================================================
router.post('/goals/recommendations', authMiddleware, aiController.goalRecommendations);

// ================================================================
// ALERTS
// ================================================================
router.get('/alerts', authMiddleware, aiController.getAlerts);

// ================================================================
// USAGE STATS
// ================================================================
router.get('/usage/stats', authMiddleware, aiController.getUsageStats);

// ================================================================
// HEALTH CHECK (без авторизации)
// ================================================================
router.get('/health', aiController.checkHealth);

// ================================================================
// CONVERSATIONS
// ================================================================
router.get('/conversations', authMiddleware, aiController.getConversations);
router.delete('/conversations/:conversationId', authMiddleware, aiController.deleteConversation);
router.delete('/conversations', authMiddleware, aiController.clearConversations);

module.exports = router;