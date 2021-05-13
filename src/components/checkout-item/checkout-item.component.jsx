import React from 'react';
import { connect } from 'react-redux';

import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem: { name, imageUrl, price, quantity } }) => {

    return(
        <div className='checkout-item'>
            <div className='image-container'>
                <img src={imageUrl} alt='item-image'/>
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>{quantity}</span>
            <span className='price'>{price}</span>
            <div className='remove'>&#10005;</div>
        </div>
    );
};

export default CheckoutItem;