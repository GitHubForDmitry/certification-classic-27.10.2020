
import { state } from 'js#/modules/handleFilterChange';
import { paginationRender } from 'js#/modules/pagination';

export const renderCard = (startPage = 0) => {
	const dataCards = $('[data-card]');
	const currentPagination = paginationRender(startPage);
	const result = currentPagination
		.filter((item) => {
			const buff = [];

			if (state.params.brand.length) {
				buff.push(state.params.brand.includes(`${item.brand.id}`));
			}

			if (state.params.manufacturer) {
				buff.push(state.params.manufacturer.includes(`${item.manufacturer.id}`));
			}

			if (state.params.model) {
				buff.push(state.params.model.includes(`${item.model.id}`));
			}

			if (state.params.price.length) {
				buff.push(
					state.params.price[0] <= item.price.value &&
						state.params.price[1] >= item.price.value
				);
			}

			return buff.every(Boolean);
		})
		.sort((a, b) => {
			if (state.pagination.sort) {
				switch (state.pagination.sort) {
					case '1':
						return parseFloat(a.price.value) - parseFloat(b.price.value);
					case '2':
						return parseFloat(b.price.value) - parseFloat(a.price.value);
					case '3':
						return parseFloat(a.year) - parseFloat(b.year);
					case '4':
						return parseFloat(b.year) - parseFloat(a.year);
					default:
						return 0;
				}
			}
		})
		.map((item) => {
			const { brand, year, image, manufacturer, model, price } = item;
			const { name: brandName } = brand;

			const { value: priceValue, currency } = price;
			const { symbol } = currency;
			const { name: modelName } = model;
			const { sizes, alt } = image;

			const { 'card-preview': cardPreview } = sizes;
			const { name: manufacturerCar } = manufacturer;

			return template(window.templateCard, {
				brand,
				year,
				image,
				manufacturerCar,
				sizes,
				alt,
				modelName,
				cardPreview,
				symbol,
				priceValue,
				brandName
			});
		});

	const renderResult = result.length
		? result.join('')
		: '<h2>К сожалению по Вашему запросу ничего не найдено</h2>';

	dataCards.html(renderResult);

	function template(templateid, data) {
		return templateid.replace(
			/%(\w*)%/g,
			function (m, key) {
				return data.hasOwnProperty(key) ? data[key] : '';
			}
		);
	}
};
