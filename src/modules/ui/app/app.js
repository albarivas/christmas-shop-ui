import { LightningElement } from 'lwc';

export default class App extends LightningElement {
    familyMemberId;
    state;

    constructor() {
        super();
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        if (urlParams.has('member')) {
            this.familyMemberId = urlParams.get('member'); // TODO: SOQL Injection
        }
    }

    // TODO: get from server
    get options() {
        return [
            { label: ' All Products ', value: '0' },
            { label: ' Ana', value: '1' },
            { label: ' Edi', value: '2' },
            { label: ' Raúl', value: '3' },
            { label: ' Feli', value: '4' },
            { label: ' Alba', value: '5' },
            { label: ' Patxi', value: '6' }
        ];
    }

    handleChange(event) {
        this.state = event.detail.value;
        if (this.state === '0') {
            this.familyMemberId = null;
            window.history.pushState(
                null,
                null,
                window.location.href.split('?')[0]
            );
        } else {
            this.familyMemberId = this.state;
            window.history.pushState(this.state, null, `?member=${this.state}`);
        }
    }
}
