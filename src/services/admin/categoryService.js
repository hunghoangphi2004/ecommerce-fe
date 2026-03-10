import { get } from "../api";

export const getCategories = async () => {

    const result = await get(`/api/admin/categories`);

    return result;
}
