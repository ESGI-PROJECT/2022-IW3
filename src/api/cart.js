import { createRequest } from './api';

const request = createRequest();

export function getCart() {
  return request.get("/cart")
    .then(({ data }) => data)
    .catch(console.error);
}

export function updateCart(cart) {
    return request.put("/cart", cart)
      .then(({ data }) => data)
      .catch(console.error);
  }

