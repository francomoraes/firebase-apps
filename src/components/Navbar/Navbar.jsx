import React from 'react';
import SignOut from '../SignOut/SignOut';
import BurguerButton from '../BurguerButton/BurguerButton';

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center h-16">
            <BurguerButton />
            <SignOut />
        </nav>
    );
};

export default Navbar;
