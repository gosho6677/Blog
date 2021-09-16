export const parse = (query) => {
    return query
        .split(/[?&=]+/g)
        .filter(Boolean)
        .reduce((ac, cur, i, arr) => {
            if(i%2) {
                ac[arr[i-1]] = cur; 
            }
            return ac;
        }, {});
};

export const stringify = (obj) => {
    return Object.entries(obj)
        .map(entry => entry.join('='))
        .join('&');
};
