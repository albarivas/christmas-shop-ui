import { LightningElement, api } from 'lwc';
import { getProductsByFamilyMember, getFamilyMember } from 'data/apiService';

export default class ProductList extends LightningElement {
    products = [];
    familyMember;

    @api
    get familyMemberId() {
        return this._familyMemberId;
    }

    set familyMemberId(value) {
        this._familyMemberId = value;
        this.getProducts();
        this.getFamilyMember();
    }

    getProducts() {
        getProductsByFamilyMember(this._familyMemberId)
            .then((result) => {
                this.products = this.allproducts = result;
            })
            .catch((error) => {
                console.log(
                    `Error retrieving family member products: ${error}`
                );
                this.showModal('error', 'Error retrieving member products');
            });
    }

    getFamilyMember() {
        getFamilyMember(this._familyMemberId)
            .then((result) => {
                this.familyMember = result[0];
            })
            .catch((error) => {
                console.log(`Error retrieving family member: ${error}`);
                this.showModal('error', 'Error retrieving family member');
            });
    }

    showModal(type, message) {
        const modal = this.template.querySelector('ui-modal');
        modal.type = type;
        modal.message = message;
        modal.open();
    }
}
