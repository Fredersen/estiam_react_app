import axios from "axios";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

function findAll() {
    return axios
        .get(apiBaseUrl + "/api/carriers/")
        .then(response => response.data.data);
}

function find(id) {
    return axios
        .get(apiBaseUrl + "/api/carriers/" + id)
        .then(response => response.data.data);
}

function create(carrier) {
    console.log(carrier)
    return axios
        .post(apiBaseUrl + "/api/carriers/", carrier)
        .then(response => response.data.data);
}

function update(id, carrier) {
    return axios
        .put(apiBaseUrl + "/api/carriers/" + id, carrier)
        .then(response => response.data.data);
}

function deleteCarrier(id) {
    return axios
        .delete(apiBaseUrl + "/api/carriers/" + id)
        .then(response => response.data.data);
}

export default {
    findAll,
    find,
    create,
    update,
    delete: deleteCarrier
}
