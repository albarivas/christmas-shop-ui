import { LightningElement, api } from 'lwc';

export default class ProductTile extends LightningElement {
    @api product;

    get pictureUrl() {
        const apiUrl = process.env.API_ENDPOINT || 'http://localhost:5000'; // eslint-disable-line
        return `${apiUrl}/${this.product.picture}`;
    }
}
