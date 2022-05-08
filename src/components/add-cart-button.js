import { getCart, updateCart } from '../api/cart';
import { Base } from '../Base';
import { getOfflineRessources } from '../idbHelper';
import { CartOfflineActionManager } from './OfflineManager';

export class AddCartButton extends Base {
    constructor(productId) {
      super();

      this.productId = productId;
      this.networkState = true;
      this.button = null;
    }

    async addProduct() {
      if (this.networkState) {
        const cart = await getCart();
        cart.products.push(this.productId);
        updateCart(cart);
      } else {
        const offlineActionManager = new CartOfflineActionManager({}, await getOfflineRessources());
        offlineActionManager.idb_addCart(this.productId);
      }

      let context = this;
      this.button.innerHTML = 'Added';
      setTimeout(() => { context.button.innerHTML = 'Add to cart'; }, 1000);
    }

    changeNetworkState(networdState) {
      this.networkState = networdState;
    }

    render() {
        let button = document.createElement('button');
        button.innerHTML = 'Add to cart';
        button.classList.add('btn', 'btn-primary');

        const context = this;
        button.addEventListener('click', () => {
          context.addProduct();
        });

        this.button = button;
        return this.button;
    }
}
customElements.define('add-cart-button', AddCartButton);