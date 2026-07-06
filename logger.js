// utils/logger.js
const fs = require('fs');
const path = require('path');

// Создаем папку logs если её нет
const logsDir = path.join(__dirname, '..', 'logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

// Простой логгер
const logger = {
    info: (...args) => {
        const message = args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' ');
        console.log(`📘 [INFO]: ${message}`);
        logToFile('info', message);
    },
    
    error: (...args) => {
        const message = args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' ');
        console.error(`❌ [ERROR]: ${message}`);
        logToFile('error', message);
    },
    
    warn: (...args) => {
        const message = args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' ');
        console.warn(`⚠️ [WARN]: ${message}`);
        logToFile('warn', message);
    },
    
    debug: (...args) => {
        const message = args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' ');
        console.debug(`🔍 [DEBUG]: ${message}`);
        logToFile('debug', message);
    }
};

// Функция для записи в файл
function logToFile(level, message) {
    try {
        const logFile = path.join(logsDir, `${level}.log`);
        const timestamp = new Date().toISOString();
        const logEntry = `[${timestamp}] ${message}\n`;
        fs.appendFileSync(logFile, logEntry);
    } catch (err) {
        // Игнорируем ошибки записи в файл
    }
}

module.exports = logger;