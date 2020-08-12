import { $ } from '@core/dom';

export function resizeHandler(event, { $root }) {
    return new Promise(resolve => {
        const $resizer = $(event.target);
        const type = $resizer.data.resize;
        const $parent = $resizer.closest('[data-type="resizable"]');
        const coords = $parent.getCoords();
        if (type === 'col') {
            resizeCol($parent, $resizer, coords, $root, resolve);
        } else if (type === 'row') {
            resizeRow($parent, $resizer, coords, resolve);
        }
    });
}

function resizeCol($parent, $resizer, coords, $root, resolve) {
    const col = $parent.data.col;
    const cells = $root.findAll(`[data-col="${col}"]`);
    let delta = null;
    let calcWidth = delta + coords.width;
    const line = $.create('div', 'col-resize--active');
    $resizer.append(line);
    line.css({ height: '100vh' });

    document.onmousemove = e => {
        delta = e.pageX - coords.right;
        calcWidth = delta + coords.width;
        $resizer.css({ right: -delta + 'px' });
    };

    document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
        $resizer.css({ right: 0 });
        $resizer.remove('.col-resize--active');
        const width = calcWidth + 'px';
        $parent.css({ width });
        cells.forEach(el => el.style.width = calcWidth + 'px');

        resolve({
            value: calcWidth,
            id: $parent.data.col,
            type: 'col'
        });
    };
}

function resizeRow($parent, $resizer, coords, resolve) {
    let delta = null;
    let calcHeight = delta + coords.height;
    const line = $.create('div', 'row-resize--active');
    $resizer.append(line);
    line.css({ width: '100vw' });

    document.onmousemove = e => {
        $resizer.css({ bottom: -delta + 'px' });
        delta = e.pageY - coords.bottom;
        calcHeight = delta + coords.height;
    };

    document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
        $resizer.css({ bottom: 0 });
        $resizer.remove('.row-resize--active');
        $parent.$el.style.height = calcHeight + 'px';

        resolve({
            value: calcHeight,
            id: $parent.data.row,
            type: 'row'
        });
    };
}
