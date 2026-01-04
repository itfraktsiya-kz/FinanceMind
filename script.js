// ========== ОСНОВНЫЕ ПЕРЕМЕННЫЕ И ИНИЦИАЛИЗАЦИЯ ==========

let currentUser = null;
let expenses = [];
let goals = [];
let fincoins = 20;
let missions = [];
let purchasedItems = [];
let selectedCategory = null;
let currentChartType = 'total';
let lineChart = null;
let pieChart = null;
let currentLanguage = localStorage.getItem('userLanguage') || 'ru';
let appVisits = 0;
let currentReport = null;
let activeMission = null;
let chatHistory = [];
let missionProgressInterval = null;
let currentCalendarDate = new Date();
let selectedCalendarDate = null;
let selectedAccountType = null;
let familyConnections = [];

// === ЛОКАЛИЗАЦИЯ ===
const translations = {
    ru: {
        // Основные
        appTitle: "FinanceMind",
        appSubtitle: "Умный финансовый помощник",
        welcome: "Добро пожаловать!",
        
        // Авторизация
        nameLabel: "Имя",
        namePlaceholder: "Ваше имя",
        lastNameLabel: "Фамилия",
        lastNamePlaceholder: "Ваша фамилия",
        emailLabel: "Электронная почта",
        emailPlaceholder: "user@example.com",
        passwordLabel: "Пароль",
        passwordPlaceholder: "••••••••",
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
        missionsNav: "Миссии",
        chatNav: "Помощник",
        storeNav: "Магазин",
        settingsNav: "Настройки",
        
        // Главная страница
        aiAdviceTitle: "AI Совет дня",
        aiAdviceDefault: "Начните добавлять расходы, чтобы получить персонализированные советы!",
        myGoals: "Мои цели",
        addButton: "Добавить",
        noGoals: "У вас пока нет финансовых целей",
        instructionsTitle: "Инструкция по использованию",
        instructionsDescription: "Нажмите, чтобы ознакомиться с руководством по использованию приложения",
        yourStatistics: "Ваша статистика",
        expenseTrend: "Динамика расходов",
        totalExpenses: "Общие расходы",
        byCategories: "По категориям",
        categoryDistribution: "Распределение по категориям",
        recentExpenses: "Последние расходы",
        
        // Добавление расходов
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
        
        // Категории
        foodCategory: "Еда",
        transportCategory: "Транспорт",
        studyCategory: "Учеба",
        entertainmentCategory: "Развлечения",
        otherCategory: "Другое",
        
        // FinCoins
        yourFincoins: "Ваши FinCoins:",
        storeButton: "Магазин",
        earnButton: "Заработать",
        
        // Премиум
        premiumSubscription: "Премиум подписка",
        premiumTitle: "FinanceMind Premium",
        premiumBadge: "PREMIUM",
        premiumDescription: "Получите доступ ко всем премиум-функциям",
        premiumFeatures: "Премиум функции",
        extendedAnalytics: "Расширенная аналитика",
        extendedAnalyticsDesc: "Отчеты и прогнозы",
        aiCoachTitle: "Персональный AI-коуч",
        aiCoachDesc: "Индивидуальные финансовые рекомендации",
        exclusiveThemes: "Эксклюзивные темы",
        exclusiveThemesDesc: "5 уникальных цветовых схем",
        iconPack: "Набор иконок",
        iconPackDesc: "Стильные иконки для категорий",
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
        chatPlaceholder: "Напишите ваш вопрос...",
        sendButton: "Отправить",
        clearChatButton: "Очистить чат",
        welcomeMessage: "Привет! Я ваш AI-помощник по финансам. Могу помочь с анализом расходов, советами по экономии и финансовым планированием.",
        
        // Админ панель
        adminPanel: "Админ панель",
        totalUsers: "Всего пользователей",
        totalMissions: "Всего миссий",
        completedMissions: "Выполнено миссий",
        totalFincoins: "Выдано FinCoins",
        missionManagement: "Управление миссиями",
        userProgress: "Прогресс пользователей",
        exportAllData: "Экспорт всех данных",
        
        // Отчеты
        reportsSection: "Отчеты",
        monthlyReport: "Отчет за месяц",
        monthlyReportDesc: "Сводка расходов за текущий месяц",
        detailedReport: "Обширный отчет",
        detailedReportDesc: "Полная статистика и аналитика",
        shareReport: "Поделиться",
        downloadReport: "Скачать PNG",
        downloadReportPdf: "Скачать PDF",
        downloadReportPng: "Скачать PNG",
        closeReport: "Закрыть",
        reportGenerated: "Отчет сгенерирован",
        
        // Роли
        userRole: "Пользователь",
        adminRole: "Администратор",
        
        // Инструкция
        instructionsModalTitle: "Инструкция по использованию FinanceMind",
        instructionsWelcome: "Добро пожаловать в FinanceMind!",
        instructionsIntro: "Эта инструкция поможет вам быстро освоиться в приложении.",
        instructionsSection1: "1. Главный экран",
        instructionsSection1Item1: "Просматривайте статистику расходов",
        instructionsSection1Item2: "Получайте AI-советы",
        instructionsSection1Item3: "Управляйте финансовые цели",
        instructionsSection2: "2. Аналитика",
        instructionsSection2Item1: "Анализируйте графики расходов",
        instructionsSection2Item2: "Добавляйте новые расходы",
        instructionsSection2Item3: "Просматривайте историю трат",
        instructionsSection3: "3. Миссии",
        instructionsSection3Item1: "Выполняйте задания",
        instructionsSection3Item2: "Зарабатывайте FinCoins",
        instructionsSection3Item3: "Отслеживайте прогресс",
        instructionsSection4: "4. Магазин",
        instructionsSection4Item1: "Покупайте премиум функции",
        instructionsSection4Item2: "Тратьте заработанные FinCoins",
        instructionsSection5: "5. AI-помощник",
        instructionsSection5Item1: "Получайте финансовые советы",
        instructionsSection5Item2: "Задавайте вопросы",
        instructionsGotIt: "Понятно, начать использовать",
        
        // Дополнительные
        popular: "Популярное",
        exportData: "Экспорт данных",
        importData: "Импорт данных",
        addCategory: "Добавить категория",
        personalization: "Персонализация",
        
        // Миссии
        startMission: "Начать",
        activeMission: "Активная миссия",
        completedMissions: "Выполненные миссии",
        missionProgress: "Прогресс",
        missionReward: "Награда",
        missionDifficulty: "Сложность",
        noActiveMission: "Нет активной миссии",
        missionCompleted: "Миссия выполнена!",
        startMissionSuccess: "Миссия начата!",
        onlyOneMissionActive: "Только одна миссия может быть активной одновременно",
        stopMission: "Остановить",
        
        // Типы аккаунтов
        accountTypeTeen: "Подросток",
        accountTypeParent: "Родитель", 
        accountTypeAdult: "Взрослый",
        teenAccountDesc: "Геймификация, миссии и награды",
        parentAccountDesc: "Контроль за подростковыми аккаунтами",
        adultAccountDesc: "Расширенные инструменты для управления",
        selectAccountType: "Выберите тип аккаунта",
        accountTypeDescription: "Описание выбранного типа аккаунта:",
        backToSelection: "Назад к выбору типа аккаунта",
        
        // Семейные подключения
        familySection: "Семейные подключения",
        familyConnections: "Подключенные аккаунты",
        noConnections: "Нет подключенных аккаунтов",
        connectChild: "Подключить ребенка",
        shareLink: "Поделиться ссылкой",
        generateLink: "Сгенерировать ссылку",
        connectionLink: "Ссылка для подключения:",
        copyLink: "Копировать ссылку",
        linkCopied: "Ссылка скопирована!",
        childAccounts: "Детские аккаунты",
        parentAccount: "Родительский аккаунт",
        viewChildStats: "Просмотр статистики",
        disconnect: "Отключить",
        connectedAsChild: "Подключен как ребенок к",
        connectedAsParent: "Подключен как родитель к",
        viewParentDashboard: "Просмотр родительской панели",
        
        // Новые для исправлений
        saveProfile: "Сохранить профиль",
        changeTheme: "Изменить тему",
        resetAllData: "Сбросить все данные",
        
        // Языки
        languageRussian: "Русский",
        languageEnglish: "English",
        languageKazakh: "Қазақша",
        currentLanguage: "Текущий язык",
        changeLanguage: "Изменить язык",
        
        // Разделы настроек
        personalDataTitle: "Персональные данные",
        securityTitle: "Безопасность и вход",
        teenAccountsTitle: "Подростковые аккаунты",
        familyConnectionsTitle: "Семейные подключения",
        languageSettingsTitle: "Язык и тема",
        
        // Тема
        themeLight: "Светлая",
        themeDark: "Тёмная",
        themeSystem: "Системная",
        themeAuto: "Автоматически",
        
        // Подростковые аккаунты
        manageTeenAccounts: "Управление подростковыми аккаунтами",
        addTeenAccount: "Добавить подростковый аккаунт",
        teenAccountsList: "Список подростковых аккаунтов",
        viewSpending: "Просмотр трат",
        setLimits: "Установить лимиты",
        
        // Безопасность
        twoFactorAuth: "Двухфакторная аутентификация",
        biometricLogin: "Биометрический вход",
        sessionManagement: "Управление сессиями",
        
        // Общие
        edit: "Редактировать",
        delete: "Удалить",
        cancel: "Отмена",
        confirm: "Подтвердить",
        loading: "Загрузка...",
        success: "Успешно",
        error: "Ошибка",
        
        // Языковые кнопки
        languageRussianBtn: "Русский",
        languageKazakhBtn: "Қазақша",
        languageEnglishBtn: "English",
        
        // Бюджет
        budgetPlanning: "Планирование бюджета",
        expenseAnalysis: "Анализ расходов",
        smartDistribution: "Умное распределение",
        
        // Чат
        clearChatHistory: "Очистить историю чата",
        deleteChatConfirm: "Вы уверены, что хотите очистить всю историю чата?",
        clearChat: "Очистить чат",
        
        // Новые кнопки
        logoutConfirm: "Вы уверены, что хотите выйти из аккаунта?",
        manageAccount: "Управление аккаунтом",
        logoutButton: "Выйти"
    },
    en: {
        // Basic
        appTitle: "FinanceMind",
        appSubtitle: "Smart Financial Assistant",
        welcome: "Welcome!",
        
        // Authentication
        nameLabel: "Name",
        namePlaceholder: "Your name",
        lastNameLabel: "Last Name",
        lastNamePlaceholder: "Your last name",
        emailLabel: "Email",
        emailPlaceholder: "user@example.com",
        passwordLabel: "Password",
        passwordPlaceholder: "••••••••",
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
        chatNav: "Assistant",
        storeNav: "Store",
        settingsNav: "Settings",
        
        // Home page
        aiAdviceTitle: "AI Advice of the Day",
        aiAdviceDefault: "Start adding expenses to get personalized advice!",
        myGoals: "My Goals",
        addButton: "Add",
        noGoals: "You don't have financial goals yet",
        instructionsTitle: "User Guide",
        instructionsDescription: "Click to read the application usage guide",
        yourStatistics: "Your Statistics",
        expenseTrend: "Expense Trends",
        totalExpenses: "Total Expenses",
        byCategories: "By Categories",
        categoryDistribution: "Category Distribution",
        recentExpenses: "Recent Expenses",
        
        // Add expenses
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
        
        // Categories
        foodCategory: "Food",
        transportCategory: "Transport",
        studyCategory: "Study",
        entertainmentCategory: "Entertainment",
        otherCategory: "Other",
        
        // FinCoins
        yourFincoins: "Your FinCoins:",
        storeButton: "Store",
        earnButton: "Earn",
        
        // Premium
        premiumSubscription: "Premium Subscription",
        premiumTitle: "FinanceMind Premium",
        premiumBadge: "PREMIUM",
        premiumDescription: "Get access to all premium features",
        premiumFeatures: "Premium Features",
        extendedAnalytics: "Extended Analytics",
        extendedAnalyticsDesc: "Detailed reports and expense forecasts",
        aiCoachTitle: "Personal AI Coach",
        aiCoachDesc: "Individual financial recommendations",
        exclusiveThemes: "Exclusive Themes",
        exclusiveThemesDesc: "5 unique color schemes",
        iconPack: "Icon Pack",
        iconPackDesc: "Stylish icons for categories",
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
        chatPlaceholder: "Write your question...",
        sendButton: "Send",
        clearChatButton: "Clear chat",
        welcomeMessage: "Hello! I'm your AI financial assistant. I can help with expense analysis, saving tips, and financial planning.",
        
        // Admin panel
        adminPanel: "Admin Panel",
        totalUsers: "Total Users",
        totalMissions: "Total Missions",
        completedMissions: "Completed Missions",
        totalFincoins: "Total FinCoins Issued",
        missionManagement: "Mission Management",
        userProgress: "User Progress",
        exportAllData: "Export All Data",
        
        // Reports
        reportsSection: "Reports",
        monthlyReport: "Monthly Report",
        monthlyReportDesc: "Expense summary for current month",
        detailedReport: "Detailed Report",
        detailedReportDesc: "Complete statistics and analytics",
        shareReport: "Share",
        downloadReport: "Download PNG",
        downloadReportPdf: "Download PDF",
        downloadReportPng: "Download PNG",
        closeReport: "Close",
        reportGenerated: "Report generated",
        
        // Roles
        userRole: "User",
        adminRole: "Administrator",
        
        // Instructions
        instructionsModalTitle: "FinanceMind User Guide",
        instructionsWelcome: "Welcome to FinanceMind!",
        instructionsIntro: "This guide will help you quickly get familiar with the application.",
        instructionsSection1: "1. Main Screen",
        instructionsSection1Item1: "View expense statistics",
        instructionsSection1Item2: "Receive AI advice",
        instructionsSection1Item3: "Manage financial goals",
        instructionsSection2: "2. Analytics",
        instructionsSection2Item1: "Analyze expense charts",
        instructionsSection2Item2: "Add new expenses",
        instructionsSection2Item3: "View spending history",
        instructionsSection3: "3. Missions",
        instructionsSection3Item1: "Complete tasks",
        instructionsSection3Item2: "Earn FinCoins",
        instructionsSection3Item3: "Track progress",
        instructionsSection4: "4. Store",
        instructionsSection4Item1: "Buy premium features",
        instructionsSection4Item2: "Spend earned FinCoins",
        instructionsSection5: "5. AI Assistant",
        instructionsSection5Item1: "Get financial advice",
        instructionsSection5Item2: "Ask questions",
        instructionsGotIt: "Got it, start using",
        
        // Additional
        popular: "Popular",
        exportData: "Export Data",
        importData: "Import Data",
        addCategory: "Add Category",
        personalization: "Personalization",
        
        // Missions
        startMission: "Start",
        activeMission: "Active Mission",
        completedMissions: "Completed Missions",
        missionProgress: "Progress",
        missionReward: "Reward",
        missionDifficulty: "Difficulty",
        noActiveMission: "No active mission",
        missionCompleted: "Mission completed!",
        startMissionSuccess: "Mission started!",
        onlyOneMissionActive: "Only one mission can be active at a time",
        stopMission: "Stop",
        
        // Account types
        accountTypeTeen: "Teen",
        accountTypeParent: "Parent",
        accountTypeAdult: "Adult",
        teenAccountDesc: "Gamification, missions and rewards",
        parentAccountDesc: "Control over teen accounts",
        adultAccountDesc: "Advanced tools for management",
        selectAccountType: "Select Account Type",
        accountTypeDescription: "Selected account type description:",
        backToSelection: "Back to account type selection",
        
        // Family connections
        familySection: "Family Connections",
        familyConnections: "Connected Accounts",
        noConnections: "No connected accounts",
        connectChild: "Connect Child",
        shareLink: "Share Link",
        generateLink: "Generate Link",
        connectionLink: "Connection Link:",
        copyLink: "Copy Link",
        linkCopied: "Link copied!",
        childAccounts: "Child Accounts",
        parentAccount: "Parent Account",
        viewChildStats: "View Statistics",
        disconnect: "Disconnect",
        connectedAsChild: "Connected as child to",
        connectedAsParent: "Connected as parent to",
        viewParentDashboard: "View Parent Dashboard",
        
        // New for fixes
        saveProfile: "Save Profile",
        changeTheme: "Change Theme",
        resetAllData: "Reset All Data",
        
        // Languages
        languageRussian: "Russian",
        languageEnglish: "English",
        languageKazakh: "Kazakh",
        currentLanguage: "Current language",
        changeLanguage: "Change language",
        
        // Settings sections
        personalDataTitle: "Personal Data",
        securityTitle: "Security & Login",
        teenAccountsTitle: "Teen Accounts",
        familyConnectionsTitle: "Family Connections",
        languageSettingsTitle: "Language & Theme",
        
        // Theme
        themeLight: "Light",
        themeDark: "Dark",
        themeSystem: "System",
        themeAuto: "Auto",
        
        // Teen accounts
        manageTeenAccounts: "Manage Teen Accounts",
        addTeenAccount: "Add Teen Account",
        teenAccountsList: "Teen Accounts List",
        viewSpending: "View Spending",
        setLimits: "Set Limits",
        
        // Security
        twoFactorAuth: "Two-Factor Authentication",
        biometricLogin: "Biometric Login",
        sessionManagement: "Session Management",
        
        // Common
        edit: "Edit",
        delete: "Delete",
        cancel: "Cancel",
        confirm: "Confirm",
        loading: "Loading...",
        success: "Success",
        error: "Error",
        
        // Language buttons
        languageRussianBtn: "Русский",
        languageKazakhBtn: "Қазақша",
        languageEnglishBtn: "English",
        
        // Budget
        budgetPlanning: "Budget Planning",
        expenseAnalysis: "Expense Analysis",
        smartDistribution: "Smart Distribution",
        
        // Chat
        clearChatHistory: "Clear chat history",
        deleteChatConfirm: "Are you sure you want to clear all chat history?",
        clearChat: "Clear chat",
        
        // New buttons
        logoutConfirm: "Are you sure you want to logout?",
        manageAccount: "Manage Account",
        logoutButton: "Logout"
    },
    kz: {
        // Негізгі
        appTitle: "FinanceMind",
        appSubtitle: "Ақылды қаржы көмекшісі",
        welcome: "Қош келдіңіз!",
        
        // Авторизация
        nameLabel: "Аты",
        namePlaceholder: "Сіздің атыңыз",
        lastNameLabel: "Тегі",
        lastNamePlaceholder: "Сіздің тегіңіз",
        emailLabel: "Электрондық пошта",
        emailPlaceholder: "user@example.com",
        passwordLabel: "Құпия сөз",
        passwordPlaceholder: "••••••••",
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
        missionsNav: "Миссиялар",
        chatNav: "Көмекші",
        storeNav: "Дүкен",
        settingsNav: "Баптаулар",
        
        // Басты бет
        aiAdviceTitle: "ЖС Күнделікті кеңесі",
        aiAdviceDefault: "Жекелендірілген кеңес алу үшін шығындарды қосуды бастаңыз!",
        myGoals: "Менің мақсаттарым",
        addButton: "Қосу",
        noGoals: "Сізде әлі қаржылық мақсаттар жоқ",
        instructionsTitle: "Пайдалану нұсқаулығы",
        instructionsDescription: "Қолданбаны пайдалану нұсқаулығымен танысу үшін басыңыз",
        yourStatistics: "Сіздің статистикаңыз",
        expenseTrend: "Шығындар динамикасы",
        totalExpenses: "Жалпы шығындар",
        byCategories: "Санаттар бойынша",
        categoryDistribution: "Санаттар бойынша үлестіру",
        recentExpenses: "Соңғы шығындар",
        
        // Шығындарды қосу
        addExpenseTitle: "Жаңа шығын қосу",
        amountLabel: "Сома",
        amountPlaceholder: "₸0",
        dateLabel: "Күні",
        categoryLabel: "Санат",
        commentLabel: "Түсініктеме",
        commentPlaceholder: "Мысалы: Кафеде түскі ас",
        addExpenseButton: "Шығын қосу",
        noExpenses: "Сізде әлі шығындар жоқ",
        noChartData: "Көрсету үшін деректер жоқ",
        addExpensesChart: "Графикті көру үшін шығындарды қосыңыз",
        
        // Санаттар
        foodCategory: "Тамақ",
        transportCategory: "Көлік",
        studyCategory: "Оқу",
        entertainmentCategory: "Ойын-сауық",
        otherCategory: "Басқа",
        
        // FinCoins
        yourFincoins: "Сіздің FinCoins:",
        storeButton: "Дүкен",
        earnButton: "Табу",
        
        // Премиум
        premiumSubscription: "Премиум жазылым",
        premiumTitle: "FinanceMind Premium",
        premiumBadge: "PREMIUM",
        premiumDescription: "Барлық премиум функцияларға қол жеткізіңіз",
        premiumFeatures: "Премиум функциялар",
        extendedAnalytics: "Кеңейтілген аналитика",
        extendedAnalyticsDesc: "Егжей-тегжейлі есептер және шығындар болжамы",
        aiCoachTitle: "Жеке ЖК-жаттықтырушы",
        aiCoachDesc: "Жекелендірілген қаржылық ұсыныстар",
        exclusiveThemes: "Эксклюзивті тақырыптар",
        exclusiveThemesDesc: "5 бірегей түс схемасы",
        iconPack: "Белгішелер жинағы",
        iconPackDesc: "Санаттар үшін стильді белгішелер",
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
        chatPlaceholder: "Сұрағыңызды жазыңыз...",
        sendButton: "Жіберу",
        clearChatButton: "Чатты тазалау",
        welcomeMessage: "Сәлем! Мен сіздің қаржылық көмекшісіңізбін. Шығындарды талдау, үнемдеу бойынша кеңестер және қаржылық жоспарлау бойынша көмектесе аламын.",
        
        // Әкімші панелі
        adminPanel: "Әкімші панелі",
        totalUsers: "Барлық пайдаланушылар",
        totalMissions: "Барлық миссиялар",
        completedMissions: "Орындалған миссиялар",
        totalFincoins: "Берілген FinCoins",
        missionManagement: "Миссияларды басқару",
        userProgress: "Пайдаланушылар прогрессі",
        exportAllData: "Барлық деректерді экспорттау",
        
        // Есептер
        reportsSection: "Есептер",
        monthlyReport: "Айлық есеп",
        monthlyReportDesc: "Ағымдағы айдың шығындарының қорытындысы",
        detailedReport: "Егжей-тегжейлі есеп",
        detailedReportDesc: "Толық статистика және аналитика",
        shareReport: "Бөлісу",
        downloadReport: "PNG жүктеу",
        downloadReportPdf: "PDF жүктеу",
        downloadReportPng: "PNG жүктеу",
        closeReport: "Жабу",
        reportGenerated: "Есеп жасалды",
        
        // Рөллер
        userRole: "Пайдаланушы",
        adminRole: "Әкімші",
        
        // Нұсқаулық
        instructionsModalTitle: "FinanceMind пайдалану нұсқаулығы",
        instructionsWelcome: "FinanceMind-қа қош келдіңіз!",
        instructionsIntro: "Бұл нұсқаулық қолданбамен тез танысуға көмектеседі.",
        instructionsSection1: "1. Басты экран",
        instructionsSection1Item1: "Шығындар статистикасын қараңыз",
        instructionsSection1Item2: "ЖС-кеңестер алыңыз",
        instructionsSection1Item3: "Қаржылық мақсаттарды басқарыңыз",
        instructionsSection2: "2. Аналитика",
        instructionsSection2Item1: "Шығындар графиктерін талдаңыз",
        instructionsSection2Item2: "Жаңа шығындарды қосыңыз",
        instructionsSection2Item3: "Шығындар тарихын қараңыз",
        instructionsSection3: "3. Миссиялар",
        instructionsSection3Item1: "Тапсырмаларды орындаңыз",
        instructionsSection3Item2: "FinCoins табыңыз",
        instructionsSection3Item3: "Прогресті бақылаңыз",
        instructionsSection4: "4. Дүкен",
        instructionsSection4Item1: "Премиум функцияларды сатып алыңыз",
        instructionsSection4Item2: "Табылған FinCoins-ті жұмсаңыз",
        instructionsSection5: "5. ЖС-көмекші",
        instructionsSection5Item1: "Қаржылық кеңестер алыңыз",
        instructionsSection5Item2: "Сұрақтар қойыңыз",
        instructionsGotIt: "Түсіндім, пайдалануды бастау",
        
        // Қосымша
        popular: "Танымал",
        exportData: "Деректерді экспорттау",
        importData: "Деректерді импорттау",
        addCategory: "Санат қосу",
        personalization: "Жекелендіру",
        
        // Миссиялар
        startMission: "Бастау",
        activeMission: "Белсенді миссия",
        completedMissions: "Орындалған миссиялар",
        missionProgress: "Прогресс",
        missionReward: "Сыйлық",
        missionDifficulty: "Күрделілік",
        noActiveMission: "Белсенді миссия жоқ",
        missionCompleted: "Миссия орындалды!",
        startMissionSuccess: "Миссия басталды!",
        onlyOneMissionActive: "Бір уақытта тек бір миссия белсенді болуы мүмкін",
        stopMission: "Тоқтату",
        
        // Аккаунт түрлері
        accountTypeTeen: "Жастар",
        accountTypeParent: "Ата-ана", 
        accountTypeAdult: "Ересектер",
        teenAccountDesc: "Геймификация, миссиялар және марапаттар",
        parentAccountDesc: "Жастар аккаунттарын бақылау",
        adultAccountDesc: "Қаржыны басқару үшін кеңейтілген құралдар",
        selectAccountType: "Аккаунт түрін таңдаңыз",
        accountTypeDescription: "Таңдалған аккаунт түрінің сипаттамасы:",
        backToSelection: "Аккаунт түрін таңдауға оралу",
        
        // Отбасылық қосылымдар
        familySection: "Отбасылық қосылымдар",
        familyConnections: "Қосылған аккаунттар",
        noConnections: "Қосылған аккаунттар жоқ",
        connectChild: "Баланы қосу",
        shareLink: "Сілтемені бөлісу",
        generateLink: "Сілтеме жасау",
        connectionLink: "Қосылым сілтемесі:",
        copyLink: "Сілтемені көшіру",
        linkCopied: "Сілтеме көшірілді!",
        childAccounts: "Балалар аккаунттары",
        parentAccount: "Ата-ана аккаунты",
        viewChildStats: "Статистиканы қарау",
        disconnect: "Ажырату",
        connectedAsChild: "Бала ретінде қосылған",
        connectedAsParent: "Ата-ана ретінде қосылған",
        viewParentDashboard: "Ата-ана панелін қарау",
        
        // New for fixes
        saveProfile: "Профильді сақтау",
        changeTheme: "Тақырыпты өзгерту",
        resetAllData: "Барлық деректерді қалпына келтіру",
        
        // Languages
        languageRussian: "Русский",
        languageEnglish: "English",
        languageKazakh: "Қазақша",
        currentLanguage: "Ағымдағы тіл",
        changeLanguage: "Тілді өзгерту",
        
        // Баптау бөлімдері
        personalDataTitle: "Жеке деректер",
        securityTitle: "Қауіпсіздік және кіру",
        teenAccountsTitle: "Жастар аккаунттары",
        familyConnectionsTitle: "Отбасылық қосылымдар",
        languageSettingsTitle: "Тіл және тақырып",
        
        // Тақырып
        themeLight: "Ашық",
        themeDark: "Қараңғы",
        themeSystem: "Жүйелік",
        themeAuto: "Автоматты",
        
        // Жастар аккаунттары
        manageTeenAccounts: "Жастар аккаунттарын басқару",
        addTeenAccount: "Жастар аккаунтын қосу",
        teenAccountsList: "Жастар аккаунттары тізімі",
        viewSpending: "Шығындарды қарау",
        setLimits: "Шектеулерді орнату",
        
        // Қауіпсіздік
        twoFactorAuth: "Екі факторлы аутентификация",
        biometricLogin: "Биометриялық кіру",
        sessionManagement: "Сессияларды басқару",
        
        // Жалпы
        edit: "Өңдеу",
        delete: "Жою",
        cancel: "Болдырмау",
        confirm: "Растау",
        loading: "Жүктелуде...",
        success: "Сәтті",
        error: "Қате",
        
        // Тіл түймелері
        languageRussianBtn: "Русский",
        languageKazakhBtn: "Қазақша",
        languageEnglishBtn: "English",
        
        // Бюджет
        budgetPlanning: "Бюджет жоспарлау",
        expenseAnalysis: "Шығындарды талдау",
        smartDistribution: "Ақылды бөлу",
        
        // Чат
        clearChatHistory: "Чат тарихын тазалау",
        deleteChatConfirm: "Чат тарихын толығымен тазартуға сенімдісіз бе?",
        clearChat: "Чатты тазалау",
        
        // New buttons
        logoutConfirm: "Аккаунтан шығуға сенімдісіз бе?",
        manageAccount: "Аккаунтты басқару",
        logoutButton: "Шығу"
    }
};

// ========== ИСПРАВЛЕНИЕ КНОПОК И ОБРАБОТЧИКОВ ==========

// Функции для отчетов - исправлены
function openMonthlyReport() {
    openReportModal('monthly');
}

function openDetailedReport() {
    openReportModal('detailed');
}

// ========== ОБНОВЛЕННЫЕ ФУНКЦИИ ДЛЯ КНОПОК ЛИЧНОГО КАБИНЕТА ==========

function handleSettingsClick(section) {
    console.log('Opening section:', section);
    
    switch(section) {
        case 'personalData':
            openPersonalDataSection();
            break;
        case 'security':
            openSecuritySection();
            break;
        case 'languageTheme':
            openLanguageThemeSection();
            break;
        case 'teenAccounts':
            openTeenAccountsSection();
            break;
        case 'familyConnections':
            openFamilyConnectionsSection();
            break;
        default:
            console.log('Unknown section:', section);
    }
}

