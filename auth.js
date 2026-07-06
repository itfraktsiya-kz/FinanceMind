// ============================================================================
// AUTH.JS - СИСТЕМА АВТОРИЗАЦИИ (Firebase + Google OAuth)
// ============================================================================

// Импорт Firebase модулей
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";

// Конфигурация Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDxNCX_OthzuixG6VEvgYKGHwXrA-YQJ2g",
    authDomain: "finance-c3a78.firebaseapp.com",
    projectId: "finance-c3a78",
    storageBucket: "finance-c3a78.firebasestorage.app",
    messagingSenderId: "1000822033338",
    appId: "1:1000822033338:web:0372906c6d305219b5ab83",
    measurementId: "G-BL9DGPERYX"
};

// Backend API URL (НЕ ИСПОЛЬЗУЕТСЯ)
// const API_URL = 'http://localhost:3000/api';

// Инициализация Firebase
let app;
let auth;
let provider;
let firebaseInitialized = false;

try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    provider = new GoogleAuthProvider();
    firebaseInitialized = true;
    console.log("✅ Firebase инициализирован успешно");
} catch (error) {
    console.warn("⚠️ Ошибка инициализации Firebase:", error.message);
    console.log("📱 Используется локальный режим авторизации");
    firebaseInitialized = false;
}

// ============================================================================
// JWT TOKEN MANAGEMENT (ОТКЛЮЧЕНО)
// ============================================================================

function getJWTToken() {
    return null; // Отключено
}

function setJWTToken(token) {
    // Отключено
}

// ============================================================================
// СИНХРОНИЗАЦИЯ С БЭКЕНДОМ - ОТКЛЮЧЕНА
// ============================================================================

async function syncUserWithBackend(user) {
    // ⚠️ СИНХРОНИЗАЦИЯ ОТКЛЮЧЕНА - сайт работает только локально ⚠️
    console.log('⚠️ Синхронизация с бэкендом отключена, работаем в локальном режиме');
    return { success: false, localMode: true };
    
    /* КОД ЗАКОММЕНТИРОВАН
    try {
        console.log('🔄 Синхронизация пользователя с backend...', user.email);
        
        const settings = user.settings || {
            language: 'ru',
            theme: 'dark',
            currency: 'KZT'
        };
        
        const payload = {
            userId: user.uid,
            email: user.email,
            name: user.name || user.displayName || user.email.split('@')[0],
            avatar: user.photoURL || user.avatar || null,
            authProvider: user.authProvider || (user.password ? 'local' : 'google'),
            settings: settings
        };
        
        console.log('📤 Отправка данных на бэкенд:', payload);
        
        const response = await fetch(`${API_URL}/auth/sync`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ Ошибка бэкенда:', response.status, errorText);
            throw new Error(`HTTP ${response.status}: ${errorText}`);
        }
        
        const data = await response.json();
        console.log('✅ Ответ бэкенда получен');
        
        if (data.token) {
            setJWTToken(data.token);
            console.log('✅ JWT токен получен и сохранен');
        }
        
        if (data.user) {
            const mergedUser = {
                ...user,
                ...data.user,
                syncedWithBackend: true,
                lastSync: new Date().toISOString(),
            };
            localStorage.setItem(`finapp_user_${user.uid}`, JSON.stringify(mergedUser));
        }
        
        return data;
        
    } catch (error) {
        console.warn('⚠️ Backend синхронизация не удалась, работаем в локальном режиме:', error.message);
        return { success: false, localMode: true };
    }
    */
}

// ============================================================================
// ЛОКАЛЬНОЕ ХРАНИЛИЩЕ ДЛЯ FALLBACK
// ============================================================================

