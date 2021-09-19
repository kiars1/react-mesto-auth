export const BASE_URL = 'https://auth.nomoreparties.co'

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    } return Promise.reject(`Ошибка: ${res.status}`);
}

export const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            password,
            email,
        }),
    })
        .then(checkResponse)
        .then((data) => {
            return data;
        })
};

export const authorize = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            password,
            email,
        }),
    })
        .then(checkResponse)
        .then((data) => {
            if (data.token) {
                localStorage.setItem("token", data.token);
                return data;
            }
        })
};

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    })
        .then((res) => {
            return res.json();
        })
        .then(checkResponse)
};