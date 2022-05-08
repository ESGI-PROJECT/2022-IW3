import page from 'page';
import checkConnectivity from 'network-latency';
import { setRessources, setRessource, getRessources, getRessource } from './idbHelper';

import { getProducts, getProduct } from './api/products';
import { getCart, addProductToCart, getProductQuantityInCart, updateProductToCart } from './api/cart';
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

  document.addEventListener('connection-changed', ({ detail: state }) => {
    NETWORK_STATE = state;

    if (state) {
      document.documentElement.style.setProperty('--app-bg-color', 'royalblue');
    } else {
      document.documentElement.style.setProperty('--app-bg-color', '#858994');
    }
  });

  const AppHome = main.querySelector('app-home');
  const AppProduct = main.querySelector('app-product');
  const AppCart = main.querySelector('app-cart');

  page('*', (ctx, next) => {
    skeleton.removeAttribute('hidden');

    AppHome.active = false;
    AppProduct.active = false;
    AppCart.active = false;

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

  page('/cart/add/:id', async ({params}) => {
    const itemExist = await getProductQuantityInCart(1, params.id);
    if (itemExist) {
      await updateProductToCart(1, itemExist[1], params.id, itemExist[0] + 1);
    }else {
      await addProductToCart(1, params.id);
    }
    location.pathname = '/';
  });


  page('/cart', async() => {
    await import('./views/app-cart.js');
    let cart = await getCart(1);
    /*let storedCart = [];
    let test = [];
    await cart.forEach(async (test2) => {
      let product = await getProduct(test2.item.id);
      product.quantity = test2.item.quantity;
      test.push(product);
    });
    if (NETWORK_STATE) {
      const cart = await getCart(1);
      storedCart = await setRessources(cart);
    } else {
      storedCart = await getRessources();
    }*/


    AppCart.cart = cart;
    AppCart.active = true;

    skeleton.setAttribute('hidden', '');
  });
  page();

})(document.querySelector('#app'));
