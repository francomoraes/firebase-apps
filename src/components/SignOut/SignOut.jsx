import { signOut } from 'firebase/auth';
import React from 'react';
import { auth } from '../../firebase-config';
import { useUserContext } from '../../contexts/userContext';
import { useSelectedAppContext } from '../../contexts/selectedAppContext';

const SignOut = () => {
    const { currentUser } = useUserContext();
    const { setSelectedApp } = useSelectedAppContext();

    const logout = async () => {
        setSelectedApp({});
        await signOut(auth);
    };

    const formButtonStyle =
        'text-gray-100 bg-gray-700 rounded-md p-2 m-2 hover:bg-gray-600';

    return (
        <div>
            {currentUser?.email}
            <button className={formButtonStyle} onClick={logout}>
                Logout
            </button>
        </div>
    );
};

export default SignOut;
