// ========== ОСНОВНЫЕ ПЕРЕМЕННЫЕ И ИНИЦИАЛИЗАЦИЯ ==========

// Глобальные переменные для хранения данных
let currentUser = null;
let expenses = [];
let goals = [];
let fincoins = 0;
let missions = [];
let purchasedItems = [];
let selectedCategory = null;
let currentChartType = 'total';
let lineChart = null;
let pieChart = null;
let currentLanguage = 'ru';

// === ЛОКАЛИЗАЦИЯ ===
const translations = {
    ru: {
        // Навигация
        homeNavText: "Главная",
        analyticsNavText: "Аналитика", 
        gamificationNavText: "Геймификация",
        aiAssistantNavText: "ИИ Ассистент",
        
        // Дашборд
        yourFinances: "Ваши финансы",
        addGoalText: "Добавить",
        noGoalsText: "У вас пока нет финансовых целей",
        
        // Аналитика
        expenseTrendTitle: "Динамика расходов",
        totalExpensesText: "Общие расходы",
        byCategoriesText: "По категориям", 
        categoryDistributionTitle: "Распределение по категориям",
        expenseHistoryTitle: "Последние расходы",
        addExpenseTitle: "Добавить новый расход",
        amountLabel: "Сумма",
        dateLabel: "Дата",
        categoryLabel: "Категория",
        commentLabel: "Комментарий",
        addExpenseBtn: "Добавить расход",
        noExpensesText: "У вас пока нет расходов",
        noExpensesChartText: "Нет данных для отображения",
        noExpensesPieText: "Нет данных для отображения",
        monthlyReportText: "Месячный отчет",
        advancedAnalyticsText: "Расширенная аналитика",
        exportDataText: "Экспорт данных",
        importDataText: "Импорт данных",
        shareReportText: "Поделиться отчетом",
        
        // Миссии
        yourFincoinsText: "Ваши FinCoins:",
        storeText: "Магазин",
        
        // Магазин
        yourFincoinsStoreText: "Ваши FinCoins:",
        earnText: "Заработать",
        premiumSubscriptionTitle: "Премиум подписка",
        premiumItemTitle: "FinanceMind Premium",
        premiumBadge: "PREMIUM",
        premiumSubscriptionDesc: "Получите доступ ко всем премиум-функциям",
        premiumFeaturesTitle: "Премиум функции",
        extendedAnalyticsTitle: "Расширенная аналитика",
        popularText: "Популярное",
        extendedAnalyticsDesc: "Подробные отчеты и прогнозы расходов",
        aiCoachTitle: "Персональный AI-коуч",
        aiCoachDesc: "Индивидуальные финансовые рекомендации",
        personalizationTitle: "Персонализация", 
        exclusiveThemesTitle: "Эксклюзивные темы",
        exclusiveThemesDesc: "5 уникальных цветовых схем",
        iconPackTitle: "Набор иконок",
        iconPackDesc: "Стильные иконки для категорий расходов",
        buyPremiumText: "Активировать премиум",
        buyNowText: "Купить сейчас",
        
        // Цели
        addGoalTitle: "Добавить новую цель",
        goalNameLabel: "Название цели",
        goalAmountLabel: "Сумма цели", 
        goalCurrentLabel: "Текущая сумма",
        goalDeadlineLabel: "Срок цели",
        addGoalBtnText: "Добавить цель",
        deleteGoalText: "Удалить"
    },
    en: {
        // Navigation
        homeNavText: "Home",
        analyticsNavText: "Analytics",
        gamificationNavText: "Missions", 
        aiAssistantNavText: "AI Assistant",
        
        // Dashboard
        yourFinances: "Your Finances",
        addGoalText: "Add",
        noGoalsText: "You don't have financial goals yet",
        
        // Analytics
        expenseTrendTitle: "Expense Trends",
        totalExpensesText: "Total Expenses",
        byCategoriesText: "By Categories",
        categoryDistributionTitle: "Category Distribution",
        expenseHistoryTitle: "Recent Expenses", 
        addExpenseTitle: "Add New Expense",
        amountLabel: "Amount",
        dateLabel: "Date",
        categoryLabel: "Category",
        commentLabel: "Comment",
        addExpenseBtn: "Add Expense",
        noExpensesText: "You don't have expenses yet",
        noExpensesChartText: "No data to display",
        noExpensesPieText: "No data to display",
        monthlyReportText: "Monthly Report",
        advancedAnalyticsText: "Advanced Analytics",
        exportDataText: "Export Data",
        importDataText: "Import Data",
        shareReportText: "Share Report",
        
        // Missions
        yourFincoinsText: "Your FinCoins:",
        storeText: "Store",
        
        // Store
        yourFincoinsStoreText: "Your FinCoins:",
        earnText: "Earn",
        premiumSubscriptionTitle: "Premium Subscription",
        premiumItemTitle: "FinanceMind Premium",
        premiumBadge: "PREMIUM",
        premiumSubscriptionDesc: "Get access to all premium features",
        premiumFeaturesTitle: "Premium Features",
        extendedAnalyticsTitle: "Extended Analytics",
        popularText: "Popular",
        extendedAnalyticsDesc: "Detailed reports and expense forecasts",
        aiCoachTitle: "Personal AI Coach", 
        aiCoachDesc: "Individual financial recommendations",
        personalizationTitle: "Personalization",
        exclusiveThemesTitle: "Exclusive Themes",
        exclusiveThemesDesc: "5 unique color schemes",
        iconPackTitle: "Icon Pack",
        iconPackDesc: "Stylish icons for expense categories",
        buyPremiumText: "Activate Premium",
        buyNowText: "Buy Now",
        
        // Goals
        addGoalTitle: "Add New Goal",
        goalNameLabel: "Goal Name",
        goalAmountLabel: "Goal Amount",
        goalCurrentLabel: "Current Amount", 
        goalDeadlineLabel: "Goal Deadline",
        addGoalBtnText: "Add Goal",
        deleteGoalText: "Delete"
    },
    kz: {
        // Навигация
        homeNavText: "Басты",
        analyticsNavText: "Аналитика", 
        gamificationNavText: "Геймификация",
        aiAssistantNavText: "ЖС Көмекші",
        
        // Дашборд
        yourFinances: "Сіздің қаржыңыз",
        addGoalText: "Қосу",
        noGoalsText: "Сізде әлі қаржылық мақсаттар жоқ",
        
        // Аналитика
        expenseTrendTitle: "Шығындар динамикасы",
        totalExpensesText: "Жалпы шығындар",
        byCategoriesText: "Санаттар бойынша", 
        categoryDistributionTitle: "Санаттар бойынша үлестіру",
        expenseHistoryTitle: "Соңғы шығындар",
        addExpenseTitle: "Жаңа шығын қосу",
        amountLabel: "Сома",
        dateLabel: "Күні",
        categoryLabel: "Санат",
        commentLabel: "Түсініктеме",
        addExpenseBtn: "Шығын қосу",
        noExpensesText: "Сізде әлі шығындар жоқ",
        noExpensesChartText: "Көрсету үшін деректер жоқ",
        noExpensesPieText: "Көрсету үшін деректер жоқ",
        monthlyReportText: "Айлық есеп",
        advancedAnalyticsText: "Кеңейтілген аналитика",
        exportDataText: "Деректерді экспорттау",
        importDataText: "Деректерді импорттау",
        shareReportText: "Есеппен бөлісу",
        
        // Миссии
        yourFincoinsText: "Сіздің FinCoins:",
        storeText: "Дүкен",
        
        // Магазин
        yourFincoinsStoreText: "Сіздің FinCoins:",
        earnText: "Табу",
        premiumSubscriptionTitle: "Премиум жазылым",
        premiumItemTitle: "FinanceMind Premium",
        premiumBadge: "PREMIUM",
        premiumSubscriptionDesc: "Барлық премиум функцияларға қол жеткізіңіз",
        premiumFeaturesTitle: "Премиум функциялар",
        extendedAnalyticsTitle: "Кеңейтілген аналитика",
        popularText: "Танымал",
        extendedAnalyticsDesc: "Егжей-тегжейлі есептер мен шығындар болжамы",
        aiCoachTitle: "Жеке ЖС жаттықтырушысы",
        aiCoachDesc: "Жеке қаржылық ұсыныстар",
        personalizationTitle: "Жекелендіру", 
        exclusiveThemesTitle: "Эксклюзивті темалар",
        exclusiveThemesDesc: "5 бірегей түс схемасы",
        iconPackTitle: "Белгішелер жинағы",
        iconPackDesc: "Шығындар санаттары үшін стильді белгішелер",
        buyPremiumText: "Премиумды белсендіру",
        buyNowText: "Қазір сатып алу",
        
        // Цели
        addGoalTitle: "Жаңа мақсат қосу",
        goalNameLabel: "Мақсат атауы",
        goalAmountLabel: "Мақсат сомасы", 
        goalCurrentLabel: "Ағымдағы сома",
        goalDeadlineLabel: "Мақсат мерзімі",
        addGoalBtnText: "Мақсат қосу",
        deleteGoalText: "Жою"
    }
};

