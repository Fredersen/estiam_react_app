import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

function findAll() {
    return axios
        .get(apiBaseUrl + '/api/categories/')
        .then(response => response.data.data);
}

function find(id) {
    return axios
        .get(apiBaseUrl + '/api/categories/' + id)
        .then(response => response.data.data);
}

function findBySlug(slug) {
    return axios
        .get(apiBaseUrl + '/api/categories/slug/' + slug)
        .then(response => response.data.data);
}

function create(category) {
    return axios
        .post(apiBaseUrl + '/api/categories/', category)
        .then(response => response.data.data);
}

function update(id, category) {
    return axios
        .put(apiBaseUrl + '/api/categories/' + id, category)
        .then(response => response.data.data);
}

function deleteCategory(id) {
    return axios
        .delete(apiBaseUrl + '/api/categories/' + id)
        .then(response => response.data.data);
}

export default {
    findAll,
    find,
    findBySlug,
    create,
    update,
    delete: deleteCategory
}