import { signOut } from 'firebase/auth';
import React from 'react';
import { auth } from '../../firebase-config';
import { useUserContext } from '../../contexts/userContext';

const SignOut = () => {
    const { currentUser } = useUserContext();

    const logout = async () => {
        await signOut(auth);
    };
    return (
        <div>
            <p>User logged in</p>
            {currentUser?.email}
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default SignOut;
