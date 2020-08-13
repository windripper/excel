import { ExcelComponent } from '@core/ExcelComponent';
import { createHeader } from '@/components/header/header.template';
import * as actions from '@/redux/actions';
import { $ } from '@core/dom';
import { headerNavigationHandler } from '@/components/header/header.functions';

export class Header extends ExcelComponent {
    static className = 'excel__header';

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input', 'click'],
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

    onClick(event) {
        const $target = $(event.target);
        headerNavigationHandler($target);
    }
}
