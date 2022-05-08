import { LitElement, html, css } from 'lit';
import { getCart, putCart } from '../api/cart';
import { Base } from '../Base';


export class AddButton extends Base {
    constructor(idProduct) {
      super();
      this.idProduct = idProduct;
    }

    async addProduct(product) {
        const cart = await getCart();
        const cartAdded = cart + product;
        // console.log(cart);
        // console.log(product);
        //console.log(cartAdded);
        putCart(product);
        // console.log(cart);
        //console.log(await getCart());
    }
  
    render() {
        let button = document.createElement('button');
        button.innerHTML = 'Add product';
        const buttonContext= this;
        button.addEventListener('click', () => {
            buttonContext.addProduct(this.idProduct);
        })  
        return button;
    }
  }
  customElements.define('add-button', AddButton);
  