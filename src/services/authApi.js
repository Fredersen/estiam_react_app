import axios from "axios";
import jwtDecode from "jwt-decode";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

function logout() {
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
}

function authenticate(credentials) {
    return axios
        .post(apiBaseUrl + "/api/users/login_check", credentials)
        .then(response => response.data.token)
        .then(token => {
            window.localStorage.setItem("authToken", token);
            setAxiosToken(token);
        }
    );
}

function setAxiosToken(token) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
}

function setup() {
    const token = window.localStorage.getItem("authToken");
    if (token) {
        const { exp: expiration } = jwtDecode(token);
        if (expiration * 1000 > new Date().getTime()) {
            setAxiosToken(token);
        }
    }
}

function isAuthenticated() {
    const token = window.localStorage.getItem("authToken");
    if (token) {
        const { exp: expiration } = jwtDecode(token);
        if (expiration * 3000 > new Date().getTime()) {
            return true;
        }
        return false;
    }
    return false;
}

function retrieveRole() {
    const token = window.localStorage.getItem("authToken");
    if (token) {
        const { roles } = jwtDecode(token);
        return roles;
    }
    return [];
}

function retrieveUserId() {
    const token = window.localStorage.getItem("authToken");
    if (token) {
        const { id } = jwtDecode(token);
        return id;
    }
    return [];
}

export default {
    authenticate,
    logout,
    setup,
    isAuthenticated,
    retrieveRole,
    retrieveUserId,
    setAxiosToken
}