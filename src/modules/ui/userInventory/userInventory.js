import { LightningElement, api } from 'lwc';
import { getProductsByFamilyMember } from 'data/apiService';

export default class ProductList extends LightningElement {
    products = [];

    @api
    get familyMemberId() {
        return this._familyMemberId;
    }

    set familyMemberId(value) {
        this._familyMemberId = value;
        getProductsByFamilyMember(this._familyMemberId).then((result) => {
            this.products = this.allproducts = result;
        });
    }
}
