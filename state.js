// ============================================================================
// STATE.JS  –  Single source of truth for ALL application state
//
// CHANGES FROM ORIGINAL:
// • AppState is now the ONE place that stores goals, balance, financeData,
//   missions, etc.  script.js no longer keeps its own parallel globals.
// • updateState() persists to localStorage immediately so api.js and
//   any other module always reads fresh data.
// • Getters (getTotalIncome, getLevelName, …) are defined here so any
//   module can compute derived values without importing raw data.
// • subscribeToState() lets script.js react to state changes and re-render.
// ============================================================================

var AppState = {
    // ── Financial data (keyed by bank id) ──────────────────────────────────
    financeData: {
        kaspi: {
            connected: false, name: 'Kaspi Bank', country: 'Казахстан',
            icon: 'fas fa-mobile-alt', color: '#e53e3e',
            accounts: [{ id: 'kaspi_main', name: 'Main Card',
                number: '4400 **** **** 1234', currency: 'KZT',
                balance: 0, income: 0, expense: 0, transactions: [], type: 'debit' }],
            transactions: [], files: []
        },
        halyk: {
            connected: false, name: 'Halyk Bank', country: 'Казахстан',
            icon: 'fas fa-university', color: '#3182ce',
            accounts: [{ id: 'halyk_main', name: 'Halyk Card',
                number: '4400 **** **** 4321', currency: 'KZT',
                balance: 0, income: 0, expense: 0, transactions: [], type: 'debit' }],
            transactions: [], files: []
        },
        sber: {
            connected: false, name: 'Сбербанк', country: 'Россия',
            icon: 'fas fa-ruble-sign', color: '#38a169',
            accounts: [{ id: 'sber_main', name: 'SberCard',
                number: '2200 **** **** 1111', currency: 'RUB',
                balance: 0, income: 0, expense: 0, transactions: [], type: 'debit' }],
            transactions: [], files: []
        },
        jusan: {
            connected: false, name: 'Jusan Bank', country: 'Казахстан',
            icon: 'fas fa-credit-card', color: '#805ad5',
            accounts: [{ id: 'jusan_main', name: 'Jusan Card',
                number: '4400 **** **** 8888', currency: 'KZT',
                balance: 0, income: 0, expense: 0, transactions: [], type: 'debit' }],
            transactions: [], files: []
        }
    },

    // ── User data ───────────────────────────────────────────────────────────
    goals:          [],
    fincoinBalance: 0,
    purchasedItems: [],
    activeBoosters: [],
    currentActiveTheme: null,
    activeIcon:  null,
    activePet:   null,
    activeEmote: null,

    // ── Missions ────────────────────────────────────────────────────────────
    missionsState: {
        availableMissions:   [],
        completedMissions:   [],
        userLevel:           1,
        userXP:              0,
        totalXPEarned:       0,
        totalFinCoinEarned:  0,
        achievements:        [],
        lastMissionUpdate:   Date.now()
    },

    // ── Calendar / reminders ────────────────────────────────────────────────
    paymentCalendar: [],
    reminders:       [],
    transactionTags: {},
    availableTags: [
        '🍔 Еда','🚗 Такси','🏠 Дом','🎮 Игры','👕 Одежда',
        '📚 Образование','💊 Здоровье','🎁 Подарки','✈️ Путешествия'
    ],

    // ── UI (not persisted) ──────────────────────────────────────────────────
    currentPage:        'home',
    currentBank:        'all',
    currentAccount:     'all',
    currentDateFilter:  'all',
    currentTypeFilter:  'all',
    currentPeriod:      { start: null, end: null, type: 'all' },
    currentMissionFilter: 'all',
    currentLanguage:    'ru',
    currentCurrency:    '₸',
    isLoading:          false,
    error:              null
};

// ─── Subscriber registry ──────────────────────────────────────────────────────

var _stateListeners = [];

function subscribeToState(listener) {
    _stateListeners.push(listener);
    return function unsubscribe() {
        var idx = _stateListeners.indexOf(listener);
        if (idx !== -1) _stateListeners.splice(idx, 1);
    };
}

function _notifyListeners(changedKeys) {
    _stateListeners.forEach(function (fn) {
        try { fn(AppState, changedKeys); } catch (e) { console.error('[state] listener error', e); }
    });
}

// ─── Keys that must be persisted to localStorage ──────────────────────────────

var PERSIST_KEYS = [
    'goals', 'fincoinBalance', 'purchasedItems', 'activeBoosters',
    'currentActiveTheme', 'activeIcon', 'activePet', 'activeEmote',
    'missionsState', 'paymentCalendar', 'reminders',
    'transactionTags', 'availableTags', 'currentLanguage', 'currentCurrency'
];

var FINANCE_KEY = 'finapp_finance';

function _persistState() {
    try {
        PERSIST_KEYS.forEach(function (key) {
            localStorage.setItem('finapp_' + key, JSON.stringify(AppState[key]));
        });
        // Persist financeData separately (trim to 500 tx per bank to stay under quota)
        var slim = {};
        Object.keys(AppState.financeData).forEach(function (bankId) {
            var b = AppState.financeData[bankId];
            slim[bankId] = {
                connected:    b.connected,
                files:        b.files || [],
                accounts:     b.accounts || [],
                transactions: (b.transactions || []).slice(-500)
            };
        });
        localStorage.setItem(FINANCE_KEY, JSON.stringify(slim));
    } catch (e) {
        console.warn('[state] localStorage write failed:', e.message);
    }
}

// ─── Main update function ─────────────────────────────────────────────────────

