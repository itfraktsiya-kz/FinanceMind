// utils/security.js
const crypto = require('crypto');

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

function comparePassword(password, hash) {
  return hashPassword(password) === hash;
}

function sanitizeInput(str) {
  if (!str) return '';
  return str
    .replace(/[<>]/g, '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

function generateOTP(length = 6) {
  return Math.floor(Math.random() * Math.pow(10, length)).toString().padStart(length, '0');
}

function maskEmail(email) {
  if (!email) return '';
  const [local, domain] = email.split('@');
  if (local.length <= 2) return email;
  return local[0] + '***' + local[local.length - 1] + '@' + domain;
}

module.exports = {
  hashPassword,
  comparePassword,
  sanitizeInput,
  generateOTP,
  maskEmail,
};