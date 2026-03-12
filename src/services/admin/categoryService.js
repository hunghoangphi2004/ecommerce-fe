import { get, postFormData, del, patch} from "../api";

export const getCategories = async () => {

    const result = await get(`/api/admin/categories?limit=1000`);

    return result;
}

export const getCategoriesWithParams = async (params) => {
    let query = `?page=${params.page}&limit=${params.limit}`;

    if (params.search) {
        query += `&search=${params.search}`;
    }

    if (params.status !== "") {
        query += `&status=${params.status}`;
    }

    const result = await get(`/api/admin/categories${query}`);

    return result;
}

export const getCategory = async (id) => {
    const result = await get(`/api/admin/categories/detail/${id}`);

    return result;
}

export const createCategory = async (formData) => {
    const result = await postFormData(`/api/admin/categories/create`, formData);

    return result;
}

export const updateCategory = async (id, formData) => {

    formData.append("_method", "PATCH");

    return await postFormData(`/api/admin/categories/edit/${id}`, formData);
}

export const deleteCategory = async (id) => {
    const result = del(`/api/admin/categories/delete/${id}`);

    return result;
}

export const changeStatusCategory = async (id) => {
    const result = patch(`/api/admin/categories/change-status/${id}`);

    return result;
}