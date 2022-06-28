import { html } from "lit";
import { Base } from "../Base";
import { readComments, writeComment } from "../firebase";

export class AppProduct extends Base {
  constructor() {
    super();

    this.product = {};
    this.comments = [];

    this.loaded = false;
  }

  static get properties() {
    return {
      product: { type: Object },
      comments: { type: Array },
      loaded: { type: Boolean, state: true },
    };
  }

  firstUpdated() {
    const image = this.querySelector("img");
    image.addEventListener("load", () => {
      this.loaded = true;
    });
  }

  sendComment(event) {
    event.preventDefault();

    const input = event.target.querySelector("textarea");

    writeComment({
      productId: this.product.id,
      comment: event.target.querySelector("textarea").value,
      user: 1,
    });

    input.value = "";
  }

  render() {
    this.comments = [];
    readComments(this.product.id, (comments) => {
      this.comments = [...comments];
    });

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
          <p class="price">$ ${this.product.price}</p>
          <p>${this.product.description}</p>
        </main>
        <footer>
          <button class="cart-btn" @click="${() => addToCart(this.product)}">
            Add to cart 🛍
          </button>
        </footer>
      </section>
      <br />
      <section>
        <form @submit="${this.sendComment}">
          <textarea></textarea>
          <button>Send</button>
        </form>
        <ul>
          ${this.comments.map(({ comment }) => html`<li>${comment}</li>`)}
        </ul>
      </section>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    `;
  }
}
customElements.define("app-product", AppProduct);
