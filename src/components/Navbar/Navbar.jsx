import React from 'react';
import SignOut from '../SignOut/SignOut';

const Navbar = () => {
    return (
        <nav
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                backgroundColor: 'lightblue'
            }}
        >
            navbar
            <SignOut />
        </nav>
    );
};

export default Navbar;
