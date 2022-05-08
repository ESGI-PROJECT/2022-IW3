import { createRequest } from './api';

const request = createRequest();

export function getCart() {
    return request.get("/carts")
        .then(({ data }) => data)
        .catch(console.error);
}

export function updateCart() {
    return request.put("/carts")
        .then(({ data }) => data)
        .then(console.log(data))
        .catch(console.error);
}