import { LitElement, html, css } from 'lit';
import { Base } from '../Base';

export class Cart extends Base {

  render() {
    return html  `
    <div>test</div>
  `;
}
}
customElements.define('product-cart', Cart);