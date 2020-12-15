import { LightningElement } from 'lwc';
import { getFamilyMembers } from 'data/apiService';

export default class App extends LightningElement {
    familyMemberId;
    state;
    familyMembers = [];

    constructor() {
        super();
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        if (urlParams.has('member')) {
            this.familyMemberId = urlParams.get('member');
        }
        window.onpopstate = (event) => {
            if (event.state) {
                this.state = event.state;
                this.familyMemberId = this.state;
            }
        };
    }

    connectedCallback() {
        getFamilyMembers()
            .then((results) => {
                const opts = [{ label: ' --- ', value: '0' }];
                results.forEach((member) => {
                    opts.push({
                        label: member.family_member_name,
                        value: '' + member.id
                    });
                });
                this.familyMembers = opts;
            })
            .catch((error) => {
                console.log(`Error retrieving family members: ${error}`);
                this.showModal('error', 'Error retrieving family members');
            });
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

    showModal(type, message) {
        const modal = this.template.querySelector('ui-modal');
        modal.type = type;
        modal.message = message;
        modal.open();
    }
}
