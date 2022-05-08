import { html, css, LitElement } from 'lit';
import { unsetRessourceCart } from '../idbHelper';
import { removeProduct } from '../api/products';
import '../components/product.css';

export class ProductCart extends LitElement {
    constructor() {
        super();

        this.product = [];

    }
    static get properties() {
        return {
            product: { type: Array },

        };
    }



    render() {
        return html`
            <div class='container'>
                <p>test</p>
            </div>
        `;
    }
}
customElements.define('product-cart', ProductCart);