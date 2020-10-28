import { initialState } from 'js#/modules/handleFilterChange';

export const getSearchParams = () => {
    const brand = !!initialState.params.brand.length ? initialState.params.brand.map(item => `brand=${item}`).join('') : 'brand=';
    const manufacturer = `marka=${initialState.params.manufacturer}`;
    const model = `filter-model=${initialState.params.model}`;
    const year = `filter-year=${initialState.params.year}`;
    const price = !!initialState.params.price.length ?
        `price-from=${initialState.params.price[0]}price-to=${initialState.params.price[1]}`
        : 'price-from=&price-to=';
    const page = `?page${initialState.pagination.page}`;
    const sort = `sort=${initialState.pagination.sort}`;
    const perPage = `per_page=${initialState.pagination.perPage}`;
    let urlParams;
    const searchParams = [page, year, price, model, manufacturer, brand, sort, perPage];
    for (const item of searchParams) {
        if (!!item) {
            urlParams = [page, year, price, model, manufacturer, brand, sort, perPage];
        }
        console.log(urlParams.join('&'));
        history.pushState({}, '', urlParams.join('&'));

    }
}
