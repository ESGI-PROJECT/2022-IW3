import { createRequest } from './api';

const request = createRequest();

export function getProducts() {
    return request.get("/products")
        .then(({ data }) => data)
        .catch(console.error);
}

export function getProduct(productId) {
    return request.get(`/products/${productId}`)
        .then(({ data }) => data)
        .catch(console.error);
}

export function setProduct(product) {
    return request.post("/products", product)
        .then(({ data }) => data)
        .catch(console.error);
}

export function setChart(product) {
    return request.post(`/cart`, { product })
        .then(({ data }) => data)
        .catch(console.error);
}

export function getChart() {
    return request.get(`/cart`)
        .then(({ data }) => data)
        .catch(console.error);
}

//function delete product from cart
export function deleteProduct(productId) {
    return request.delete(`/cart/${productId}`)
        .then(({ data }) => data)
        .catch(console.error);
}