import { html } from 'lit';
import { Base } from '../Base';
import {getCart, setCart} from "../idbHelper";
import checkConnectivity from "network-latency";
export class AppCart extends Base {
    constructor() {
        super();

        this.products = [];
    }


    async remove(productId) {
        const productList = [];
        const result = await getCart();
        result.forEach( e => {
            if (e.product.id !== productId) {
                productList.push(e);
            }
        })
        result.product = productList;
        setCart(result.product);

        // to verify if we have connection
        checkConnectivity({
            timeToCount: 3,
            threshold: 2000,
            interval: 3000
        });

        let NETWORK_STATE = true;

        document.addEventListener('connection-changed', ({ detail: state }) => {
            NETWORK_STATE = state;

            if (state) {
                console.log('There is connection');
            } else {
                // we do the local storage to save our data if we don't have connection
                localStorage.setItem('Data', JSON.stringify(result.product));
            }
        });


        window.location.reload();
    }

    async addProduct(productId) {
        const productList = [];
        const result = await getCart();
        result.forEach(e => {
            if (e.product.id === productId) {
                e.total++;
            }
            productList.push(e);
        })
        result.product = productList;
        setCart(result.product);
        window.location.reload();
    }

    async minusProduct(productId) {
        const productList = [];
        const result = await getCart();
        result.forEach(e => {
            if (e.total === 1) {
                this.remove(productId);
            } else if (e.product.id === productId) {
                e.total--;
                productList.push(e);
            } else {
                productList.push(e);
            }

        })
        result.product = productList;
        setCart(result.product);
        window.location.reload();

    }

    render() {
        return this.products.map(product => html`
                <div id="toto">
                    <div class="Cart-Items">
                        <div class="image-box">
                            <img src="${product.product.image}" height="120px" />
                        </div>
                        <div class="about">
                            <h1 class="title">${product.product.title}</h1>
                        </div>
                        <div class="counter">
                            <div class="btn" @click="${() => this.addProduct(product.product.id)}">+</div>
                            <div class="count">${product.total}</div>
                            <div class="btn" @click="${() => this.minusProduct(product.product.id)}">-</div>
                        </div>
                        <div class="prices">
                            <div class="amount">${product.product.price}€</div>
                            <div class="remove"><u @click="${() => this.remove(product.product.id)}">Remove</u></div>
                        </div>
                    </div>
                </div>
                <br>
        `);
    }
}
customElements.define('app-cart', AppCart);
