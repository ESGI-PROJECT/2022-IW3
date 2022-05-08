import { getCart, updateCart } from "../api/cart";
import { addOfflineAction, clearOfflineData } from "../api/offline";

export class OfflineManager {
    constructor() {
        this.actions = [];
    }

    addAction(action) {
        this.actions.push(action);
    }

    async processActions() {
        for (let index in this.actions) {
            await this.processAction(this.actions[index]);
        }
        clearOfflineData();
    }

    async processAction(action) {
        let actionManager = null;
        switch(action.source) {
            case 'cart':
                actionManager = new CartOfflineActionManager(action);
                break;
        }
        await actionManager.process();
    }
}

export class CartOfflineActionManager {
    constructor(action = {}, offlineData = {}) {
        this.source = 'cart';
        this.type = action.type ? action.type : '';
        this.data = action.data ? action.data : {};
        this.offlineData = offlineData;
    }

    async idb_pushAction(type, data) {
        console.log(this.offlineData);
        return;
        this.offlineData.actions.push({
            "source": this.source,
            "type": this.type,
            "data": this.data
        });
    }

    async idb_addCart(productId) {
        this.type = 'addCart';
        this.data.value = productId;
        await this.idb_pushAction();
    }

    async idb_changeQuantityCart(productId, quantity) {
        this.type = 'changeQuantityCart';
        this.data.value = productId;
        this.data.quantity = quantity;
        await this.idb_pushAction();
    }

    async idb_deleteProductCart(productId) {
        this.type = 'deleteProductCart';
        this.data.value = productId;
        await this.idb_pushAction();
    }

    async process() {
        let cart = await getCart();
        const offlineProductId = this.data.value;
        switch (this.type) {
            case 'addCart':
                for (let index = 0; index < this.data.quantity; index++) {
                    cart.products.push(offlineProductId);
                }
                break;
            case 'changeQuantityCart':
                cart.products = cart.products.filter(productId => productId !== offlineProductId);
                for (let index = 0; index < this.quantity; index++) {
                    cart.products.push(offlineProductId);
                }
                break;
            case 'deleteProductCart':
                cart.products = cart.products.filter(productId => productId !== offlineProductId);
                break;
            default:
                break;
        }
        await updateCart(cart);
    }
}