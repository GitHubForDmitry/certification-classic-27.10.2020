import goods from 'js#/data/goods';
import { state } from 'js#/modules/handleFilterChange';

export const renderCard = () => {
	const dataCards = $('[data-card]');

	const perPage = state.pagination['per-page'] ? state.pagination['per-page'] * 6 : 6;
	const result = goods
		.slice(0, perPage)
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
		.map(
			(item, index) =>
				` <div class="_cell _cell--12 _sm:cell--6 _lg:cell--4">
            <div class="card">
                <div class="card__top">
                    <div class="card__brand">${item.brand.name}</div>
                        <img src="${item.image.sizes['card-preview']}"
                             alt="${item.image.alt}"
                             class="card__image"
                        />
                    </div>
                <div class="card__bottom">
                    <div class="_grid _justify-between _flex-nowrap _mb-sm">
                        <div class="_gcell">
                            <div class="card__manufacturer">
                                ${item.manufacturer.name}
                            </div>
                        </div>
                    <div class="_gcell">
                        <div class="card__year">${item.year}</div>
                    </div>
                </div>
                <div class="card__model _mb-sm">
                    ${item.model.name}
                </div>
                <div class="_grid _justify-center">
                    <div class="_gcell">
                        <div class="card__price">${item.price.currency.symbol}${item.price.value}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>`
		);

	dataCards.html(result);
};
