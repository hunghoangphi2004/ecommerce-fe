import { post, postFormData } from "../api";


export const login = async (email, password) => {
    const result = await post('/api/auth/login', { email, password });
    return result;
}


export const register = async (body, avatar) => {
    const formData = new FormData();
    Object.keys(body).forEach((key) => {
        formData.append(key, body[key]);
    })

    if (avatar) {
        formData.append("avatar", avatar);
    }

    return await postFormData('/api/auth/register', formData);
}

export const logout = async () => {
    const result = await post('/api/auth/logout');
    return result;
}