class LocalAuthManager {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('finapp_local_users') || '[]');
    }
    
    saveUsers() {
        localStorage.setItem('finapp_local_users', JSON.stringify(this.users));
    }
    
    findUserByEmail(email) {
        return this.users.find(u => u.email === email);
    }
    
    findUserById(id) {
        return this.users.find(u => u.uid === id);
    }
    
    async register(email, password, name) {
        if (!email || !password || !name) {
            return { success: false, error: 'Заполните все поля' };
        }
        if (password.length < 6) {
            return { success: false, error: 'Пароль должен быть не менее 6 символов' };
        }
        if (this.findUserByEmail(email)) {
            return { success: false, error: 'Пользователь с таким email уже существует' };
        }
        
        const userData = {
            uid: `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            email: email,
            name: name,
            authProvider: 'local',
            createdAt: new Date().toISOString(),
            settings: {
                language: 'ru',
                theme: 'dark',
                currency: '₸'
            },
            fincoin: 0,
            xp: 0,
            level: 1
        };
        
        this.users.push({ ...userData, password });
        this.saveUsers();
        
        localStorage.setItem(`finapp_user_${userData.uid}`, JSON.stringify(userData));
        localStorage.setItem('finapp_current_user_id', userData.uid);
        
        // Синхронизация отключена
        // await syncUserWithBackend(userData);
        
        return { success: true, user: userData };
    }
    
    async login(email, password) {
        const user = this.findUserByEmail(email);
        if (!user) {
            return { success: false, error: 'Пользователь не найден' };
        }
        if (user.password !== password) {
            return { success: false, error: 'Неверный пароль' };
        }
        
        const userData = {
            uid: user.uid,
            email: user.email,
            name: user.name,
            authProvider: 'local',
            createdAt: user.createdAt,
            settings: user.settings || { language: 'ru', theme: 'dark', currency: '₸' },
            fincoin: user.fincoin || 0,
            xp: user.xp || 0,
            level: user.level || 1
        };
        
        localStorage.setItem(`finapp_user_${user.uid}`, JSON.stringify(userData));
        localStorage.setItem('finapp_current_user_id', user.uid);
        
        // Синхронизация отключена
        // await syncUserWithBackend(userData);
        
        return { success: true, user: userData };
    }
    
    async loginWithGoogle() {
        const googleUser = {
            uid: `google_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
            email: `user_${Date.now()}@gmail.com`,
            name: `Google_User_${Math.floor(Math.random() * 1000)}`,
            authProvider: 'google',
            createdAt: new Date().toISOString(),
            settings: {
                language: 'ru',
                theme: 'dark',
                currency: '₸'
            },
            fincoin: 0,
            xp: 0,
            level: 1
        };
        
        localStorage.setItem(`finapp_user_${googleUser.uid}`, JSON.stringify(googleUser));
        localStorage.setItem('finapp_current_user_id', googleUser.uid);
        
        // Синхронизация отключена
        // await syncUserWithBackend(googleUser);
        
        return { success: true, user: googleUser };
    }
    
    async logout() {
        localStorage.removeItem('finapp_current_user_id');
        setJWTToken(null);
        return { success: true };
    }
    
    getUser() {
        const userId = localStorage.getItem('finapp_current_user_id');
        if (!userId) return null;
        const userData = localStorage.getItem(`finapp_user_${userId}`);
        if (!userData) return null;
        return JSON.parse(userData);
    }
}

// ============================================================================
// КЛАСС АУТЕНТИФИКАЦИИ
// ============================================================================

class AuthManager {
    constructor() {
        this.currentUser = null;
        this.isAuthenticated = false;
        this.auth = firebaseInitialized ? auth : null;
        this.useLocal = !firebaseInitialized;
        this.localAuth = new LocalAuthManager();
    }

