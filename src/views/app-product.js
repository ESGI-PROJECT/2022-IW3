import { html } from 'lit';
import { Base } from '../Base';
import { setChart, getChart } from '../api/products';
import { setOneChart, getChartDB } from '../idbHelper';

export class AppProduct extends Base {
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
        }
    }

    firstUpdated() {
        const image = this.querySelector('img');
        image.addEventListener('load', () => {
            this.loaded = true;
        });
    }

    //function setProduct in chart
    async _handleClick() {
        let data = [];
        if (this.network) {
            const test = await getChart();
            console.log(test);
            if (test.data === undefined) {
                data = {
                    "id": this.product.id,
                    "title": this.product.title,
                    "price": this.product.price,
                    "description": this.product.description,
                    "category": this.product.category,
                    "image": this.product.image,
                    "rating": {
                        "rate": this.product.rating.rate,
                        "count": this.product.rating.count
                    }
                };
            } else {
                //console.log(test.data[0]);
                //console.log([this.product]);
                const a = test.data[0];
                console.log(a);
                a.push(this.product);
                data = [a];
            }
            console.log(data);
            setChart(data);
            //console.log("coucou");
        } else {
            const test = await getChartDB();
            console.log(test);
            if (test.data === undefined) {
                data = {
                    "id": this.product.id,
                    "title": this.product.title,
                    "price": this.product.price,
                    "description": this.product.description,
                    "category": this.product.category,
                    "image": this.product.image,
                    "rating": {
                        "rate": this.product.rating.rate,
                        "count": this.product.rating.count
                    }
                };
            } else {
                //console.log(test.data[0]);
                //console.log([this.product]);
                const a = test.data[0];
                console.log(a);
                a.push(this.product);
                data = [a];
            }
            console.log(data);
            setOneChart(data);
            //console.log("coucou");
        }

    }

    render() {
        return html `
      <section class="product">
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
          <button @click="${this._handleClick}">Ajouter au panier</button>
        </main>
      </section>
    `;
    }
}
customElements.define('app-product', AppProduct);