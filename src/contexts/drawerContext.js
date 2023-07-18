import { createContext, useContext, useEffect, useState } from 'react';

export const DrawerContext = createContext();

export const DrawerProvider = ({ children }) => {
    const [drawerOpened, setDrawerOpened] = useState(false);

    return (
        <DrawerContext.Provider value={{ drawerOpened, setDrawerOpened }}>
            {children}
        </DrawerContext.Provider>
    );
};

export const useDrawerContext = () => {
    const context = useContext(DrawerContext);
    if (!context) {
        throw new Error(
            'useDrawerContext must be used within a DrawerProvider'
        );
    }
    return context;
};