    async register(email, password, name) {
        if (this.useLocal || !this.auth) {
            console.log("📱 Используем локальную регистрацию");
            const result = await this.localAuth.register(email, password, name);
            if (result.success) {
                this.currentUser = result.user;
                this.isAuthenticated = true;
            }
            return result;
        }
        
        try {
            if (!email || !password || !name) {
                throw new Error('Заполните все поля');
            }
            
            if (password.length < 6) {
                throw new Error('Пароль должен быть не менее 6 символов');
            }
            
            const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
            const user = userCredential.user;
            
            await updateProfile(user, { displayName: name });
            
            const userData = {
                uid: user.uid,
                email: user.email,
                name: name,
                authProvider: 'email',
                createdAt: new Date().toISOString(),
                settings: {
                    language: 'ru',
                    theme: 'dark',
                    currency: '₸'
                },
                fincoin: 0,
                xp: 0,
                level: 1
            };
            
            localStorage.setItem(`finapp_user_${user.uid}`, JSON.stringify(userData));
            localStorage.setItem('finapp_current_user_id', user.uid);
            
            // Синхронизация отключена
            // await syncUserWithBackend(userData);
            
            this.currentUser = userData;
            this.isAuthenticated = true;
            
            return { success: true, user: this.currentUser };
        } catch (error) {
            console.error('Registration error:', error);
            
            if (error.code === 'auth/network-request-failed' || error.code === 'auth/internal-error') {
                console.log("🔄 Сетевая ошибка, переключаемся на локальный режим");
                this.useLocal = true;
                return await this.localAuth.register(email, password, name);
            }
            
            let errorMessage = 'Ошибка регистрации';
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = 'Пользователь с таким email уже существует';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'Неверный формат email';
            } else if (error.code === 'auth/weak-password') {
                errorMessage = 'Слишком слабый пароль';
            }
            return { success: false, error: errorMessage };
        }
    }

    async login(email, password) {
        if (this.useLocal || !this.auth) {
            console.log("📱 Используем локальный вход");
            const result = await this.localAuth.login(email, password);
            if (result.success) {
                this.currentUser = result.user;
                this.isAuthenticated = true;
            }
            return result;
        }
        
        try {
            const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
            const firebaseUser = userCredential.user;
            
            const savedData = localStorage.getItem(`finapp_user_${firebaseUser.uid}`);
            let userData;
            
            if (savedData) {
                userData = JSON.parse(savedData);
            } else {
                userData = {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    name: firebaseUser.displayName || email.split('@')[0],
                    authProvider: 'email',
                    createdAt: new Date().toISOString(),
                    settings: {
                        language: 'ru',
                        theme: 'dark',
                        currency: '₸'
                    },
                    fincoin: 0,
                    xp: 0,
                    level: 1
                };
                localStorage.setItem(`finapp_user_${firebaseUser.uid}`, JSON.stringify(userData));
            }
            
            localStorage.setItem('finapp_current_user_id', firebaseUser.uid);
            
            // Синхронизация отключена
            // await syncUserWithBackend(userData);
            
            this.currentUser = userData;
            this.isAuthenticated = true;
            
            return { success: true, user: this.currentUser };
        } catch (error) {
            console.error('Login error:', error);
            
            if (error.code === 'auth/network-request-failed' || error.code === 'auth/internal-error') {
                console.log("🔄 Сетевая ошибка, переключаемся на локальный режим");
                this.useLocal = true;
                return await this.localAuth.login(email, password);
            }
            
            let errorMessage = 'Ошибка входа';
            if (error.code === 'auth/user-not-found') {
                errorMessage = 'Пользователь не найден';
            } else if (error.code === 'auth/wrong-password') {
                errorMessage = 'Неверный пароль';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'Неверный формат email';
            }
            return { success: false, error: errorMessage };
        }
    }

    async loginWithGoogle() {
        if (this.useLocal || !this.auth) {
            console.log("📱 Используем локальный Google вход");
            const result = await this.localAuth.loginWithGoogle();
            if (result.success) {
                this.currentUser = result.user;
                this.isAuthenticated = true;
            }
            return result;
        }
        
        try {
            const result = await signInWithPopup(this.auth, provider);
            const firebaseUser = result.user;
            
            const savedData = localStorage.getItem(`finapp_user_${firebaseUser.uid}`);
            let userData;
            
            if (savedData) {
                userData = JSON.parse(savedData);
            } else {
                userData = {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    name: firebaseUser.displayName || firebaseUser.email.split('@')[0],
                    photoURL: firebaseUser.photoURL,
                    authProvider: 'google',
                    createdAt: new Date().toISOString(),
                    settings: {
                        language: 'ru',
                        theme: 'dark',
                        currency: '₸'
                    },
                    fincoin: 0,
                    xp: 0,
                    level: 1
                };
                localStorage.setItem(`finapp_user_${firebaseUser.uid}`, JSON.stringify(userData));
            }
            
            localStorage.setItem('finapp_current_user_id', firebaseUser.uid);
            
            // Синхронизация отключена
            // await syncUserWithBackend(userData);
            
            this.currentUser = userData;
            this.isAuthenticated = true;
            
            return { success: true, user: this.currentUser };
        } catch (error) {
            console.error('Google login error:', error);
            
            console.log("🔄 Ошибка Google, переключаемся на локальный режим");
            const result = await this.localAuth.loginWithGoogle();
            if (result.success) {
                this.currentUser = result.user;
                this.isAuthenticated = true;
            }
            return result;
        }
    }

    async logout() {
        try {
            if (this.auth && !this.useLocal) {
                await signOut(this.auth);
            }
            localStorage.removeItem('finapp_current_user_id');
            setJWTToken(null);
            this.currentUser = null;
            this.isAuthenticated = false;
            return { success: true };
        } catch (error) {
            console.error('Logout error:', error);
            return { success: false, error: error.message };
        }
    }

    getUser() {
        if (this.currentUser) return this.currentUser;
        
        const userId = localStorage.getItem('finapp_current_user_id');
        if (!userId) return null;
        
        const userData = localStorage.getItem(`finapp_user_${userId}`);
        if (!userData) return null;
        
        this.currentUser = JSON.parse(userData);
        this.isAuthenticated = true;
        return this.currentUser;
    }

    async updateProfile(data) {
        if (!this.currentUser) {
            return { success: false, error: 'Не авторизован' };
        }
        
        try {
            if (this.auth && !this.useLocal && data.name && this.auth.currentUser) {
                await updateProfile(this.auth.currentUser, { displayName: data.name });
            }
            
            const updatedUser = { ...this.currentUser, ...data };
            localStorage.setItem(`finapp_user_${this.currentUser.uid}`, JSON.stringify(updatedUser));
            this.currentUser = updatedUser;
            
            // Синхронизация отключена
            // await syncUserWithBackend(updatedUser);
            
            return { success: true, user: this.currentUser };
        } catch (error) {
            console.error('Update profile error:', error);
            return { success: false, error: error.message };
        }
    }
    
    async updateFinCoin(amount) {
        if (!this.currentUser) return;
        
        const newAmount = (this.currentUser.fincoin || 0) + amount;
        this.currentUser.fincoin = Math.max(0, newAmount);
        localStorage.setItem(`finapp_user_${this.currentUser.uid}`, JSON.stringify(this.currentUser));
        
        this.updateUIAfterLogin();
        
        return this.currentUser.fincoin;
    }
    
    async updateXP(amount) {
        if (!this.currentUser) return;
        
        const newXP = (this.currentUser.xp || 0) + amount;
        this.currentUser.xp = newXP;
        
        const oldLevel = this.currentUser.level || 1;
        const newLevel = Math.floor(newXP / 100) + 1;
        
        if (newLevel > oldLevel) {
            this.currentUser.level = newLevel;
            const bonus = (newLevel - oldLevel) * 50;
            await this.updateFinCoin(bonus);
            this.showLevelUpModal(oldLevel, newLevel, bonus);
        }
        
        localStorage.setItem(`finapp_user_${this.currentUser.uid}`, JSON.stringify(this.currentUser));
        this.updateUIAfterLogin();
        
        return this.currentUser.xp;
    }
    
    showLevelUpModal(oldLevel, newLevel, bonus) {
        const levelNames = ['Новичок', 'Эконом', 'Контролёр', 'Мастер', 'Эксперт', 'Гуру'];
        const levelName = levelNames[Math.min(newLevel - 1, levelNames.length - 1)] || `Уровень ${newLevel}`;
        
        const modal = document.getElementById('levelUpModal');
        const newLevelNameSpan = document.getElementById('newLevelName');
        const bonusSpan = document.getElementById('levelUpBonus');
        
        if (modal && newLevelNameSpan && bonusSpan) {
            newLevelNameSpan.textContent = levelName;
            bonusSpan.textContent = `+${bonus} FinCoin`;
            modal.style.display = 'flex';
            
            const closeBtn = modal.querySelector('.close-modal');
            if (closeBtn) {
                closeBtn.onclick = () => { modal.style.display = 'none'; };
            }
            
            setTimeout(() => { modal.style.display = 'none'; }, 3000);
        }
    }
    
    updateUIAfterLogin() {
        if (!this.currentUser) return;
        
        const userNameElements = document.querySelectorAll('#profileUserName, #userNameDisplay');
        userNameElements.forEach(el => {
            if (el) el.textContent = this.currentUser.name;
        });
        
        const fincoinElements = document.querySelectorAll('#fincoinCount, #fincoinBalanceDisplay, #missionsFincoinAmount, #profileFincoin, #profileFincoinValue, #shopBalance');
        fincoinElements.forEach(el => {
            if (el) el.textContent = this.currentUser.fincoin || 0;
        });
        
        const levelNames = ['Новичок', 'Эконом', 'Контролёр', 'Мастер', 'Эксперт', 'Гуру'];
        const levelIndex = Math.min((this.currentUser.level || 1) - 1, levelNames.length - 1);
        const levelName = levelNames[levelIndex];
        
        const levelElements = document.querySelectorAll('#userLevelDisplay, #missionsLevelName, #profileLevelDisplay');
        levelElements.forEach(el => {
            if (el) el.textContent = levelName;
        });
        
        const xp = this.currentUser.xp || 0;
        const level = this.currentUser.level || 1;
        const currentLevelXP = (level - 1) * 100;
        const nextLevelXP = level * 100;
        const progress = ((xp - currentLevelXP) / 100) * 100;
        
        const progressElements = document.querySelectorAll('#homeLevelProgress, #missionsLevelProgress');
        progressElements.forEach(el => {
            if (el) el.style.width = `${Math.min(100, progress)}%`;
        });
        
        const xpElements = document.querySelectorAll('#homeLevelXP, #missionsLevelXP, #profileXPDisplay');
        xpElements.forEach(el => {
            if (el) el.textContent = `${xp - currentLevelXP}/${nextLevelXP - currentLevelXP} XP`;
        });
        
        if (this.currentUser.settings) {
            if (this.currentUser.settings.theme) {
                this.applyTheme(this.currentUser.settings.theme);
            }
            if (this.currentUser.settings.currency) {
                this.setCurrency(this.currentUser.settings.currency);
            }
        }
    }
    
    applyTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-theme');
            document.body.classList.remove('light-theme');
        } else if (theme === 'light') {
            document.body.classList.add('light-theme');
            document.body.classList.remove('dark-theme');
        }
    }
    
    setCurrency(currency) {
        const currencyElements = document.querySelectorAll('.currency-symbol, .balance-currency');
        currencyElements.forEach(el => {
            if (el) el.textContent = currency;
        });
    }
}

