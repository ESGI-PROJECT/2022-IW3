import { html, css } from 'lit';
import { Base } from '../Base';
import { handleRemoveItemFromCart } from '../helpers/helper';

export class AppCheckout extends Base {
  constructor() {
    super();

    this.storedCart = {};

    this.loaded = false;
  }

  static get properties() {
    return {
      product: { type: Object },
      loaded: { type: Boolean, state: true }
    }
  }

  render() {
    return html`
        <div class='checkout-page'>
            <div class='checkout-header'>
                <div class='header-block'>
                    <span>Product</span>
                </div>
                <div class='header-block'>
                    <span>Description</span>
                </div>
                <div class='header-block'>
                    <span>Price</span>
                </div>
                <div class='header-block'>
                    <span>Remove</span>
                </div>
            </div>
            ${this.storedCart[0].products.map(product => html`
                <div class='checkout-item'>
                    <div class='image-container'>
                        <img src="${product.image}" alt='item' />
                    </div>
                    <span class='name'>${product.title}</span>
                    <span class='price'>${product.price}$</span>
                    <div data-id="${product.id}" class='remove-button' @click="${handleRemoveItemFromCart}">
                        &#10005;
                    </div>
                </div>
            `)}
            <div class='total'>
                <span>TOTAL: <span id="total">${this.storedCart[0].total}</span></span>
            </div>
        </div>
    `;
  }
}
customElements.define('app-checkout', AppCheckout);