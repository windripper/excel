import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/dom';
import { createTable } from '@/components/table/table.template';
import {
    isCell,
    matrix,
    navigationHandler,
    shouldNavigate,
    shouldResize
} from '@/components/table/table.functions';
import { resizeHandler } from '@/components/table/table.resize';
import { TableSelection } from '@/components/table/table.TableSelection';
import * as actions from '@/redux/actions';
import { defaultStyles } from '@/constants';
import { parse } from '@core/parse';

export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        });
    }

    toHTML() {
        return createTable(15, this.store.getState());
    }

    prepare() {
        this.selection = new TableSelection();
    }

    init() {
        super.init();

        const $cell = this.$root.find('[data-id="0:0"]');
        this.selectCell($cell);

        this.$on('formula:input', value => {
            this.selection.current
                .attr('data-value', value)
                .text(parse(value));
            this.updateTextInStore(value);
        });

        this.$on('formula:done', () => {
            this.selection.current.focus();
            this.selection.current.setCaret();
        });

        this.$on('toolbar:applyStyle', value => {
            this.selection.applyStyle(value);
            this.$dispatch(actions.applyStyle({
                value,
                ids: this.selection.selectedIds
            }));
        });
    }

    selectCell($cell) {
        this.selection.select($cell);
        this.$emit('table:select', $cell);
        const styles = $cell.getStyles(Object.keys(defaultStyles));
        this.$dispatch(actions.changeStyles(styles));
    }

    updateTextInStore(value) {
        this.$dispatch(actions.changeText({
            id: this.selection.current.id(),
            value
        }));
    }

    async resizeTable(event) {
        try {
            const data = await resizeHandler(event, this);
            this.$dispatch(actions.tableResize(data));
        } catch(e) {
            console.warn(e);
        }
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            this.resizeTable(event);
        } else if (isCell(event)) {
            const $target = $(event.target);
            this.$emit('table:select', $target);

            if (event.shiftKey) {
                const $cells = matrix($target, this.selection.current)
                    .map(id => this.$root.find(`[data-id='${id}']`));
                this.selection.selectGroup($cells);
            } else {
                this.selectCell($target);
            }
        }
    }

    onKeydown(event) {
        if (shouldNavigate(event)) {
            event.preventDefault();
            const lastRow = $(this.$root.lastChild());
            const $current = this.selection.current.id(true);
            const $next = this.$root
                .find(navigationHandler($current, lastRow, event));
            this.selectCell($next);
        }
    }

    onInput(event) {
        this.updateTextInStore($(event.target).text());
    }
}
