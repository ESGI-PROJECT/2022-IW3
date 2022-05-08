import { LitElement, html, css } from 'lit';
import { Base } from '../Base';
import "../components/product-card";

export class AppHome extends Base {
  constructor() {
    super();

    this.products = [];
  }

  static get properties() {
    return {
      products: { type: Array },
    };
  }


  //function add products to indexeddb
  async addProducts() {
    const db = await this.openDb();
    const tx = db.transaction('products', 'readwrite');
    const store = tx.objectStore('products');
    await store.add(1);
    await store.add(2);

  }

  // function get products from indexeddb
  async getProducts() {
    const db = await this.openDb();
    const tx = db.transaction('products', 'readwrite');
    const store = tx.objectStore('products');
    const products = await store.getAll();
    this.products = products;
  }


  render() {
    return this.products.map(product => html`
      <product-card
        .product="${product}"
      >
      <button @click="${this.addProduct}">Add to card</button>
      </product-card>
    `);
  }
}
customElements.define('app-home', AppHome);
