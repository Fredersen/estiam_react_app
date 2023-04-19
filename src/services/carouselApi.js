import axios from "axios";
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

function findAll() {
    return axios
        .get(apiBaseUrl + "/api/carousel/")
        .then(response => response.data.data);
}

function find(id) {
    return axios
        .get(apiBaseUrl + "/api/carousel/" + id)
        .then(response => response.data.data);
}

function create(carousel) {
    return axios
        .post(apiBaseUrl + "/api/carousel/", carousel)
        .then(response => response.data.data);
}

function update(id, carousel) {
    return axios
        .put(apiBaseUrl + "/api/carousel/" + id, carousel)
        .then(response => response.data.data);
}

function deleteCarousel(id) {
    return axios
        .delete(apiBaseUrl + "/api/carousel/" + id)
        .then(response => response.data.data);
}

export default {
    findAll,
    find,
    create,
    update,
    delete: deleteCarousel
}