function openPersonalDataSection() {
    // Создаем или показываем модальное окно для персональных данных
    const modalId = 'personalDataModal';
    let modal = document.getElementById(modalId);
    
    if (!modal) {
        modal = document.createElement('div');
        modal.id = modalId;
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 500px;">
                <div class="modal-header">
                    <h3>${translations[currentLanguage].personalDataTitle}</h3>
                    <button class="modal-close" onclick="closeModal('${modalId}')">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" style="padding: 20px;">
                    <div class="form-group">
                        <label>${translations[currentLanguage].nameLabel}</label>
                        <input type="text" id="editName" class="form-input" 
                               value="${currentUser?.name || ''}" 
                               placeholder="${translations[currentLanguage].namePlaceholder}">
                    </div>
                    <div class="form-group">
                        <label>${translations[currentLanguage].lastNameLabel}</label>
                        <input type="text" id="editLastName" class="form-input" 
                               value="${currentUser?.lastName || ''}" 
                               placeholder="${translations[currentLanguage].lastNamePlaceholder}">
                    </div>
                    <div class="form-group">
                        <label>${translations[currentLanguage].emailLabel}</label>
                        <input type="email" id="editEmail" class="form-input" 
                               value="${currentUser?.email || ''}" 
                               placeholder="${translations[currentLanguage].emailPlaceholder}">
                    </div>
                    <div class="form-group">
                        <label>${translations[currentLanguage].accountTypeTeen}</label>
                        <div class="account-type-display">
                            <span class="user-role-badge ${currentUser?.accountType || 'adult'}">
                                ${getAccountTypeDisplayName(currentUser?.accountType || 'adult')}
                            </span>
                            <small style="color: var(--text-light); margin-top: 5px; display: block;">
                                ${currentLanguage === 'ru' ? 'Тип аккаунта можно изменить при регистрации' :
                                 currentLanguage === 'en' ? 'Account type can be changed during registration' :
                                 'Аккаунт түрін тіркелу кезінде өзгертуге болады'}
                            </small>
                        </div>
                    </div>
                </div>
                <div class="modal-footer" style="padding: 20px; border-top: 1px solid var(--border);">
                    <button class="btn btn-primary" onclick="savePersonalData()" style="width: 100%;">
                        <i class="fas fa-save"></i> ${translations[currentLanguage].saveChanges}
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    modal.style.display = 'flex';
    fadeInElement(modal);
    
    // Показываем уведомление
    showNotification(translations[currentLanguage].personalDataDesc, 'info');
}

function openSecuritySection() {
    // Создаем или показываем модальное окно для безопасности
    const modalId = 'securityModal';
    let modal = document.getElementById(modalId);
    
    if (!modal) {
        modal = document.createElement('div');
        modal.id = modalId;
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 500px;">
                <div class="modal-header">
                    <h3>${translations[currentLanguage].securityTitle}</h3>
                    <button class="modal-close" onclick="closeModal('${modalId}')">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" style="padding: 20px;">
                    <div class="security-section">
                        <div class="security-item">
                            <div class="security-info">
                                <i class="fas fa-key" style="color: var(--primary);"></i>
                                <div>
                                    <h4>${translations[currentLanguage].password}</h4>
                                    <p>${translations[currentLanguage].lastChanged}</p>
                                </div>
                            </div>
                            <button class="btn btn-outline" onclick="changePassword()">
                                ${translations[currentLanguage].changePassword}
                            </button>
                        </div>
                        
                        <div class="security-item">
                            <div class="security-info">
                                <i class="fas fa-sign-in-alt" style="color: var(--primary);"></i>
                                <div>
                                    <h4>${translations[currentLanguage].loginMethods}</h4>
                                    <p>${translations[currentLanguage].emailPassword}</p>
                                </div>
                            </div>
                            <div class="security-status">
                                <span class="status-badge active">${translations[currentLanguage].active}</span>
                            </div>
                        </div>
                        
                        <div class="security-item">
                            <div class="security-info">
                                <i class="fas fa-fingerprint" style="color: var(--primary);"></i>
                                <div>
                                    <h4>${translations[currentLanguage].biometricLogin}</h4>
                                    <p>${currentLanguage === 'ru' ? 'Используйте отпечаток пальца или Face ID' :
                                       currentLanguage === 'en' ? 'Use fingerprint or Face ID' :
                                       'Саусақ ізі немесе Face ID пайдаланыңыз'}</p>
                                </div>
                            </div>
                            <div class="security-toggle">
                                <label class="toggle-switch">
                                    <input type="checkbox" id="biometricToggle">
                                    <span class="toggle-slider"></span>
                                </label>
                            </div>
                        </div>
                        
                        <div class="security-item">
                            <div class="security-info">
                                <i class="fas fa-shield-alt" style="color: var(--primary);"></i>
                                <div>
                                    <h4>${translations[currentLanguage].twoFactorAuth}</h4>
                                    <p>${currentLanguage === 'ru' ? 'Дополнительная защита аккаунта' :
                                       currentLanguage === 'en' ? 'Additional account protection' :
                                       'Аккаунтты қосымша қорғау'}</p>
                                </div>
                            </div>
                            <div class="security-toggle">
                                <label class="toggle-switch">
                                    <input type="checkbox" id="twoFactorToggle">
                                    <span class="toggle-slider"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer" style="padding: 20px; border-top: 1px solid var(--border);">
                    <button class="btn btn-primary" onclick="saveSecuritySettings()" style="width: 100%;">
                        <i class="fas fa-save"></i> ${translations[currentLanguage].saveChanges}
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    modal.style.display = 'flex';
    fadeInElement(modal);
    
    // Показываем уведомление
    showNotification(translations[currentLanguage].securitySettingsDesc, 'info');
}

function openTeenAccountsSection() {
    // Проверяем, что пользователь - родитель
    if (!currentUser || currentUser.accountType !== 'parent') {
        showNotification(
            currentLanguage === 'ru' ? 'Эта функция доступна только для родительских аккаунтов' :
            currentLanguage === 'en' ? 'This feature is only available for parent accounts' :
            'Бұл функция тек ата-ана аккаунттары үшін қолжетімді',
            'error'
        );
        return;
    }
    
    // Создаем или показываем модальное окно для управления подростковыми аккаунтами
    const modalId = 'teenAccountsModal';
    let modal = document.getElementById(modalId);
    
    if (!modal) {
        modal = document.createElement('div');
        modal.id = modalId;
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h3>${translations[currentLanguage].teenAccountsTitle}</h3>
                    <button class="modal-close" onclick="closeModal('${modalId}')">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" style="padding: 20px;">
                    <div class="teen-accounts-header">
                        <button class="btn btn-primary" onclick="addTeenAccount()">
                            <i class="fas fa-plus"></i> ${translations[currentLanguage].addTeenAccount}
                        </button>
                    </div>
                    
                    <div class="teen-accounts-list" id="teenAccountsList">
                        <div class="empty-state">
                            <i class="fas fa-users"></i>
                            <p>${currentLanguage === 'ru' ? 'Подключенных подростковых аккаунтов пока нет' :
                               currentLanguage === 'en' ? 'No connected teen accounts yet' :
                               'Қосылған жастар аккаунттары әлі жоқ'}</p>
                            <small>${currentLanguage === 'ru' ? 'Нажмите "Добавить подростковый аккаунт" для подключения' :
                                   currentLanguage === 'en' ? 'Click "Add Teen Account" to connect' :
                                   'Қосу үшін "Жастар аккаунтын қосу" түймесін басыңыз'}</small>
                        </div>
                    </div>
                    
                    <div class="teen-accounts-info">
                        <h4><i class="fas fa-info-circle"></i> ${currentLanguage === 'ru' ? 'Как это работает' :
                                                                 currentLanguage === 'en' ? 'How it works' :
                                                                 'Бұл қалай жұмыс істейді'}</h4>
                        <ul>
                            <li>${currentLanguage === 'ru' ? 'Подключайте аккаунты своих детей для контроля расходов' :
                                currentLanguage === 'en' ? 'Connect your children\'s accounts to monitor their spending' :
                                'Балаларыңыздың шығындарын бақылау үшін олардың аккаунттарын қосыңыз'}</li>
                            <li>${currentLanguage === 'ru' ? 'Устанавливайте лимиты расходов по категориям' :
                                currentLanguage === 'en' ? 'Set spending limits by category' :
                                'Санаттар бойынша шығындар шектерін орнатыңыз'}</li>
                            <li>${currentLanguage === 'ru' ? 'Получайте уведомления о крупных тратах' :
                                currentLanguage === 'en' ? 'Receive notifications about large expenses' :
                                'Үлкен шығындар туралы хабарламалар алыңыз'}</li>
                            <li>${currentLanguage === 'ru' ? 'Отслеживайте прогресс в выполнении миссий' :
                                currentLanguage === 'en' ? 'Track mission completion progress' :
                                'Миссияларды орындау прогресін бақылаңыз'}</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    modal.style.display = 'flex';
    fadeInElement(modal);
    
    // Загружаем список подростковых аккаунтов
    loadTeenAccountsList();
    
    // Показываем уведомление
    showNotification(translations[currentLanguage].manageTeenAccounts, 'info');
}

function openFamilyConnectionsSection() {
    // Создаем или показываем модальное окно для семейных подключений
    const modalId = 'familyConnectionsModal';
    let modal = document.getElementById(modalId);
    
    if (!modal) {
        modal = document.createElement('div');
        modal.id = modalId;
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h3>${translations[currentLanguage].familyConnectionsTitle}</h3>
                    <button class="modal-close" onclick="closeModal('${modalId}')">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" style="padding: 20px;">
                    <div class="family-connections-container">
                        <div class="connection-type-section">
                            <h4><i class="fas fa-user-shield"></i> ${currentLanguage === 'ru' ? 'Вы - родитель' :
                                                                   currentLanguage === 'en' ? 'You are a parent' :
                                                                   'Сіз - ата-анасыз'}</h4>
                            <div class="connection-actions">
                                <button class="btn btn-primary" onclick="generateParentLink()">
                                    <i class="fas fa-link"></i> ${translations[currentLanguage].generateLink}
                                </button>
                                <p class="help-text">
                                    ${currentLanguage === 'ru' ? 'Сгенерируйте ссылку для подключения ребенка' :
                                     currentLanguage === 'en' ? 'Generate a link to connect your child' :
                                     'Балаңызды қосу үшін сілтеме жасаңыз'}
                                </p>
                            </div>
                        </div>
                        
                        <div class="connection-type-section">
                            <h4><i class="fas fa-child"></i> ${currentLanguage === 'ru' ? 'Вы - ребенок' :
                                                             currentLanguage === 'en' ? 'You are a child' :
                                                             'Сіз - баласыз'}</h4>
                            <div class="connection-actions">
                                <div class="form-group">
                                    <label>${currentLanguage === 'ru' ? 'Код подключения от родителя' :
                                           currentLanguage === 'en' ? 'Connection code from parent' :
                                           'Ата-анадан қосылым коды'}</label>
                                    <input type="text" id="parentConnectionCode" class="form-input" 
                                           placeholder="${currentLanguage === 'ru' ? 'Введите код...' :
                                                       currentLanguage === 'en' ? 'Enter code...' :
                                                       'Кодты енгізіңіз...'}">
                                </div>
                                <button class="btn btn-primary" onclick="connectToParentFromCode()">
                                    <i class="fas fa-user-plus"></i> ${translations[currentLanguage].connectChild}
                                </button>
                            </div>
                        </div>
                        
                        <div class="current-connections" id="currentConnections">
                            <h4><i class="fas fa-network-wired"></i> ${translations[currentLanguage].familyConnections}</h4>
                            <div class="empty-state">
                                <i class="fas fa-unlink"></i>
                                <p>${translations[currentLanguage].noConnections}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    modal.style.display = 'flex';
    fadeInElement(modal);
    
    // Загружаем текущие подключения
    loadCurrentConnections();
    
    // Показываем уведомление
    showNotification(translations[currentLanguage].familyConnections, 'info');
}

function openLanguageThemeSection() {
    // Создаем или показываем модальное окно для языка и темы
    const modalId = 'languageThemeModal';
    let modal = document.getElementById(modalId);
    
    if (!modal) {
        modal = document.createElement('div');
        modal.id = modalId;
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 500px;">
                <div class="modal-header">
                    <h3>${translations[currentLanguage].languageSettingsTitle}</h3>
                    <button class="modal-close" onclick="closeModal('${modalId}')">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" style="padding: 20px;">
                    <div class="language-section">
                        <h4>${translations[currentLanguage].currentLanguage}</h4>
                        <div class="language-buttons">
                            <button class="lang-btn ${currentLanguage === 'ru' ? 'active' : ''}" 
                                    data-lang="ru" onclick="changeLanguage('ru')">
                                ${translations[currentLanguage].languageRussianBtn}
                            </button>
                            <button class="lang-btn ${currentLanguage === 'kz' ? 'active' : ''}" 
                                    data-lang="kz" onclick="changeLanguage('kz')">
                                ${translations[currentLanguage].languageKazakhBtn}
                            </button>
                            <button class="lang-btn ${currentLanguage === 'en' ? 'active' : ''}" 
                                    data-lang="en" onclick="changeLanguage('en')">
                                ${translations[currentLanguage].languageEnglishBtn}
                            </button>
                        </div>
                    </div>
                    
                    <div class="theme-section" style="margin-top: 30px;">
                        <h4>${translations[currentLanguage].theme}</h4>
                        <div class="theme-buttons">
                            <button class="theme-btn ${localStorage.getItem('appTheme') === 'light' ? 'active' : ''}" 
                                    onclick="changeTheme('light')">
                                <i class="fas fa-sun"></i> ${translations[currentLanguage].themeLight}
                            </button>
                            <button class="theme-btn ${localStorage.getItem('appTheme') === 'dark' ? 'active' : ''}" 
                                    onclick="changeTheme('dark')">
                                <i class="fas fa-moon"></i> ${translations[currentLanguage].themeDark}
                            </button>
                            <button class="theme-btn ${localStorage.getItem('appTheme') === 'auto' ? 'active' : ''}" 
                                    onclick="changeTheme('auto')">
                                <i class="fas fa-adjust"></i> ${translations[currentLanguage].themeAuto}
                            </button>
                        </div>
                    </div>
                </div>
                <div class="modal-footer" style="padding: 20px; border-top: 1px solid var(--border);">
                    <button class="btn btn-primary" onclick="closeModal('${modalId}')" style="width: 100%;">
                        ${translations[currentLanguage].closeReport}
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    modal.style.display = 'flex';
    fadeInElement(modal);
    
    // Показываем уведомление
    showNotification(translations[currentLanguage].languageSettingsTitle, 'info');
}

// ========== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ДЛЯ МОДАЛЬНЫХ ОКОН ==========

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

function savePersonalData() {
    const name = document.getElementById('editName')?.value.trim();
    const lastName = document.getElementById('editLastName')?.value.trim();
    const email = document.getElementById('editEmail')?.value.trim();
    
    if (!name || !email) {
        showNotification(translations[currentLanguage].error, 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        showNotification(
            currentLanguage === 'ru' ? 'Пожалуйста, введите корректный email адрес' :
            currentLanguage === 'en' ? 'Please enter a valid email address' :
            'Дұрыс email мекенжайын енгізіңіз',
            'error'
        );
        return;
    }
    
    if (currentUser) {
        // Проверяем, не используется ли email другим пользователем
        const users = JSON.parse(localStorage.getItem('financemind_users') || '[]');
        const emailExists = users.some(user => 
            user.email === email && user.id !== currentUser.id
        );
        
        if (emailExists) {
            showNotification(
                currentLanguage === 'ru' ? 'Этот email уже используется другим пользователем' :
                currentLanguage === 'en' ? 'This email is already used by another user' :
                'Бұл email басқа пайдаланушы қолданады',
                'error'
            );
            return;
        }
        
        currentUser.name = name;
        currentUser.lastName = lastName;
        currentUser.email = email;
        
        // Обновляем в списке пользователей
        const userIndex = users.findIndex(user => user.id === currentUser.id);
        if (userIndex !== -1) {
            users[userIndex] = currentUser;
            localStorage.setItem('financemind_users', JSON.stringify(users));
        }
        
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        updateUserInterface();
        
        showNotification(translations[currentLanguage].saveProfile, 'success');
        closeModal('personalDataModal');
    }
}

function changePassword() {
    const modalId = 'changePasswordModal';
    let modal = document.getElementById(modalId);
    
    if (!modal) {
        modal = document.createElement('div');
        modal.id = modalId;
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 500px;">
                <div class="modal-header">
                    <h3>${translations[currentLanguage].changePassword}</h3>
                    <button class="modal-close" onclick="closeModal('${modalId}')">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" style="padding: 20px;">
                    <div class="form-group">
                        <label>${currentLanguage === 'ru' ? 'Текущий пароль' :
                               currentLanguage === 'en' ? 'Current password' :
                               'Ағымдағы құпия сөз'}</label>
                        <input type="password" id="currentPassword" class="form-input">
                    </div>
                    <div class="form-group">
                        <label>${currentLanguage === 'ru' ? 'Новый пароль' :
                               currentLanguage === 'en' ? 'New password' :
                               'Жаңа құпия сөз'}</label>
                        <input type="password" id="newPassword" class="form-input">
                    </div>
                    <div class="form-group">
                        <label>${currentLanguage === 'ru' ? 'Повторите новый пароль' :
                               currentLanguage === 'en' ? 'Repeat new password' :
                               'Жаңа құпия сөзді қайталаңыз'}</label>
                        <input type="password" id="confirmPassword" class="form-input">
                    </div>
                </div>
                <div class="modal-footer" style="padding: 20px; border-top: 1px solid var(--border);">
                    <button class="btn btn-primary" onclick="saveNewPassword()" style="width: 100%;">
                        <i class="fas fa-save"></i> ${translations[currentLanguage].saveChanges}
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    modal.style.display = 'flex';
    fadeInElement(modal);
}

function saveNewPassword() {
    const currentPassword = document.getElementById('currentPassword')?.value;
    const newPassword = document.getElementById('newPassword')?.value;
    const confirmPassword = document.getElementById('confirmPassword')?.value;
    
    if (!currentPassword || !newPassword || !confirmPassword) {
        showNotification(translations[currentLanguage].error, 'error');
        return;
    }
    
    if (newPassword.length < 6) {
        showNotification(
            currentLanguage === 'ru' ? 'Пароль должен содержать минимум 6 символов' :
            currentLanguage === 'en' ? 'Password must be at least 6 characters long' :
            'Құпия сөз кемінде 6 таңбадан тұруы керек',
            'error'
        );
        return;
    }
    
    if (newPassword !== confirmPassword) {
        showNotification(
            currentLanguage === 'ru' ? 'Пароли не совпадают' :
            currentLanguage === 'en' ? 'Passwords do not match' :
            'Құпия сөздер сәйкес келмейді',
            'error'
        );
        return;
    }
    
    // Проверяем текущий пароль
    if (currentUser.password !== currentPassword) {
        showNotification(
            currentLanguage === 'ru' ? 'Неверный текущий пароль' :
            currentLanguage === 'en' ? 'Incorrect current password' :
            'Қате ағымдағы құпия сөз',
            'error'
        );
        return;
    }
    
    // Обновляем пароль
    const users = JSON.parse(localStorage.getItem('financemind_users') || '[]');
    const userIndex = users.findIndex(user => user.id === currentUser.id);
    
    if (userIndex !== -1) {
        currentUser.password = newPassword;
        users[userIndex].password = newPassword;
        
        localStorage.setItem('financemind_users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        showNotification(
            currentLanguage === 'ru' ? 'Пароль успешно изменен' :
            currentLanguage === 'en' ? 'Password successfully changed' :
            'Құпия сөз сәтті өзгертілді',
            'success'
        );
        
        closeModal('changePasswordModal');
        closeModal('securityModal');
    }
}

function saveSecuritySettings() {
    const biometricToggle = document.getElementById('biometricToggle');
    const twoFactorToggle = document.getElementById('twoFactorToggle');
    
    // Сохраняем настройки безопасности
    const securitySettings = {
        biometricLogin: biometricToggle?.checked || false,
        twoFactorAuth: twoFactorToggle?.checked || false
    };
    
    // Сохраняем в настройках пользователя
    if (currentUser) {
        if (!currentUser.settings) {
            currentUser.settings = {};
        }
        currentUser.settings.security = securitySettings;
        
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Обновляем в списке пользователей
        const users = JSON.parse(localStorage.getItem('financemind_users') || '[]');
        const userIndex = users.findIndex(user => user.id === currentUser.id);
        if (userIndex !== -1) {
            users[userIndex] = currentUser;
            localStorage.setItem('financemind_users', JSON.stringify(users));
        }
    }
    
    showNotification(
        currentLanguage === 'ru' ? 'Настройки безопасности сохранены' :
        currentLanguage === 'en' ? 'Security settings saved' :
        'Қауіпсіздік баптаулары сақталды',
        'success'
    );
    
    closeModal('securityModal');
}

function loadTeenAccountsList() {
    const teenAccountsList = document.getElementById('teenAccountsList');
    if (!teenAccountsList) return;
    
    // В реальном приложении здесь был бы запрос к серверу
    // Для демонстрации используем мок-данные
    const mockTeenAccounts = [
        { id: 1, name: "Алексей Иванов", email: "alexey@example.com", connectedSince: "2024-01-15", spendingLimit: 5000 },
        { id: 2, name: "Мария Петрова", email: "maria@example.com", connectedSince: "2024-02-01", spendingLimit: 3000 }
    ];
    
    if (mockTeenAccounts.length === 0) {
        teenAccountsList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-users"></i>
                <p>${currentLanguage === 'ru' ? 'Подключенных подростковых аккаунтов пока нет' :
                   currentLanguage === 'en' ? 'No connected teen accounts yet' :
                   'Қосылған жастар аккаунттары әлі жоқ'}</p>
                <small>${currentLanguage === 'ru' ? 'Нажмите "Добавить подростковый аккаунт" для подключения' :
                       currentLanguage === 'en' ? 'Click "Add Teen Account" to connect' :
                       'Қосу үшін "Жастар аккаунтын қосу" түймесін басыңыз'}</small>
            </div>
        `;
    } else {
        teenAccountsList.innerHTML = mockTeenAccounts.map(account => `
            <div class="teen-account-card">
                <div class="teen-account-header">
                    <div class="teen-avatar">
                        ${account.name.charAt(0)}
                    </div>
                    <div class="teen-info">
                        <h4>${account.name}</h4>
                        <p>${account.email}</p>
                        <small>${currentLanguage === 'ru' ? 'Подключен с' : 
                               currentLanguage === 'en' ? 'Connected since' : 
                               'Қосылған уақыт'} ${new Date(account.connectedSince).toLocaleDateString(currentLanguage)}</small>
                    </div>
                </div>
                <div class="teen-account-stats">
                    <div class="stat">
                        <span class="stat-label">${currentLanguage === 'ru' ? 'Лимит расходов' :
                                                 currentLanguage === 'en' ? 'Spending limit' :
                                                 'Шығындар шегі'}</span>
                        <span class="stat-value">${account.spendingLimit.toLocaleString()} ₸</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">${currentLanguage === 'ru' ? 'Статус' :
                                                 currentLanguage === 'en' ? 'Status' :
                                                 'Статус'}</span>
                        <span class="status-badge active">${translations[currentLanguage].active}</span>
                    </div>
                </div>
                <div class="teen-account-actions">
                    <button class="btn btn-outline" onclick="viewTeenSpending(${account.id})">
                        <i class="fas fa-chart-line"></i> ${translations[currentLanguage].viewSpending}
                    </button>
                    <button class="btn btn-outline" onclick="setTeenLimits(${account.id})">
                        <i class="fas fa-sliders-h"></i> ${translations[currentLanguage].setLimits}
                    </button>
                </div>
            </div>
        `).join('');
    }
}

function addTeenAccount() {
    // В реальном приложении здесь была бы форма для добавления подросткового аккаунта
    // Для демонстрации показываем модальное окно с инструкцией
    const modalId = 'addTeenAccountModal';
    let modal = document.getElementById(modalId);
    
    if (!modal) {
        modal = document.createElement('div');
        modal.id = modalId;
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 500px;">
                <div class="modal-header">
                    <h3>${translations[currentLanguage].addTeenAccount}</h3>
                    <button class="modal-close" onclick="closeModal('${modalId}')">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" style="padding: 20px;">
                    <div class="instruction-steps">
                        <div class="step">
                            <div class="step-number">1</div>
                            <div class="step-content">
                                <h4>${currentLanguage === 'ru' ? 'Попросите ребенка зарегистрироваться' :
                                   currentLanguage === 'en' ? 'Ask your child to register' :
                                   'Балаңыздан тіркелуін сұраңыз'}</h4>
                                <p>${currentLanguage === 'ru' ? 'Ребенок должен выбрать тип аккаунта "Подросток" при регистрации' :
                                   currentLanguage === 'en' ? 'The child should select "Teen" account type during registration' :
                                   'Бала тіркелу кезінде "Жастар" аккаунт түрін таңдауы керек'}</p>
                            </div>
                        </div>
                        
                        <div class="step">
                            <div class="step-number">2</div>
                            <div class="step-content">
                                <h4>${currentLanguage === 'ru' ? 'Получите код подключения' :
                                   currentLanguage === 'en' ? 'Get connection code' :
                                   'Қосылу кодын алыңыз'}</h4>
                                <p>${currentLanguage === 'ru' ? 'После регистрации ребенок найдет код в разделе "Семейные подключения"' :
                                   currentLanguage === 'en' ? 'After registration, the child will find the code in "Family Connections" section' :
                                   'Тіркелгеннен кейін бала "Отбасылық қосылымдар" бөлімінде кодты табады'}</p>
                            </div>
                        </div>
                        
                        <div class="step">
                            <div class="step-number">3</div>
                            <div class="step-content">
                                <h4>${currentLanguage === 'ru' ? 'Введите код здесь' :
                                   currentLanguage === 'en' ? 'Enter code here' :
                                   'Кодты осында енгізіңіз'}</h4>
                                <div class="form-group" style="margin-top: 10px;">
                                    <input type="text" id="teenConnectionCode" class="form-input" 
                                           placeholder="${currentLanguage === 'ru' ? 'Код подключения...' :
                                                       currentLanguage === 'en' ? 'Connection code...' :
                                                       'Қосылу коды...'}">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer" style="padding: 20px; border-top: 1px solid var(--border);">
                    <button class="btn btn-primary" onclick="connectTeenAccount()" style="width: 100%;">
                        <i class="fas fa-link"></i> ${translations[currentLanguage].connectChild}
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    modal.style.display = 'flex';
    fadeInElement(modal);
}

function connectTeenAccount() {
    const code = document.getElementById('teenConnectionCode')?.value.trim();
    
    if (!code) {
        showNotification(
            currentLanguage === 'ru' ? 'Введите код подключения' :
            currentLanguage === 'en' ? 'Enter connection code' :
            'Қосылу кодын енгізіңіз',
            'error'
        );
        return;
    }
    
    // В реальном приложении здесь была бы проверка кода и подключение
    // Для демонстрации просто показываем успешное сообщение
    showNotification(
        currentLanguage === 'ru' ? 'Подростковый аккаунт успешно подключен' :
        currentLanguage === 'en' ? 'Teen account successfully connected' :
        'Жастар аккаунты сәтті қосылды',
        'success'
    );
    
    closeModal('addTeenAccountModal');
    
    // Обновляем список
    setTimeout(() => {
        loadTeenAccountsList();
    }, 500);
}

function viewTeenSpending(teenId) {
    // В реальном приложении здесь открывалась бы страница с расходами подростка
    showNotification(
        currentLanguage === 'ru' ? 'Просмотр расходов подросткового аккаунта' :
        currentLanguage === 'en' ? 'Viewing teen account spending' :
        'Жастар аккаунтының шығындарын қарау',
        'info'
    );
}

function setTeenLimits(teenId) {
    // В реальном приложении здесь открывалась бы форма установки лимитов
    showNotification(
        currentLanguage === 'ru' ? 'Установка лимитов для подросткового аккаунта' :
        currentLanguage === 'en' ? 'Setting limits for teen account' :
        'Жастар аккаунтына шектеулерді орнату',
        'info'
    );
}

function generateParentLink() {
    // Генерируем уникальный код для подключения
    const connectionCode = 'FM' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substr(2, 4).toUpperCase();
    
    // Сохраняем код для текущего пользователя
    if (currentUser) {
        if (!currentUser.connectionCodes) {
            currentUser.connectionCodes = [];
        }
        currentUser.connectionCodes.push({
            code: connectionCode,
            generatedAt: new Date().toISOString(),
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 дней
        });
        
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Обновляем в списке пользователей
        const users = JSON.parse(localStorage.getItem('financemind_users') || '[]');
        const userIndex = users.findIndex(user => user.id === currentUser.id);
        if (userIndex !== -1) {
            users[userIndex] = currentUser;
            localStorage.setItem('financemind_users', JSON.stringify(users));
        }
    }
    
    // Показываем код пользователю
    const modalId = 'connectionLinkModal';
    let modal = document.getElementById(modalId);
    
    if (!modal) {
        modal = document.createElement('div');
        modal.id = modalId;
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 500px;">
                <div class="modal-header">
                    <h3>${translations[currentLanguage].connectionLink}</h3>
                    <button class="modal-close" onclick="closeModal('${modalId}')">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" style="padding: 20px;">
                    <div class="connection-code-display">
                        <div class="code-box">
                            <code style="font-size: 24px; letter-spacing: 2px; font-weight: bold; color: var(--primary);">${connectionCode}</code>
                        </div>
                        <p style="margin-top: 15px; color: var(--text-light); font-size: 14px;">
                            ${currentLanguage === 'ru' ? 'Дайте этот код ребенку для подключения к вашему аккаунту. Код действителен 7 дней.' :
                             currentLanguage === 'en' ? 'Give this code to your child to connect to your account. The code is valid for 7 days.' :
                             'Балаңызға аккаунтыңызға қосу үшін бұл кодты беріңіз. Код 7 күн бойы жарамды.'}
                        </p>
                    </div>
                    
                    <div class="connection-actions" style="margin-top: 20px; display: flex; gap: 10px;">
                        <button class="btn btn-primary" onclick="copyConnectionCode('${connectionCode}')" style="flex: 1;">
                            <i class="fas fa-copy"></i> ${translations[currentLanguage].copyLink}
                        </button>
                        <button class="btn btn-outline" onclick="shareConnectionCode('${connectionCode}')" style="flex: 1;">
                            <i class="fas fa-share-alt"></i> ${translations[currentLanguage].shareLink}
                        </button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    } else {
        // Обновляем код в существующем модальном окне
        const codeBox = modal.querySelector('.code-box code');
        if (codeBox) {
            codeBox.textContent = connectionCode;
        }
    }
    
    modal.style.display = 'flex';
    fadeInElement(modal);
}

function copyConnectionCode(code) {
    navigator.clipboard.writeText(code).then(() => {
        showNotification(translations[currentLanguage].linkCopied, 'success');
    }).catch(err => {
        console.error('Failed to copy code:', err);
        showNotification(translations[currentLanguage].error, 'error');
    });
}

function shareConnectionCode(code) {
    const shareText = currentLanguage === 'ru' 
        ? `Привет! Вот код для подключения к моему аккаунту в FinanceMind: ${code}\nВведи его в разделе "Семейные подключения".`
        : currentLanguage === 'en'
        ? `Hi! Here's the code to connect to my FinanceMind account: ${code}\nEnter it in the "Family Connections" section.`
        : `Сәлем! FinanceMind-тегі аккаунтымға қосу коды: ${code}\nОны "Отбасылық қосылымдар" бөлімінде енгізіңіз.`;
    
    if (navigator.share) {
        navigator.share({
            title: translations[currentLanguage].appTitle,
            text: shareText,
        });
    } else {
        // Fallback для браузеров без поддержки Web Share API
        copyConnectionCode(code);
    }
}

function connectToParentFromCode() {
    const code = document.getElementById('parentConnectionCode')?.value.trim();
    
    if (!code) {
        showNotification(
            currentLanguage === 'ru' ? 'Введите код подключения' :
            currentLanguage === 'en' ? 'Enter connection code' :
            'Қосылу кодын енгізіңіз',
            'error'
        );
        return;
    }
    
    // В реальном приложении здесь была бы проверка кода и подключение к родительскому аккаунту
    // Для демонстрации просто показываем успешное сообщение
    showNotification(
        currentLanguage === 'ru' ? 'Вы успешно подключились к родительскому аккаунту' :
        currentLanguage === 'en' ? 'You have successfully connected to parent account' :
        'Сіз ата-ана аккаунтына сәтті қосылдыңыз',
        'success'
    );
    
    closeModal('familyConnectionsModal');
}

function loadCurrentConnections() {
    const currentConnections = document.getElementById('currentConnections');
    if (!currentConnections) return;
    
    // В реальном приложении здесь загружались бы реальные подключения
    // Для демонстрации показываем мок-данные
    const mockConnections = currentUser?.accountType === 'parent' 
        ? [
            { type: 'child', name: "Алексей Иванов", email: "alexey@example.com", connectedSince: "2024-01-15" }
        ]
        : currentUser?.accountType === 'teen'
        ? [
            { type: 'parent', name: "Иван Иванов", email: "ivan@example.com", connectedSince: "2024-01-15" }
        ]
        : [];
    
    if (mockConnections.length === 0) {
        currentConnections.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-unlink"></i>
                <p>${translations[currentLanguage].noConnections}</p>
            </div>
        `;
    } else {
        currentConnections.innerHTML = mockConnections.map(connection => `
            <div class="connection-card">
                <div class="connection-header">
                    <div class="connection-avatar ${connection.type}">
                        <i class="fas fa-${connection.type === 'parent' ? 'user-shield' : 'child'}"></i>
                    </div>
                    <div class="connection-info">
                        <h4>${connection.name}</h4>
                        <p>${connection.email}</p>
                        <small>${connection.type === 'parent' 
                               ? translations[currentLanguage].parentAccount
                               : translations[currentLanguage].childAccounts} • 
                               ${currentLanguage === 'ru' ? 'Подключен с' : 
                                currentLanguage === 'en' ? 'Connected since' : 
                                'Қосылған уақыт'} ${new Date(connection.connectedSince).toLocaleDateString(currentLanguage)}</small>
                    </div>
                </div>
                <div class="connection-actions">
                    <button class="btn btn-outline" onclick="viewConnectionDetails('${connection.type}')">
                        <i class="fas fa-eye"></i> ${connection.type === 'parent' 
                            ? translations[currentLanguage].viewParentDashboard
                            : translations[currentLanguage].viewChildStats}
                    </button>
                    <button class="btn btn-danger" onclick="disconnectAccount('${connection.type}')">
                        <i class="fas fa-unlink"></i> ${translations[currentLanguage].disconnect}
                    </button>
                </div>
            </div>
        `).join('');
    }
}

function viewConnectionDetails(connectionType) {
    if (connectionType === 'parent') {
        showNotification(
            currentLanguage === 'ru' ? 'Просмотр родительской панели управления' :
            currentLanguage === 'en' ? 'Viewing parent dashboard' :
            'Ата-ана басқару панелін қарау',
            'info'
        );
    } else {
        showNotification(
            currentLanguage === 'ru' ? 'Просмотр статистики ребенка' :
            currentLanguage === 'en' ? 'Viewing child statistics' :
            'Бала статистикасын қарау',
            'info'
        );
    }
}

function disconnectAccount(connectionType) {
    const confirmText = currentLanguage === 'ru' 
        ? `Вы уверены, что хотите отключить ${connectionType === 'parent' ? 'родительский' : 'дочерний'} аккаунт?`
        : currentLanguage === 'en'
        ? `Are you sure you want to disconnect the ${connectionType === 'parent' ? 'parent' : 'child'} account?`
        : `${connectionType === 'parent' ? 'Ата-ана' : 'Бала'} аккаунтын ажыратуға сенімдісіз бе?`;
    
    if (confirm(confirmText)) {
        showNotification(
            currentLanguage === 'ru' ? 'Аккаунт успешно отключен' :
            currentLanguage === 'en' ? 'Account successfully disconnected' :
            'Аккаунт сәтті ажыратылды',
            'success'
        );
        
        // Обновляем список подключений
        setTimeout(() => {
            loadCurrentConnections();
        }, 500);
    }
}

// ========== ОБНОВЛЕННЫЙ AI ПОМОЩНИК С ПРОМПТОМ ==========

function getAIResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Базовые ответы из промпта
    const baseResponses = {
        ru: [
            "Сегодня можем разобрать траты, поставить цель или просто сэкономить немного денег.",
            "В этот раз я научу тебя простому и понятному управлению деньгами.",
            "Хочешь попробовать челлендж — сэкономить 5 000 ₸ за 3 дня?",
            "Сегодня могу дать тебе финансовый совет дня — это займёт меньше минуты.",
            "Давай начнём с малого: посмотрим, куда уходят твои деньги.",
            "Могу помочь составить план расходов на ближайшие 3 дня.",
            "Сегодня научу тебя откладывать деньги так, чтобы это было незаметно.",
            "Если не знаешь, что спросить — я предложу полезную тему сам."
        ],
        en: [
            "Today we can analyze expenses, set a goal, or just save some money.",
            "This time I'll teach you simple and understandable money management.",
            "Want to try a challenge - save 5,000 ₸ in 3 days?",
            "Today I can give you a financial tip of the day - it will take less than a minute.",
            "Let's start small: let's see where your money goes.",
            "I can help create a spending plan for the next 3 days.",
            "Today I'll teach you how to save money so it's unnoticeable.",
            "If you don't know what to ask - I'll suggest a useful topic myself."
        ],
        kz: [
            "Бүгін шығындарды талдай аламыз, мақсат қоя аламыз немесе жай ғана ақша үнемдей аламыз.",
            "Осы жолы мен сізге қарапайым және түсінікті ақшаны басқаруды үйретемін.",
            "Сынақты байқап көргіңіз келе ме — 3 күнде 5 000 ₸ үнемдеу?",
            "Бүгін сізге күннің қаржылық кеңесін бере аламын — бұл бір минуттан аз уақыт алады.",
            "Кішкене нәрседен бастайық: ақшаңыз қайда кететінін қарайық.",
            "Келесі 3 күнге шығындар жоспарын құруға көмектесе аламын.",
            "Бүгін сізге ақшаны байқалмайтындай етіп үнемдеуді үйретемін.",
            "Егер не сұрау керектігін білмесеңіз — мен пайдалы тақырыпты өзім ұсынамын."
        ]
    };
    
    // Универсальные фразы из промпта
    const universalPhrases = {
        ru: [
            "Хочешь, я дам тебе 5 финансовых советов на сегодня?",
            "Опиши свою ситуацию, и я подскажу решение.",
            "Хочешь быстрый совет или подробный разбор?",
            "Могу предложить несколько вариантов, а ты выберешь.",
            "Я объясню это простыми словами и на примере."
        ],
        en: [
            "Want me to give you 5 financial tips for today?",
            "Describe your situation and I'll suggest a solution.",
            "Want a quick tip or detailed analysis?",
            "I can suggest several options, and you choose.",
            "I'll explain it in simple words and with examples."
        ],
        kz: [
            "Бүгін сізге 5 қаржылық кеңес бергім келе ме?",
            "Жағдайыңызды сипаттаңыз, мен шешімді ұсынамын.",
            "Жылдам кеңес немесе егжей-тегжейлі талдау керек пе?",
            "Бірнеше нұсқаны ұсына аламын, ал сіз таңдайсыз.",
            "Мен оны қарапайым сөздермен және мысалдармен түсіндіремін."
        ]
    };
    
    // Ответы на конкретные вопросы из промпта
    if (lowerMessage.includes('что будем делать') || lowerMessage.includes('what shall we do') || lowerMessage.includes('не істейік')) {
        const responses = {
            ru: [
                "Давай проверим твои последние расходы и найдём, где можно сэкономить. Могу составить план на неделю или помочь с целями.",
                "Сегодня можем проанализировать твои траты за месяц. Хочешь, покажу самые крупные расходы и дам советы по оптимизации?",
                "Предлагаю начать с постановки финансовой цели. О чём ты мечтаешь? Помогу разбить на шаги и рассчитать сроки."
            ],
            en: [
                "Let's check your recent expenses and find where you can save. I can create a weekly plan or help with goals.",
                "Today we can analyze your monthly spending. Want me to show the biggest expenses and give optimization tips?",
                "I suggest starting with setting a financial goal. What are you dreaming about? I'll help break it down into steps and calculate timelines."
            ],
            kz: [
                "Соңғы шығындарыңызды тексеріп, үнемдеуге болатын жерлерді табайық. Апталық жоспар құра аламын немесе мақсаттарға көмектесе аламын.",
                "Бүгін айлық шығындарыңызды талдай аламыз. Ең үлкен шығындарды көрсетіп, оңтайландыру бойынша кеңестер бергім келе ме?",
                "Қаржылық мақсатты белгілеуден бастауды ұсынамын. Сіз не туралы армандайсыз? Оны қадамдарға бөлуге және мерзімдерді есептеуге көмектесемін."
            ]
        };
        
        const randomResponse = responses[currentLanguage][Math.floor(Math.random() * responses[currentLanguage].length)];
        const randomUniversal = universalPhrases[currentLanguage][Math.floor(Math.random() * universalPhrases[currentLanguage].length)];
        
        return `${randomResponse} ${randomUniversal}`;
    }
    
    if (lowerMessage.includes('чему ты меня научишь') || lowerMessage.includes('what will you teach me') || lowerMessage.includes('маған не үйретесің')) {
        const responses = {
            ru: [
                "Научу основам бюджетирования и помогу наладить контроль над финансами. Начнём с анализа текущих расходов?",
                "Покажу, как ставить реальные финансовые цели и достигать их. Хочешь попробовать создать первую цель прямо сейчас?",
                "Расскажу про разные методы экономии и помогу выбрать подходящий именно тебе. Давай обсудим твои привычки в тратах."
            ],
            en: [
                "I'll teach you the basics of budgeting and help you gain control over your finances. Let's start with analyzing current expenses?",
                "I'll show you how to set realistic financial goals and achieve them. Want to try creating your first goal right now?",
                "I'll tell you about different saving methods and help you choose the one that suits you. Let's discuss your spending habits."
            ],
            kz: [
                "Бюджеттеудің негіздерін үйретемін және қаржыларды бақылауға көмектесемін. Ағымдағы шығындарды талдаудан бастайық?",
                "Реалистік қаржылық мақсаттарды қалай белгілеуге және оларға қалай жетуге болатынын көрсетемін. Дәл қазір бірінші мақсатыңызды құруға тырысқыңыз келе ме?",
                "Әртүрлі үнемдеу әдістері туралы айтып, сізге лайықтысын таңдауға көмектесемін. Шығындар әдеттеріңізді талқылайық."
            ]
        };
        
        const randomResponse = responses[currentLanguage][Math.floor(Math.random() * responses[currentLanguage].length)];
        const randomBase = baseResponses[currentLanguage][Math.floor(Math.random() * baseResponses[currentLanguage].length)];
        
        return `${randomResponse} ${randomBase}`;
    }
    
    if (lowerMessage.includes('как сэкономить 5000') || lowerMessage.includes('how to save 5000') || lowerMessage.includes('5000 үнемдеу')) {
        const response = {
            ru: "Мы временно сократим мелкие траты: еду вне дома, спонтанные покупки и ненужные подписки. Хочешь, я составлю простой план на 3 дня или дам быстрый чек-лист?",
            en: "We'll temporarily reduce small expenses: eating out, spontaneous purchases, and unnecessary subscriptions. Want me to create a simple 3-day plan or give a quick checklist?",
            kz: "Біз уақытша кішкентай шығындарды азайтамыз: үйден тыс тамақтану, импульстік сатып алулар және қажетсіз жазылымдар. 3 күндік қарапайым жоспар құрайын ба, әлде жылдам тексеру тізімін берейін бе?"
        };
        
        return response[currentLanguage];
    }
    
    // Приветственные сообщения
    if (lowerMessage.includes('привет') || lowerMessage.includes('hello') || lowerMessage.includes('hi') || 
        lowerMessage.includes('сәлем') || lowerMessage.includes('салем') || lowerMessage.includes('здравствуй')) {
        const greetings = {
            ru: [
                "Привет! Рад тебя видеть. Сегодня можем разобрать траты или поставить новую финансовую цель. С чего начнём?",
                "Здравствуй! Готов помочь с финансами. Хочешь быстрый совет или планируем что-то серьёзное?",
                "Приветствую! Вижу, ты зашёл проверить свои финансы. Давай сделаем это продуктивно - что тебя беспокоит?"
            ],
            en: [
                "Hello! Glad to see you. Today we can analyze expenses or set a new financial goal. Where shall we start?",
                "Hi! Ready to help with finances. Want a quick tip or planning something serious?",
                "Welcome! I see you've come to check your finances. Let's make it productive - what's bothering you?"
            ],
            kz: [
                "Сәлем! Сені көргеніме қуаныштымын. Бүгін шығындарды талдай аламыз немесе жаңа қаржылық мақсат қоя аламыз. Қайдан бастайық?",
                "Сәлеметсіз бе! Қаржыларыңызға көмектесуге дайынмын. Жылдам кеңес керек пе, әлде бір нәрсені жоспарлайсыз ба?",
                "Қош келдіңіз! Қаржыларыңызды тексеруге келгеніңізді көріп тұрмын. Оны өнімді етейік - сізді не мазалайды?"
            ]
        };
        
        const randomGreeting = greetings[currentLanguage][Math.floor(Math.random() * greetings[currentLanguage].length)];
        const randomUniversal = universalPhrases[currentLanguage][Math.floor(Math.random() * universalPhrases[currentLanguage].length)];
        
        return `${randomGreeting} ${randomUniversal}`;
    }
    
    // Вопросы о расходах
    if (lowerMessage.includes('расход') || lowerMessage.includes('expense') || lowerMessage.includes('трат') || 
        lowerMessage.includes('шығын') || lowerMessage.includes('қанша жұмсадым')) {
        const responses = {
            ru: [
                "Чтобы добавить расход, перейдите в раздел 'Аналитика' и нажмите 'Добавить расход'. Но давай сначала посмотрим твою статистику - есть интересные закономерности.",
                "Я вижу твои последние траты. Хочешь, покажу категории, где можно сэкономить? Или лучше составим план на следующую неделю?",
                "Работа с расходами - основа финансового контроля. Сегодня могу дать тебе 3 простых советы по оптимизации трат. Интересно?"
            ],
            en: [
                "To add an expense, go to the 'Analytics' section and click 'Add Expense'. But let's first look at your statistics - there are interesting patterns.",
                "I see your recent expenses. Want me to show categories where you can save? Or better create a plan for next week?",
                "Working with expenses is the basis of financial control. Today I can give you 3 simple tips for optimizing spending. Interested?"
            ],
            kz: [
                "Шығын қосу үшін 'Аналитика' бөліміне өтіп, 'Шығын қосу' түймесін басыңыз. Бірақ алдымен статистикаңызды қарайық - қызықты заңдылықтар бар.",
                "Соңғы шығындарыңызды көріп тұрмын. Үнемдеуге болатын санаттарды көрсетейін бе? Немесе келесі аптаға жоспар құрайық?",
                "Шығындармен жұмыс істеу - қаржылық бақылаудың негізі. Бүгін сізге шығындарды оңтайландыру бойынша 3 қарапайым кеңес бере аламын. Қызықты ма?"
            ]
        };
        
        const randomResponse = responses[currentLanguage][Math.floor(Math.random() * responses[currentLanguage].length)];
        const randomBase = baseResponses[currentLanguage][Math.floor(Math.random() * baseResponses[currentLanguage].length)];
        
        return `${randomResponse} ${randomBase}`;
    }
    
    // Вопросы о накоплениях
    if (lowerMessage.includes('накоп') || lowerMessage.includes('save') || lowerMessage.includes('экономи') || 
        lowerMessage.includes('жинақ') || lowerMessage.includes('үнемдеу')) {
        const responses = {
            ru: [
                "Для накоплений рекомендую установить финансовые цели. Но давай начнём с малого - попробуй откладывать 10% от любой суммы, которую получаешь. Работает безотказно!",
                "Вижу, у тебя уже есть цели. Хочешь, оптимизируем их или поставим новую? Могу показать, как быстрее достичь желаемого.",
                "Секрет накоплений - в регулярности. Сегодня научу тебя трём методикам, которые действительно работают. Готов узнать?"
            ],
            en: [
                "For savings, I recommend setting financial goals. But let's start small - try saving 10% of any amount you receive. Works flawlessly!",
                "I see you already have goals. Want to optimize them or set a new one? I can show you how to achieve what you want faster.",
                "The secret of savings is regularity. Today I'll teach you three methods that really work. Ready to learn?"
            ],
            kz: [
                "Жинақтар үшін қаржылық мақсаттарды белгілеуді ұсынамын. Бірақ кішкене нәрседен бастайық - алатын кез келген соманың 10% үнемдеуге тырысыңыз. Жақсы жұмыс істейді!",
                "Сізде мақсаттар бар екенін көріп тұрмын. Оларды оңтайландырайық ба, әлде жаңасын белгілейік бе? Қалаған нәрсеңізге тезірек қалай жетуге болатынын көрсете аламын.",
                "Жинақтардың құпиясы - үнемділікте. Бүгін сізге шынымен жұмыс істейтін үш әдісті үйретемін. Білгіңіз келе ме?"
            ]
        };
        
        const randomResponse = responses[currentLanguage][Math.floor(Math.random() * responses[currentLanguage].length)];
        const randomUniversal = universalPhrases[currentLanguage][Math.floor(Math.random() * universalPhrases[currentLanguage].length)];
        
        return `${randomResponse} ${randomUniversal}`;
    }
    
    // Вопросы о бюджете
    if (lowerMessage.includes('бюджет') || lowerMessage.includes('budget')) {
        const responses = {
            ru: [
                "Бюджетирование - ключ к финансовому успеху. Попробуй правило 50/30/20. Хочешь, помогу адаптировать его под твои доходы?",
                "Вижу, ты интересуешься планированием. Могу составить персональный бюджет на месяц. Для этого нужно знать твои основные категории расходов.",
                "Работа с бюджетом не должна быть сложной. Сегодня научу тебя простой системе, которую можно вести за 5 минут в день. Начнём?"
            ],
            en: [
                "Budgeting is key to financial success. Try the 50/30/20 rule. Want me to help adapt it to your income?",
                "I see you're interested in planning. I can create a personal monthly budget. For this, I need to know your main expense categories.",
                "Working with a budget shouldn't be difficult. Today I'll teach you a simple system that can be maintained in 5 minutes a day. Shall we start?"
            ],
            kz: [
                "Бюджеттеу - қаржылық табысқа жетудің кілті. 50/30/20 ережесін пайдаланып көріңіз. Оны сіздің табысыңызға бейімдеуге көмектесейін бе?",
                "Жоспарлауға қызығатыныңызды көріп тұрмын. Жеке айлық бюджет құра аламын. Бұл үшін сіздің негізгі шығын санаттарыңызды білуім керек.",
                "Бюджетпен жұмыс істеу қиын болмауы керек. Бүгін сізге күніне 5 минутта жүргізуге болатын қарапайым жүйені үйретемін. Бастайық па?"
            ]
        };
        
        const randomResponse = responses[currentLanguage][Math.floor(Math.random() * responses[currentLanguage].length)];
        const randomBase = baseResponses[currentLanguage][Math.floor(Math.random() * baseResponses[currentLanguage].length)];
        
        return `${randomResponse} ${randomBase}`;
    }
    
    // Если вопрос не распознан - используем комбинацию из промпта
    const randomBase = baseResponses[currentLanguage][Math.floor(Math.random() * baseResponses[currentLanguage].length)];
    const randomUniversal = universalPhrases[currentLanguage][Math.floor(Math.random() * universalPhrases[currentLanguage].length)];
    
    return `${randomBase} ${randomUniversal}`;
}

// ========== ФУНКЦИИ ДЛЯ ЧАТА С КНОПКОЙ ОЧИСТКИ ==========

let currentChatPage = 0;
const CHATS_PER_PAGE = 20;

function renderChatMessagesWithHistory() {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    chatMessages.innerHTML = '';
    
    const startIndex = Math.max(0, chatHistory.length - CHATS_PER_PAGE - (currentChatPage * 10));
    const endIndex = chatHistory.length - (currentChatPage * 10);
    const messagesToShow = chatHistory.slice(startIndex, endIndex);
    
    if (messagesToShow.length === 0 && chatHistory.length > 0) {
        chatMessages.innerHTML = `
            <div class="chat-history-navigation">
                <button class="btn btn-outline" onclick="loadOlderChats()">
                    <i class="fas fa-history"></i>
                    ${currentLanguage === 'ru' ? 'Загрузить предыдущие сообщения' : 
                     currentLanguage === 'en' ? 'Load older messages' : 
                     'Алдыңғы хабарламаларды жүктеу'}
                </button>
            </div>
        `;
    } else if (messagesToShow.length === 0) {
        chatMessages.innerHTML = `
            <div class="empty-chat-state">
                <i class="fas fa-comments"></i>
                <p>${currentLanguage === 'ru' ? 'Начните диалог с AI-помощником' : 
                    currentLanguage === 'en' ? 'Start a conversation with AI assistant' : 
                    'ЖК-көмекшімен сөйлесуді бастаңыз'}</p>
            </div>
        `;
    } else {
        messagesToShow.forEach(message => {
            const time = new Date(message.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            const date = new Date(message.timestamp).toLocaleDateString(currentLanguage, {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            });
            
            if (message.type === 'user') {
                chatMessages.innerHTML += `
                    <div class="message message-user">
                        <div class="message-content">${message.content}</div>
                        <div class="message-time">${time} • ${date}</div>
                    </div>
                `;
            } else {
                chatMessages.innerHTML += `
                    <div class="message message-ai">
                        <div class="message-content">${message.content}</div>
                        <div class="message-time">${time} • ${date}</div>
                    </div>
                `;
            }
        });
        
        if (startIndex > 0) {
            chatMessages.innerHTML = `
                <div class="chat-history-navigation">
                    <button class="btn btn-outline" onclick="loadOlderChats()">
                        <i class="fas fa-history"></i>
                        ${currentLanguage === 'ru' ? 'Загрузить предыдущие сообщения' : 
                         currentLanguage === 'en' ? 'Load older messages' : 
                         'Алдыңғы хабарламаларды жүктеу'}
                    </button>
                </div>
            ` + chatMessages.innerHTML;
        }
    }
    
    if (currentChatPage === 0) {
        setTimeout(() => {
            scrollChatToBottom();
        }, 100);
    }
}

function updateChat() {
    renderChatMessagesWithHistory();
    setTimeout(() => {
        scrollChatToBottom();
        fixChatScroll();
        updateChatHeader();
    }, 50);
}

function updateChatHeader() {
    const chatHeader = document.querySelector('.chat-header');
    if (!chatHeader) return;
    
    // Обновляем заголовок
    const chatTitle = chatHeader.querySelector('h2');
    if (chatTitle) {
        chatTitle.textContent = translations[currentLanguage].chatNav;
    }
    
    // Проверяем, есть ли уже кнопка очистки в другом месте (например, внутри чата)
    const existingClearBtn = document.querySelector('.clear-chat-history-btn');
    if (existingClearBtn) {
        existingClearBtn.remove();
    }
    
    // Добавляем кнопку очистки в удобное место
    const chatMessages = document.getElementById('chatMessages');
    if (chatMessages && !document.querySelector('.clear-chat-history-btn')) {
        const clearButton = document.createElement('button');
        clearButton.className = 'btn btn-outline clear-chat-history-btn';
        clearButton.style.cssText = `
            position: absolute;
            bottom: 80px;
            right: 20px;
            z-index: 100;
            padding: 8px 16px;
            font-size: 14px;
        `;
        clearButton.innerHTML = `<i class="fas fa-trash-alt"></i> ${translations[currentLanguage].clearChatButton}`;
        clearButton.onclick = clearChatHistory;
        
        // Добавляем кнопку в чат
        const chatContainer = document.getElementById('chat');
        if (chatContainer) {
            chatContainer.appendChild(clearButton);
        }
    }
}

function loadOlderChats() {
    currentChatPage++;
    renderChatMessagesWithHistory();
}

function clearChatHistory() {
    const confirmText = translations[currentLanguage].deleteChatConfirm;
    
    if (confirm(confirmText)) {
        chatHistory = [{
            type: 'ai',
            content: translations[currentLanguage].welcomeMessage,
            timestamp: new Date().toISOString()
        }];
        saveChatHistory();
        currentChatPage = 0;
        renderChatMessagesWithHistory();
        
        showNotification(
            currentLanguage === 'ru' ? 'История чата очищена' :
            currentLanguage === 'en' ? 'Chat history cleared' :
            'Чат тарихы тазартылды',
            'success'
        );
    }
}

function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    
    if (!chatInput || !chatMessages) return;
    
    const message = chatInput.value.trim();
    if (!message) return;
    
    currentChatPage = 0;
    
    const userMessage = {
        type: 'user',
        content: message,
        timestamp: new Date().toISOString()
    };
    
    chatHistory.push(userMessage);
    saveChatHistory();
    renderChatMessagesWithHistory();
    
    chatInput.value = '';
    
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'message message-ai typing-indicator';
    typingIndicator.innerHTML = `
        <div class="message-content">
            <div class="typing-dots">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        </div>
    `;
    chatMessages.appendChild(typingIndicator);
    
    scrollChatToBottom();
    
    setTimeout(() => {
        if (typingIndicator.parentNode) {
            typingIndicator.parentNode.removeChild(typingIndicator);
        }
        
        const aiResponse = getAIResponse(message);
        const aiMessage = {
            type: 'ai',
            content: aiResponse,
            timestamp: new Date().toISOString()
        };
        
        chatHistory.push(aiMessage);
        saveChatHistory();
        renderChatMessagesWithHistory();
        
        scrollChatToBottom();
    }, 1500 + Math.random() * 1000);
}

// НОВАЯ ФУНКЦИЯ: добавление кнопки очистки чата
function addClearChatButton() {
    // Проверяем, есть ли уже кнопка очистки
    if (document.querySelector('.clear-chat-btn')) return;
    
    const chatContainer = document.getElementById('chat');
    if (!chatContainer) return;
    
    // Находим контейнер с сообщениями
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    // Добавляем кнопку очистки в нижней части чата
    const clearButton = document.createElement('button');
    clearButton.className = 'btn btn-outline clear-chat-btn';
    clearButton.style.cssText = `
        margin: 10px auto;
        display: block;
        background: rgba(244, 67, 54, 0.1);
        color: #F44336;
        border-color: #F44336;
    `;
    clearButton.innerHTML = `<i class="fas fa-trash-alt"></i> ${translations[currentLanguage].clearChatButton}`;
    clearButton.onclick = clearChatHistory;
    
    // Добавляем кнопку после сообщений
    chatMessages.appendChild(clearButton);
}

// Обновляем функцию updateChat
function updateChat() {
    renderChatMessagesWithHistory();
    
    setTimeout(() => {
        scrollChatToBottom();
        fixChatScroll();
        
        // Добавляем кнопку очистки напрямую
        addClearChatButton();
    }, 50);
}

// Обновляем функцию showPage для чата
function showPage(page) {
    const mainPages = ['dashboard', 'analytics', 'missions', 'store', 'settings', 'chat', 'adminPanel'];
    
    mainPages.forEach(p => {
        const pageElement = document.getElementById(p);
        if (pageElement) {
            pageElement.style.display = 'none';
        }
    });
    
    const targetPage = document.getElementById(page);
    if (targetPage) {
        targetPage.style.display = 'block';
        fadeInElement(targetPage);
        targetPage.classList.add('scroll-container');
    }
    
    const modals = document.querySelectorAll('.modal-overlay');
    modals.forEach(modal => {
        if (modal.id !== 'goalModal' && modal.id !== 'instructionModal' && modal.id !== 'reportModal') {
            modal.style.display = 'none';
        }
    });
    
    updateHeaderTitle(page);
    updateActiveNavigation(page);
    
    if (page === 'chat') {
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            scrollChatToBottom();
            fixChatScroll();
            // Вместо updateChatHeader() используем прямую инициализацию
            renderChatMessagesWithHistory();
            addClearChatButton();
        }, 100);
    } else {
        document.body.style.overflow = 'auto';
    }
    
    if (page === 'analytics' && currentUser) {
        const userData = JSON.parse(localStorage.getItem(`userData_${currentUser.id}`) || '{}');
        userData.analyticsViews = (userData.analyticsViews || 0) + 1;
        localStorage.setItem(`userData_${currentUser.id}`, JSON.stringify(userData));
    }
    
    if (currentUser && page === 'dashboard') {
        const userData = JSON.parse(localStorage.getItem(`userData_${currentUser.id}`) || '{}');
        userData.appVisits = (userData.appVisits || 0) + 1;
        localStorage.setItem(`userData_${currentUser.id}`, JSON.stringify(userData));
        updateMissionsProgress();
    }
    
    updatePageContent(page);
    
    setTimeout(() => {
        fixButtonSizes();
        fixScrollIssues();
        if (page === 'settings') {
            fixAccountManagementButtons();
            addLogoutButtonToSettings();
        }
    }, 50);
}
// ========== ДОБАВЛЕНИЕ КНОПКИ ВЫЙТИ В НАСТРОЙКИ ==========

function addLogoutButtonToSettings() {
    const settingsPage = document.getElementById('settings');
    if (!settingsPage) return;
    
    // Проверяем, есть ли уже кнопка выхода
    let logoutButton = document.getElementById('logoutButtonContainer');
    
    if (!logoutButton) {
        logoutButton = document.createElement('div');
        logoutButton.id = 'logoutButtonContainer';
        logoutButton.className = 'settings-section';
        logoutButton.style.marginTop = '30px';
        logoutButton.style.paddingTop = '20px';
        logoutButton.style.borderTop = '1px solid var(--border)';
        
        logoutButton.innerHTML = `
            <button class="btn btn-danger" onclick="logout()" style="width: 100%;">
                <i class="fas fa-sign-out-alt"></i> ${translations[currentLanguage].logout}
            </button>
            <p style="text-align: center; margin-top: 10px; color: var(--text-light); font-size: 14px;">
                ${currentLanguage === 'ru' ? 'Выйти из текущего аккаунта' :
                 currentLanguage === 'en' ? 'Log out from current account' :
                 'Ағымдағы аккаунтан шығу'}
            </p>
        `;
        
        // Добавляем кнопку в конец настроек
        settingsPage.appendChild(logoutButton);
    }
}

// ========== ИСПРАВЛЕНИЕ КНОПОК УПРАВЛЕНИЯ АККАУНТОМ ==========

function fixAccountManagementButtons() {
    // Находим все элементы управления аккаунтом
    const personalDataBtn = document.querySelector('[onclick*="personalData"]');
    const securityBtn = document.querySelector('[onclick*="security"]');
    const teenAccountsBtn = document.querySelector('[onclick*="teenAccounts"]');
    const familyConnectionsBtn = document.querySelector('[onclick*="familyConnections"]');
    const languageThemeBtn = document.querySelector('[onclick*="languageTheme"]');
    
    // Удаляем старые обработчики событий
    if (personalDataBtn) {
        personalDataBtn.removeAttribute('onclick');
        personalDataBtn.addEventListener('click', () => openPersonalDataSection());
    }
    
    if (securityBtn) {
        securityBtn.removeAttribute('onclick');
        securityBtn.addEventListener('click', () => openSecuritySection());
    }
    
    if (teenAccountsBtn) {
        teenAccountsBtn.removeAttribute('onclick');
        teenAccountsBtn.addEventListener('click', () => openTeenAccountsSection());
    }
    
    if (familyConnectionsBtn) {
        familyConnectionsBtn.removeAttribute('onclick');
        familyConnectionsBtn.addEventListener('click', () => openFamilyConnectionsSection());
    }
    
    if (languageThemeBtn) {
        languageThemeBtn.removeAttribute('onclick');
        languageThemeBtn.addEventListener('click', () => openLanguageThemeSection());
    }
}

// ========== ОСНОВНЫЕ ФУНКЦИИ ==========

function showLoginForm() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (!loginForm || !registerForm) {
        console.error('Формы логина или регистрации не найдены');
        return;
    }
    
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
    
    const emailField = document.getElementById('email');
    const passwordField = document.getElementById('password');
    if (emailField) emailField.value = '';
    if (passwordField) passwordField.value = '';
    
    clearFormErrors();
    
    fadeInElement(loginForm);
}

function showRegisterForm() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (!loginForm || !registerForm) {
        console.error('Формы логина или регистрации не найдены');
        return;
    }
    
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
    
    const regName = document.getElementById('regName');
    const regLastName = document.getElementById('regLastName');
    const regEmail = document.getElementById('regEmail');
    const regPassword = document.getElementById('regPassword');
    
    if (regName) regName.value = '';
    if (regLastName) regLastName.value = '';
    if (regEmail) regEmail.value = '';
    if (regPassword) regPassword.value = '';
    
    clearFormErrors();
    
    setTimeout(() => {
        initializeFloatingLabels();
    }, 50);
    
    updateRegisterButtonState();
    
    fadeInElement(registerForm);
}

function fadeInElement(element) {
    element.style.opacity = '0';
    element.style.transition = 'opacity 0.15s ease';
    
    setTimeout(() => {
        element.style.opacity = '1';
    }, 10);
}

function clearFormErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(el => el.remove());
    
    const inputFields = document.querySelectorAll('.form-input');
    inputFields.forEach(field => {
        field.classList.remove('error');
    });
}

function updateRegisterButtonState() {
    const regName = document.getElementById('regName');
    const regEmail = document.getElementById('regEmail');
    const regPassword = document.getElementById('regPassword');
    const registerBtn = document.querySelector('#registerForm .register-btn');
    
    if (!regName || !regEmail || !regPassword || !registerBtn) return;
    
    const isFormValid = regName.value.trim() && 
                       regEmail.value.trim() && 
                       regPassword.value.length >= 6 &&
                       selectedAccountType !== null;
    
    if (isFormValid) {
        registerBtn.disabled = false;
        registerBtn.style.opacity = '1';
        registerBtn.style.cursor = 'pointer';
    } else {
        registerBtn.disabled = true;
        registerBtn.style.opacity = '0.7';
        registerBtn.style.cursor = 'not-allowed';
    }
}

function togglePasswordVisibility(fieldId) {
    const passwordField = document.getElementById(fieldId);
    if (!passwordField) return;
    
    const toggleButton = passwordField.parentElement.querySelector('.toggle-password');
    
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        if (toggleButton) {
            toggleButton.innerHTML = '<i class="fas fa-eye-slash"></i>';
            toggleButton.classList.add('active');
        }
    } else {
        passwordField.type = 'password';
        if (toggleButton) {
            toggleButton.innerHTML = '<i class="fas fa-eye"></i>';
            toggleButton.classList.remove('active');
        }
    }
}

function resetAllData() {
    const confirmText = currentLanguage === 'ru' ? 'Вы уверены, что хотите сбросить все данные? Это удалит все ваши настройки, расходы и цели.' :
                      currentLanguage === 'en' ? 'Are you sure you want to reset all data? This will delete all your settings, expenses and goals.' :
                      'Барлық деректерді қалпына келтіруді сенімдісіз бе? Бұл сіздің барлық баптауларыңызды, шығындарыңызды және мақсаттарыңызды жояды.';
    
    if (confirm(confirmText)) {
        localStorage.clear();
        
        const emailField = document.getElementById('email');
        const passwordField = document.getElementById('password');
        const regName = document.getElementById('regName');
        const regLastName = document.getElementById('regLastName');
        const regEmail = document.getElementById('regEmail');
        const regPassword = document.getElementById('regPassword');
        
        if (emailField) emailField.value = '';
        if (passwordField) passwordField.value = '';
        if (regName) regName.value = '';
        if (regLastName) regLastName.value = '';
        if (regEmail) regEmail.value = '';
        if (regPassword) regPassword.value = '';
        
        currentUser = null;
        expenses = [];
        goals = [];
        fincoins = 20;
        missions = [];
        purchasedItems = [];
        selectedCategory = null;
        activeMission = null;
        chatHistory = [];
        selectedAccountType = null;
        familyConnections = [];
        
        const successText = currentLanguage === 'ru' ? 'Все данные сброшены! Теперь вы можете зарегистрироваться заново.' :
                          currentLanguage === 'en' ? 'All data has been reset! You can now register again.' :
                          'Барлық деректер қалпына келтірілді! Енді қайта тіркеле аласыз.';
        
        showNotification(successText, 'success');
        showAccountTypeSelection();
        
        setTimeout(() => {
            location.reload();
        }, 1000);
    }
}

function logout() {
    const confirmText = translations[currentLanguage].logoutConfirm || "Вы уверены, что хотите выйти из аккаунта?";
    
    if (confirm(confirmText)) {
        logoutAndReset();
    }
}

function logoutAndReset() {
    saveUserData();
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
    if (currentUser) {
        localStorage.removeItem(`chatHistory_${currentUser.id}`);
        localStorage.removeItem(`familyConnections_${currentUser.id}`);
    }
    currentUser = null;
    activeMission = null;
    chatHistory = [];
    selectedAccountType = null;
    familyConnections = [];
    
    if (missionProgressInterval) {
        clearInterval(missionProgressInterval);
        missionProgressInterval = null;
    }
    
    const appHeader = document.getElementById('appHeader');
    const bottomNav = document.getElementById('bottomNav');
    const dashboard = document.getElementById('dashboard');
    
    if (appHeader) appHeader.style.display = 'none';
    if (bottomNav) bottomNav.style.display = 'none';
    if (dashboard) dashboard.style.display = 'none';
    
    const pages = ['analytics', 'missions', 'store', 'settings', 'chat', 'adminPanel'];
    pages.forEach(page => {
        const pageElement = document.getElementById(page);
        if (pageElement) pageElement.style.display = 'none';
    });
    
    showAccountTypeSelection();
    
    const logoutText = currentLanguage === 'ru' ? 'Вы вышли из системы' :
                     currentLanguage === 'en' ? 'You have logged out' :
                     'Сіз жүйеден шықтыңыз';
    
    showNotification(logoutText, 'info');
}

function register() {
    const name = document.getElementById('regName')?.value.trim();
    const lastName = document.getElementById('regLastName')?.value.trim();
    const email = document.getElementById('regEmail')?.value.trim();
    const password = document.getElementById('regPassword')?.value;
    
    if (!name || !email || !password) {
        const errorText = currentLanguage === 'ru' ? 'Пожалуйста, заполните все обязательные поля' :
                        currentLanguage === 'en' ? 'Please fill in all required fields' :
                        'Барлық міндетті өрістерді толтырыңыз';
        showNotification(errorText, 'error');
        return;
    }
    
    if (!selectedAccountType) {
        const errorText = currentLanguage === 'ru' ? 'Пожалуйста, выберите тип аккаунта' :
                        currentLanguage === 'en' ? 'Please select account type' :
                        'Аккаунт түрін таңдаңыз';
        showNotification(errorText, 'error');
        return;
    }
    
    if (password.length < 6) {
        const errorText = currentLanguage === 'ru' ? 'Пароль должен содержать минимум 6 символов' :
                        currentLanguage === 'en' ? 'Password must be at least 6 characters long' :
                        'Құпия сөз кемінде 6 таңбадан тұруы керек';
        showNotification(errorText, 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        const errorText = currentLanguage === 'ru' ? 'Пожалуйста, введите корректный email адрес' :
                        currentLanguage === 'en' ? 'Please enter a valid email address' :
                        'Дұрыс email мекенжайын енгізіңіз';
        showNotification(errorText, 'error');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('financemind_users') || '[]');
    
    if (users.find(u => u.email === email)) {
        const errorText = currentLanguage === 'ru' ? 'Пользователь с таким email уже существует. Используйте другой email или войдите в систему.' :
                        currentLanguage === 'en' ? 'User with this email already exists. Use another email or login.' :
                        'Бұл email-мен пайдаланушы бар. Басқа email пайдаланыңыз немесе кіріңіз.';
        showNotification(errorText, 'error');
        return;
    }
    
    const newUser = {
        id: Date.now().toString(),
        name: name,
        lastName: lastName,
        email: email,
        password: password,
        role: 'user',
        accountType: selectedAccountType,
        createdAt: new Date().toISOString(),
        profile: { lastName: lastName },
        settings: { 
            language: 'ru', 
            theme: 'dark',
            interfaceStyle: getDefaultInterfaceStyle(selectedAccountType)
        }
    };
    
    users.push(newUser);
    localStorage.setItem('financemind_users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userAccountType', selectedAccountType);
    
    currentUser = newUser;
    initializeUserData(newUser.id);
    showAppInterface();
    
    const successText = currentLanguage === 'ru' ? 'Регистрация выполнена успешно! Добро пожаловать в FinanceMind!' :
                      currentLanguage === 'en' ? 'Registration successful! Welcome to FinanceMind!' :
                      'Тіркелу сәтті аяқталды! FinanceMind-қа қош келдіңіз!';
    
    showNotification(successText, 'success');
}

function getDefaultInterfaceStyle(accountType) {
    const styles = {
        'teen': 'gamified',
        'parent': 'simple',
        'adult': 'professional'
    };
    return styles[accountType] || 'professional';
}

function login() {
    const email = document.getElementById('email')?.value.trim();
    const password = document.getElementById('password')?.value;
    
    if (!email || !password) {
        const errorText = currentLanguage === 'ru' ? 'Пожалуйста, заполните все поля' :
                        currentLanguage === 'en' ? 'Please fill in all fields' :
                        'Барлық өрістерді толтырыңыз';
        showNotification(errorText, 'error');
        return;
    }
    
    if (email === 'admin@financemind.com' && password === 'admin123') {
        const adminUser = {
            id: 'admin',
            name: 'Администратор',
            email: 'admin@financemind.com',
            role: 'admin',
            accountType: 'adult',
            createdAt: new Date().toISOString(),
            profile: { lastName: '', role: 'Администратор' },
            settings: { language: 'ru', theme: 'dark' }
        };
        
        localStorage.setItem('currentUser', JSON.stringify(adminUser));
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userAccountType', 'adult');
        currentUser = adminUser;
        loadUserData();
        showAppInterface();
        
        const successText = currentLanguage === 'ru' ? 'Вход выполнен успешно! Админ панель активирована.' :
                          currentLanguage === 'en' ? 'Login successful! Admin panel activated.' :
                          'Кіру сәтті аяқталды! Әкімші панелі белсендірілді.';
        
        showNotification(successText, 'success');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('financemind_users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userAccountType', user.accountType || 'adult');
        currentUser = user;
        loadUserData();
        loadFamilyConnections();
        showAppInterface();
        
        const successText = currentLanguage === 'ru' ? 'Вход выполнен успешно! Рады снова видеть вас!' :
                          currentLanguage === 'en' ? 'Login successful! Glad to see you again!' :
                          'Кіру сәтті аяқталды! Сізді қайта көргенімізге қуаныштымыз!';
        
        showNotification(successText, 'success');
    } else {
        const errorText = currentLanguage === 'ru' ? 'Неверный email или пароль. Проверьте данные или сбросьте настройки.' :
                        currentLanguage === 'en' ? 'Invalid email or password. Check your data or reset settings.' :
                        'Қате email немесе құпия сөз. Деректеріңізді тексеріңіз немесе баптауларды қалпына келтіріңіз.';
        showNotification(errorText, 'error');
    }
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function initializeUserData(userId) {
    const userData = {
        expenses: [],
        goals: [],
        missions: [],
        fincoins: 20,
        purchasedItems: [],
        completedMissions: [],
        hasPremiumSubscription: false,
        analyticsViews: 0,
        appVisits: 1,
        totalFincoinsEarned: 0,
        activeMission: null,
        settings: { language: currentLanguage, theme: 'dark', currency: '₸', notifications: true }
    };
    
    localStorage.setItem(`userData_${userId}`, JSON.stringify(userData));
    expenses = [];
    goals = [];
    fincoins = 20;
    missions = [];
    purchasedItems = [];
    activeMission = null;
    chatHistory = [{
        type: 'ai',
        content: translations[currentLanguage].welcomeMessage,
        timestamp: new Date().toISOString()
    }];
    saveChatHistory();
}

function showAppInterface() {
    const authPage = document.getElementById('authPage');
    const accountTypePage = document.getElementById('accountTypePage');
    const appHeader = document.getElementById('appHeader');
    const bottomNav = document.getElementById('bottomNav');
    
    if (authPage) {
        authPage.style.display = 'none';
    }
    if (accountTypePage) {
        accountTypePage.style.display = 'none';
    }
    
    if (appHeader) {
        appHeader.style.display = 'flex';
    }
    
    if (bottomNav) {
        bottomNav.style.display = 'flex';
    }
    
    loadChatHistory();
    loadFamilyConnections();
    
    if (currentUser && currentUser.role === 'admin') {
        const adminButton = document.getElementById('adminButton');
        if (adminButton) adminButton.style.display = 'flex';
    }
    
    initLanguage();
    updateInterfaceForAccountType();
    startMissionProgressTracking();
    checkUrlConnectionParams();
    
    setTimeout(() => {
        showPage('dashboard');
        fixScrollIssues();
        fixButtonSizes();
        fixAccountManagementButtons();
        addLogoutButtonToSettings();
    }, 100);
}

function checkUrlConnectionParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const connectionCode = urlParams.get('connect');
    
    if (connectionCode && currentUser && currentUser.accountType === 'teen') {
        connectToParent(connectionCode);
        
        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
    }
}

// ========== ВЫБОР ТИПА АККАУНТА ==========

function selectAccountType(type) {
    selectedAccountType = type;
    
    document.querySelectorAll('.account-type-button').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    const selectedBtn = event.currentTarget;
    selectedBtn.classList.add('selected');
    
    localStorage.setItem('selectedAccountType', type);
    updateRegisterButtonState();
    
    const description = document.getElementById('accountTypeDescription');
    if (description) {
        const descriptions = {
            'teen': translations[currentLanguage].teenAccountDesc,
            'parent': translations[currentLanguage].parentAccountDesc,
            'adult': translations[currentLanguage].adultAccountDesc
        };
        
        description.innerHTML = `
            <h3>${translations[currentLanguage].accountTypeDescription}</h3>
            <p><strong>${getAccountTypeDisplayName(type)}</strong>: ${descriptions[type] || ''}</p>
        `;
        description.style.display = 'block';
    }
}

function getAccountTypeDisplayName(type) {
    const names = {
        'teen': translations[currentLanguage].accountTypeTeen,
        'parent': translations[currentLanguage].accountTypeParent,
        'adult': translations[currentLanguage].accountTypeAdult
    };
    return names[type] || type;
}

// ========== ПЛАВАЮЩИЕ ЛЕЙБЛЫ ==========

function initializeFloatingLabels() {
    const formInputs = document.querySelectorAll('.form-input');
    
    formInputs.forEach(input => {
        const formGroup = input.closest('.form-group');
        if (!formGroup) return;
        
        const label = formGroup.querySelector('label');
        if (!label) return;
        
        formGroup.classList.add('floating-label-group');
        
        if (input.value) {
            formGroup.classList.add('focused');
            formGroup.classList.add('has-value');
        }
        
        input.addEventListener('focus', function() {
            formGroup.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                formGroup.classList.remove('focused');
            }
            formGroup.classList.toggle('has-value', !!this.value);
        });
        
        input.addEventListener('input', function() {
            formGroup.classList.toggle('has-value', !!this.value);
        });
    });
}

// ========== ОБНОВЛЕННЫЙ ИНТЕРФЕЙС ==========

function updateInterfaceForAccountType() {
    if (!currentUser) return;
    
    const accountType = currentUser.accountType || 'adult';
    
    const userRoleBadge = document.getElementById('userRoleBadge');
    const profileRole = document.querySelector('.profile-role');
    
    if (userRoleBadge) {
        userRoleBadge.textContent = getAccountTypeDisplayName(accountType);
        userRoleBadge.className = 'user-role-badge ' + accountType;
    }
    
    if (profileRole) {
        profileRole.textContent = getAccountTypeDisplayName(accountType);
        profileRole.className = 'profile-role ' + accountType;
    }
    
    applyAccountTypeInterface(accountType);
    updateNavigationForAccountType(accountType);
    updateContentForAccountType(accountType);
    updateLanguage();
}

function applyAccountTypeInterface(accountType) {
    document.body.classList.remove('teen-interface', 'parent-interface', 'adult-interface');
    document.body.classList.add(accountType + '-interface');
    updateColorScheme(accountType);
}

function updateColorScheme(accountType) {
    const root = document.documentElement;
    root.style.removeProperty('--primary');
    root.style.removeProperty('--primary-dark');
    root.style.removeProperty('--primary-light');
    
    switch(accountType) {
        case 'teen':
            root.style.setProperty('--primary', '#FF6B6B');
            root.style.setProperty('--primary-dark', '#FF5252');
            root.style.setProperty('--primary-light', '#FFE5E5');
            break;
        case 'parent':
            root.style.setProperty('--primary', '#4ECDC4');
            root.style.setProperty('--primary-dark', '#26A69A');
            root.style.setProperty('--primary-light', '#E0F2F1');
            break;
        case 'adult':
            root.style.setProperty('--primary', '#4F6DFF');
            root.style.setProperty('--primary-dark', '#3d478e');
            root.style.setProperty('--primary-light', '#EFF2FF');
            break;
    }
}

function updateNavigationForAccountType(accountType) {
    const analyticsNav = document.querySelector('.nav-item[onclick*="analytics"]');
    const missionsNav = document.querySelector('.nav-item[onclick*="missions"]');
    const storeNav = document.querySelector('.nav-item[onclick*="store"]');
    
    switch(accountType) {
        case 'teen':
            if (analyticsNav) analyticsNav.style.display = 'flex';
            if (missionsNav) missionsNav.style.display = 'flex';
            if (storeNav) storeNav.style.display = 'flex';
            break;
        case 'parent':
            if (analyticsNav) analyticsNav.style.display = 'flex';
            if (missionsNav) missionsNav.style.display = 'none';
            if (storeNav) storeNav.style.display = 'none';
            break;
        case 'adult':
            if (analyticsNav) analyticsNav.style.display = 'flex';
            if (missionsNav) missionsNav.style.display = 'flex';
            if (storeNav) storeNav.style.display = 'flex';
            break;
    }
}

function updateContentForAccountType(accountType) {
    updateDashboardForAccountType(accountType);
    updateAnalyticsForAccountType(accountType);
    updateMissionsForAccountType(accountType);
    updateStoreForAccountType(accountType);
    updateSettingsForAccountType(accountType);
}

function updateDashboardForAccountType(accountType) {
    const aiAdviceElement = document.getElementById('aiMessage');
    
    if (!aiAdviceElement) return;
    
    switch(accountType) {
        case 'teen':
            aiAdviceElement.textContent = getTeenAIAdvice();
            break;
        case 'parent':
            aiAdviceElement.textContent = getParentAIAdvice();
            break;
        case 'adult':
            aiAdviceElement.textContent = getAdultAIAdvice();
            break;
    }
}

function updateAnalyticsForAccountType(accountType) {
    const reportsSection = document.querySelector('.reports-section');
    const adultToolsSection = document.getElementById('adultToolsSection');
    
    switch(accountType) {
        case 'teen':
            if (reportsSection) reportsSection.style.display = 'none';
            if (adultToolsSection) adultToolsSection.style.display = 'none';
            break;
        case 'parent':
            if (reportsSection) reportsSection.style.display = 'block';
            if (adultToolsSection) adultToolsSection.style.display = 'none';
            break;
        case 'adult':
            if (reportsSection) reportsSection.style.display = 'block';
            if (adultToolsSection) adultToolsSection.style.display = 'block';
            break;
    }
}

function updateMissionsForAccountType(accountType) {
    const missionsContainer = document.getElementById('missions');
    
    if (!missionsContainer) return;
    
    switch(accountType) {
        case 'teen':
            missionsContainer.style.display = 'block';
            renderMissions();
            break;
        case 'parent':
            missionsContainer.style.display = 'none';
            break;
        case 'adult':
            missionsContainer.style.display = 'block';
            renderMissions();
            break;
    }
}

function updateStoreForAccountType(accountType) {
    const storeContainer = document.getElementById('store');
    
    if (!storeContainer) return;
    
    switch(accountType) {
        case 'teen':
            storeContainer.style.display = 'block';
            break;
        case 'parent':
            storeContainer.style.display = 'none';
            break;
        case 'adult':
            storeContainer.style.display = 'block';
            break;
    }
}

function updateSettingsForAccountType(accountType) {
    const familySection = document.querySelector('#familySection');
    const parentControlsItem = document.getElementById('parentControlsItem');
    
    if (familySection) {
        familySection.style.display = accountType === 'parent' || accountType === 'teen' ? 'block' : 'none';
    }
    
    if (parentControlsItem) {
        parentControlsItem.style.display = accountType === 'parent' ? 'block' : 'none';
    }
    
    // Добавляем кнопку выхода
    addLogoutButtonToSettings();
}

function updateHeaderTitle(page) {
    const headerTitle = document.getElementById('headerTitle');
    if (!headerTitle) return;
    
    const titles = {
        'dashboard': translations[currentLanguage].homeNav,
        'analytics': translations[currentLanguage].analyticsNav,
        'missions': translations[currentLanguage].missionsNav,
        'store': translations[currentLanguage].storeButton,
        'settings': translations[currentLanguage].settingsNav,
        'chat': translations[currentLanguage].chatNav,
        'adminPanel': translations[currentLanguage].adminPanel
    };
    
    headerTitle.textContent = titles[page] || 'FinanceMind';
}

// ========== ИСПРАВЛЕНИЕ КНОПОК ==========

function fixButtonSizes() {
    const primaryButtons = document.querySelectorAll('.btn-primary, .btn-outline, .mission-complete-btn, .buy-btn, .earn-btn, .store-btn');
    primaryButtons.forEach(btn => {
        if (!btn.classList.contains('btn-icon') && !btn.classList.contains('small')) {
            btn.style.height = '48px';
            btn.style.padding = '12px 20px';
            btn.style.fontSize = '16px';
            btn.style.borderRadius = '14px';
            btn.style.display = 'flex';
            btn.style.alignItems = 'center';
            btn.style.justifyContent = 'center';
            btn.style.width = 'auto';
            btn.style.minWidth = '0';
        }
    });
    
    const settingsButtons = document.querySelectorAll('.settings-item, .security-item, .category-btn, .language-btn, .theme-btn, .chart-filter-btn, .chart-type-btn');
    settingsButtons.forEach(btn => {
        btn.style.height = '56px';
        btn.style.padding = '16px';
        btn.style.fontSize = '16px';
        btn.style.display = 'flex';
        btn.style.alignItems = 'center';
        btn.style.marginBottom = '8px';
        btn.style.borderRadius = '12px';
        btn.style.width = '100%';
    });
    
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.style.padding = '12px';
        item.style.height = 'auto';
        item.style.minHeight = 'auto';
    });
    
    const cardButtons = document.querySelectorAll('.goal-delete-btn, .btn-danger, .share-btn');
    cardButtons.forEach(btn => {
        btn.style.height = '44px';
        btn.style.padding = '10px 16px';
        btn.style.fontSize = '14px';
    });
    
    const iconButtons = document.querySelectorAll('.btn-icon, .header-icon, .chat-send-btn');
    iconButtons.forEach(btn => {
        btn.style.width = '44px';
        btn.style.height = '44px';
        btn.style.display = 'flex';
        btn.style.alignItems = 'center';
        btn.style.justifyContent = 'center';
        btn.style.flexShrink = '0';
    });
}

function showPage(page) {
    const mainPages = ['dashboard', 'analytics', 'missions', 'store', 'settings', 'chat', 'adminPanel'];
    
    mainPages.forEach(p => {
        const pageElement = document.getElementById(p);
        if (pageElement) {
            pageElement.style.display = 'none';
        }
    });
    
    const targetPage = document.getElementById(page);
    if (targetPage) {
        targetPage.style.display = 'block';
        fadeInElement(targetPage);
        targetPage.classList.add('scroll-container');
    }
    
    const modals = document.querySelectorAll('.modal-overlay');
    modals.forEach(modal => {
        if (modal.id !== 'goalModal' && modal.id !== 'instructionModal' && modal.id !== 'reportModal') {
            modal.style.display = 'none';
        }
    });
    
    updateHeaderTitle(page);
    updateActiveNavigation(page);
    
    if (page === 'chat') {
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            scrollChatToBottom();
            fixChatScroll();
            updateChatHeader();
        }, 100);
    } else {
        document.body.style.overflow = 'auto';
    }
    
    if (page === 'analytics' && currentUser) {
        const userData = JSON.parse(localStorage.getItem(`userData_${currentUser.id}`) || '{}');
        userData.analyticsViews = (userData.analyticsViews || 0) + 1;
        localStorage.setItem(`userData_${currentUser.id}`, JSON.stringify(userData));
    }
    
    if (currentUser && page === 'dashboard') {
        const userData = JSON.parse(localStorage.getItem(`userData_${currentUser.id}`) || '{}');
        userData.appVisits = (userData.appVisits || 0) + 1;
        localStorage.setItem(`userData_${currentUser.id}`, JSON.stringify(userData));
        updateMissionsProgress();
    }
    
    updatePageContent(page);
    
    setTimeout(() => {
        fixButtonSizes();
        fixScrollIssues();
        if (page === 'settings') {
            fixAccountManagementButtons();
            addLogoutButtonToSettings();
        }
    }, 50);
}

function updateActiveNavigation(page) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    const activeNavItem = document.querySelector(`.nav-item[onclick*="${page}"]`);
    if (activeNavItem) {
        activeNavItem.classList.add('active');
    }
}

function updatePageContent(page) {
    switch(page) {
        case 'dashboard': updateDashboard(); break;
        case 'analytics': updateAnalytics(); break;
        case 'missions': updateMissions(); break;
        case 'store': updateStore(); break;
        case 'settings': updateSettings(); break;
        case 'chat': updateChat(); break;
        case 'adminPanel': updateAdminPanel(); break;
    }
}

function updateDashboard() {
    loadUserData();
    updateUserInterface();
    updateExpenseStats();
    renderGoals();
    updateAIAdvice();
    updateActiveMissionDisplay();
}

function updateAnalytics() {
    updateExpenseStats();
    updateCharts();
    updateExpenseList();
    
    if (expenses.length > 0) {
        const emptyLineChart = document.getElementById('emptyLineChart');
        const emptyPieChart = document.getElementById('emptyPieChart');
        
        if (emptyLineChart) emptyLineChart.style.display = 'none';
        if (emptyPieChart) emptyPieChart.style.display = 'none';
    }
}

function updateMissions() {
    renderMissions();
    updateFincoinsBalance();
    updateActiveMissionDisplay();
}

function updateStore() {
    updateFincoinsBalance();
}

function updateSettings() {
    if (currentUser) {
        const profileNameInput = document.getElementById('profileNameInput');
        const profileLastNameInput = document.getElementById('profileLastNameInput');
        const profileEmailInput = document.getElementById('profileEmailInput');
        
        if (profileNameInput) profileNameInput.value = currentUser.name || '';
        if (profileLastNameInput) profileLastNameInput.value = currentUser.lastName || '';
        if (profileEmailInput) profileEmailInput.value = currentUser.email || '';
    }
    
    updateLanguageSettings();
    updateSettingsForAccountType(currentUser?.accountType || 'adult');
    
    const savedTheme = localStorage.getItem('appTheme') || 'dark';
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeThemeBtn = document.querySelector(`.theme-btn[onclick*="'${savedTheme}'"]`);
    if (activeThemeBtn) {
        activeThemeBtn.classList.add('active');
    }
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeLangBtn = document.querySelector(`.lang-btn[data-lang="${currentLanguage}"]`);
    if (activeLangBtn) {
        activeLangBtn.classList.add('active');
    }
    
    updateSettingsInterface();
    
    setTimeout(fixProfileScroll, 50);
}

function updateChat() {
    renderChatMessagesWithHistory();
    setTimeout(() => {
        scrollChatToBottom();
        fixChatScroll();
        updateChatHeader();
    }, 50);
}

function updateAdminPanel() {
    if (currentUser && currentUser.role === 'admin') {
        loadAdminData();
    } else {
        showNotification(translations[currentLanguage].adminPanel + ' - ' + 
                        (currentLanguage === 'ru' ? 'Доступ запрещен' : 
                         currentLanguage === 'en' ? 'Access denied' : 'Қол жетімсіз'), 'error');
        showPage('dashboard');
    }
}

// ========== ОБНОВЛЕНИЕ ИНТЕРФЕЙСА НАСТРОЕК ==========

function updateSettingsInterface() {
    const personalDataTitle = document.querySelector('#personalDataItem .settings-item-title');
    const securityTitle = document.querySelector('#securityItem .settings-item-title');
    const teenAccountsTitle = document.querySelector('#teenAccountsItem .settings-item-title');
    const familyConnectionsTitle = document.querySelector('#familySection h3');
    const languageThemeTitle = document.querySelector('#languageThemeItem .settings-item-title');
    
    if (personalDataTitle) personalDataTitle.textContent = translations[currentLanguage].personalDataTitle;
    if (securityTitle) securityTitle.textContent = translations[currentLanguage].securityTitle;
    if (teenAccountsTitle) teenAccountsTitle.textContent = translations[currentLanguage].teenAccountsTitle;
    if (familyConnectionsTitle) familyConnectionsTitle.textContent = translations[currentLanguage].familyConnectionsTitle;
    if (languageThemeTitle) languageThemeTitle.textContent = translations[currentLanguage].languageSettingsTitle;
    
    const lightThemeBtn = document.querySelector('.theme-btn[onclick*="light"]');
    const darkThemeBtn = document.querySelector('.theme-btn[onclick*="dark"]');
    const autoThemeBtn = document.querySelector('.theme-btn[onclick*="auto"]');
    
    if (lightThemeBtn) lightThemeBtn.textContent = translations[currentLanguage].themeLight;
    if (darkThemeBtn) darkThemeBtn.textContent = translations[currentLanguage].themeDark;
    if (autoThemeBtn) autoThemeBtn.textContent = translations[currentLanguage].themeAuto;
    
    const saveProfileBtn = document.querySelector('#personalDataItem .btn-primary');
    if (saveProfileBtn) saveProfileBtn.textContent = translations[currentLanguage].saveProfile;
    
    const changePasswordBtn = document.querySelector('#securityItem .btn-outline');
    if (changePasswordBtn) changePasswordBtn.textContent = translations[currentLanguage].changePassword;
    
    const manageTeenBtn = document.querySelector('#teenAccountsItem .btn-primary');
    if (manageTeenBtn) manageTeenBtn.textContent = translations[currentLanguage].manageTeenAccounts;
    
    const connectChildBtn = document.querySelector('#familySection .btn-primary');
    if (connectChildBtn) connectChildBtn.textContent = translations[currentLanguage].connectChild;
    
    const personalDataDesc = document.querySelector('#personalDataItem .settings-item-desc');
    const securityDesc = document.querySelector('#securityItem .settings-item-desc');
    const teenAccountsDesc = document.querySelector('#teenAccountsItem .settings-item-desc');
    
    if (personalDataDesc) personalDataDesc.textContent = translations[currentLanguage].personalDataDesc;
    if (securityDesc) securityDesc.textContent = translations[currentLanguage].securitySettingsDesc;
    if (teenAccountsDesc) teenAccountsDesc.textContent = translations[currentLanguage].parentAccountDesc;
}

// ========== ФУНКЦИИ ДЛЯ РАБОТЫ С ДАННЫМИ ==========

function loadUserData() {
    if (!currentUser) {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) currentUser = JSON.parse(savedUser);
    }
    
    if (currentUser && currentUser.id) {
        const userData = JSON.parse(localStorage.getItem(`userData_${currentUser.id}`) || '{}');
        
        expenses = userData.expenses || [];
        goals = userData.goals || [];
        fincoins = userData.fincoins || 20;
        missions = userData.missions || [];
        purchasedItems = userData.purchasedItems || [];
        appVisits = userData.appVisits || 0;
        activeMission = userData.activeMission || null;
        
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
            analyticsViews: (JSON.parse(localStorage.getItem(`userData_${currentUser.id}`) || '{}')).analyticsViews || 0,
            appVisits: appVisits,
            totalFincoinsEarned: (JSON.parse(localStorage.getItem(`userData_${currentUser.id}`) || '{}')).totalFincoinsEarned || 0,
            activeMission: activeMission,
            settings: { language: currentLanguage, theme: localStorage.getItem('appTheme') || 'dark', currency: '₸', notifications: true }
        };
        localStorage.setItem(`userData_${currentUser.id}`, JSON.stringify(userData));
    }
}

function updateUserInterface() {
    if (!currentUser) return;
    
    try {
        const userNameElement = document.getElementById('userName');
        const userGreetingElement = document.getElementById('userGreeting');
        const profileNameElement = document.getElementById('profileName');
        const profileEmailElement = document.getElementById('profileEmail');
        const profileRoleElement = document.querySelector('.profile-role');
        
        if (userNameElement) userNameElement.textContent = currentUser.name;
        if (userGreetingElement) userGreetingElement.textContent = getGreeting();
        if (profileNameElement) profileNameElement.textContent = currentUser.name + (currentUser.lastName ? ' ' + currentUser.lastName : '');
        if (profileEmailElement) profileEmailElement.textContent = currentUser.email;
        if (profileRoleElement) {
            profileRoleElement.textContent = currentUser.role === 'admin' ? 
                translations[currentLanguage].adminRole : 
                getAccountTypeDisplayName(currentUser.accountType || 'adult');
            profileRoleElement.className = 'profile-role ' + (currentUser.accountType || 'adult');
        }
        
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
    if (hour < 12) {
        return currentLanguage === 'ru' ? 'Доброе утро!' :
               currentLanguage === 'en' ? 'Good morning!' :
               'Қайырлы таң!';
    }
    if (hour < 18) {
        return currentLanguage === 'ru' ? 'Добрый день!' :
               currentLanguage === 'en' ? 'Good afternoon!' :
               'Қайырлы күн!';
    }
    return currentLanguage === 'ru' ? 'Добрый вечер!' :
           currentLanguage === 'en' ? 'Good evening!' :
           'Қайырлы кеш!';
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
        return translations[currentLanguage].aiAdviceDefault;
    }
    
    if (currentMonthExpenses > 50000) {
        return currentLanguage === 'ru' ? "Ваши расходы в этом месяце довольно высокие. Рекомендую проанализировать категории трат и найти возможности для экономии." :
               currentLanguage === 'en' ? "Your expenses this month are quite high. I recommend analyzing spending categories and finding opportunities to save." :
               "Бұл айдағы шығыстарыңыз айтарлықтай жоғары. Шығындар санаттарын талдап, үнемдеу мүмкіндіктерін тапқан жөн.";
    }
    
    if (goals.length === 0) {
        return currentLanguage === 'ru' ? "Создайте финансовую цель, чтобы мотивировать себя на регулярные накопления. Это поможет достичь ваших мечтаний быстрее!" :
               currentLanguage === 'en' ? "Create a financial goal to motivate yourself for regular savings. This will help you achieve your dreams faster!" :
               "Үнемі жинақтауға ынталандыру үшін қаржылық мақсат құрыңыз. Бұл армандарыңызға тезірек жетуге көмектеседі!";
    }
    
    const foodExpenses = expenses
        .filter(expense => expense.category === 'Еда')
        .reduce((sum, expense) => sum + expense.amount, 0);
    
    if (foodExpenses > totalExpenses * 0.4) {
        return currentLanguage === 'ru' ? "Заметил, что значительная часть расходов уходит на еду. Попробуйте планировать покупки заранее и готовить дома - это поможет сэкономить." :
               currentLanguage === 'en' ? "I noticed that a significant portion of expenses goes to food. Try planning purchases in advance and cooking at home - this will help save money." :
               "Шығындардың айтарлықтай бөлігі тамаққа жұмсалатынын байқадым. Алдын ала сатып алуды жоспарлап, үйде пісіруге тырысыңыз - бұл үнемдеуге көмектеседі.";
    }
    
    const adviceList = {
        ru: [
            "Регулярное отслеживание расходов - первый шаг к финансовой стабильности. Продолжайте в том же духе!",
            "Попробуйте правило 50/30/20: 50% на necessities, 30% на wants, 20% на savings.",
            "Маленькие ежедневные расходы часто складываются в крупные суммы. Ведите учет всех трат.",
            "Установите автоматические переводы на сбережения - это самый простой способ накопить.",
            "Перед крупной покупкой дайте себе 24 часа на размышление - это поможет избежать импульсных трат."
        ],
        en: [
            "Regular expense tracking is the first step to financial stability. Keep it up!",
            "Try the 50/30/20 rule: 50% for necessities, 30% for wants, 20% for savings and investments.",
            "Small daily expenses often add up to large amounts. Keep track of all spending.",
            "Set up automatic transfers to savings - this is the easiest way to save.",
            "Before a major purchase, give yourself 24 hours to think - this will help avoid impulse spending."
        ],
        kz: [
            "Шығындарды үнемі бақылау - қаржылық тұрақтылыққа бірінші қадам. Осылай жалғастырыңыз!",
            "50/30/20 ережесін пайдаланып көріңіз: 50% қажеттіліктерге, 30% тілектерге, 20% жинақтарға және инвестицияларға.",
            "Кішкене күнделікті шығындар жиі үлкен сомаларға жиналады. Барлық шығындарды есептеңіз.",
            "Жинақтарға автоматты аударымдарды орнатыңыз - бұл жинақтаудың ең оңай тәсілі.",
            "Ірі сатып алу алдында ойлану үшін 24 сағат уақыт беріңіз - бұл импульстік шығындарды болдырмауға көмектеседі."
        ]
    };
    
    return adviceList[currentLanguage][Math.floor(Math.random() * adviceList[currentLanguage].length)];
}

// ========== СПЕЦИАЛЬНЫЕ ФУНКЦИИ ДЛЯ ПОДРОСТКОВ ==========

function getTeenAIAdvice() {
    const adviceList = {
        ru: [
            "Не забывай отслеживать карманные расходы! Маленькие суммы складываются в большие!",
            "Отличная работа! Ты уже на пути к финансовой независимости!",
            "Попробуй откладывать 10% от любых денег, которые получаешь - это отличная привычка!",
            "Помни: каждая сохраненная тенге - это шаг к твоей мечте!",
            "Сегодня отличный день, чтобы начать новую финансовую миссию!"
        ],
        en: [
            "Don't forget to track your pocket money! Small amounts add up to big ones!",
            "Great job! You're already on the path to financial independence!",
            "Try saving 10% of any money you receive - it's a great habit!",
            "Remember: every saved tenge is a step towards your dream!",
            "Today is a great day to start a new financial mission!"
        ],
        kz: [
            "Қалтақшаны қадағалауды ұмытпа! Кішкене сомалар үлкендерге айналады!",
            "Керемет жұмыс! Сен қаржылық тәуелсіздік жолындасың!",
            "Алатын ақшаңның 10% үнемдеуге тырыс - бұл керемет әдет!",
            "Есіңде болсын: әрбір үнемделген теңге - сенің арманыңа бір қадам!",
            "Бүгін жаңа қаржылық миссияны бастауға керемет күн!"
        ]
    };
    
    return adviceList[currentLanguage][Math.floor(Math.random() * adviceList[currentLanguage].length)];
}

// ========== СПЕЦИАЛЬНЫЕ ФУНКЦИИ ДЛЯ РОДИТЕЛЕЙ ==========

function getParentAIAdvice() {
    const adviceList = {
        ru: [
            "Регулярно проверяйте финансовый прогресс вашего подростка",
            "Обсуждайте с подростком его финансовые цели - это поможет развить ответственность",
            "Обращайте внимание на категории расходов - это поможет понять финансовые привычки",
            "Хвалите за достижения в миссиях - это мотивирует продолжать обучение",
            "Наблюдайте за тенденциями - это поможет вовремя дать совет"
        ],
        en: [
            "Regularly check your teen's financial progress",
            "Discuss financial goals with your teen - it helps develop responsibility",
            "Pay attention to expense categories - it helps understand financial habits",
            "Praise for mission achievements - it motivates to continue learning",
            "Watch trends - it helps give advice in time"
        ],
        kz: [
            "Жастың қаржылық прогрессін үнемі тексеріп отырыңыз",
            "Жаспен қаржылық мақсаттарын талқылаңыз - бұл жауапкершілікті дамытуға көмектеседі",
            "Шығындар санаттарына назар аударыңыз - бұл қаржылық әдеттерді түсінуге көмектеседі",
            "Миссия жетістіктері үшін мақтаңыз - бұл оқуды жалғастыруға ынталандырады",
            "Трендтерді бақылаңыз - бұл уақытында кеңес беруге көмектеседі"
        ]
    };
    
    return adviceList[currentLanguage][Math.floor(Math.random() * adviceList[currentLanguage].length)];
}

// ========== СПЕЦИАЛЬНЫЕ ФУНКЦИИ ДЛЯ ВЗРОСЛЫХ ==========

function getAdultAIAdvice() {
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
        return translations[currentLanguage].aiAdviceDefault;
    }
    
    if (currentMonthExpenses > 75000) {
        return currentLanguage === 'ru' ? 
            "Ваши расходы превышают рекомендуемый уровень. Рекомендую провести детальный анализ категорий и оптимизировать регулярные платежи." :
            currentLanguage === 'en' ? 
            "Your expenses exceed recommended level. I recommend conducting detailed category analysis and optimizing regular payments." :
            "Сіздің шығыстарыңыз ұсынылған деңгейден асып түседі. Санаттарды егжей-тегжейлі талдау және тұрақты төлемдерді оңтайландыруды ұсынамын.";
    }
    
    const investmentExpenses = expenses
        .filter(expense => expense.category === 'Инвестиции')
        .reduce((sum, expense) => sum + expense.amount, 0);
    
    if (investmentExpenses < totalExpenses * 0.1) {
        return currentLanguage === 'ru' ?
            "Заметил низкую долю инвестиционных расходов. Рекомендую рассмотреть варианты диверсификации портфеля." :
            currentLanguage === 'en' ?
            "Noticed low share of investment expenses. I recommend considering portfolio diversification options." :
            "Инвестициялық шығындардың төмен үлесін байқадым. Портфельді әртараптандыру нұсқаларын қарастырған жөн.";
    }
    
    const adviceList = {
        ru: [
            "Рассмотрите возможность рефинансирования кредитов для снижения ежемесячных платежей",
            "Рекомендую создать резервный фонд на 3-6 месяцев расходов",
            "Проанализируйте подписки и регулярные платежи - возможно, некоторые можно отменить",
            "Диверсификация инвестиций снижает риски и повышает стабильность портфеля",
            "Автоматизация накоплений - эффективный способ достижения финансовых целей"
        ],
        en: [
            "Consider refinancing loans to reduce monthly payments",
            "I recommend creating an emergency fund for 3-6 months of expenses",
            "Analyze subscriptions and regular payments - maybe some can be canceled",
            "Investment diversification reduces risks and increases portfolio stability",
            "Savings automation is an effective way to achieve financial goals"
        ],
        kz: [
            "Айлық төлемдерді азайту үшін несиелерді қайта қаржыландыру мүмкіндігін қарастырыңыз",
            "3-6 айлық шығындарға резервтік қор құруды ұсынамын",
            "Жазылымдар мен тұрақты төлемдерді талдаңыз - мүмкін кейбірін тоқтатуға болады",
            "Инвестицияларды әртараптандыру тәуекелдерді азайтып, портфель тұрақтылығын арттырады",
            "Жинақтарды автоматтандыру - қаржылық мақсаттарға жетудің тиімді тәсілі"
        ]
    };
    
    return adviceList[currentLanguage][Math.floor(Math.random() * adviceList[currentLanguage].length)];
}

// ========== ФУНКЦИИ ДЛЯ ЦЕЛЕЙ ==========

function openGoalModal() {
    const goalModal = document.getElementById('goalModal');
    if (goalModal) {
        goalModal.style.display = 'flex';
        fadeInElement(goalModal);
    }
    
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    const goalDateInput = document.getElementById('goalDeadline');
    if (goalDateInput) {
        goalDateInput.value = nextMonth.toISOString().split('T')[0];
    }
}

function closeGoalModal() {
    const goalModal = document.getElementById('goalModal');
    if (goalModal) {
        goalModal.style.display = 'none';
    }
    
    const goalName = document.getElementById('goalName');
    const goalAmount = document.getElementById('goalAmount');
    const goalCurrent = document.getElementById('goalCurrent');
    const goalDateInput = document.getElementById('goalDeadline');
    
    if (goalName) goalName.value = '';
    if (goalAmount) goalAmount.value = '';
    if (goalCurrent) goalCurrent.value = '0';
    if (goalDateInput) {
        const nextMonth = new Date();
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        goalDateInput.value = nextMonth.toISOString().split('T')[0];
    }
}

function addNewGoal() {
    const name = document.getElementById('goalName')?.value;
    const amount = parseFloat(document.getElementById('goalAmount')?.value);
    const current = parseFloat(document.getElementById('goalCurrent')?.value) || 0;
    const deadline = document.getElementById('goalDeadline')?.value;
    
    if (!name || !amount || !deadline) {
        const errorText = currentLanguage === 'ru' ? 'Пожалуйста, заполните все обязательные поля' :
                        currentLanguage === 'en' ? 'Please fill in all required fields' :
                        'Барлық міндетті өрістерді толтырыңыз';
        showNotification(errorText, 'error');
        return;
    }
    
    if (amount <= 0) {
        const errorText = currentLanguage === 'ru' ? 'Сумма цели должна быть больше 0' :
                        currentLanguage === 'en' ? 'Goal amount must be greater than 0' :
                        'Мақсат сомасы 0-ден үлкен болуы керек';
        showNotification(errorText, 'error');
        return;
    }
    
    if (current > amount) {
        const errorText = currentLanguage === 'ru' ? 'Текущая сумма не может превышать целевую сумму' :
                        currentLanguage === 'en' ? 'Current amount cannot exceed target amount' :
                        'Ағымдағы сома мақсаттық сомадан аспауы керек';
        showNotification(errorText, 'error');
        return;
    }
    
    const deadlineDate = new Date(deadline);
    if (deadlineDate < new Date()) {
        const errorText = currentLanguage === 'ru' ? 'Срок цели не может быть в прошлом' :
                        currentLanguage === 'en' ? 'Goal deadline cannot be in the past' :
                        'Мақсат мерзімі өткенде болмауы керек';
        showNotification(errorText, 'error');
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
    
    const successText = currentLanguage === 'ru' ? 'Цель успешно добавлена!' :
                      currentLanguage === 'en' ? 'Goal successfully added!' :
                      'Мақсат сәтті қосылды!';
    
    showNotification(successText, 'success');
    updateMissionsProgress();
    
    setTimeout(fixScrollIssues, 50);
}

function deleteGoal(goalId) {
    const confirmText = currentLanguage === 'ru' ? 'Вы уверены, что хотите удалить эту цель?' :
                      currentLanguage === 'en' ? 'Are you sure you want to delete this goal?' :
                      'Бұл мақсатты жоюға сенімдісіз бе?';
    
    if (confirm(confirmText)) {
        goals = goals.filter(goal => goal.id !== goalId);
        saveUserData();
        renderGoals();
        
        const successText = currentLanguage === 'ru' ? 'Цель успешно удалена!' :
                          currentLanguage === 'en' ? 'Goal successfully deleted!' :
                          'Мақсат сәтті жойылды!';
        
        showNotification(successText, 'success');
        
        setTimeout(fixScrollIssues, 50);
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
            
            let statusText = '';
            if (isCompleted) {
                statusText = currentLanguage === 'ru' ? 'Цель достигнута!' :
                           currentLanguage === 'en' ? 'Goal achieved!' :
                           'Мақсатқа жетті!';
            } else if (daysLeft > 0) {
                statusText = currentLanguage === 'ru' ? `Осталось ${daysLeft} дней` :
                           currentLanguage === 'en' ? `${daysLeft} days left` :
                           `${daysLeft} күн қалды`;
            } else {
                statusText = currentLanguage === 'ru' ? 'Срок истек' :
                           currentLanguage === 'en' ? 'Deadline expired' :
                           'Мерзімі аяқталды';
            }
            
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
                        <div class="goal-deadline">${statusText}</div>
                        <div class="goal-percentage">${Math.round(progress)}%</div>
                    </div>
                    <div class="goal-actions">
                        <button class="goal-delete-btn" onclick="deleteGoal('${goal.id}')">
                            <i class="fas fa-trash"></i>
                            ${translations[currentLanguage].deleteGoalText}
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }
}

// ========== ФУНКЦИИ ДЛЯ РАСХОДОВ ==========

function selectCategory(category) {
    selectedCategory = category;
    
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    const selectedBtn = document.querySelector(`.category-btn[data-category="${category}"]`);
    if (selectedBtn) {
        selectedBtn.classList.add('selected');
    }
}

function addExpense() {
    const amount = parseFloat(document.getElementById('expenseAmount')?.value);
    const date = document.getElementById('expenseDate')?.value;
    const description = document.getElementById('expenseDescription')?.value;
    
    if (!amount || !date || !selectedCategory) {
        const errorText = currentLanguage === 'ru' ? 'Пожалуйста, заполните все поля и выберите категорию' :
                        currentLanguage === 'en' ? 'Please fill in all fields and select a category' :
                        'Барлық өрістерді толтырыңыз және санатты таңдаңыз';
        showNotification(errorText, 'error');
        return;
    }
    
    if (amount <= 0) {
        const errorText = currentLanguage === 'ru' ? 'Сумма расхода должна быть больше 0' :
                        currentLanguage === 'en' ? 'Expense amount must be greater than 0' :
                        'Шығын сомасы 0-ден үлкен болуы керек';
        showNotification(errorText, 'error');
        return;
    }
    
    const newExpense = {
        id: Date.now().toString(),
        amount: amount,
        date: date,
        category: selectedCategory,
        description: description || (currentLanguage === 'ru' ? 'Без описания' : 
                                  currentLanguage === 'en' ? 'No description' : 'Сипаттамасыз'),
        createdAt: new Date().toISOString(),
        currency: '₸'
    };
    
    expenses.push(newExpense);
    saveUserData();
    updateExpenseList();
    updateExpenseStats();
    updateCharts();
    updateMissionsProgress();
    
    const expenseAmount = document.getElementById('expenseAmount');
    const expenseDate = document.getElementById('expenseDate');
    const expenseDescription = document.getElementById('expenseDescription');
    
    if (expenseAmount) expenseAmount.value = '';
    if (expenseDate) expenseDate.value = new Date().toISOString().split('T')[0];
    if (expenseDescription) expenseDescription.value = '';
    
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    selectedCategory = null;
    
    const successText = currentLanguage === 'ru' ? 'Расход успешно добавлен!' :
                      currentLanguage === 'en' ? 'Expense successfully added!' :
                      'Шығын сәтті қосылды!';
    
    showNotification(successText, 'success');
    addFincoins(5);
    
    setTimeout(fixScrollIssues, 50);
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
            const icon = categoryIcons[expense.category] || 'fas fa-ellipsis-h';
            const color = categoryColors[expense.category] || '#9966FF';
            
            return `
                <div class="expense-item">
                    <div class="expense-icon" style="background: ${color}20; color: ${color};">
                        <i class="${icon}"></i>
                    </div>
                    <div class="expense-info">
                        <div class="expense-category">${expense.category}</div>
                        <div class="expense-description">${expense.description}</div>
                    </div>
                    <div class="expense-details">
                        <div class="expense-amount">${formatAmount(expense.amount)}</div>
                        <div class="expense-date">${formatDate(expense.date)}</div>
                    </div>
                </div>
            `;
        }).join('');
    }
}

function updateExpenseStats() {
    const stats = calculateExpenseStats();
    const statsContainer = document.getElementById('expenseStats');
    const analyticsStatsContainer = document.getElementById('analyticsStats');
    
    const totalExpensesText = currentLanguage === 'ru' ? 'Общая сумма расходов' :
                            currentLanguage === 'en' ? 'Total expenses' :
                            'Жалпы шығындар сомасы';
    
    const averageExpenseText = currentLanguage === 'ru' ? 'Средний расход' :
                             currentLanguage === 'en' ? 'Average expense' :
                             'Орташа шығын';
    
    const currentMonthText = currentLanguage === 'ru' ? 'Расходы за текущий месяц' :
                           currentLanguage === 'en' ? 'Current month expenses' :
                           'Ағымдағы айдағы шығындар';
    
    const categoriesCountText = currentLanguage === 'ru' ? 'Количество категорий' :
                              currentLanguage === 'en' ? 'Number of categories' :
                              'Санаттар саны';
    
    const statsHTML = `
        <div class="stat-card">
            <div class="stat-value">${formatAmount(stats.totalExpenses)}</div>
            <div class="stat-label">${totalExpensesText}</div>
        </div>
        <div class="stat-card">
            <div class="stat-value">${formatAmount(stats.averageExpense)}</div>
            <div class="stat-label">${averageExpenseText}</div>
        </div>
        <div class="stat-card">
            <div class="stat-value">${formatAmount(stats.currentMonthExpenses)}</div>
            <div class="stat-label">${currentMonthText}</div>
        </div>
        <div class="stat-card">
            <div class="stat-value">${stats.categoriesCount}</div>
            <div class="stat-label">${categoriesCountText}</div>
        </div>
    `;
    
    if (statsContainer) statsContainer.innerHTML = statsHTML;
    if (analyticsStatsContainer) analyticsStatsContainer.innerHTML = statsHTML;
}

function calculateExpenseStats() {
    if (!expenses || expenses.length === 0) {
        return { totalExpenses: 0, averageExpense: 0, currentMonthExpenses: 0, categoriesCount: 0 };
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
    
    return { totalExpenses, averageExpense, currentMonthExpenses, categoriesCount };
}

// ========== ФУНКЦИИ ДЛЯ ГРАФИКОВ ==========

function changeChartType(type) {
    currentChartType = type;
    
    document.querySelectorAll('.chart-type-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    if (type === 'total') {
        const totalChartBtn = document.getElementById('totalChartBtn');
        if (totalChartBtn) {
            totalChartBtn.classList.add('active');
        }
    } else {
        const categoriesChartBtn = document.getElementById('categoriesChartBtn');
        if (categoriesChartBtn) {
            categoriesChartBtn.classList.add('active');
        }
    }
    
    updateLineChart();
}

function updateCharts() {
    updateLineChart();
    updatePieChart();
    
    if (expenses.length > 0) {
        const emptyLineChart = document.getElementById('emptyLineChart');
        const emptyPieChart = document.getElementById('emptyPieChart');
        
        if (emptyLineChart) emptyLineChart.style.display = 'none';
        if (emptyPieChart) emptyPieChart.style.display = 'none';
    }
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
    
    if (lineChart) lineChart.destroy();
    
    const last30Days = [];
    for (let i = 29; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        last30Days.push(date.toISOString().split('T')[0]);
    }
    
    if (currentChartType === 'total') {
        const expensesByDate = {};
        last30Days.forEach(date => { expensesByDate[date] = 0; });
        
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
                label: currentLanguage === 'ru' ? 'Общие расходы' : 
                      currentLanguage === 'en' ? 'Total Expenses' : 'Жалпы шығындар',
                data: last30Days.map(date => expensesByDate[date]),
                borderColor: '#4F6DFF',
                backgroundColor: 'rgba(79, 109, 255, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#4F6DFF',
                pointBorderColor: '#FFFFFF',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        };
        
        lineChart = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { 
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#FFFFFF',
                        bodyColor: '#FFFFFF',
                        borderColor: '#4F6DFF',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        },
                        ticks: {
                            font: {
                                size: 12
                            }
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        },
                        ticks: { 
                            callback: value => '₸' + value.toLocaleString(),
                            font: {
                                size: 12
                            }
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                animation: {
                    duration: 1000,
                    easing: 'easeOutQuart'
                }
            }
        });
    } else {
        const categories = [...new Set(expenses.map(expense => expense.category))];
        
        const datasets = categories.map(category => {
            const categoryExpensesByDate = {};
            last30Days.forEach(date => { categoryExpensesByDate[date] = 0; });
            
            expenses.filter(expense => expense.category === category)
                .forEach(expense => {
                    if (categoryExpensesByDate[expense.date] !== undefined) {
                        categoryExpensesByDate[expense.date] += expense.amount;
                    }
                });
            
            return {
                label: category,
                data: last30Days.map(date => categoryExpensesByDate[date]),
                borderColor: categoryColors[category] || '#C9CBCF',
                backgroundColor: categoryColors[category] ? `${categoryColors[category]}20` : '#C9CBCF20',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: categoryColors[category] || '#C9CBCF',
                pointBorderColor: '#FFFFFF',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6
            };
        });
        
        const chartData = {
            labels: last30Days.map(date => {
                const d = new Date(date);
                return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
            }),
            datasets: datasets
        };
        
        lineChart = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { 
                    legend: { 
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#FFFFFF',
                        bodyColor: '#FFFFFF',
                        borderColor: '#4F6DFF',
                        borderWidth: 1,
                        cornerRadius: 8,
                        multiKeyBackground: '#FFFFFF'
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        },
                        ticks: {
                            font: {
                                size: 12
                            }
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        },
                        ticks: { 
                            callback: value => '₸' + value.toLocaleString(),
                            font: {
                                size: 12
                            }
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                animation: {
                    duration: 1000,
                    easing: 'easeOutQuart'
                }
            }
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
    
    if (pieChart) pieChart.destroy();
    
    const expensesByCategory = {};
    expenses.forEach(expense => {
        if (!expensesByCategory[expense.category]) {
            expensesByCategory[expense.category] = 0;
        }
        expensesByCategory[expense.category] += expense.amount;
    });
    
    const categories = Object.keys(expensesByCategory);
    const amounts = Object.values(expensesByCategory);
    const backgroundColors = categories.map(category => categoryColors[category] || '#9966FF');
    const hoverColors = backgroundColors.map(color => {
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, 0.8)`;
    });
    
    const chartData = {
        labels: categories,
        datasets: [{
            data: amounts,
            backgroundColor: backgroundColors,
            borderWidth: 2,
            borderColor: '#FFFFFF',
            hoverBackgroundColor: hoverColors,
            hoverBorderColor: '#FFFFFF',
            hoverBorderWidth: 3
        }]
    };
    
    pieChart = new Chart(ctx, {
        type: 'doughnut',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { 
                legend: { 
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        pointStyle: 'circle',
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#FFFFFF',
                    bodyColor: '#FFFFFF',
                    borderColor: '#4F6DFF',
                    borderWidth: 1,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${label}: ${formatAmount(value)} (${percentage}%)`;
                        }
                    }
                }
            },
            cutout: '60%',
            animation: {
                animateScale: true,
                animateRotate: true,
                duration: 1000,
                easing: 'easeOutQuart'
            }
        }
    });
}

// ========== ФУНКЦИИ ДЛЯ МИССИЙ И МАГАЗИНА ==========

function updateFincoinsBalance() {
    const fincoinsBalance = document.getElementById('fincoinsBalance');
    const storeBalance = document.getElementById('storeBalance');
    
    if (fincoinsBalance) fincoinsBalance.textContent = fincoins.toLocaleString();
    if (storeBalance) storeBalance.textContent = fincoins.toLocaleString();
}

function addFincoins(amount) {
    fincoins += amount;
    saveUserData();
    updateFincoinsBalance();
    
    const successText = currentLanguage === 'ru' ? `+${amount} FinCoins!` :
                      currentLanguage === 'en' ? `+${amount} FinCoins!` :
                      `+${amount} FinCoins!`;
    
    showNotification(successText, 'success');
}

function renderMissions() {
    const missionsList = document.getElementById('missionsList');
    const completedMissionsList = document.getElementById('completedMissionsList');
    
    if (!missionsList) return;
    
    const userData = {
        expenses: expenses,
        goals: goals,
        fincoins: fincoins,
        completedMissions: missions.filter(m => m.completed).map(m => m.id),
        analyticsViews: (JSON.parse(localStorage.getItem(`userData_${currentUser.id}`) || '{}')).analyticsViews || 0,
        appVisits: appVisits
    };
    
    const availableMissions = appMissions.filter(mission => {
        const isCompleted = mission.condition(userData);
        return !isCompleted;
    });
    
    const completedMissions = appMissions.filter(mission => {
        const isCompleted = mission.condition(userData);
        return isCompleted;
    });
    
    if (availableMissions.length === 0) {
        missionsList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-trophy"></i>
                <p>${currentLanguage === 'ru' ? 'Все миссии выполнены!' : 
                    currentLanguage === 'en' ? 'All missions completed!' : 
                    'Барлық миссиялар орындалды!'}</p>
            </div>
        `;
    } else {
        missionsList.innerHTML = availableMissions.map((mission, index) => {
            const progress = mission.progress(userData);
            const isActive = activeMission && activeMission.id === mission.id;
            const difficultyColors = { 'easy': '#48BB78', 'medium': '#ED8936', 'hard': '#E53E3E' };
            const icon = missionIcons[mission.category] || 'fas fa-star';
            
            const startButtonText = isActive ? 
                (currentLanguage === 'ru' ? 'Активна' : 
                 currentLanguage === 'en' ? 'Active' : 'Белсенді') :
                translations[currentLanguage].startMission;
            
            return `
                <div class="mission-card ${isActive ? 'active' : ''}" 
                     onclick="showMissionDetail(${mission.id})">
                    <div class="mission-header">
                        <div class="mission-icon" style="background: ${difficultyColors[mission.difficulty]}20; color: ${difficultyColors[mission.difficulty]};">
                            <i class="${icon}"></i>
                        </div>
                        <div class="mission-info">
                            <div class="mission-title">${mission.title[currentLanguage]}</div>
                            <div class="mission-description">${mission.description[currentLanguage]}</div>
                        </div>
                        <div class="mission-reward">
                            <i class="fas fa-coins"></i>
                            <span>${mission.reward}</span>
                        </div>
                    </div>
                    <div class="mission-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${progress}%"></div>
                        </div>
                        <div class="progress-text">${Math.round(progress)}%</div>
                    </div>
                    <div class="mission-footer">
                        <div class="mission-difficulty difficulty-${mission.difficulty}">
                            ${getDifficultyText(mission.difficulty)}
                        </div>
                        <button class="mission-complete-btn ${isActive ? 'active' : ''}" 
                                onclick="event.stopPropagation(); startMission(${mission.id})" 
                                ${isActive ? 'disabled' : ''}>
                            ${startButtonText}
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    if (completedMissionsList) {
        if (completedMissions.length === 0) {
            completedMissionsList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-check-circle"></i>
                    <p>${currentLanguage === 'ru' ? 'Выполненных миссий пока нет' : 
                        currentLanguage === 'en' ? 'No completed missions yet' : 
                        'Орындалған миссиялар әлі жоқ'}</p>
                </div>
            `;
        } else {
            completedMissionsList.innerHTML = completedMissions.map(mission => {
                const difficultyColors = { 'easy': '#48BB78', 'medium': '#ED8936', 'hard': '#E53E3E' };
                const icon = missionIcons[mission.category] || 'fas fa-star';
                
                return `
                    <div class="mission-card completed">
                        <div class="mission-header">
                            <div class="mission-icon" style="background: ${difficultyColors[mission.difficulty]}20; color: ${difficultyColors[mission.difficulty]};">
                                <i class="${icon}"></i>
                            </div>
                            <div class="mission-info">
                                <div class="mission-title">${mission.title[currentLanguage]}</div>
                                <div class="mission-description">${mission.description[currentLanguage]}</div>
                            </div>
                            <div class="mission-reward">
                                <i class="fas fa-coins"></i>
                                <span>${mission.reward}</span>
                            </div>
                        </div>
                        <div class="mission-footer">
                            <div class="mission-difficulty difficulty-${mission.difficulty}">
                                ${getDifficultyText(mission.difficulty)}
                            </div>
                            <div class="mission-completed-badge">
                                <i class="fas fa-check"></i>
                                ${currentLanguage === 'ru' ? 'Выполнено' : 
                                  currentLanguage === 'en' ? 'Completed' : 'Орындалды'}
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }
    }
}

function startMission(missionId) {
    const mission = appMissions.find(m => m.id === missionId);
    if (!mission) return;
    
    if (activeMission && activeMission.id !== missionId) {
        showNotification(translations[currentLanguage].onlyOneMissionActive, 'info');
    }
    
    activeMission = {
        id: mission.id,
        title: mission.title[currentLanguage],
        description: mission.description[currentLanguage],
        reward: mission.reward,
        difficulty: mission.difficulty,
        category: mission.category,
        startedAt: new Date().toISOString()
    };
    
    saveUserData();
    updateMissionsProgress();
    updateActiveMissionDisplay();
    
    const startText = translations[currentLanguage].startMissionSuccess;
    showNotification(startText, 'success');
}

function updateActiveMissionDisplay() {
    const activeMissionBanner = document.getElementById('activeMissionBanner');
    const activeMissionSection = document.getElementById('activeMissionSection');
    const activeMissionCard = document.getElementById('activeMissionCard');
    
    if (!activeMission) {
        if (activeMissionBanner) activeMissionBanner.style.display = 'none';
        if (activeMissionSection) activeMissionSection.style.display = 'none';
        return;
    }
    
    const userData = {
        expenses: expenses,
        goals: goals,
        fincoins: fincoins,
        completedMissions: missions.filter(m => m.completed).map(m => m.id),
        analyticsViews: (JSON.parse(localStorage.getItem(`userData_${currentUser.id}`) || '{}')).analyticsViews || 0,
        appVisits: appVisits
    };
    
    const mission = appMissions.find(m => m.id === activeMission.id);
    const progress = mission ? mission.progress(userData) : 0;
    const difficultyColors = { 'easy': '#48BB78', 'medium': '#ED8936', 'hard': '#E53E3E' };
    const icon = missionIcons[activeMission.category] || 'fas fa-star';
    
    const missionHTML = `
        <div class="active-mission-content">
            <div class="active-mission-header">
                <h3>${translations[currentLanguage].activeMission}</h3>
                <button class="btn-icon" onclick="stopActiveMission()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="active-mission-details">
                <p>${activeMission.description}</p>
                <div class="active-mission-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progress}%"></div>
                    </div>
                    <div class="progress-text">${Math.round(progress)}%</div>
                </div>
                <div class="active-mission-info">
                    <div class="mission-reward">
                        <i class="fas fa-coins"></i>
                        <span>${activeMission.reward}</span> FinCoins
                    </div>
                    <div class="mission-difficulty difficulty-${activeMission.difficulty}">
                        ${getDifficultyText(activeMission.difficulty)}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    if (activeMissionBanner) {
        activeMissionBanner.innerHTML = missionHTML;
        activeMissionBanner.style.display = 'block';
    }
    
    if (activeMissionSection && activeMissionCard) {
        activeMissionSection.style.display = 'block';
        activeMissionCard.innerHTML = missionHTML;
    }
}

function stopActiveMission() {
    activeMission = null;
    saveUserData();
    updateMissionsProgress();
    updateActiveMissionDisplay();
    
    showNotification(
        currentLanguage === 'ru' ? 'Миссия остановлена' :
        currentLanguage === 'en' ? 'Mission stopped' :
        'Миссия тоқтатылды', 
        'info'
    );
}

function completeMission(missionId) {
    const mission = appMissions.find(m => m.id === missionId);
    if (!mission) return;
    
    const userData = {
        expenses: expenses,
        goals: goals,
        fincoins: fincoins,
        completedMissions: missions.filter(m => m.completed).map(m => m.id),
        analyticsViews: (JSON.parse(localStorage.getItem(`userData_${currentUser.id}`) || '{}')).analyticsViews || 0,
        appVisits: appVisits
    };
    
    if (mission.condition(userData)) {
        addFincoins(mission.reward);
        
        if (!missions.find(m => m.id === missionId)) {
            missions.push({ 
                id: missionId, 
                completed: true, 
                completedAt: new Date().toISOString(),
                reward: mission.reward
            });
        }
        
        if (activeMission && activeMission.id === missionId) {
            activeMission = null;
        }
        
        saveUserData();
        
        const successText = currentLanguage === 'ru' ? `Миссия "${mission.title[currentLanguage]}" выполнена! Получено ${mission.reward} FinCoins` :
                          currentLanguage === 'en' ? `Mission "${mission.title[currentLanguage]}" completed! Received ${mission.reward} FinCoins` :
                          `"${mission.title[currentLanguage]}" миссиясы орындалды! ${mission.reward} FinCoins алынды`;
        
        showNotification(successText, 'success');
        updateMissionsProgress();
        updateActiveMissionDisplay();
    } else {
        const warningText = currentLanguage === 'ru' ? 'Миссия еще не выполнена. Продолжайте в том же духе!' :
                          currentLanguage === 'en' ? 'Mission not completed yet. Keep it up!' :
                          'Миссия әлі орындалмады. Осылай жалғастырыңыз!';
        showNotification(warningText, 'warning');
    }
}

function startMissionProgressTracking() {
    if (missionProgressInterval) {
        clearInterval(missionProgressInterval);
    }
    
    missionProgressInterval = setInterval(() => {
        if (activeMission) {
            updateMissionsProgress();
        }
    }, 5000);
}

function updateMissionsProgress() {
    if (activeMission) {
        const userData = {
            expenses: expenses,
            goals: goals,
            fincoins: fincoins,
            completedMissions: missions.filter(m => m.completed).map(m => m.id),
            analyticsViews: (JSON.parse(localStorage.getItem(`userData_${currentUser.id}`) || '{}')).analyticsViews || 0,
            appVisits: appVisits
        };
        
        const mission = appMissions.find(m => m.id === activeMission.id);
        if (mission && mission.condition(userData)) {
            completeMission(activeMission.id);
        }
    }
    
    setTimeout(() => {
        renderMissions();
        updateActiveMissionDisplay();
    }, 50);
}

function showMissionDetail(missionId) {
    const mission = appMissions.find(m => m.id === missionId);
    if (!mission) return;
    
    const userData = {
        expenses: expenses,
        goals: goals,
        fincoins: fincoins,
        completedMissions: missions.filter(m => m.completed).map(m => m.id),
        analyticsViews: (JSON.parse(localStorage.getItem(`userData_${currentUser.id}`) || '{}')).analyticsViews || 0,
        appVisits: appVisits
    };
    
    const progress = mission.progress(userData);
    const isCompleted = mission.condition(userData);
    const isActive = activeMission && activeMission.id === missionId;
    const difficultyColors = { 'easy': '#48BB78', 'medium': '#ED8936', 'hard': '#E53E3E' };
    
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
        background: rgba(0,0,0,0.5); display: flex; justify-content: center; 
        align-items: center; z-index: 1000;
    `;
    
    const progressText = currentLanguage === 'ru' ? 'Прогресс выполнения:' :
                       currentLanguage === 'en' ? 'Completion progress:' :
                       'Орындау прогрессі:';
    
    const requirementsText = currentLanguage === 'ru' ? 'Требования:' :
                           currentLanguage === 'en' ? 'Requirements:' :
                           'Талаптар:';
    
    const closeText = currentLanguage === 'ru' ? 'Закрыть' :
                    currentLanguage === 'en' ? 'Close' :
                    'Жабу';
    
    const getRewardText = isCompleted ? 
        (currentLanguage === 'ru' ? 'Выполнено' : 
         currentLanguage === 'en' ? 'Completed' : 'Орындалды') :
        (isActive ? 
            (currentLanguage === 'ru' ? 'Активна' : 
             currentLanguage === 'en' ? 'Active' : 'Белсенді') :
            translations[currentLanguage].startMission);
    
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 500px; width: 90%;">
            <div class="modal-header">
                <h3>${mission.title[currentLanguage]}</h3>
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div style="margin-bottom: 20px;">
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
                    <div style="width: 50px; height: 50px; background: ${difficultyColors[mission.difficulty]}20; 
                         border-radius: 12px; display: flex; align-items: center; justify-content: center; 
                         color: ${difficultyColors[mission.difficulty]}; font-size: 20px;">
                        <i class="${missionIcons[mission.category] || 'fas fa-star'}"></i>
                    </div>
                    <div>
                        <div style="font-weight: 600; color: var(--text);">${mission.description[currentLanguage]}</div>
                        <div style="display: flex; gap: 12px; margin-top: 8px;">
                            <div style="display: flex; align-items: center; gap: 4px; color: var(--primary); font-weight: 600;">
                                <i class="fas fa-coins"></i>
                                <span>${mission.reward} FinCoins</span>
                            </div>
                            <div class="mission-difficulty difficulty-${mission.difficulty}">
                                ${getDifficultyText(mission.difficulty)}
                            </div>
                        </div>
                    </div>
                </div>
                
                <div style="margin-bottom: 16px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span style="font-weight: 600; color: var(--text);">${progressText}</span>
                        <span style="color: var(--primary); font-weight: 600;">${Math.round(progress)}%</span>
                    </div>
                    <div style="background: var(--border); height: 8px; border-radius: 4px; overflow: hidden;">
                        <div style="background: var(--primary); height: 100%; width: ${progress}%; transition: width 0.5s ease;"></div>
                    </div>
                </div>
                
                <div style="background: var(--light-bg); padding: 16px; border-radius: var(--radius-sm);">
                    <div style="font-weight: 600; margin-bottom: 12px; color: var(--text);">${requirementsText}</div>
                    <ul style="color: var(--text-light); padding-left: 20px;">
                        ${mission.requirements[currentLanguage].map(req => `<li style="margin-bottom: 8px;">${req}</li>`).join('')}
                    </ul>
                </div>
            </div>
            
            <div style="display: flex; gap: 12px;">
                <button class="btn btn-outline" onclick="this.closest('.modal-overlay').remove()" style="flex: 1;">
                    ${closeText}
                </button>
                <button class="btn btn-primary" onclick="startMission(${mission.id}); this.closest('.modal-overlay').remove()" 
                        style="flex: 1;" ${isCompleted || isActive ? 'disabled' : ''}>
                    ${getRewardText}
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function buyItem(itemId, price) {
    if (fincoins >= price) {
        fincoins -= price;
        purchasedItems.push(itemId);
        saveUserData();
        updateFincoinsBalance();
        
        const successText = currentLanguage === 'ru' ? 'Покупка совершена успешно!' :
                          currentLanguage === 'en' ? 'Purchase completed successfully!' :
                          'Сатып алу сәтті аяқталды!';
        
        showNotification(successText, 'success');
    } else {
        const errorText = currentLanguage === 'ru' ? 'Недостаточно FinCoins для покупки' :
                        currentLanguage === 'en' ? 'Not enough FinCoins for purchase' :
                        'Сатып алу үшін FinCoins жеткіліксіз';
        showNotification(errorText, 'error');
    }
}

function buyPremiumSubscription() {
    buyItem('premium_subscription', 1500);
}

// ========== ФУНКЦИИ ДЛЯ ЧАТА С КНОПКОЙ ОЧИСТКИ ==========

function loadChatHistory() {
    if (currentUser) {
        const savedChat = localStorage.getItem(`chatHistory_${currentUser.id}`);
        if (savedChat) {
            chatHistory = JSON.parse(savedChat);
        } else {
            chatHistory = [{
                type: 'ai',
                content: translations[currentLanguage].welcomeMessage,
                timestamp: new Date().toISOString()
            }];
            saveChatHistory();
        }
    } else {
        const savedChat = localStorage.getItem('chatHistory_anonymous');
        if (savedChat) {
            chatHistory = JSON.parse(savedChat);
        } else {
            chatHistory = [{
                type: 'ai',
                content: translations[currentLanguage].welcomeMessage,
                timestamp: new Date().toISOString()
            }];
            localStorage.setItem('chatHistory_anonymous', JSON.stringify(chatHistory));
        }
    }
}

function saveChatHistory() {
    if (currentUser) {
        localStorage.setItem(`chatHistory_${currentUser.id}`, JSON.stringify(chatHistory));
    } else {
        localStorage.setItem('chatHistory_anonymous', JSON.stringify(chatHistory));
    }
}

function scrollChatToBottom() {
    const chatMessages = document.getElementById('chatMessages');
    if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        setTimeout(() => {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 50);
    }
}

function fixChatScroll() {
    const chatContainer = document.getElementById('chat');
    const chatMessages = document.getElementById('chatMessages');
    
    if (chatContainer && chatMessages) {
        const headerHeight = document.getElementById('appHeader')?.offsetHeight || 0;
        const inputHeight = document.querySelector('.chat-input-container')?.offsetHeight || 0;
        const availableHeight = window.innerHeight - headerHeight - inputHeight - 40;
        
        chatMessages.style.maxHeight = `${availableHeight}px`;
        chatMessages.style.overflowY = 'auto';
        chatMessages.style.paddingBottom = '60px';
        chatContainer.style.overflow = 'hidden';
        chatMessages.style.overflowY = 'scroll';
        
        const messageContents = chatMessages.querySelectorAll('.message-content');
        messageContents.forEach(content => {
            content.style.fontSize = '16px';
            content.style.lineHeight = '1.5';
        });
    }
}

function handleChatInput(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function sendMessageButton() {
    sendMessage();
}

function renderChatMessages() {
    renderChatMessagesWithHistory();
}

// ========== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ==========

function forceSync() {
    saveUserData();
    
    const syncText = currentLanguage === 'ru' ? 'Данные синхронизированы' :
                   currentLanguage === 'en' ? 'Data synchronized' :
                   'Деректер синхрондалды';
    
    showNotification(syncText, 'success');
}

function getDifficultyText(difficulty) {
    const texts = {
        'easy': currentLanguage === 'ru' ? 'Легко' : currentLanguage === 'en' ? 'Easy' : 'Оңай',
        'medium': currentLanguage === 'ru' ? 'Средне' : currentLanguage === 'en' ? 'Medium' : 'Орташа',
        'hard': currentLanguage === 'ru' ? 'Сложно' : currentLanguage === 'en' ? 'Hard' : 'Қиын'
    };
    return texts[difficulty] || difficulty;
}

// ========== ФУНКЦИИ ДЛЯ ФОРМАТИРОВАНИЯ ==========

function formatAmount(amount) {
    return Math.round(amount).toLocaleString('ru-RU') + ' ₸';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString(currentLanguage, { 
        day: 'numeric', 
        month: 'short',
        year: 'numeric'
    });
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

// ========== КАЛЕНДАРЬ ==========

function openCalendar() {
    const calendarModal = document.getElementById('calendarModal');
    if (calendarModal) {
        calendarModal.style.display = 'flex';
        fadeInElement(calendarModal);
        renderCalendar();
    }
}

function closeCalendarModal() {
    const calendarModal = document.getElementById('calendarModal');
    if (calendarModal) {
        calendarModal.style.display = 'none';
    }
}

function changeCalendarMonth(direction) {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() + direction);
    renderCalendar();
}

function renderCalendar() {
    const calendarDays = document.getElementById('calendarDays');
    const calendarMonthYear = document.getElementById('calendarMonthYear');
    
    if (!calendarDays || !calendarMonthYear) return;
    
    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth();
    
    const monthNames = {
        ru: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        en: ['January', 'February', 'Март', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        kz: ['Қаңтар', 'Ақпан', 'Наурыз', 'Сәуір', 'Мамыр', 'Маусым', 'Шілде', 'Тамыз', 'Қыркүйек', 'Қазан', 'Қараша', 'Желтоқсан']
    };
    
    calendarMonthYear.textContent = `${monthNames[currentLanguage][month]} ${year}`;
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    let firstDayIndex = firstDay.getDay();
    firstDayIndex = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
    
    calendarDays.innerHTML = '';
    
    for (let i = 0; i < firstDayIndex; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day other-month';
        calendarDays.appendChild(emptyDay);
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 1; i <= daysInMonth; i++) {
        const day = document.createElement('div');
        day.className = 'calendar-day';
        day.textContent = i;
        
        const currentDate = new Date(year, month, i);
        currentDate.setHours(0, 0, 0, 0);
        
        if (currentDate.getTime() === today.getTime()) {
            day.classList.add('today');
        }
        
        if (selectedCalendarDate && 
            selectedCalendarDate.getDate() === i &&
            selectedCalendarDate.getMonth() === month &&
            selectedCalendarDate.getFullYear() === year) {
            day.classList.add('selected');
        }
        
        day.addEventListener('click', () => {
            selectCalendarDate(new Date(year, month, i));
        });
        
        calendarDays.appendChild(day);
    }
}

function selectCalendarDate(date) {
    selectedCalendarDate = date;
    
    const expenseDateInput = document.getElementById('expenseDate');
    if (expenseDateInput) {
        const formattedDate = date.toISOString().split('T')[0];
        expenseDateInput.value = formattedDate;
    }
    
    closeCalendarModal();
    renderCalendar();
}

// ========== ФУНКЦИИ ДЛЯ КНОПОК ВЫБОРА ВОЗРАСТА ==========

function showLoginFromSelection() {
    const accountTypePage = document.getElementById('accountTypePage');
    const authPage = document.getElementById('authPage');
    
    if (accountTypePage) accountTypePage.style.display = 'none';
    if (authPage) {
        authPage.style.display = 'block';
        showLoginForm();
    }
}

function showAccountTypeSelection() {
    const authPage = document.getElementById('authPage');
    const accountTypePage = document.getElementById('accountTypePage');
    
    if (authPage) authPage.style.display = 'none';
    if (accountTypePage) {
        accountTypePage.style.display = 'flex';
        fadeInElement(accountTypePage);
    }
    
    selectedAccountType = null;
    document.querySelectorAll('.account-type-button').forEach(btn => {
        btn.classList.remove('selected');
    });
}

// ========== ИНИЦИАЛИЗАЦИЯ ЯЗЫКА И ТЕМЫ ==========

function initLanguage() {
    const savedLanguage = localStorage.getItem('userLanguage');
    if (savedLanguage) {
        currentLanguage = savedLanguage;
    } else {
        const browserLang = navigator.language || navigator.userLanguage;
        if (browserLang.startsWith('ru')) {
            currentLanguage = 'ru';
        } else if (browserLang.startsWith('kk') || browserLang.startsWith('kz')) {
            currentLanguage = 'kz';
        } else {
            currentLanguage = 'en';
        }
        localStorage.setItem('userLanguage', currentLanguage);
    }
    
    const savedTheme = localStorage.getItem('appTheme') || 'dark';
    changeTheme(savedTheme, false);
    
    updateLanguage();
}

function updateLanguage() {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
    
    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            element.setAttribute('placeholder', translations[currentLanguage][key]);
        }
    });
    
    document.title = translations[currentLanguage].appTitle;
    
    if (currentUser) {
        updateUserInterface();
        updateAIAdvice();
        updateExpenseStats();
        renderGoals();
        renderMissions();
        updateActiveMissionDisplay();
        updateSettingsInterface();
    }
    
    updateLanguageButtons();
}

function updateLanguageButtons() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const activeLangBtn = document.querySelector(`.lang-btn[data-lang="${currentLanguage}"]`);
    if (activeLangBtn) {
        activeLangBtn.classList.add('active');
    }
}

function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('userLanguage', lang);
    updateLanguage();
    
    if (chatHistory.length > 0 && chatHistory[0].type === 'ai') {
        chatHistory[0].content = translations[currentLanguage].welcomeMessage;
        saveChatHistory();
        if (document.getElementById('chat').style.display !== 'none') {
            renderChatMessagesWithHistory();
        }
    }
    
    let langName = '';
    if (lang === 'ru') langName = 'русский';
    else if (lang === 'en') langName = 'English';
    else if (lang === 'kz') langName = 'қазақша';
    
    const successText = currentLanguage === 'ru' ? `Язык изменен на ${langName}` :
                      currentLanguage === 'en' ? `Language changed to ${langName}` :
                      `Тіл ${langName} тіліне өзгертілді`;
    
    showNotification(successText, 'success');
}

// ========== ФУНКЦИИ ДЛЯ СМЕНЫ ТЕМЫ ==========

function changeTheme(theme, showNotification = true) {
    localStorage.setItem('appTheme', theme);
    document.body.setAttribute('data-theme', theme);
    
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const activeThemeBtn = document.querySelector(`.theme-btn[onclick*="'${theme}'"]`);
    if (activeThemeBtn) {
        activeThemeBtn.classList.add('active');
    }
    
    if (showNotification) {
        const themeName = translations[currentLanguage][theme === 'light' ? 'themeLight' : 
                                                      theme === 'dark' ? 'themeDark' : 
                                                      theme === 'auto' ? 'themeAuto' : theme];
        const successText = currentLanguage === 'ru' ? `Тема изменена на "${themeName}"` :
                          currentLanguage === 'en' ? `Theme changed to "${themeName}"` :
                          `Тақырып "${themeName}" түріне өзгертілді`;
        
        showNotification(successText, 'success');
    }
}

// ========== ФУНКЦИИ ДЛЯ СКРОЛЛА И ОПТИМИЗАЦИИ ==========

function fixScrollIssues() {
    const pages = ['dashboard', 'analytics', 'missions', 'store', 'settings', 'chat', 'adminPanel'];
    
    pages.forEach(page => {
        const pageElement = document.getElementById(page);
        if (pageElement && pageElement.style.display !== 'none') {
            pageElement.classList.add('scroll-container');
        }
    });
    
    if (document.getElementById('chat')?.style.display !== 'none') {
        fixChatScroll();
    }
}

function fixProfileScroll() {
    const settingsPage = document.getElementById('settings');
    if (settingsPage) {
        settingsPage.classList.add('scroll-container');
    }
}

// ========== ФУНКЦИИ ДЛЯ ИНСТРУКЦИИ ==========

function openInstructions() {
    const instructionModal = document.getElementById('instructionModal');
    if (instructionModal) {
        instructionModal.style.display = 'flex';
        fadeInElement(instructionModal);
        updateInstructionContent();
    }
}

function closeInstructionModal() {
    const instructionModal = document.getElementById('instructionModal');
    if (instructionModal) {
        instructionModal.style.display = 'none';
    }
}

function updateInstructionContent() {
    const instructionContent = document.getElementById('instructionContent');
    if (!instructionContent) return;
    
    instructionContent.innerHTML = `
        <div class="instruction-section">
            <h2>${translations[currentLanguage].instructionsModalTitle}</h2>
            <p class="instruction-intro">${translations[currentLanguage].instructionsWelcome}</p>
            <p>${translations[currentLanguage].instructionsIntro}</p>
            
            <div class="instruction-step">
                <h3>${translations[currentLanguage].instructionsSection1}</h3>
                <ul>
                    <li><i class="fas fa-chart-bar"></i> ${translations[currentLanguage].instructionsSection1Item1}</li>
                    <li><i class="fas fa-robot"></i> ${translations[currentLanguage].instructionsSection1Item2}</li>
                    <li><i class="fas fa-bullseye"></i> ${translations[currentLanguage].instructionsSection1Item3}</li>
                </ul>
            </div>
            
            <div class="instruction-step">
                <h3>${translations[currentLanguage].instructionsSection2}</h3>
                <ul>
                    <li><i class="fas fa-chart-line"></i> ${translations[currentLanguage].instructionsSection2Item1}</li>
                    <li><i class="fas fa-plus-circle"></i> ${translations[currentLanguage].instructionsSection2Item2}</li>
                    <li><i class="fas fa-history"></i> ${translations[currentLanguage].instructionsSection2Item3}</li>
                </ul>
            </div>
            
            <div class="instruction-step">
                <h3>${translations[currentLanguage].instructionsSection3}</h3>
                <ul>
                    <li><i class="fas fa-tasks"></i> ${translations[currentLanguage].instructionsSection3Item1}</li>
                    <li><i class="fas fa-coins"></i> ${translations[currentLanguage].instructionsSection3Item2}</li>
                    <li><i class="fas fa-chart-pie"></i> ${translations[currentLanguage].instructionsSection3Item3}</li>
                </ul>
            </div>
            
            <div class="instruction-step">
                <h3>${translations[currentLanguage].instructionsSection4}</h3>
                <ul>
                    <li><i class="fas fa-crown"></i> ${translations[currentLanguage].instructionsSection4Item1}</li>
                    <li><i class="fas fa-shopping-cart"></i> ${translations[currentLanguage].instructionsSection4Item2}</li>
                </ul>
            </div>
            
            <div class="instruction-step">
                <h3>${translations[currentLanguage].instructionsSection5}</h3>
                <ul>
                    <li><i class="fas fa-comment-dots"></i> ${translations[currentLanguage].instructionsSection5Item1}</li>
                    <li><i class="fas fa-question-circle"></i> ${translations[currentLanguage].instructionsSection5Item2}</li>
                </ul>
            </div>
            
            <div class="instruction-tips">
                <h4>${currentLanguage === 'ru' ? 'Полезные советы:' : currentLanguage === 'en' ? 'Useful tips:' : 'Пайдалы кеңестер:'}</h4>
                <ul>
                    <li>${currentLanguage === 'ru' ? 'Регулярно добавляйте расходы для точной статистики' : currentLanguage === 'en' ? 'Regularly add expenses for accurate statistics' : 'Дәл статистика үшін шығындарды үнемі қосыңыз'}</li>
                    <li>${currentLanguage === 'ru' ? 'Ставьте реалистичные финансовые цели' : currentLanguage === 'en' ? 'Set realistic financial goals' : 'Реалистік қаржылық мақсаттарды белгілеңіз'}</li>
                    <li>${currentLanguage === 'ru' ? 'Выполняйте миссии для получения дополнительных наград' : currentLanguage === 'en' ? 'Complete missions for additional rewards' : 'Қосымша сыйлықтар алу үшін миссияларды орындаңыз'}</li>
                    <li>${currentLanguage === 'ru' ? 'Используйте AI-помощника для получения персонализированных советов' : currentLanguage === 'en' ? 'Use AI assistant for personalized advice' : 'Жекелендірілген кеңес алу үшін ЖК-көмекшіні пайдаланыңыз'}</li>
                </ul>
            </div>
        </div>
    `;
}

// ========== ФУНКЦИИ ДЛЯ ОТЧЕТОВ ==========

function openReportModal(reportType) {
    const reportModal = document.getElementById('reportModal');
    if (reportModal) {
        reportModal.style.display = 'flex';
        fadeInElement(reportModal);
        generateReport(reportType);
    }
}

function closeReportModal() {
    const reportModal = document.getElementById('reportModal');
    if (reportModal) {
        reportModal.style.display = 'none';
    }
}

function generateReport(reportType) {
    const reportContent = document.getElementById('reportContent');
    if (!reportContent) return;
    
    let reportHTML = '';
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString(currentLanguage, {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    
    if (reportType === 'monthly') {
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        
        const monthExpenses = expenses.filter(expense => {
            const expenseDate = new Date(expense.date);
            return expenseDate.getMonth() === currentMonth && 
                   expenseDate.getFullYear() === currentYear;
        });
        
        const totalMonthExpenses = monthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
        
        const expensesByCategory = {};
        monthExpenses.forEach(expense => {
            if (!expensesByCategory[expense.category]) {
                expensesByCategory[expense.category] = 0;
            }
            expensesByCategory[expense.category] += expense.amount;
        });
        
        const categories = Object.keys(expensesByCategory);
        const sortedCategories = categories.sort((a, b) => expensesByCategory[b] - expensesByCategory[a]);
        
        reportHTML = `
            <div class="report-header">
                <h2>${translations[currentLanguage].monthlyReport}</h2>
                <p>${formattedDate}</p>
            </div>
            
            <div class="report-summary">
                <h3>${currentLanguage === 'ru' ? 'Общая статистика за месяц' : 
                     currentLanguage === 'en' ? 'Monthly summary' : 
                     'Айлық қорытынды'}</h3>
                <div class="report-stats">
                    <div class="report-stat">
                        <span class="stat-label">${currentLanguage === 'ru' ? 'Всего расходов' : 
                                               currentLanguage === 'en' ? 'Total expenses' : 
                                               'Жалпы шығындар'}</span>
                        <span class="stat-value">${formatAmount(totalMonthExpenses)}</span>
                    </div>
                    <div class="report-stat">
                        <span class="stat-label">${currentLanguage === 'ru' ? 'Количество трат' : 
                                               currentLanguage === 'en' ? 'Number of expenses' : 
                                               'Шығындар саны'}</span>
                        <span class="stat-value">${monthExpenses.length}</span>
                    </div>
                    <div class="report-stat">
                        <span class="stat-label">${currentLanguage === 'ru' ? 'Категории' : 
                                               currentLanguage === 'en' ? 'Categories' : 
                                               'Санаттар'}</span>
                        <span class="stat-value">${categories.length}</span>
                    </div>
                </div>
            </div>
            
            <div class="report-categories">
                <h3>${currentLanguage === 'ru' ? 'Расходы по категориям' : 
                     currentLanguage === 'en' ? 'Expenses by category' : 
                     'Санаттар бойынша шығындар'}</h3>
                <div class="categories-list">
                    ${sortedCategories.map(category => {
                        const amount = expensesByCategory[category];
                        const percentage = totalMonthExpenses > 0 ? Math.round((amount / totalMonthExpenses) * 100) : 0;
                        return `
                            <div class="category-item">
                                <div class="category-info">
                                    <span class="category-name">${category}</span>
                                    <span class="category-percentage">${percentage}%</span>
                                </div>
                                <div class="category-amount">${formatAmount(amount)}</div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
            
            <div class="report-insights">
                <h3>${currentLanguage === 'ru' ? 'Аналитика и рекомендации' : 
                     currentLanguage === 'en' ? 'Insights & Recommendations' : 
                     'Талдау және ұсыныстар'}</h3>
                <p>${generateReportInsights(monthExpenses, totalMonthExpenses)}</p>
            </div>
        `;
    } else {
        const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        const averageExpense = expenses.length > 0 ? Math.round(totalExpenses / expenses.length) : 0;
        
        const topExpenses = [...expenses].sort((a, b) => b.amount - a.amount).slice(0, 5);
        
        reportHTML = `
            <div class="report-header">
                <h2>${translations[currentLanguage].detailedReport}</h2>
                <p>${formattedDate}</p>
            </div>
            
            <div class="report-summary">
                <h3>${currentLanguage === 'ru' ? 'Общая статистика' : 
                     currentLanguage === 'en' ? 'Overall statistics' : 
                     'Жалпы статистика'}</h3>
                <div class="report-stats">
                    <div class="report-stat">
                        <span class="stat-label">${currentLanguage === 'ru' ? 'Всего расходов' : 
                                               currentLanguage === 'en' ? 'Total expenses' : 
                                               'Жалпы шығындар'}</span>
                        <span class="stat-value">${formatAmount(totalExpenses)}</span>
                    </div>
                    <div class="report-stat">
                        <span class="stat-label">${currentLanguage === 'ru' ? 'Количество трат' : 
                                               currentLanguage === 'en' ? 'Number of expenses' : 
                                               'Шығындар саны'}</span>
                        <span class="stat-value">${expenses.length}</span>
                    </div>
                    <div class="report-stat">
                        <span class="stat-label">${currentLanguage === 'ru' ? 'Средний расход' : 
                                               currentLanguage === 'en' ? 'Average expense' : 
                                               'Орташа шығын'}</span>
                        <span class="stat-value">${formatAmount(averageExpense)}</span>
                    </div>
                </div>
            </div>
            
            <div class="report-top-expenses">
                <h3>${currentLanguage === 'ru' ? 'Самые крупные расходы' : 
                     currentLanguage === 'en' ? 'Top expenses' : 
                     'Ең үлкен шығындар'}</h3>
                <div class="expenses-list">
                    ${topExpenses.map(expense => `
                        <div class="expense-item">
                            <div class="expense-category">${expense.category}</div>
                            <div class="expense-description">${expense.description}</div>
                            <div class="expense-amount">${formatAmount(expense.amount)}</div>
                            <div class="expense-date">${formatDate(expense.date)}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="report-trends">
                <h3>${currentLanguage === 'ru' ? 'Тренды и прогнозы' : 
                     currentLanguage === 'en' ? 'Trends & Forecasts' : 
                     'Трендтер және болжамдар'}</h3>
                <p>${generateTrendsAnalysis()}</p>
            </div>
        `;
    }
    
    reportContent.innerHTML = reportHTML;
    currentReport = reportType;
}

function generateReportInsights(monthExpenses, totalMonthExpenses) {
    if (monthExpenses.length === 0) {
        return currentLanguage === 'ru' ? 
            "У вас нет расходов за этот месяц. Начните добавлять расходы для получения аналитики." :
            currentLanguage === 'en' ? 
            "You have no expenses this month. Start adding expenses to get analytics." :
            "Бұл айда сізде шығындар жоқ. Талдау алу үшін шығындарды қосуды бастаңыз.";
    }
    
    const foodExpenses = monthExpenses
        .filter(e => e.category === 'Еда')
        .reduce((sum, e) => sum + e.amount, 0);
    
    const foodPercentage = totalMonthExpenses > 0 ? Math.round((foodExpenses / totalMonthExpenses) * 100) : 0;
    
    let insights = [];
    
    if (foodPercentage > 40) {
        insights.push(currentLanguage === 'ru' ? 
            "Вы тратите много на еду. Попробуйте готовить дома чаще." :
            currentLanguage === 'en' ? 
            "You spend a lot on food. Try cooking at home more often." :
            "Тамаққа көп жұмсайсыз. Үйде жиі пісіруге тырысыңыз.");
    }
    
    if (totalMonthExpenses > 50000) {
        insights.push(currentLanguage === 'ru' ? 
            "Ваши расходы выше среднего. Рекомендуем проанализировать регулярные платежи." :
            currentLanguage === 'en' ? 
            "Your expenses are above average. We recommend analyzing regular payments." :
            "Сіздің шығыстарыңыз орташадан жоғары. Тұрақты төлемдерді талдаған жөн.");
    }
    
    if (monthExpenses.length < 10) {
        insights.push(currentLanguage === 'ru' ? 
            "У вас мало расходов. Возможно, вы что-то упускаете из виду." :
            currentLanguage === 'en' ? 
            "You have few expenses. You might be missing something." :
            "Сізде аз шығындар бар. Мүмкін, бір нәрсені ескермейсіз.");
    }
    
    if (insights.length === 0) {
        insights.push(currentLanguage === 'ru' ? 
            "Ваши расходы выглядят сбалансированно. Продолжайте в том же духе!" :
            currentLanguage === 'en' ? 
            "Your expenses look balanced. Keep it up!" :
            "Сіздің шығыстарыңыз теңгерімді көрінеді. Осылай жалғастырыңыз!");
    }
    
    return insights.join(' ');
}

function generateTrendsAnalysis() {
    if (expenses.length < 5) {
        return currentLanguage === 'ru' ? 
            "Недостаточно данных для анализа трендов. Добавьте больше расходов." :
            currentLanguage === 'en' ? 
            "Not enough data for trend analysis. Add more expenses." :
            "Трендтерді талдау үшін деректер жеткіліксіз. Көбірек шығындарды қосыңыз.";
    }
    
    const lastWeekExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return expenseDate >= weekAgo;
    });
    
    const lastWeekTotal = lastWeekExpenses.reduce((sum, e) => sum + e.amount, 0);
    const averageWeekly = expenses.length > 0 ? 
        Math.round((expenses.reduce((sum, e) => sum + e.amount, 0) / expenses.length) * 7) : 0;
    
    if (lastWeekTotal > averageWeekly * 1.2) {
        return currentLanguage === 'ru' ? 
            "На прошлой неделе вы потратили больше обычного. Обратите внимание на необязательные расходы." :
            currentLanguage === 'en' ? 
            "Last week you spent more than usual. Pay attention to unnecessary expenses." :
            "Өткен аптада сіз әдеттегіден көп жұмсадыңыз. Қажетсіз шығындарға назар аударыңыз.";
    } else if (lastWeekTotal < averageWeekly * 0.8) {
        return currentLanguage === 'ru' ? 
            "На прошлой неделе вы потратили меньше обычного. Отличная работа по экономии!" :
            currentLanguage === 'en' ? 
            "Last week you spent less than usual. Great job on saving!" :
            "Өткен аптада сіз әдеттегіден аз жұмсадыңыз. Үнемдеу бойынша тамаша жұмыс!";
    } else {
        return currentLanguage === 'ru' ? 
            "Ваши расходы стабильны. Продолжайте контролировать бюджет." :
            currentLanguage === 'en' ? 
            "Your expenses are stable. Continue to control your budget." :
            "Сіздің шығыстарыңыз тұрақты. Бюджетті бақылауды жалғастырыңыз.";
    }
}

function shareReport() {
    if (!currentReport) return;
    
    const reportText = currentLanguage === 'ru' ? 
        `Мой финансовый отчет из FinanceMind: ${window.location.href}` :
        currentLanguage === 'en' ? 
        `My financial report from FinanceMind: ${window.location.href}` :
        `FinanceMind-тен қаржылық есебім: ${window.location.href}`;
    
    if (navigator.share) {
        navigator.share({
            title: translations[currentLanguage].appTitle,
            text: reportText,
            url: window.location.href
        });
    } else {
        navigator.clipboard.writeText(reportText);
        showNotification(
            currentLanguage === 'ru' ? 'Ссылка на отчет скопирована в буфер обмена' :
            currentLanguage === 'en' ? 'Report link copied to clipboard' :
            'Есеп сілтемесі алмасу буферіне көшірілді',
            'success'
        );
    }
}

function downloadReport() {
    if (!currentReport) return;
    
    const reportContent = document.getElementById('reportContent');
    if (!reportContent) return;
    
    // Создаем canvas для конвертации в PNG
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Устанавливаем размеры canvas
    canvas.width = 800;
    canvas.height = 600;
    
    // Заполняем фон
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Добавляем заголовок
    ctx.fillStyle = '#333333';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(translations[currentLanguage][currentReport === 'monthly' ? 'monthlyReport' : 'detailedReport'], canvas.width/2, 50);
    
    // Добавляем дату
    ctx.font = '16px Arial';
    const currentDate = new Date().toLocaleDateString(currentLanguage);
    ctx.fillText(currentDate, canvas.width/2, 80);
    
    // Добавляем основные данные (упрощенная версия)
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const monthExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getMonth() === currentMonth && 
               expenseDate.getFullYear() === currentYear;
    }).reduce((sum, expense) => sum + expense.amount, 0);
    
    ctx.fillStyle = '#4F6DFF';
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(currentLanguage === 'ru' ? 'Основные показатели:' : 
                currentLanguage === 'en' ? 'Key metrics:' : 'Негізгі көрсеткіштер:', 50, 120);
    
    ctx.fillStyle = '#666666';
    ctx.font = '16px Arial';
    ctx.fillText(`${currentLanguage === 'ru' ? 'Всего расходов:' : 
                 currentLanguage === 'en' ? 'Total expenses:' : 
                 'Жалпы шығындар:'} ${formatAmount(totalExpenses)}`, 50, 150);
    
    ctx.fillText(`${currentLanguage === 'ru' ? 'Расходы за месяц:' : 
                 currentLanguage === 'en' ? 'Monthly expenses:' : 
                 'Айдағы шығындар:'} ${formatAmount(monthExpenses)}`, 50, 180);
    
    ctx.fillText(`${currentLanguage === 'ru' ? 'Количество записей:' : 
                 currentLanguage === 'en' ? 'Number of records:' : 
                 'Жазбалар саны:'} ${expenses.length}`, 50, 210);
    
    // Добавляем подпись
    ctx.fillStyle = '#999999';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`${translations[currentLanguage].appTitle} - ${currentDate}`, canvas.width/2, canvas.height - 20);
    
    // Конвертируем canvas в PNG и скачиваем
    const link = document.createElement('a');
    link.download = `financemind_report_${new Date().toISOString().split('T')[0]}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    
    showNotification(
        currentLanguage === 'ru' ? 'Отчет успешно скачан в формате PNG' :
        currentLanguage === 'en' ? 'Report successfully downloaded as PNG' :
        'Есеп PNG форматында сәтті жүктелді',
        'success'
    );
}

// ========== ФУНКЦИИ ДЛЯ АДМИН ПАНЕЛИ ==========

function loadAdminData() {
    const users = JSON.parse(localStorage.getItem('financemind_users') || '[]');
    const totalFincoins = users.reduce((sum, user) => {
        const userData = JSON.parse(localStorage.getItem(`userData_${user.id}`) || '{}');
        return sum + (userData.totalFincoinsEarned || 0);
    }, 0);
    
    const totalCompletedMissions = users.reduce((sum, user) => {
        const userData = JSON.parse(localStorage.getItem(`userData_${user.id}`) || '{}');
        return sum + (userData.completedMissions?.length || 0);
    }, 0);
    
    const adminStats = document.querySelector('.admin-stats');
    if (adminStats) {
        adminStats.innerHTML = `
            <div class="admin-stat-card">
                <div class="admin-stat-icon users">
                    <i class="fas fa-users"></i>
                </div>
                <div class="admin-stat-value">${users.length}</div>
                <div class="admin-stat-label">${translations[currentLanguage].totalUsers}</div>
            </div>
            <div class="admin-stat-card">
                <div class="admin-stat-icon missions">
                    <i class="fas fa-tasks"></i>
                </div>
                <div class="admin-stat-value">${appMissions.length}</div>
                <div class="admin-stat-label">${translations[currentLanguage].totalMissions}</div>
            </div>
            <div class="admin-stat-card">
                <div class="admin-stat-icon completed">
                    <i class="fas fa-check-circle"></i>
                </div>
                <div class="admin-stat-value">${totalCompletedMissions}</div>
                <div class="admin-stat-label">${translations[currentLanguage].completedMissions}</div>
            </div>
            <div class="admin-stat-card">
                <div class="admin-stat-icon coins">
                    <i class="fas fa-coins"></i>
                </div>
                <div class="admin-stat-value">${totalFincoins}</div>
                <div class="admin-stat-label">${translations[currentLanguage].totalFincoins}</div>
            </div>
        `;
    }
}

// ========== ФУНКЦИИ ДЛЯ СЕМЕЙНЫХ ПОДКЛЮЧЕНИЙ ==========

function loadFamilyConnections() {
    if (!currentUser) return;
    
    const savedConnections = localStorage.getItem(`familyConnections_${currentUser.id}`);
    if (savedConnections) {
        familyConnections = JSON.parse(savedConnections);
    }
}

// ========== ОБНОВЛЕНИЕ ЯЗЫКОВЫХ НАСТРОЕК ==========

function updateLanguageSettings() {
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.textContent = translations[btn.dataset.lang]?.[`language${btn.dataset.lang.charAt(0).toUpperCase() + btn.dataset.lang.slice(1)}Btn`] || btn.dataset.lang;
    });
}

// ========== ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ ==========

document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const savedUser = localStorage.getItem('currentUser');
    
    setTimeout(() => {
        initializeFloatingLabels();
    }, 100);
    
    const savedAccountType = localStorage.getItem('selectedAccountType');
    if (savedAccountType) {
        selectedAccountType = savedAccountType;
        const accountTypeBtn = document.querySelector(`.account-type-button[onclick*="${savedAccountType}"]`);
        if (accountTypeBtn) {
            accountTypeBtn.classList.add('selected');
        }
    }
    
    if (isLoggedIn === 'true' && savedUser) {
        try {
            currentUser = JSON.parse(savedUser);
            loadUserData();
            loadChatHistory();
            
            setTimeout(() => {
                showAppInterface();
                fixScrollIssues();
                fixButtonSizes();
                fixAccountManagementButtons();
                addLogoutButtonToSettings();
            }, 100);
            
        } catch (error) {
            console.error('Ошибка при загрузке пользователя:', error);
            localStorage.removeItem('currentUser');
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('chatHistory');
            showAccountTypeSelection();
        }
    } else {
        showAccountTypeSelection();
    }
    
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
            selectedCategory = this.getAttribute('data-category');
        });
    });
    
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('expenseDate');
    if (dateInput) {
        dateInput.value = today;
        dateInput.addEventListener('focus', function() {
            openCalendar();
        });
    }
    
    const goalDateInput = document.getElementById('goalDeadline');
    if (goalDateInput) {
        const nextMonth = new Date();
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        goalDateInput.value = nextMonth.toISOString().split('T')[0];
    }
    
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') sendMessage();
        });
    }
    
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            login();
        });
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            register();
        });
        
        const regInputs = registerForm.querySelectorAll('input');
        regInputs.forEach(input => {
            input.addEventListener('input', updateRegisterButtonState);
        });
    }
    
    window.addEventListener('resize', function() {
        fixScrollIssues();
        fixButtonSizes();
    });
    
    initLanguage();
    
    console.log('FinanceMind инициализирован с исправленными функциями');
});

