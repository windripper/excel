import {
    APPLY_STYLE,
    CHANGE_STYLES, CHANGE_TABLE_NAME,
    CHANGE_TEXT,
    TABLE_RESIZE
} from '@/redux/types';

// Action creator
export function tableResize(data) {
    return {
        type: TABLE_RESIZE,
        data
    };
}

export function changeText(data) {
    return {
        type: CHANGE_TEXT,
        data
    };
}

export function changeStyles(data) {
    return {
        type: CHANGE_STYLES,
        data
    };
}

export function applyStyle(data) {
    return {
        type: APPLY_STYLE,
        data
    };
}

export function changeTableName(data) {
    return {
        type: CHANGE_TABLE_NAME,
        data
    };
}
