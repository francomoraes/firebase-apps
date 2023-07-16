import { useEffect } from 'react';
import AppsList from './components/AppsList/AppsList';
import Navbar from './components/Navbar/Navbar';
import SignIn from './components/SignIn/SignIn';
import { useSelectedAppContext } from './contexts/selectedAppContext';
import { useUserContext } from './contexts/userContext';
import RockPaperScissors from './components/RockPaperScissors/RockPaperScissors';

function App() {
    const { currentUser } = useUserContext();
    const { selectedApp } = useSelectedAppContext();

    if (!currentUser) return <SignIn />;

    return (
        <div className="App">
            <Navbar />
            <div style={{ display: 'flex' }}>
                <section>{currentUser && <AppsList />}</section>
                <aside>
                    {selectedApp.name === 'rock paper scissors' && (
                        <RockPaperScissors />
                    )}
                    {selectedApp.name === 'Color Code Game' && (
                        <div>Color Code Game</div>
                    )}
                    {!selectedApp.name && <div>selecione um app</div>}
                </aside>
            </div>
        </div>
    );
}

export default App;
