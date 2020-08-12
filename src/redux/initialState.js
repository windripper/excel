import { storage } from '@core/utils';
import { defaultStyles, defaultTableName } from '@/constants';

const defaultState = {
    colState: {},
    rowState: {},
    dataState: {},
    stylesState: {},
    currentText: '',
    tableName: defaultTableName,
    currentStyles: defaultStyles
};

export const initialState = storage('excel-state')
    ? storage('excel-state')
    : defaultState;