// ========== ДОПОЛНИТЕЛЬНЫЕ КОНСТАНТЫ ==========

// Миссии приложения (10 рабочих миссий)
const appMissions = [
    {
        id: 1,
        title: {
            ru: "Первое знакомство",
            en: "First Introduction",
            kz: "Бірінші танысу"
        },
        description: {
            ru: "Войдите в приложение 3 раза",
            en: "Open the app 3 times",
            kz: "Қолданбаны 3 рет ашыңыз"
        },
        reward: 50,
        difficulty: "easy",
        category: "engagement",
        condition: (userData) => (userData.appVisits || 0) >= 3,
        progress: (userData) => Math.min(100, ((userData.appVisits || 0) / 3) * 100),
        requirements: {
            ru: ["Откройте приложение 3 раза", "Изучите основные функции"],
            en: ["Open the app 3 times", "Explore basic features"],
            kz: ["Қолданбаны 3 рет ашыңыз", "Негізгі функцияларды зерттеңіз"]
        },
        available: true
    },
    {
        id: 2,
        title: {
            ru: "Первая цель",
            en: "First Goal",
            kz: "Бірінші мақсат"
        },
        description: {
            ru: "Создайте финансовую цель",
            en: "Create a financial goal",
            kz: "Қаржылық мақсат құрыңыз"
        },
        reward: 50,
        difficulty: "easy",
        category: "goals",
        condition: (userData) => userData.goals.length >= 1,
        progress: (userData) => userData.goals.length >= 1 ? 100 : 0,
        requirements: {
            ru: ["Создайте хотя бы одну цель", "Начните планировать финансы"],
            en: ["Create at least one goal", "Start planning your finances"],
            kz: ["Кем дегенде бір мақсат құрыңыз", "Қаржыларыңызды жоспарлауды бастаңыз"]
        },
        available: true
    },
    {
        id: 3,
        title: {
            ru: "Начало пути",
            en: "Journey Begins",
            kz: "Жолдың басталуы"
        },
        description: {
            ru: "Добавьте первый расход",
            en: "Add your first expense",
            kz: "Бірінші шығысты қосыңыз"
        },
        reward: 30,
        difficulty: "easy",
        category: "expenses",
        condition: (userData) => userData.expenses.length >= 1,
        progress: (userData) => userData.expenses.length >= 1 ? 100 : 0,
        requirements: {
            ru: ["Добавьте любой расход", "Начните отслеживать траты"],
            en: ["Add any expense", "Start tracking spending"],
            kz: ["Кез келген шығынды қосыңыз", "Шығындарды бақылауды бастаңыз"]
        },
        available: true
    },
    {
        id: 4,
        title: {
            ru: "Активный пользователь",
            en: "Active User",
            kz: "Белсенді пайдаланушы"
        },
        description: {
            ru: "Добавляйте расходы 3 дня подряд",
            en: "Add expenses for 3 consecutive days",
            kz: "Үш күн қатарынан шығындарды қосыңыз"
        },
        reward: 100,
        difficulty: "medium",
        category: "consistency",
        condition: (userData) => {
            if (userData.expenses.length < 3) return false;
            const dates = [...new Set(userData.expenses.map(e => e.date))].sort();
            const recentDates = dates.slice(-3);
            for (let i = 1; i < recentDates.length; i++) {
                const prevDate = new Date(recentDates[i-1]);
                const currDate = new Date(recentDates[i]);
                const diffDays = Math.floor((currDate - prevDate) / (1000 * 60 * 60 * 24));
                if (diffDays !== 1) return false;
            }
            return true;
        },
        progress: (userData) => {
            if (userData.expenses.length < 2) return 0;
            const dates = [...new Set(userData.expenses.map(e => e.date))].sort();
            let consecutiveDays = 1;
            for (let i = 1; i < dates.length; i++) {
                const prevDate = new Date(dates[i-1]);
                const currDate = new Date(dates[i]);
                const diffDays = Math.floor((currDate - prevDate) / (1000 * 60 * 60 * 24));
                if (diffDays === 1) consecutiveDays++;
                else consecutiveDays = 1;
            }
            return Math.min(100, (consecutiveDays / 3) * 100);
        },
        requirements: {
            ru: ["Добавляйте расходы каждый день", "Не пропускайте дни"],
            en: ["Add expenses every day", "Don't skip days"],
            kz: ["Күн сайын шығындарды қосыңыз", "Күндерді өткізіп алмаңыз"]
        },
        available: true
    },
    {
        id: 5,
        title: {
            ru: "Экономия на еде",
            en: "Food Savings",
            kz: "Тамақта үнемдеу"
        },
        description: {
            ru: "Потратьте менее ₸5000 на еду за неделю",
            en: "Spend less than ₸5000 on food per week",
            kz: "Аптасына тамаққа ₸5000-нан аз жұмсаңыз"
        },
        reward: 120,
        difficulty: "medium",
        category: "economy",
        condition: (userData) => {
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            const foodExpenses = userData.expenses.filter(e => 
                e.category === 'Еда' && new Date(e.date) >= weekAgo
            );
            const total = foodExpenses.reduce((sum, e) => sum + e.amount, 0);
            return total < 5000;
        },
        progress: (userData) => {
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            const foodExpenses = userData.expenses.filter(e => 
                e.category === 'Еда' && new Date(e.date) >= weekAgo
            );
            const total = foodExpenses.reduce((sum, e) => sum + e.amount, 0);
            return Math.max(0, Math.min(100, 100 - (total / 5000) * 100));
        },
        requirements: {
            ru: ["Контролируйте расходы на питание", "Не превышайте ₸5000 за неделю"],
            en: ["Control food expenses", "Don't exceed ₸5000 per week"],
            kz: ["Тамақ шығындарын бақылаңыз", "Аптасына ₸5000-дан аспаңыз"]
        },
        available: true
    },
    {
        id: 6,
        title: {
            ru: "Финансовый аналитик",
            en: "Financial Analyst",
            kz: "Қаржылық талдаушы"
        },
        description: {
            ru: "Просмотрите аналитику 5 раз",
            en: "View analytics 5 times",
            kz: "Аналитиканы 5 рет қараңыз"
        },
        reward: 80,
        difficulty: "easy",
        category: "analytics",
        condition: (userData) => (userData.analyticsViews || 0) >= 5,
        progress: (userData) => Math.min(100, ((userData.analyticsViews || 0) / 5) * 100),
        requirements: {
            ru: ["Изучайте раздел аналитики", "Анализируйте свои расходы"],
            en: ["Explore analytics section", "Analyze your expenses"],
            kz: ["Аналитика бөлімін зерттеңіз", "Шығындарыңызды талдаңыз"]
        },
        available: true
    },
    {
        id: 7,
        title: {
            ru: "Накопитель",
            en: "Saver",
            kz: "Жинақтаушы"
        },
        description: {
            ru: "Накопите ₸10,000 на цели",
            en: "Save ₸10,000 for goals",
            kz: "Мақсаттар үшін ₸10,000 жинаңыз"
        },
        reward: 150,
        difficulty: "medium",
        category: "savings",
        condition: (userData) => {
            const totalSaved = userData.goals.reduce((sum, goal) => sum + (goal.currentAmount || 0), 0);
            return totalSaved >= 10000;
        },
        progress: (userData) => {
            const totalSaved = userData.goals.reduce((sum, goal) => sum + (goal.currentAmount || 0), 0);
            return Math.min(100, (totalSaved / 10000) * 100);
        },
        requirements: {
            ru: ["Создайте цели накопления", "Накопите общую сумму ₸10,000"],
            en: ["Create savings goals", "Save total of ₸10,000"],
            kz: ["Жинақтау мақсаттарын құрыңыз", "Барлығы ₸10,000 жинаңыз"]
        },
        available: true
    },
    {
        id: 8,
        title: {
            ru: "Разнообразие трат",
            en: "Spending Variety",
            kz: "Шығындардың әртүрлілігі"
        },
        description: {
            ru: "Используйте все 5 категорий расходов",
            en: "Use all 5 expense categories",
            kz: "5 шығын санатын да пайдаланыңыз"
        },
        reward: 100,
        difficulty: "medium",
        category: "categories",
        condition: (userData) => {
            const categories = [...new Set(userData.expenses.map(e => e.category))];
            return categories.length >= 5;
        },
        progress: (userData) => {
            const categories = [...new Set(userData.expenses.map(e => e.category))];
            return Math.min(100, (categories.length / 5) * 100);
        },
        requirements: {
            ru: ["Используйте разные категории", "Попробуйте все 5 категорий расходов"],
            en: ["Use different categories", "Try all 5 expense categories"],
            kz: ["Әртүрлі санаттарды пайдаланыңыз", "5 шығын санатын да сынап көріңіз"]
        },
        available: true
    },
    {
        id: 9,
        title: {
            ru: "Планировщик",
            en: "Planner",
            kz: "Жоспарлаушы"
        },
        description: {
            ru: "Создайте 3 финансовые цели",
            en: "Create 3 financial goals",
            kz: "3 қаржылық мақсат құрыңыз"
        },
        reward: 120,
        difficulty: "medium",
        category: "planning",
        condition: (userData) => userData.goals.length >= 3,
        progress: (userData) => Math.min(100, (userData.goals.length / 3) * 100),
        requirements: {
            ru: ["Создайте несколько целей", "Планируйте разные финансовые задачи"],
            en: ["Create multiple goals", "Plan different financial tasks"],
            kz: ["Бірнеше мақсат құрыңыз", "Әртүрлі қаржылық тапсырмаларды жоспарлаңыз"]
        },
        available: true
    },
    {
        id: 10,
        title: {
            ru: "Ветеран миссий",
            en: "Mission Veteran",
            kz: "Миссиялар ветераны"
        },
        description: {
            ru: "Выполните 5 любых миссий",
            en: "Complete any 5 missions",
            kz: "Кез келген 5 миссияны орындаңыз"
        },
        reward: 200,
        difficulty: "hard",
        category: "achievements",
        condition: (userData) => (userData.completedMissions || []).length >= 5,
        progress: (userData) => Math.min(100, ((userData.completedMissions || []).length / 5) * 100),
        requirements: {
            ru: ["Выполняйте разные миссии", "Достигните 5 выполненных миссий"],
            en: ["Complete different missions", "Reach 5 completed missions"],
            kz: ["Әртүрлі миссияларды орындаңыз", "5 орындалған миссияға жетіңіз"]
        },
        available: true
    }
];

