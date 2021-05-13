import { createSelector } from 'reselect';

//TODO: Input Selector
const selectCart = (state) => state.cart;

//TODO: createSelector takes two params, an Array of input selectors 
//TODO: and a function that returns the value we want from the selector. 
//TODO: params is each output of the input selectors in the array, in the order they were written.
export const selectCartItems= createSelector(
    [selectCart],
    (cart) => cart.cartItems
);

export const  selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce(
        (accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity, 0)
);