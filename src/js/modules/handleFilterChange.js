import { getSearchParams } from 'js#/modules/getSearchParams';

export const initialState = {
    params: {
        brand: [],
        manufacturer: '',
        model: '',
        year: '',
        price: [],
    },
    pagination: {
        sort: '',
        perPage: 6,
        page: 1
    }
}

export const handleFilterChange = ($containers) => {

    $containers.each(function () {
        const $container = $(this);

        const cards = $('[data-card]');

        $(document).on('click', '[data-brand]', function () {
            $(this).find('input').each((index, item) => {
                const brandName = $(item).val();
                if ($(item).is(':checked') && initialState.params.brand.indexOf(brandName) === -1) {
                    initialState.params.brand.push(brandName);
				} else {
						initialState.params.brand = initialState.params.brand.filter(
							(brand) => brand !== brandName
						);
                }
            })
            console.log(initialState);
            getSearchParams(initialState);
        });

        $(document).on('keyup mouseup', '[data-price]', function () {
            $(this).find('input').each((index, item) => {
                const valuePriceFrom = $(this).find('#price-from').val();
                const valuePriceTo = $(this).find('#price-to').val();
                initialState.params.price = [valuePriceFrom, valuePriceTo];
            })
            console.log(initialState);
            getSearchParams(initialState);
        });

        const handleChangeFilterSelect = (filterElement, category) => {
            $(document).on('change', `[data-${filterElement}]`, function () {
                $(this).find('select').each((index, item) => {
                    const selectValue = $(item).val();
                    if (typeof +selectValue === 'number') {
                        initialState[category][filterElement] = selectValue;
                    } else {
                        initialState[category][filterElement] = '';
                    }
                })
                console.log(initialState);
                getSearchParams(initialState);
            });
        };

        handleChangeFilterSelect('manufacturer', 'params');
        handleChangeFilterSelect('model', 'params');
        handleChangeFilterSelect('year', 'params');
        handleChangeFilterSelect('sort', 'pagination');
        handleChangeFilterSelect('per-page', 'pagination');
    })
}