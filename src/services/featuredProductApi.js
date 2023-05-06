import axios from "axios";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

function findAll() {
    return axios
        .get(apiBaseUrl + "/api/featured-products/")
        .then(response => response.data.data);
}

function find(id) {
    return axios
        .get(apiBaseUrl + "/api/featured-products/" + id)
        .then(response => response.data.data);
}

function create(featuredProduct) {
    return axios
        .post(apiBaseUrl + "/api/featured-products/", featuredProduct)
        .then(response => response.data.data);
}

function update(id, featuredProduct) {
    return axios
        .put(apiBaseUrl + "/api/featured-products/" + id, featuredProduct)
        .then(response => response.data.data);
}

function deleteFeaturedProduct(id) {
    return axios
        .delete(apiBaseUrl + "/api/featured-products/" + id)
        .then(response => response.data.data);
}

function addProductToFeaturedProduct(id, productId) {
    return axios
        .patch(apiBaseUrl + "/api/featured-products/add-product/" + id + "/" + productId)
        .then(response => response.data.data);
}

function deleteProductFromFeaturedProduct(id, productId) {
    return axios
        .patch(apiBaseUrl + "/api/featured-products/remove-product/" + id + "/" + productId)
        .then(response => response.data.data);
}

export default {
    findAll,
    find,
    create,
    update,
    delete: deleteFeaturedProduct,
    deleteProductFromFeaturedProduct,
    addProductToFeaturedProduct
}