import { LitElement, html, css } from 'lit';
import { Base } from '../Base';
import "../components/product-card";


export class Cart extends Base {
    constructor() {
        super();
        this.products = [];
        this.total = 0;
    }

    static get properties() {
        return {
            products: { type: Array },
            total: { type: Number }
        };
    }

    addTocart = (product) => {
        this.products.push(product);
    }
    render() {
        return this.products.map(product => html`
        <product-card
          .product="${product}"
        ></product-card>
      `);
    }

}