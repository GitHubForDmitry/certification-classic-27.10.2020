import goods from 'js#/data/goods';
import { state } from 'js#/modules/handleFilterChange';

export const paginationRender = (number) => {
	const perPage = state.pagination['per-page'] ? state.pagination['per-page'] * 6 : 6;
	const $container = $('[data-pagination]');
	const goodsLength = goods.length;
	let page = 0;
	page = page > 0 ? page * 6 : page;
	const pages = Math.ceil(goodsLength / perPage);
	$container.each(function () {
		const $this = $(this);
		const renderPagination = [];
		for (let i = 0; i < pages; i++) {
			renderPagination.push(`<li class="pagination__item" aria-current="page" data-pagination-item>
                <a href="#" class="pagination__number" data-pagination-number>${i + 1}</a></li>`);
		}
		$this.html(renderPagination.join(''));
	});

	return goods.slice(number > 0 ? number * 6 : page, perPage);
};

export function updatePagination(page, goods) {
	$(document).on('click', '[data-pagination-item]', function () {
		const $this = $(this);

		page = +$this.text().trim();
        paginationRender(page, goods);
	});
}
