import page from 'page';
import checkConnectivity from 'network-latency';
import { setRessources, setRessource, getRessources, getRessource, setCartRessource, getCartRessources } from './idbHelper';

import { getProducts, getProduct, getCart, updateCart } from './api/products';
import "./views/app-home";

(async (root) => {
  const skeleton = root.querySelector('.skeleton');
  const main = root.querySelector('main');

  checkConnectivity({
    timeToCount: 3,
    threshold: 2000,
    interval: 3000
  });

  let NETWORK_STATE = true;
  let UPDATE_API = false;

  document.addEventListener('connection-changed', async ({ detail: state }) => {
    NETWORK_STATE = state;

    if (state) {
      document.documentElement.style.setProperty('--app-bg-color', 'royalblue');

      if (UPDATE_API) {
        let storedCartItems = await getCartRessources();
        await updateCart(storedCartItems);
        UPDATE_API = false;
      }
    } else {
      document.documentElement.style.setProperty('--app-bg-color', '#858994');
      UPDATE_API = true;
    }
  });

  const AppHome = main.querySelector('app-home');
  const AppProduct = main.querySelector('app-product');
  const AppCheckout = main.querySelector('app-checkout');

  page('*', (ctx, next) => {
    skeleton.removeAttribute('hidden');

    AppHome.active = false;
    AppProduct.active = false;
    AppCheckout.active = false;
    
    next();
  });

  page('/', async (ctx) => {
    const products = await getProducts();

    let storedProducts = [];
    let storedCartItems = [];
    
    if (NETWORK_STATE) {
      const products = await getProducts();
      storedProducts = await setRessources(products);

      storedCartItems = await getCart();
      storedCartItems = await setCartRessource(storedCartItems);
    } else {
      storedProducts = await getRessources();
      storedCartItems = await getCartRessources();
    }

    AppHome.products = storedProducts;

    AppHome.active = true;

    skeleton.setAttribute('hidden', '');
  });

  page('/product/:id', async ({ params }) => {
    await import('./views/app-product.js');
    const product = await getProduct(params.id);

    let storedProduct = {};
    let storedCartItems = [];

    if (NETWORK_STATE) {
      storedProduct = await setRessource(product);

      storedCartItems = await getCart();
      storedCartItems = await setCartRessource(storedCartItems);
    } else {
      storedProduct = await getRessource(params.id);
      storedCartItems = await getCartRessources();
    }

    AppProduct.product = storedProduct;

    AppProduct.active = true;
    skeleton.setAttribute('hidden', '');
  });

  page('/cart', async ({ params }) => {
    await import('./views/app-checkout.js');

    let storedCart = {};

    if (NETWORK_STATE) {
      storedCart = await getCart();
      storedCart = await setCartRessource(storedCart);
    } else {
      storedCart = await getCartRessources();
    }

    AppCheckout.storedCart = storedCart;
    AppCheckout.active = true;
    skeleton.setAttribute('hidden', '');
  });

  page();

})(document.querySelector('#app'));
