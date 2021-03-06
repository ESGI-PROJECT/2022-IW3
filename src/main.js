import page from "page";
import checkConnectivity from "network-latency";
import {
  setRessources,
  setRessource,
  getRessources,
  getRessource,
  setCart,
  getCart as getCartFromIdb,
} from "./idbHelper";

import { getProducts, getProduct } from "./api/products";
import "./views/app-home";
import { getCart } from "./api/cart";
import { getAuthState, getUser } from "./firebase";

(async (root) => {
  const skeleton = root.querySelector(".skeleton");
  const main = root.querySelector("main");

  checkConnectivity({
    timeToCount: 3,
    threshold: 2000,
    interval: 3000,
  });

  let NETWORK_STATE = true;

  document.addEventListener("connection-changed", ({ detail: state }) => {
    NETWORK_STATE = state;

    if (state) {
      document.documentElement.style.setProperty("--app-bg-color", "royalblue");
    } else {
      document.documentElement.style.setProperty("--app-bg-color", "#858994");
    }
  });

  const AppHome = main.querySelector("app-home");
  const AppProduct = main.querySelector("app-product");
  const AppCart = main.querySelector("app-cart");
  const AppLogin = main.querySelector("app-login");

  let isUserLogged = getUser();

  getAuthState((user) => {
    isUserLogged = user;

    if (isUserLogged) {
      const queryString = new URLSearchParams(location.search);

      return page(queryString.get("from") || location.pathname);
    }
    page(`/login?from=${location.pathname}`);
  });

  page("*", async (ctx, next) => {
    skeleton.removeAttribute("hidden");

    AppHome.active = false;
    AppProduct.active = false;
    AppCart.active = false;

    let cartData = {};

    if (NETWORK_STATE) {
      cartData = await getCart();
    }

    await setCart({
      items: [],
      total: 0,
      updated: 0,
      ...cartData,
    });

    if (!isUserLogged && ctx.pathname != "/login") {
      return;
    }

    next();
  });

  page("/", async (ctx) => {
    const products = await getProducts();

    let storedProducts = [];

    if (NETWORK_STATE) {
      const products = await getProducts();
      storedProducts = await setRessources(products);
    } else {
      storedProducts = await getRessources();
    }

    AppHome.products = storedProducts;

    AppHome.active = true;

    skeleton.setAttribute("hidden", "");
  });

  page("/product/:id", async ({ params }) => {
    await import("./views/app-product.js");
    const product = await getProduct(params.id);

    let storedProduct = {};

    if (NETWORK_STATE) {
      storedProduct = await setRessource(product);
    } else {
      storedProduct = await getRessource(params.id);
    }

    AppProduct.product = { ...storedProduct };

    AppProduct.active = true;
    skeleton.setAttribute("hidden", "");
  });

  page("/cart", async () => {
    await import("./views/app-cart.js");

    const storedCart = await getCartFromIdb();

    AppCart.active = true;
    AppCart.cart = storedCart;
    skeleton.setAttribute("hidden", "");
  });

  page("/login", async () => {
    await import("./views/app-login.js");

    AppLogin.active = true;
    skeleton.setAttribute("hidden", "");
  });

  page();
})(document.querySelector("#app"));
