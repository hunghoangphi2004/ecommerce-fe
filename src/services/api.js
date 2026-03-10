import { request } from "../utils/requestAdmin"

export const get = (path, params) => {
    const query = params
        ? "?" + new URLSearchParams(params).toString()
        : ""

    return request(path + query, {
        method: "GET"
    })
}

export const postFormData = (path, formData) => {
    return request(path, {
        method: "POST",
        body: formData
    })
}


export const post = (path, body) => {
    return request(path, {
        method: "POST",
        ...(body && { body: JSON.stringify(body) })
    })
}

export const patch = (path) => {
    return request(path, {
        method: "PATCH"
    });
};

export const del = (path) => {
    return request(path, {
        method: "DELETE"
    });
};