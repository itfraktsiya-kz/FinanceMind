// ========== ОСНОВНЫЕ ПЕРЕМЕННЫЕ И ИНИЦИАЛИЗАЦИЯ ==========

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
let appVisits = 0;
let currentReport = null;

// === ЛОКАЛИЗАЦИЯ ===
const translations = {
    ru: {
        appTitle: "FinanceMind",
        appSubtitle: "Умный финансовый помощник",
        welcome: "Добро пожаловать!",
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
        homeNav: "Главная",
        analyticsNav: "Аналитика",
        missionsNav: "Миссии",
        chatNav: "Помощник",
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
        foodCategory: "Еда",
        transportCategory: "Транспорт",
        studyCategory: "Учеба",
        entertainmentCategory: "Развлечения",
        otherCategory: "Другое",
        yourFincoins: "Ваши FinCoins:",
        storeButton: "Магазин",
        earnButton: "Заработать",
        premiumSubscription: "Премиум подписка",
        premiumTitle: "FinanceMind Premium",
        premiumBadge: "PREMIUM",
        premiumDescription: "Получите доступ ко всем премиум-функциям",
        premiumFeatures: "Премиум функции",
        extendedAnalytics: "Расширенная аналитика",
        extendedAnalyticsDesc: "Подробные отчеты и прогнозы расходов",
        aiCoachTitle: "Персональный AI-коуч",
        aiCoachDesc: "Индивидуальные финансовые рекомендации",
        exclusiveThemes: "Эксклюзивные темы",
        exclusiveThemesDesc: "5 уникальных цветовых схем",
        iconPack: "Набор иконок",
        iconPackDesc: "Стильные иконки для категорий",
        activatePremium: "Активировать премиум",
        buyNow: "Купить сейчас",
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
        chatPlaceholder: "Напишите ваш вопрос...",
        welcomeMessage: "Привет! Я ваш AI-помощник по финансам. 🤖<br>Могу помочь с анализом расходов, советами по экономии и финансовым планированием.",
        adminPanel: "Админ панель",
        totalUsers: "Всего пользователей",
        totalMissions: "Всего миссий",
        completedMissions: "Выполнено миссий",
        totalFincoins: "Выдано FinCoins",
        missionManagement: "Управление миссиями",
        userProgress: "Прогресс пользователей",
        exportAllData: "Экспорт всех данных",
        reportsSection: "Отчеты",
        monthlyReport: "Отчет за месяц",
        monthlyReportDesc: "Сводка расходов за текущий месяц",
        detailedReport: "Обширный отчет",
        detailedReportDesc: "Полная статистика и аналитика",
        shareReport: "Поделиться",
        downloadReport: "Скачать",
        closeReport: "Закрыть",
        reportGenerated: "Отчет сгенерирован",
        userRole: "Пользователь",
        instructionsModalTitle: "Инструкция по использованию FinanceMind",
        instructionsWelcome: "Добро пожаловать в FinanceMind!",
        instructionsIntro: "Эта инструкция поможет вам быстро освоиться в приложении.",
        instructionsSection1: "1. Главный экран",
        instructionsSection1Item1: "Просматривайте статистику расходов",
        instructionsSection1Item2: "Получайте AI-советы",
        instructionsSection1Item3: "Управляйте финансовыми целями",
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
        popular: "Популярное",
        exportData: "Экспорт данных",
        importData: "Импорт данных",
        addCategory: "Добавить категорию",
        food: "Еда",
        transport: "Транспорт",
        study: "Учеба",
        entertainment: "Развлечения",
        other: "Другое"
    },
    en: {
        appTitle: "FinanceMind",
        appSubtitle: "Smart Financial Assistant",
        welcome: "Welcome!",
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
        homeNav: "Home",
        analyticsNav: "Analytics",
        missionsNav: "Missions",
        chatNav: "Assistant",
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
        foodCategory: "Food",
        transportCategory: "Transport",
        studyCategory: "Study",
        entertainmentCategory: "Entertainment",
        otherCategory: "Other",
        yourFincoins: "Your FinCoins:",
        storeButton: "Store",
        earnButton: "Earn",
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
        chatPlaceholder: "Write your question...",
        welcomeMessage: "Hello! I'm your AI financial assistant. 🤖<br>I can help with expense analysis, saving tips, and financial planning.",
        adminPanel: "Admin Panel",
        totalUsers: "Total Users",
        totalMissions: "Total Missions",
        completedMissions: "Completed Missions",
        totalFincoins: "Total FinCoins Issued",
        missionManagement: "Mission Management",
        userProgress: "User Progress",
        exportAllData: "Export All Data",
        reportsSection: "Reports",
        monthlyReport: "Monthly Report",
        monthlyReportDesc: "Expense summary for current month",
        detailedReport: "Detailed Report",
        detailedReportDesc: "Complete statistics and analytics",
        shareReport: "Share",
        downloadReport: "Download",
        closeReport: "Close",
        reportGenerated: "Report generated",
        userRole: "User",
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
        popular: "Popular",
        exportData: "Export Data",
        importData: "Import Data",
        addCategory: "Add Category",
        food: "Food",
        transport: "Transport",
        study: "Study",
        entertainment: "Entertainment",
        other: "Other"
    },
    kz: {
        appTitle: "FinanceMind",
        appSubtitle: "Ақылды қаржы көмекшісі",
        welcome: "Қош келдіңіз!",
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
        homeNav: "Басты",
        analyticsNav: "Аналитика",
        missionsNav: "Миссиялар",
        chatNav: "Көмекші",
        aiAdviceTitle: "ЖС Күнделікті кеңесі",
        aiAdviceDefault: "Жекелендірілген кеңес алу үшін шығындарды қосуды бастаңыз!",
        myGoals: "Менің мақсаттарым",
        addButton: "Қосу",
        noGoals: "Сізде әлі қаржылық мақсаттар жоқ",
        instructionsTitle: "Пайдалану нұсқаулығы",
        instructionsDescription: "Қолдану нұсқаулығын оқу үшін басыңыз",
        yourStatistics: "Сіздің статистикаңыз",
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
        foodCategory: "Тамақ",
        transportCategory: "Көлік",
        studyCategory: "Оқу",
        entertainmentCategory: "Ойын-сауық",
        otherCategory: "Басқа",
        yourFincoins: "Сіздің FinCoins:",
        storeButton: "Дүкен",
        earnButton: "Табу",
        premiumSubscription: "Премиум жазылым",
        premiumTitle: "FinanceMind Premium",
        premiumBadge: "PREMIUM",
        premiumDescription: "Барлық премиум функцияларға қол жеткізіңіз",
        premiumFeatures: "Премиум функциялар",
        extendedAnalytics: "Кеңейтілген аналитика",
        extendedAnalyticsDesc: "Егжей-тегжейлі есептер мен болжамдар",
        aiCoachTitle: "Жеке ЖС жаттықтырушысы",
        aiCoachDesc: "Жеке қаржылық ұсыныстар",
        exclusiveThemes: "Эксклюзивті темалар",
        exclusiveThemesDesc: "5 бірегей түс схемасы",
        iconPack: "Белгішелер жинағы",
        iconPackDesc: "Санаттар үшін стильді белгішелер",
        activatePremium: "Премиумды белсендіру",
        buyNow: "Қазір сатып алу",
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
        chatPlaceholder: "Сұрағыңызды жазыңыз...",
        welcomeMessage: "Сәлем! Мен сіздің қаржылық ЖС көмекшісінбін. 🤖<br>Шығындарды талдау, үнемдеу кеңестері және қаржылық жоспарлау бойынша көмектесе аламын.",
        adminPanel: "Әкімші панелі",
        totalUsers: "Барлық пайдаланушылар",
        totalMissions: "Барлық миссиялар",
        completedMissions: "Орындалған миссиялар",
        totalFincoins: "Берілген FinCoins",
        missionManagement: "Миссияларды басқару",
        userProgress: "Пайдаланушылар прогрессі",
        exportAllData: "Барлық деректерді экспорттау",
        reportsSection: "Есептер",
        monthlyReport: "Айлық есеп",
        monthlyReportDesc: "Ағымдағы айға арналған шығындар жинағы",
        detailedReport: "Толық есеп",
        detailedReportDesc: "Толық статистика және аналитика",
        shareReport: "Бөлісу",
        downloadReport: "Жүктеу",
        closeReport: "Жабу",
        reportGenerated: "Есеп жасалды",
        userRole: "Пайдаланушы",
        instructionsModalTitle: "FinanceMind пайдалану нұсқаулығы",
        instructionsWelcome: "FinanceMind-қа қош келдіңіз!",
        instructionsIntro: "Бұл нұсқаулық қолданбамен тез танысуға көмектеседі.",
        instructionsSection1: "1. Негізгі экран",
        instructionsSection1Item1: "Шығындар статистикасын қарау",
        instructionsSection1Item2: "ЖС кеңестерін алу",
        instructionsSection1Item3: "Қаржылық мақсаттарды басқару",
        instructionsSection2: "2. Аналитика",
        instructionsSection2Item1: "Шығындар графиктерін талдау",
        instructionsSection2Item2: "Жаңа шығындарды қосу",
        instructionsSection2Item3: "Шығындар тарихын қарау",
        instructionsSection3: "3. Миссиялар",
        instructionsSection3Item1: "Тапсырмаларды орындау",
        instructionsSection3Item2: "FinCoins табу",
        instructionsSection3Item3: "Прогресті бақылау",
        instructionsSection4: "4. Дүкен",
        instructionsSection4Item1: "Премиум функцияларды сатып алу",
        instructionsSection4Item2: "Жиналған FinCoins жұмсау",
        instructionsSection5: "5. ЖС көмекшісі",
        instructionsSection5Item1: "Қаржылық кеңес алу",
        instructionsSection5Item2: "Сұрақтар қою",
        instructionsGotIt: "Түсіндім, пайдалануды бастау",
        popular: "Танымал",
        exportData: "Деректерді экспорттау",
        importData: "Деректерді импорттау",
        addCategory: "Санат қосу",
        food: "Тамақ",
        transport: "Көлік",
        study: "Оқу",
        entertainment: "Ойын-сауық",
        other: "Басқа"
    }
};

