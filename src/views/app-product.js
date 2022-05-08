import { html,css } from 'lit';
import { Base } from '../Base';
import { getCart, postCart } from '../api/cart';

export class AppProduct extends Base {
  constructor() {
    super();

    this.product = {};

    this.loaded = false;
  }

  static get properties() {
    return {
      product: { type: Object },
      loaded: { type: Boolean, state: true }
    }
  }
  
  firstUpdated() {
    const image = this.querySelector('img');
    image.addEventListener('load', () => {
      this.loaded = true;
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

      cart.total = cart.products.reduce((total, product) => total + product.quantity * product.product.price, 0);

      await postCart(cart).then(() => {
        alert('Added to cart');
      });
    });
  }

  

  render() {
    return html`
      <section class="product">
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
          <p>${this.product.description}</p> </br>
          <label> Quantity : </label> <input type="number" id="quantity" name="quantity" value="1" min="1" max="99">
          <button class='add-to-cart' onclick="window.alert('Panier')"> Add to Cart </button>
        </main>
      </section>
    `;
  }
}
customElements.define('app-product', AppProduct);