// Миссии приложения (увеличил до 15 миссий)
const appMissions = [
    // Базовые миссии
    {
        id: 1,
        title: "Экономия на еде",
        description: "Сэкономьте ₸3000 на продуктах за 3 дней",
        reward: 100,
        difficulty: "medium",
        category: "economy",
        condition: (userData) => {
            const threeDaysAgo = new Date();
            threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
            const recentExpenses = userData.expenses.filter(e => new Date(e.date) >= threeDaysAgo);
            const total = recentExpenses.reduce((sum, e) => sum + e.amount, 0);
            return total < 3000;
        },
        progress: (userData) => {
            const threeDaysAgo = new Date();
            threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
            const recentExpenses = userData.expenses.filter(e => new Date(e.date) >= threeDaysAgo);
            const total = recentExpenses.reduce((sum, e) => sum + e.amount, 0);
            const progress = Math.max(0, Math.min(100, 100 - (total / 3000) * 100));
            return progress;
        },
        requirements: [
            "Потратьте менее ₸3000 за последние 3 дня",
            "Следите за расходами на еду"
        ]
    },
    {
        id: 2,
        title: "Первая цель",
        description: "Создайте свою первую финансовую цель",
        reward: 50,
        difficulty: "easy",
        category: "goals",
        condition: (userData) => {
            return userData.goals.length >= 1;
        },
        progress: (userData) => {
            return userData.goals.length >= 1 ? 100 : 0;
        },
        requirements: [
            "Создайте хотя бы одну финансовую цель",
            "Начните планировать свои финансы"
        ]
    },
    {
        id: 3,
        title: "Первые накопления",
        description: "Отложите 10% от вашего дохода в этом месяце",
        reward: 120,
        difficulty: "medium",
        category: "savings",
        condition: (userData) => {
            return userData.goals.some(goal => goal.currentAmount > 0);
        },
        progress: (userData) => {
            const totalSaved = userData.goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
            const monthlyExpenses = userData.expenses
                .filter(e => {
                    const date = new Date(e.date);
                    const now = new Date();
                    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
                })
                .reduce((sum, e) => sum + e.amount, 0);
            const progress = monthlyExpenses > 0 ? Math.min(100, (totalSaved / monthlyExpenses) * 10) : 0;
            return progress;
        },
        requirements: [
            "Накопите 10% от месячных расходов",
            "Начните откладывать деньги регулярно"
        ]
    },
    {
        id: 4,
        title: "Аналитик недели",
        description: "Проверьте аналитику расходов 3 дня подряд",
        reward: 150,
        difficulty: "hard",
        category: "analytics",
        condition: (userData) => {
            return userData.expenses.length >= 10;
        },
        progress: (userData) => {
            return Math.min(100, (userData.expenses.length / 10) * 100);
        },
        requirements: [
            "Добавьте не менее 10 расходов",
            "Регулярно отслеживайте свои траты"
        ]
    },
    {
        id: 5,
        title: "Целеустремленный",
        description: "Создайте и выполните свою первую финансовую цель",
        reward: 200,
        difficulty: "hard",
        category: "goals",
        condition: (userData) => {
            return userData.goals.some(goal => goal.currentAmount >= goal.targetAmount);
        },
        progress: (userData) => {
            const completedGoals = userData.goals.filter(goal => goal.currentAmount >= goal.targetAmount);
            return completedGoals.length > 0 ? 100 : 0;
        },
        requirements: [
            "Выполните хотя бы одну финансовую цель",
            "Достигните целевой суммы накоплений"
        ]
    },
    // Новые миссии
    {
        id: 6,
        title: "Эксперт по бюджету",
        description: "Создайте бюджет на месяц и придерживайтесь его",
        reward: 180,
        difficulty: "medium",
        category: "budget",
        condition: (userData) => {
            const monthlyExpenses = getCurrentMonthExpenses(userData.expenses);
            return monthlyExpenses < 50000; // Пример лимита бюджета
        },
        progress: (userData) => {
            const monthlyExpenses = getCurrentMonthExpenses(userData.expenses);
            const progress = Math.max(0, 100 - (monthlyExpenses / 50000) * 100);
            return progress;
        },
        requirements: [
            "Не превышайте бюджет в ₸50,000 за месяц",
            "Планируйте расходы заранее"
        ]
    },
    {
        id: 7,
        title: "Инвестор-новичок",
        description: "Изучите основы инвестирования и создайте инвестиционный план",
        reward: 250,
        difficulty: "hard",
        category: "investment",
        condition: (userData) => {
            return userData.goals.some(goal => goal.name.toLowerCase().includes('инвест') || goal.name.toLowerCase().includes('investment'));
        },
        progress: (userData) => {
            const investmentGoals = userData.goals.filter(goal => 
                goal.name.toLowerCase().includes('инвест') || goal.name.toLowerCase().includes('investment')
            );
            return investmentGoals.length > 0 ? 100 : 30;
        },
        requirements: [
            "Создайте инвестиционную цель",
            "Изучите основы финансовых рынков"
        ]
    },
    {
        id: 8,
        title: "Экономист месяца",
        description: "Сократите расходы на 20% по сравнению с прошлым месяцем",
        reward: 300,
        difficulty: "hard",
        category: "economy",
        condition: (userData) => {
            const currentMonthExpenses = getCurrentMonthExpenses(userData.expenses);
            const lastMonthExpenses = getLastMonthExpenses(userData.expenses);
            return lastMonthExpenses > 0 && currentMonthExpenses < lastMonthExpenses * 0.8;
        },
        progress: (userData) => {
            const currentMonthExpenses = getCurrentMonthExpenses(userData.expenses);
            const lastMonthExpenses = getLastMonthExpenses(userData.expenses);
            const progress = lastMonthExpenses > 0 ? Math.min(100, ((lastMonthExpenses - currentMonthExpenses) / lastMonthExpenses) * 100) : 0;
            return progress;
        },
        requirements: [
            "Сократите расходы на 20%",
            "Анализируйте категории трат"
        ]
    },
    {
        id: 9,
        title: "Планировщик",
        description: "Запланируйте расходы на неделю вперед",
        reward: 80,
        difficulty: "easy",
        category: "planning",
        condition: (userData) => {
            return userData.expenses.some(expense => {
                const expenseDate = new Date(expense.date);
                const today = new Date();
                const weekFromNow = new Date(today);
                weekFromNow.setDate(today.getDate() + 7);
                return expenseDate > today && expenseDate <= weekFromNow;
            });
        },
        progress: (userData) => {
            const plannedExpenses = userData.expenses.filter(expense => {
                const expenseDate = new Date(expense.date);
                const today = new Date();
                const weekFromNow = new Date(today);
                weekFromNow.setDate(today.getDate() + 7);
                return expenseDate > today && expenseDate <= weekFromNow;
            });
            return plannedExpenses.length > 0 ? 100 : 0;
        },
        requirements: [
            "Запланируйте хотя бы один расход на будущую неделю",
            "Используйте функцию планирования расходов"
        ]
    },
    {
        id: 10,
        title: "Финансовый консультант",
        description: "Помогите 3 друзьям с финансовым планированием",
        reward: 400,
        difficulty: "hard",
        category: "social",
        condition: (userData) => {
            return userData.fincoins >= 1000; // Предположим, что это показатель активности
        },
        progress: (userData) => {
            return Math.min(100, (userData.fincoins / 1000) * 100);
        },
        requirements: [
            "Достигните 1000 FinCoins",
            "Будьте активны в приложении"
        ]
    },
    {
        id: 11,
        title: "Ранняя пташка",
        description: "Ведите учет расходов 7 дней подряд",
        reward: 120,
        difficulty: "medium",
        category: "consistency",
        condition: (userData) => {
            return hasConsecutiveDays(userData.expenses, 7);
        },
        progress: (userData) => {
            return Math.min(100, (getMaxConsecutiveDays(userData.expenses) / 7) * 100);
        },
        requirements: [
            "Добавляйте расходы 7 дней подряд",
            "Не пропускайте дни учета"
        ]
    },
    {
        id: 12,
        title: "Категорийный эксперт",
        description: "Используйте все 5 основных категорий расходов",
        reward: 150,
        difficulty: "medium",
        category: "organization",
        condition: (userData) => {
            const categories = [...new Set(userData.expenses.map(e => e.category))];
            const baseCategories = ['Еда', 'Транспорт', 'Учеба', 'Развлечения', 'Другое'];
            return baseCategories.every(cat => categories.includes(cat));
        },
        progress: (userData) => {
            const categories = [...new Set(userData.expenses.map(e => e.category))];
            const baseCategories = ['Еда', 'Транспорт', 'Учеба', 'Развлечения', 'Другое'];
            const usedCategories = baseCategories.filter(cat => categories.includes(cat));
            return (usedCategories.length / baseCategories.length) * 100;
        },
        requirements: [
            "Используйте все основные категории расходов",
            "Правильно categorizeруйте все траты"
        ]
    },
    {
        id: 13,
        title: "Экономия на транспорте",
        description: "Потратьте на 30% меньше на транспорт в этом месяце",
        reward: 200,
        difficulty: "medium",
        category: "transport",
        condition: (userData) => {
            const currentTransport = getCurrentMonthExpensesByCategory(userData.expenses, 'Транспорт');
            const lastTransport = getLastMonthExpensesByCategory(userData.expenses, 'Транспорт');
            return lastTransport > 0 && currentTransport < lastTransport * 0.7;
        },
        progress: (userData) => {
            const currentTransport = getCurrentMonthExpensesByCategory(userData.expenses, 'Транспорт');
            const lastTransport = getLastMonthExpensesByCategory(userData.expenses, 'Транспорт');
            const progress = lastTransport > 0 ? Math.min(100, ((lastTransport - currentTransport) / lastTransport) * 100) : 0;
            return progress;
        },
        requirements: [
            "Сократите транспортные расходы на 30%",
            "Используйте альтернативные способы передвижения"
        ]
    },
    {
        id: 14,
        title: "Развлекательный бюджет",
        description: "Не превышайте лимит в ₸10,000 на развлечения в месяц",
        reward: 180,
        difficulty: "medium",
        category: "entertainment",
        condition: (userData) => {
            const entertainmentExpenses = getCurrentMonthExpensesByCategory(userData.expenses, 'Развлечения');
            return entertainmentExpenses <= 10000;
        },
        progress: (userData) => {
            const entertainmentExpenses = getCurrentMonthExpensesByCategory(userData.expenses, 'Развлечения');
            const progress = Math.max(0, 100 - (entertainmentExpenses / 10000) * 100);
            return progress;
        },
        requirements: [
            "Уложитесь в бюджет на развлечения",
            "Контролируйте спонтанные траты"
        ]
    },
    {
        id: 15,
        title: "Финансовый гуру",
        description: "Выполните 10 различных миссий",
        reward: 500,
        difficulty: "hard",
        category: "mastery",
        condition: (userData) => {
            return userData.completedMissions && userData.completedMissions.length >= 10;
        },
        progress: (userData) => {
            const completedCount = userData.completedMissions ? userData.completedMissions.length : 0;
            return Math.min(100, (completedCount / 10) * 100);
        },
        requirements: [
            "Выполните 10 различных миссий",
            "Пройдите все этапы финансового развития"
        ]
    }
];

// Вспомогательные функции для миссий
function getCurrentMonthExpenses(expenses) {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    return expenses
        .filter(expense => {
            const expenseDate = new Date(expense.date);
            return expenseDate.getMonth() === currentMonth && 
                   expenseDate.getFullYear() === currentYear;
        })
        .reduce((sum, expense) => sum + expense.amount, 0);
}

function getLastMonthExpenses(expenses) {
    const currentDate = new Date();
    const lastMonth = currentDate.getMonth() === 0 ? 11 : currentDate.getMonth() - 1;
    const lastMonthYear = currentDate.getMonth() === 0 ? currentDate.getFullYear() - 1 : currentDate.getFullYear();
    
    return expenses
        .filter(expense => {
            const expenseDate = new Date(expense.date);
            return expenseDate.getMonth() === lastMonth && 
                   expenseDate.getFullYear() === lastMonthYear;
        })
        .reduce((sum, expense) => sum + expense.amount, 0);
}

function getCurrentMonthExpensesByCategory(expenses, category) {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    return expenses
        .filter(expense => {
            const expenseDate = new Date(expense.date);
            return expenseDate.getMonth() === currentMonth && 
                   expenseDate.getFullYear() === currentYear &&
                   expense.category === category;
        })
        .reduce((sum, expense) => sum + expense.amount, 0);
}

function getLastMonthExpensesByCategory(expenses, category) {
    const currentDate = new Date();
    const lastMonth = currentDate.getMonth() === 0 ? 11 : currentDate.getMonth() - 1;
    const lastMonthYear = currentDate.getMonth() === 0 ? currentDate.getFullYear() - 1 : currentDate.getFullYear();
    
    return expenses
        .filter(expense => {
            const expenseDate = new Date(expense.date);
            return expenseDate.getMonth() === lastMonth && 
                   expenseDate.getFullYear() === lastMonthYear &&
                   expense.category === category;
        })
        .reduce((sum, expense) => sum + expense.amount, 0);
}

function hasConsecutiveDays(expenses, days) {
    const dates = [...new Set(expenses.map(e => e.date))].sort();
    let consecutive = 1;
    
    for (let i = 1; i < dates.length; i++) {
        const prevDate = new Date(dates[i-1]);
        const currentDate = new Date(dates[i]);
        const diffTime = Math.abs(currentDate - prevDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
            consecutive++;
            if (consecutive >= days) return true;
        } else {
            consecutive = 1;
        }
    }
    
    return false;
}

function getMaxConsecutiveDays(expenses) {
    const dates = [...new Set(expenses.map(e => e.date))].sort();
    let maxConsecutive = 1;
    let currentConsecutive = 1;
    
    for (let i = 1; i < dates.length; i++) {
        const prevDate = new Date(dates[i-1]);
        const currentDate = new Date(dates[i]);
        const diffTime = Math.abs(currentDate - prevDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
            currentConsecutive++;
            maxConsecutive = Math.max(maxConsecutive, currentConsecutive);
        } else {
            currentConsecutive = 1;
        }
    }
    
    return maxConsecutive;
}

// ========== ФУНКЦИИ ДЛЯ ФОРМАТИРОВАНИЯ ==========

function formatAmount(amount) {
    return Math.round(amount).toLocaleString('ru-RU') + ' ₸';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
}

// ========== ФУНКЦИИ ДЛЯ АВТОРИЗАЦИИ И РЕГИСТРАЦИИ ==========

function resetAllData() {
    if (confirm('Вы уверены, что хотите сбросить все данные? Это удалит все ваши настройки, расходы и цели.')) {
        localStorage.clear();
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        document.getElementById('regName').value = '';
        document.getElementById('regEmail').value = '';
        document.getElementById('regPassword').value = '';
        
        currentUser = null;
        expenses = [];
        goals = [];
        fincoins = 0;
        missions = [];
        purchasedItems = [];
        selectedCategory = null;
        
        showNotification('Все данные сброшены! Теперь вы можете зарегистрироваться заново.', 'success');
        showRegisterForm();
        
        setTimeout(() => {
            location.reload();
        }, 1000);
    }
}

