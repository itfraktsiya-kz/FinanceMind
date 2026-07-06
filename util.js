// ============================================================================
// UTIL.JS  –  Shared helpers  (single source of truth)
// Load this FIRST so every other module can rely on window.showNotification,
// window.formatCurrency, etc. being defined before they run.
// ============================================================================

// ─── Formatting ──────────────────────────────────────────────────────────────

function formatCurrency(amount, currency) {
    currency = currency || '₸';
    if (amount === undefined || amount === null) amount = 0;
    var formatted = Math.abs(amount).toFixed(2).replace('.', ',');
    var parts = formatted.split(',');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return (amount < 0 ? '-' : '') + parts.join(',') + '\u00A0' + currency;
}

function formatAmountWithSign(amount, type, currency) {
    currency = currency || '₸';
    var formatted = formatCurrency(Math.abs(amount), currency);
    return type === 'income' ? '+' + formatted : '-' + formatted;
}

function formatDate(date, format) {
    format = format || 'dd.mm.yyyy';
    var d = new Date(date);
    if (isNaN(d.getTime())) return '';
    var day   = String(d.getDate()).padStart(2, '0');
    var month = String(d.getMonth() + 1).padStart(2, '0');
    var year  = d.getFullYear();
    if (format === 'yyyy-mm-dd') return year + '-' + month + '-' + day;
    if (format === 'dd MMM')     return day + ' ' + _monthNames[d.getMonth()];
    return day + '.' + month + '.' + year;
}

var _monthNames = ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'];

function formatTime(timestamp) {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function formatCooldown(timestamp) {
    if (!timestamp) return null;
    var remaining = timestamp - Date.now();
    if (remaining <= 0) return null;
    var h = Math.floor(remaining / 3600000);
    var m = Math.floor((remaining % 3600000) / 60000);
    var s = Math.floor((remaining % 60000) / 1000);
    return String(h).padStart(2,'0') + ':' + String(m).padStart(2,'0') + ':' + String(s).padStart(2,'0');
}

// ─── Validation ──────────────────────────────────────────────────────────────

function validateEmail(email) {
    return /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/.test(email);
}

function validatePassword(password) {
    return !!(password && password.length >= 6);
}

function validateAmount(amount) {
    return !!(amount && !isNaN(amount) && Number(amount) > 0);
}

// ─── DOM helpers ─────────────────────────────────────────────────────────────

/**
 * showNotification  –  THE single canonical implementation.
 * All other copies in auth.js and inline scripts have been removed.
 * Exposed on window so legacy onclick attributes can still call it.
 */
function showNotification(message, type) {
    type = type || 'success';
    var notification = document.getElementById('notification');
    if (!notification) { console.log('[' + type + '] ' + message); return; }

    var text = document.getElementById('notificationText');
    var icon = notification.querySelector('i');

    if (text) text.textContent = message;

    var icons = {
        success: 'fa-check-circle',
        error:   'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info:    'fa-info-circle'
    };
    if (icon) icon.className = 'fas ' + (icons[type] || icons.success);

    notification.classList.add('show');
    clearTimeout(notification._hideTimer);
    notification._hideTimer = setTimeout(function () {
        notification.classList.remove('show');
    }, 3000);
}

function showLoading(element) {
    if (!element) return;
    element.setAttribute('data-original-html', element.innerHTML);
    element.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    element.disabled = true;
}

function hideLoading(element) {
    if (!element) return;
    var orig = element.getAttribute('data-original-html');
    if (orig) { element.innerHTML = orig; element.removeAttribute('data-original-html'); }
    element.disabled = false;
}

function closeAllModals() {
    document.querySelectorAll('.modal').forEach(function (m) { m.classList.remove('active'); });
}

function showModal(modalId) {
    var el = document.getElementById(modalId);
    if (el) el.classList.add('active');
}

function hideModal(modalId) {
    var el = document.getElementById(modalId);
    if (el) el.classList.remove('active');
}

// ─── Category colours ─────────────────────────────────────────────────────────

var CATEGORY_COLORS = {
    'Доход': '#10b981', 'Зарплата': '#34d399', 'Бонусы': '#6ee7b7',
    'Кэшбэк': '#a7f3d0', 'Пополнение': '#d1fae5', 'Возврат': '#d1fae5',
    'Переводы': '#6b7280', 'Продукты': '#ef4444', 'Рестораны и кафе': '#f97316',
    'Транспорт': '#3b82f6', 'Покупки': '#8b5cf6', 'Развлечения': '#ec4899',
    'Здоровье': '#14b8a6', 'Жильё и коммунальные': '#f59e0b',
    'Связь и интернет': '#6366f1', 'Образование': '#a855f7',
    'Подписки': '#06b6d4', 'Снятие': '#9ca3af', 'Другое': '#9ca3af',
    // English aliases used by server-side parser
    'Income': '#10b981', 'Salary': '#34d399', 'Bonus': '#6ee7b7',
    'Cashback': '#a7f3d0', 'Top-up': '#d1fae5', 'Refund': '#d1fae5',
    'Transfers': '#6b7280', 'Groceries': '#ef4444', 'Restaurants': '#f97316',
    'Transport': '#3b82f6', 'Shopping': '#8b5cf6', 'Entertainment': '#ec4899',
    'Health': '#14b8a6', 'Housing': '#f59e0b', 'Internet': '#6366f1',
    'Education': '#a855f7', 'Subscriptions': '#06b6d4', 'Withdrawal': '#9ca3af',
    'Other': '#9ca3af'
};

function getCategoryColor(category) {
    return CATEGORY_COLORS[category] || '#9ca3af';
}

// ─── Misc utilities ──────────────────────────────────────────────────────────

function generateId(prefix) {
    prefix = prefix || '';
    return prefix + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function groupBy(array, key) {
    return array.reduce(function (result, item) {
        var g = item[key];
        if (!result[g]) result[g] = [];
        result[g].push(item);
        return result;
    }, {});
}

function sortByDate(array, field, ascending) {
    field     = field     || 'date';
    ascending = ascending || false;
    return array.slice().sort(function (a, b) {
        var da = new Date(a[field]), db = new Date(b[field]);
        return ascending ? da - db : db - da;
    });
}

// ─── Exports (window-level so every module can access without bundling) ───────

window.formatCurrency       = formatCurrency;
window.formatAmountWithSign = formatAmountWithSign;
window.formatDate           = formatDate;
window.formatTime           = formatTime;
window.formatCooldown       = formatCooldown;
window.validateEmail        = validateEmail;
window.validatePassword     = validatePassword;
window.validateAmount       = validateAmount;
window.showNotification     = showNotification;   // ← canonical definition
window.showLoading          = showLoading;
window.hideLoading          = hideLoading;
window.closeAllModals       = closeAllModals;
window.showModal            = showModal;
window.hideModal            = hideModal;
window.getCategoryColor     = getCategoryColor;
window.CATEGORY_COLORS      = CATEGORY_COLORS;
window.generateId           = generateId;
window.groupBy              = groupBy;
window.sortByDate           = sortByDate;

console.log('[util] loaded – showNotification, formatCurrency and helpers available on window');