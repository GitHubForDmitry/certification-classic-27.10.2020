import goods from 'js#/data/goods';
import {state} from 'js#/modules/handleFilterChange';

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
        .map(item => {

            const {brand, year, image, manufacturer, model, price} = item;
            const {name: brandName} = brand;

            const {value: priceValue, currency} = price;
            const {symbol} = currency;
            const {name: modelName} = model;
            const {sizes, alt} = image;

            const {'card-preview': cardPreview} = sizes;
            const {name: marka} = manufacturer;

            const result2 =
                template(window.templateCard, {
                    brand,
                    year,
                    image,
                    marka,
                    sizes,
                    alt,
                    modelName,
                    cardPreview,
                    symbol,
                    priceValue,
                    brandName
                });

            return result2;
        }).join('');

    dataCards.html(result);

    function template(templateid, data) {
        return templateid
            .replace(
                /%(\w*)%/g, // or /{(\w*)}/g for "{this} instead of %this%"
                function (m, key) {
                    return data.hasOwnProperty(key) ? data[key] : "";
                }
            );
    }
};
