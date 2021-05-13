import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';

const COLLECTION_ID_MAP = {
    hats: 1,
    sneakers: 2,
    jackets: 3,
    womens: 4,
    mens: 5,
};

const selectShop = (state) => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    (shop) => shop.collections 
);


//TODO: Curried function
//TODO: Very important to note that if I were to wrap my retrun in {} I would not be able to use the selector. 
//TODO: took a while to find bug
//TODO: Try to understand the memoize function . 
export const selectCollection = memoize((collectionUrlParam) => 
    createSelector(
        [selectCollections],
        collections => collections.find(
            collection => collection.id === COLLECTION_ID_MAP[collectionUrlParam]
        )
    )
);