function logoutAndReset() {
    saveUserData();
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
    currentUser = null;
    
    const appHeader = document.getElementById('appHeader');
    const bottomNav = document.getElementById('bottomNav');
    const dashboard = document.getElementById('dashboard');
    
    if (appHeader) appHeader.style.display = 'none';
    if (bottomNav) bottomNav.style.display = 'none';
    if (dashboard) dashboard.style.display = 'none';
    
    const pages = ['analytics', 'missions', 'store', 'settings', 'chat', 'adminPanel'];
    pages.forEach(page => {
        const pageElement = document.getElementById(page);
        if (pageElement) {
            pageElement.style.display = 'none';
        }
    });
    
    const authPage = document.getElementById('authPage');
    if (authPage) {
        authPage.style.display = 'block';
    }
    
    showLoginForm();
    showNotification('Вы вышли из системы', 'info');
}

function register() {
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const role = document.getElementById('regRole').value;
    
    if (!name || !email || !password) {
        showNotification('Пожалуйста, заполните все поля', 'error');
        return;
    }
    
    if (password.length < 6) {
        showNotification('Пароль должен содержать минимум 6 символов', 'error');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('financemind_users') || '[]');
    
    if (users.find(u => u.email === email)) {
        showNotification('Пользователь с таким email уже существует. Используйте другой email или войдите в систему.', 'error');
        return;
    }
    
    const newUser = {
        id: Date.now().toString(),
        name: name,
        email: email,
        password: password,
        role: role,
        createdAt: new Date().toISOString(),
        profile: {
            lastName: '',
            role: role === 'admin' ? 'Администратор' : 'Пользователь'
        },
        settings: {
            language: 'ru',
            theme: 'light'
        }
    };
    
    users.push(newUser);
    localStorage.setItem('financemind_users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    localStorage.setItem('isLoggedIn', 'true');
    
    currentUser = newUser;
    initializeUserData(newUser.id);
    showAppInterface();
    showNotification('Регистрация выполнена успешно! Добро пожаловать в FinanceMind!', 'success');
}

function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (!email || !password) {
        showNotification('Пожалуйста, заполните все поля', 'error');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('financemind_users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('isLoggedIn', 'true');
        currentUser = user;
        loadUserData();
        showAppInterface();
        showNotification('Вход выполнен успешно! Рады снова видеть вас!', 'success');
    } else {
        showNotification('Неверный email или пароль. Проверьте данные или сбросьте настройки.', 'error');
    }
}

function initializeUserData(userId) {
    const userData = {
        expenses: [],
        goals: [],
        missions: [],
        fincoins: 100,
        purchasedItems: [],
        completedMissions: [],
        hasPremiumSubscription: false,
        settings: {
            language: 'ru',
            theme: 'light',
            currency: '₸',
            notifications: true
        }
    };
    
    localStorage.setItem(`userData_${userId}`, JSON.stringify(userData));
    expenses = [];
    goals = [];
    fincoins = 100;
    missions = [];
    purchasedItems = [];
}

// ========== ФУНКЦИИ ДЛЯ РАБОТЫ С ФОРМАМИ ==========

function showLoginForm() {
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
}

function showRegisterForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
}

function showAppInterface() {
    document.getElementById('authPage').style.display = 'none';
    document.getElementById('appHeader').style.display = 'flex';
    document.getElementById('bottomNav').style.display = 'flex';
    
    // Показать кнопку админа если пользователь админ
    if (currentUser && currentUser.role === 'admin') {
        document.getElementById('adminButton').style.display = 'flex';
    }
    
    // Инициализация языка при показе интерфейса
    initLanguage();
    showPage('dashboard');
}

// ========== ФУНКЦИИ ДЛЯ ПЕРЕКЛЮЧЕНИЯ СТРАНИЦ ==========

function showPage(page) {
    console.log('Переключение на страницу:', page);
    
    const mainPages = ['dashboard', 'analytics', 'missions', 'store', 'settings', 'chat', 'adminPanel'];
    mainPages.forEach(p => {
        const pageElement = document.getElementById(p);
        if (pageElement) {
            pageElement.style.display = 'none';
        }
    });
    
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (modal.id !== 'goalModal' && modal.id !== 'missionModal') {
            modal.style.display = 'none';
        }
    });
    
    const targetPage = document.getElementById(page);
    if (targetPage) {
        targetPage.style.display = 'block';
        console.log('Страница показана:', page);
        
        targetPage.style.opacity = '0';
        targetPage.style.transform = 'translateY(20px)';
        targetPage.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        
        setTimeout(() => {
            targetPage.style.opacity = '1';
            targetPage.style.transform = 'translateY(0)';
        }, 50);
        
        if (page === 'chat') {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    } else {
        console.error('Страница не найдена:', page);
        const dashboard = document.getElementById('dashboard');
        if (dashboard) {
            dashboard.style.display = 'block';
            document.body.style.overflow = 'auto';
        }
    }
    
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    const activeNavItem = document.querySelector(`.nav-item[onclick*="${page}"]`);
    if (activeNavItem) {
        activeNavItem.classList.add('active');
    }
    
    updatePageTitle(page);
    updatePageContent(page);
}

function updatePageTitle(page) {
    const titles = {
        'dashboard': 'FinanceMind',
        'analytics': 'Аналитика',
        'missions': 'Миссии',
        'store': 'Магазин',
        'settings': 'Настройки',
        'chat': 'AI Помощник',
        'adminPanel': 'Админ панель'
    };
    
    const pageTitleElement = document.getElementById('pageTitle');
    if (pageTitleElement && titles[page]) {
        pageTitleElement.textContent = titles[page];
    }
}

function updatePageContent(page) {
    switch(page) {
        case 'dashboard':
            updateDashboard();
            break;
        case 'analytics':
            updateAnalytics();
            break;
        case 'missions':
            updateMissions();
            break;
        case 'store':
            updateStore();
            break;
        case 'settings':
            updateSettings();
            break;
        case 'chat':
            updateChat();
            break;
        case 'adminPanel':
            updateAdminPanel();
            break;
    }
}

function updateDashboard() {
    loadUserData();
    updateUserInterface();
    updateExpenseStats();
    renderGoals();
    updateAIAdvice();
}

function updateAnalytics() {
    updateExpenseStats();
    updateCharts();
    updateExpenseList();
}

function updateMissions() {
    renderMissions();
    updateFincoinsBalance();
}

function updateStore() {
    updateFincoinsBalance();
    renderStoreItems();
}

function updateSettings() {
    if (currentUser) {
        document.getElementById('profileNameInput').value = currentUser.name || '';
        document.getElementById('profileLastNameInput').value = currentUser.profile?.lastName || '';
        document.getElementById('profileEmailInput').value = currentUser.email || '';
    }
}

function updateChat() {
    const chatMessages = document.getElementById('chatMessages');
    if (chatMessages) {
        setTimeout(() => {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 100);
    }
}

function updateAdminPanel() {
    if (currentUser && currentUser.role === 'admin') {
        loadAdminData();
    } else {
        showNotification('Доступ запрещен. Только для администраторов.', 'error');
        showPage('dashboard');
    }
}

// ========== ФУНКЦИИ ДЛЯ РАБОТЫ С ДАННЫМИ ==========

function loadUserData() {
    if (!currentUser) {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            currentUser = JSON.parse(savedUser);
        }
    }
    
    if (currentUser && currentUser.id) {
        const userData = JSON.parse(localStorage.getItem(`userData_${currentUser.id}`) || '{}');
        
        expenses = userData.expenses || [];
        goals = userData.goals || [];
        fincoins = userData.fincoins || 0;
        missions = userData.missions || [];
        purchasedItems = userData.purchasedItems || [];
        
        updateUserInterface();
    }
}

function saveUserData() {
    if (currentUser && currentUser.id) {
        const userData = {
            expenses: expenses,
            goals: goals,
            missions: missions,
            fincoins: fincoins,
            purchasedItems: purchasedItems,
            completedMissions: missions.filter(m => m.completed).map(m => m.id),
            hasPremiumSubscription: purchasedItems.includes('premium_subscription'),
            settings: {
                language: currentLanguage,
                theme: 'light',
                currency: '₸',
                notifications: true
            }
        };
        localStorage.setItem(`userData_${currentUser.id}`, JSON.stringify(userData));
        console.log('Данные сохранены для пользователя:', currentUser.id);
    }
}

function updateUserInterface() {
    if (!currentUser) return;
    
    try {
        const userNameElement = document.getElementById('userName');
        const userGreetingElement = document.getElementById('userGreeting');
        const profileNameElement = document.getElementById('profileName');
        const profileEmailElement = document.getElementById('profileEmail');
        
        if (userNameElement) userNameElement.textContent = currentUser.name;
        if (userGreetingElement) userGreetingElement.textContent = getGreeting();
        if (profileNameElement) profileNameElement.textContent = currentUser.name;
        if (profileEmailElement) profileEmailElement.textContent = currentUser.email;
        
        const userAvatar = document.getElementById('userAvatar');
        const profileAvatar = document.getElementById('profileAvatar');
        const avatarText = currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'П';
        
        if (userAvatar) userAvatar.textContent = avatarText;
        if (profileAvatar) profileAvatar.textContent = avatarText;
        
    } catch (error) {
        console.error('Ошибка при обновлении интерфейса:', error);
    }
}

function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Доброе утро!';
    if (hour < 18) return 'Добрый день!';
    return 'Добрый вечер!';
}

function updateAIAdvice() {
    const aiMessageElement = document.getElementById('aiMessage');
    if (!aiMessageElement) return;
    
    const advice = generateAIAdvice();
    aiMessageElement.textContent = advice;
}

function generateAIAdvice() {
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const currentMonthExpenses = expenses
        .filter(expense => {
            const expenseDate = new Date(expense.date);
            const currentDate = new Date();
            return expenseDate.getMonth() === currentDate.getMonth() && 
                   expenseDate.getFullYear() === currentDate.getFullYear();
        })
        .reduce((sum, expense) => sum + expense.amount, 0);
    
    if (expenses.length === 0) {
        return "Начните добавлять расходы, чтобы получить персонализированные советы по управлению финансами!";
    }
    
    if (currentMonthExpenses > 50000) {
        return "Ваши расходы в этом месяце довольно высокие. Рекомендую проанализировать категории трат и найти возможности для экономии.";
    }
    
    if (goals.length === 0) {
        return "Создайте финансовую цель, чтобы мотивировать себя на регулярные накопления. Это поможет достичь ваших мечтаний быстрее!";
    }
    
    const foodExpenses = expenses
        .filter(expense => expense.category === 'Еда')
        .reduce((sum, expense) => sum + expense.amount, 0);
    
    if (foodExpenses > totalExpenses * 0.4) {
        return "Заметил, что значительная часть расходов уходит на еду. Попробуйте планировать покупки заранее и готовить дома - это поможет сэкономить.";
    }
    
    const adviceList = [
        "Регулярное отслеживание расходов - первый шаг к финансовой стабильности. Продолжайте в том же духе!",
        "Попробуйте правило 50/30/20: 50% на necessities, 30% на wants, 20% на savings.",
        "Маленькие ежедневные расходы часто складываются в крупные суммы. Ведите учет всех трат.",
        "Установите автоматические переводы на сбережения - это самый простой способ накопить.",
        "Перед крупной покупкой дайте себе 24 часа на размышление - это поможет избежать импульсных трат."
    ];
    
    return adviceList[Math.floor(Math.random() * adviceList.length)];
}

// ========== ФУНКЦИИ ДЛЯ ЦЕЛЕЙ ==========

function openGoalModal() {
    document.getElementById('goalModal').style.display = 'flex';
    
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    const goalDateInput = document.getElementById('goalDeadline');
    if (goalDateInput) {
        goalDateInput.value = nextMonth.toISOString().split('T')[0];
    }
}

