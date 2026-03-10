// const API_URL = 'http://localhost:8000';
const API_URL = process.env.REACT_APP_API_URL;

export const request = async (path, options = {}) => {
    const token = localStorage.getItem("token");
    const isFormData = options.body instanceof FormData;

    const headers = {
        "Accept": "application/json",
        ...(!isFormData && { "Content-type": "application/json" }),
        ...options.headers,
        ...(token && { Authorization: `Bearer ${token}` })
    }

    const response = await fetch(API_URL + path, {
        ...options,
        headers
    });

    const isAuthRoute =
        path.includes("/admin/auth/login") ||
        path.includes("/admin/auth/register") ||
        path.includes("/admin/auth/refresh");

    if (response.status === 401 && !isAuthRoute) {
        return handle401(path, options);
    }

    const data = await response.json();

    if (!response.ok) {
        const error = {
            status: response.status,
            data: data,
            message: data.message || "Có lỗi xảy ra"
        };
        throw error;
    }

    return data;
}

let isRefreshing = false;
let refreshPromise = null;

const handle401 = async (path, options) => {
    if (!isRefreshing) {
        isRefreshing = true;

        refreshPromise = refreshToken()
            .then((newToken) => {
                localStorage.setItem("token", newToken);
                isRefreshing = false;
                return newToken;
            })
            .catch((err) => {
                isRefreshing = false;
                // logout();
                window.location.href = "/login";
                throw err;
            });
    }
    await refreshPromise;

    return request(path, options);
};

const refreshToken = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(API_URL + "/api/admin/auth/refresh", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error("Refresh failed");
    }

    const data = await response.json();

    return data.access_token;
}