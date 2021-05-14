import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';

const selectShop = (state) => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    (shop) => shop.collections 
);


//TODO: converts object into an array 
export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => Object.keys(collections).map(key => collections[key])
);

//TODO: Curried function
//TODO: Very important to note that if I were to wrap my retrun in {} I would not be able to use the selector. 
//TODO: took a while to find bug
//TODO: Try to understand the memoize function . 
export const selectCollection = memoize((collectionUrlParam) => 
    createSelector(
        [selectCollections],
        collections => collections[collectionUrlParam]
    )
);