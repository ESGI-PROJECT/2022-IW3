import { LitElement, html, css } from 'lit';
import { Base } from '../Base';
import { deleteProduct } from '../api/products';
import { unsetChart } from '../idbHelper';

export class ProductCart extends Base {
    constructor() {
        super();

        this.product = {};

        this.network;

        this.loaded = false;
    }
    static get properties() {
        return {
            product: { type: Object },
            network: { type: Boolean },
            loaded: { type: Boolean, state: true }
        };
    }

    firstUpdated() {
        const image = this.querySelector('img');
        image.addEventListener('load', () => {
            this.loaded = true;
        });
    }

    //function deleteProduct from database api
    async deleteProduct() {
        if (this.network) {
            const data = await deleteProduct(this.product.id);
            await unsetChart(this.product.id);
        } else {
            await unsetChart(this.product.id);
        }
    }

    render() {
        console.log(this.product.image);
        return html `
      <div class="card">
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
          <h1>${this.product.title}</h1>
          <button @click="${this.deleteProduct}">Supprimer du panier</button>
        </main>
      </div> 
    `;
    }
}
customElements.define('product-cart', ProductCart);