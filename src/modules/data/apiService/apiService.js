const apiUrl = process.env.API_URL || 'http://localhost:5000'; // eslint-disable-line
const PRODUCTS_URL = `${apiUrl}/api/v1/products`;
const MEMBERS_URL = `${apiUrl}/api/v1/members`;

export const getProducts = () =>
    fetch(PRODUCTS_URL)
        .then((response) => {
            if (!response.ok) {
                throw new Error('No response from server');
            }
            return response.json();
        })
        .then((result) => {
            return result;
        });

export const getProductsByFamilyMember = (familyMemberId) =>
    fetch(`${PRODUCTS_URL}/${familyMemberId}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('No response from server');
            }
            return response.json();
        })
        .then((result) => {
            return result;
        });

export const getFamilyMembers = () =>
    fetch(`${MEMBERS_URL}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('No response from server');
            }
            return response.json();
        })
        .then((result) => {
            return result;
        });

export const getFamilyMember = (familyMemberId) =>
    fetch(`${MEMBERS_URL}/${familyMemberId}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('No response from server');
            }
            return response.json();
        })
        .then((result) => {
            return result;
        });

export const purchaseProducts = (
    productId,
    familyMemberId,
    unitsToPurchase
) => {
    const opts = { productId, unitsToPurchase };
    return fetch(`${PRODUCTS_URL}/${familyMemberId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(opts)
    }).then((response) => {
        if (!response.ok) {
            throw new Error('No response from server');
        }
    });
};
