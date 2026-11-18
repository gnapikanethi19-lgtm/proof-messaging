
const API = "http://127.0.0.1:8787";

export async function apiRequest(path, options = {}, token = null) {

    const savedToken = token || localStorage.getItem("token");

    const isAuthRequest =
        path.includes("/auth/login") ||
        path.includes("/auth/signup");

    const response = await fetch(`${API}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
            ...(!isAuthRequest && savedToken
                ? { Authorization: `Bearer ${savedToken}` }
                : {})
        }
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || data.message || "Something went wrong");
    }

    return data;
}

export { API };
