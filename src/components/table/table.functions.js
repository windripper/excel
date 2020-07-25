import { range } from '@core/utils';

export function shouldResize(event) {
    return event.target.dataset.resize;
}

export function isCell(event) {
    return event.target.dataset.type === 'cell';
}

export function matrix($target, $current) {
    const target = $target.id(true);
    const current = $current.id(true);
    const cols = range(current.col, target.col);
    const rows = range(current.row, target.row);

    return cols.reduce((acc, col) => {
        rows.forEach(row => acc.push(`${row}:${col}`));
        return acc;
    }, []);
}

export function shouldNavigate(event) {
    // tab, enter, left, up, right, down
    const navigationCodes = [9, 13, 37, 38, 39, 40];
    return navigationCodes.includes(event.keyCode) && !event.shiftKey;
}

export function navigationHandler({ row, col }, lastRow, { key }) {
    lastRow = +lastRow.find('.cell').data.id.split(':')[0];
    switch (key) {
    case 'Tab':
    case 'ArrowRight':
        col !== 25 ? col++ : col;
        break;
    case 'Enter':
    case 'ArrowDown':
        row !== lastRow ? row++ : row;
        break;
    case 'ArrowLeft':
        col !== 0 ? col-- : col;
        break;
    case 'ArrowUp':
        row !== 0 ? row-- : row;
        break;
    }

    return `[data-id='${row}:${col}']`;
}
