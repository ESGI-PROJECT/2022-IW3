import { LitElement, html, css } from 'lit';
import { Base } from '../Base';
import { Cart } from './Cart';

export class ProductCard extends Base {
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
  _handleClick(e) {
    console.log('add to cart');
  }
  render() {
    return html`
    <div class="card">
      <a href="/product/${this.product.id}" >
        <header>
          <figure>
            <div class="placeholder ${this.loaded ? 'fade' : ''}" style="background-image: url(http://localhost:9000/image/24/${this.product.image})"></div>
            <img
              loading="lazy"
              src="http://localhost:9000/image/500/${this.product.image}"
              alt="${this.product.description}"
              data-src="http://localhost:9000/image/500/${this.product.image}"
              width="1280"
              height="720">
          </figure>
        </header>
        <main>
          <h1>${this.product.title}</h1>
          <p>${this.product.description}</p>
        </main>
      </a> 
      <button @click="${this._handleClick}">add to cart</button>
      </div>
    `;
  }
}
customElements.define('product-card', ProductCard);
