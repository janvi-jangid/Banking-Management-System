import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080",
    timeout: 10000
});

api.interceptors.request.use((config) => {
    try {
        const settings = JSON.parse(localStorage.getItem("justbankSettings"));
        if (settings?.apiUrl) {
            config.baseURL = settings.apiUrl;
        }
    } catch {
        // Keep the default API URL when local preferences are unavailable.
    }

    return config;
});

export function getApiErrorMessage(error, fallback = "Something went wrong. Please try again.") {
    const data = error?.response?.data;

    if (typeof data === "string") {
        return data;
    }

    if (data?.message) {
        return data.message;
    }

    if (error?.code === "ECONNABORTED") {
        return "The server took too long to respond. Please try again.";
    }

    if (!error?.response) {
        return "Cannot connect to the server. Please make sure the backend is running on port 8080.";
    }

    return fallback;
}

export default api;
