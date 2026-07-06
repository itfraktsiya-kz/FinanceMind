// services/geminiService.js
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

class GeminiService {
    constructor() {
        const apiKey = process.env.GEMINI_API_KEY;
        
        // Проверяем валидность ключа (должен начинаться с AIza)
        if (!apiKey || !apiKey.startsWith('AIza')) {
            console.warn('⚠️ GEMINI_API_KEY не найден или невалидный в .env');
            console.warn('⚠️ Ключ должен начинаться с "AIza"');
            console.warn('⚠️ Получите ключ на https://aistudio.google.com/');
            this.useGemini = false;
            return;
        }
        
        this.useGemini = true;
        try {
            this.genAI = new GoogleGenerativeAI(apiKey);
            this.model = this.genAI.getGenerativeModel({ 
                model: 'gemini-pro',
                generationConfig: {
                    temperature: 0.7,
                    topK: 1,
                    topP: 0.8,
                    maxOutputTokens: 2048,
                }
            });
            console.log('✅ Gemini Service инициализирован (gemini-pro)');
        } catch (error) {
            console.error('❌ Ошибка инициализации Gemini:', error);
            this.useGemini = false;
        }
    }

    async generateResponse(prompt, context = {}) {
        console.log('🤖 Gemini Service: generateResponse вызван');
        console.log('📝 Контекст содержит:', {
            balance: context.balance,
            totalIncome: context.totalIncome,
            totalExpenses: context.totalExpenses,
            transactionCount: context.transactionCount,
            savingsRate: context.savingsRate,
            largestExpenseCategory: context.largestExpenseCategory
        });

        // Проверяем, что Gemini доступен
        if (!this.useGemini) {
            console.warn('⚠️ Gemini не настроен, возвращаем fallback');
            return { 
                success: false, 
                error: 'Gemini API key not configured. Get your key at https://aistudio.google.com/',
                statusCode: 500
            };
        }

        // Проверяем, что модель инициализирована
        if (!this.model) {
            console.warn('⚠️ Модель Gemini не инициализирована');
            return {
                success: false,
                error: 'Gemini model not initialized',
                statusCode: 500
            };
        }

        try {
            console.log('📤 Отправка запроса в Gemini API...');
            console.log('📝 Промпт (первые 200 символов):', prompt.substring(0, 200));
            
            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            
            console.log('📥 Получен ответ от Gemini, длина:', text.length);
            console.log('📝 Ответ (первые 200 символов):', text.substring(0, 200));
            
            return { success: true, response: text };
            
        } catch (error) {
            console.error('❌ Gemini API Error:', error.message);
            
            // Если ошибка связана с API ключом
            if (error.message?.includes('API key') || error.message?.includes('auth')) {
                return {
                    success: false,
                    error: 'Invalid Gemini API key. Please check your .env file. Get a valid key at https://aistudio.google.com/',
                    statusCode: 401
                };
            }
            
            // Ошибка превышения лимитов
            if (error.message?.includes('quota') || error.message?.includes('rate limit')) {
                return {
                    success: false,
                    error: 'API rate limit exceeded. Please try again later.',
                    statusCode: 429
                };
            }
            
            return {
                success: false,
                error: error.message || 'Unknown error occurred',
                statusCode: 500
            };
        }
    }

    async generateStructuredResponse(prompt, context, schema) {
        console.log('🤖 Gemini Service: generateStructuredResponse вызван');

        if (!this.useGemini) {
            return { 
                success: false, 
                error: 'Gemini API key not configured',
                statusCode: 500
            };
        }

        try {
            const fullPrompt = `
${prompt}

USER DATA:
${JSON.stringify(context, null, 2)}

RESPONSE FORMAT:
You MUST respond with valid JSON following this exact schema:
${JSON.stringify(schema, null, 2)}

Important: 
- Return ONLY valid JSON
- No markdown, no explanations outside JSON
- Use real numbers from user data
- Be specific and actionable
`;

            console.log('📤 Отправка структурированного запроса в Gemini API...');
            
            const result = await this.model.generateContent(fullPrompt);
            const response = await result.response;
            const text = response.text();
            
            console.log('📥 Получен ответ от Gemini API');
            console.log('📝 Ответ (первые 200 символов):', text.substring(0, 200));
            
            // Пытаемся извлечь JSON
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                try {
                    const parsed = JSON.parse(jsonMatch[0]);
                    return { success: true, response: parsed };
                } catch (e) {
                    console.warn('Не удалось распарсить JSON:', e);
                }
            }
            
            // Если не удалось найти JSON, пробуем распарсить весь текст
            try {
                const parsed = JSON.parse(text);
                return { success: true, response: parsed };
            } catch (e) {
                console.warn('Не удалось распарсить весь текст как JSON');
                return { 
                    success: true, 
                    response: { raw: text } 
                };
            }
        } catch (error) {
            console.error('❌ Gemini structured response error:', error);
            return { 
                success: false, 
                error: error.message,
                statusCode: 500
            };
        }
    }

    buildPrompt(userQuestion, context) {
        return `
You are FinanceMind AI - a personal finance assistant with access to user's real financial data.

USER FINANCIAL DATA:
- Balance: ${context.balance || 0} ${context.currency || '₸'}
- Total Income: ${context.totalIncome || 0} ${context.currency || '₸'}
- Total Expenses: ${context.totalExpenses || 0} ${context.currency || '₸'}
- Monthly Income: ${context.monthlyIncome || 0} ${context.currency || '₸'}
- Monthly Expenses: ${context.monthlyExpenses || 0} ${context.currency || '₸'}
- Monthly Savings: ${context.monthlySavings || 0} ${context.currency || '₸'}
- Savings Rate: ${context.savingsRate || 0}%
- Transaction Count: ${context.transactionCount || 0}
- Expenses by Category: ${JSON.stringify(context.expensesByCategory || {})}
- Largest Expense Category: ${context.largestExpenseCategory || 'Нет данных'}
- Goals: ${JSON.stringify(context.goals || [])}
- Financial Score: ${context.financialScore || 0}/100

USER QUESTION: ${userQuestion}

Please provide a helpful, data-driven response based on the user's ACTUAL financial data above.
Be specific, actionable, and use REAL NUMBERS from their data.
Format your response in clear sections with bullet points where appropriate.

If the user asks about their finances, ALWAYS use the REAL data above.
If the user asks about spending, mention the largest expense category and give specific numbers.

Respond in the same language as the user's question (Russian).
`;
    }
}

module.exports = new GeminiService();