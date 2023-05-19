import axios from "axios";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

function findAll() {
    return axios.get(apiBaseUrl + "/api/users/")
        .then(response => response.data.data);
}

function find(id) {
    return axios.get(apiBaseUrl + "/api/users/" + id)
        .then(response => response.data.data);
}

function create(user) {
    return axios.post(apiBaseUrl + "/api/users/", user)
        .then(response => response.data);
}

function update(id, user) {
    return axios.put(apiBaseUrl + "/api/users/" + id, user)
        .then(response => response.data.data);
}

function deleteUser(id) {
    return axios.delete(apiBaseUrl + "/api/users/" + id)
        .then(response => response.data);
}

export default {
    findAll,
    find,
    create,
    update,
    delete: deleteUser
}