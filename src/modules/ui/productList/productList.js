import { LightningElement } from 'lwc';
import { getProducts } from 'data/apiService';

export default class ProductList extends LightningElement {
    products = [];
    connectedCallback() {
        getProducts().then((result) => {
            this.products = this.allproducts = result;
        });
    }
}
