export const setDate = iat => {
    return iat && iat.split(/[T.Z]+/g).join(' ').slice(0, -5);
};