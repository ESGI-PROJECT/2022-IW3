import { createRequest } from './api';

const request = createRequest();

export function getCart() {
  return request.get("/cart")
    .then(({ data }) => data)
    .catch(console.error);
}

export function postCart(json) {
  return request.post("/cart", json)
    .then(({ data }) => data)
    .catch(console.error);
}
