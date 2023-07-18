import React from 'react';
import { useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword
} from 'firebase/auth';
import { auth, signInWithGoogle } from '../../firebase-config';
import { useUserContext } from '../../contexts/userContext';

const SignIn = () => {
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const { setCurrentUser } = useUserContext();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
            } else {
                setCurrentUser(null);
            }
        });
    }, [auth.currentUser]);

    const register = async () => {
        try {
            await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword
            );
        } catch (error) {
            window.alert(error.message.split(':')[1].trim());
        }
    };

    const login = async () => {
        try {
            await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        } catch (error) {
            console.log(error);
        }
    };

    const inputStyle =
        'py-2 px-4 my-1 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent';
    const formTitleStyle =
        'font-bold text-2xl text-gray-700 text-center my-2 uppercase';
    const formButtonStyle =
        'text-gray-100 bg-gray-700 rounded-md p-2 my-2 hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-400 active:scale-95';
    const googleButtonStyle =
        'flex items-center bg-blue-500 h-full pl-1 pt-1 pr-4 pb-1 rounded text-gray-100 font-bold';

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col">
                <h3 className={formTitleStyle}>Register</h3>
                <input
                    className={inputStyle}
                    placeholder={'E-mail'}
                    onBlur={(event) => setRegisterEmail(event.target.value)}
                />
                <input
                    className={inputStyle}
                    placeholder={'Password'}
                    onChange={(event) =>
                        setRegisterPassword(event.target.value)
                    }
                    type={'password'}
                />

                <button className={formButtonStyle} onClick={register}>
                    Register
                </button>
            </div>
            <hr className="my-4 w-full" />
            <div className="flex flex-col">
                <h3 className={formTitleStyle}>Login</h3>
                <input
                    className={inputStyle}
                    placeholder={'E-mail'}
                    onBlur={(event) => setLoginEmail(event.target.value)}
                />
                <input
                    className={inputStyle}
                    placeholder={'Password'}
                    onChange={(event) => setLoginPassword(event.target.value)}
                    type={'password'}
                />

                <button className={formButtonStyle} onClick={login}>
                    Login
                </button>
            </div>
            <hr className="my-4 w-full" />
            <div className="flex flex-col">
                <h3 className={formTitleStyle}>Or</h3>
                <button
                    className={googleButtonStyle}
                    onClick={signInWithGoogle}
                >
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                        alt="Google G Logo"
                        className="w-8 h-8 m-0 mr-2 bg-white rounded p-1"
                    />
                    Sign in with Google
                </button>
            </div>
        </div>
    );
};

export default SignIn;
