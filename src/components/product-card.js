import { html } from 'lit';
import { Base } from '../Base';
import {getCart, setCart} from '../idbHelper'



export class ProductCard extends Base{
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

  async addToCart() {
    const productList = [];
    const productIds = [];
    const product = {
      product: this.product,
      total: 1
    }

    const result = await getCart();
    console.log('Les résulats de la base de données :', result);

    if (!result){
      productList.push(product);
      await setCart(productList);
    } else {
      result.forEach( e => {
        console.log(e);
        productList.push(e);
        productIds.push(e.product.id);
        if (e.product.id === this.product.id) {
          e.total++;
        }
      })
      if (!productIds.includes(this.product.id)){
        productList.push(product);
      }
      console.log(productIds.includes(this.product.id));
      setCart(productList);
    }
  }

  render() {
    return html`
      <a id="ProductId" href="/product/${this.product.id}" class="card">
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
          <h1 id="ProductTitle">${this.product.title}</h1>
          <p>${this.product.description}</p>
        </main>
      </a>
      <button class="button button5" @click="${this.addToCart}"> Add to Cart </button>
    `;
  }
}
customElements.define('product-card', ProductCard);
