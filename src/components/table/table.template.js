// ASCII Code
import { toInlineStyles } from '@core/utils';
import { defaultStyles } from '@/constants';
import { parse } from '@core/parse';

const CODES = {
    A: 65,
    Z: 90
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function getWidth(state, index) {
    return (state[index] || DEFAULT_WIDTH) + 'px';
}

function getHeight({ rowState }, index) {
    return (rowState[index] || DEFAULT_HEIGHT) + 'px';
}

function toCell(state, row) {
    return function(_, col) {
        const width = getWidth(state.colState, col);
        const id = `${row}:${col}`;
        const value = state.dataState[id];
        const styles = toInlineStyles({
            ...defaultStyles,
            ...state.stylesState[id]
        });
        return `
        <div
            class="cell"
            contenteditable
            data-col='${col}'
            data-type="cell"
            data-id="${id}"
            data-value="${value || ''}"
            style="${styles}; width: ${width}"
        >${parse(value) || ''}</div>
    `;
    };
}

function toColumn({ col, index, width }) {
    return `
        <div
            class="column"
            data-type="resizable"
            data-col="${index}"
            style="width: ${width}"
        >
            ${col}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `;
}

function createRow(content, index, state) {
    const height = getHeight(state, index);
    const resize = index
        ? '<div class="row-resize" data-resize="row"></div>'
        : '';
    return `
        <div class="row"
            data-type="resizable"
            data-row="${index}"
            style="height: ${height}"
        >
            <div class="row-info">
                ${index ? index : ''}
                ${resize}
            </div>
            <div class="row-data">${content}</div>
        </div>
    `;
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index);
}

function widthFrom(state) {
    return function(col, index) {
        return {
            col,
            index,
            width: getWidth(state.colState, index)
        };
    };
}

export function createTable(rowsCount = 15, state) {
    const colsCount = CODES.Z - CODES.A + 1;
    const rows = [];

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(widthFrom(state))
        .map(toColumn)
        .join('');

    rows.push(createRow(cols, null, state));

    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(colsCount)
            .fill('')
            // .map((_, col) => toCell(row, col))
            .map(toCell(state, row))
            .join('');
        rows.push(createRow(cells, row + 1, state));
    }

    return rows.join('');
}
