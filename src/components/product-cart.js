import { html, css, LitElement } from 'lit';
import { unsetRessourceCart } from '../idbHelper';
import { removeProduct } from '../api/products';
import '../components/product.css';

export class ProductCart extends LitElement {
    constructor() {
        super();

        this.product = {};

        this.loaded = false;
    }
    static get properties() {
        return {
            product: { type: Object },
            loaded: { type: Boolean, state: true }
        };
    }

    static styles = [
        css`
            :host {
                display: block;
            }
            img {
                width: 100px;
                height: 100px;
            }
            .container {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                margin: 10px;
                padding: 15px;
                border-radius: 5px;
                box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
            }
            .title {
                text-align: start;
                color: #0BB0FC;
            }
            .cont {
                display: flex;
                flex-direction: column;
            }
            .priceContainer {
                display: flex;
                flex-direction: column;
                width: 6rem;
                height: 10rem;
                align-items: center;
                justify-content: center;
            }
            .btn {
                border: none;
                background-color: red;
                color: white;
                padding: 5px;
                border-radius: 5px;
                cursor: pointer;
                font-size: 1rem;
                font-weight: bold;
                margin-top: 10px;
            }
            .price {
                font-size: 1rem;
                font-weight: bold;
            }
        `
    ];

    removeProduct(_id) {
        unsetRessourceCart(_id);
        removeProduct(_id);
        this.dispatchEvent(new CustomEvent('remove', { detail: _id }));
    }

    render() {
        console.log('product', this.product['product'][0].title);
        return html`
            <div class='container'>
                <div class='cont'>
                    <span class='title'>${this.product['product'][0].title}</span>
                    <img src="${this.product['product'][0].image}" alt="${this.product['product'][0].title} class="img">
                </div>
                <div class='priceContainer'>
                    <p class='price'>${this.product['product'][0].price} €</p>
                    <button class='btn' @click="${() => this.removeProduct(this.product['id'])}">Remove</button>
                </div>
            </div>
        `;
    }
}
customElements.define('product-cart', ProductCart);