// Иконки для категорий
const categoryIcons = {
    'Еда': 'fas fa-utensils',
    'Транспорт': 'fas fa-bus',
    'Учеба': 'fas fa-graduation-cap',
    'Развлечения': 'fas fa-gamepad',
    'Другое': 'fas fa-ellipsis-h'
};

// Цвета для категорий
const categoryColors = {
    'Еда': '#FF6384',
    'Транспорт': '#36A2EB',
    'Учеба': '#FFCE56',
    'Развлечения': '#9966FF',
    'Другое': '#4BC0C0'
};

// Иконки для миссий
const missionIcons = {
    'engagement': 'fas fa-door-open',
    'goals': 'fas fa-bullseye',
    'expenses': 'fas fa-receipt',
    'consistency': 'fas fa-calendar-check',
    'economy': 'fas fa-piggy-bank',
    'analytics': 'fas fa-chart-bar',
    'savings': 'fas fa-piggy-bank',
    'categories': 'fas fa-tags',
    'planning': 'fas fa-tasks',
    'achievements': 'fas fa-trophy'

};
// ========== БАНКОВСКАЯ ПАНЕЛЬ - НОВЫЕ ФУНКЦИИ ==========

// Основные переменные для банковской системы
let transactions = [];
let banks = [
    {
        id: 'kaspi',
        name: 'Kaspi Bank',
        logo: 'K',
        color: '#00A887',
        connected: false,
        lastSync: null,
        instructions: {
            ru: `<strong>Загрузите выписку из банка</strong><br>
                 Стандартной синхронизации с Kaspi нет, так как банк заблокировал подключения сторонних приложений.
                 Используется ручная загрузка банковской выписки. Можно выбрать сразу несколько файлов.<br><br>
                 <strong>Как скачать выписку в приложении Kaspi:</strong><br>
                 1. Откройте приложение Kaspi<br>
                 2. Перейдите в раздел «Мой банк»<br>
                 3. Выберите свою карту<br>
                 4. Перейдите во вкладку «Выписка»<br>
                 5. Выберите нужный период<br>
                 6. Нажмите на иконку выгрузки<br>
                 7. Выберите язык<br>
                 8. Нажмите «Скачать PDF» и сохраните файл`,
            en: `<strong>Upload bank statement</strong><br>
                 There is no standard synchronization with Kaspi as the bank has blocked connections from third-party applications.
                 Manual uploading of bank statements is used. Multiple files can be selected at once.<br><br>
                 <strong>How to download statement in Kaspi app:</strong><br>
                 1. Open Kaspi app<br>
                 2. Go to "My Bank" section<br>
                 3. Select your card<br>
                 4. Go to "Statement" tab<br>
                 5. Select desired period<br>
                 6. Click on download icon<br>
                 7. Choose language<br>
                 8. Click "Download PDF" and save the file`,
            kz: `<strong>Банк выпискасын жүктеңіз</strong><br>
                 Kaspi-мен стандартты синхрондау жоқ, себебі банк үшінші жақ қолданбаларынан қосылымдарды бұғаттады.
                 Банк выпискасын қолмен жүктеу қолданылады. Бірнеше файлды бір уақытта таңдауға болады.<br><br>
                 <strong>Kaspi қолданбасында выписканы қалай жүктеуге болады:</strong><br>
                 1. Kaspi қолданбасын ашыңыз<br>
                 2. «Менің банкім» бөліміне өтіңіз<br>
                 3. Картаңызды таңдаңыз<br>
                 4. «Выписка» қойыншасына өтіңіз<br>
                 5. Қажетті кезеңді таңдаңыз<br>
                 6. Жүктеу белгішесін басыңыз<br>
                 7. Тілді таңдаңыз<br>
                 8. «PDF жүктеу» түймесін басып, файлды сақтаңыз`
        }
    },
    {
        id: 'halyk',
        name: 'Halyk Bank',
        logo: 'H',
        color: '#F6B100',
        connected: false,
        lastSync: null,
        instructions: {
            ru: `<strong>Загрузите выписку из банка</strong><br>
                 Автоматической синхронизации с Halyk нет, но вы можете загружать выписки и видеть всю аналитику.<br><br>
                 <strong>Как скачать выписку в приложении Halyk Kazakhstan:</strong><br>
                 1. Откройте раздел «Счета»<br>
                 2. Выберите нужную карту или счёт<br>
                 3. Нажмите «Выписка» внизу экрана<br>
                 4. Выберите период (рекомендуется 3–6 месяцев)<br>
                 5. Нажмите на иконку документа<br>
                 6. Дождитесь формирования выписки<br>
                 7. Сохраните файл (на iOS сразу, на Android — через виртуальный диск)`,
            en: `<strong>Upload bank statement</strong><br>
                 There is no automatic synchronization with Halyk, but you can upload statements and see all analytics.<br><br>
                 <strong>How to download statement in Halyk Kazakhstan app:</strong><br>
                 1. Open "Accounts" section<br>
                 2. Select desired card or account<br>
                 3. Click "Statement" at the bottom of the screen<br>
                 4. Select period (recommended 3-6 months)<br>
                 5. Click on document icon<br>
                 6. Wait for statement generation<br>
                 7. Save the file (on iOS directly, on Android - through virtual drive)`,
            kz: `<strong>Банк выпискасын жүктеңіз</strong><br>
                 Halyk-пен автоматты синхрондау жоқ, бірақ сіз выпискаларды жүктей аласыз және барлық аналитиканы көре аласыз.<br><br>
                 <strong>Halyk Kazakhstan қолданбасында выписканы қалай жүктеуге болады:</strong><br>
                 1. «Шоттар» бөлімін ашыңыз<br>
                 2. Қажетті картаны немесе шотты таңдаңыз<br>
                 3. Экранның төменгі жағындағы «Выписка» түймесін басыңыз<br>
                 4. Кезеңді таңдаңыз (ұсынылатын мерзім 3-6 ай)<br>
                 5. Құжат белгішесін басыңыз<br>
                 6. Выписка құрылғанша күтіңіз<br>
                 7. Файлды сақтаңыз (iOS-те тікелей, Android-те виртуалды диск арқылы)`
        }
    },
    {
        id: 'freedom',
        name: 'Freedom Bank',
        logo: 'F',
        color: '#1E40AF',
        connected: false,
        lastSync: null,
        instructions: {
            ru: `<strong>Загрузите выписку из банка</strong><br>
                 Стандартной синхронизации с Freedom Finance нет, но доступна загрузка выписок.<br><br>
                 <strong>Freedom SuperApp:</strong><br>
                 1. Откройте «Операции»<br>
                 2. Пролистайте до «История» → «Показать все»<br>
                 3. Выберите параметры выписки<br>
                 4. Нажмите на иконку загрузки<br>
                 5. Нажмите «Сформировать выписку»<br>
                 6. Дождитесь push-уведомления<br>
                 7. Перейдите «Продукты» → «Мои деньги»<br>
                 8. Откройте выписку со статусом «Готово»<br>
                 9. Выгрузите файл<br><br>
                 <strong>Freedom Banker:</strong><br>
                 1. Нажмите иконку формирования выписки<br>
                 2. Выберите карту<br>
                 3. Выберите язык<br>
                 4. Выберите период (3–6 месяцев)<br>
                 5. Нажмите «Получить выписку»<br>
                 6. После формирования нажмите «Поделиться» и сохраните файл`,
            en: `<strong>Upload bank statement</strong><br>
                 There is no standard synchronization with Freedom Finance, but statement upload is available.<br><br>
                 <strong>Freedom SuperApp:</strong><br>
                 1. Open "Operations"<br>
                 2. Scroll to "History" → "Show all"<br>
                 3. Select statement parameters<br>
                 4. Click on download icon<br>
                 5. Click "Generate statement"<br>
                 6. Wait for push notification<br>
                 7. Go to "Products" → "My money"<br>
                 8. Open statement with status "Ready"<br>
                 9. Export the file<br><br>
                 <strong>Freedom Banker:</strong><br>
                 1. Click statement generation icon<br>
                 2. Select card<br>
                 3. Choose language<br>
                 4. Select period (3-6 months)<br>
                 5. Click "Get statement"<br>
                 6. After generation click "Share" and save the file`,
            kz: `<strong>Банк выпискасын жүктеңіз</strong><br>
                 Freedom Finance-мен стандартты синхрондау жоқ, бірақ выпискаларды жүктеу қолжетімді.<br><br>
                 <strong>Freedom SuperApp:</strong><br>
                 1. «Операцияларды» ашыңыз<br>
                 2. «Тарих» → «Барлығын көрсету» дейін айналдырыңыз<br>
                 3. Выписка параметрлерін таңдаңыз<br>
                 4. Жүктеу белгішесін басыңыз<br>
                 5. «Выписка құру» түймесін басыңыз<br>
                 6. Push-хабарлама күтіңіз<br>
                 7. «Өнімдер» → «Менің ақшам» бөліміне өтіңіз<br>
                 8. «Дайын» статусы бар выписканы ашыңыз<br>
                 9. Файлды экспорттаңыз<br><br>
                 <strong>Freedom Banker:</strong><br>
                 1. Выписка құру белгішесін басыңыз<br>
                 2. Картаны таңдаңыз<br>
                 3. Тілді таңдаңыз<br>
                 4. Кезеңді таңдаңыз (3-6 ай)<br>
                 5. «Выписка алу» түймесін басыңыз<br>
                 6. Құрылғаннан кейін «Бөлісу» түймесін басып, файлды сақтаңыз`
        }
    }
];

