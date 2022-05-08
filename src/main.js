import page from 'page';
import checkConnectivity from 'network-latency';
import { setRessources, setRessource, getRessources, getRessource, getChartDB, setChartDB } from './idbHelper';

import { getProducts, getProduct, setProduct, getChart, setChart } from './api/products';
import "./views/app-home";

(async(root) => {
    const skeleton = root.querySelector('.skeleton');
    const main = root.querySelector('main');

    checkConnectivity({
        timeToCount: 3,
        threshold: 2000,
        interval: 3000
    });

    let NETWORK_STATE = true;

    document.addEventListener('connection-changed', ({ detail: state }) => {
        NETWORK_STATE = state;

        if (state) {
            document.documentElement.style.setProperty('--app-bg-color', 'royalblue');
        } else {
            document.documentElement.style.setProperty('--app-bg-color', '#858994');
        }
    });

    const AppHome = main.querySelector('app-home');
    const AppProduct = main.querySelector('app-product');
    const AppChart = main.querySelector('app-chart');

    page('*', (ctx, next) => {
        skeleton.removeAttribute('hidden');

        AppHome.active = false;
        AppProduct.active = false;
        AppChart.active = false;

        next();
    });

    page('/', async(ctx) => {
        const products = await getProducts();

        let storedProducts = []

        if (NETWORK_STATE) {
            const products = await getProducts();
            storedProducts = await setRessources(products)

            //await getF;
        } else {
            storedProducts = await getRessources();
        }

        AppHome.products = storedProducts;
        AppChart.network = NETWORK_STATE;

        AppHome.active = true;

        skeleton.setAttribute('hidden', '');
    });

    //route vers la parge /cart
    page('/cart', async(ctx) => {
        await
        import ('./views/app-cart.js');
        const products = await getChart();
        let storedProducts = []

        if (NETWORK_STATE) {
            const product_offline = await getChartDB();
            if (products != product_offline) {
                console.log("ok");
                storedProducts = await setChart(product_offline);
            } else {
                console.log("pas ok");
                storedProducts = await setChartDB(products)
            }
        } else {
            storedProducts = await getChartDB();
        }
        AppChart.products = storedProducts;
        AppChart.network = NETWORK_STATE;

        AppChart.active = true;

        skeleton.setAttribute('hidden', '');
    });

    page('/product/:id', async({ params }) => {
        await
        import ('./views/app-product.js');
        const product = await getProduct(params.id);

        let storedProduct = {};

        if (NETWORK_STATE) {
            storedProduct = await setRessource(product);
        } else {
            storedProduct = await getRessource(params.id);
        }

        AppProduct.product = storedProduct;
        AppChart.network = NETWORK_STATE;

        AppProduct.active = true;
        skeleton.setAttribute('hidden', '');
    });

    page();

})(document.querySelector('#app'));