// Миссии приложения (10 миссий)
const appMissions = [
    {
        id: 1,
        title: "Первое знакомство",
        description: "Войдите в приложение 3 раза",
        reward: 50,
        difficulty: "easy",
        category: "engagement",
        condition: (userData) => (userData.appVisits || 0) >= 3,
        progress: (userData) => Math.min(100, ((userData.appVisits || 0) / 3) * 100),
        requirements: ["Откройте приложение 3 раза", "Изучите основные функции"]
    },
    {
        id: 2,
        title: "Первая цель",
        description: "Создайте финансовую цель",
        reward: 50,
        difficulty: "easy",
        category: "goals",
        condition: (userData) => userData.goals.length >= 1,
        progress: (userData) => userData.goals.length >= 1 ? 100 : 0,
        requirements: ["Создайте хотя бы одну цель", "Начните планировать финансы"]
    },
    {
        id: 3,
        title: "Начало пути",
        description: "Добавьте первый расход",
        reward: 30,
        difficulty: "easy",
        category: "expenses",
        condition: (userData) => userData.expenses.length >= 1,
        progress: (userData) => userData.expenses.length >= 1 ? 100 : 0,
        requirements: ["Добавьте любой расход", "Начните отслеживать траты"]
    },
    {
        id: 4,
        title: "Активный пользователь",
        description: "Добавляйте расходы 3 дня подряд",
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
        requirements: ["Добавляйте расходы каждый день", "Не пропускайте дни"]
    },
    {
        id: 5,
        title: "Экономия на еде",
        description: "Потратьте менее ₸5000 на еду за неделю",
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
        requirements: ["Контролируйте расходы на питание", "Не превышайте ₸5000 за неделю"]
    },
    {
        id: 6,
        title: "Финансовый аналитик",
        description: "Просмотрите аналитику 5 раз",
        reward: 80,
        difficulty: "easy",
        category: "analytics",
        condition: (userData) => (userData.analyticsViews || 0) >= 5,
        progress: (userData) => Math.min(100, ((userData.analyticsViews || 0) / 5) * 100),
        requirements: ["Изучайте раздел аналитики", "Анализируйте свои расходы"]
    },
    {
        id: 7,
        title: "Накопитель",
        description: "Накопите ₸10,000 на цели",
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
        requirements: ["Создайте цели накопления", "Накопите общую сумму ₸10,000"]
    },
    {
        id: 8,
        title: "Разнообразие трат",
        description: "Используйте все 5 категорий расходов",
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
        requirements: ["Используйте разные категории", "Попробуйте все 5 категорий расходов"]
    },
    {
        id: 9,
        title: "Планировщик",
        description: "Создайте 3 финансовые цели",
        reward: 120,
        difficulty: "medium",
        category: "planning",
        condition: (userData) => userData.goals.length >= 3,
        progress: (userData) => Math.min(100, (userData.goals.length / 3) * 100),
        requirements: ["Создайте несколько целей", "Планируйте разные финансовые задачи"]
    },
    {
        id: 10,
        title: "Ветеран миссий",
        description: "Выполните 5 любых миссий",
        reward: 200,
        difficulty: "hard",
        category: "achievements",
        condition: (userData) => (userData.completedMissions || []).length >= 5,
        progress: (userData) => Math.min(100, ((userData.completedMissions || []).length / 5) * 100),
        requirements: ["Выполняйте разные миссии", "Достигните 5 выполненных миссий"]
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
    'Развлечения': '#4BC0C0',
    'Другое': '#9966FF'
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

// ========== ФУНКЦИИ ДЛЯ ФОРМАТИРОВАНИЯ ==========

function formatAmount(amount) {
    return Math.round(amount).toLocaleString('ru-RU') + ' ₸';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
}

// ========== ФУНКЦИИ ДЛЯ АВТОРИЗАЦИИ И РЕГИСТРАЦИИ ==========

function togglePasswordVisibility(fieldId) {
    const passwordField = document.getElementById(fieldId);
    const toggleButton = passwordField.nextElementSibling;
    
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleButton.innerHTML = '<i class="fas fa-eye-slash"></i>';
    } else {
        passwordField.type = 'password';
        toggleButton.innerHTML = '<i class="fas fa-eye"></i>';
    }
}

function resetAllData() {
    const confirmText = currentLanguage === 'ru' ? 'Вы уверены, что хотите сбросить все данные? Это удалит все ваши настройки, расходы и цели.' :
                      currentLanguage === 'en' ? 'Are you sure you want to reset all data? This will delete all your settings, expenses and goals.' :
                      'Барлық деректерді қалпына келтіруді сенімдісіз бе? Бұл сіздің барлық баптауларыңызды, шығындарыңызды және мақсаттарыңызды жояды.';
    
    if (confirm(confirmText)) {
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
        
        const successText = currentLanguage === 'ru' ? 'Все данные сброшены! Теперь вы можете зарегистрироваться заново.' :
                          currentLanguage === 'en' ? 'All data has been reset! You can now register again.' :
                          'Барлық деректер қалпына келтірілді! Енді қайта тіркеле аласыз.';
        
        showNotification(successText, 'success');
        showLoginForm();
        
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
        if (pageElement) pageElement.style.display = 'none';
    });
    
    const authPage = document.getElementById('authPage');
    if (authPage) authPage.style.display = 'block';
    
    showLoginForm();
    
    const logoutText = currentLanguage === 'ru' ? 'Вы вышли из системы' :
                     currentLanguage === 'en' ? 'You have logged out' :
                     'Сіз жүйеден шықтыңыз';
    
    showNotification(logoutText, 'info');
}

