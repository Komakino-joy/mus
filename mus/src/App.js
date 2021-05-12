import { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from '../src/components/header/header.component';
import Homepage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/signin-and-sign-up/signin-and-sign-up.component';

import './App.css';

import { auth } from './firebase/firebase.utils';

function App() {

  const [currentUser, setCurrentUser] = useState(null);
  let unsubcribeFromAuth = null;

  //TODO: sets persistent user session for firebase.
  //TODO: this is an open subscription to firebase, connection is always open when app is mounted on DOM.
  //TODO: close subscription on Unmount
  unsubcribeFromAuth = auth.onAuthStateChanged(user => {
    setCurrentUser(user);
  });

  useEffect(() => {
    return () => {
      unsubcribeFromAuth();
    };
  },);

  
  return (
    <>
      <Header currentUser={currentUser}/>
      <button onClick={() => console.log(currentUser)}>CONSOLE LOG auth</button>
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route exact path='/shop' component={ShopPage} />
        <Route exact path='/signin' component={SignInAndSignUpPage} />
      </Switch>
    </>
  );
};

export default App;
