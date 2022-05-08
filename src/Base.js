import { LitElement } from 'lit';
import { getCartResource, setCartResource } from './idbHelper';

export class Base extends LitElement {
  createRenderRoot() {
    return this;
  }

  static get properties() {
    return {
      active: { type: Boolean, reflect: true },
    };
  }

  /**
   * All behavior to have data to post in BDD
   * @returns Product data
   */
  async getData() {
    let cartData = await getCartResource();

    if (!cartData) {
      const products = [];
      products.push({product: this.product, total: 1});
      cartData = {
        products: products,
        total: 1
      };
    } else {
      let alreadyPresent = false;

      cartData.products.forEach(el => {
        if (el.product.id === this.product.id) {
          el.total += 1;
          alreadyPresent = true;
        }
      });

      if (!alreadyPresent) {
        cartData.products.push({
          product: this.product,
          total: 1
        });

        cartData.total += 1;
      }
    }

    return cartData;
  }

  /**
   * Add product to cart
   */
  async addProductToCart() {
    await this.getData()
        .then(data => setCartResource(data))
        .catch(err => {
          throw new Error(err);
        });
  }
}