function register() {
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    
    if (!name || !email || !password) {
        const errorText = currentLanguage === 'ru' ? 'Пожалуйста, заполните все поля' :
                        currentLanguage === 'en' ? 'Please fill in all fields' :
                        'Барлық өрістерді толтырыңыз';
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
        email: email,
        password: password,
        role: 'user',
        createdAt: new Date().toISOString(),
        profile: { lastName: '' },
        settings: { language: 'ru', theme: 'light' }
    };
    
    users.push(newUser);
    localStorage.setItem('financemind_users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    localStorage.setItem('isLoggedIn', 'true');
    
    currentUser = newUser;
    initializeUserData(newUser.id);
    showAppInterface();
    
    const successText = currentLanguage === 'ru' ? 'Регистрация выполнена успешно! Добро пожаловать в FinanceMind!' :
                      currentLanguage === 'en' ? 'Registration successful! Welcome to FinanceMind!' :
                      'Тіркелу сәтті аяқталды! FinanceMind-қа қош келдіңіз!';
    
    showNotification(successText, 'success');
}

function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (!email || !password) {
        const errorText = currentLanguage === 'ru' ? 'Пожалуйста, заполните все поля' :
                        currentLanguage === 'en' ? 'Please fill in all fields' :
                        'Барлық өрістерді толтырыңыз';
        showNotification(errorText, 'error');
        return;
    }
    
    // Специальный доступ для администратора
    if (email === 'admin@financemind.com' && password === 'admin123') {
        const adminUser = {
            id: 'admin',
            name: 'Администратор',
            email: 'admin@financemind.com',
            role: 'admin',
            createdAt: new Date().toISOString(),
            profile: { lastName: '', role: 'Администратор' },
            settings: { language: 'ru', theme: 'light' }
        };
        
        localStorage.setItem('currentUser', JSON.stringify(adminUser));
        localStorage.setItem('isLoggedIn', 'true');
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
        currentUser = user;
        loadUserData();
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

function initializeUserData(userId) {
    const userData = {
        expenses: [],
        goals: [],
        missions: [],
        fincoins: 100,
        purchasedItems: [],
        completedMissions: [],
        hasPremiumSubscription: false,
        analyticsViews: 0,
        appVisits: 1,
        totalFincoinsEarned: 0,
        settings: { language: 'ru', theme: 'light', currency: '₸', notifications: true }
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
    
    initLanguage();
    showPage('dashboard');
}

// ========== ФУНКЦИИ ДЛЯ ПЕРЕКЛЮЧЕНИЯ СТРАНИЦ ==========

function showPage(page) {
    const mainPages = ['dashboard', 'analytics', 'missions', 'store', 'settings', 'chat', 'adminPanel'];
    mainPages.forEach(p => {
        const pageElement = document.getElementById(p);
        if (pageElement) pageElement.style.display = 'none';
    });
    
    const modals = document.querySelectorAll('.modal-overlay');
    modals.forEach(modal => {
        if (modal.id !== 'goalModal' && modal.id !== 'instructionModal' && modal.id !== 'reportModal') {
            modal.style.display = 'none';
        }
    });
    
    const targetPage = document.getElementById(page);
    if (targetPage) {
        targetPage.style.display = 'block';
        
        // Анимация появления
        targetPage.style.opacity = '0';
        targetPage.style.transform = 'translateY(20px)';
        targetPage.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        
        setTimeout(() => {
            targetPage.style.opacity = '1';
            targetPage.style.transform = 'translateY(0)';
        }, 50);
        
        // Обновляем заголовок
        updateHeaderTitle(page);
        
        // Специальная обработка для чата
        if (page === 'chat') {
            document.body.style.overflow = 'hidden';
            setTimeout(() => scrollChatToBottom(), 200);
        } else {
            document.body.style.overflow = 'auto';
        }
        
        // Увеличиваем счетчик просмотров аналитики
        if (page === 'analytics' && currentUser) {
            const userData = JSON.parse(localStorage.getItem(`userData_${currentUser.id}`) || '{}');
            userData.analyticsViews = (userData.analyticsViews || 0) + 1;
            localStorage.setItem(`userData_${currentUser.id}`, JSON.stringify(userData));
        }
        
        // Увеличиваем счетчик посещений приложения
        if (currentUser && page === 'dashboard') {
            const userData = JSON.parse(localStorage.getItem(`userData_${currentUser.id}`) || '{}');
            userData.appVisits = (userData.appVisits || 0) + 1;
            localStorage.setItem(`userData_${currentUser.id}`, JSON.stringify(userData));
            updateMissionsProgress();
        }
    }
    
    // Обновляем активную навигацию
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    const activeNavItem = document.querySelector(`.nav-item[onclick*="${page}"]`);
    if (activeNavItem) activeNavItem.classList.add('active');
    
    updatePageContent(page);
}

function updateHeaderTitle(page) {
    const headerTitle = document.getElementById('headerTitle');
    if (!headerTitle) return;
    
    const titles = {
        'dashboard': translations[currentLanguage].homeNav,
        'analytics': translations[currentLanguage].analyticsNav,
        'missions': translations[currentLanguage].missionsNav,
        'store': translations[currentLanguage].storeButton,
        'settings': translations[currentLanguage].systemSettings,
        'chat': translations[currentLanguage].chatNav,
        'adminPanel': translations[currentLanguage].adminPanel
    };
    
    headerTitle.textContent = titles[page] || 'FinanceMind';
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
}

function updateSettings() {
    if (currentUser) {
        document.getElementById('profileNameInput').value = currentUser.name || '';
        document.getElementById('profileLastNameInput').value = currentUser.profile?.lastName || '';
        document.getElementById('profileEmailInput').value = currentUser.email || '';
    }
}

function updateChat() {
    setTimeout(() => scrollChatToBottom(), 100);
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
        fincoins = userData.fincoins || 0;
        missions = userData.missions || [];
        purchasedItems = userData.purchasedItems || [];
        appVisits = userData.appVisits || 0;
        
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
            settings: { language: currentLanguage, theme: 'light', currency: '₸', notifications: true }
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
        if (profileNameElement) profileNameElement.textContent = currentUser.name;
        if (profileEmailElement) profileEmailElement.textContent = currentUser.email;
        if (profileRoleElement) {
            profileRoleElement.textContent = currentUser.role === 'admin' ? 
                (currentLanguage === 'ru' ? 'Администратор' : 
                 currentLanguage === 'en' ? 'Administrator' : 'Әкімші') : 
                translations[currentLanguage].userRole;
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
            "Try the 50/30/20 rule: 50% for necessities, 30% for wants, 20% for savings.",
            "Small daily expenses often add up to large amounts. Keep track of all spending.",
            "Set up automatic transfers to savings - this is the easiest way to save.",
            "Before a major purchase, give yourself 24 hours to think - this will help avoid impulse spending."
        ],
        kz: [
            "Шығындарды үнемі бақылау - қаржылық тұрақтылыққа бірінші қадам. Осылай жалғастырыңыз!",
            "50/30/20 ережесін пайдаланып көріңіз: 50% қажеттіліктерге, 30% тілектерге, 20% жинақтарға.",
            "Кішкене күнделікті шығындар жиі үлкен сомаларға жиналады. Барлық шығындарды есептеңіз.",
            "Жинақтарға автоматты аударымдарды орнатыңыз - бұл жинақтаудың ең оңай тәсілі.",
            "Ірі сатып алу алдында ойлану үшін 24 сағат уақыт беріңіз - бұл импульстік шығындарды болдырмауға көмектеседі."
        ]
    };
    
    return adviceList[currentLanguage][Math.floor(Math.random() * adviceList[currentLanguage].length)];
}

// ========== ФУНКЦИИ ДЛЯ ИНСТРУКЦИИ ==========

function showInstructionModal() {
    document.getElementById('instructionModal').style.display = 'flex';
}

function closeInstructionModal() {
    document.getElementById('instructionModal').style.display = 'none';
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
                statusText = currentLanguage === 'ru' ? '🎉 Цель достигнута!' :
                           currentLanguage === 'en' ? '🎉 Goal achieved!' :
                           '🎉 Мақсатқа жетті!';
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
    
    event.target.classList.add('selected');
}

function addExpense() {
    const amount = parseFloat(document.getElementById('expenseAmount').value);
    const date = document.getElementById('expenseDate').value;
    const description = document.getElementById('expenseDescription').value;
    
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
    
    document.getElementById('expenseAmount').value = '';
    document.getElementById('expenseDate').value = new Date().toISOString().split('T')[0];
    document.getElementById('expenseDescription').value = '';
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    selectedCategory = null;
    
    const successText = currentLanguage === 'ru' ? 'Расход успешно добавлен!' :
                      currentLanguage === 'en' ? 'Expense successfully added!' :
                      'Шығын сәтті қосылды!';
    
    showNotification(successText, 'success');
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
                tension: 0.4
            }]
        };
        
        lineChart = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { callback: value => '₸' + value.toLocaleString() }
                    }
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
        
        lineChart = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom' } },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { callback: value => '₸' + value.toLocaleString() }
                    }
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
    const backgroundColors = categories.map(category => categoryColors[category] || '#C9CBCF');
    
    const chartData = {
        labels: categories,
        datasets: [{
            data: amounts,
            backgroundColor: backgroundColors,
            borderWidth: 2,
            borderColor: '#FFFFFF'
        }]
    };
    
    pieChart = new Chart(ctx, {
        type: 'doughnut',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'bottom' } }
        }
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
    
    const successText = currentLanguage === 'ru' ? `+${amount} FinCoins!` :
                      currentLanguage === 'en' ? `+${amount} FinCoins!` :
                      `+${amount} FinCoins!`;
    
    showNotification(successText, 'success');
}

