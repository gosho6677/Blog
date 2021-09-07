const baseUrl = 'http://localhost:5000/posts';
let token = '';

export const initializeToken = (authToken) => {
    token = authToken || '';
};

export const getAll = async () => {
    const resp = await fetch(baseUrl);
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
    return resp.json();
};

export const del = async id => {
    const resp = await fetch(`${baseUrl}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });
    return resp.json();
};