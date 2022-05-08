import { LitElement, html, css } from 'lit';
import { Base } from '../Base';
import "../components/product-card";

export class AppHome extends Base {
    constructor() {
        super();

        this.products = [];
        this.network;
    }

    static get properties() {
        return {
            products: { type: Array },
            network: { type: Boolean },
        };
    }

    render() {
        return this.products.map(product => html `
      <product-card
        .product="${product}"
        .network="${this.network}"
      ></product-card>
    `);
    }
}
customElements.define('app-home', AppHome);