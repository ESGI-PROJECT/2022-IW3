import { LitElement, html, css } from 'lit';
import { Base } from '../Base';
import { unsetRessourceCart } from '../idbHelper';

export class CartItem extends Base {
  constructor() {
    super();

    this.product = {};

    this.loaded = false;
  }
  static get properties() {
    return {
      product: { type: Object },
      loaded: { type: Boolean, state: true }
    };
  }

  firstUpdated() {
    const image = this.querySelector('img');
    image.addEventListener('load', () => {
      this.loaded = true;
    });
  }

  _clickDeleteHandler() {
    console.log(this.product);
    unsetRessourceCart(this.product.id);
  }


  render() {
    return html`
      <div id="container">
        <img
          loading="lazy"
          src="http://localhost:9000/image/500/${this.product.image}"
          alt="${this.product.description}"
          data-src="http://localhost:9000/image/500/${this.product.image}"
          width="100"
          height="100" 
        />
        <h1 id="product-title">${this.product.title}</h1>
        <p id="description-product">${this.product.description}</p>
        <input type="number" id="quantity" name="quantity" min="1">
        <p>${this.product.price}€</p>
        <button @click="${this._clickDeleteHandler}">Delete</button>
      </div>
    `;
  }
}
customElements.define('cart-item', CartItem);