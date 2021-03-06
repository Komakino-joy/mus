import React from 'react';
import { connect } from 'react-redux';

import { clearItemFromCart, addItemToCart, removeItemFromCart} from '../../redux/cart/cart.actions';

import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem, clearItem, removeItem, addItem }) => {

    const { imageUrl, name, quantity, price } = cartItem;

    return(
        <div className='checkout-item'>
            <div className='image-container'>
                <img src={imageUrl} alt='item'/>
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div onClick={()=> removeItem(cartItem)} className='arrow'>&#10094;</div>
                    <span className='value'>{quantity}</span>
                <div onClick={()=> addItem(cartItem)} className='arrow'>&#10095;</div>
                </span>
            <span className='price'>{price}</span>
            <div onClick={()=> clearItem(cartItem)} className='remove-button'>&#10005;</div>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    clearItem: (cartItem) => dispatch(clearItemFromCart(cartItem)),
    addItem: (cartItem) => dispatch(addItemToCart(cartItem)),
    removeItem: (cartItem) => dispatch(removeItemFromCart(cartItem)),
})

export default connect(null, mapDispatchToProps)(CheckoutItem);