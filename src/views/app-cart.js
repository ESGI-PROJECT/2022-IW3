import { html } from 'lit';
import { Base } from '../Base';

export class AppCart extends Base {
  constructor() {
    super();
    this.cart = {};

  }

  static get properties() {
    return {
      cart: { type: Object },
      loaded: { type: Boolean, state: true }
    }
  }

  render() {
      return html `
      <section>
        <h1 style="text-align:center">Panier</h1>
        <p>${this.cart.items}</p>
      </section>
      `;
  }

}

customElements.define('app-cart', AppCart);