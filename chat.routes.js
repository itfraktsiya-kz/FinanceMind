// routes/chat.routes.js
const express = require('express');
const router = express.Router();

// Простые тестовые маршруты (без сложных сервисов)
router.post('/chat/stream', (req, res) => {
  console.log('📨 AI Chat stream request:', req.body);
  res.json({ 
    success: true, 
    message: 'AI Chat is working!',
    received: req.body,
    timestamp: new Date().toISOString()
  });
});

router.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'AI Chat API',
    timestamp: new Date().toISOString()
  });
});

router.get('/conversations', (req, res) => {
  res.json({ 
    success: true, 
    conversations: [],
    message: 'Conversations feature coming soon'
  });
});

router.get('/usage/stats', (req, res) => {
  res.json({ 
    success: true, 
    stats: { totalRequests: 0, totalTokens: 0 },
    message: 'Usage stats feature coming soon'
  });
});

module.exports = router;