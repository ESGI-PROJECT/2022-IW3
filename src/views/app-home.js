import { LitElement, html, css } from 'lit';
import { Base } from '../Base';
import "../components/product-card";

export class AppHome extends Base {
  constructor() {
    super();

    this.products = [];
    this.networdState = true;
  }

  static get properties() {
    return {
      products: { type: Array },
    };
  }

  changeNetworkState(networdState) {
    this.networdState = networdState;
    this.querySelectorAll('add-cart-button').forEach(addCartButton => {
      addCartButton.changeNetworkState(networdState);
    })
  }

  render() {
    return this.products.map(product => html`
      <product-card
        .product="${product}"
      ></product-card>
    `);
  }
}
customElements.define('app-home', AppHome);
