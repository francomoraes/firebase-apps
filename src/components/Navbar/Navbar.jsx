import React from 'react';
import SignOut from '../SignOut/SignOut';
import BurguerButton from '../BurguerButton/BurguerButton';
import { useDrawerContext } from '../../contexts/drawerContext';
import CloseButton from '../CloseButton/CloseButton';

const Navbar = () => {
    const { drawerOpened, setDrawerOpened } = useDrawerContext();
    const handleDrawer = () => {
        setDrawerOpened(!drawerOpened);
    };

    return (
        <nav
            className={`absolute flex justify-between items-center w-full h-16 bg-gray-200 ${
                drawerOpened && 'pl-44'
            } transition-all`}
        >
            {!drawerOpened && <BurguerButton onClick={handleDrawer} />}
            {drawerOpened && <CloseButton onClick={handleDrawer} />}
            <SignOut />
        </nav>
    );
};

export default Navbar;
