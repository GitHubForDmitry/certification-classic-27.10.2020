import { state } from 'js#/modules/handleFilterChange';

export const getSearchParams = () => {
	const brand = state.params.brand.length
		? state.params.brand.map((item) => `brand=${item}`).join('')
		: 'brand=';
	const manufacturer = `marka=${state.params.manufacturer}`;
	const model = `filter-model=${state.params.model}`;
	const year = `filter-year=${state.params.year}`;
	const price = state.params.price.length
		? `price-from=${state.params.price[0]}price-to=${state.params.price[1]}`
		: 'price-from=&price-to=';
	const page = `?page${state.pagination.page}`;
	const sort = `sort=${state.pagination.sort}`;
	const perPage = `per_page=${state.pagination['per-page']}`;
	let urlParams;
	const searchParams = [page, year, price, model, manufacturer, brand, sort, perPage];

	for (const item of searchParams) {
		if (item) {
			urlParams = [page, year, price, model, manufacturer, brand, sort, perPage];
		}
		console.log(urlParams.join('&'));
		history.pushState({}, '', urlParams.join('&'));
	}
};
