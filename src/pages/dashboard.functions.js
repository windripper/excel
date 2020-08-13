import { storage } from '@core/utils';

function toHTML(key) {
    const table = storage(key);
    const date = new Date(table.lastTimeOpened).toLocaleString();
    const url = key.replace(':', '/');
    return `
        <li class="db__record">
            <a href="#${url}">${table.tableName}</a>
            <strong>${date}</strong>
        </li>
    `;
}

function getAllKeys() {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key.includes('excel')) {
            continue;
        }
        keys.push(key);
    }

    return keys;
}

export function createRecordsTable() {
    const keys = getAllKeys();
    if (!keys.length) {
        return `You haven't created any tables yet`;
    }

    return `
        <div class="db__list-header">
            <span>Table name</span>
            <span>Last time opened</span>
        </div>

        <ul class="db__list">
            ${keys.map(toHTML).join('')}
        </ul>
    `;
}
