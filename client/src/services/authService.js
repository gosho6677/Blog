const baseUrl = 'http://localhost:5000/auth';

export const login = async (email, password) => {
    const url = `${baseUrl}/login`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });
    return response.json();
};

export const register = async (email, username, password) => {
    const url = `${baseUrl}/register`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, username, password })
    });
    return response.json();
};