import React from 'react';
import { useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword
} from 'firebase/auth';
import { auth } from '../../firebase-config';
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
            console.log(error);
        }
    };

    const login = async () => {
        try {
            await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div className="">
                <h3>Register User</h3>
                <input
                    placeholder="E-mail"
                    onBlur={(event) => setRegisterEmail(event.target.value)}
                />
                <input
                    placeholder="Password"
                    onChange={(event) =>
                        setRegisterPassword(event.target.value)
                    }
                />

                <button onClick={register}>Create User</button>
            </div>
            <div className="">
                <h3>Login</h3>
                <input
                    placeholder="E-mail"
                    onChange={(event) => setLoginEmail(event.target.value)}
                />
                <input
                    placeholder="Password"
                    onChange={(event) => setLoginPassword(event.target.value)}
                />

                <button onClick={login}>Login</button>
            </div>
        </div>
    );
};

export default SignIn;
