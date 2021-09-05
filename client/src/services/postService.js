const baseUrl = 'http://localhost:5000/posts';

export const getAll = async () => {
    const resp = await fetch(baseUrl);
    return await resp.json();
};