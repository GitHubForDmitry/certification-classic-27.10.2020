import { getSearchParams } from 'js#/modules/getSearchParams';
import { renderCard } from 'js#/modules/renderCards';

export const state = {
	params: {
		brand: [],
		manufacturer: '',
		model: '',
		year: '',
		price: []
	},
	pagination: {
		sort: '',
		perPage: 6,
		page: 1
	}
};

export const handleFilterChange = ($containers) => {
	$containers.each(function () {
		$(document).on('click', '[data-brand]', function () {
			$(this)
				.find('input')
				.each((index, item) => {
					const brandName = $(item).val();
					if (
						$(item).is(':checked') &&
						state.params.brand.indexOf(brandName) === -1
					) {
						state.params.brand.push(brandName);
					} else {
						state.params.brand = state.params.brand.filter(
							(brand) => brand !== brandName
						);
					}
				});
			console.log(state);
			getSearchParams(state);
			renderCard(state);
		});

		$(document).on('keyup mouseup', '[data-price]', function () {
			$(this)
				.find('input')
				.each((index, item) => {
					const valuePriceFrom = $(this).find('#price-from').val();
					const valuePriceTo = $(this).find('#price-to').val();
					state.params.price = [valuePriceFrom, valuePriceTo];
				});
			console.log(state);
			getSearchParams(state);
			renderCard(state);
		});

		const handleChangeFilterSelect = (filterElement, category) => {
			$(document).on('change', `[data-${filterElement}]`, function () {
				$(this)
					.find('select')
					.each((index, item) => {
						const selectValue = $(item).val();
						if (typeof +selectValue === 'number') {
							state[category][filterElement] = selectValue;
						} else {
							state[category][filterElement] = '';
						}
					});
				console.log(state);
				getSearchParams(state);
				renderCard(state);
			});
		};

		handleChangeFilterSelect('manufacturer', 'params');
		handleChangeFilterSelect('model', 'params');
		handleChangeFilterSelect('year', 'params');
		handleChangeFilterSelect('sort', 'pagination');
		handleChangeFilterSelect('per-page', 'pagination');
	});
};
