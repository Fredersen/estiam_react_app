import axios from "axios";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

function findAll() {
    return axios
        .get(apiBaseUrl + "/api/address/")
        .then(response => response.data.data);
}

function find(id) {
    return axios
        .get(apiBaseUrl + "/api/address/" + id)
        .then(response => response.data.data);
}

function create(address) {
    return axios
        .post(apiBaseUrl + "/api/address/", address)
        .then(response => response.data.data);
}

function update(id, address) {
    return axios
        .put(apiBaseUrl + "/api/address/" + id, address)
        .then(response => response.data.data);
}

function deleteAddress(id) {
    return axios
        .delete(apiBaseUrl + "/api/address/" + id)
        .then(response => response.data.data);
}

export default {
    findAll,
    find,
    create,
    update,
    delete: deleteAddress
}