function closeGoalModal() {
    document.getElementById('goalModal').style.display = 'none';
    
    document.getElementById('goalName').value = '';
    document.getElementById('goalAmount').value = '';
    document.getElementById('goalCurrent').value = '0';
    const goalDateInput = document.getElementById('goalDeadline');
    if (goalDateInput) {
        const nextMonth = new Date();
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        goalDateInput.value = nextMonth.toISOString().split('T')[0];
    }
}

function addNewGoal() {
    const name = document.getElementById('goalName').value;
    const amount = parseFloat(document.getElementById('goalAmount').value);
    const current = parseFloat(document.getElementById('goalCurrent').value) || 0;
    const deadline = document.getElementById('goalDeadline').value;
    
    if (!name || !amount || !deadline) {
        showNotification('Пожалуйста, заполните все обязательные поля', 'error');
        return;
    }
    
    if (amount <= 0) {
        showNotification('Сумма цели должна быть больше 0', 'error');
        return;
    }
    
    if (current > amount) {
        showNotification('Текущая сумма не может превышать целевую сумму', 'error');
        return;
    }
    
    const deadlineDate = new Date(deadline);
    if (deadlineDate < new Date()) {
        showNotification('Срок цели не может быть в прошлом', 'error');
        return;
    }
    
    const newGoal = {
        id: Date.now().toString(),
        name: name,
        targetAmount: amount,
        currentAmount: current,
        deadline: deadline,
        createdAt: new Date().toISOString(),
        completed: current >= amount,
        category: 'Накопления',
        color: '#4F6DFF'
    };
    
    goals.push(newGoal);
    saveUserData();
    renderGoals();
    closeGoalModal();
    showNotification('Цель успешно добавлена!', 'success');
}

// Функция удаления цели
function deleteGoal(goalId) {
    if (confirm('Вы уверены, что хотите удалить эту цель?')) {
        goals = goals.filter(goal => goal.id !== goalId);
        saveUserData();
        renderGoals();
        showNotification('Цель успешно удалена!', 'success');
    }
}

