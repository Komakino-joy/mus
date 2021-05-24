import React from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckOutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51IAKQiAfH5Y7ehIBdPh3zS9qgwPH3RaKi2cHPPwzODREbrBocMdnZF33p9yUYnKKSTlvMWoRZ66loaDEoI60JjkY00VKuFJgt5';

    const onToken = (token) => {
        axios({
            url: 'http://localhost:5000/payment',
            method: 'post',
            data:{
                amount: priceForStripe,
                token: token,
            }
        })
        .then(res => {
            alert('Payment Successful')
        })
        .catch(error => {
            console.log('Payment error: ', JSON.parse(error))
            alert('There was an issue with your payment, please use the provided credit card number.')
        });
    };

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