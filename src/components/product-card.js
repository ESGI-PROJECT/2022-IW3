import { LitElement, html, css } from 'lit';
import { getCart, postCart } from '../api/cart';
import { Base } from '../Base';

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

    const input = this.querySelector('input');
    input.addEventListener('click', (e) => {
      e.preventDefault();
    });

    const button = this.querySelector('button');
    button.addEventListener('click', async (e) => {
      e.preventDefault();
      const cart = await getCart();
      const product = {};
      const quantity = Number(this.querySelector('input').value);
      product.quantity = quantity;
      product.product = this.product;

      const existingProduct = cart.products.find(product => product.product.id === this.product.id);
      if(existingProduct) {
        existingProduct.quantity += Number(quantity);
      } else {
        cart.products.push(product);
      }

      cart.total = cart.products.reduce((total, product) => total + product.quantity * product.product.price, 0).toFixed(2);

      await postCart(cart).then(() => {
        alert('Added to cart');
      });
    });
  }

  render() {
    return html`
      <a href="/product/${this.product.id}" class="card">
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
          <label for="quantity">Quantity:</label>
          <input id="quantity" type="number" value="1" min="1"/>
          <button class="add-to-cart">Add to cart</button>
        </main>
      </a> 
    `;
  }
}
customElements.define('product-card', ProductCard);
