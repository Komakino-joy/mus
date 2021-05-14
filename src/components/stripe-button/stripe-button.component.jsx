import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckOutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51IAKQiAfH5Y7ehIBdPh3zS9qgwPH3RaKi2cHPPwzODREbrBocMdnZF33p9yUYnKKSTlvMWoRZ66loaDEoI60JjkY00VKuFJgt5';

    const onToken = (token) => {
        console.log(token);
        alert('Payment successful');
    }

    return(
        <StripeCheckout
            label='Proceed to payment'
            name='Mus-Shop Ltd.'
            billingAddress
            shippingAddress
            // image='secure url needed'
            description= {`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripeCheckOutButton;