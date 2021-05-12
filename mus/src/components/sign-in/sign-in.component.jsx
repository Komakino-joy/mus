import React, { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { signInWithGoogle } from '../../firebase/firebase.utils';

import './sign-in.styles.scss';

const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        setEmail('');
        setPassword('');
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
                    <CustomButton onClick={signInWithGoogle} isGoogleSignIn>SIGN IN WITH GOOGLE</CustomButton>
                </div>
            </form>
        </div>

    );
};

export default SignIn;