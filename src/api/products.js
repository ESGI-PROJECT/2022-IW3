import { createRequest } from './api';
import checkConnectivity from 'network-latency';
import { setRessources, setRessource, getRessources, getRessource, setCartRessource, getCartRessources } from '../idbHelper';

checkConnectivity({
  timeToCount: 3,
  threshold: 2000,
  interval: 3000
});

let NETWORK_STATE = true;

document.addEventListener('connection-changed', ({ detail: state }) => {
  NETWORK_STATE = state;

  if (state) {
    document.documentElement.style.setProperty('--app-bg-color', 'royalblue');
  } else {
    document.documentElement.style.setProperty('--app-bg-color', '#858994');
  }
});

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

export function getCart() {
  return request.get(`/cart`)
  .then(({ data }) => data)
  .catch(console.error);
}

export function updateCart(cart) {
  return request.put(`/cart/1`, {
    products: cart[0].products,
    total: cart[0].products.length,
  });
}

function removeProduct(cart, productId) {
  let products = cart[0].products;
  for(let nbrProduct = 0; nbrProduct < products.length; nbrProduct++) {
    if(products[nbrProduct].id === productId) {
      delete products[nbrProduct];
      cart[0].products = products.filter(Boolean);
      cart[0].total--;
      return cart;
    }
  }

  return cart;
}

export async function removeItemFromCart(productId) {
  let cart = [];

  if (NETWORK_STATE) {
    cart = await getCart();
    let updatedCart = await updateCart(
      removeProduct(cart, productId)
    );
    await setCartRessource([updatedCart.data]);
  } else {
    cart = await getCartRessources();
    await setCartRessource(
      removeProduct(cart, productId)
    );
  }
}

export async function addItemToCart(productId) {
  let storedCart = [];
  let product = [];

  if (NETWORK_STATE) {
    storedCart = await getCart();
    product = await getProduct(productId);
    storedCart[0].products.push(product);
    storedCart[0].total++;
    let updatedCart = await updateCart(storedCart);
    await setCartRessource([updatedCart.data]);
  } else {
    storedCart = await getCartRessources();
    product = await getRessource(productId);
    storedCart[0].products.push(product);
    storedCart[0].total++;
    await setCartRessource(storedCart);
  }
}