function renderGoals() {
    const goalsList = document.getElementById('goalsList');
    const emptyGoals = document.getElementById('emptyGoals');
    
    if (!goals || goals.length === 0) {
        if (goalsList) goalsList.innerHTML = '';
        if (emptyGoals) emptyGoals.style.display = 'block';
        return;
    }
    
    if (emptyGoals) emptyGoals.style.display = 'none';
    
    if (goalsList) {
        const sortedGoals = [...goals].sort((a, b) => {
            if (a.completed && !b.completed) return 1;
            if (!a.completed && b.completed) return -1;
            return new Date(a.deadline) - new Date(b.deadline);
        });
        
        goalsList.innerHTML = sortedGoals.map(goal => {
            const progress = Math.min(100, (goal.currentAmount / goal.targetAmount) * 100);
            const isCompleted = goal.completed || progress >= 100;
            const daysLeft = Math.ceil((new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24));
            const deleteText = currentLanguage === 'ru' ? 'Удалить' : 'Delete';
            
            return `
                <div class="goal-item ${isCompleted ? 'completed' : ''}">
                    <div class="goal-header">
                        <div class="goal-name">${goal.name}</div>
                        <div class="goal-amount">${formatAmount(goal.currentAmount)} / ${formatAmount(goal.targetAmount)}</div>
                    </div>
                    <div class="goal-progress-bar">
                        <div class="goal-progress-fill" style="width: ${progress}%"></div>
                    </div>
                    <div class="goal-info">
                        <div class="goal-deadline">
                            ${isCompleted ? '🎉 Цель достигнута!' : (daysLeft > 0 ? `Осталось ${daysLeft} дней` : 'Срок истек')}
                        </div>
                        <div class="goal-percentage">${Math.round(progress)}%</div>
                    </div>
                    <div class="goal-actions">
                        <button class="goal-delete-btn" onclick="deleteGoal('${goal.id}')">
                            <i class="fas fa-trash"></i>
                            ${deleteText}
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }
}

// ========== ФУНКЦИИ ДЛЯ РАСХОДОВ ==========

function addExpense() {
    const amount = parseFloat(document.getElementById('expenseAmount').value);
    const date = document.getElementById('expenseDate').value;
    const description = document.getElementById('expenseDescription').value;
    
    if (!amount || !date || !selectedCategory) {
        showNotification('Пожалуйста, заполните все поля и выберите категорию', 'error');
        return;
    }
    
    if (amount <= 0) {
        showNotification('Сумма расхода должна быть больше 0', 'error');
        return;
    }
    
    const newExpense = {
        id: Date.now().toString(),
        amount: amount,
        date: date,
        category: selectedCategory,
        description: description || 'Без описания',
        createdAt: new Date().toISOString(),
        currency: '₸'
    };
    
    expenses.push(newExpense);
    saveUserData();
    updateExpenseList();
    updateExpenseStats();
    updateCharts();
    updateMissionsProgress();
    
    document.getElementById('expenseAmount').value = '';
    document.getElementById('expenseDate').value = new Date().toISOString().split('T')[0];
    document.getElementById('expenseDescription').value = '';
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    selectedCategory = null;
    
    showNotification('Расход успешно добавлен!', 'success');
    addFincoins(5);
}

function updateExpenseList() {
    const expenseList = document.getElementById('expenseList');
    const emptyExpenses = document.getElementById('emptyExpenses');
    
    if (!expenses || expenses.length === 0) {
        if (expenseList) expenseList.innerHTML = '';
        if (emptyExpenses) emptyExpenses.style.display = 'block';
        return;
    }
    
    if (emptyExpenses) emptyExpenses.style.display = 'none';
    
    if (expenseList) {
        const sortedExpenses = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));
        
        expenseList.innerHTML = sortedExpenses.slice(0, 10).map(expense => {
            return `
                <div class="expense-item">
                    <div class="expense-category">${expense.category}</div>
                    <div class="expense-description">${expense.description}</div>
                    <div class="expense-amount">${formatAmount(expense.amount)}</div>
                    <div class="expense-date">${formatDate(expense.date)}</div>
                </div>
            `;
        }).join('');
    }
}

function updateExpenseStats() {
    const stats = calculateExpenseStats();
    const statsContainer = document.getElementById('expenseStats');
    const analyticsStatsContainer = document.getElementById('analyticsStats');
    
    const statsHTML = `
        <div class="stat-card">
            <div class="stat-value">${formatAmount(stats.totalExpenses)}</div>
            <div class="stat-label">Общая сумма расходов</div>
        </div>
        <div class="stat-card">
            <div class="stat-value">${formatAmount(stats.averageExpense)}</div>
            <div class="stat-label">Средний расход</div>
        </div>
        <div class="stat-card">
            <div class="stat-value">${formatAmount(stats.currentMonthExpenses)}</div>
            <div class="stat-label">Расходы за текущий месяц</div>
        </div>
        <div class="stat-card">
            <div class="stat-value">${stats.categoriesCount}</div>
            <div class="stat-label">Количество категорий</div>
        </div>
    `;
    
    if (statsContainer) {
        statsContainer.innerHTML = statsHTML;
    }
    
    if (analyticsStatsContainer) {
        analyticsStatsContainer.innerHTML = statsHTML;
    }
}

function calculateExpenseStats() {
    if (!expenses || expenses.length === 0) {
        return {
            totalExpenses: 0,
            averageExpense: 0,
            currentMonthExpenses: 0,
            categoriesCount: 0
        };
    }
    
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const averageExpense = Math.round(totalExpenses / expenses.length);
    
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    const currentMonthExpenses = expenses
        .filter(expense => {
            const expenseDate = new Date(expense.date);
            return expenseDate.getMonth() === currentMonth && 
                   expenseDate.getFullYear() === currentYear;
        })
        .reduce((sum, expense) => sum + expense.amount, 0);
    
    const categories = [...new Set(expenses.map(expense => expense.category))];
    const categoriesCount = categories.length;
    
    return {
        totalExpenses,
        averageExpense,
        currentMonthExpenses,
        categoriesCount
    };
}

// ========== ФУНКЦИИ ДЛЯ ГРАФИКОВ ==========

function changeChartType(type) {
    currentChartType = type;
    
    document.querySelectorAll('.chart-type-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    if (type === 'total') {
        document.getElementById('totalChartBtn').classList.add('active');
    } else {
        document.getElementById('categoriesChartBtn').classList.add('active');
    }
    
    updateLineChart();
}

function updateCharts() {
    updateLineChart();
    updatePieChart();
}

function updateLineChart() {
    const ctx = document.getElementById('lineChart');
    const emptyLineChart = document.getElementById('emptyLineChart');
    
    if (!expenses || expenses.length === 0) {
        if (emptyLineChart) emptyLineChart.style.display = 'flex';
        if (ctx) ctx.style.display = 'none';
        return;
    }
    
    if (emptyLineChart) emptyLineChart.style.display = 'none';
    if (ctx) ctx.style.display = 'block';
    
    if (lineChart) {
        lineChart.destroy();
    }
    
    const last30Days = [];
    for (let i = 29; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        last30Days.push(date.toISOString().split('T')[0]);
    }
    
    if (currentChartType === 'total') {
        const expensesByDate = {};
        last30Days.forEach(date => {
            expensesByDate[date] = 0;
        });
        
        expenses.forEach(expense => {
            if (expensesByDate[expense.date] !== undefined) {
                expensesByDate[expense.date] += expense.amount;
            }
        });
        
        const chartData = {
            labels: last30Days.map(date => {
                const d = new Date(date);
                return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
            }),
            datasets: [{
                label: 'Общие расходы',
                data: last30Days.map(date => expensesByDate[date]),
                borderColor: '#4F6DFF',
                backgroundColor: 'rgba(79, 109, 255, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }]
        };
        
        const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '₸' + value.toLocaleString();
                        }
                    }
                }
            }
        };
        
        lineChart = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: chartOptions
        });
    } else {
        const categories = [...new Set(expenses.map(expense => expense.category))];
        const colors = {
            'Еда': '#FF6384',
            'Транспорт': '#36A2EB',
            'Учеба': '#FFCE56',
            'Развлечения': '#4BC0C0',
            'Другое': '#9966FF'
        };
        
        const datasets = categories.map(category => {
            const categoryExpensesByDate = {};
            last30Days.forEach(date => {
                categoryExpensesByDate[date] = 0;
            });
            
            expenses
                .filter(expense => expense.category === category)
                .forEach(expense => {
                    if (categoryExpensesByDate[expense.date] !== undefined) {
                        categoryExpensesByDate[expense.date] += expense.amount;
                    }
                });
            
            return {
                label: category,
                data: last30Days.map(date => categoryExpensesByDate[date]),
                borderColor: colors[category] || '#C9CBCF',
                backgroundColor: colors[category] ? `${colors[category]}20` : '#C9CBCF20',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            };
        });
        
        const chartData = {
            labels: last30Days.map(date => {
                const d = new Date(date);
                return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
            }),
            datasets: datasets
        };
        
        const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '₸' + value.toLocaleString();
                        }
                    }
                }
            }
        };
        
        lineChart = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: chartOptions
        });
    }
}

function updatePieChart() {
    const ctx = document.getElementById('pieChart');
    const emptyPieChart = document.getElementById('emptyPieChart');
    
    if (!expenses || expenses.length === 0) {
        if (emptyPieChart) emptyPieChart.style.display = 'flex';
        if (ctx) ctx.style.display = 'none';
        return;
    }
    
    if (emptyPieChart) emptyPieChart.style.display = 'none';
    if (ctx) ctx.style.display = 'block';
    
    if (pieChart) {
        pieChart.destroy();
    }
    
    const expensesByCategory = {};
    expenses.forEach(expense => {
        if (!expensesByCategory[expense.category]) {
            expensesByCategory[expense.category] = 0;
        }
        expensesByCategory[expense.category] += expense.amount;
    });
    
    const categories = Object.keys(expensesByCategory);
    const amounts = Object.values(expensesByCategory);
    
    const colors = {
        'Еда': '#FF6384',
        'Транспорт': '#36A2EB',
        'Учеба': '#FFCE56',
        'Развлечения': '#4BC0C0',
        'Другое': '#9966FF'
    };
    
    const backgroundColors = categories.map(category => colors[category] || '#C9CBCF');
    
    const chartData = {
        labels: categories,
        datasets: [{
            data: amounts,
            backgroundColor: backgroundColors,
            borderWidth: 2,
            borderColor: '#FFFFFF'
        }]
    };
    
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom'
            }
        }
    };
    
    pieChart = new Chart(ctx, {
        type: 'doughnut',
        data: chartData,
        options: chartOptions
    });
}

// ========== ФУНКЦИИ ДЛЯ МИССИЙ И МАГАЗИНА ==========

function updateFincoinsBalance() {
    document.getElementById('fincoinsBalance').textContent = fincoins.toLocaleString();
    document.getElementById('storeBalance').textContent = fincoins.toLocaleString();
}

function addFincoins(amount) {
    fincoins += amount;
    saveUserData();
    updateFincoinsBalance();
    showNotification(`+${amount} FinCoins!`, 'success');
}

function renderMissions() {
    const missionsList = document.getElementById('missionsList');
    if (!missionsList) return;
    
    if (appMissions.length === 0) {
        missionsList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-trophy"></i>
                <p>Миссии скоро появятся!</p>
                <p class="subtext">Следите за обновлениями</p>
            </div>
        `;
        return;
    }
    
    // Группировка миссий по категориям
    const missionsByCategory = {};
    appMissions.forEach(mission => {
        if (!missionsByCategory[mission.category]) {
            missionsByCategory[mission.category] = [];
        }
        missionsByCategory[mission.category].push(mission);
    });
    
    let missionsHTML = '';
    
    Object.keys(missionsByCategory).forEach(category => {
        const categoryMissions = missionsByCategory[category];
        const categoryTitle = getCategoryTitle(category);
        
        missionsHTML += `
            <div class="mission-category">
                <h3 class="mission-category-title">${categoryTitle}</h3>
                <div class="mission-category-list">
                    ${categoryMissions.map(mission => {
                        const userData = {
                            expenses: expenses,
                            goals: goals,
                            fincoins: fincoins,
                            completedMissions: missions.filter(m => m.completed).map(m => m.id)
                        };
                        
                        const progress = mission.progress(userData);
                        const isCompleted = mission.condition(userData);
                        const difficultyColors = {
                            'easy': '#48BB78',
                            'medium': '#ED8936',
                            'hard': '#E53E3E'
                        };
                        
                        const isNew = mission.id > 10; // Новые миссии
                        const isPopular = mission.reward >= 200;
                        
                        return `
                            <div class="mission-item">
                                <div class="mission-icon">
                                    <i class="fas fa-${getMissionIcon(mission.id)}"></i>
                                </div>
                                <div class="mission-info">
                                    <div class="mission-title">
                                        ${mission.title}
                                        ${isNew ? '<span class="mission-badge badge-new">НОВАЯ</span>' : ''}
                                        ${isPopular ? '<span class="mission-badge badge-popular">ПОПУЛЯРНАЯ</span>' : ''}
                                    </div>
                                    <div class="mission-description">${mission.description}</div>
                                    <div class="mission-reward">
                                        Награда: ${mission.reward} FinCoins • 
                                        <span style="color: ${difficultyColors[mission.difficulty]}">
                                            ${getDifficultyText(mission.difficulty)}
                                        </span>
                                    </div>
                                    <div class="mission-progress" style="margin-top: 8px;">
                                        <div style="background: #E2E8F0; height: 4px; border-radius: 2px; overflow: hidden;">
                                            <div style="background: #4F6DFF; height: 100%; width: ${progress}%; transition: width 0.3s ease;"></div>
                                        </div>
                                        <div style="font-size: 12px; color: #718096; text-align: right; margin-top: 4px;">
                                            ${Math.round(progress)}% выполнено
                                        </div>
                                    </div>
                                </div>
                                <button class="mission-action" 
                                        onclick="completeMission(${mission.id})"
                                        ${!isCompleted ? 'disabled' : ''}>
                                    ${isCompleted ? 'Получить награду' : 'В процессе'}
                                </button>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    });
    
    missionsList.innerHTML = missionsHTML;
}

function getCategoryTitle(category) {
    const titles = {
        'economy': 'Экономия',
        'goals': 'Цели',
        'savings': 'Накопления',
        'analytics': 'Аналитика',
        'budget': 'Бюджет',
        'investment': 'Инвестиции',
        'planning': 'Планирование',
        'social': 'Социальные',
        'consistency': 'Регулярность',
        'organization': 'Организация',
        'transport': 'Транспорт',
        'entertainment': 'Развлечения',
        'mastery': 'Мастерство'
    };
    return titles[category] || category;
}

function getMissionIcon(missionId) {
    const icons = {
        1: 'utensils',
        2: 'bullseye',
        3: 'piggy-bank',
        4: 'chart-line',
        5: 'trophy',
        6: 'chart-pie',
        7: 'chart-bar',
        8: 'money-bill-wave',
        9: 'calendar-check',
        10: 'users',
        11: 'calendar-day',
        12: 'tags',
        13: 'bus',
        14: 'gamepad',
        15: 'crown'
    };
    return icons[missionId] || 'star';
}

function getDifficultyText(difficulty) {
    const texts = {
        'easy': 'Легко',
        'medium': 'Средне',
        'hard': 'Сложно'
    };
    return texts[difficulty] || difficulty;
}

function completeMission(missionId) {
    const mission = appMissions.find(m => m.id === missionId);
    if (!mission) return;
    
    const userData = {
        expenses: expenses,
        goals: goals,
        fincoins: fincoins,
        completedMissions: missions.filter(m => m.completed).map(m => m.id)
    };
    
    if (mission.condition(userData)) {
        addFincoins(mission.reward);
        
        // Отмечаем миссию как выполненную
        if (!missions.find(m => m.id === missionId)) {
            missions.push({
                id: missionId,
                completed: true,
                completedAt: new Date().toISOString()
            });
        }
        
        saveUserData();
        showNotification(`Миссия "${mission.title}" выполнена! Получено ${mission.reward} FinCoins`, 'success');
        updateMissionsProgress();
    } else {
        showNotification('Миссия еще не выполнена. Продолжайте в том же духе!', 'warning');
    }
}

function updateMissionsProgress() {
    setTimeout(() => {
        renderMissions();
    }, 100);
}

function buyPremiumSubscription() {
    if (fincoins >= 1500) {
        fincoins -= 1500;
        purchasedItems.push('premium_subscription');
        saveUserData();
        updateFincoinsBalance();
        showNotification('Премиум подписка активирована! Теперь вам доступны все премиум-функции.', 'success');
    } else {
        showNotification('Недостаточно FinCoins для покупки премиум подписки. Вам нужно еще ' + (1500 - fincoins) + ' FinCoins.', 'error');
    }
}

function buyItem(item, price) {
    if (fincoins >= price) {
        fincoins -= price;
        purchasedItems.push(item);
        saveUserData();
        updateFincoinsBalance();
        showNotification('Покупка успешно совершена!', 'success');
    } else {
        showNotification('Недостаточно FinCoins для покупки. Вам нужно еще ' + (price - fincoins) + ' FinCoins.', 'error');
    }
}

// ========== ФУНКЦИИ ДЛЯ ЧАТА ==========

function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    
    if (!chatInput || !chatMessages) return;
    
    const message = chatInput.value.trim();
    if (!message) return;
    
    const userMessage = document.createElement('div');
    userMessage.className = 'message message-user';
    userMessage.innerHTML = `
        <div class="message-content">${message}</div>
    `;
    chatMessages.appendChild(userMessage);
    
    chatInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'message message-ai';
    typingIndicator.innerHTML = `
        <div class="message-content">
            <i class="fas fa-ellipsis-h"></i>
        </div>
    `;
    chatMessages.appendChild(typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    setTimeout(() => {
        chatMessages.removeChild(typingIndicator);
        
        const aiResponse = getAIResponse(message);
        const aiMessage = document.createElement('div');
        aiMessage.className = 'message message-ai';
        aiMessage.innerHTML = `
            <div class="message-content">${aiResponse}</div>
        `;
        chatMessages.appendChild(aiMessage);
        
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 2000);
}

function getAIResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Базовые приветствия
    if (lowerMessage.includes('привет') || lowerMessage.includes('здравствуй') || lowerMessage.includes('салем') || lowerMessage.includes('hello')) {
        return "Привет! Я ваш AI-помощник по финансам. Чем могу помочь?";
    }
    
    // Вопросы о расходах
    if (lowerMessage.includes('расход') || lowerMessage.includes('трат') || lowerMessage.includes('шығын')) {
        return "Чтобы добавить расход, перейдите в раздел 'Аналитика' и заполните форму внизу страницы. Не забудьте выбрать категорию расхода!";
    }
    
    // Вопросы о целях
    if (lowerMessage.includes('цел') || lowerMessage.includes('накоп') || lowerMessage.includes('мақсат')) {
        return "Финансовые цели помогают планировать будущее. Вы можете добавить цель на главной странице, нажав кнопку 'Добавить' в разделе 'Мои цели'.";
    }
    
    // Советы и рекомендации
    if (lowerMessage.includes('совет') || lowerMessage.includes('рекомендац') || lowerMessage.includes('кеңес')) {
        return getFinancialAdvice();
    }
    
    // Бюджет и планирование
    if (lowerMessage.includes('бюджет') || lowerMessage.includes('планирован') || lowerMessage.includes('бюджет')) {
        return getBudgetAdvice();
    }
    
    // Экономия
    if (lowerMessage.includes('экономи') || lowerMessage.includes('сэконом') || lowerMessage.includes('үнемдеу')) {
        return getSavingAdvice();
    }
    
    // Инвестиции
    if (lowerMessage.includes('инвест') || lowerMessage.includes('вложен') || lowerMessage.includes('инвестиция')) {
        return getInvestmentAdvice();
    }
    
    // Кредиты и долги
    if (lowerMessage.includes('кредит') || lowerMessage.includes('долг') || lowerMessage.includes('несие')) {
        return getDebtAdvice();
    }
    
    // Накопления
    if (lowerMessage.includes('сбережен') || lowerMessage.includes('копил') || lowerMessage.includes('жинақтау')) {
        return getSavingsAdvice();
    }
    
    // Финансовая грамотность
    if (lowerMessage.includes('грамотност') || lowerMessage.includes('финансов') || lowerMessage.includes('сауаттылық')) {
        return getFinancialLiteracyAdvice();
    }
    
    // Пенсия и будущее
    if (lowerMessage.includes('пенси') || lowerMessage.includes('будущ') || lowerMessage.includes('зейнет')) {
        return getRetirementAdvice();
    }
    
    // Миссии и геймификация
    if (lowerMessage.includes('мисси') || lowerMessage.includes('задан') || lowerMessage.includes('миссия')) {
        return "Миссии помогут вам развивать хорошие финансовые привычки! Перейдите в раздел 'Геймификация', чтобы увидеть доступные миссии и заработать FinCoins.";
    }
    
    const defaultResponses = [
        "Интересный вопрос! Я специализируюсь на финансовых темах. Могу помочь с анализом расходов, планированием бюджета или дать советы по экономии.",
        "Как AI-помощник по финансам, я могу помочь вам с управлением расходами, установкой целей и финансовым планированием. Что конкретно вас интересует?",
        "Для более точного ответа уточните ваш вопрос. Я могу помочь с финансовым планированием, анализом расходов или дать советы по экономии денег.",
        "Финансовая грамотность - ключ к успеху! Рекомендую регулярно отслеживать расходы и ставить реалистичные финансовые цели.",
        "Помните, что маленькие регулярные накопления часто эффективнее редких крупных сумм. Начните с небольших целей и постепенно увеличивайте их!"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// Новые функции для расширенных ответов AI
function getFinancialAdvice() {
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const foodExpenses = expenses
        .filter(expense => expense.category === 'Еда')
        .reduce((sum, expense) => sum + expense.amount, 0);
    
    const adviceList = [
        "Попробуйте правило 50/30/20: 50% доходов на necessities, 30% на wants, 20% на savings и инвестиции.",
        "Создайте финансовую подушку безопасности - 3-6 месячных расходов на непредвиденные случаи.",
        "Автоматизируйте накопления - настройте автоматические переводы на сберегательный счет.",
        "Перед крупной покупкой используйте 'правило 24 часов' - это поможет избежать импульсных трат.",
        "Регулярно пересматривайте подписки и регулярные платежи - отмените неиспользуемые сервисы.",
        "Используйте кэшбэк-сервисы и программы лояльности для возврата части потраченных средств.",
        "Планируйте питание на неделю вперед и покупайте продукты по списку - это снизит расходы на еду.",
        "Установите финансовые цели на разные сроки: краткосрочные (1-3 месяца), среднесрочные (1-2 года) и долгосрочные (5+ лет).",
        "Ведите ежедневный учет расходов - это поможет выявить незаметные, но регулярные траты.",
        "Используйте технику 'нужное vs желанное' перед каждой покупкой для принятия взвешенных решений."
    ];
    
    if (foodExpenses > totalExpenses * 0.4) {
        adviceList.push("Заметил, что вы много тратите на еду. Попробуйте готовить дома чаще и планировать меню на неделю - это может значительно сократить расходы.");
    }
    
    if (goals.length === 0) {
        adviceList.push("Рекомендую установить первую финансовую цель. Даже небольшая цель мотивирует на регулярные накопления!");
    }
    
    return adviceList[Math.floor(Math.random() * adviceList.length)];
}

function getBudgetAdvice() {
    return `Для эффективного планирования бюджета рекомендую:

1. 📊 ОТСЛЕЖИВАЙТЕ ВСЕ РАСХОДЫ
• Записывайте каждую трату, даже мелкую
• Используйте категории для анализа
• Регулярно проверяйте статистику

2. 🎯 УСТАНОВИТЕ ЛИМИТЫ ПО КАТЕГОРИЯМ
• Определите разумные лимиты для каждой категории
• Корректируйте их по мере необходимости
• Используйте правило 50/30/20 как ориентир

3. 📈 АНАЛИЗИРУЙТЕ И КОРРЕКТИРУЙТЕ
• Еженедельно проверяйте прогресс
• Выявляйте проблемные зоны
• Адаптируйте бюджет под изменения

4. 💡 ИСПОЛЬЗУЙТЕ ТЕХНОЛОГИИ
• Автоматизируйте учет расходов
• Настройте уведомления о приближении к лимитам
• Используйте мобильные приложения для контроля`;
}

function getSavingAdvice() {
    return `Эффективные способы экономии:

🍽️ НА ПИТАНИИ:
• Планируйте меню на неделю
• Покупайте продукты по списку
• Готовьте дома вместо кафе
• Покупайте сезонные продукты
• Используйте скидки и акции разумно

🚗 НА ТРАНСПОРТЕ:
• Используйте общественный транспорт
• Объединяйте поездки
• Рассмотрите каршеринг вместо такси
• Регулярно обслуживайте автомобиль

🏠 НА КОММУНАЛЬНЫХ УСЛУГАХ:
• Установите энергосберегающие приборы
• Выключайте свет и электроприборы
• Оптимизируйте использование воды
• Утеплите окна и двери

🎮 НА РАЗВЛЕЧЕНИЯХ:
• Ищите бесплатные мероприятия
• Используйте студенческие скидки
• Планируйте развлечения заранее
• Отдавайте предпочтение активному отдыху`;
}

function getInvestmentAdvice() {
    return `Основы инвестирования для начинающих:

1. 📚 ОБРАЗОВАНИЕ ПРЕЖДЕ ВСЕГО
• Изучите базовые понятия: акции, облигации, ETF
• Понимайте риски и доходность
• Начните с консервативных инструментов

2. 💰 НАЧНИТЕ С МАЛОГО
• Не вкладывайте последние деньги
• Начните с суммы, которую не страшно потерять
• Диверсифицируйте инвестиции

3. ⏰ ДОЛГОСРОЧНЫЙ ПОДХОД
• Инвестируйте регулярно
• Не поддавайтесь панике при колебаниях рынка
• Реинвестируйте доходы

4. 🛡️ УПРАВЛЕНИЕ РИСКАМИ
• Диверсификация - ключ к успеху
• Соотносите риск с временным горизонтом
• Имейте финансовую подушку безопасности

5. 🔄 РЕГУЛЯРНЫЙ АНАЛИЗ
• Пересматривайте портфель раз в квартал
• Адаптируйте стратегию под изменения
• Фиксируйте прибыль при необходимости`;
}

function getDebtAdvice() {
    return `Стратегии управления долгами:

1. 📋 СОСТАВЬТЕ ПОЛНЫЙ СПИСОК ДОЛГОВ
• Запишите все кредиты и займы
• Укажите суммы, проценты и сроки
• Определите ежемесячные платежи

2. 🎯 ВЫБЕРИТЕ СТРАТЕГИЮ ПОГАШЕНИЯ
• Метод снежного кома: начинайте с мелких долгов
• Метод лавины: сначала высокопроцентные долги
• Выберите то, что мотивирует вас больше

3. 💸 УВЕЛИЧЬТЕ ПЛАТЕЖИ
• Направляйте дополнительные доходы на погашение
• Сократите расходы для увеличения платежей
• Рассмотрите рефинансирование под меньший процент

4. 🚫 ИЗБЕГАЙТЕ НОВЫХ ДОЛГОВ
• Откажитесь от импульсных покупок
• Создайте бюджет и придерживайтесь его
• Стройте финансовую подушку безопасности

5. 📞 ОБРАЩАЙТЕСЬ ЗА ПОМОЩЬЮ
• Консультируйтесь с финансовыми советниками
• Рассмотрите кредитные консультации
• Не стесняйтесь просить о реструктуризации`;
}

function getSavingsAdvice() {
    return `Эффективные стратегии накоплений:

1. 🎯 ПОСТАВЬТЕ КОНКРЕТНЫЕ ЦЕЛИ
• Определите, на что копите
• Установите четкие сроки
• Разбейте большие цели на этапы

2. 💰 АВТОМАТИЗИРУЙТЕ НАКОПЛЕНИЯ
• Настройте автоматические переводы
• Используйте правило 'сначала заплати себе'
• Откладывайте сразу после получения дохода

3. 📊 ОПТИМИЗИРУЙТЕ РАСХОДЫ
• Проанализируйте текущие траты
• Найдите возможности для сокращения
• Направляйте сэкономленные средства на накопления

4. 🏦 ВЫБИРАЙТЕ ПРАВИЛЬНЫЕ ИНСТРУМЕНТЫ
• Накопительные счета для краткосрочных целей
• Депозиты для среднесрочных целей
• Инвестиции для долгосрочных целей

5. 📈 РЕГУЛЯРНО ПЕРЕСМАТРИВАЙТЕ
• Корректируйте цели по мере необходимости
• Увеличивайте суммы накоплений при росте доходов
• Празднуйте достижение промежуточных целей`;
}

function getFinancialLiteracyAdvice() {
    return `Путь к финансовой грамотности:

1. 📖 ОСНОВНЫЕ ПОНЯТИЯ
• Изучите базовые финансовые термины
• Понимайте разницу между активами и пассивами
• Разберитесь в понятиях инфляции и процентов

2. 💼 ЛИЧНЫЙ БЮДЖЕТ
• Научитесь составлять реалистичный бюджет
• Освойте методы учета расходов
• Практикуйтесь в планировании на разные периоды

3. 🏦 БАНКОВСКИЕ ПРОДУКТЫ
• Изучите виды банковских счетов
• Разберитесь в кредитных продуктах
• Понимайте условия депозитов и инвестиций

4. 📊 НАЛОГИ И ОТЧЕТНОСТЬ
• Узнайте о своих налоговых обязательствах
• Изучите налоговые вычеты и льготы
• Научитесь заполнять базовые отчеты

5. 🔄 ПОСТОЯННОЕ ОБУЧЕНИЕ
• Читайте финансовую литературу
• Посещайте семинары и курсы
• Следите за экономическими новостями

6. 🤝 ПРАКТИКА И ОПЫТ
• Начинайте с малого
• Учитесь на своих ошибках
• Консультируйтесь с профессионалами`;
}

function getRetirementAdvice() {
    return `Планирование пенсии и будущего:

1. ⏰ НАЧНИТЕ РАНЬШЕ
• Чем раньше начнете, тем меньше нужно откладывать
• Используйте сложный процент в свою пользу
• Даже небольшие суммы имеют значение

2. 💰 ОПРЕДЕЛИТЕ ЦЕЛЕВУЮ СУММУ
• Рассчитайте ожидаемые расходы в пенсии
• Учтите инфляцию и рост стоимости жизни
• Планируйте с запасом на непредвиденные расходы

3. 🏦 ВЫБЕРИТЕ ПРАВИЛЬНЫЕ ИНСТРУМЕНТЫ
• Государственные пенсионные программы
• Частные пенсионные фонды
• Долгосрочные инвестиционные счета
• Недвижимость и другие активы

4. 📈 ДИВЕРСИФИЦИРУЙТЕ НАКОПЛЕНИЯ
• Не храните все яйца в одной корзине
• Сочетайте консервативные и рискованные инструменты
• Адаптируйте стратегию с возрастом

5. 🔄 РЕГУЛЯРНО ПЕРЕСМАТРИВАЙТЕ ПЛАН
• Корректируйте цели каждые 5 лет
• Учитывайте изменения в жизни и доходах
• Консультируйтесь с финансовыми советниками

6. 🏥 УЧТИТЕ ЗДРАВООХРАНЕНИЕ
• Планируйте расходы на медицинское обслуживание
• Рассмотрите страховые программы
• Создайте резерв на непредвиденные медицинские расходы`;
}

// ========== ФУНКЦИИ ДЛЯ НАСТРОЕК ==========

function showProfileSection(section) {
    document.getElementById('personalSection').style.display = 'none';
    document.getElementById('securitySection').style.display = 'none';
    document.getElementById(section + 'Section').style.display = 'block';
}

function saveProfile() {
    const name = document.getElementById('profileNameInput').value;
    const lastName = document.getElementById('profileLastNameInput').value;
    const email = document.getElementById('profileEmailInput').value;
    
    if (!name || !email) {
        showNotification('Пожалуйста, заполните все обязательные поля', 'error');
        return;
    }
    
    if (!currentUser) return;
    
    currentUser.name = name;
    currentUser.profile.lastName = lastName;
    currentUser.email = email;
    
    const users = JSON.parse(localStorage.getItem('financemind_users') || '[]');
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
        users[userIndex] = currentUser;
        localStorage.setItem('financemind_users', JSON.stringify(users));
    }
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    updateUserInterface();
    showNotification('Профиль успешно сохранен!', 'success');
}

function changePassword() {
    const newPassword = prompt('Введите новый пароль (минимум 6 символов):');
    if (newPassword) {
        if (newPassword.length < 6) {
            showNotification('Пароль должен содержать минимум 6 символов', 'error');
            return;
        }
        
        if (!currentUser) return;
        
        currentUser.password = newPassword;
        
        const users = JSON.parse(localStorage.getItem('financemind_users') || '[]');
        const userIndex = users.findIndex(u => u.id === currentUser.id);
        if (userIndex !== -1) {
            users[userIndex] = currentUser;
            localStorage.setItem('financemind_users', JSON.stringify(users));
        }
        
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        showNotification('Пароль успешно изменен!', 'success');
    }
}

function changeLanguage(lang) {
    currentLanguage = lang;
    
    // Обновляем активную кнопку
    document.querySelectorAll('.language-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    event.target.classList.add('active');
    
    // Сохраняем язык
    localStorage.setItem('language', lang);
    
    // Применяем переводы
    applyTranslations(lang);
    
    const langNames = {
        'ru': 'русский',
        'en': 'английский',
        'kz': 'казахский'
    };
    
    showNotification(`Язык изменен на ${langNames[lang]}`, 'success');
}

// Функция применения переводов
function applyTranslations(lang) {
    const translation = translations[lang];
    
    if (!translation) return;
    
    console.log('Applying translations for language:', lang);
    
    // Обновляем все элементы с id из переводов
    Object.keys(translation).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            if (element.tagName === 'INPUT' && element.placeholder !== undefined) {
                // Для полей ввода обновляем placeholder
                element.placeholder = translation[key];
            } else if (element.tagName === 'BUTTON' || element.tagName === 'SPAN' || element.tagName === 'DIV' || element.tagName === 'H3' || element.tagName === 'P' || element.tagName === 'LABEL') {
                // Для текстовых элементов обновляем содержимое
                element.textContent = translation[key];
            } else {
                // Для других элементов
                element.textContent = translation[key];
            }
        }
    });
    
    // Обновляем заголовок страницы
    const titles = {
        'ru': 'FinanceMind — Умный финансовый помощник',
        'en': 'FinanceMind — Smart Finance Assistant',
        'kz': 'FinanceMind — Ақылды қаржы көмекшісі'
    };
    document.title = titles[lang] || titles['ru'];
    
    // Обновляем навигацию
    updateNavigationText(lang);
}

// Функция для обновления текста в навигации
function updateNavigationText(lang) {
    const navItems = document.querySelectorAll('.nav-item');
    const translation = translations[lang];
    
    navItems.forEach(item => {
        const span = item.querySelector('span');
        if (span) {
            const page = item.getAttribute('onclick');
            if (page) {
                if (page.includes('dashboard') && span.id === 'homeNavText') {
                    span.textContent = translation.homeNavText;
                } else if (page.includes('analytics') && span.id === 'analyticsNavText') {
                    span.textContent = translation.analyticsNavText;
                } else if (page.includes('missions') && span.id === 'gamificationNavText') {
                    span.textContent = translation.gamificationNavText;
                } else if (page.includes('chat') && span.id === 'aiAssistantNavText') {
                    span.textContent = translation.aiAssistantNavText;
                }
            }
        }
    });
}

// Функция инициализации языка при загрузке
function initLanguage() {
    const savedLang = localStorage.getItem('language') || 'ru';
    console.log('Initializing language:', savedLang);
    
    // Устанавливаем активную кнопку языка
    document.querySelectorAll('.language-btn').forEach(btn => {
        btn.classList.remove('active');
        if ((savedLang === 'ru' && btn.textContent.includes('Русский')) || 
            (savedLang === 'en' && btn.textContent.includes('English')) ||
            (savedLang === 'kz' && btn.textContent.includes('Қазақша'))) {
            btn.classList.add('active');
        }
    });
    
    applyTranslations(savedLang);
}

function changeTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    if (currentUser) {
        currentUser.settings.theme = theme;
        saveUserData();
    }
    
    showNotification(`Тема изменена на ${theme === 'light' ? 'светлую' : 'тёмную'}`, 'success');
}