function renderMissions() {
    const missionsList = document.getElementById('missionsList');
    if (!missionsList) return;
    
    if (appMissions.length === 0) {
        missionsList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-trophy"></i>
                <p>${currentLanguage === 'ru' ? 'Миссии скоро появятся!' : 
                    currentLanguage === 'en' ? 'Missions coming soon!' : 
                    'Миссиялар жақында пайда болады!'}</p>
            </div>
        `;
        return;
    }
    
    missionsList.innerHTML = appMissions.map(mission => {
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
        const difficultyColors = { 'easy': '#48BB78', 'medium': '#ED8936', 'hard': '#E53E3E' };
        const icon = missionIcons[mission.category] || 'fas fa-star';
        
        const completeButtonText = isCompleted ? 
            (currentLanguage === 'ru' ? '✓ Выполнено' : 
             currentLanguage === 'en' ? '✓ Completed' : '✓ Орындалды') :
            (currentLanguage === 'ru' ? 'Получить' : 
             currentLanguage === 'en' ? 'Get' : 'Алу');
        
        return `
            <div class="mission-card ${isCompleted ? 'completed' : ''}" onclick="showMissionDetail(${mission.id})">
                <div class="mission-header">
                    <div class="mission-icon" style="background: ${difficultyColors[mission.difficulty]}20; color: ${difficultyColors[mission.difficulty]};">
                        <i class="${icon}"></i>
                    </div>
                    <div class="mission-info">
                        <div class="mission-title">${mission.title}</div>
                        <div class="mission-description">${mission.description}</div>
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
                    <button class="mission-complete-btn" onclick="event.stopPropagation(); completeMission(${mission.id})" ${isCompleted ? 'disabled' : ''}>
                        ${completeButtonText}
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function getDifficultyText(difficulty) {
    const texts = {
        'easy': currentLanguage === 'ru' ? 'Легко' : currentLanguage === 'en' ? 'Easy' : 'Оңай',
        'medium': currentLanguage === 'ru' ? 'Средне' : currentLanguage === 'en' ? 'Medium' : 'Орташа',
        'hard': currentLanguage === 'ru' ? 'Сложно' : currentLanguage === 'en' ? 'Hard' : 'Қиын'
    };
    return texts[difficulty] || difficulty;
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
        (currentLanguage === 'ru' ? 'Получить награду' : 
         currentLanguage === 'en' ? 'Get reward' : 'Сыйлық алу');
    
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 500px; width: 90%;">
            <div class="modal-header">
                <h3>${mission.title}</h3>
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
                        <div style="font-weight: 600; color: var(--text);">${mission.description}</div>
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
                        ${mission.requirements.map(req => `<li style="margin-bottom: 8px;">${req}</li>`).join('')}
                    </ul>
                </div>
            </div>
            
            <div style="display: flex; gap: 12px;">
                <button class="btn btn-outline" onclick="this.closest('.modal-overlay').remove()" style="flex: 1;">
                    ${closeText}
                </button>
                <button class="btn btn-primary" onclick="completeMission(${mission.id}); this.closest('.modal-overlay').remove()" 
                        style="flex: 1;" ${isCompleted ? 'disabled' : ''}>
                    ${getRewardText}
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
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
            missions.push({ id: missionId, completed: true, completedAt: new Date().toISOString() });
        }
        
        saveUserData();
        
        const successText = currentLanguage === 'ru' ? `Миссия "${mission.title}" выполнена! Получено ${mission.reward} FinCoins` :
                          currentLanguage === 'en' ? `Mission "${mission.title}" completed! Received ${mission.reward} FinCoins` :
                          `"${mission.title}" миссиясы орындалды! ${mission.reward} FinCoins алынды`;
        
        showNotification(successText, 'success');
        updateMissionsProgress();
    } else {
        const warningText = currentLanguage === 'ru' ? 'Миссия еще не выполнена. Продолжайте в том же духе!' :
                          currentLanguage === 'en' ? 'Mission not completed yet. Keep it up!' :
                          'Миссия әлі орындалмады. Осылай жалғастырыңыз!';
        showNotification(warningText, 'warning');
    }
}

function updateMissionsProgress() {
    setTimeout(() => renderMissions(), 100);
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

// ========== ФУНКЦИИ ДЛЯ ЧАТА ==========

function scrollChatToBottom() {
    const chatMessages = document.getElementById('chatMessages');
    if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
        setTimeout(() => chatMessages.scrollTop = chatMessages.scrollHeight, 100);
    }
}

function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    const welcomeMessage = document.querySelector('.welcome-message');
    
    if (!chatInput || !chatMessages) return;
    
    const message = chatInput.value.trim();
    if (!message) return;
    
    // Скрываем приветственное сообщение при первом сообщении пользователя
    if (welcomeMessage) welcomeMessage.style.display = 'none';
    
    const userMessage = document.createElement('div');
    userMessage.className = 'message message-user';
    userMessage.innerHTML = `<div class="message-content">${message}</div>`;
    chatMessages.appendChild(userMessage);
    
    chatInput.value = '';
    scrollChatToBottom();
    
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'message message-ai';
    typingIndicator.innerHTML = `<div class="message-content"><i class="fas fa-ellipsis-h"></i></div>`;
    chatMessages.appendChild(typingIndicator);
    scrollChatToBottom();
    
    setTimeout(() => {
        chatMessages.removeChild(typingIndicator);
        
        const aiResponse = getAIResponse(message);
        const aiMessage = document.createElement('div');
        aiMessage.className = 'message message-ai';
        aiMessage.innerHTML = `<div class="message-content">${aiResponse}</div>`;
        chatMessages.appendChild(aiMessage);
        scrollChatToBottom();
    }, 2000);
}

function getAIResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Переводим сообщение пользователя для анализа
    const translatedMessage = translateUserMessage(lowerMessage);
    
    if (translatedMessage.includes('привет') || translatedMessage.includes('hello') || translatedMessage.includes('салем')) {
        return currentLanguage === 'ru' ? "Привет! Я ваш AI-помощник по финансам. Чем могу помочь?" :
               currentLanguage === 'en' ? "Hello! I'm your AI financial assistant. How can I help you?" :
               "Сәлем! Мен сіздің қаржылық ЖС көмекшісінбін. Қандай көмек көрсете аламын?";
    }
    
    if (translatedMessage.includes('расход') || translatedMessage.includes('expense') || translatedMessage.includes('шығын')) {
        return currentLanguage === 'ru' ? "Чтобы добавить расход, перейдите в раздел 'Аналитика' и заполните форму внизу страницы. Не забудьте выбрать категорию расхода!" :
               currentLanguage === 'en' ? "To add an expense, go to the 'Analytics' section and fill out the form at the bottom of the page. Don't forget to select an expense category!" :
               "Шығын қосу үшін 'Аналитика' бөліміне өтіп, беттің төменгі жағындағы форманы толтырыңыз. Шығын санатын таңдауды ұмытпаңыз!";
    }
    
    if (translatedMessage.includes('цел') || translatedMessage.includes('goal') || translatedMessage.includes('мақсат')) {
        return currentLanguage === 'ru' ? "Финансовые цели помогают планировать будущее. Вы можете добавить цель на главной странице, нажав кнопку 'Добавить' в разделе 'Мои цели'." :
               currentLanguage === 'en' ? "Financial goals help plan the future. You can add a goal on the main page by clicking the 'Add' button in the 'My Goals' section." :
               "Қаржылық мақсаттар болашақты жоспарлауға көмектеседі. Негізгі бетте 'Менің мақсаттарым' бөліміндегі 'Қосу' түймесін басу арқылы мақсат қоса аласыз.";
    }
    
    if (translatedMessage.includes('совет') || translatedMessage.includes('advice') || translatedMessage.includes('кеңес')) {
        return getFinancialAdvice();
    }
    
    const defaultResponses = {
        ru: [
            "Интересный вопрос! Я специализируюсь на финансовых темах. Могу помочь с анализом расходов, планированием бюджета или дать советы по экономии.",
            "Как AI-помощник по финансам, я могу помочь вам с управлением расходами, установкой целей и финансовым планированием. Что конкретно вас интересует?",
            "Для более точного ответа уточните ваш вопрос. Я могу помочь с финансовым планированием, анализом расходов или дать советы по экономии денег."
        ],
        en: [
            "Interesting question! I specialize in financial topics. I can help with expense analysis, budget planning, or give saving tips.",
            "As an AI financial assistant, I can help you with expense management, goal setting, and financial planning. What specifically interests you?",
            "For a more accurate answer, clarify your question. I can help with financial planning, expense analysis, or money saving tips."
        ],
        kz: [
            "Қызықты сұрақ! Мен қаржылық тақырыптар бойынша мамандандырылғанмын. Шығындарды талдау, бюджетті жоспарлау немесе үнемдеу бойынша кеңес беруге көмектесе аламын.",
            "Қаржылық ЖС көмекшісі ретінде мен сізге шығындарды басқару, мақсаттарды белгілеу және қаржылық жоспарлау бойынша көмектесе аламын. Сізді нақты не қызықтырады?",
            "Дәлірек жауап алу үшін сұрағыңызды нақтылаңыз. Мен қаржылық жоспарлау, шығындарды талдау немесе ақшаны үнемдеу бойынша кеңес беруге көмектесе аламын."
        ]
    };
    
    return defaultResponses[currentLanguage][Math.floor(Math.random() * defaultResponses[currentLanguage].length)];
}

function translateUserMessage(message) {
    // Простой перевод ключевых слов для анализа сообщений пользователя
    const translationMap = {
        'ru': {
            'привет': 'привет', 'здравствуй': 'привет', 'салем': 'привет',
            'расход': 'расход', 'трат': 'расход', 'шығын': 'расход',
            'цел': 'цель', 'накоп': 'цель', 'мақсат': 'цель',
            'совет': 'совет', 'рекомендац': 'совет', 'кеңес': 'совет'
        },
        'en': {
            'привет': 'hello', 'здравствуй': 'hello', 'салем': 'hello',
            'расход': 'expense', 'трат': 'expense', 'шығын': 'expense',
            'цел': 'goal', 'накоп': 'goal', 'мақсат': 'goal',
            'совет': 'advice', 'рекомендац': 'advice', 'кеңес': 'advice'
        },
        'kz': {
            'привет': 'салем', 'здравствуй': 'салем', 'салем': 'салем',
            'расход': 'шығын', 'трат': 'шығын', 'шығын': 'шығын',
            'цел': 'мақсат', 'накоп': 'мақсат', 'мақсат': 'мақсат',
            'совет': 'кеңес', 'рекомендац': 'кеңес', 'кеңес': 'кеңес'
        }
    };
    
    let translatedMessage = message;
    Object.keys(translationMap[currentLanguage]).forEach(key => {
        if (message.includes(key)) {
            translatedMessage = translatedMessage.replace(key, translationMap[currentLanguage][key]);
        }
    });
    
    return translatedMessage;
}

function getFinancialAdvice() {
    const adviceList = {
        ru: [
            "Регулярно отслеживайте все расходы - даже мелкие. Это поможет увидеть полную картину ваших финансов.",
            "Создайте финансовую подушку безопасности на 3-6 месяцев расходов.",
            "Используйте правило 50/30/20: 50% на necessities, 30% на wants, 20% на savings и инвестиции.",
            "Перед крупной покупкой дайте себе 24-48 часов на размышление.",
            "Автоматизируйте накопления - настройте автоматические переводы на сберегательный счет."
        ],
        en: [
            "Regularly track all expenses - even small ones. This will help you see the full picture of your finances.",
            "Create a financial safety net for 3-6 months of expenses.",
            "Use the 50/30/20 rule: 50% for necessities, 30% for wants, 20% for savings and investments.",
            "Before a major purchase, give yourself 24-48 hours to think.",
            "Automate savings - set up automatic transfers to a savings account."
        ],
        kz: [
            "Барлық шығындарды үнемі бақылаңыз - тіпті кішкентайларын да. Бұл сіздің қаржыларыңыздың толық көрінісін көруге көмектеседі.",
            "3-6 айлық шығындар үшін қаржылық қорғаныс желісін құрыңыз.",
            "50/30/20 ережесін пайдаланыңыз: 50% қажеттіліктерге, 30% тілектерге, 20% жинақтарға және инвестицияларға.",
            "Ірі сатып алу алдында ойлану үшін 24-48 сағат уақыт беріңіз.",
            "Жинақтарды автоматтандырыңыз - жинақ шотына автоматты аударымдарды орнатыңыз."
        ]
    };
    
    return adviceList[currentLanguage][Math.floor(Math.random() * adviceList[currentLanguage].length)];
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
        const errorText = currentLanguage === 'ru' ? 'Пожалуйста, заполните все обязательные поля' :
                        currentLanguage === 'en' ? 'Please fill in all required fields' :
                        'Барлық міндетті өрістерді толтырыңыз';
        showNotification(errorText, 'error');
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
    
    const successText = currentLanguage === 'ru' ? 'Профиль успешно сохранен!' :
                      currentLanguage === 'en' ? 'Profile successfully saved!' :
                      'Профиль сәтті сақталды!';
    
    showNotification(successText, 'success');
}

