import { LightningElement, api } from 'lwc';
import { getProducts } from 'data/apiService';

export default class ProductList extends LightningElement {
    @api familyMembers;
    products = [];

    connectedCallback() {
        getProducts()
            .then((result) => {
                this.products = this.allproducts = result;
            })
            .catch((error) => {
                console.log(`Error retrieving products: ${error}`);
            });
    }

    handleShowModal(event) {
        const type = event.detail.type;
        const message = event.detail.message;
        const modal = this.template.querySelector('ui-modal');
        modal.type = type;
        modal.message = message;
        modal.open();
    }
}