function logout() {
    if (confirm('Вы уверены, что хотите выйти?')) {
        logoutAndReset();
    }
}

// ========== АДМИН ПАНЕЛЬ ==========

function showAdminPanel() {
    if (currentUser && currentUser.role === 'admin') {
        showPage('adminPanel');
    } else {
        showNotification('Доступ запрещен. Только для администраторов.', 'error');
    }
}

function loadAdminData() {
    if (!currentUser || currentUser.role !== 'admin') return;
    
    const users = JSON.parse(localStorage.getItem('financemind_users') || '[]');
    const regularUsers = users.filter(u => u.role !== 'admin');
    
    // Общая статистика
    document.getElementById('totalUsers').textContent = regularUsers.length;
    document.getElementById('totalMissions').textContent = appMissions.length;
    
    let totalCompletedMissions = 0;
    let totalFincoins = 0;
    
    regularUsers.forEach(user => {
        const userData = JSON.parse(localStorage.getItem(`userData_${user.id}`) || '{}');
        if (userData.completedMissions) {
            totalCompletedMissions += userData.completedMissions.length;
        }
        totalFincoins += userData.fincoins || 0;
    });
    
    document.getElementById('completedMissions').textContent = totalCompletedMissions;
    document.getElementById('totalFincoins').textContent = totalFincoins.toLocaleString();
    
    // Управление миссиями
    renderMissionManagement();
    
    // Прогресс пользователей
    renderUserProgress(regularUsers);
}

