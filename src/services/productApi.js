import axios from "axios";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

function findAll() {
    return axios
        .get(apiBaseUrl + "/api/products/")
        .then(response => response.data.data);
}

function find(id) {
    return axios
        .get(apiBaseUrl + "/api/products/" + id)
        .then(response => response.data.data);
}

function findByCategory(slug) {
    return axios
        .get(apiBaseUrl + "/api/products?category=" + slug)
        .then(response => response.data.data);
}

function create(product) {
    return axios
        .post(apiBaseUrl + "/api/products/", product)
        .then(response => response.data.data);
}

function update(id, product) {
    console.log(product);
    return axios
        .put(apiBaseUrl + "/api/products/" + id, product)
        .then(response => response.data.data);
}

function deleteProduct(id) {
    return axios
        .delete(apiBaseUrl + "/api/products/" + id)
        .then(response => response.data.data);
}

export default {
    findAll,
    findByCategory,
    find,
    create,
    update,
    delete: deleteProduct
}