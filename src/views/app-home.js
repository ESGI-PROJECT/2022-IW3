import { LitElement, html, css } from 'lit';
import { Base } from '../Base';
import { updateCart, getCart } from '../api/cart';
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

  async add() {
    const cart = await getCart();
    updateCart({
      ...cart,
      items: [
        ...(cart.items || []),
        this.product
      ]
    });
  }

  render() {
    return this.products.map(product => html`
      <product-card
        .product="${product}"
      >
      </product-card>
      <button @click="${this.add}">Ajouter au panier</button>
    `);
  }
}
customElements.define('app-home', AppHome);