function renderMissionManagement() {
    const missionManagement = document.getElementById('missionManagement');
    if (!missionManagement) return;
    
    missionManagement.innerHTML = appMissions.map(mission => {
        const userData = {
            expenses: expenses,
            goals: goals,
            fincoins: fincoins,
            completedMissions: missions.filter(m => m.completed).map(m => m.id)
        };
        
        const progress = mission.progress(userData);
        const completionRate = calculateMissionCompletionRate(mission.id);
        
        return `
            <div class="admin-mission-item">
                <div class="admin-mission-header">
                    <div class="admin-mission-title">${mission.title}</div>
                    <div class="admin-mission-reward">${mission.reward} FinCoins</div>
                </div>
                <div class="admin-mission-progress">
                    <div class="admin-progress-bar">
                        <div class="admin-progress-fill" style="width: ${progress}%"></div>
                    </div>
                    <div class="admin-progress-text">
                        Прогресс: ${Math.round(progress)}% | Выполнение: ${completionRate}%
                    </div>
                </div>
                <div class="mission-description">${mission.description}</div>
                <div class="mission-requirements">
                    <strong>Требования:</strong> ${mission.requirements.join(', ')}
                </div>
            </div>
        `;
    }).join('');
}

function calculateMissionCompletionRate(missionId) {
    const users = JSON.parse(localStorage.getItem('financemind_users') || '[]');
    const regularUsers = users.filter(u => u.role !== 'admin');
    
    let completedCount = 0;
    
    regularUsers.forEach(user => {
        const userData = JSON.parse(localStorage.getItem(`userData_${user.id}`) || '{}');
        if (userData.completedMissions && userData.completedMissions.includes(missionId)) {
            completedCount++;
        }
    });
    
    return regularUsers.length > 0 ? Math.round((completedCount / regularUsers.length) * 100) : 0;
}

