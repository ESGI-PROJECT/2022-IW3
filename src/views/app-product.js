import { html } from "lit";
import { Base } from "../Base";
import { getCart, updateCart } from "../api/products";
import { setCart } from "../idbHelper";

export class AppProduct extends Base {
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

  async addToCart() {
    const cartList = await getCart();
    if(!cartList.products) {
      cartList.products = [];
      cartList.id = "cart";
      cartList.total = 0.00;
    }
    if (!cartList.products.find(p => { if (p.id === this.product.id) { p.quantity++; p.total = p.quantity * p.price; return true; }})) {
      this.product.quantity = 1;
      this.product.total = this.product.price * this.product.quantity;
      cartList.products.push(this.product);
    }
    cartList.total = cartList.products.reduce((acc, p) => acc + p.total, 0).toFixed(2);

    if(navigator.onLine) {
      await updateCart(cartList);
    }
    await setCart(cartList);
  }
  
  render() {
    return html`
      <section class="product">
        <header>
          <figure>
            <div
              class="placeholder ${this.loaded ? "fade" : ""}"
              style="background-image: url(http://localhost:9000/image/24/${this
                .product.image})"
            ></div>
            <img
              loading="lazy"
              src="http://localhost:9000/image/500/${this.product.image}"
              alt="${this.product.description}"
              data-src="http://localhost:9000/image/500/${this.product.image}"
              width="1280"
              height="720"
            />
          </figure>
        </header>
        <main>
          <h1>${this.product.title}</h1>
          <p>${this.product.description}</p>
          <button class="addToCard" @click="${this.addToCart}">Add to cart</button>
        </main>
      </section>
    `;
  }
}
customElements.define("app-product", AppProduct);