function changePassword() {
    const promptText = currentLanguage === 'ru' ? 'Введите новый пароль (минимум 6 символов):' :
                     currentLanguage === 'en' ? 'Enter new password (minimum 6 characters):' :
                     'Жаңа құпия сөзді енгізіңіз (кемінде 6 таңба):';
    
    const newPassword = prompt(promptText);
    if (newPassword) {
        if (newPassword.length < 6) {
            const errorText = currentLanguage === 'ru' ? 'Пароль должен содержать минимум 6 символов' :
                            currentLanguage === 'en' ? 'Password must be at least 6 characters long' :
                            'Құпия сөз кемінде 6 таңбадан тұруы керек';
            showNotification(errorText, 'error');
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
        
        const successText = currentLanguage === 'ru' ? 'Пароль успешно изменен!' :
                          currentLanguage === 'en' ? 'Password successfully changed!' :
                          'Құпия сөз сәтті өзгертілді!';
        
        showNotification(successText, 'success');
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
        'ru': currentLanguage === 'ru' ? 'русский' : currentLanguage === 'en' ? 'Russian' : 'орысша',
        'en': currentLanguage === 'ru' ? 'английский' : currentLanguage === 'en' ? 'English' : 'ағылшынша',
        'kz': currentLanguage === 'ru' ? 'казахский' : currentLanguage === 'en' ? 'Kazakh' : 'қазақша'
    };
    
    const successText = currentLanguage === 'ru' ? `Язык изменен на ${langNames[lang]}` :
                      currentLanguage === 'en' ? `Language changed to ${langNames[lang]}` :
                      `Тіл ${langNames[lang]} тіліне өзгертілді`;
    
    showNotification(successText, 'success');
}

function applyTranslations(lang) {
    const translation = translations[lang];
    if (!translation) return;
    
    // Обновляем все элементы с data-translate атрибутом
    Object.keys(translation).forEach(key => {
        const elements = document.querySelectorAll(`[data-translate="${key}"]`);
        elements.forEach(element => {
            if (element.tagName === 'INPUT' && element.placeholder !== undefined) {
                element.placeholder = translation[key];
            } else {
                element.textContent = translation[key];
            }
        });
        
        // Также обновляем элементы с data-translate-placeholder
        const placeholderElements = document.querySelectorAll(`[data-translate-placeholder="${key}"]`);
        placeholderElements.forEach(element => {
            if (element.placeholder !== undefined) {
                element.placeholder = translation[key];
            }
        });
    });
    
    // Обновляем заголовок страницы
    document.title = translation.appTitle || 'FinanceMind';
    
    // Обновляем навигацию
    updateNavigationText(lang);
    
    // Обновляем текущий язык в настройках
    const currentLanguageElement = document.getElementById('currentLanguage');
    if (currentLanguageElement) {
        currentLanguageElement.textContent = lang === 'ru' ? 'Русский' : 
                                           lang === 'en' ? 'English' : 'Қазақша';
    }
    
    // Обновляем интерфейс
    updateUserInterface();
    updateExpenseStats();
    renderGoals();
    updateMissions();
    updateFincoinsBalance();
}

function updateNavigationText(lang) {
    const navItems = document.querySelectorAll('.nav-item');
    const translation = translations[lang];
    
    navItems.forEach(item => {
        const span = item.querySelector('span');
        if (span) {
            const page = item.getAttribute('onclick');
            if (page) {
                if (page.includes('dashboard')) span.textContent = translation.homeNav;
                else if (page.includes('analytics')) span.textContent = translation.analyticsNav;
                else if (page.includes('missions')) span.textContent = translation.missionsNav;
                else if (page.includes('chat')) span.textContent = translation.chatNav;
            }
        }
    });
}

function initLanguage() {
    const savedLang = localStorage.getItem('language') || 'ru';
    currentLanguage = savedLang;
    
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
    
    const themeText = theme === 'light' ? 
        (currentLanguage === 'ru' ? 'светлую' : 
         currentLanguage === 'en' ? 'light' : 'ашық') :
        (currentLanguage === 'ru' ? 'тёмную' : 
         currentLanguage === 'en' ? 'dark' : 'қараңғы');
    
    const successText = currentLanguage === 'ru' ? `Тема изменена на ${themeText}` :
                      currentLanguage === 'en' ? `Theme changed to ${themeText}` :
                      `Тақырып ${themeText} тақырыбына өзгертілді`;
    
    showNotification(successText, 'success');
}

function logout() {
    const confirmText = currentLanguage === 'ru' ? 'Вы уверены, что хотите выйти?' :
                      currentLanguage === 'en' ? 'Are you sure you want to log out?' :
                      'Шығуға сенімдісіз бе?';
    
    if (confirm(confirmText)) {
        logoutAndReset();
    }
}

// ========== ФУНКЦИИ ДЛЯ ОТЧЕТОВ ==========

function generateUserMonthlyReport() {
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();
    
    const monthlyExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getMonth() === month && expenseDate.getFullYear() === year;
    });
    
    const totalMonthly = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    
    // Анализ по категориям
    const categories = {};
    monthlyExpenses.forEach(expense => {
        if (!categories[expense.category]) {
            categories[expense.category] = { amount: 0, count: 0 };
        }
        categories[expense.category].amount += expense.amount;
        categories[expense.category].count++;
    });
    
    // Самые крупные расходы
    const topExpenses = [...monthlyExpenses]
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 5);
    
    const report = {
        type: 'monthly',
        title: translations[currentLanguage].monthlyReport,
        period: `${now.toLocaleDateString(currentLanguage, { month: 'long', year: 'numeric' })}`,
        totalExpenses: totalMonthly,
        expenseCount: monthlyExpenses.length,
        averageExpense: monthlyExpenses.length > 0 ? Math.round(totalMonthly / monthlyExpenses.length) : 0,
        categories: categories,
        topExpenses: topExpenses,
        generatedAt: new Date().toLocaleString(currentLanguage),
        currency: '₸'
    };
    
    showReportModal(report);
}

function generateUserDetailedReport() {
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const averageExpense = expenses.length > 0 ? Math.round(totalExpenses / expenses.length) : 0;
    
    // Анализ по категориям
    const categories = {};
    expenses.forEach(expense => {
        if (!categories[expense.category]) {
            categories[expense.category] = { amount: 0, count: 0 };
        }
        categories[expense.category].amount += expense.amount;
        categories[expense.category].count++;
    });
    
    // Анализ по месяцам
    const monthlyData = {};
    expenses.forEach(expense => {
        const date = new Date(expense.date);
        const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
        if (!monthlyData[monthKey]) {
            monthlyData[monthKey] = { amount: 0, count: 0, month: date.toLocaleDateString(currentLanguage, { month: 'long', year: 'numeric' }) };
        }
        monthlyData[monthKey].amount += expense.amount;
        monthlyData[monthKey].count++;
    });
    
    const report = {
        type: 'detailed',
        title: translations[currentLanguage].detailedReport,
        period: `${new Date(expenses[0]?.date || new Date()).toLocaleDateString()} - ${new Date().toLocaleDateString()}`,
        totalExpenses: totalExpenses,
        totalTransactions: expenses.length,
        averageExpense: averageExpense,
        categories: categories,
        monthlyData: monthlyData,
        goals: {
            total: goals.length,
            completed: goals.filter(g => g.completed).length,
            inProgress: goals.filter(g => !g.completed).length
        },
        missions: {
            completed: missions.filter(m => m.completed).length,
            total: appMissions.length
        },
        generatedAt: new Date().toLocaleString(currentLanguage),
        currency: '₸'
    };
    
    showReportModal(report);
}

