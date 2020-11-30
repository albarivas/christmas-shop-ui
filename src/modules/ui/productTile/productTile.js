import { LightningElement, api } from 'lwc';

export default class ProductTile extends LightningElement {
    @api product;

    get pictureUrl() {
        return `http://localhost:3002/${this.product.picture}`;
    }
}
