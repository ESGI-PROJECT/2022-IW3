import { LitElement, html, css } from "lit";
import { addToCart } from "../cartHelper";
import { Base } from "../Base";

export class ProductCard extends Base {
  constructor() {
    super();

    this.product = {};

    this.loaded = false;
  }
  static get properties() {
    return {
      product: { type: Object },
      loaded: { type: Boolean, state: true },
    };
  }

  firstUpdated() {
    const image = this.querySelector("img");
    image.addEventListener("load", () => {
      this.loaded = true;
    });
  }

  sendTocart() {
    addToCart({
      ...this.product,
      quantity: 1,
    });
  }

  render() {
    return html`
      <section class="card">
        <a href="/product/${this.product.id}">
          <header>
            <figure>
              <div
                class="placeholder ${this.loaded ? "fade" : ""}"
                style="background-image: url(http://localhost:9000/image/24/${this
                  .product.image})"
              ></div>
              <img
                src="${this.product.image}"
                alt="${this.product.title}"
                loading="lazy"
              />
            </figure>
          </header>
          <main>
            <h1>${this.product.title}</h1>
            <p>${this.product.description}</p>
          </main>
        </a>
        <footer>
          <span class="price">$ ${this.product.price}</span>
          <button class="cart-btn" @click="${this.sendTocart}">
            Add to cart 🛍
          </button>
        </footer>
      </section>
    `;
  }
}
customElements.define("product-card", ProductCard);
