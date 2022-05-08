import { html } from 'lit';
import { getCart, updateCart } from '../api/cart';
import { Base } from '../Base';
import { getOfflineRessources } from '../idbHelper';
import { CartOfflineActionManager } from './OfflineManager';

export class CartProduct extends Base {
    constructor(product, quantity) {
      super();

      this.product = product;
      this.quantity = quantity;
      this.networkState = true;
      
      this.loaded = false;
    }

    changeNetworkState(networdState) {
        this.networkState = networdState;
    }

    async changeQuantity(newQuantity) {
        this.quantity = newQuantity;

        if (this.quantity === 0) {
            this.deleteProduct();
        }

        if (this.networkState) {
            const cart = await getCart();
    
            cart.products = cart.products.filter(productId => productId !== this.product.id);
            for (let index = 0; index < this.quantity; index++) {
                cart.products.push(this.product.id);
            }
    
            await updateCart(cart);
        } else {
            const offlineActionManager = new CartOfflineActionManager({}, await getOfflineRessources());
            offlineActionManager.idb_changeQuantityCart(this.productId, this.quantity);
        }
    }

    async deleteProduct() {
        if (this.networkState) {
            this.quantity = 0;
            const cart = await getCart();
            
            cart.products = cart.products.filter(productId => productId !== this.product.id);

            await updateCart(cart);
        } else {
            const offlineActionManager = new CartOfflineActionManager({}, await getOfflineRessources());
            offlineActionManager.idb_deleteProductCart(this.productId);
        }

        this.remove();
    }

    firstUpdated() {
      const image = this.querySelector('img');
      image.addEventListener('load', () => {
        this.loaded = true;
      });
    }

    render() {
        const context = this;

        const input = document.createElement('input');
        input.type = 'number';
        input.value = this.quantity;
        input.addEventListener('change', event => {
            context.changeQuantity(event.target.value);
        });

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-delete');
        deleteButton.innerHTML = 'Delete';
        deleteButton.addEventListener('click', () => { 
            context.deleteProduct();
        });

        return html`
            <div class="productCard card">
                <header>
                    <figure>
                        <div class="placeholder ${this.loaded ? 'fade' : ''}" style="background-image: url(http://localhost:9000/image/24/${this.product.image})"></div>
                        <img
                        loading="lazy"
                        src="http://localhost:9000/image/500/${this.product.image}"
                        alt="${this.product.description}"
                        data-src="http://localhost:9000/image/500/${this.product.image}"
                        width="1280"
                        height="720">
                    </figure>
                </header>
                <main>
                    <h3>${this.product.title}</h3>
                    <label>
                        Quantity : ${input}
                    </label>
                    <div>
                        ${deleteButton}
                    </div>
                </main>
            </div>
        `;
    }
}
customElements.define('cart-product', CartProduct);