import React, { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

import './sign-in.styles.scss';

const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        // handling sign in with email and password.
        try {
            await auth.signInWithEmailAndPassword(email, password);
            setEmail('');
            setPassword('');
        } catch (error) {
            console.log(error);
        };
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