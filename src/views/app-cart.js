import { LitElement, html, css } from 'lit';
import { Base } from '../Base';
import "../components/product-cart";

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
        return html`
      <product-cart
        .products="${this.products}"
      ></product-carts>
    `;
    }
}
customElements.define('app-cart', AppCart);
