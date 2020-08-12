import { ExcelComponent } from '@core/ExcelComponent';
import { createHeader } from '@/components/header/header.template';
import * as actions from '@/redux/actions';

export class Header extends ExcelComponent {
    static className = 'excel__header';

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input'],
            ...options
        });
    }

    toHTML() {
        return createHeader(this.store.getState());
    }

    onInput(event) {
        const value = event.target.value;
        this.$dispatch(actions.changeTableName(value));
    }
}
