const GET_PRODUCTS_URL = 'http://localhost:3002/api/v1/products';

let products = [];

export const getProducts = () =>
    fetch(GET_PRODUCTS_URL)
        .then((response) => {
            if (!response.ok) {
                throw new Error('No response from server');
            }
            return response.json();
        })
        .then((result) => {
            products = result;
            return products;
        });

export const getProductsByFamilyMember = (familyMemberId) =>
    fetch(`${GET_PRODUCTS_URL}/${familyMemberId}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('No response from server');
            }
            return response.json();
        })
        .then((result) => {
            products = result;
            return products;
        });

export const getProduct = (productNumber) => {
    return products.find((product) => {
        return product.id === productNumber;
    });
};
