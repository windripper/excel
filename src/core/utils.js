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
