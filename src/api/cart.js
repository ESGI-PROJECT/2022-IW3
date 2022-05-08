import { createRequest } from './api';

const request = createRequest();

export function getCart() {
  
  return request.get("/cart")
    .then(( {data} ) => data)
    .catch(console.error);
}

export async function putCart(elem) {
  const cart =  await getCart();
  cart.products.push(elem);
  return request.put("/cart", cart)
      .then(( {data} ) => data)
      .catch(console.error);
}

export async function deleteCart(elem) {
  const cart =  await getCart();
  cart.products.push(elem);
  return request.put("/cart", cart)
      .then(( {data} ) => data)
      .catch(console.error);
}