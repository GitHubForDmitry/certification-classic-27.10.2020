export function setContent (tpl, oKeys) {
    let buffer = tpl;

    Object.keys(oKeys).forEach(key => {
        let regExp = new RegExp(`__${key}__`, 'gi');
        let temp = [];

        if (!Array.isArray(oKeys[key])) oKeys[key] = [oKeys[key]];

        oKeys[key].forEach((item) => {
            /* eslint-disable */
            /**
             * ключи нужно писать с namespace-ами, чтоб небыло пересечений
             */
            switch (key) {
                default:
                    buffer = buffer.replace(regExp, oKeys[key]);
                    break;
            }
        });

        buffer = buffer.replace(regExp, temp.join(''));
    });

    return buffer;
}
