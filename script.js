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
        condition: (userData) => {
            return true;
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
        title: "Меньше развлечений",
        description: "Потратьте на 10% меньше на развлечения в этом месяце",
        reward: 75,
        difficulty: "easy",
        condition: (userData) => {
            return true;
        },
        progress: (userData) => {
            return userData.goals.length >= 1 ? 100 : 50;
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
        condition: (userData) => {
            return true;
        },
        progress: (userData) => {
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            const foodExpenses = userData.expenses.filter(e => 
                e.category === "Еда" && new Date(e.date) >= weekAgo
            );
            const total = foodExpenses.reduce((sum, e) => sum + e.amount, 0);
            const progress = Math.max(0, Math.min(100, 100 - (total / 5000) * 100));
            return progress;
        },
        requirements: [
            "Потратьте менее ₸5000 на еду за последнюю неделю",
            "Сократите расходы на питание вне дома"
        ]
    },
    {
        id: 4,
        title: "Аналитик недели",
        description: "Проверьте аналитику расходов 3 дня подряд",
        reward: 150,
        difficulty: "hard",
        condition: (userData) => {
            return true;
        },
        progress: (userData) => {
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            const entertainmentExpenses = userData.expenses.filter(e => 
                e.category === "Развлечения" && new Date(e.date) >= weekAgo
            );
            return entertainmentExpenses.length === 0 ? 100 : 30;
        },
        requirements: [
            "Не тратьте деньги на развлечения в течение недели",
            "Найдите бесплатные альтернативы развлечениям"
        ]
    },
    {
        id: 5,
        title: "Целеустремленный",
        description: "Создайте и выполните свою первую финансовую цель",
        reward: 200,
        difficulty: "hard",
        condition: (userData) => {
            return true;
        },
        progress: (userData) => {
            const completedGoals = userData.goals.filter(goal => goal.currentAmount >= goal.targetAmount);
            return completedGoals.length > 0 ? 100 : 20;
        },
        requirements: [
            "Выполните хотя бы одну финансовую цель",
            "Достигните целевой суммы накоплений"
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
    
    const pages = ['analytics', 'missions', 'store', 'settings', 'chat'];
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
        createdAt: new Date().toISOString(),
        profile: {
            lastName: '',
            role: 'Пользователь'
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
    
    // Инициализация языка при показе интерфейса
    initLanguage();
    showPage('dashboard');
}

// ========== ФУНКЦИИ ДЛЯ ПЕРЕКЛЮЧЕНИЯ СТРАНИЦ ==========

function showPage(page) {
    console.log('Переключение на страницу:', page);
    
    const mainPages = ['dashboard', 'analytics', 'missions', 'store', 'settings', 'chat'];
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
        'chat': 'AI Помощник'
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
    addReportButtons();
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
                language: 'ru',
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
    
    missionsList.innerHTML = appMissions.map(mission => {
        const userData = {
            expenses: expenses,
            goals: goals,
            fincoins: fincoins
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
                    <i class="fas fa-${getMissionIcon(mission.id)}"></i>
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
                        style="${isCompleted ? '' : 'opacity: 0.6; cursor: not-allowed;'}">
                    ${isCompleted ? 'Получить награду' : 'В процессе'}
                </button>
            </div>
        `;
    }).join('');
}

function getMissionIcon(missionId) {
    const icons = {
        1: 'utensils',
        2: 'gamepad',
        3: 'piggy-bank',
        4: 'chart-line',
        5: 'bullseye'
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
        fincoins: fincoins
    };
    
    if (mission.condition(userData)) {
        addFincoins(mission.reward);
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
    
    if (lowerMessage.includes('привет') || lowerMessage.includes('здравствуй')) {
        return "Привет! Я ваш AI-помощник по финансам. Чем могу помочь?";
    }
    
    if (lowerMessage.includes('расход') || lowerMessage.includes('трат')) {
        return "Чтобы добавить расход, перейдите в раздел 'Аналитика' и заполните форму внизу страницы. Не забудьте выбрать категорию расхода!";
    }
    
    if (lowerMessage.includes('цел') || lowerMessage.includes('накоп')) {
        return "Финансовые цели помогают планировать будущее. Вы можете добавить цель на главной странице, нажав кнопку 'Добавить' в разделе 'Мои цели'.";
    }
    
    if (lowerMessage.includes('совет') || lowerMessage.includes('рекомендац')) {
        return getFinancialAdvice();
    }
    
    if (lowerMessage.includes('бюджет') || lowerMessage.includes('планирован')) {
        return "Для эффективного планирования бюджета рекомендую:\n1. Отслеживайте все расходы\n2. Установите лимиты по категориям\n3. Регулярно анализируйте статистику\n4. Корректируйте план по необходимости";
    }
    
    if (lowerMessage.includes('экономи') || lowerMessage.includes('сэконом')) {
        return "Способы экономии:\n• Планируйте покупки заранее\n• Используйте кэшбэк и скидки\n• Готовьте дома вместо кафе\n• Отказывайтесь от импульсных покупок\n• Сравнивайте цены перед покупкой";
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
        "Установите финансовые цели на разные сроки: краткосрочные (1-3 месяца), среднесрочные (1-2 года) и долгосрочные (5+ лет)."
    ];
    
    if (foodExpenses > totalExpenses * 0.4) {
        adviceList.push("Заметил, что вы много тратите на еду. Попробуйте готовить дома чаще и планировать меню на неделю - это может значительно сократить расходы.");
    }
    
    if (goals.length === 0) {
        adviceList.push("Рекомендую установить первую финансовую цель. Даже небольшая цель мотивирует на регулярные накопления!");
    }
    
    return adviceList[Math.floor(Math.random() * adviceList.length)];
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
    
    // Находим и активируем правильную кнопку
    document.querySelectorAll('.language-btn').forEach(btn => {
        if ((lang === 'ru' && btn.textContent.includes('Русский')) || 
            (lang === 'en' && btn.textContent.includes('English'))) {
            btn.classList.add('active');
        }
    });
    
    // Сохраняем язык
    localStorage.setItem('language', lang);
    
    // Применяем переводы
    applyTranslations(lang);
    
    showNotification(`Язык изменен на ${lang === 'ru' ? 'русский' : 'английский'}`, 'success');
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
    document.title = lang === 'ru' ? 'FinanceMind — Умный финансовый помощник' : 'FinanceMind — Smart Finance Assistant';
    
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
    changeLanguage(savedLang);
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

// ========== ЭТАП 2: РАСШИРЕННЫЕ ВОЗМОЖНОСТИ ==========

function addCustomCategory() {
    const categoryName = prompt('Введите название новой категории:');
    if (categoryName && categoryName.trim()) {
        if (currentUser) {
            if (!currentUser.customCategories) {
                currentUser.customCategories = [];
            }
            
            if (!currentUser.customCategories.includes(categoryName.trim())) {
                currentUser.customCategories.push(categoryName.trim());
                
                const users = JSON.parse(localStorage.getItem('financemind_users') || '[]');
                const userIndex = users.findIndex(u => u.id === currentUser.id);
                if (userIndex !== -1) {
                    users[userIndex] = currentUser;
                    localStorage.setItem('financemind_users', JSON.stringify(users));
                }
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                
                showNotification(`Категория "${categoryName}" успешно добавлена!`, 'success');
                updateCategoryButtons();
            } else {
                showNotification('Такая категория уже существует!', 'error');
            }
        }
    }
}

function updateCategoryButtons() {
    const categoryOptions = document.querySelector('.category-options');
    if (!categoryOptions) return;
    
    const baseCategories = ['Еда', 'Транспорт', 'Учеба', 'Развлечения', 'Другое'];
    const customCategories = currentUser?.customCategories || [];
    
    categoryOptions.innerHTML = '';
    
    // Базовые категории с правильными классами
    baseCategories.forEach(category => {
        const button = document.createElement('div');
        button.className = 'category-btn';
        button.setAttribute('data-category', category);
        button.innerHTML = `
            <i class="fas fa-${getCategoryIcon(category)} category-icon category-${getCategoryClass(category)}"></i>
            <span>${category}</span>
        `;
        button.addEventListener('click', function() {
            selectCategory(this, category);
        });
        categoryOptions.appendChild(button);
    });
    
    // Пользовательские категории
    customCategories.forEach(category => {
        const button = document.createElement('div');
        button.className = 'category-btn';
        button.setAttribute('data-category', category);
        button.innerHTML = `
            <i class="fas fa-tag category-icon"></i>
            <span>${category}</span>
        `;
        button.addEventListener('click', function() {
            selectCategory(this, category);
        });
        categoryOptions.appendChild(button);
    });
    
    // Кнопка добавления новой категории
    const addButton = document.createElement('div');
    addButton.className = 'category-btn add-category';
    addButton.innerHTML = `
        <i class="fas fa-plus"></i>
        <span>Добавить категорию</span>
    `;
    addButton.addEventListener('click', addCustomCategory);
    categoryOptions.appendChild(addButton);
}

// Добавьте эту новую функцию после updateCategoryButtons
function getCategoryClass(category) {
    const classes = {
        'Еда': 'food',
        'Транспорт': 'transport',
        'Учеба': 'study',
        'Развлечения': 'entertainment',
        'Другое': 'other'
    };
    return classes[category] || 'other';
}

function selectCategory(button, category) {
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    button.classList.add('selected');
    selectedCategory = category;
}

function getCategoryIcon(category) {
    const icons = {
        'Еда': 'utensils',
        'Транспорт': 'bus',
        'Учеба': 'graduation-cap',
        'Развлечения': 'gamepad',
        'Другое': 'ellipsis-h'
    };
    return icons[category] || 'tag';
}

// ========== ЭТАП 3: РАСШИРЕННАЯ АНАЛИТИКА И ОТЧЕТЫ ==========

function generateMonthlyReport() {
    if (!expenses || expenses.length === 0) {
        showNotification('Нет данных для генерации отчета', 'error');
        return;
    }
    
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    const monthlyExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getMonth() === currentMonth && 
               expenseDate.getFullYear() === currentYear;
    });
    
    if (monthlyExpenses.length === 0) {
        showNotification('Нет расходов за текущий месяц', 'error');
        return;
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
    report += `Общие расходы: ${formatAmount(totalExpenses)}\n`;
    report += `Среднедневные расходы: ${formatAmount(averageDaily)}\n`;
    report += `Количество транзакций: ${monthlyExpenses.length}\n\n`;
    report += `РАСПРЕДЕЛЕНИЕ ПО КАТЕГОРИЯМ:\n`;
    
    const sortedCategories = Object.entries(expensesByCategory)
        .sort((a, b) => b[1] - a[1]);
    
    sortedCategories.forEach(([category, amount]) => {
        const percentage = ((amount / totalExpenses) * 100).toFixed(1);
        report += `• ${category}: ${formatAmount(amount)} (${percentage}%)\n`;
    });
    
    report += `\nАНАЛИЗ ТРЕНДОВ:\n`;
    
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
        report += `По сравнению с прошлым месяцем: ${trend} на ${Math.abs(change)}%\n`;
    }
    
    report += `\nРЕКОМЕНДАЦИИ:\n`;
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
    
    showReportModal(report);
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
        <div class="modal-content" style="max-width: 500px; width: 90%;">
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
                max-height: 400px;
                overflow-y: auto;
                margin: 0 0 20px 0;
            ">${report}</pre>
            <div style="display: flex; gap: 10px;">
                <button onclick="downloadReport('${btoa(unescape(encodeURIComponent(report)))}')" 
                        class="btn btn-primary" style="flex: 1;">
                    <i class="fas fa-download"></i> Скачать отчет
                </button>
                <button onclick="this.closest('.modal-overlay').remove()" 
                        class="btn btn-outline" style="flex: 1;">
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
        a.download = `financial-report-${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showNotification('Отчет успешно скачан!', 'success');
    } catch (error) {
        showNotification('Ошибка при скачивании отчета', 'error');
    }
}

function exportData() {
    if (!currentUser) return;
    
    const userData = {
        user: {
            name: currentUser.name,
            email: currentUser.email
        },
        expenses: expenses,
        goals: goals,
        exportDate: new Date().toISOString(),
        totalExpenses: expenses.reduce((sum, e) => sum + e.amount, 0),
        totalGoals: goals.length,
        completedGoals: goals.filter(g => g.completed).length
    };
    
    const dataStr = JSON.stringify(userData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `financemind-backup-${new Date().toISOString().split('T')[0]}.json`;
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

function addReportButtons() {
    const analyticsPage = document.getElementById('analytics');
    if (analyticsPage && !document.getElementById('reportButtons')) {
        const addExpenseForm = analyticsPage.querySelector('.add-expense-form');
        if (addExpenseForm) {
            const reportSection = document.createElement('div');
            reportSection.id = 'reportButtons';
            reportSection.style.cssText = 'margin-top: 30px;';
            reportSection.innerHTML = `
                <div class="section-header">
                    <h3 class="section-title">Отчеты и данные</h3>
                </div>
                <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 20px;">
                    <button onclick="generateMonthlyReport()" class="btn btn-primary">
                        <i class="fas fa-chart-bar"></i> Месячный отчет
                    </button>
                    <button onclick="exportData()" class="btn btn-outline">
                        <i class="fas fa-download"></i> Экспорт данных
                    </button>
                    <label class="btn btn-outline" style="cursor: pointer;">
                        <i class="fas fa-upload"></i> Импорт данных
                        <input type="file" accept=".json" onchange="importData(event)" 
                               style="display: none;">
                    </label>
                </div>
            `;
            analyticsPage.insertBefore(reportSection, addExpenseForm);
        }
    }
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
    
    analyticsReport += `\nСАМЫЕ КРУПНЫЕ РАСХОДЫ:\n`;
    topExpenses.forEach((expense, index) => {
        analyticsReport += `${index + 1}. ${expense.category}: ${formatAmount(expense.amount)} (${formatDate(expense.date)})\n`;
    });
    
    analyticsReport += `\nРЕКОМЕНДАЦИИ ПО ВРЕМЕНИ ПОКУПОК:\n`;
    analyticsReport += `• Старайтесь делать крупные покупки в начале недели\n`;
    analyticsReport += `• Планируйте продуктовые закупки на выходные\n`;
    analyticsReport += `• Избегайте импульсных покупок вечером\n`;
    
    showReportModal(analyticsReport);
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
    
    console.log('FinanceMind инициализирован');
});