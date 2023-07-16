import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './contexts/userContext';
import { SelectedAppProvider } from './contexts/selectedAppContext';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <UserProvider>
        <SelectedAppProvider>
            <App />
        </SelectedAppProvider>
    </UserProvider>
    // </React.StrictMode>
);

reportWebVitals();