function renderUserProgress(users) {
    const userProgress = document.getElementById('userProgress');
    if (!userProgress) return;
    
    userProgress.innerHTML = users.map(user => {
        const userData = JSON.parse(localStorage.getItem(`userData_${user.id}`) || '{}');
        const completedMissions = userData.completedMissions ? userData.completedMissions.length : 0;
        const totalExpenses = userData.expenses ? userData.expenses.reduce((sum, e) => sum + e.amount, 0) : 0;
        const goalsCount = userData.goals ? userData.goals.length : 0;
        
        return `
            <div class="admin-user-item">
                <div class="admin-user-header">
                    <div class="admin-user-name">${user.name}</div>
                    <div class="admin-user-email">${user.email}</div>
                </div>
                <div class="admin-user-stats">
                    <div class="admin-user-stat">
                        <div class="admin-user-stat-value">${completedMissions}</div>
                        <div class="admin-user-stat-label">Выполнено миссий</div>
                    </div>
                    <div class="admin-user-stat">
                        <div class="admin-user-stat-value">${userData.fincoins || 0}</div>
                        <div class="admin-user-stat-label">FinCoins</div>
                    </div>
                    <div class="admin-user-stat">
                        <div class="admin-user-stat-value">${goalsCount}</div>
                        <div class="admin-user-stat-label">Целей</div>
                    </div>
                </div>
                <div class="admin-user-stats">
                    <div class="admin-user-stat">
                        <div class="admin-user-stat-value">${userData.expenses ? userData.expenses.length : 0}</div>
                        <div class="admin-user-stat-label">Расходов</div>
                    </div>
                    <div class="admin-user-stat">
                        <div class="admin-user-stat-value">${formatAmount(totalExpenses)}</div>
                        <div class="admin-user-stat-label">Общие расходы</div>
                    </div>
                    <div class="admin-user-stat">
                        <div class="admin-user-stat-value">${new Date(user.createdAt).toLocaleDateString()}</div>
                        <div class="admin-user-stat-label">Дата регистрации</div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function exportAllData() {
    const users = JSON.parse(localStorage.getItem('financemind_users') || '[]');
    const regularUsers = users.filter(u => u.role !== 'admin');
    
    const adminData = {
        exportDate: new Date().toISOString(),
        totalUsers: regularUsers.length,
        totalMissions: appMissions.length,
        users: regularUsers.map(user => {
            const userData = JSON.parse(localStorage.getItem(`userData_${user.id}`) || '{}');
            return {
                name: user.name,
                email: user.email,
                registrationDate: user.createdAt,
                fincoins: userData.fincoins || 0,
                completedMissions: userData.completedMissions ? userData.completedMissions.length : 0,
                totalExpenses: userData.expenses ? userData.expenses.reduce((sum, e) => sum + e.amount, 0) : 0,
                goalsCount: userData.goals ? userData.goals.length : 0,
                expensesCount: userData.expenses ? userData.expenses.length : 0
            };
        }),
        missions: appMissions.map(mission => {
            return {
                id: mission.id,
                title: mission.title,
                description: mission.description,
                reward: mission.reward,
                difficulty: mission.difficulty,
                completionRate: calculateMissionCompletionRate(mission.id)
            };
        })
    };
    
    const dataStr = JSON.stringify(adminData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `financemind-admin-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Все данные администратора успешно экспортированы!', 'success');
}

// ========== ЭКСПОРТ И ИМПОРТ ДАННЫХ ==========

function exportData() {
    if (!currentUser) return;
    
    const userData = {
        user: {
            name: currentUser.name,
            email: currentUser.email,
            registrationDate: currentUser.createdAt
        },
        expenses: expenses,
        goals: goals,
        missions: missions,
        fincoins: fincoins,
        purchasedItems: purchasedItems,
        exportDate: new Date().toISOString(),
        statistics: {
            totalExpenses: expenses.reduce((sum, e) => sum + e.amount, 0),
            totalGoals: goals.length,
            completedGoals: goals.filter(g => g.completed).length,
            completedMissions: missions.filter(m => m.completed).length,
            averageExpense: expenses.length > 0 ? Math.round(expenses.reduce((sum, e) => sum + e.amount, 0) / expenses.length) : 0
        },
        monthlyReport: generateMonthlyReportText()
    };
    
    const dataStr = JSON.stringify(userData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `financemind-data-${currentUser.name}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Данные успешно экспортированы!', 'success');
}

function importData(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);
            
            if (confirm('Вы уверены, что хотите импортировать данные? Текущие данные будут перезаписаны.')) {
                if (importedData.expenses) expenses = importedData.expenses;
                if (importedData.goals) goals = importedData.goals;
                if (importedData.missions) missions = importedData.missions;
                if (importedData.fincoins) fincoins = importedData.fincoins;
                if (importedData.purchasedItems) purchasedItems = importedData.purchasedItems;
                
                saveUserData();
                updateDashboard();
                updateAnalytics();
                
                showNotification('Данные успешно импортированы!', 'success');
            }
        } catch (error) {
            showNotification('Ошибка при импорте данных. Проверьте файл.', 'error');
        }
    };
    reader.readAsText(file);
    event.target.value = '';
}

function shareReport() {
    const report = generateMonthlyReportText();
    
    if (navigator.share) {
        navigator.share({
            title: 'Мой финансовый отчет - FinanceMind',
            text: report,
            url: window.location.href
        })
        .then(() => showNotification('Отчет успешно опубликован!', 'success'))
        .catch(error => {
            console.log('Error sharing:', error);
            copyToClipboard(report);
        });
    } else {
        copyToClipboard(report);
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => showNotification('Отчет скопирован в буфер обмена!', 'success'))
        .catch(err => {
            console.error('Error copying text: ', err);
            showNotification('Не удалось скопировать отчет', 'error');
        });
}

// ========== ОТЧЕТЫ И АНАЛИТИКА ==========

function generateMonthlyReport() {
    if (!expenses || expenses.length === 0) {
        showNotification('Нет данных для генерации отчета', 'error');
        return;
    }
    
    const report = generateMonthlyReportText();
    showReportModal(report);
}

function generateMonthlyReportText() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    const monthlyExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getMonth() === currentMonth && 
               expenseDate.getFullYear() === currentYear;
    });
    
    if (monthlyExpenses.length === 0) {
        return "Нет расходов за текущий месяц для генерации отчета.";
    }
    
    const expensesByCategory = {};
    monthlyExpenses.forEach(expense => {
        if (!expensesByCategory[expense.category]) {
            expensesByCategory[expense.category] = 0;
        }
        expensesByCategory[expense.category] += expense.amount;
    });
    
    const totalExpenses = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const averageDaily = Math.round(totalExpenses / currentDate.getDate());
    
    let report = `📊 ФИНАНСОВЫЙ ОТЧЕТ ЗА ${currentDate.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' }).toUpperCase()}\n\n`;
    report += `💰 ОБЩАЯ СТАТИСТИКА:\n`;
    report += `• Общие расходы: ${formatAmount(totalExpenses)}\n`;
    report += `• Среднедневные расходы: ${formatAmount(averageDaily)}\n`;
    report += `• Количество транзакций: ${monthlyExpenses.length}\n`;
    report += `• Дней с расходами: ${new Set(monthlyExpenses.map(e => e.date)).size}\n\n`;
    
    report += `📈 РАСПРЕДЕЛЕНИЕ ПО КАТЕГОРИЯМ:\n`;
    
    const sortedCategories = Object.entries(expensesByCategory)
        .sort((a, b) => b[1] - a[1]);
    
    sortedCategories.forEach(([category, amount]) => {
        const percentage = ((amount / totalExpenses) * 100).toFixed(1);
        report += `• ${category}: ${formatAmount(amount)} (${percentage}%)\n`;
    });
    
    report += `\n📅 АНАЛИЗ ТРЕНДОВ:\n`;
    
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    
    const prevMonthExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getMonth() === prevMonth && 
               expenseDate.getFullYear() === prevYear;
    });
    
    const prevMonthTotal = prevMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    
    if (prevMonthTotal > 0) {
        const change = ((totalExpenses - prevMonthTotal) / prevMonthTotal * 100).toFixed(1);
        const trend = totalExpenses > prevMonthTotal ? 'рост' : 'снижение';
        report += `• По сравнению с прошлым месяцем: ${trend} на ${Math.abs(change)}%\n`;
    }
    
    // Анализ по дням недели
    const weekDays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    const expensesByWeekDay = {};
    weekDays.forEach(day => expensesByWeekDay[day] = 0);
    
    monthlyExpenses.forEach(expense => {
        const expenseDate = new Date(expense.date);
        const dayOfWeek = weekDays[expenseDate.getDay()];
        expensesByWeekDay[dayOfWeek] += expense.amount;
    });
    
    const maxDay = Object.entries(expensesByWeekDay).reduce((a, b) => a[1] > b[1] ? a : b);
    report += `• Самый затратный день: ${maxDay[0]} (${formatAmount(maxDay[1])})\n`;
    
    report += `\n🎯 РЕКОМЕНДАЦИИ:\n`;
    const largestCategory = sortedCategories[0];
    if (largestCategory) {
        report += `• Самые большие расходы в категории "${largestCategory[0]}" - рассмотрите возможность оптимизации\n`;
    }
    
    if (totalExpenses > 50000) {
        report += `• Общие расходы высокие - рекомендую проанализировать обязательные и необязательные траты\n`;
    }
    
    if (monthlyExpenses.length > 50) {
        report += `• Большое количество мелких транзакций - возможно, стоит объединять некоторые покупки\n`;
    }
    
    // Цели и прогресс
    if (goals.length > 0) {
        report += `\n🎯 ПРОГРЕСС ЦЕЛЕЙ:\n`;
        const activeGoals = goals.filter(goal => !goal.completed);
        activeGoals.slice(0, 3).forEach(goal => {
            const progress = Math.min(100, (goal.currentAmount / goal.targetAmount) * 100);
            report += `• ${goal.name}: ${Math.round(progress)}% (${formatAmount(goal.currentAmount)} / ${formatAmount(goal.targetAmount)})\n`;
        });
    }
    
    report += `\n---\nСгенерировано в FinanceMind • ${new Date().toLocaleDateString('ru-RU')}`;
    
    return report;
}

function showAdvancedAnalytics() {
    if (!expenses || expenses.length === 0) {
        showNotification('Нет данных для расширенной аналитики', 'error');
        return;
    }
    
    const currentDate = new Date();
    const last30Days = [];
    for (let i = 29; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        last30Days.push(date.toISOString().split('T')[0]);
    }
    
    const weekDays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    const expensesByWeekDay = {};
    weekDays.forEach(day => expensesByWeekDay[day] = 0);
    
    expenses.forEach(expense => {
        const expenseDate = new Date(expense.date);
        const dayOfWeek = weekDays[expenseDate.getDay()];
        expensesByWeekDay[dayOfWeek] += expense.amount;
    });
    
    let analyticsReport = `📈 РАСШИРЕННАЯ АНАЛИТИКА\n\n`;
    analyticsReport += `АНАЛИЗ ПО ДНЯМ НЕДЕЛИ:\n`;
    
    Object.entries(expensesByWeekDay)
        .sort((a, b) => b[1] - a[1])
        .forEach(([day, amount]) => {
            analyticsReport += `• ${day}: ${formatAmount(amount)}\n`;
        });
    
    const topExpenses = [...expenses]
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 5);
    
    analyticsReport += `\nТОП-5 САМЫХ КРУПНЫХ РАСХОДОВ:\n`;
    topExpenses.forEach((expense, index) => {
        analyticsReport += `${index + 1}. ${expense.category}: ${formatAmount(expense.amount)} (${formatDate(expense.date)})\n`;
        if (expense.description && expense.description !== 'Без описания') {
            analyticsReport += `   📝 ${expense.description}\n`;
        }
    });
    
    // Анализ по времени суток (предположительный)
    analyticsReport += `\n⏰ РЕКОМЕНДАЦИИ ПО ВРЕМЕНИ ПОКУПОК:\n`;
    analyticsReport += `• Старайтесь делать крупные покупки в начале недели\n`;
    analyticsReport += `• Планируйте продуктовые закупки на выходные\n`;
    analyticsReport += `• Избегайте импульсных покупок вечером\n`;
    analyticsReport += `• Крупные покупки планируйте на середину месяца\n`;
    
    // Тенденции
    analyticsReport += `\n📊 ФИНАНСОВЫЕ ТЕНДЕНЦИИ:\n`;
    const monthlyTrend = calculateMonthlyTrend();
    analyticsReport += `• ${monthlyTrend}\n`;
    
    // Рекомендации по категориям
    analyticsReport += `\n💡 РЕКОМЕНДАЦИИ ПО КАТЕГОРИЯМ:\n`;
    const categoryRecommendations = getCategoryRecommendations();
    categoryRecommendations.forEach(rec => {
        analyticsReport += `• ${rec}\n`;
    });
    
    showReportModal(analyticsReport);
}

function calculateMonthlyTrend() {
    const currentMonthExpenses = getCurrentMonthExpenses(expenses);
    const lastMonthExpenses = getLastMonthExpenses(expenses);
    
    if (lastMonthExpenses === 0) return "Недостаточно данных для анализа трендов";
    
    const change = ((currentMonthExpenses - lastMonthExpenses) / lastMonthExpenses * 100);
    
    if (change > 20) return "⚠️ Высокий рост расходов - рекомендуется пересмотреть бюджет";
    if (change > 10) return "📈 Умеренный рост расходов - следите за тенденцией";
    if (change > -10) return "✅ Стабильная ситуация - расходы под контролем";
    if (change > -20) return "📉 Умеренное снижение расходов - хороший результат";
    return "🎉 Значительное снижение расходов - отличная работа!";
}

function getCategoryRecommendations() {
    const expensesByCategory = {};
    expenses.forEach(expense => {
        if (!expensesByCategory[expense.category]) {
            expensesByCategory[expense.category] = 0;
        }
        expensesByCategory[expense.category] += expense.amount;
    });
    
    const totalExpenses = Object.values(expensesByCategory).reduce((a, b) => a + b, 0);
    const recommendations = [];
    
    Object.entries(expensesByCategory).forEach(([category, amount]) => {
        const percentage = (amount / totalExpenses) * 100;
        
        if (percentage > 40) {
            recommendations.push(`${category}: Высокая доля расходов (${percentage.toFixed(1)}%) - рассмотрите оптимизацию`);
        } else if (percentage < 10) {
            recommendations.push(`${category}: Низкая доля расходов (${percentage.toFixed(1)}%) - хороший баланс`);
        }
    });
    
    if (recommendations.length === 0) {
        recommendations.push("Сбалансированное распределение расходов по категориям");
    }
    
    return recommendations.slice(0, 3);
}

function showReportModal(report) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;
    
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 500px; width: 90%; max-height: 80vh; overflow-y: auto;">
            <div class="modal-header">
                <h3 class="modal-title">Финансовый отчет</h3>
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <pre style="
                white-space: pre-wrap;
                font-family: inherit;
                background: var(--light-bg);
                padding: 20px;
                border-radius: var(--radius-sm);
                font-size: 14px;
                line-height: 1.5;
                margin: 0 0 20px 0;
            ">${report}</pre>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                <button onclick="downloadReport('${btoa(unescape(encodeURIComponent(report)))}')" 
                        class="btn btn-primary" style="flex: 1; min-width: 120px;">
                    <i class="fas fa-download"></i> Скачать
                </button>
                <button onclick="shareReport()" 
                        class="btn btn-outline" style="flex: 1; min-width: 120px;">
                    <i class="fas fa-share"></i> Поделиться
                </button>
                <button onclick="this.closest('.modal-overlay').remove()" 
                        class="btn btn-outline" style="flex: 1; min-width: 120px;">
                    Закрыть
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function downloadReport(reportData) {
    try {
        const reportText = decodeURIComponent(escape(atob(reportData)));
        const blob = new Blob([reportText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `financemind-report-${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showNotification('Отчет успешно скачан!', 'success');
    } catch (error) {
        showNotification('Ошибка при скачивании отчета', 'error');
    }
}

// ========== ДОПОЛНИТЕЛЬНЫЕ ФУНКЦИИ ==========

function forceSync() {
    saveUserData();
    showNotification('Данные успешно синхронизированы!', 'success');
}

function closeMissionModal() {
    document.getElementById('missionModal').style.display = 'none';
}

function completeMissionFromModal() {
    showNotification('Миссия выполнена из модального окна!', 'success');
    closeMissionModal();
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 
                          type === 'error' ? 'exclamation-circle' : 
                          type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    const container = document.getElementById('notificationContainer');
    if (container) {
        container.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('hiding');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// ========== ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ ==========

document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const savedUser = localStorage.getItem('currentUser');
    
    if (isLoggedIn === 'true' && savedUser) {
        currentUser = JSON.parse(savedUser);
        loadUserData();
        showAppInterface();
        setTimeout(() => {
            showPage('dashboard');
        }, 100);
    } else {
        const authPage = document.getElementById('authPage');
        if (authPage) {
            authPage.style.display = 'block';
        }
        showLoginForm();
    }
    
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.category-btn').forEach(b => {
                b.classList.remove('selected');
            });
            this.classList.add('selected');
            selectedCategory = this.getAttribute('data-category');
        });
    });
    
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('expenseDate');
    if (dateInput) {
        dateInput.value = today;
    }
    
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    if (currentUser) {
        updateCategoryButtons();
    }
    
    // Инициализация языка
    initLanguage();
    
    console.log('FinanceMind инициализирован');
});
