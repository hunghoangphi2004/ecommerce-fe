import { get } from "../api";

export const getHome = async () => {
    const result = await get('/api/home');
    return result;
}
