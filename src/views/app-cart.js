import { html, css } from 'lit';
import { postCart } from '../api/cart';
import { Base } from '../Base';

export class AppCart extends Base {
  constructor() {
    super();

    this.cart = {};
  }

  static get properties() {
    return {
      cart: { type: Object },
    };
  }

  async subQuantity(product) {
    const cart = this.cart;
    const products = this.cart.products;
    product.quantity -=1;
    cart.total = products.reduce((total, product) => total + product.quantity * product.product.price, 0).toFixed(2);
    await postCart(cart).then(() => this.requestUpdate());
  }

  async addQuantity(product) {
    const cart = this.cart;
    const products = this.cart.products;
    product.quantity +=1;
    cart.total = products.reduce((total, product) => total + product.quantity * product.product.price, 0).toFixed(2);
    await postCart(cart).then(() => this.requestUpdate());
  }

  async checkout() {
    const cart = this.cart;
    cart.products = [];
    cart.total = 0;
    await postCart(cart).then(() => this.requestUpdate());
  }

  async clearCart() {
    const cart = this.cart;
    cart.products = [];
    cart.total = 0;
    await postCart(cart).then(() => this.requestUpdate());
  }

  async removeProduct(id) {
    const cart = this.cart;
    const products = cart.products.filter(product => product.product.id !== id);
    cart.total = products.reduce((total, product) => total + product.quantity * product.product.price, 0).toFixed(2);
    cart.products = products;
    this.cart = cart;
    await postCart(cart).then(() => this.requestUpdate());
  }

  render() {
    return html`
      <section class="cart">
        <h1>Your Cart</h1>
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${this.cart.products.map(product => html`
                    <tr>
                        <td>${product.product.title}</td>
                        <td>${product.product.price}</td>
                        <td>
                          <button @click=${() => this.subQuantity(product)}>-</button>  
                          ${product.quantity}
                          <button @click=${() => this.addQuantity(product)}>+</button>
                        </td>
                        <td>
                          <button @click=${() => this.removeProduct(product.product.id)}>Remove</button>
                        </td>
                    </tr>
                `)}
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="3">Total</td>
                    <td>${this.cart.total}</td>
                </tr>   
            </tfoot>
        </table>
        <div class="actions">
          <button @click=${() => this.clearCart()} ?disabled=${!this.cart.products.length > 0}>Clear Cart</button>
          <button @click=${() => this.checkout()} ?disabled=${!this.cart.products.length > 0}>Checkout</button>
        </div>
      </section>
    `;
  }
}
customElements.define('app-cart', AppCart);
