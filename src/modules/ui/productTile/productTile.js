import { LightningElement, api } from 'lwc';
import { purchaseProducts } from 'data/apiService';

export default class ProductTile extends LightningElement {
    _product;
    familyMemberId;
    @api familyMembers;
    unitsToPurchase;

    @api
    get product() {
        return this._product;
    }

    set product(value) {
        this._product = value;
        this.unitsToPurchase = value.units_in_inventory;
    }

    get pictureUrl() {
        return `https://my-christmas-shop-api.herokuapp.com/${this.product.picture}`;
    }

    get options() {
        return this.familyMembers;
    }

    handleComboboxChange(event) {
        this.familyMemberId = event.detail.value;
    }

    handleInputChange(event) {
        this.unitsToPurchase = Number(event.detail.value);
    }

    handleAddToCartClick() {
        purchaseProducts(
            this.product.id,
            this.familyMemberId,
            this.unitsToPurchase
        )
            .then(() => {
                this.dispatchEvent(
                    new CustomEvent('showmodal', {
                        detail: {
                            type: 'success',
                            message: 'Products purchased correctly.'
                        }
                    })
                );
            })
            .catch((error) => {
                console.log(`Error purchasing products: ${error}`);
                this.dispatchEvent(
                    new CustomEvent('showmodal', {
                        detail: {
                            type: 'error',
                            message: 'Error purchasing products.'
                        }
                    })
                );
            });
    }
}
