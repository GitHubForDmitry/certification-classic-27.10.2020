export const handleFilterChange = ($containers) => {
    const initialState = {
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

    $containers.each(function () {
        const $container = $(this);

        const cards = $('[data-card]');

        $(document).on('click', '[data-brand]', function () {
            const inputs = $(this).find('input');
            inputs.each((index, item) => {
                const brandName = $(item).next().text();
                if ($(item).is(':checked') && initialState.params.brand.indexOf(brandName) === -1) {
                    initialState.params.brand.push(brandName);
				} else {
					initialState.params.brand = initialState.params.brand.filter((brand) => brand !== brandName);
                }
            })
            console.log(initialState)
        });

        $(document).on('keyup mouseup', '[data-price]', function () {
            const inputs = $(this).find('input');
            inputs.each((index, item) => {
                const valuePriceFrom = $(this).find('#price-from').val();
                const valuePriceTo = $(this).find('#price-to').val();
                initialState.params.price = [valuePriceFrom, valuePriceTo];
            })
            console.log(initialState)
        });

        const handleChangeFilterSelect = (filterElement, category) => {
            $(document).on('change', `[data-${filterElement}]`, function () {
                const select = $(this).find('select');
                select.each((index, item) => {
                    const selectValue = $(item).val();
                    if (typeof +selectValue === 'number') {
                        initialState[category][filterElement] = selectValue;
                    } else {
                        initialState[category][filterElement] = '';
                    }
                })
                console.log(initialState)
            });
        };

        handleChangeFilterSelect('manufacturer', 'params');
        handleChangeFilterSelect('model', 'params');
        handleChangeFilterSelect('year', 'params');
        handleChangeFilterSelect('sort', 'pagination');
        handleChangeFilterSelect('per-page', 'pagination');
    })
}