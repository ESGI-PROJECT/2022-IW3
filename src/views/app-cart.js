import { LitElement, html, css } from "lit";
import { Base } from "../Base";
import "../components/cart-list";

export class AppCart extends Base {
  constructor() {
    super();

    this.cart = {};
  }

  static get properties() {
    return {
      cart: { type: Object },
    };
  }

  render() {
    return html`<cart-list .cart="${this.cart}"></cart-list>`;
  }
}
customElements.define("app-cart", AppCart);
