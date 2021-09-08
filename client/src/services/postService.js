const baseUrl = 'http://localhost:5000/posts';
let token = '';

export const initializeToken = (authToken) => {
    token = authToken || '';
};

export const getAll = async (query = '') => {
    const resp = await fetch(`${baseUrl}${query}`);
    return await resp.json();
};

export const getTopThree = async () => {
    const resp = await fetch(`${baseUrl}/top-three-most-liked`);
    return await resp.json();
};

export const getById = async id => {
    const resp = await fetch(`${baseUrl}/${id}`);
    return await resp.json();
};

export const create = async body => {
    const resp = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(body)
    });
    return await resp.json();
};

export const edit = async (body, id) => {
    const resp = await fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(body)
    });
    return await resp.json();
};

export const del = async id => {
    const resp = await fetch(`${baseUrl}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });
    return await resp.json();
};

export const like = async id => {
    const resp = await fetch(`${baseUrl}/like/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    });
    return await resp.json();
};

export const dislike = async id => {
    const resp = await fetch(`${baseUrl}/dislike/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    });
    return await resp.json();
};

export const comment = async (description, id) => {
    const resp = await fetch(`${baseUrl}/comment/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({ description })
    });
    return await resp.json();
};