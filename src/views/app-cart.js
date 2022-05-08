import { LitElement, html, css } from 'lit';
import { Base } from '../Base';
import "../components/product-card";

export class AppCart extends Base {
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
    // return html `
    //     <h1>PANIER</h1>
    // `;

    return this.products.map(product => html`
      <h1>Panier</h1>
      <product-card
        .product="${product}"
      ></product-card>
    `);
  }
}
customElements.define('app-cart', AppCart);