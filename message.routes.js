// routes/message.routes.js
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Простой wrapper для async обработчиков
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Middleware auth (используем глобальный authMiddleware из server.js)
// ВНИМАНИЕ: authMiddleware передается из server.js при подключении маршрута

// Save message
router.post('/', asyncHandler(async (req, res) => {
    const { role, content } = req.body;
    
    const message = await prisma.message.create({
        data: {
            userId: req.user.id,
            role,
            content,
        },
    });
    
    // Update messages used count
    await prisma.user.update({
        where: { id: req.user.id },
        data: { messagesUsed: { increment: 1 } },
    });
    
    res.json({ success: true, message });
}));

// Get conversation
router.get('/conversation/:conversationId', asyncHandler(async (req, res) => {
    const { conversationId } = req.params;
    
    const messages = await prisma.message.findMany({
        where: {
            userId: req.user.id,
            conversationId,
        },
        orderBy: { createdAt: 'asc' },
    });
    
    res.json({ success: true, messages });
}));

// Get all messages
router.get('/', asyncHandler(async (req, res) => {
    const { limit = 50, offset = 0 } = req.query;
    
    const messages = await prisma.message.findMany({
        where: { userId: req.user.id },
        orderBy: { createdAt: 'desc' },
        take: parseInt(limit),
        skip: parseInt(offset),
    });
    
    res.json({ 
        success: true, 
        messages: messages.reverse(),
        pagination: { limit: parseInt(limit), offset: parseInt(offset) }
    });
}));

// Delete conversation
router.delete('/conversation/:conversationId', asyncHandler(async (req, res) => {
    const { conversationId } = req.params;
    
    await prisma.message.deleteMany({
        where: {
            userId: req.user.id,
            conversationId,
        },
    });
    
    res.json({ success: true, message: 'Conversation deleted' });
}));

module.exports = router;