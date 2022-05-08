import { html } from 'lit';
import { Base } from '../Base';
import "../components/cart-item";

export class AppCart extends Base {
    constructor() {
        super();

        this.products = [];
    }

    render() {
        console.log(this.products);
        const listProduct = this.products.map(product => html`
        <cart-item
            .product="${product}"
        ></cart-item>
    `);
        return html`
            <h1 style="text-align:center; margin-bottom:5%">Cart</h1>
            ${listProduct}
        
            <button>Payer</button>
        `
    }
}


customElements.define('app-cart', AppCart);