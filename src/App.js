import { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../src/components/header/header.component';
import Homepage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/signin-and-sign-up/signin-and-sign-up.component';

import './App.css';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';

function App({ setCurrentUser, currentUser }) {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header/>
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route path='/shop' component={ShopPage} />
        <Route 
          exact path='/signin' 
          render={() => currentUser ? (<Redirect to='/'/>) : (<SignInAndSignUpPage/>) } />
      </Switch>
    </>
  );
};

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
