import { LitElement, html, css } from 'lit';
import { Base } from '../Base';
import { setRessourceCart } from '../idbHelper';

export class CartButton extends Base {
    constructor() {
        super();

        this.product = {}
    }

    _clickAddHandler() {
        setRessourceCart(this.product);
    }

    render() {
        return html`
        <button @click="${this._clickAddHandler}">Add to card</button>
    `;
    }
}

customElements.define('cart-button', CartButton);