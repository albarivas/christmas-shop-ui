import { LightningElement, api } from 'lwc';
import { purchaseProducts } from 'data/apiService';

export default class ProductTile extends LightningElement {
    _product;
    familyMemberId;
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
        return `http://localhost:3002/${this.product.picture}`;
    }

    // TODO: get from server
    get options() {
        return [
            { label: ' --- ', value: '0' },
            { label: ' Ana', value: '1' },
            { label: ' Edi', value: '2' },
            { label: ' Raúl', value: '3' },
            { label: ' Feli', value: '4' },
            { label: ' Alba', value: '5' },
            { label: ' Patxi', value: '6' }
        ];
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
