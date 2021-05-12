import { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from '../src/components/header/header.component';
import Homepage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/signin-and-sign-up/signin-and-sign-up.component';

import './App.css';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

function App() {

  const [currentUser, setCurrentUser] = useState(null);
  
  //TODO: sets persistent user session for firebase.
  //TODO: this is an open subscription to firebase, connection is always open when app is mounted on DOM.
  //TODO: close subscription on Unmount

  useEffect(() => {
    let unsubcribeFromAuth = null;
    unsubcribeFromAuth = auth.onAuthStateChanged( async(userAuth) =>{
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
          setCurrentUser({id:snapshot.id, ...snapshot.data()});
        })
      }else{
        // set current user to null
        setCurrentUser(userAuth);
      };
    })
    return () => {
      unsubcribeFromAuth();
    };
  }, []);

  return (
    <>
      <Header currentUser={currentUser}/>
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route exact path='/shop' component={ShopPage} />
        <Route exact path='/signin' component={SignInAndSignUpPage} />
      </Switch>
    </>
  );
};

export default App;
