import axios from "axios";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

function findAll() {
    return axios
        .get(apiBaseUrl + "/api/orders/")
        .then(response => response.data.data);
}

function find(id) {
    return axios
        .get(apiBaseUrl + "/api/orders/" + id)
        .then(response => response.data.data);
}

function findByServiceId(id) {
    return axios
        .get(apiBaseUrl + "/api/orders/service/" + id)
        .then(response => {
            return response.data.data;
        });
}

function findByUserId(id) {
    return axios
        .get(apiBaseUrl + "/api/orders/user/" + id)
        .then(response => response.data.data);
}

function create(order) {
    return axios
        .post(apiBaseUrl + "/api/orders/", order)
        .then(response => response.data.data);
}

function update(id, order) {
    return axios
        .put(apiBaseUrl + "/api/orders/" + id, order)
        .then(response => {
            return response.data.data;
        });
}
function deleteOrder(id) {
    return axios
        .delete(apiBaseUrl + "/api/orders/" + id)
        .then(response => response.data.data);
}

export default {
    findAll,
    find,
    findByServiceId,
    findByUserId,
    create,
    update,
    delete: deleteOrder
}