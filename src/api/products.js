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

export function setCart(product) {
  return request.post(`/cart`, { product })
      .then(({ data }) => data)
      .catch(console.error);
}

export function getCart() {
  return request.get(`/cart`)
      .then(({ data }) => data)
      .catch(console.error);
}

export function removeProduct(productId) {
  return request.delete(`/cart/${productId}`)
      .then(({ data }) => data)
      .catch(console.error);
}