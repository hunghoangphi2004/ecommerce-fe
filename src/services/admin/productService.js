import { get, postFormData, del, patch} from "../api";

export const getProducts = async (params) => {
    let query = `?page=${params.page}&limit=${params.limit}`;

    if (params.search) {
        query += `&search=${params.search}`;
    }

    if (params.status !== "") {
        query += `&status=${params.status}`;
    }

    if (params.category_id) {
        query += `&category_id=${params.category_id}`;
    }

    const result = await get(`/api/admin/products${query}`);

    return result;
}


export const getProduct = async (id) => {
    const result = await get(`/api/admin/products/detail/${id}`);

    return result;
}

export const createProduct = async (formData) => {
    const result = await postFormData(`/api/admin/products/create`, formData);

    return result;
}

export const updateProduct = async (id, formData) => {

    formData.append("_method", "PATCH");

    return await postFormData(`/api/admin/products/edit/${id}`, formData);
}

export const deleteProduct = async (id) => {
    const result = del(`/api/admin/products/delete/${id}`);

    return result;
}

export const changeStatusProduct = async (id) => {
    const result = patch(`/api/admin/products/change-status/${id}`);

    return result;
}