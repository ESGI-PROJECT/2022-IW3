import { html } from 'lit';
import { Base } from '../Base';
import "../components/cart";

export class AppCart extends Base {
  constructor() {
    super();

    this.product = [];
  }

  static get properties() {
    return {
      products :{type:Array},
    }
  }

  render() {
    return html `
  <div> 
    <h1>${this.product.title}</h1>
    <p>test</p>
  </div>
`;
}
}
customElements.define('app-cart', AppCart);