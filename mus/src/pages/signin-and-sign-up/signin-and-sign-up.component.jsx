import React from 'react';

import SignIn from '../../components/sign-in/sign-in.component';

import './signin-and-sign-up.styles.scss';

const SignInAndSignUpPage = () => {

    return(
        <div className='sign-in-and-sign-up'>SIGN IN
        <SignIn></SignIn>
        </div>
    );
};

export default SignInAndSignUpPage;