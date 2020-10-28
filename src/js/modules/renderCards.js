import goods from 'js#/data/goods';
import { initialState } from 'js#/modules/handleFilterChange';

export const renderCard = (state) => {
    const dataCard = $('[data-card]');

    const result = goods.slice(0, initialState.pagination.perPage * initialState.pagination.page)
        .filter(item => {
            const buff = [];

            if (initialState.params.brand.length) {
                buff.push(initialState.params.brand.includes(`${item.brand.id}`));
            }

            if (initialState.params.manufacturer) {
                buff.push(initialState.params.manufacturer.includes(`${item.manufacturer.id}`));
            }

            if (initialState.params.model) {
                buff.push(initialState.params.model.includes(`${item.model.id}`));
            }

            if (initialState.params.price.length) {
                buff.push(initialState.params.price[0] <= item.price.value && initialState.params.price[1] >= item.price.value);
            }

            console.log(buff, 'buff')
            console.log(initialState.params, 'initialState')
                return buff.every(Boolean)
        } )

        //
        // .filter(item => !!initialState.params.manufacturer ? initialState.params.manufacturer.includes(`${item.manufacturer.id}`) : true)
        // .filter(item => !!initialState.params.model ? initialState.params.model.includes(`${item.model.id}`) : true)
        // .filter(item => !!initialState.params.year ? initialState.params.year.includes(`${item.year}`) : true)
        // .filter(item => !!initialState.params.price.length ? initialState.params.price > item.price.value  : true)

        .map((item, index) => (
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
    ))


    console.log(initialState.params.brand)
    console.log(goods)
    dataCard.html(result)
}
