import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Header from '../src/components/header/header.component';
import Homepage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/signin-and-sign-up/signin-and-sign-up.component';
import CheckOutPage from './pages/checkout/checkout.component';

import './App.css';

import { selectCurrentUser } from './redux/user/user.selectors';

function App({currentUser}) {

  return (
    <>
      <Header/>
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/checkout' component={CheckOutPage} />
        <Route 
          exact path='/signin' 
          render={() => currentUser ? (<Redirect to='/'/>) 
                        : (<SignInAndSignUpPage/>) } 
        />
      </Switch>
    </>
  );
};

const mapStateToProps =  createStructuredSelector({
    currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(App);
