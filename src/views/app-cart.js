import { html } from 'lit';
import { Base } from '../Base';
import { updateProductToCart, deleteProductFromCart } from '../api/cart';
export class AppCart extends Base {
    constructor() {
        super();

        this.cart = [];
    }

    static get properties() {
        return {
        cart: { type: Array },
        };
    }

    modifiedQuantity(cartId, itemId, productId ) {
        const quantity = document.getElementById("quantity").value;
        updateProductToCart(cartId, itemId, productId, quantity);
        alert("quantity modified to "+ quantity + " .");
    }

    deleteProductFromCart(id){
        deleteProductFromCart(id);
        window.location.reload();
    }

    render() {
        return this.cart.map(item => html`
        <div>
            <a href="/product/${item.item.id}">
            <span>Product number ${item.item.id} : </span>
            </a>
            <label for="quantity">quantity</label>
            <input value="${item.item.quantity}" type="number" min="1" id="quantity">
            <button @click="${() =>{this.modifiedQuantity(item.cartId, item.id, item.item.id)}}" type="button">Modify</button>
            <button @click="${() =>{this.deleteProductFromCart(item.id)}}" type="button">Delete</button>
        </div>
        `);
    }
    
}
customElements.define('app-cart', AppCart);