let selectedBank = null;
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

// 1️⃣ Панель «Подключение банков»
function showBankConnectionPanel() {
    const modalId = 'bankConnectionModal';
    let modal = document.getElementById(modalId);
    
    if (!modal) {
        modal = document.createElement('div');
        modal.id = modalId;
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h3>${translations[currentLanguage].banksTitle || 'Подключение банков'}</h3>
                    <button class="modal-close" onclick="closeModal('${modalId}')">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" style="padding: 20px;">
                    <div class="banks-grid">
                        ${banks.map(bank => `
                            <div class="bank-card" onclick="selectBank('${bank.id}')" 
                                 style="border-color: ${bank.color}">
                                <div class="bank-logo" style="background: ${bank.color}">
                                    ${bank.logo}
                                </div>
                                <div class="bank-name">${bank.name}</div>
                                <div class="bank-status ${bank.connected ? 'connected' : 'disconnected'}">
                                    <i class="fas fa-${bank.connected ? 'check-circle' : 'plug'}"></i>
                                    ${bank.connected ? 
                                        (currentLanguage === 'ru' ? 'Подключено' : 
                                         currentLanguage === 'en' ? 'Connected' : 'Қосылған') : 
                                        (currentLanguage === 'ru' ? 'Подключить' : 
                                         currentLanguage === 'en' ? 'Connect' : 'Қосу')}
                                </div>
                                ${bank.lastSync ? `
                                    <div class="bank-last-sync">
                                        ${currentLanguage === 'ru' ? 'Обновлено' : 
                                         currentLanguage === 'en' ? 'Updated' : 'Жаңартылған'} 
                                        ${new Date(bank.lastSync).toLocaleDateString(currentLanguage)}
                                    </div>
                                ` : ''}
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="banks-stats" style="margin-top: 30px; padding: 20px; background: var(--light-bg); border-radius: var(--radius-sm);">
                        <h4 style="margin-bottom: 15px;">
                            <i class="fas fa-chart-bar"></i> 
                            ${currentLanguage === 'ru' ? 'Статистика по операциям' : 
                             currentLanguage === 'en' ? 'Transaction Statistics' : 
                             'Операциялар бойынша статистика'}
                        </h4>
                        <div class="stats-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
                            <div class="stat-item">
                                <div class="stat-value">${transactions.length}</div>
                                <div class="stat-label">${currentLanguage === 'ru' ? 'Всего операций' : 
                                                       currentLanguage === 'en' ? 'Total transactions' : 
                                                       'Барлық операциялар'}</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-value">${new Set(transactions.map(t => t.bank)).size}</div>
                                <div class="stat-label">${currentLanguage === 'ru' ? 'Банков подключено' : 
                                                       currentLanguage === 'en' ? 'Banks connected' : 
                                                       'Қосылған банктер'}</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-value">${calculateTotalIncome().toLocaleString()} ₸</div>
                                <div class="stat-label">${currentLanguage === 'ru' ? 'Общий доход' : 
                                                       currentLanguage === 'en' ? 'Total income' : 
                                                       'Жалпы табыс'}</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-value">${calculateTotalExpense().toLocaleString()} ₸</div>
                                <div class="stat-label">${currentLanguage === 'ru' ? 'Общие расходы' : 
                                                       currentLanguage === 'en' ? 'Total expenses' : 
                                                       'Жалпы шығындар'}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer" style="padding: 20px; border-top: 1px solid var(--border);">
                    <button class="btn btn-outline" onclick="closeModal('${modalId}')" style="margin-right: 10px;">
                        ${translations[currentLanguage].closeReport || 'Закрыть'}
                    </button>
                    <button class="btn btn-primary" onclick="openBankAnalytics()">
                        <i class="fas fa-chart-pie"></i> 
                        ${currentLanguage === 'ru' ? 'Аналитика' : 
                         currentLanguage === 'en' ? 'Analytics' : 'Аналитика'}
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    modal.style.display = 'flex';
    fadeInElement(modal);
}

// 2️⃣ Экран подключения банка
function selectBank(bankId) {
    selectedBank = banks.find(bank => bank.id === bankId);
    if (!selectedBank) return;
    
    closeModal('bankConnectionModal');
    
    const modalId = 'bankDetailModal';
    let modal = document.getElementById(modalId);
    
    if (!modal) {
        modal = document.createElement('div');
        modal.id = modalId;
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header">
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <div class="bank-logo-large" style="background: ${selectedBank.color}">
                            ${selectedBank.logo}
                        </div>
                        <div>
                            <h3>${selectedBank.name}</h3>
                            <div class="bank-status ${selectedBank.connected ? 'connected' : 'disconnected'}">
                                <i class="fas fa-${selectedBank.connected ? 'check-circle' : 'plug'}"></i>
                                ${selectedBank.connected ? 
                                    (currentLanguage === 'ru' ? 'Подключено' : 
                                     currentLanguage === 'en' ? 'Connected' : 'Қосылған') : 
                                    (currentLanguage === 'ru' ? 'Не подключено' : 
                                     currentLanguage === 'en' ? 'Not connected' : 'Қосылмаған')}
                            </div>
                        </div>
                    </div>
                    <button class="modal-close" onclick="closeModal('${modalId}')">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" style="padding: 20px;">
                    <div class="bank-instructions" id="bankInstructions">
                        ${selectedBank.instructions[currentLanguage] || selectedBank.instructions.ru}
                    </div>
                    
                    <div class="file-upload-section" style="margin-top: 30px;">
                        <h4 style="margin-bottom: 15px;">
                            <i class="fas fa-file-upload"></i> 
                            ${currentLanguage === 'ru' ? 'Загрузка выписки' : 
                             currentLanguage === 'en' ? 'Statement Upload' : 
                             'Выписканы жүктеу'}
                        </h4>
                        <div class="file-upload-area" 
                             onclick="document.getElementById('bankStatementFile').click()"
                             style="border: 2px dashed var(--border); border-radius: var(--radius-sm); 
                                    padding: 40px; text-align: center; cursor: pointer; margin-bottom: 20px;">
                            <i class="fas fa-cloud-upload-alt" style="font-size: 48px; color: var(--text-light); margin-bottom: 15px;"></i>
                            <p style="color: var(--text); font-size: 16px; margin-bottom: 10px;">
                                ${currentLanguage === 'ru' ? 'Нажмите для загрузки файлов' : 
                                 currentLanguage === 'en' ? 'Click to upload files' : 
                                 'Файлдарды жүктеу үшін басыңыз'}
                            </p>
                            <p style="color: var(--text-light); font-size: 14px;">
                                ${currentLanguage === 'ru' ? 'Поддерживаются PDF, XLS, CSV' : 
                                 currentLanguage === 'en' ? 'PDF, XLS, CSV supported' : 
                                 'PDF, XLS, CSV қолдау көрсетіледі'}
                            </p>
                        </div>
                        <input type="file" id="bankStatementFile" multiple accept=".pdf,.xls,.xlsx,.csv" 
                               style="display: none;" onchange="handleFileUpload(this.files)">
                        
                        <div class="uploaded-files" id="uploadedFiles" style="margin-top: 20px;"></div>
                    </div>
                    
                    ${selectedBank.connected ? `
                        <div class="bank-transactions" style="margin-top: 30px;">
                            <h4 style="margin-bottom: 15px;">
                                <i class="fas fa-history"></i> 
                                ${currentLanguage === 'ru' ? 'Последние операции' : 
                                 currentLanguage === 'en' ? 'Recent Transactions' : 
                                 'Соңғы операциялар'}
                            </h4>
                            <div class="transactions-list" id="bankTransactionsList">
                                ${renderBankTransactions(selectedBank.id)}
                            </div>
                        </div>
                    ` : ''}
                </div>
                <div class="modal-footer" style="padding: 20px; border-top: 1px solid var(--border); display: flex; gap: 10px;">
                    <button class="btn btn-outline" onclick="closeModal('${modalId}')" style="flex: 1;">
                        ${translations[currentLanguage].closeReport || 'Закрыть'}
                    </button>
                    ${selectedBank.connected ? `
                        <button class="btn btn-danger" onclick="disconnectBank('${selectedBank.id}')" style="flex: 1;">
                            <i class="fas fa-unlink"></i> 
                            ${currentLanguage === 'ru' ? 'Отключить' : 
                             currentLanguage === 'en' ? 'Disconnect' : 'Ажырату'}
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    } else {
        // Обновляем содержимое существующего модального окна
        const bankLogo = modal.querySelector('.bank-logo-large');
        const bankName = modal.querySelector('h3');
        const bankStatus = modal.querySelector('.bank-status');
        const instructions = document.getElementById('bankInstructions');
        
        if (bankLogo) {
            bankLogo.style.background = selectedBank.color;
            bankLogo.textContent = selectedBank.logo;
        }
        if (bankName) bankName.textContent = selectedBank.name;
        if (bankStatus) {
            bankStatus.className = `bank-status ${selectedBank.connected ? 'connected' : 'disconnected'}`;
            bankStatus.innerHTML = `<i class="fas fa-${selectedBank.connected ? 'check-circle' : 'plug'}"></i>
                                   ${selectedBank.connected ? 
                                     (currentLanguage === 'ru' ? 'Подключено' : 
                                      currentLanguage === 'en' ? 'Connected' : 'Қосылған') : 
                                     (currentLanguage === 'ru' ? 'Не подключено' : 
                                      currentLanguage === 'en' ? 'Not connected' : 'Қосылмаған')}`;
        }
        if (instructions) {
            instructions.innerHTML = selectedBank.instructions[currentLanguage] || selectedBank.instructions.ru;
        }
        
        const transactionsList = document.getElementById('bankTransactionsList');
        if (transactionsList) {
            transactionsList.innerHTML = selectedBank.connected ? renderBankTransactions(selectedBank.id) : '';
        }
    }
    
    modal.style.display = 'flex';
    fadeInElement(modal);
}

// 3️⃣ Инструкции по банкам (рендеринг динамических инструкций)
function renderBankInstructions(bankName) {
    const bank = banks.find(b => b.name === bankName || b.id === bankName);
    if (!bank) return '';
    
    return bank.instructions[currentLanguage] || bank.instructions.ru;
}

// 4️⃣ Загрузка и обработка файлов
function handleFileUpload(files) {
    if (!files.length || !selectedBank) return;
    
    const uploadedFilesDiv = document.getElementById('uploadedFiles');
    if (uploadedFilesDiv) {
        uploadedFilesDiv.innerHTML = '';
        
        Array.from(files).forEach((file, index) => {
            const fileElement = document.createElement('div');
            fileElement.className = 'uploaded-file';
            fileElement.style.cssText = `
                display: flex; align-items: center; justify-content: space-between;
                padding: 12px; background: var(--light-bg); border-radius: var(--radius-sm);
                margin-bottom: 10px;
            `;
            
            fileElement.innerHTML = `
                <div style="display: flex; align-items: center; gap: 10px;">
                    <i class="fas fa-file${file.name.endsWith('.pdf') ? '-pdf' : 
                                       file.name.endsWith('.xls') || file.name.endsWith('.xlsx') ? '-excel' : 
                                       file.name.endsWith('.csv') ? '-csv' : ''}" 
                       style="color: ${selectedBank.color}; font-size: 20px;"></i>
                    <div>
                        <div style="font-weight: 600; color: var(--text);">${file.name}</div>
                        <div style="font-size: 12px; color: var(--text-light);">
                            ${(file.size / 1024).toFixed(1)} KB • ${file.type || 'Unknown type'}
                        </div>
                    </div>
                </div>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <div class="file-processing-indicator" id="processing-${index}">
                        <div class="spinner" style="width: 20px; height: 20px; border: 2px solid var(--border); 
                             border-top-color: ${selectedBank.color}; border-radius: 50%;"></div>
                    </div>
                    <button class="btn-icon" onclick="removeFile(this)" style="color: var(--danger);">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
            
            uploadedFilesDiv.appendChild(fileElement);
            
            // Симуляция обработки файла
            setTimeout(() => {
                processFile(file, index);
            }, 1000 + index * 500);
        });
    }
    
    showNotification(
        currentLanguage === 'ru' ? `Загружено ${files.length} файл(ов)` : 
        currentLanguage === 'en' ? `${files.length} file(s) uploaded` : 
        `${files.length} файл(дар) жүктелді`,
        'success'
    );
}

function processFile(file, index) {
    // В реальном приложении здесь была бы обработка PDF/XLS/CSV файлов
    // Для демонстрации создаем мок-транзакции
    const mockTransactions = generateMockTransactions(file.name, selectedBank.id);
    
    // Добавляем транзакции в общий список
    mockTransactions.forEach(transaction => {
        if (!transactions.some(t => t.id === transaction.id)) {
            transactions.push(transaction);
        }
    });
    
    // Обновляем статус банка
    selectedBank.connected = true;
    selectedBank.lastSync = new Date().toISOString();
    
    // Обновляем банк в списке
    const bankIndex = banks.findIndex(b => b.id === selectedBank.id);
    if (bankIndex !== -1) {
        banks[bankIndex] = selectedBank;
    }
    
    // Сохраняем данные
    saveToLocalStorage();
    
    // Обновляем индикатор обработки
    const processingIndicator = document.getElementById(`processing-${index}`);
    if (processingIndicator) {
        processingIndicator.innerHTML = `
            <i class="fas fa-check" style="color: var(--success); font-size: 20px;"></i>
        `;
    }
    
    // Показываем уведомление
    showNotification(
        currentLanguage === 'ru' ? `Обработано ${mockTransactions.length} операций из ${file.name}` : 
        currentLanguage === 'en' ? `Processed ${mockTransactions.length} transactions from ${file.name}` : 
        `${file.name} файлынан ${mockTransactions.length} операция өңделді`,
        'success'
    );
    
    // Обновляем список транзакций
    const transactionsList = document.getElementById('bankTransactionsList');
    if (transactionsList) {
        transactionsList.innerHTML = renderBankTransactions(selectedBank.id);
    }
    
    // Обновляем аналитику
    setTimeout(() => {
        renderCharts();
        renderAnalytics();
        generateAIInsights();
    }, 1000);
}

function generateMockTransactions(fileName, bankId) {
    const transactions = [];
    const categories = ['Еда', 'Транспорт', 'Учеба', 'Развлечения', 'Другое'];
    const descriptions = [
        'Обед в ресторане', 'Такси', 'Курсы', 'Кино', 'Покупки в магазине',
        'Кофе', 'Общественный транспорт', 'Книги', 'Концерт', 'Супермаркет'
    ];
    
    // Генерируем 5-15 случайных транзакций
    const count = Math.floor(Math.random() * 11) + 5;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    
    for (let i = 0; i < count; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + Math.floor(Math.random() * 31));
        
        const isIncome = Math.random() > 0.7;
        const category = isIncome ? 'Доход' : categories[Math.floor(Math.random() * categories.length)];
        const description = descriptions[Math.floor(Math.random() * descriptions.length)];
        const amount = isIncome ? 
            Math.floor(Math.random() * 50000) + 10000 : 
            Math.floor(Math.random() * 20000) + 1000;
        
        transactions.push({
            id: `${bankId}_${Date.now()}_${i}`,
            date: date.toISOString().split('T')[0],
            amount: amount,
            type: isIncome ? "income" : "expense",
            category: category,
            description: description,
            bank: bankId,
            currency: '₸'
        });
    }
    
    return transactions;
}

function parseTransactions(data) {
    // В реальном приложении здесь парсились бы реальные данные из файлов
    // Для демонстрации возвращаем мок-данные
    return generateMockTransactions('parsed', selectedBank?.id || 'unknown');
}

// 5️⃣ Период и фильтрация
function filterByMonth(monthOffset = 0) {
    const date = new Date(currentYear, currentMonth + monthOffset, 1);
    currentMonth = date.getMonth();
    currentYear = date.getFullYear();
    
    renderCharts();
    renderAnalytics();
    
    // Обновляем отображение текущего месяца
    const monthDisplay = document.getElementById('currentMonthDisplay');
    if (monthDisplay) {
        const monthNames = {
            ru: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 
                 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            en: ['January', 'February', 'March', 'April', 'May', 'June', 
                 'July', 'August', 'September', 'October', 'November', 'December'],
            kz: ['Қаңтар', 'Ақпан', 'Наурыз', 'Сәуір', 'Мамыр', 'Маусым', 
                 'Шілде', 'Тамыз', 'Қыркүйек', 'Қазан', 'Қараша', 'Желтоқсан']
        };
        
        monthDisplay.textContent = `${monthNames[currentLanguage][currentMonth]} ${currentYear}`;
    }
}

// 6️⃣ Аналитика и графики
function renderCharts() {
    const filteredTransactions = transactions.filter(t => {
        const transactionDate = new Date(t.date);
        return transactionDate.getMonth() === currentMonth && 
               transactionDate.getFullYear() === currentYear;
    });
    
    if (filteredTransactions.length === 0) return;
    
    // Линейный график доходов и расходов по дням
    renderIncomeExpenseChart(filteredTransactions);
    
    // Круговая диаграмма расходов по категориям
    renderExpenseCategoriesChart(filteredTransactions);
    
    // Обновляем баланс
    updateBalanceDisplay(filteredTransactions);
}

function renderIncomeExpenseChart(transactions) {
    const chartContainer = document.getElementById('bankLineChart');
    if (!chartContainer) return;
    
    // Группируем по дням
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const dailyData = {};
    
    for (let i = 1; i <= daysInMonth; i++) {
        dailyData[i] = { income: 0, expense: 0 };
    }
    
    transactions.forEach(t => {
        const day = new Date(t.date).getDate();
        if (t.type === 'income') {
            dailyData[day].income += t.amount;
        } else {
            dailyData[day].expense += t.amount;
        }
    });
    
    // Создаем canvas если его нет
    chartContainer.innerHTML = '<canvas id="incomeExpenseChart"></canvas>';
    
    const ctx = document.getElementById('incomeExpenseChart').getContext('2d');
    
    if (window.incomeExpenseChart) {
        window.incomeExpenseChart.destroy();
    }
    
    const labels = Object.keys(dailyData);
    const incomeData = Object.values(dailyData).map(d => d.income);
    const expenseData = Object.values(dailyData).map(d => d.expense);
    
    window.incomeExpenseChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: currentLanguage === 'ru' ? 'Доходы' : 
                           currentLanguage === 'en' ? 'Income' : 'Табыс',
                    data: incomeData,
                    borderColor: '#4CAF50',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: currentLanguage === 'ru' ? 'Расходы' : 
                           currentLanguage === 'en' ? 'Expenses' : 'Шығындар',
                    data: expenseData,
                    borderColor: '#F44336',
                    backgroundColor: 'rgba(244, 67, 54, 0.1)',
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: currentLanguage === 'ru' ? 'Дни месяца' : 
                              currentLanguage === 'en' ? 'Days of month' : 'Айдың күндері'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: '₸'
                    },
                    beginAtZero: true
                }
            }
        }
    });
}

function renderExpenseCategoriesChart(transactions) {
    const chartContainer = document.getElementById('bankPieChart');
    if (!chartContainer) return;
    
    const expenses = transactions.filter(t => t.type === 'expense');
    if (expenses.length === 0) return;
    
    // Группируем по категориям
    const categories = {};
    expenses.forEach(t => {
        if (!categories[t.category]) {
            categories[t.category] = 0;
        }
        categories[t.category] += t.amount;
    });
    
    // Создаем canvas если его нет
    chartContainer.innerHTML = '<canvas id="expenseCategoriesChart"></canvas>';
    
    const ctx = document.getElementById('expenseCategoriesChart').getContext('2d');
    
    if (window.expenseCategoriesChart) {
        window.expenseCategoriesChart.destroy();
    }
    
    const categoryColors = {
        'Еда': '#FF6384',
        'Транспорт': '#36A2EB',
        'Учеба': '#FFCE56',
        'Развлечения': '#9966FF',
        'Другое': '#4BC0C0',
        'Доход': '#4CAF50'
    };
    
    window.expenseCategoriesChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(categories),
            datasets: [{
                data: Object.values(categories),
                backgroundColor: Object.keys(categories).map(cat => categoryColors[cat] || '#CCCCCC'),
                borderWidth: 2,
                borderColor: '#FFFFFF'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${label}: ${formatAmount(value)} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

function updateBalanceDisplay(transactions) {
    const balanceContainer = document.getElementById('bankBalance');
    if (!balanceContainer) return;
    
    const income = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
    
    const expense = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
    
    const balance = income - expense;
    
    balanceContainer.innerHTML = `
        <div class="balance-stats">
            <div class="balance-item">
                <div class="balance-label">${currentLanguage === 'ru' ? 'Доходы' : 
                                           currentLanguage === 'en' ? 'Income' : 'Табыс'}</div>
                <div class="balance-value income">+${formatAmount(income)}</div>
            </div>
            <div class="balance-item">
                <div class="balance-label">${currentLanguage === 'ru' ? 'Расходы' : 
                                           currentLanguage === 'en' ? 'Expenses' : 'Шығындар'}</div>
                <div class="balance-value expense">-${formatAmount(expense)}</div>
            </div>
            <div class="balance-item">
                <div class="balance-label">${currentLanguage === 'ru' ? 'Баланс' : 
                                           currentLanguage === 'en' ? 'Balance' : 'Баланс'}</div>
                <div class="balance-value ${balance >= 0 ? 'income' : 'expense'}">
                    ${balance >= 0 ? '+' : ''}${formatAmount(balance)}
                </div>
            </div>
        </div>
    `;
}

// 7️⃣ Хранение данных
function saveToLocalStorage() {
    if (currentUser && currentUser.id) {
        const bankData = {
            banks: banks,
            transactions: transactions,
            currentMonth: currentMonth,
            currentYear: currentYear
        };
        localStorage.setItem(`bankData_${currentUser.id}`, JSON.stringify(bankData));
    }
}

function loadFromLocalStorage() {
    if (currentUser && currentUser.id) {
        const savedData = localStorage.getItem(`bankData_${currentUser.id}`);
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                banks = data.banks || banks;
                transactions = data.transactions || transactions;
                currentMonth = data.currentMonth || new Date().getMonth();
                currentYear = data.currentYear || new Date().getFullYear();
            } catch (error) {
                console.error('Ошибка загрузки банковских данных:', error);
            }
        }
    }
}

// 8️⃣ ИИ-помощник (логика анализа данных)
function generateAIInsights() {
    const filteredTransactions = transactions.filter(t => {
        const transactionDate = new Date(t.date);
        return transactionDate.getMonth() === currentMonth && 
               transactionDate.getFullYear() === currentYear;
    });
    
    if (filteredTransactions.length === 0) return '';
    
    const expenses = filteredTransactions.filter(t => t.type === 'expense');
    const incomes = filteredTransactions.filter(t => t.type === 'income');
    
    // Находим самую большую категорию расходов
    const expenseByCategory = {};
    expenses.forEach(t => {
        if (!expenseByCategory[t.category]) {
            expenseByCategory[t.category] = 0;
        }
        expenseByCategory[t.category] += t.amount;
    });
    
    let largestCategory = '';
    let largestAmount = 0;
    Object.entries(expenseByCategory).forEach(([category, amount]) => {
        if (amount > largestAmount) {
            largestAmount = amount;
            largestCategory = category;
        }
    });
    
    // Сравниваем с прошлым месяцем
    const prevMonthTransactions = transactions.filter(t => {
        const transactionDate = new Date(t.date);
        const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
        return transactionDate.getMonth() === prevMonth && 
               transactionDate.getFullYear() === prevYear;
    });
    
    const prevMonthExpenses = prevMonthTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
    
    const currentMonthExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);
    const expenseChange = currentMonthExpenses - prevMonthExpenses;
    const expenseChangePercent = prevMonthExpenses > 0 ? 
        Math.round((expenseChange / prevMonthExpenses) * 100) : 0;
    
    // Находим повторяющиеся расходы
    const recurringExpenses = findRecurringExpenses(expenses);
    
    // Формируем инсайты
    const insights = [];
    
    if (largestCategory) {
        insights.push(
            currentLanguage === 'ru' ? `В этом месяце больше всего денег ушло на ${largestCategory.toLowerCase()} (${formatAmount(largestAmount)})` :
            currentLanguage === 'en' ? `This month most money was spent on ${largestCategory.toLowerCase()} (${formatAmount(largestAmount)})` :
            `Бұл айда ең көп ақша ${largestCategory.toLowerCase()} жұмсалды (${formatAmount(largestAmount)})`
        );
    }
    
    if (expenseChange !== 0) {
        insights.push(
            currentLanguage === 'ru' ? 
                `Расходы ${expenseChange > 0 ? 'выросли' : 'снизились'} на ${Math.abs(expenseChangePercent)}% по сравнению с прошлым месяцем` :
            currentLanguage === 'en' ? 
                `Expenses ${expenseChange > 0 ? 'increased' : 'decreased'} by ${Math.abs(expenseChangePercent)}% compared to last month` :
            `Шығындар өткен аймен салыстырғанда ${Math.abs(expenseChangePercent)}% ${expenseChange > 0 ? 'өсті' : 'төмендеді'}`
        );
    }
    
    if (recurringExpenses.length > 0) {
        const mostCommon = recurringExpenses[0];
        insights.push(
            currentLanguage === 'ru' ? 
                `Обнаружены повторяющиеся расходы: "${mostCommon.description}" (${mostCommon.count} раз)` :
            currentLanguage === 'en' ? 
                `Recurring expenses detected: "${mostCommon.description}" (${mostCommon.count} times)` :
            `Қайталанатын шығындар анықталды: "${mostCommon.description}" (${mostCommon.count} рет)`
        );
    }
    
    if (incomes.length > 0) {
        const totalIncome = incomes.reduce((sum, t) => sum + t.amount, 0);
        insights.push(
            currentLanguage === 'ru' ? 
                `Общий доход за месяц: ${formatAmount(totalIncome)}` :
            currentLanguage === 'en' ? 
                `Total monthly income: ${formatAmount(totalIncome)}` :
            `Айлық жалпы табыс: ${formatAmount(totalIncome)}`
        );
    }
    
    return insights.join('. ') + '.';
}

function findRecurringExpenses(expenses) {
    const expenseCounts = {};
    const recurring = [];
    
    expenses.forEach(t => {
        const key = `${t.description}_${t.amount}`;
        expenseCounts[key] = (expenseCounts[key] || 0) + 1;
    });
    
    Object.entries(expenseCounts).forEach(([key, count]) => {
        if (count >= 2) {
            const [description, amount] = key.split('_');
            recurring.push({
                description,
                amount: parseInt(amount),
                count
            });
        }
    });
    
    return recurring.sort((a, b) => b.count - a.count);
}

// Вспомогательные функции
function calculateTotalIncome() {
    return transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
}

function calculateTotalExpense() {
    return transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
}

function renderBankTransactions(bankId) {
    const bankTransactions = transactions
        .filter(t => t.bank === bankId)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 10);
    
    if (bankTransactions.length === 0) {
        return `
            <div class="empty-state" style="padding: 30px; text-align: center;">
                <i class="fas fa-file-invoice" style="font-size: 48px; color: var(--text-light); margin-bottom: 15px;"></i>
                <p style="color: var(--text-light);">
                    ${currentLanguage === 'ru' ? 'Нет операций для отображения' : 
                     currentLanguage === 'en' ? 'No transactions to display' : 
                     'Көрсету үшін операциялар жоқ'}
                </p>
            </div>
        `;
    }
    
    return bankTransactions.map(t => `
        <div class="transaction-item" style="display: flex; align-items: center; justify-content: space-between; 
             padding: 12px; border-bottom: 1px solid var(--border);">
            <div style="display: flex; align-items: center; gap: 10px;">
                <div class="transaction-icon" style="width: 36px; height: 36px; border-radius: 50%; 
                     background: ${t.type === 'income' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)'}; 
                     color: ${t.type === 'income' ? '#4CAF50' : '#F44336'};
                     display: flex; align-items: center; justify-content: center;">
                    <i class="fas fa-${t.type === 'income' ? 'arrow-down' : 'arrow-up'}"></i>
                </div>
                <div>
                    <div style="font-weight: 600; color: var(--text);">${t.description}</div>
                    <div style="font-size: 12px; color: var(--text-light);">
                        ${formatDate(t.date)} • ${t.category}
                    </div>
                </div>
            </div>
            <div style="font-weight: 600; color: ${t.type === 'income' ? '#4CAF50' : '#F44336'};">
                ${t.type === 'income' ? '+' : '-'}${formatAmount(t.amount)}
            </div>
        </div>
    `).join('');
}

function disconnectBank(bankId) {
    const bank = banks.find(b => b.id === bankId);
    if (!bank) return;
    
    const confirmText = currentLanguage === 'ru' ? 
        `Вы уверены, что хотите отключить ${bank.name}? Все данные будут сохранены.` :
        currentLanguage === 'en' ? 
        `Are you sure you want to disconnect ${bank.name}? All data will be saved.` :
        `${bank.name} банкін ажыратуға сенімдісіз бе? Барлық деректер сақталады.`;
    
    if (confirm(confirmText)) {
        bank.connected = false;
        bank.lastSync = null;
        
        // Обновляем банк в списке
        const bankIndex = banks.findIndex(b => b.id === bankId);
        if (bankIndex !== -1) {
            banks[bankIndex] = bank;
        }
        
        saveToLocalStorage();
        
        showNotification(
            currentLanguage === 'ru' ? `${bank.name} отключен` : 
            currentLanguage === 'en' ? `${bank.name} disconnected` : 
            `${bank.name} ажыратылды`,
            'success'
        );
        
        // Закрываем модальное окно
        closeModal('bankDetailModal');
        
        // Показываем панель подключения банков
        setTimeout(() => {
            showBankConnectionPanel();
        }, 300);
    }
}

function openBankAnalytics() {
    closeModal('bankConnectionModal');
    
    const modalId = 'bankAnalyticsModal';
    let modal = document.getElementById(modalId);
    
    if (!modal) {
        modal = document.createElement('div');
        modal.id = modalId;
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 900px; width: 95%; height: 90vh;">
                <div class="modal-header">
                    <h3>${currentLanguage === 'ru' ? 'Аналитика банковских операций' : 
                         currentLanguage === 'en' ? 'Bank Transactions Analytics' : 
                         'Банк операциялары аналитикасы'}</h3>
                    <button class="modal-close" onclick="closeModal('${modalId}')">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" style="padding: 20px; overflow-y: auto; height: calc(100% - 120px);">
                    <div class="analytics-controls" style="margin-bottom: 20px;">
                        <div style="display: flex; align-items: center; justify-content: space-between;">
                            <div>
                                <button class="btn btn-outline" onclick="filterByMonth(-1)">
                                    <i class="fas fa-chevron-left"></i>
                                </button>
                                <span id="currentMonthDisplay" style="margin: 0 15px; font-weight: 600;">
                                    ${getCurrentMonthName()}
                                </span>
                                <button class="btn btn-outline" onclick="filterByMonth(1)">
                                    <i class="fas fa-chevron-right"></i>
                                </button>
                            </div>
                            <button class="btn btn-primary" onclick="renderCharts()">
                                <i class="fas fa-sync-alt"></i>
                                ${currentLanguage === 'ru' ? 'Обновить' : 
                                 currentLanguage === 'en' ? 'Refresh' : 'Жаңарту'}
                            </button>
                        </div>
                    </div>
                    
                    <div class="analytics-grid" style="display: grid; gap: 20px;">
                        <div class="analytics-card">
                            <h4 style="margin-bottom: 15px;">
                                <i class="fas fa-chart-line"></i>
                                ${currentLanguage === 'ru' ? 'Доходы и расходы по дням' : 
                                 currentLanguage === 'en' ? 'Income and Expenses by Day' : 
                                 'Күндер бойынша табыс пен шығындар'}
                            </h4>
                            <div style="height: 300px;">
                                <div id="bankLineChart" style="height: 100%;"></div>
                            </div>
                        </div>
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                            <div class="analytics-card">
                                <h4 style="margin-bottom: 15px;">
                                    <i class="fas fa-chart-pie"></i>
                                    ${currentLanguage === 'ru' ? 'Расходы по категориям' : 
                                     currentLanguage === 'en' ? 'Expenses by Category' : 
                                     'Санаттар бойынша шығындар'}
                                </h4>
                                <div style="height: 250px;">
                                    <div id="bankPieChart" style="height: 100%;"></div>
                                </div>
                            </div>
                            
                            <div class="analytics-card">
                                <h4 style="margin-bottom: 15px;">
                                    <i class="fas fa-balance-scale"></i>
                                    ${currentLanguage === 'ru' ? 'Баланс' : 
                                     currentLanguage === 'en' ? 'Balance' : 'Баланс'}
                                </h4>
                                <div style="height: 250px;">
                                    <div id="bankBalance" style="height: 100%; display: flex; align-items: center; justify-content: center;"></div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="analytics-card">
                            <h4 style="margin-bottom: 15px;">
                                <i class="fas fa-lightbulb"></i>
                                ${currentLanguage === 'ru' ? 'ИИ-анализ' : 
                                 currentLanguage === 'en' ? 'AI Analysis' : 'ЖК-талдау'}
                            </h4>
                            <div id="aiInsights" style="padding: 15px; background: var(--light-bg); border-radius: var(--radius-sm); 
                                 font-size: 14px; line-height: 1.5;">
                                ${generateAIInsights() || 
                                  (currentLanguage === 'ru' ? 'Загрузите банковские выписки для получения аналитики' : 
                                   currentLanguage === 'en' ? 'Upload bank statements to get analytics' : 
                                   'Аналитика алу үшін банк выпискаларын жүктеңіз')}
                            </div>
                        </div>
                        
                        <div class="analytics-card">
                            <h4 style="margin-bottom: 15px;">
                                <i class="fas fa-exchange-alt"></i>
                                ${currentLanguage === 'ru' ? 'Последние операции' : 
                                 currentLanguage === 'en' ? 'Recent Transactions' : 
                                 'Соңғы операциялар'}
                            </h4>
                            <div style="max-height: 300px; overflow-y: auto;">
                                ${renderAllTransactions()}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer" style="padding: 20px; border-top: 1px solid var(--border);">
                    <button class="btn btn-primary" onclick="closeModal('${modalId}')" style="width: 100%;">
                        ${translations[currentLanguage].closeReport || 'Закрыть'}
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    modal.style.display = 'flex';
    fadeInElement(modal);
    
    // Инициализируем графики
    setTimeout(() => {
        renderCharts();
        renderAnalytics();
        updateMonthDisplay();
    }, 100);
}

function renderAllTransactions() {
    const filteredTransactions = transactions.filter(t => {
        const transactionDate = new Date(t.date);
        return transactionDate.getMonth() === currentMonth && 
               transactionDate.getFullYear() === currentYear;
    }).sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 20);
    
    if (filteredTransactions.length === 0) {
        return `
            <div class="empty-state" style="padding: 30px; text-align: center;">
                <i class="fas fa-file-invoice" style="font-size: 48px; color: var(--text-light); margin-bottom: 15px;"></i>
                <p style="color: var(--text-light);">
                    ${currentLanguage === 'ru' ? 'Нет операций за выбранный период' : 
                     currentLanguage === 'en' ? 'No transactions for selected period' : 
                     'Таңдалған кезеңде операциялар жоқ'}
                </p>
            </div>
        `;
    }
    
    return filteredTransactions.map(t => {
        const bank = banks.find(b => b.id === t.bank);
        return `
            <div class="transaction-item" style="display: flex; align-items: center; justify-content: space-between; 
                 padding: 12px; border-bottom: 1px solid var(--border);">
                <div style="display: flex; align-items: center; gap: 10px; flex: 1;">
                    <div class="transaction-icon" style="width: 32px; height: 32px; border-radius: 50%; 
                         background: ${bank?.color || '#CCCCCC'}20; color: ${bank?.color || '#CCCCCC'};
                         display: flex; align-items: center; justify-content: center; font-size: 12px;">
                        ${bank?.logo || '?'}
                    </div>
                    <div style="flex: 1;">
                        <div style="font-weight: 600; color: var(--text);">${t.description}</div>
                        <div style="font-size: 11px; color: var(--text-light); display: flex; gap: 10px; margin-top: 4px;">
                            <span>${formatDate(t.date)}</span>
                            <span>${t.category}</span>
                            <span>${bank?.name || 'Неизвестный банк'}</span>
                        </div>
                    </div>
                </div>
                <div style="font-weight: 600; color: ${t.type === 'income' ? '#4CAF50' : '#F44336'};">
                    ${t.type === 'income' ? '+' : '-'}${formatAmount(t.amount)}
                </div>
            </div>
        `;
    }).join('');
}

function renderAnalytics() {
    // Обновляем ИИ-инсайты
    const aiInsights = document.getElementById('aiInsights');
    if (aiInsights) {
        aiInsights.textContent = generateAIInsights() || 
            (currentLanguage === 'ru' ? 'Загрузите банковские выписки для получения аналитики' : 
             currentLanguage === 'en' ? 'Upload bank statements to get analytics' : 
             'Аналитика алу үшін банк выпискаларын жүктеңіз');
    }
}

function getCurrentMonthName() {
    const monthNames = {
        ru: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 
             'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        en: ['January', 'February', 'March', 'April', 'May', 'June', 
             'July', 'August', 'September', 'October', 'November', 'December'],
        kz: ['Қаңтар', 'Ақпан', 'Наурыз', 'Сәуір', 'Мамыр', 'Маусым', 
             'Шілде', 'Тамыз', 'Қыркүйек', 'Қазан', 'Қараша', 'Желтоқсан']
    };
    
    return `${monthNames[currentLanguage][currentMonth]} ${currentYear}`;
}

function updateMonthDisplay() {
    const monthDisplay = document.getElementById('currentMonthDisplay');
    if (monthDisplay) {
        monthDisplay.textContent = getCurrentMonthName();
    }
}

function removeFile(button) {
    const fileElement = button.closest('.uploaded-file');
    if (fileElement && fileElement.parentNode) {
        fileElement.parentNode.removeChild(fileElement);
    }
}

// Добавляем переводы для банковской системы
translations.ru.banksTitle = 'Подключение банков';
translations.en.banksTitle = 'Bank Connection';
translations.kz.banksTitle = 'Банктерді қосу';

// Инициализация банковской системы при загрузке приложения
document.addEventListener('DOMContentLoaded', function() {
    // Добавляем кнопку для банковской панели в навигацию
    const bottomNav = document.getElementById('bottomNav');
    if (bottomNav) {
        const bankNavItem = document.createElement('div');
        bankNavItem.className = 'nav-item';
        bankNavItem.innerHTML = `
            <i class="fas fa-university"></i>
            <span>${currentLanguage === 'ru' ? 'Банки' : 
                   currentLanguage === 'en' ? 'Banks' : 'Банктер'}</span>
        `;
        bankNavItem.onclick = showBankConnectionPanel;
        bottomNav.appendChild(bankNavItem);
    }
    
    // Загружаем банковские данные
    loadFromLocalStorage();
    
    // Добавляем ссылку на банковскую панель в главное меню
    setTimeout(() => {
        const dashboard = document.getElementById('dashboard');
        if (dashboard) {
            // Ищем контейнер для инструкций и добавляем банковскую карточку после него
            const instructionsSection = dashboard.querySelector('.instructions-card');
            if (instructionsSection) {
                const bankCard = document.createElement('div');
                bankCard.className = 'instructions-card';
                bankCard.innerHTML = `
                    <div style="display: flex; align-items: center; justify-content: space-between;">
                        <div>
                            <h4 style="margin-bottom: 8px;">
                                <i class="fas fa-university" style="color: var(--primary);"></i>
                                ${currentLanguage === 'ru' ? 'Банковские выписки' : 
                                 currentLanguage === 'en' ? 'Bank Statements' : 'Банк выпискалары'}
                            </h4>
                            <p style="color: var(--text-light); font-size: 14px;">
                                ${currentLanguage === 'ru' ? 'Загружайте выписки и анализируйте расходы' : 
                                 currentLanguage === 'en' ? 'Upload statements and analyze expenses' : 
                                 'Выпискаларды жүктеп, шығындарды талдаңыз'}
                            </p>
                        </div>
                        <button class="btn btn-primary" onclick="showBankConnectionPanel()">
                            <i class="fas fa-plus"></i>
                            ${currentLanguage === 'ru' ? 'Подключить' : 
                             currentLanguage === 'en' ? 'Connect' : 'Қосу'}
                        </button>
                    </div>
                `;
                instructionsSection.parentNode.insertBefore(bankCard, instructionsSection.nextSibling);
            }
        }
    }, 1000);
});

// Обновляем функцию initLanguage для загрузки банковских данных
const originalInitLanguage = initLanguage;
initLanguage = function() {
    originalInitLanguage();
    loadFromLocalStorage();
};

// Обновляем функцию logoutAndReset для очистки банковских данных
const originalLogoutAndReset = logoutAndReset;
logoutAndReset = function() {
    if (currentUser) {
        localStorage.removeItem(`bankData_${currentUser.id}`);
    }
    banks = banks.map(bank => ({ ...bank, connected: false, lastSync: null }));
    transactions = [];
    selectedBank = null;
    currentMonth = new Date().getMonth();
    currentYear = new Date().getFullYear();
    originalLogoutAndReset();
};

// Обновляем функцию register для инициализации банковских данных
const originalRegister = register;
register = function() {
    originalRegister();
    saveToLocalStorage();
};

console.log('Банковская система инициализирована');


