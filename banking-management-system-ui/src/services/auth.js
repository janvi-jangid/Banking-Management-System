const AUTH_KEY = "novabankAuth";

export function getAuthUser() {
    try {
        return JSON.parse(localStorage.getItem(AUTH_KEY));
    } catch {
        return null;
    }
}

export function isAuthenticated() {
    return Boolean(getAuthUser());
}

export function saveAuthUser(username, message = "Login Successful") {
    const user = {
        username,
        message,
        loginAt: new Date().toISOString()
    };

    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    localStorage.setItem("loginMessage", message);

    return user;
}

export function clearAuthUser() {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem("loginMessage");
}
