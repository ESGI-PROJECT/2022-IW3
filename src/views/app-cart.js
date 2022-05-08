import { LitElement, html, css } from 'lit';
import '../components/product-cart';
import { Base } from '../Base';

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

    static styles = [
        css`
            :host {
                display: block;
            }
        `
    ];
    
    render() {
        return html`
            <div>
                ${this.products.map((product) => 
                    {
                    return html`
                        <div>
                            <product-cart .product="${product}"></product-cart>
                        </div>
                    `;
                })}
            </div>
        `;
    }
}
customElements.define('app-cart', AppCart);
