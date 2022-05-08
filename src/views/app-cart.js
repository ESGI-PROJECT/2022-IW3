import { LitElement, html, css } from 'lit';
import { Base } from '../Base';
import '../components/cart-product';

export class AppCart extends Base {
    constructor(products = []) {
      super();

      this.products = products;
      this.groupedProducts = [];
      this.networdState = true;
    }

    static get properties() {
      return {
        products: { type: Array },
      }
    }

    changeNetworkState(networdState) {
      this.networdState = networdState;
      this.querySelectorAll('cart-product').forEach(cartProduct => {
        cartProduct.changeNetworkState(networdState);
      })
    }

    groupProducts(products) {
      return products.reduce((results, product) => {
        if (!results[product.id]) {
          results[product.id] = {
            product: product,
            quantity: 0
          };
        }
        results[product.id].quantity += 1;
        return results;
      }, {})
    }

    render() {
      this.groupedProducts = this.groupProducts(this.products);
      
      return html`
        <section>
          <h2>My cart</h2>
          ${Object.values(this.groupedProducts).map(productData => {
            return html `
              <cart-product .product=${productData.product} .quantity=${productData.quantity}>
              </cart-product>
            `;
          })}
        </section>
      `;
    }
}

customElements.define('app-cart', AppCart);