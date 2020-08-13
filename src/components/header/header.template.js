import { defaultTableName } from '@/constants';

export function createHeader(state) {
    const tableName = state.tableName || defaultTableName;
    return `
            <input type="text" class="input" value="${tableName}">
            <div>
                <div class="button" id="deleteCurrentTable">
                    <i class="material-icons">delete</i>
                </div>

                <div class="button" id="goToDashboard">
                    <i class="material-icons">exit_to_app</i>
                </div>
            </div>
        `;
}
