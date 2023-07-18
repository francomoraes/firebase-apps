import React from 'react';
import { useEffect, useState } from 'react';
import { db } from '../../firebase-config';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { useSelectedAppContext } from '../../contexts/selectedAppContext';

const AppsList = () => {
    const [appsList, setAppsList] = useState([]);
    const appsCollectionRef = collection(db, 'apps-list');

    const { selectedApp, setSelectedApp } = useSelectedAppContext();

    useEffect(() => {
        const getAppsList = async () => {
            const data = await getDocs(appsCollectionRef);
            setAppsList(
                data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
        };

        getAppsList();
    }, []);

    const selectApp = async (id) => {
        const data = await getDocs(appsCollectionRef);
        data.docs.forEach((item) => {
            if (item.id !== id) {
                const newStatus = { selected: false };
                const applistDoc = doc(db, 'apps-list', item.id);
                updateDoc(applistDoc, newStatus);
            }
        });

        const newStatus = { selected: true };
        const applistDoc = doc(db, 'apps-list', id);
        await updateDoc(applistDoc, newStatus);

        const selectedApp = data.docs.find((item) => item.id === id);
        setSelectedApp({ ...selectedApp.data(), selected: true });
    };

    return (
        <div className="py-4 pt-8">
            <h1 className="text-2xl mb-4 pl-4">Apps List</h1>
            <ul>
                {appsList?.map((app) => (
                    <li
                        key={app.id}
                        className={`py-2 hover:bg-gray-300 w-full px-4 cursor-pointer ${
                            app.selected && 'bg-gray-400'
                        }`}
                    >
                        <button onClick={() => selectApp(app.id)}>
                            {app.name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AppsList;
