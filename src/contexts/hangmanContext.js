import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    addDoc,
    collection,
    getDocs,
    updateDoc,
    doc
} from 'firebase/firestore';
import { db } from '../firebase-config';
import { useUserContext } from './userContext';

export const HangmanContext = createContext();

export const HangmanProvider = (props) => {
    const { currentUser } = useUserContext();

    const [wins, setWins] = useState(0);
    const [losses, setLosses] = useState(0);

    const updateWins = () => setWins(wins + 1);
    const updateLosses = () => setLosses(losses + 1);

    const hangmanCollectionRef = collection(db, 'hangman-data');

    useEffect(() => {
        const createScoresTable = async () => {
            const data = await getDocs(hangmanCollectionRef);
            const appData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }));

            const useDataTable = appData.find(
                (data) => data.userId === currentUser?.uid
            );

            if (!useDataTable && currentUser) {
                await addDoc(hangmanCollectionRef, {
                    wins: 0,
                    losses: 0,
                    userId: currentUser?.uid
                });

                // reset current state score so new user will not "catch" old score
                setLosses(0);
                setWins(0);
            }
        };

        createScoresTable();
    }, [currentUser]);

    useEffect(() => {
        const updateScoresTable = async () => {
            const data = await getDocs(hangmanCollectionRef);
            const appData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }));

            const currentDoc = appData.find(
                (user) => user.userId === currentUser?.uid
            );

            if (!currentDoc) {
                return;
            } else {
                const userDoc = doc(db, 'hangman-data', currentDoc.id);
                const newValues = {
                    wins: wins,
                    losses: losses
                };
                await updateDoc(userDoc, newValues);
            }
        };

        updateScoresTable();
    }, [wins, losses]);

    useEffect(() => {
        const getScoresFromDb = async () => {
            const data = await getDocs(hangmanCollectionRef);
            const appData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }));

            const userData = appData.find(
                (item) => item.userId === currentUser?.uid
            );

            if (userData) {
                setWins(userData.wins);
                setLosses(userData.losses);
            }
        };

        getScoresFromDb();
    }, [currentUser]);

    return (
        <HangmanContext.Provider
            value={{
                wins,
                losses,
                updateWins,
                updateLosses
            }}
        >
            {props.children}
        </HangmanContext.Provider>
    );
};

export const useHangmanContext = () => {
    if (!HangmanContext) {
        throw new Error(
            'useHangmanContext must be used within a HangmanProvider'
        );
    }
    return useContext(HangmanContext);
};
