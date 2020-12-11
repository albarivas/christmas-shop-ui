import { LightningElement, api } from 'lwc';

const SUCCESS_CLASS = 'slds-theme--success';
const ERROR_CLASS = 'slds-theme--error';

export default class Modal extends LightningElement {
    @api type = 'error';
    @api message = 'Unknown error';

    renderedCallback() {
        // Close after 2 seconds
        setTimeout(() => {
            this.template.querySelector(
                '.slds-notify-container'
            ).style.visibility = 'hidden';
        }, 2000);
    }

    get modalClass() {
        const computedClass =
            this.type === 'error' ? ERROR_CLASS : SUCCESS_CLASS;
        return `slds-notify slds-notify--toast ${computedClass}`;
    }

    @api
    open() {
        this.template.querySelector('.slds-notify-container').style.visibility =
            'visible';
    }

    close() {
        this.template.querySelector('.slds-notify-container').style.visibility =
            'hidden';
    }
}
