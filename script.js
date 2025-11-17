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
        // Основные
        appTitle: "FinanceMind — Умный финансовый помощник",
        appSubtitle: "Управляйте деньгами с умом, отслеживая расходы и копя с помощью AI-помощника",
        welcome: "Добро пожаловать!",
        
        // Аутентификация
        nameLabel: "Имя",
        namePlaceholder: "Ваше имя",
        emailLabel: "Электронная почта",
        emailPlaceholder: "user@example.com",
        passwordLabel: "Пароль",
        passwordPlaceholder: "••••••••",
        roleLabel: "Роль",
        userRole: "Пользователь",
        adminRole: "Администратор",
        registerButton: "Зарегистрироваться",
        loginButton: "Войти",
        haveAccount: "Уже есть аккаунт?",
        noAccount: "Нет аккаунта?",
        loginLink: "Войти",
        registerLink: "Зарегистрироваться",
        loginProblems: "Проблемы с входом?",
        resetData: "Сбросить все данные",
        
        // Навигация
        homeNav: "Главная",
        analyticsNav: "Аналитика",
        missionsNav: "Геймификация",
        chatNav: "ИИ Ассистент",
        
        // Дашборд
        aiAdviceTitle: "AI Совет дня",
        aiAdviceDefault: "Начните добавлять расходы, чтобы получить персонализированные советы по управлению финансами!",
        myGoals: "Мои цели",
        addButton: "Добавить",
        noGoals: "У вас пока нет финансовых целей",
        
        // Инструкция
        instructionsTitle: "📚 Инструкция по использованию",
        instruction1Title: "Главный экран",
        instruction1Desc: "Показывает ваши расходы, средние траты и расходы за месяц. Есть «Совет дня». Можно создавать и отслеживать цели.",
        instruction2Title: "Аналитика",
        instruction2Desc: "График показывает изменения расходов по дням. Диаграмма показывает, на что уходят деньги. Можно просматривать отчёт за месяц.",
        instruction3Title: "Цели",
        instruction3Desc: "Создавайте финансовые цели. Указывайте сумму. Следите за прогрессом накопления.",
        instruction4Title: "Миссии",
        instruction4Desc: "Выполняйте задания. Получайте монеты FinCoin. Развивайте полезные привычки.",
        instruction5Title: "Магазин",
        instruction5Desc: "Тратьте FinCoin на бонусы. Покупайте дополнительные функции и премиум.",
        instruction6Title: "ИИ-ассистент",
        instruction6Desc: "Отвечает на ваши вопросы. Помогает с приложением и финансами. Доступен всегда.",
        
        // Аналитика
        expenseTrend: "Динамика расходов",
        totalExpenses: "Общие расходы",
        byCategories: "По категориям",
        categoryDistribution: "Распределение по категориям",
        recentExpenses: "Последние расходы",
        addExpenseTitle: "Добавить новый расход",
        amountLabel: "Сумма",
        amountPlaceholder: "₸0",
        dateLabel: "Дата",
        categoryLabel: "Категория",
        commentLabel: "Комментарий",
        commentPlaceholder: "Например: Обед в кафе",
        addExpenseButton: "Добавить расход",
        noExpenses: "У вас пока нет расходов",
        noChartData: "Нет данных для отображения",
        addExpensesChart: "Добавьте расходы, чтобы увидеть график",
        monthlyReport: "Месячный отчет",
        advancedAnalytics: "Расширенная аналитика",
        shareReport: "Поделиться отчетом",
        reportsSection: "Отчеты и данные",
        
        // Категории
        foodCategory: "Еда",
        transportCategory: "Транспорт",
        studyCategory: "Учеба",
        entertainmentCategory: "Развлечения",
        otherCategory: "Другое",
        
        // Миссии
        yourFincoins: "Ваши FinCoins:",
        storeButton: "Магазин",
        earnButton: "Заработать",
        
        // Магазин
        premiumSubscription: "Премиум подписка",
        premiumTitle: "FinanceMind Premium",
        premiumBadge: "PREMIUM",
        premiumDescription: "Получите доступ ко всем премиум-функциям: расширенная аналитика, AI-коуч, эксклюзивные темы и многое другое",
        premiumFeatures: "Премиум функции",
        extendedAnalytics: "Расширенная аналитика",
        popular: "Популярное",
        extendedAnalyticsDesc: "Подробные отчеты и прогнозы расходов на 6 месяцев",
        aiCoachTitle: "Персональный AI-коуч",
        aiCoachDesc: "Индивидуальные финансовые рекомендации и стратегии",
        personalization: "Персонализация",
        exclusiveThemes: "Эксклюзивные темы",
        exclusiveThemesDesc: "5 уникальных цветовых схем для приложения",
        iconPack: "Набор иконок",
        iconPackDesc: "Стильные иконки для категорий расходов",
        activatePremium: "Активировать премиум",
        buyNow: "Купить сейчас",
        
        // Настройки
        accountManagement: "Управление аккаунтом",
        personalData: "Персональные данные",
        personalDataDesc: "Настройте вашу личную информацию",
        securitySettings: "Безопасность и вход",
        securitySettingsDesc: "Пароль и методы входа",
        systemSettings: "Системные настройки",
        language: "Язык",
        theme: "Тема",
        saveChanges: "Сохранить изменения",
        lastNameLabel: "Фамилия",
        password: "Пароль",
        lastChanged: "Последнее изменение: сегодня",
        changePassword: "Изменить пароль",
        loginMethods: "Методы входа",
        emailPassword: "Email и пароль",
        active: "Активно",
        russian: "Русский",
        english: "English",
        kazakh: "Қазақша",
        lightTheme: "Светлая",
        darkTheme: "Тёмная",
        logout: "Выйти из аккаунта",
        
        // Цели
        addGoalTitle: "Добавить новую цель",
        goalNameLabel: "Название цели",
        goalNamePlaceholder: "Например: Новый ноутбук",
        goalAmountLabel: "Сумма цели",
        goalAmountPlaceholder: "₸0",
        goalCurrentLabel: "Текущая сумма",
        goalCurrentPlaceholder: "₸0",
        goalDeadlineLabel: "Срок цели",
        addGoalButton: "Добавить цель",
        deleteGoalText: "Удалить",
        
        // Чат
        welcomeMessage: "Привет! Я ваш AI-помощник по финансам. Чем могу помочь? Я могу:\n\n• Проанализировать ваши расходы\n• Дать советы по экономии\n• Помочь с финансовым планированием\n• Ответить на вопросы о финансах",
        chatPlaceholder: "Напишите ваш вопрос...",
        
        // Админ панель
        adminPanel: "Панель администратора",
        adminSubtitle: "Управление миссиями и отслеживание прогресса пользователей",
        totalUsers: "Всего пользователей",
        totalMissions: "Всего миссий",
        completedMissions: "Выполнено миссий",
        totalFincoins: "Выдано FinCoins",
        missionManagement: "Управление миссиями",
        userProgress: "Прогресс пользователей",
        exportAllData: "Экспорт всех данных"
    },
    en: {
        // Basic
        appTitle: "FinanceMind — Smart Finance Assistant",
        appSubtitle: "Manage money wisely by tracking expenses and saving with AI assistant",
        welcome: "Welcome!",
        
        // Authentication
        nameLabel: "Name",
        namePlaceholder: "Your name",
        emailLabel: "Email",
        emailPlaceholder: "user@example.com",
        passwordLabel: "Password",
        passwordPlaceholder: "••••••••",
        roleLabel: "Role",
        userRole: "User",
        adminRole: "Administrator",
        registerButton: "Register",
        loginButton: "Login",
        haveAccount: "Already have an account?",
        noAccount: "No account?",
        loginLink: "Login",
        registerLink: "Register",
        loginProblems: "Login problems?",
        resetData: "Reset all data",
        
        // Navigation
        homeNav: "Home",
        analyticsNav: "Analytics",
        missionsNav: "Missions",
        chatNav: "AI Assistant",
        
        // Dashboard
        aiAdviceTitle: "AI Advice of the Day",
        aiAdviceDefault: "Start adding expenses to get personalized financial management advice!",
        myGoals: "My Goals",
        addButton: "Add",
        noGoals: "You don't have financial goals yet",
        
        // Instructions
        instructionsTitle: "📚 User Guide",
        instruction1Title: "Main Screen",
        instruction1Desc: "Shows your expenses, average spending and monthly expenses. Has 'Advice of the Day'. You can create and track goals.",
        instruction2Title: "Analytics",
        instruction2Desc: "Chart shows expense changes by day. Diagram shows where money goes. You can view monthly report.",
        instruction3Title: "Goals",
        instruction3Desc: "Create financial goals. Specify amount. Track saving progress.",
        instruction4Title: "Missions",
        instruction4Desc: "Complete tasks. Earn FinCoins. Develop useful habits.",
        instruction5Title: "Store",
        instruction5Desc: "Spend FinCoins on bonuses. Buy additional features and premium.",
        instruction6Title: "AI Assistant",
        instruction6Desc: "Answers your questions. Helps with app and finances. Always available.",
        
        // Analytics
        expenseTrend: "Expense Trends",
        totalExpenses: "Total Expenses",
        byCategories: "By Categories",
        categoryDistribution: "Category Distribution",
        recentExpenses: "Recent Expenses",
        addExpenseTitle: "Add New Expense",
        amountLabel: "Amount",
        amountPlaceholder: "₸0",
        dateLabel: "Date",
        categoryLabel: "Category",
        commentLabel: "Comment",
        commentPlaceholder: "For example: Lunch at cafe",
        addExpenseButton: "Add Expense",
        noExpenses: "You don't have expenses yet",
        noChartData: "No data to display",
        addExpensesChart: "Add expenses to see the chart",
        monthlyReport: "Monthly Report",
        advancedAnalytics: "Advanced Analytics",
        shareReport: "Share Report",
        reportsSection: "Reports & Data",
        
        // Categories
        foodCategory: "Food",
        transportCategory: "Transport",
        studyCategory: "Study",
        entertainmentCategory: "Entertainment",
        otherCategory: "Other",
        
        // Missions
        yourFincoins: "Your FinCoins:",
        storeButton: "Store",
        earnButton: "Earn",
        
        // Store
        premiumSubscription: "Premium Subscription",
        premiumTitle: "FinanceMind Premium",
        premiumBadge: "PREMIUM",
        premiumDescription: "Get access to all premium features: extended analytics, AI coach, exclusive themes and more",
        premiumFeatures: "Premium Features",
        extendedAnalytics: "Extended Analytics",
        popular: "Popular",
        extendedAnalyticsDesc: "Detailed reports and expense forecasts for 6 months",
        aiCoachTitle: "Personal AI Coach",
        aiCoachDesc: "Individual financial recommendations and strategies",
        personalization: "Personalization",
        exclusiveThemes: "Exclusive Themes",
        exclusiveThemesDesc: "5 unique color schemes for the app",
        iconPack: "Icon Pack",
        iconPackDesc: "Stylish icons for expense categories",
        activatePremium: "Activate Premium",
        buyNow: "Buy Now",
        
        // Settings
        accountManagement: "Account Management",
        personalData: "Personal Data",
        personalDataDesc: "Configure your personal information",
        securitySettings: "Security & Login",
        securitySettingsDesc: "Password and login methods",
        systemSettings: "System Settings",
        language: "Language",
        theme: "Theme",
        saveChanges: "Save Changes",
        lastNameLabel: "Last Name",
        password: "Password",
        lastChanged: "Last changed: today",
        changePassword: "Change Password",
        loginMethods: "Login Methods",
        emailPassword: "Email and password",
        active: "Active",
        russian: "Russian",
        english: "English",
        kazakh: "Kazakh",
        lightTheme: "Light",
        darkTheme: "Dark",
        logout: "Logout",
        
        // Goals
        addGoalTitle: "Add New Goal",
        goalNameLabel: "Goal Name",
        goalNamePlaceholder: "For example: New laptop",
        goalAmountLabel: "Goal Amount",
        goalAmountPlaceholder: "₸0",
        goalCurrentLabel: "Current Amount",
        goalCurrentPlaceholder: "₸0",
        goalDeadlineLabel: "Goal Deadline",
        addGoalButton: "Add Goal",
        deleteGoalText: "Delete",
        
        // Chat
        welcomeMessage: "Hello! I'm your AI financial assistant. How can I help you? I can:\n\n• Analyze your expenses\n• Give saving advice\n• Help with financial planning\n• Answer finance questions",
        chatPlaceholder: "Write your question...",
        
        // Admin Panel
        adminPanel: "Admin Panel",
        adminSubtitle: "Mission management and user progress tracking",
        totalUsers: "Total Users",
        totalMissions: "Total Missions",
        completedMissions: "Completed Missions",
        totalFincoins: "Total FinCoins Issued",
        missionManagement: "Mission Management",
        userProgress: "User Progress",
        exportAllData: "Export All Data"
    },
    kz: {
        // Негізгі
        appTitle: "FinanceMind — Ақылды қаржы көмекшісі",
        appSubtitle: "Шығындарды бақылау және AI көмекшісімен үнемдеу арқылы ақшаны дана басқарыңыз",
        welcome: "Қош келдіңіз!",
        
        // Аутентификация
        nameLabel: "Аты",
        namePlaceholder: "Сіздің атыңыз",
        emailLabel: "Электрондық пошта",
        emailPlaceholder: "user@example.com",
        passwordLabel: "Құпия сөз",
        passwordPlaceholder: "••••••••",
        roleLabel: "Рөл",
        userRole: "Пайдаланушы",
        adminRole: "Әкімші",
        registerButton: "Тіркелу",
        loginButton: "Кіру",
        haveAccount: "Аккаунтыңыз бар ма?",
        noAccount: "Аккаунт жоқ па?",
        loginLink: "Кіру",
        registerLink: "Тіркелу",
        loginProblems: "Кіру мәселелері?",
        resetData: "Барлық деректерді қалпына келтіру",
        
        // Навигация
        homeNav: "Басты",
        analyticsNav: "Аналитика",
        missionsNav: "Геймификация",
        chatNav: "ЖС Көмекші",
        
        // Дашборд
        aiAdviceTitle: "ЖС Күнделікті кеңесі",
        aiAdviceDefault: "Жекелендірілген қаржылық басқару кеңестерін алу үшін шығындарды қосуды бастаңыз!",
        myGoals: "Менің мақсаттарым",
        addButton: "Қосу",
        noGoals: "Сізде әлі қаржылық мақсаттар жоқ",
        
        // Нұсқаулық
        instructionsTitle: "📚 Пайдалану нұсқаулығы",
        instruction1Title: "Басты экран",
        instruction1Desc: "Шығындарыңызды, орташа шығыстарды және айлық шығындарды көрсетеді. «Күнделікті кеңес» бар. Мақсаттарды жасауға және бақылауға болады.",
        instruction2Title: "Аналитика",
        instruction2Desc: "График күндер бойынша шығындардың өзгеруін көрсетеді. Диаграмма ақшаның қайда кететінін көрсетеді. Айлық есепті көруге болады.",
        instruction3Title: "Мақсаттар",
        instruction3Desc: "Қаржылық мақсаттарды жасаңыз. Соманы көрсетіңіз. Үнемдеу процесін бақылаңыз.",
        instruction4Title: "Миссиялар",
        instruction4Desc: "Тапсырмаларды орындаңыз. FinCoin монеталарын жинаңыз. Пайды әдеттерді дамытыңыз.",
        instruction5Title: "Дүкен",
        instruction5Desc: "Бонустарға FinCoin жұмсаңыз. Қосымша функциялар мен премиумды сатып алыңыз.",
        instruction6Title: "ЖС-көмекші",
        instruction6Desc: "Сұрақтарыңызға жауап береді. Қосымша және қаржы бойынша көмектеседі. Әрқашан қол жетімді.",
        
        // Аналитика
        expenseTrend: "Шығындар динамикасы",
        totalExpenses: "Жалпы шығындар",
        byCategories: "Санаттар бойынша",
        categoryDistribution: "Санаттар бойынша үлестіру",
        recentExpenses: "Соңғы шығындар",
        addExpenseTitle: "Жаңа шығын қосу",
        amountLabel: "Сома",
        amountPlaceholder: "₸0",
        dateLabel: "Күні",
        categoryLabel: "Санат",
        commentLabel: "Түсініктеме",
        commentPlaceholder: "Мысалы: Кафедегі түскі ас",
        addExpenseButton: "Шығын қосу",
        noExpenses: "Сізде әлі шығындар жоқ",
        noChartData: "Көрсету үшін деректер жоқ",
        addExpensesChart: "Графикті көру үшін шығындарды қосыңыз",
        monthlyReport: "Айлық есеп",
        advancedAnalytics: "Кеңейтілген аналитика",
        shareReport: "Есеппен бөлісу",
        reportsSection: "Есептер мен деректер",
        
        // Категориялар
        foodCategory: "Тамақ",
        transportCategory: "Көлік",
        studyCategory: "Оқу",
        entertainmentCategory: "Ойын-сауық",
        otherCategory: "Басқа",
        
        // Миссиялар
        yourFincoins: "Сіздің FinCoins:",
        storeButton: "Дүкен",
        earnButton: "Табу",
        
        // Дүкен
        premiumSubscription: "Премиум жазылым",
        premiumTitle: "FinanceMind Premium",
        premiumBadge: "PREMIUM",
        premiumDescription: "Барлық премиум функцияларға қол жеткізіңіз: кеңейтілген аналитика, ЖС жаттықтырушысы, эксклюзивті темалар және т.б.",
        premiumFeatures: "Премиум функциялар",
        extendedAnalytics: "Кеңейтілген аналитика",
        popular: "Танымал",
        extendedAnalyticsDesc: "6 айға егжей-тегжейлі есептер мен шығындар болжамы",
        aiCoachTitle: "Жеке ЖС жаттықтырушысы",
        aiCoachDesc: "Жеке қаржылық ұсыныстар мен стратегиялар",
        personalization: "Жекелендіру",
        exclusiveThemes: "Эксклюзивті темалар",
        exclusiveThemesDesc: "Қосымша үшін 5 бірегей түс схемасы",
        iconPack: "Белгішелер жинағы",
        iconPackDesc: "Шығындар санаттары үшін стильді белгішелер",
        activatePremium: "Премиумды белсендіру",
        buyNow: "Қазір сатып алу",
        
        // Баптаулар
        accountManagement: "Аккаунтты басқару",
        personalData: "Жеке деректер",
        personalDataDesc: "Жеке ақпаратыңызды баптаңыз",
        securitySettings: "Қауіпсіздік және кіру",
        securitySettingsDesc: "Құпия сөз және кіру әдістері",
        systemSettings: "Жүйелік баптаулар",
        language: "Тіл",
        theme: "Тақырып",
        saveChanges: "Өзгерістерді сақтау",
        lastNameLabel: "Тегі",
        password: "Құпия сөз",
        lastChanged: "Соңғы өзгеріс: бүгін",
        changePassword: "Құпия сөзді өзгерту",
        loginMethods: "Кіру әдістері",
        emailPassword: "Email және құпия сөз",
        active: "Белсенді",
        russian: "Орысша",
        english: "Ағылшынша",
        kazakh: "Қазақша",
        lightTheme: "Ашық",
        darkTheme: "Қараңғы",
        logout: "Аккаунтан шығу",
        
        // Мақсаттар
        addGoalTitle: "Жаңа мақсат қосу",
        goalNameLabel: "Мақсат атауы",
        goalNamePlaceholder: "Мысалы: Жаңа ноутбук",
        goalAmountLabel: "Мақсат сомасы",
        goalAmountPlaceholder: "₸0",
        goalCurrentLabel: "Ағымдағы сома",
        goalCurrentPlaceholder: "₸0",
        goalDeadlineLabel: "Мақсат мерзімі",
        addGoalButton: "Мақсат қосу",
        deleteGoalText: "Жою",
        
        // Чат
        welcomeMessage: "Сәлем! Мен сіздің қаржылық ЖС көмекшісімін. Қалай көмектесе аламын? Мен:\n\n• Сіздің шығындарыңызды талдай аламын\n• Үнемдеу бойынша кеңес бере аламын\n• Қаржылық жоспарлауға көмектесе аламын\n• Қаржы бойынша сұрақтарға жауап бере аламын",
        chatPlaceholder: "Сұрағыңызды жазыңыз...",
        
        // Әкімші панелі
        adminPanel: "Әкімші панелі",
        adminSubtitle: "Миссияларды басқару және пайдаланушылардың прогресін бақылау",
        totalUsers: "Барлық пайдаланушылар",
        totalMissions: "Барлық миссиялар",
        completedMissions: "Орындалған миссиялар",
        totalFincoins: "Берілген FinCoins",
        missionManagement: "Миссияларды басқару",
        userProgress: "Пайдаланушылар прогрессі",
        exportAllData: "Барлық деректерді экспорттау"
    }
};

