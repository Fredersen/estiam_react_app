import axios from "axios";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

function findAll() {
    return axios
        .get(apiBaseUrl + "/api/order-details/")
        .then(response => response.data.data);
}

function find(id) {
    return axios
        .get(apiBaseUrl + "/api/order-details/" + id)
        .then(response => response.data.data);
}

function findByOrderId(id) {
    return axios
        .get(apiBaseUrl + "/api/order-details/order/" + id)
        .then(response => response.data.data);
}

function create(orderDetail) {
    return axios
        .post(apiBaseUrl + "/api/order-details/", orderDetail)
        .then(response => response.data.data);
}

function update(id, orderDetail) {
    return axios
        .put(apiBaseUrl + "/api/order-details/" + id, orderDetail)
        .then(response => response.data.data);
}

function deleteOrderDetail(id) {
    return axios
        .delete(apiBaseUrl + "/api/order-details/" + id)
        .then(response => response.data.data);
}

export default {
    findAll,
    find,
    findByOrderId,
    create,
    update,
    delete: deleteOrderDetail
}