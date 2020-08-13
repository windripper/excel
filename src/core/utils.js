export function capitalize(string) {
    if (typeof string !== 'string') {
        return '';
    }

    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function range(start, end) {
    const delta = Math.abs(start - end);
    return new Array(delta + 1)
        .fill('')
        .map((_, index) => Math.min(start, end) + index);
}

export function storage(key, data) {
    if (!data) {
        return JSON.parse(localStorage.getItem(key));
    }

    localStorage.setItem(key, JSON.stringify(data));
}

export function isEqual(a, b) {
    if (typeof a === 'object' && typeof b === 'object') {
        return JSON.stringify(a) === JSON.stringify(b);
    }
    return a === b;
}

export function camelToDashCase(str) {
    return str.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`);
}

export function toInlineStyles(styles = {}) {
    return Object.keys(styles)
        .map(key => `${camelToDashCase(key)}: ${styles[key]}`)
        .join(';');
}

export function debounce(fn, wait) {
    let timeout;
    return function(...args) {
        const later = () => {
            clearTimeout(timeout);
            fn(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

export function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

export function preventDefault(event) {
    event.preventDefault();
}
