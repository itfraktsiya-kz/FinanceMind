// middleware/validate.middleware.js
const { z } = require('zod');

// ============================================
// СХЕМЫ ВАЛИДАЦИИ
// ============================================

// Auth schemas
const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters').max(50),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
});

// User schemas
const updateUserSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  avatar: z.string().url().optional(),
  settings: z.record(z.any()).optional(),
});

const updateSettingsSchema = z.object({
  language: z.enum(['ru', 'kk', 'en']).optional(),
  theme: z.enum(['dark', 'light']).optional(),
  currency: z.enum(['KZT', 'RUB', 'USD', 'EUR']).optional(),
});

// Finance schemas
const uploadFileSchema = z.object({
  userId: z.string().optional(),
}).passthrough();

const updateCategorySchema = z.object({
  category: z.string().min(1, 'Category is required'),
});

// Message schemas
const messageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().min(1, 'Message content is required').max(5000),
});

// ============================================
// VALIDATION MIDDLEWARE FACTORY
// ============================================

function validate(schema, source = 'body') {
  return (req, res, next) => {
    try {
      const data = source === 'body' ? req.body : 
                   source === 'query' ? req.query : 
                   req.params;
      
      const validatedData = schema.parse(data);
      
      if (source === 'body') req.body = validatedData;
      else if (source === 'query') req.query = validatedData;
      else req.params = validatedData;
      
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          code: 'VALIDATION_ERROR',
          details: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        });
      }
      
      res.status(500).json({
        success: false,
        error: 'Validation error',
        code: 'VALIDATION_ERROR',
      });
    }
  };
}

// Вспомогательная функция для ручной валидации
function validateData(schema, data) {
  try {
    return { success: true, data: schema.parse(data) };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      };
    }
    return { success: false, errors: [{ message: error.message }] };
  }
}

module.exports = {
  validate,
  validateData,
  // Схемы
  registerSchema,
  loginSchema,
  refreshTokenSchema,
  updateUserSchema,
  updateSettingsSchema,
  uploadFileSchema,
  updateCategorySchema,
  messageSchema,
};