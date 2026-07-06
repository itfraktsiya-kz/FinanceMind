// routes/finance.routes.js
const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth.middleware');

// Это временные маршруты
// Старые маршруты из server.js будут постепенно переноситься сюда

router.post('/upload', authMiddleware, (req, res) => {
  // Временный обработчик - реальный будет из server.js
  res.json({ message: 'Upload endpoint - migration in progress' });
});

router.get('/transactions', authMiddleware, (req, res) => {
  res.json({ message: 'Transactions endpoint - migration in progress' });
});

module.exports = router;