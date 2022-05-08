import page from 'page';
import checkConnectivity from 'network-latency';
import { setRessources, setRessource, getRessources, getRessource, setCartRessource, getCartRessources } from './idbHelper';

import { getProducts, getProduct } from './api/products';
import "./views/app-home";
import './components/cart-button';
import { getCart } from './api/cart';
import { clearOfflineData, getOfflineData } from './api/offline';
import { OfflineManager } from './components/OfflineManager.js';

(async (root) => {
  const skeleton = root.querySelector('.skeleton');
  const main = root.querySelector('main');

  checkConnectivity({
    timeToCount: 3,
    threshold: 2000,
    interval: 3000
  });

  let NETWORK_STATE = true;

  const AppHome = main.querySelector('app-home');
  const AppProduct = main.querySelector('app-product');
  const AppCart = document.body.querySelector('app-cart');

  let activeApp = null;

  async function refreshOfflineData() {
    const offlineData = await getOfflineData();
    if (NETWORK_STATE) {
      await import('./components/OfflineManager.js');

      if (offlineData.actions.length) {
        const offlineManager = new OfflineManager();
        offlineData.actions.forEach(action => {
          if (action.source === 'cart') {
            offlineManager.addAction(action);
          }
        });
        offlineManager.processActions();
      }
    }
  }


  refreshOfflineData();
  document.addEventListener('connection-changed', ({ detail: state }) => {
    NETWORK_STATE = state;
    if (activeApp && typeof activeApp.changeNetworkState === 'function') {
      activeApp.changeNetworkState(NETWORK_STATE);
    }

    if (state) {
      document.documentElement.style.setProperty('--app-bg-color', 'royalblue');
      refreshOfflineData();
    } else {
      document.documentElement.style.setProperty('--app-bg-color', '#858994');
    }
  });

  page('*', (ctx, next) => {
    skeleton.removeAttribute('hidden');

    AppHome.active = false;
    AppProduct.active = false;

    next();
  });

  page('/', async (ctx) => {
    const products = await getProducts();

    let storedProducts = []
    
    if (NETWORK_STATE) {
      const products = await getProducts();
      storedProducts = await setRessources(products);
    } else {
      storedProducts = await getRessources();
    }

    AppHome.products = storedProducts;
    AppHome.active = true;

    activeApp = AppHome;
    skeleton.setAttribute('hidden', '');
  });

  page('/product/:id', async ({ params }) => {
    await import('./views/app-product.js');
    const product = await getProduct(params.id);

    let storedProduct = {};

    if (NETWORK_STATE) {
      storedProduct = await setRessource(product);
    } else {
      storedProduct = await getRessource(params.id);
    }

    AppProduct.product = storedProduct;
    AppProduct.active = true;

    activeApp = AppProduct;
    skeleton.setAttribute('hidden', '');
  });

  page('/cart', async ({ params }) => {
    await import('./views/app-cart.js');

    const cartProducts = [];
    let storedProducts = [];
    let storedCart = {};
    
    if (NETWORK_STATE) {
      const cart = await getCart();

      for (let index in cart.products) {
        const productId = cart.products[index];
        const product = await getProduct(productId);
        cartProducts.push(product);
      }

      storedCart = await setCartRessource(cart);
    } else {
      storedProducts = await getRessources();
      storedCart = await getCartRessources();
    }

    AppCart.products = cartProducts;
    AppCart.networdState = NETWORK_STATE;
    AppCart.active = true;
    
    activeApp = AppCart;
    skeleton.setAttribute('hidden', '');
  });

  page();

})(document.querySelector('#app'));
