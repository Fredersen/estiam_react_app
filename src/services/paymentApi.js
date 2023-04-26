import axios from "axios";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

function createCheckoutSession(productsForCheckout, orderId) {
    return axios
        .post(apiBaseUrl + "/api/payments/create-checkout-session/" + orderId, productsForCheckout)
        .then(response => window.location.href = response.data.url);
}

function productsForCheckout(products) {
    const productsForStripe = [];
    for (const product of products) {
        productsForStripe.push({
            price_data: {
                currency: 'eur',
                unit_amount: product.price * 100,
                product_data: {
                    name: product.name,
                    description: product.description
                }
            },
            quantity: product.quantity,
        });
    }
    return productsForStripe;
}

function carrierForCheckout(carrier) {
    return {
        price_data: {
            currency: 'eur',
            unit_amount: carrier.price * 100,
            product_data: {
                name: carrier.name,
                description: carrier.description,
            }
        },
        quantity: 1,
    }
}



export default {
    createCheckoutSession,
    productsForCheckout,
    carrierForCheckout
}