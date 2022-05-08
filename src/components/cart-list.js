import { LitElement, html, css } from "lit";
import { updateCart } from "../api/products";
import { Base } from "../Base";
import { getCart, setCart } from "../idbHelper";

export class CartList extends Base {
  constructor() {
    super();

    this.cart = {};

    this.loaded = false;
  }
  static get properties() {
    return {
      cart: { type: Object },
      loaded: { type: Boolean, state: true },
    };
  }

  firstUpdated() {
    const image = this.querySelector("img");
    if (image) {
      image.addEventListener("load", () => {
        this.loaded = true;
      });
    }
  }

  async editQte(e) {
    e.target.value = parseInt(e.target.value);
    if (e.target.value < parseInt(e.target.min)) {
      e.target.value = e.target.min;
    } else if (e.target.value > parseInt(e.target.max)) {
      e.target.value = e.target.max;
    }

    this.cart.products.map((p) => {
      if (p.id === parseInt(e.target.name)) {
        p.quantity = parseInt(e.target.value);
        p.total = p.quantity * p.price;
      }
    });
    this.cart.total = this.cart.products
      .reduce((acc, p) => acc + p.total, 0)
      .toFixed(2);
    document.getElementById("total").innerHTML = `${this.cart.total}€`;

    if (navigator.onLine) {
      await updateCart(this.cart);
    }
    await setCart(this.cart);
  }

  async removeItem(e) {
    this.cart.products.splice(
      this.cart.products.findIndex((p) => p.id === parseInt(e.target.name)),
      1
    );
    this.cart.total = this.cart.products.reduce((acc, p) => acc + p.price * p.quantity, 0).toFixed(2);
    document.getElementById(`product-${e.target.name}`).remove();
    document.getElementById('total').innerHTML = `${this.cart.total}€`;

    if (navigator.onLine) {
      await updateCart(this.cart);
    }
    await setCart(this.cart);
  }

  render() {
    if (this.cart.products) {
      return html`
        <div class="cart">
          <main>
            <h1>Your cart</h1>
          </main>

          ${this.cart.products.map(
            (p) => html`
              <div id="product-${p.id}">
                <header>
                  <figure>
                    <div>
                      <div
                        class="placeholder ${this.loaded ? "fade" : ""}"
                        style="background-image: url(http://localhost:9000/image/24/${p.image})"
                      ></div>
                      <img
                        loading="lazy"
                        src="http://localhost:9000/image/500/${p.image}"
                        alt="${p.description}"
                        data-src="http://localhost:9000/image/500/${p.image}"
                        width="125"
                        height="125"
                      />
                    </div>
                    <div class="content">
                      <p id="title">${p.title}</p>
                      <p id="price">${p.price}€</p>
                      <div id="info">
                        <span>Qte:</span>
                        <input
                          id="qte"
                          name="${p.id}"
                          type="number"
                          value="${p.quantity}"
                          min="1"
                          max="100"
                          step="1"
                          @change="${this.editQte}"
                        />
                        <a
                          id="remove"
                          name="${p.id}"
                          href="javascript:;"
                          @click="${this.removeItem}"
                          >Remove</a
                        >
                      </div>
                    </div>
                  </figure>
                </header>
              </div>
            `
          )}

          <p class="total">
            Total cost:
            <strong><span id="total">${this.cart.total}€</span></strong>
          </p>
        </div>
      `;
    }
  }
}
customElements.define("cart-list", CartList);