// ============================================================================
// ГЛОБАЛЬНЫЙ ЭКЗЕМПЛЯР
// ============================================================================

const authManager = new AuthManager();

// ============================================================================
// ФУНКЦИИ UI АВТОРИЗАЦИИ
// ============================================================================

function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');
    
    if (notification && notificationText) {
        notificationText.textContent = message;
        notification.classList.add('show');
        
        if (type === 'error') {
            notification.classList.add('error');
        } else {
            notification.classList.remove('error');
        }
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    } else {
        console.log(`[${type}] ${message}`);
        alert(message);
    }
}

function showApp() {
    const authPage = document.getElementById('authPage');
    const mainApp = document.getElementById('mainApp');
    
    if (authPage) authPage.style.display = 'none';
    if (mainApp) mainApp.style.display = 'block';
}

function hideApp() {
    const authPage = document.getElementById('authPage');
    const mainApp = document.getElementById('mainApp');
    
    if (authPage) authPage.style.display = 'flex';
    if (mainApp) mainApp.style.display = 'none';
}

function setupAuthTabs() {
    const showRegisterLink = document.getElementById('showRegisterLink');
    const showLoginLink = document.getElementById('showLoginLink');
    const loginCard = document.getElementById('loginCard');
    const registerCard = document.getElementById('registerCard');
    
    if (showRegisterLink) {
        showRegisterLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (loginCard) loginCard.style.display = 'none';
            if (registerCard) registerCard.style.display = 'block';
        });
    }
    
    if (showLoginLink) {
        showLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (loginCard) loginCard.style.display = 'block';
            if (registerCard) registerCard.style.display = 'none';
        });
    }
}

