import { html } from 'lit';
import { Base } from '../Base';

export class AppCart extends Base {
  constructor(cart=[], productStored=[]) {
    super();
    this.prodcutsStored = productStored;
    this.cart = cart;
  }
  
  render() {
    console.log(this.cart);
    console.log(this.productStored);
    return html`
    <div class="cartContainer"> 
        <h1>Panier</h1>
        <p>liste de ce qui est présent dans votre pannier</p>
        <div class="productsContainerCart"> 
          ${this.cart.products ? this.cart.products.map((product)=>{return html`<div class="productContainerCart">  ${this.productStored[product-1] ? this.productStored[product-1].title :''}</div>`;}):''}
        </div>
    </div>
        
      
    `;
  }
}
customElements.define('app-cart', AppCart);

