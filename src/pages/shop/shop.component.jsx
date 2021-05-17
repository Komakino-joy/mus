import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { updateCollections } from '../../redux/shop/shop.actions'

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

//TODO: nice use of the Nested Routes idea.
const ShopPage = ({ match, updateCollections }) => {

    const [isLoading, setIsLoading] = useState(true);

    let unsubscribeFromSnapshot = null;

    useEffect(() => {
        const collectionRef = firestore.collection('collections'); 

        collectionRef.onSnapshot( async(snapShot) => {
            const collectionsMap =  convertCollectionsSnapshotToMap(snapShot);
            updateCollections(collectionsMap);
            setIsLoading(false);
        });
        
        return () => {
            // cleanup
        } 
    }, [updateCollections])

    return (
        <div className='shop-page'>
            <Route 
                exact path={`${match.path}`} 
                render={(props) => <CollectionsOverviewWithSpinner 
                isLoading={isLoading} {...props}/>}
            />
            <Route 
                path={`${match.path}/:collectionId`} 
                render={(props) => <CollectionPageWithSpinner 
                        isLoading={isLoading} {...props}/>} 
            />
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    updateCollections: (collectionsMap) => dispatch(updateCollections(collectionsMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);