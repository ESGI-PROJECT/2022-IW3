import page from 'page';
import checkConnectivity from 'network-latency';
import { setRessources, setRessource, getRessources, getRessource, getCartResource, setCartResource } from './idbHelper';

import { getProducts, getProduct } from './api/products';
import "./views/app-home";

(async (root) => {
  const skeleton = root.querySelector('.skeleton');
  const main = root.querySelector('main');

  const AppHome = main.querySelector('app-home');
  const AppProduct = main.querySelector('app-product');
  const AppCart = main.querySelector('app-cart');

  let NETWORK_STATE = true;

  /*** Config checkConnectivity library ***/

  checkConnectivity({
    timeToCount: 3,
    threshold: 2000,
    interval: 3000
  });

  /*** Functions ***/

  /**
   * Update removed products
   * @param {object} card Data from database
   */
  function updateRemovedProducts(card) {
    const productsStorage = JSON.parse(localStorage.getItem("productsStorage"));
    const productsIndex = [];

    AppCart.products.forEach((data, index) => {
      productsStorage['remove'].forEach(el => {
        if (data.product.id === el.product.id) {
          productsIndex.push(index);
        }
      });
    });

    // remove products
    for (let index = productsIndex.length - 1; index >= 0; index--) {
      AppCart.products.splice(productsIndex[index], 1);
    }

    // ?? way to have directly products removed in frontend
    // update products removed
    // AppCart.products = [...AppCart.products];

    // update card products and set to BDD
    card.products = AppCart.products;
    card.total -= productsIndex.length;
    setCartResource(card);
  }

  /**
   * Update selected products
   * @param {object} card Data from database
   */
  function updateSelectedProducts(card) {
    const productsStorage = JSON.parse(localStorage.getItem("productsStorage"));

    AppCart.products.forEach(data => {
      productsStorage['update'].forEach(el => {
        if (data.product.id === el.product.id) {
          data.total = el.total;
        }
      });
    });

    setCartResource(card);
  }

  /*** Connection event ***/

  document.addEventListener('connection-changed', ({ detail: state }) => {
    const productsStorage = JSON.parse(localStorage.getItem("productsStorage"));
    localStorage.setItem('userLogged', JSON.stringify(state));
    NETWORK_STATE = state;

    if (state) {
      document.documentElement.style.setProperty('--app-bg-color', '#000000');

      // update storage after losing connection
      if (productsStorage && AppCart.products?.length > 0) {
        getCartResource()
          .then(card => {
            if (productsStorage?.remove) {
              updateRemovedProducts(card);
            }

            if (productsStorage?.update) {
              updateSelectedProducts(card);
            }

            localStorage.removeItem("productsStorage");
          })
          .catch(err => console.error(err));
      }

    } else {
      document.documentElement.style.setProperty('--app-bg-color', '#858994');
    }
  });

  /*** Routes ***/

  page('*', (ctx, next) => {
    skeleton.removeAttribute('hidden');

    AppHome.active = false;
    AppProduct.active = false;
    AppCart.active = false;

    next();
  });

  page('/', async (ctx) => {
    const products = await getProducts();

    let storedProducts = [];

    if (NETWORK_STATE) {
      storedProducts = await setRessources(products);
    } else {
      storedProducts = await getRessources();
    }

    AppHome.products = storedProducts;
    AppHome.active = true;

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

    skeleton.setAttribute('hidden', '');
  });

  page('/cart', async (params) => {
    await import('./views/app-cart.js');

    const data = await getCartResource();
    let storedProducts = [];

    if (NETWORK_STATE) {
      storedProducts = (data?.products) ? data.products : [];
    } else {
      storedProducts = data.products;
    }

    AppCart.products = storedProducts;
    AppCart.active = true;

    skeleton.setAttribute('hidden', '');
  });

  page();

})(document.querySelector('#app'));
