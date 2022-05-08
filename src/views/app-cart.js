import { LitElement, html, css } from 'lit';
import { Base } from '../Base';

export class AppCart extends Base {
  constructor() {
    super();

    this.cart = {};
    
  }

  static get properties() {
    return {
      cart: { type: Object}
    };
  }

  firstUpdated(){
      
  }

render() {
    return html`
      <div>
        <h1 class="cart-title">Your Cart</h1>
        <table class="cart-table">
            <thead>
                <tr>
                    <th class="title-th"></th>
                    <th class ="product-th"></th>
                    <th class="price-th">Price</th>
                </tr>
            </thead>
            <tbody>
                ${this.cart.products.map(product => html`
                    <tr class="product-tr">
                      <td class="img-td"><img
                      loading="lazy"
                      src="http://localhost:9000/image/500/${product.product.image}"
                      alt="${product.product.description}"
                      data-src="http://localhost:9000/image/500/${product.product.image}"
                      height="100"></td>
                      <td>
                        ${product.product.title} </br> </br>
                        <label> Quantity : </label> <input type="number" id="quantity" name="quantity" value="${product.quantity}" min="1" max="99">
                        <a href="/" class="delete-product"> Delete product </a>
                      </td>
                      <td class="price-td">${product.product.price}</td>
                    </tr>
                `)}
                <tr>
                </tr>
            </tbody>
        </table>
        <table class="total-cart">
        <thead>
        <tr>
            <th class="total-th-cart">Sub-Total</th>
        </tr>
    </thead>
          <tr>
            <td class="total-cart-amout-td"> ${this.cart.total} </td>
          </tr>
        </table>
      </div>
    `;
  }
}

customElements.define('app-cart', AppCart);