// Миссии приложения
const appMissions = [
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
    }
];

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
        if (modal.id !== 'goalModal') {
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
        
        // Специальная обработка для чата
        if (page === 'chat') {
            document.body.style.overflow = 'hidden';
            // Даем время на отрисовку, затем прокручиваем вниз
            setTimeout(() => {
                scrollChatToBottom();
            }, 200);
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
    renderInstructions();
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
        // Автоматическая прокрутка вниз при открытии чата
        setTimeout(() => {
            scrollChatToBottom();
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

// ========== ФУНКЦИИ ДЛЯ ИНСТРУКЦИИ ==========

function renderInstructions() {
    const instructionsContainer = document.getElementById('instructionsContainer');
    if (!instructionsContainer) return;
    
    const translation = translations[currentLanguage];
    
    instructionsContainer.innerHTML = `
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">${translation.instructionsTitle}</h3>
            </div>
            <div class="instructions-grid">
                <div class="instruction-card" onclick="showInstructionDetail(1)">
                    <div class="instruction-icon">
                        <i class="fas fa-home"></i>
                    </div>
                    <h4 class="instruction-title">${translation.instruction1Title}</h4>
                    <p class="instruction-description">${translation.instruction1Desc}</p>
                </div>
                
                <div class="instruction-card" onclick="showInstructionDetail(2)">
                    <div class="instruction-icon">
                        <i class="fas fa-chart-line"></i>
                    </div>
                    <h4 class="instruction-title">${translation.instruction2Title}</h4>
                    <p class="instruction-description">${translation.instruction2Desc}</p>
                </div>
                
                <div class="instruction-card" onclick="showInstructionDetail(3)">
                    <div class="instruction-icon">
                        <i class="fas fa-bullseye"></i>
                    </div>
                    <h4 class="instruction-title">${translation.instruction3Title}</h4>
                    <p class="instruction-description">${translation.instruction3Desc}</p>
                </div>
                
                <div class="instruction-card" onclick="showInstructionDetail(4)">
                    <div class="instruction-icon">
                        <i class="fas fa-trophy"></i>
                    </div>
                    <h4 class="instruction-title">${translation.instruction4Title}</h4>
                    <p class="instruction-description">${translation.instruction4Desc}</p>
                </div>
                
                <div class="instruction-card" onclick="showInstructionDetail(5)">
                    <div class="instruction-icon">
                        <i class="fas fa-shopping-bag"></i>
                    </div>
                    <h4 class="instruction-title">${translation.instruction5Title}</h4>
                    <p class="instruction-description">${translation.instruction5Desc}</p>
                </div>
                
                <div class="instruction-card" onclick="showInstructionDetail(6)">
                    <div class="instruction-icon">
                        <i class="fas fa-robot"></i>
                    </div>
                    <h4 class="instruction-title">${translation.instruction6Title}</h4>
                    <p class="instruction-description">${translation.instruction6Desc}</p>
                </div>
            </div>
        </div>
    `;
}

function showInstructionDetail(instructionNumber) {
    const translation = translations[currentLanguage];
    const instructionTitles = [
        translation.instruction1Title,
        translation.instruction2Title,
        translation.instruction3Title,
        translation.instruction4Title,
        translation.instruction5Title,
        translation.instruction6Title
    ];
    
    const instructionDescriptions = [
        translation.instruction1Desc,
        translation.instruction2Desc,
        translation.instruction3Desc,
        translation.instruction4Desc,
        translation.instruction5Desc,
        translation.instruction6Desc
    ];
    
    const instructionIcons = [
        'fa-home',
        'fa-chart-line',
        'fa-bullseye',
        'fa-trophy',
        'fa-shopping-bag',
        'fa-robot'
    ];
    
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
        <div class="modal-content" style="max-width: 500px; width: 90%;">
            <div class="modal-header">
                <h3 class="modal-title">${instructionTitles[instructionNumber - 1]}</h3>
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div style="text-align: center; margin-bottom: 20px;">
                <div style="width: 60px; height: 60px; background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; color: white; font-size: 24px;">
                    <i class="fas ${instructionIcons[instructionNumber - 1]}"></i>
                </div>
            </div>
            <p style="line-height: 1.6; color: var(--text-color); font-size: 16px;">
                ${instructionDescriptions[instructionNumber - 1]}
            </p>
            <div style="display: flex; justify-content: center; margin-top: 24px;">
                <button onclick="this.closest('.modal-overlay').remove()" class="btn btn-primary">
                    Понятно
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
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
    
    missionsList.innerHTML = appMissions.map(mission => {
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
        
        return `
            <div class="mission-item">
                <div class="mission-icon">
                    <i class="fas fa-star"></i>
                </div>
                <div class="mission-info">
                    <div class="mission-title">${mission.title}</div>
                    <div class="mission-description">${mission.description}</div>
                    <div class="mission-reward">
                        Награда: ${mission.reward} FinCoins • 
                        <span style="color: ${difficultyColors[mission.difficulty]}">
                            ${getDifficultyText(mission.difficulty)}
                        </span>
                    </div>
                    <div class="mission-progress">
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
    }).join('');
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

// ========== ФУНКЦИИ ДЛЯ ЧАТА ==========

function scrollChatToBottom() {
    const chatMessages = document.getElementById('chatMessages');
    if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
        // Дополнительная проверка через небольшой таймаут
        setTimeout(() => {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 100);
    }
}

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
    
    // Прокрутка после добавления сообщения пользователя
    scrollChatToBottom();
    
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'message message-ai';
    typingIndicator.innerHTML = `
        <div class="message-content">
            <i class="fas fa-ellipsis-h"></i>
        </div>
    `;
    chatMessages.appendChild(tyingIndicator);
    
    // Прокрутка после добавления индикатора набора
    scrollChatToBottom();
    
    setTimeout(() => {
        chatMessages.removeChild(typingIndicator);
        
        const aiResponse = getAIResponse(message);
        const aiMessage = document.createElement('div');
        aiMessage.className = 'message message-ai';
        aiMessage.innerHTML = `
            <div class="message-content">${aiResponse}</div>
        `;
        chatMessages.appendChild(aiMessage);
        
        // Финальная прокрутка после ответа AI
        scrollChatToBottom();
    }, 2000);
}

function getAIResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('привет') || lowerMessage.includes('здравствуй') || lowerMessage.includes('салем') || lowerMessage.includes('hello')) {
        return "Привет! Я ваш AI-помощник по финансам. Чем могу помочь?";
    }
    
    if (lowerMessage.includes('расход') || lowerMessage.includes('трат') || lowerMessage.includes('шығын')) {
        return "Чтобы добавить расход, перейдите в раздел 'Аналитика' и заполните форму внизу страницы. Не забудьте выбрать категорию расхода!";
    }
    
    if (lowerMessage.includes('цел') || lowerMessage.includes('накоп') || lowerMessage.includes('мақсат')) {
        return "Финансовые цели помогают планировать будущее. Вы можете добавить цель на главной странице, нажав кнопку 'Добавить' в разделе 'Мои цели'.";
    }
    
    if (lowerMessage.includes('совет') || lowerMessage.includes('рекомендац') || lowerMessage.includes('кеңес')) {
        return getFinancialAdvice();
    }
    
    if (lowerMessage.includes('инструкц') || lowerMessage.includes('руководство') || lowerMessage.includes('нұсқаулық')) {
        return "Инструкция по использованию приложения доступна на главной странице после AI совета. Там вы найдете подробное описание всех функций FinanceMind!";
    }
    
    const defaultResponses = [
        "Интересный вопрос! Я специализируюсь на финансовых темах. Могу помочь с анализом расходов, планированием бюджета или дать советы по экономии.",
        "Как AI-помощник по финансам, я могу помочь вам с управлением расходами, установкой целей и финансовым планированием. Что конкретно вас интересует?",
        "Для более точного ответа уточните ваш вопрос. Я могу помочь с финансовым планированием, анализом расходов или дать советы по экономии денег."
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
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
    
    document.querySelectorAll('.language-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    event.target.classList.add('active');
    
    localStorage.setItem('language', lang);
    
    applyTranslations(lang);
    
    const langNames = {
        'ru': 'русский',
        'en': 'английский',
        'kz': 'казахский'
    };
    
    showNotification(`Язык изменен на ${langNames[lang]}`, 'success');
}

function applyTranslations(lang) {
    const translation = translations[lang];
    
    if (!translation) return;
    
    console.log('Applying translations for language:', lang);
    
    Object.keys(translation).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            if (element.tagName === 'INPUT' && element.placeholder !== undefined) {
                element.placeholder = translation[key];
            } else if (element.tagName === 'BUTTON' || element.tagName === 'SPAN' || element.tagName === 'DIV' || element.tagName === 'H3' || element.tagName === 'P' || element.tagName === 'LABEL') {
                element.textContent = translation[key];
            } else {
                element.textContent = translation[key];
            }
        }
    });
    
    const titles = {
        'ru': 'FinanceMind — Умный финансовый помощник',
        'en': 'FinanceMind — Smart Finance Assistant',
        'kz': 'FinanceMind — Ақылды қаржы көмекшісі'
    };
    document.title = titles[lang] || titles['ru'];
    
    updateNavigationText(lang);
    
    // Обновляем инструкцию при смене языка
    if (document.getElementById('dashboard').style.display === 'block') {
        renderInstructions();
    }
}

function updateNavigationText(lang) {
    const navItems = document.querySelectorAll('.nav-item');
    const translation = translations[lang];
    
    navItems.forEach(item => {
        const span = item.querySelector('span');
        if (span) {
            const page = item.getAttribute('onclick');
            if (page) {
                if (page.includes('dashboard')) {
                    span.textContent = translation.homeNav;
                } else if (page.includes('analytics')) {
                    span.textContent = translation.analyticsNav;
                } else if (page.includes('missions')) {
                    span.textContent = translation.missionsNav;
                } else if (page.includes('chat')) {
                    span.textContent = translation.chatNav;
                }
            }
        }
    });
}

function initLanguage() {
    const savedLang = localStorage.getItem('language') || 'ru';
    console.log('Initializing language:', savedLang);
    
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
    
    renderMissionManagement();
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

// ========== УВЕДОМЛЕНИЯ ==========

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
    
    // Инициализация языка
    initLanguage();
    
    console.log('FinanceMind инициализирован');
});

