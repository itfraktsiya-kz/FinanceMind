// services/finance.service.js
const prisma = require('../config/db');
const logger = require('../utils/logger');

class FinanceService {
  // Парсинг выписки (перенос существующей логики)
  // ВНИМАНИЕ: Это обертка над существующей логикой из server.js
  async parseStatement(fileBuffer, fileName, fileType) {
    // Здесь будет код из server.js
    // Пока возвращаем заглушку - реальная логика останется в контроллере
    logger.info(`Parsing statement: ${fileName}`);
    return { success: true };
  }
  
  // Сохранение транзакций в БД (для будущего)
  async saveTransactions(userId, transactions) {
    // Будущая функциональность
    logger.info(`Saving ${transactions.length} transactions for user ${userId}`);
  }
  
  // Получение финансовой аналитики
  async getAnalytics(userId, dateRange) {
    // Будущая функциональность
    logger.info(`Getting analytics for user ${userId}`);
    return { income: 0, expense: 0 };
  }
}

module.exports = new FinanceService();