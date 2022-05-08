import { html } from 'lit';
import { Base } from '../Base';
import { setRessource } from "../idbHelper";

export class CartProduct extends Base {
    
    constructor() {
        super();
        this.product = {};
        this.loaded = false;
    }

    static get properties() {
        return {
            product: {type: Object},
            loaded: {type: Boolean, state: true},
        }
    }

    firstUpdated() {
        this.querySelector('img').addEventListener('load', () => {
            this.loaded = true;
        });
    }

    async addToCart() {
        this.product.number = this.product.number + 1
        await this.updateProduct()
    }

    async removeFromCart() {
        if (this.product.number <= 1)
            return

        this.product.number = this.product.number - 1
        await this.updateProduct()
    }

    async updateProduct() {
        const data = {...this.product}
        await setRessource('Cart', data);

        this.requestUpdate()
    }

    render() {
        return html`
            <div class="card">
                <main style="display: flex;">
                    <div style="justify-content: space-between">
                        <div>
                            <div class="placeholder ${this.loaded ? 'fade' : ''}"
                                    style="background-image: url(http://localhost:9000/image/24/${this.product.image})"></div>
                                <img
                                        alt="${this.product.title}"
                                        src="http://localhost:9000/image/620/${this.product.image}"
                                        loading="lazy"
                                        width="200" height="720">
                            </div>
                        <div>
                            <p>${this.product.title}</p>
                            <p>Total: ${this.product.price * this.product.number}€</p>
                        </div>
                        <div>
                            <p>You have ${this.product.number} items</p>
                            <div style="display: flex">
                                <button class="btn btn-primary" @click="${this.addToCart}">Add 1 more</button>
                                <button class="btn btn-danger" @click="${this.removeFromCart}">Remove 1</button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        `;
    }
}

customElements.define('cart-product', CartProduct);
