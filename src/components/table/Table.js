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
        return createTable();
    }

    prepare() {
        this.selection = new TableSelection();
    }

    init() {
        super.init();

        const $cell = this.$root.find('[data-id="0:0"]');
        this.selectCell($cell);

        this.$on('formula:input', text => {
            this.selection.current.text(text);
            console.log('Table from formula', text);
        });

        this.$on('formula:done', () => {
            this.selection.current.focus();
            this.selection.current.setCaret();
        });
    }

    selectCell($cell) {
        this.selection.select($cell);
        this.$emit('table:select', $cell);
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            resizeHandler(event, this);
        } else if (isCell(event)) {
            const $target = $(event.target);
            this.$emit('table:select', $target);

            if (event.shiftKey) {
                const $cells = matrix($target, this.selection.current)
                    .map(id => this.$root.find(`[data-id='${id}']`));
                this.selection.selectGroup($cells);
            } else {
                this.selection.select($target);
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
        this.$emit('table:input', $(event.target));
    }
}