async function handleLogin() {
    const email = document.getElementById('loginEmailInput')?.value.trim();
    const password = document.getElementById('loginPasswordInput')?.value;
    
    if (!email || !password) {
        showNotification('Заполните все поля', 'error');
        return;
    }
    
    const loginBtn = document.getElementById('loginSubmitBtn');
    if (loginBtn) {
        loginBtn.disabled = true;
        loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Вход...';
    }
    
    const result = await authManager.login(email, password);
    
    if (loginBtn) {
        loginBtn.disabled = false;
        loginBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Войти';
    }
    
    if (result.success) {
        showNotification(`Добро пожаловать, ${result.user.name}!`, 'success');
        showApp();
        authManager.updateUIAfterLogin();
    } else {
        showNotification(result.error, 'error');
    }
}

async function handleRegister() {
    const name = document.getElementById('registerNameInput')?.value.trim();
    const email = document.getElementById('registerEmailInput')?.value.trim();
    const password = document.getElementById('registerPasswordInput')?.value;
    const confirmPassword = document.getElementById('registerConfirmInput')?.value;
    
    if (!name || !email || !password) {
        showNotification('Заполните все поля', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showNotification('Пароли не совпадают', 'error');
        return;
    }
    
    if (password.length < 6) {
        showNotification('Пароль должен быть не менее 6 символов', 'error');
        return;
    }
    
    const registerBtn = document.getElementById('registerSubmitBtn');
    if (registerBtn) {
        registerBtn.disabled = true;
        registerBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Регистрация...';
    }
    
    const result = await authManager.register(email, password, name);
    
    if (registerBtn) {
        registerBtn.disabled = false;
        registerBtn.innerHTML = '<i class="fas fa-user-plus"></i> Зарегистрироваться';
    }
    
    if (result.success) {
        showNotification(`Добро пожаловать, ${result.user.name}!`, 'success');
        showApp();
        authManager.updateUIAfterLogin();
    } else {
        showNotification(result.error, 'error');
    }
}

async function handleGoogleLogin() {
    const googleBtn = document.getElementById('googleLoginBtn') || document.getElementById('googleRegisterBtn');
    
    if (googleBtn) {
        googleBtn.disabled = true;
        googleBtn.innerHTML = '<i class="fab fa-google fa-spin"></i> Подключение...';
    }
    
    const result = await authManager.loginWithGoogle();
    
    if (googleBtn) {
        googleBtn.disabled = false;
        googleBtn.innerHTML = '<i class="fab fa-google"></i> Войти через Google';
    }
    
    if (result.success) {
        showNotification(`Добро пожаловать, ${result.user.name}!`, 'success');
        showApp();
        authManager.updateUIAfterLogin();
    } else {
        showNotification(result.error || 'Ошибка входа через Google', 'error');
    }
}

async function handleLogout() {
    const result = await authManager.logout();
    
    if (result.success) {
        showNotification('Вы вышли из системы', 'info');
        hideApp();
    }
}

// ============================================================================
// СЛУШАТЕЛЬ СОСТОЯНИЯ АУТЕНТИФИКАЦИИ
// ============================================================================

if (firebaseInitialized && auth) {
    onAuthStateChanged(auth, async (user) => {
        if (user && !authManager.useLocal) {
            const userId = user.uid;
            const savedData = localStorage.getItem(`finapp_user_${userId}`);
            
            if (savedData) {
                authManager.currentUser = JSON.parse(savedData);
                authManager.isAuthenticated = true;
                // Синхронизация отключена
                // await syncUserWithBackend(authManager.currentUser);
                showApp();
                authManager.updateUIAfterLogin();
            }
        } else if (!user && !authManager.useLocal) {
            const localUser = authManager.getUser();
            if (!localUser) {
                hideApp();
            }
        }
    });
} else {
    const localUser = authManager.getUser();
    if (localUser) {
        showApp();
        authManager.updateUIAfterLogin();
    }
}

// ============================================================================
// ИНИЦИАЛИЗАЦИЯ
// ============================================================================

function initAuth() {
    console.log('🔐 Инициализация системы авторизации...');
    
    if (firebaseInitialized) {
        console.log('✅ Firebase режим (онлайн)');
    } else {
        console.log('📱 Локальный режим (офлайн/демо)');
    }
    
    setupAuthTabs();
    
    const loginBtn = document.getElementById('loginSubmitBtn');
    const registerBtn = document.getElementById('registerSubmitBtn');
    const googleLoginBtn = document.getElementById('googleLoginBtn');
    const googleRegisterBtn = document.getElementById('googleRegisterBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    
    
    
    const loginEmail = document.getElementById('loginEmailInput');
    const loginPassword = document.getElementById('loginPasswordInput');
    
    if (loginEmail && loginPassword) {
        const handleLoginEnter = (e) => { if (e.key === 'Enter') handleLogin(); };
        loginEmail.addEventListener('keypress', handleLoginEnter);
        loginPassword.addEventListener('keypress', handleLoginEnter);
    }
    
    const registerName = document.getElementById('registerNameInput');
    const registerEmail = document.getElementById('registerEmailInput');
    const registerPassword = document.getElementById('registerPasswordInput');
    const registerConfirm = document.getElementById('registerConfirmInput');
    
    if (registerName && registerEmail && registerPassword && registerConfirm) {
        const handleRegisterEnter = (e) => { if (e.key === 'Enter') handleRegister(); };
        registerName.addEventListener('keypress', handleRegisterEnter);
        registerEmail.addEventListener('keypress', handleRegisterEnter);
        registerPassword.addEventListener('keypress', handleRegisterEnter);
        registerConfirm.addEventListener('keypress', handleRegisterEnter);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAuth);
} else {
    initAuth();
}

window.authManager = authManager;
window.showNotification = showNotification;
window.getJWTToken = getJWTToken;