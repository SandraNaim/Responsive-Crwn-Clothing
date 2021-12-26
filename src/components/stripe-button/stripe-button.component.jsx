import React from "react";
import StripeCheckout from 'react-stripe-checkout';

const StripCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100
    const publishableKey = 'pk_test_51K1RpsE1UWFesqIa1I6gJhaefqaSI8l75kZD3AFn54jYM1D4RBaeXB28EYM0XD4eCgUygZqkX4NcKDbf9nokTwd200DZHwRO8U'   // from the stripe account > API Key page

    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
    }

    return (
        <StripeCheckout 
            label= 'Pay Now'
            name= 'CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            image= 'https://svgshare.com/i/CUz.svg'
            desccrition={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
        stripeKey={publishableKey}
        />
    );
};

export default StripCheckoutButton;