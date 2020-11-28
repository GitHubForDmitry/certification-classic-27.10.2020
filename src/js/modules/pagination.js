import goods from 'js#/data/goods';
import {state} from 'js#/modules/handleFilterChange';
import {renderCard} from "js#/modules/renderCards";

export const paginationRender = (startPage) => {
    const perPage = state.pagination['per-page'] ? state.pagination['per-page'] * 6 : 6;
    const $container = $('[data-pagination]');
    const goodsLength = goods.length;
    const pages = Math.ceil(goodsLength / perPage);
    $container.each(function () {
        const $this = $(this);
        const renderPagination = [];
        for (let i = 0; i < pages; i++) {
            renderPagination.push(`<li class="pagination__item" aria-current="page" data-pagination-item>
                <a href="#!${i}" class="pagination__number" data-pagination-number="${i + 1}">${i + 1}</a></li>`);
        }

        $this.html(`${prevNext('-1', 'prev')} ${renderPagination.join('')}  ${prevNext('+1', 'next')}`);

    });
    return goods.slice(startPage, perPage + startPage);
};

function prevNext(direction, name) {
    return `<li class="pagination__item" aria-current="page" data-pagination-item> 
				<a href="#!${direction}" class="pagination__number" data-pagination-number="${direction}">${name}</a>
			</li>`
};

export function updatePagination() {
    const pagination = $('[data-actpage]');
    let paginationPage = parseInt(pagination.data('actpage'), 10);

    $(document).on('click', '[data-pagination-number]', function () {

        const $this = $(this);
        let page = $this.data('pagination-number');
        const go = $this.attr('href').replace('#!', '');
		console.log(page)

		if (go === '+1') {
            paginationPage++;

		} else if (go === '-1') {
			paginationPage--;

		} else renderCard((page - 1) * 6);

        pagination.data('actpage', paginationPage);
        renderCard((paginationPage - 1) * 6);

    });
}
