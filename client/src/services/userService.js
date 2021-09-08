import { token } from "./postService";

export const getCurrentUser = async username => {
    const resp = await fetch(`http://localhost:5000/user/${username}`, {
        headers: {
            'Authorization': token
        }
    });
    return resp.json();
};