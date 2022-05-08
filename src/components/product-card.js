import { LitElement, html, css } from 'lit';
import { Base } from '../Base';
import {setCartRessource, unsetCartRessource} from "../idbHelper";
import Noty from "noty";

export class ProductCard extends Base {
  constructor() {
    super();

    this.product = {};

    this.loaded = false;

    //Supprimer
    this.editable = false;

    //Ajoutable au panier
    this.addable = false;

    this.mainId = 0;
  }

  static get properties() {
    return {
      product: { type: Object },
      loaded: { type: Boolean, state: true },
      editable: { type: Boolean, state: false },
      addable: { type: Boolean, state: false }
    };
  }

  firstUpdated() {
    const image = this.querySelector('img');
    image.addEventListener('load', () => {
      this.loaded = true;
    });
  }

  async addToCart() {
    await setCartRessource({
      "cartId": 1,
      "productId": this.product.id,
    });

    new Noty({
      type: 'success',
      layout: 'topRight',
      theme: 'relax',
      text: 'New item added to cart',
      timeout: 3000,
      progressBar: true,
      closeWith: ['click', 'button'],
      animation: {
        open: 'noty_effects_open',
        close: 'noty_effects_close'
      }
    }).show();
  }

  async removeFromCart() {
    if (this.mainId > 0) {
      await unsetCartRessource(this.mainId);
      document.getElementById(this.mainId).remove();
    }
  }

  render() {
    if (this.addable){
      return html`
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
            <div style="float: right">
              <button id="${this.product.id}" @click="${this.addToCart}" class="addToCardBtn">AddToCart</button>
            </div>
            <h1>${this.product.title}</h1>
            <p>${this.product.description}</p>
          </main>
        </div> 
      `;
    }else if (this.editable) {
      return html`
        <div class="card" id="${this.mainId}">
          <header>
            <figure>
              <div class="placeholder ${this.loaded ? 'fade' : ''}"
                   style="background-image: url(http://localhost:9000/image/24/${this.product.image})"></div>
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
            <div style="float: right">
              <button @click="${this.removeFromCart}">Delete</button>
            </div>
            <h1>${this.product.title}</h1>
            <p>${this.product.description}</p>
          </main>
        </div>
      `;
    }
    else{
      return html`
        <a href="/product/${this.product.id}" class="card">
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
            <p>${this.product.description}</p>
          </main>
        </a> 
      `;
    }

  }
}
customElements.define('product-card', ProductCard);
