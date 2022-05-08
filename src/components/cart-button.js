import { html } from 'lit';
import { Base } from '../Base';

export class CartButton extends Base {
    constructor() {
      super();
    }

    render() {
        return html`
          <a href="/cart" class="cartButton">
            <button>🛒</button>
          </a> 
        `;
    }
}
customElements.define('cart-button', CartButton);