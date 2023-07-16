import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './contexts/userContext';
import { SelectedAppProvider } from './contexts/selectedAppContext';
import { RockPaperScissorsProvider } from './contexts/rockPaperScissorsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <UserProvider>
        <SelectedAppProvider>
            <RockPaperScissorsProvider>
                <App />
            </RockPaperScissorsProvider>
        </SelectedAppProvider>
    </UserProvider>
    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
