import React, { useState } from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';

import './sign-in.styles.scss';

const SignIn = ({ googleSignInStart, emailSignInStart}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        // handling sign in with email and password.
        emailSignInStart(email, password);
    };

    function handleChange(event) {
        const { value, name } = event.target;

        name === 'email' ? setEmail(value) : setPassword(value);
    };

    return(
        <div className='sign-in'>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput 
                    handleChange={handleChange} 
                    name='email' 
                    type='email' 
                    value={email} 
                    label='email'
                    required
                />

                <FormInput
                    handleChange={handleChange} 
                    name='password' 
                    type='password' 
                    value={password} 
                    label='password'
                    required
                />
                <div className='button-container'>
                    <CustomButton type='submit'>SIGN IN</CustomButton>
                    <CustomButton 
                        type='button'
                        onClick={googleSignInStart} 
                        isGoogleSignIn
                    >
                        SIGN IN WITH GOOGLE
                    </CustomButton>
                </div>
            </form>
        </div>

    );
};

const mapDispatchToProps = (dispatch) => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password })),
});

export default connect(null, mapDispatchToProps)(SignIn);