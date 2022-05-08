import { LitElement, html, css } from 'lit';
import { Base } from '../Base';
import "../components/product-cart";


export class AppChart extends Base {
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
        console.log(this.products);
        return this.products.map(product => html `
      <product-cart
        .product="${product}" 
        .network="${this.network}"
      ></product-cart>
    `);
    }
}
customElements.define('app-chart', AppChart);