import { updateCart } from "./api/cart";
import { getCart, setCart } from "./idbHelper";

const badge = document.querySelector(".badge");

const dialog = document.querySelector("dialog");

dialog.querySelector("button").addEventListener("click", async () => {
  if (localStorage.getItem("isInstallShowed") != "true") {
    INSTALL_EVENT.prompt();
  }

  localStorage.setItem("isInstallShowed", "true");

  const { outcome } = await INSTALL_EVENT.userChoice;

  dialog.open = false;
});

let NETWORK_STATE = true;

let INSTALL_EVENT;

document.addEventListener("connection-changed", async ({ detail: state }) => {
  NETWORK_STATE = state;
  const storedCart = await getCart();

  computeCartQty(storedCart);

  if (NETWORK_STATE && storedCart && storedCart.updated) {
    await updateCart(storedCart);
    await setCart({ ...storedCart, updated: 0 });
  }
});

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();

  INSTALL_EVENT = event;
});

export async function addToCart(product) {
  const cart = await getCart();

  const idx = cart.items.findIndex((item) => item.id == product.id);
  if (idx > -1) {
    const product = cart.items[idx];
    product.quantity = product.quantity + 1;

    cart.items[idx] = product;
  } else {
    cart.items.push(product);
  }

  cart.total = computeTotal(cart);

  let updatedCart = { ...cart, updated: 1 };

  if (NETWORK_STATE) {
    updatedCart.updated = 0;
    await updateCart(updatedCart);
  }

  await setCart(updatedCart);

  computeCartQty(updatedCart);

  if (
    localStorage.getItem("isInstallShowed") != "true" &&
    !window.matchMedia("(display-mode: standalone)").matches
  ) {
    setTimeout(() => (dialog.open = true), 2000);
  }
}

function computeTotal(cart) {
  computeCartQty(cart);
  return cart.items.reduce((a, item) => a + item.price * item.quantity, 0);
}

function computeCartQty(cart) {
  if (cart) {
    badge.innerHTML = cart.items.reduce(
      (total, { quantity }) => total + quantity,
      0
    );
  }
}

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

const _updateCart = debounce(updateCart);

export async function updateCartQuantity(product) {
  const cart = await getCart();

  const idx = cart.items.findIndex((item) => item.id === product.id);
  if (idx > -1) {
    cart.items[idx] = {
      ...cart.items[idx],
      quantity: product.quantity,
    };
  }

  cart.total = computeTotal(cart);

  let updatedCard = { ...cart, updated: 1 };

  if (NETWORK_STATE) {
    updatedCard = { ...updatedCard, updated: 0 };
    await _updateCart(updatedCard);
  }

  return await setCart(updatedCard);
}

export async function deleteFromCart(product) {
  const cart = await getCart();

  cart.items = cart.items.filter((item) => item.id !== product.id);

  cart.total = computeTotal(cart);

  let updatedCard = { ...cart, updated: 1 };

  if (NETWORK_STATE) {
    updatedCard = { ...updatedCard, updated: 0 };
    _updateCart(updatedCard);
  }

  return await setCart(updatedCard);
}
