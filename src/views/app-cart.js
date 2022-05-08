import { LitElement, html, css } from 'lit';
import { Base } from '../Base';

export class AppCart extends Base {
    constructor() {
        super();
        this.products = [];
    }

    static get properties() {
        return {
            products: { type: Array },
            loaded: { type: Boolean, state: true }
        }
    }

    render() {
        return this.products.map(product => html`
          <product-card 
              .product="${product.product}" 
              .editable="${true}"
              .addable="${false}"
              .mainId ="${product.id}"
          ></product-card>
        `);
    }
}
customElements.define('app-cart', AppCart);