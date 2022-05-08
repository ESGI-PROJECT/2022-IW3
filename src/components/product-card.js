import { LitElement, html, css } from 'lit';
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
  }

  async _handleClick() {
    let data = [];
    const item = await getChart();
    if (item.data === undefined) {
        data = [
            [this.product], this.product.price
        ];
    } else {
        const a = item.data[0];
        console.log(a);
        a.push(this.product);

        const price = this.product.price + item.data[1];
        data = [a, price];
    }
    setChart(data);
    console.log("coucou");
}

  render() {
    return html`
    <div class="card">
      <header>
        <a href="/product/${this.product.id}">
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
        </a> 
      </header>
      <main>
        <h1>${this.product.title}</h1>
        <p>${this.product.description}</p>
        <button>Add to cart</button>
      </main>
    </div>
    `;
  }
}
customElements.define('product-card', ProductCard);