function showReportModal(report) {
    currentReport = report;
    const modal = document.getElementById('reportModal');
    const title = document.getElementById('reportModalTitle');
    const content = document.getElementById('reportContent');
    
    if (!modal || !title || !content) return;
    
    title.textContent = report.title;
    content.innerHTML = generateReportHTML(report);
    
    modal.style.display = 'flex';
}

function generateReportHTML(report) {
    if (report.type === 'monthly') {
        return `
            <div class="report-section">
                <h4>${translations[currentLanguage].monthlyReport} - ${report.period}</h4>
                <div class="report-stats">
                    <div class="report-stat">
                        <span>${translations[currentLanguage].totalExpenses}:</span>
                        <strong>${formatAmount(report.totalExpenses)}</strong>
                    </div>
                    <div class="report-stat">
                        <span>${translations[currentLanguage].expenseCount}:</span>
                        <strong>${report.expenseCount}</strong>
                    </div>
                    <div class="report-stat">
                        <span>${translations[currentLanguage].averageExpense}:</span>
                        <strong>${formatAmount(report.averageExpense)}</strong>
                    </div>
                </div>
            </div>
            
            <div class="report-section">
                <h4>${translations[currentLanguage].categoryDistribution}</h4>
                ${Object.entries(report.categories).map(([category, data]) => `
                    <div class="category-stat">
                        <span>${category}:</span>
                        <div class="category-details">
                            <span>${formatAmount(data.amount)}</span>
                            <small>(${data.count} ${currentLanguage === 'ru' ? 'транзакций' : currentLanguage === 'en' ? 'transactions' : 'транзакция'})</small>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            ${report.topExpenses.length > 0 ? `
            <div class="report-section">
                <h4>${currentLanguage === 'ru' ? 'Самые крупные расходы' : currentLanguage === 'en' ? 'Top Expenses' : 'Ең үлкен шығындар'}</h4>
                ${report.topExpenses.map(expense => `
                    <div class="expense-item">
                        <div class="expense-category">${expense.category}</div>
                        <div class="expense-amount">${formatAmount(expense.amount)}</div>
                        <div class="expense-date">${formatDate(expense.date)}</div>
                        ${expense.description ? `<div class="expense-description">${expense.description}</div>` : ''}
                    </div>
                `).join('')}
            </div>
            ` : ''}
            
            <div class="report-footer">
                <small>${currentLanguage === 'ru' ? 'Сгенерировано' : currentLanguage === 'en' ? 'Generated' : 'Жасалған'}: ${report.generatedAt}</small>
            </div>
        `;
    } else {
        return `
            <div class="report-section">
                <h4>${translations[currentLanguage].detailedReport}</h4>
                <div class="report-stats-grid">
                    <div class="report-stat-card">
                        <div class="stat-value">${formatAmount(report.totalExpenses)}</div>
                        <div class="stat-label">${translations[currentLanguage].totalExpenses}</div>
                    </div>
                    <div class="report-stat-card">
                        <div class="stat-value">${report.totalTransactions}</div>
                        <div class="stat-label">${currentLanguage === 'ru' ? 'Транзакций' : currentLanguage === 'en' ? 'Transactions' : 'Транзакциялар'}</div>
                    </div>
                    <div class="report-stat-card">
                        <div class="stat-value">${formatAmount(report.averageExpense)}</div>
                        <div class="stat-label">${translations[currentLanguage].averageExpense}</div>
                    </div>
                </div>
            </div>
            
            <div class="report-section">
                <h4>${translations[currentLanguage].categoryDistribution}</h4>
                ${Object.entries(report.categories).map(([category, data]) => `
                    <div class="category-stat">
                        <span>${category}:</span>
                        <div class="category-details">
                            <span>${formatAmount(data.amount)}</span>
                            <small>(${Math.round((data.amount / report.totalExpenses) * 100)}%)</small>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="report-section">
                <h4>${currentLanguage === 'ru' ? 'Финансовые цели' : currentLanguage === 'en' ? 'Financial Goals' : 'Қаржылық мақсаттар'}</h4>
                <div class="goals-summary">
                    <div class="goal-stat">
                        <span>${currentLanguage === 'ru' ? 'Всего целей' : currentLanguage === 'en' ? 'Total Goals' : 'Барлық мақсаттар'}:</span>
                        <strong>${report.goals.total}</strong>
                    </div>
                    <div class="goal-stat">
                        <span>${currentLanguage === 'ru' ? 'Выполнено' : currentLanguage === 'en' ? 'Completed' : 'Орындалды'}:</span>
                        <strong>${report.goals.completed}</strong>
                    </div>
                    <div class="goal-stat">
                        <span>${currentLanguage === 'ru' ? 'В процессе' : currentLanguage === 'en' ? 'In Progress' : 'Жүргізуде'}:</span>
                        <strong>${report.goals.inProgress}</strong>
                    </div>
                </div>
            </div>
            
            <div class="report-section">
                <h4>${translations[currentLanguage].missionsNav}</h4>
                <div class="missions-summary">
                    <div class="mission-stat">
                        <span>${currentLanguage === 'ru' ? 'Выполнено миссий' : currentLanguage === 'en' ? 'Completed Missions' : 'Орындалған миссиялар'}:</span>
                        <strong>${report.missions.completed} / ${report.missions.total}</strong>
                    </div>
                </div>
            </div>
            
            <div class="report-footer">
                <small>${currentLanguage === 'ru' ? 'Сгенерировано' : currentLanguage === 'en' ? 'Generated' : 'Жасалған'}: ${report.generatedAt}</small>
            </div>
        `;
    }
}

function closeReportModal() {
    document.getElementById('reportModal').style.display = 'none';
    currentReport = null;
}

function shareReport() {
    if (!currentReport) return;
    
    const reportText = generateShareableText(currentReport);
    
    if (navigator.share) {
        navigator.share({
            title: currentReport.title,
            text: reportText,
            url: window.location.href
        }).catch(() => {
            // Fallback to clipboard
            copyToClipboard(reportText);
        });
    } else {
        copyToClipboard(reportText);
    }
}

function downloadReport() {
    if (!currentReport) return;
    
    const reportData = JSON.stringify(currentReport, null, 2);
    const blob = new Blob([reportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    
    const filename = `financemind-${currentReport.type}-report-${new Date().toISOString().split('T')[0]}.json`;
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification(translations[currentLanguage].reportGenerated, 'success');
}

function generateShareableText(report) {
    let text = `${report.title}\n`;
    text += `Период: ${report.period}\n`;
    text += `Общие расходы: ${formatAmount(report.totalExpenses)}\n`;
    text += `Количество транзакций: ${report.expenseCount || report.totalTransactions}\n`;
    
    if (report.categories) {
        text += '\nРасходы по категориям:\n';
        Object.entries(report.categories).forEach(([category, data]) => {
            text += `- ${category}: ${formatAmount(data.amount)}\n`;
        });
    }
    
    text += `\nСгенерировано: ${report.generatedAt}`;
    return text;
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification(
            currentLanguage === 'ru' ? 'Отчет скопирован в буфер обмена' :
            currentLanguage === 'en' ? 'Report copied to clipboard' :
            'Есеп алмасу буферіне көшірілді', 
            'success'
        );
    }).catch(() => {
        showNotification(
            currentLanguage === 'ru' ? 'Не удалось скопировать отчет' :
            currentLanguage === 'en' ? 'Failed to copy report' :
            'Есепті көшіру сәтсіз аяқталды', 
            'error'
        );
    });
}

// ========== АДМИН ПАНЕЛЬ ==========

function showAdminPanel() {
    if (currentUser && currentUser.role === 'admin') {
        showPage('adminPanel');
    } else {
        showNotification(translations[currentLanguage].adminPanel + ' - ' + 
                        (currentLanguage === 'ru' ? 'Доступ запрещен' : 
                         currentLanguage === 'en' ? 'Access denied' : 'Қол жетімсіз'), 'error');
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
        const completionRate = calculateMissionCompletionRate(mission.id);
        
        const completionText = currentLanguage === 'ru' ? 'Выполнение:' :
                             currentLanguage === 'en' ? 'Completion:' :
                             'Орындалу:';
        
        return `
            <div class="admin-mission-item">
                <div class="admin-mission-header">
                    <div class="admin-mission-title">${mission.title}</div>
                    <div class="admin-mission-reward">${mission.reward} FinCoins</div>
                </div>
                <div class="admin-mission-progress">
                    <div class="admin-progress-bar">
                        <div class="admin-progress-fill" style="width: ${completionRate}%"></div>
                    </div>
                    <div class="admin-progress-text">${completionText} ${completionRate}%</div>
                </div>
                <div class="mission-description">${mission.description}</div>
                <div class="mission-requirements">
                    <strong>${currentLanguage === 'ru' ? 'Требования:' : 
                             currentLanguage === 'en' ? 'Requirements:' : 
                             'Талаптар:'}</strong> ${mission.requirements.join(', ')}
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
        
        const completedMissionsText = currentLanguage === 'ru' ? 'Выполнено миссий' :
                                   currentLanguage === 'en' ? 'Completed missions' :
                                   'Орындалған миссиялар';
        
        const goalsText = currentLanguage === 'ru' ? 'Целей' :
                        currentLanguage === 'en' ? 'Goals' :
                        'Мақсаттар';
        
        const expensesText = currentLanguage === 'ru' ? 'Расходов' :
                           currentLanguage === 'en' ? 'Expenses' :
                           'Шығындар';
        
        const totalExpensesText = currentLanguage === 'ru' ? 'Общие расходы' :
                                currentLanguage === 'en' ? 'Total expenses' :
                                'Жалпы шығындар';
        
        const registrationDateText = currentLanguage === 'ru' ? 'Дата регистрации' :
                                  currentLanguage === 'en' ? 'Registration date' :
                                  'Тіркелу күні';
        
        return `
            <div class="admin-user-item">
                <div class="admin-user-header">
                    <div class="admin-user-name">${user.name}</div>
                    <div class="admin-user-email">${user.email}</div>
                </div>
                <div class="admin-user-stats">
                    <div class="admin-user-stat">
                        <div class="admin-user-stat-value">${completedMissions}</div>
                        <div class="admin-user-stat-label">${completedMissionsText}</div>
                    </div>
                    <div class="admin-user-stat">
                        <div class="admin-user-stat-value">${userData.fincoins || 0}</div>
                        <div class="admin-user-stat-label">FinCoins</div>
                    </div>
                    <div class="admin-user-stat">
                        <div class="admin-user-stat-value">${goalsCount}</div>
                        <div class="admin-user-stat-label">${goalsText}</div>
                    </div>
                </div>
                <div class="admin-user-stats">
                    <div class="admin-user-stat">
                        <div class="admin-user-stat-value">${userData.expenses ? userData.expenses.length : 0}</div>
                        <div class="admin-user-stat-label">${expensesText}</div>
                    </div>
                    <div class="admin-user-stat">
                        <div class="admin-user-stat-value">${formatAmount(totalExpenses)}</div>
                        <div class="admin-user-stat-label">${totalExpensesText}</div>
                    </div>
                    <div class="admin-user-stat">
                        <div class="admin-user-stat-value">${new Date(user.createdAt).toLocaleDateString()}</div>
                        <div class="admin-user-stat-label">${registrationDateText}</div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function generateMonthlyReport() {
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();
    
    const monthlyExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getMonth() === month && expenseDate.getFullYear() === year;
    });
    
    const totalMonthly = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    
    const report = {
        title: currentLanguage === 'ru' ? 'Отчет за месяц' : 
               currentLanguage === 'en' ? 'Monthly Report' : 'Айлық есеп',
        period: `${month + 1}/${year}`,
        totalExpenses: totalMonthly,
        expenseCount: monthlyExpenses.length,
        categories: {},
        generatedAt: new Date().toISOString()
    };
    
    monthlyExpenses.forEach(expense => {
        if (!report.categories[expense.category]) {
            report.categories[expense.category] = 0;
        }
        report.categories[expense.category] += expense.amount;
    });
    
    downloadAdminReport(report, 'monthly-report');
    
    const successText = currentLanguage === 'ru' ? 'Месячный отчет сгенерирован и скачан!' :
                      currentLanguage === 'en' ? 'Monthly report generated and downloaded!' :
                      'Айлық есеп жасалып, жүктелді!';
    
    showNotification(successText, 'success');
}

function generateDetailedReport() {
    const report = {
        title: currentLanguage === 'ru' ? 'Обширный финансовый отчет' : 
               currentLanguage === 'en' ? 'Detailed Financial Report' : 'Толық қаржылық есеп',
        user: currentUser ? currentUser.name : 'Unknown',
        generatedAt: new Date().toISOString(),
        summary: {
            totalExpenses: expenses.reduce((sum, expense) => sum + expense.amount, 0),
            totalGoals: goals.length,
            completedGoals: goals.filter(goal => goal.completed).length,
            fincoins: fincoins,
            completedMissions: missions.filter(m => m.completed).length
        },
        expenses: expenses,
        goals: goals,
        missions: missions
    };
    
    downloadAdminReport(report, 'detailed-report');
    
    const successText = currentLanguage === 'ru' ? 'Обширный отчет сгенерирован и скачан!' :
                      currentLanguage === 'en' ? 'Detailed report generated and downloaded!' :
                      'Толық есеп жасалып, жүктелді!';
    
    showNotification(successText, 'success');
}

function downloadAdminReport(report, filename) {
    const dataStr = JSON.stringify(report, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
    
    const successText = currentLanguage === 'ru' ? 'Все данные администратора успешно экспортированы!' :
                      currentLanguage === 'en' ? 'All admin data successfully exported!' :
                      'Барлық әкімші деректері сәтті экспортталды!';
    
    showNotification(successText, 'success');
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

// ========== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ==========

function forceSync() {
    saveUserData();
    
    const syncText = currentLanguage === 'ru' ? 'Данные синхронизированы' :
                   currentLanguage === 'en' ? 'Data synchronized' :
                   'Деректер синхрондалды';
    
    showNotification(syncText, 'success');
}

// ========== ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ ==========

document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const savedUser = localStorage.getItem('currentUser');
    
    if (isLoggedIn === 'true' && savedUser) {
        currentUser = JSON.parse(savedUser);
        loadUserData();
        showAppInterface();
        setTimeout(() => showPage('dashboard'), 100);
    } else {
        const authPage = document.getElementById('authPage');
        if (authPage) authPage.style.display = 'block';
        showLoginForm();
    }
    
    // Инициализация категорий
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
            selectedCategory = this.getAttribute('data-category');
        });
    });
    
    // Установка сегодняшней даты по умолчанию
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('expenseDate');
    if (dateInput) dateInput.value = today;
    
    // Обработчик Enter в чате
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') sendMessage();
        });
    }
    
    initLanguage();
    console.log('FinanceMind инициализирован');
});