/**
 * updateState(changes)
 * Pass a plain object with any subset of AppState keys.
 * The update is merged shallowly, persisted, and listeners are notified.
 */
function updateState(changes) {
    var changedKeys = Object.keys(changes);
    changedKeys.forEach(function (key) {
        AppState[key] = changes[key];
    });
    _persistState();
    _notifyListeners(changedKeys);
}

// ─── Hydrate from localStorage on startup ────────────────────────────────────

function loadPersistedState() {
    try {
        PERSIST_KEYS.forEach(function (key) {
            var raw = localStorage.getItem('finapp_' + key);
            if (raw !== null) {
                try { AppState[key] = JSON.parse(raw); } catch (_) {}
            }
        });

        var rawFinance = localStorage.getItem(FINANCE_KEY);
        if (rawFinance) {
            var saved = JSON.parse(rawFinance);
            Object.keys(saved).forEach(function (bankId) {
                if (AppState.financeData[bankId]) {
                    // Merge persisted fields into the default structure
                    Object.assign(AppState.financeData[bankId], saved[bankId]);
                }
            });
        }
    } catch (e) {
        console.warn('[state] failed to load persisted state:', e.message);
    }
    console.log('[state] hydrated from localStorage');
}

// ─── Convenience mutators (used by script.js instead of raw updateState) ──────

function addFinCoin(amount) {
    updateState({ fincoinBalance: Math.max(0, AppState.fincoinBalance + amount) });
}

function subtractFinCoin(amount) {
    updateState({ fincoinBalance: Math.max(0, AppState.financeData, AppState.fincoinBalance - amount) });
    // Corrected:
    updateState({ fincoinBalance: Math.max(0, AppState.fincoinBalance - amount) });
}

function purchaseItem(itemId, price) {
    if (AppState.fincoinBalance < price) return false;
    if (AppState.purchasedItems.indexOf(itemId) !== -1) return false; // already owned
    var newItems = AppState.purchasedItems.slice();
    newItems.push(itemId);
    updateState({ fincoinBalance: AppState.fincoinBalance - price, purchasedItems: newItems });
    return true;
}

function addGoalToState(goal) {
    var newGoals = AppState.goals.slice();
    newGoals.push(goal);
    updateState({ goals: newGoals });
}

function updateGoalInState(goalId, changes) {
    var newGoals = AppState.goals.map(function (g) {
        return g.id === goalId ? Object.assign({}, g, changes) : g;
    });
    updateState({ goals: newGoals });
}

function deleteGoalFromState(goalId) {
    updateState({ goals: AppState.goals.filter(function (g) { return g.id !== goalId; }) });
}

// ─── Derived getters ──────────────────────────────────────────────────────────

function _allTransactions() {
    var all = [];
    Object.values(AppState.financeData).forEach(function (b) {
        if (b.transactions) Array.prototype.push.apply(all, b.transactions);
    });
    return all;
}

function getTotalIncome() {
    return _allTransactions().reduce(function (s, tx) {
        return s + (tx.type === 'income' ? (tx.amount || 0) : 0);
    }, 0);
}

function getTotalExpense() {
    return _allTransactions().reduce(function (s, tx) {
        return s + (tx.type === 'expense' ? (tx.amount || 0) : 0);
    }, 0);
}

function getBalance() { return getTotalIncome() - getTotalExpense(); }

function getTotalTransactions() { return _allTransactions().length; }

function getConnectedBanksCount() {
    return Object.values(AppState.financeData).filter(function (b) { return b.connected; }).length;
}

function getActiveGoals()    { return AppState.goals.filter(function (g) { return !g.completed; }); }
function getCompletedGoals() { return AppState.goals.filter(function (g) { return !!g.completed; }); }

var _LEVEL_XP_THRESHOLDS = [100, 250, 500, 1000, 2000, 3500, 5000, 7500, 10000];

function getXPForNextLevel() {
    var lvl = AppState.missionsState.userLevel;
    return lvl <= _LEVEL_XP_THRESHOLDS.length
        ? _LEVEL_XP_THRESHOLDS[lvl - 1]
        : AppState.missionsState.userXP + 500;
}

function getLevelProgress() {
    return Math.min((AppState.missionsState.userXP / getXPForNextLevel()) * 100, 100);
}

var _LEVEL_NAMES = ['Новичок','Контролёр','Инвестор','Стратег','Эксперт','Мастер','Гуру','Легенда','Миллионер','Банкир'];

function getLevelName() {
    return _LEVEL_NAMES[Math.min(AppState.missionsState.userLevel - 1, _LEVEL_NAMES.length - 1)];
}

// ─── Expose everything on window ─────────────────────────────────────────────

window.AppState             = AppState;
window.updateState          = updateState;
window.loadPersistedState   = loadPersistedState;
window.subscribeToState     = subscribeToState;
window.addFinCoin           = addFinCoin;
window.subtractFinCoin      = subtractFinCoin;
window.purchaseItem         = purchaseItem;
window.addGoalToState       = addGoalToState;
window.updateGoalInState    = updateGoalInState;
window.deleteGoalFromState  = deleteGoalFromState;
window.getTotalIncome       = getTotalIncome;
window.getTotalExpense      = getTotalExpense;
window.getBalance           = getBalance;
window.getTotalTransactions = getTotalTransactions;
window.getConnectedBanksCount = getConnectedBanksCount;
window.getActiveGoals       = getActiveGoals;
window.getCompletedGoals    = getCompletedGoals;
window.getXPForNextLevel    = getXPForNextLevel;
window.getLevelProgress     = getLevelProgress;
window.getLevelName         = getLevelName;

console.log('[state] loaded – AppState is the single source of truth');