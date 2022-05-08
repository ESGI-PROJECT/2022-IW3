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

function showDiv() {
  document.getElementById('alertMessage').style.display = "inline";
}

// localstorage
export async function addCart() {
  try {
    await addBasket(this.product);
    showDiv()
  } catch(e) {
    console.error(e);
  }

}

export function saveBasket(product) {
  localStorage.setItem('basket', JSON.stringify(product))
}

export function getBasket() {
  let basket = localStorage.getItem('basket');

  if (basket === null) {
    return [];
  } else {
    return JSON.parse(basket);
  }
}

export async function addBasket(product) {
  let basket = getBasket();

  let productFound = basket.find(el => el.id === product.id);
  if (productFound != undefined) {
    productFound.quantity++;
  } else {
    product.quantity = 1;
    basket.push(product);
  }
  saveBasket(basket);
}

export function removeBasket(product) {
  let basket = getBasket();

  basket = basket.filter(el => el.id != product.id);
  saveBasket(basket);
  location.reload();
}

export function changeQuantity(product, quantity) {
  let basket = getBasket();

  let productFound = basket.find(el => el.id === product.id);
  if (productFound != undefined) {
    productFound.quantity += quantity;
    if (productFound.quantity <= 0) {
      removeBasket(productFound);
    } else {
      saveBasket(basket);
    }
  }
  location.reload();
}
