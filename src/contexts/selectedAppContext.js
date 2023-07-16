import React, { createContext, useState, useEffect, useContext } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs } from 'firebase/firestore';

export const SelectedAppContext = createContext();

export const SelectedAppProvider = ({ children }) => {
    const [selectedApp, setSelectedApp] = useState({});

    useEffect(() => {
        const getSelectedApp = async () => {
            const appsCollectionRef = collection(db, 'apps-list');
            const data = await getDocs(appsCollectionRef);
            const applist = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }));
            const selectedApp = applist.reduce((acc, app) => {
                if (app.selected) {
                    return app;
                }
                return acc;
            }, {});
            setSelectedApp(selectedApp);
        };
        getSelectedApp();
    }, []);

    return (
        <SelectedAppContext.Provider value={{ selectedApp, setSelectedApp }}>
            {children}
        </SelectedAppContext.Provider>
    );
};

export const useSelectedAppContext = () => {
    const context = useContext(SelectedAppContext);
    if (!context) {
        throw new Error(
            'useSelectedAppContext must be used within a SelectedAppProvider'
        );
    }
    return context;
};
