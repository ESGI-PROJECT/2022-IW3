import { html } from 'lit';
import { Base } from '../Base';
import {changeQuantity, removeBasket} from "../api/products";

export class AppCart extends Base {
  constructor() {
    super();

    this.basket = {
      items: JSON.parse(localStorage.getItem('basket'))
    };

    this.loaded = false;
  }

  static get properties() {
    return {
      product: { type: Object },
      loaded: { type: Boolean, state: true }
    }
  }

  render() {
    return html`
      <section class="cart">
        <h1>Votre panier</h1>
          <ul>
            ${this.basket.items.map((el) => html`
              <li style="display: flex; justify-content: space-between">
                <div>
                  ${el.title}
                </div>
                <div style="display: flex; justify-content: space-evenly">
                  <button style="border: 0; margin: 0.5em; background-color: dodgerblue; border-radius: 5px; padding: 0.2em" @click="${() => changeQuantity(el, 1)}">Ajouter 1</button>
                  <button style="border: 0; margin: 0.5em; background-color: orange; border-radius: 5px; padding: 0.2em" @click="${() => changeQuantity(el, -1)}">Retirer 1</button>
                  <button style="border: 0; margin: 0.5em; background-color: orangered; border-radius: 5px; padding: 0.2em" @click="${() => removeBasket(el)}">Supprimer item</button>
                  <p style="margin: 0.5em">${el.quantity}</p>
                </div>
              </li>`)}
          </ul>
      </section>
    `;
  }
}
customElements.define('app-cart', AppCart);
