import { LitElement, html, css } from 'lit';
import { Base } from '../Base';
import "../components/product-card";

export class AppHome extends Base {
  constructor() {
    super();

    this.products = [];
  }

  static get properties() {
    return {
      products: { type: Array },
    };
  }

  render() {
    return this.products.map(product => html`
      <product-card
        .product="${product}"
      ></product-card>
      <div class="center">
      <form action="/cart/add/${product.id}">
        <button type="submit" class="button">Add to cart</button>
      </form>
      </div>
    `);
  }
}
customElements.define('app-home', AppHome);
