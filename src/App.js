import AppsList from './components/AppsList/AppsList';
import Navbar from './components/Navbar/Navbar';
import SignIn from './components/SignIn/SignIn';
import { useSelectedAppContext } from './contexts/selectedAppContext';
import { useUserContext } from './contexts/userContext';
import RockPaperScissors from './components/RockPaperScissors/RockPaperScissors';
import { RockPaperScissorsProvider } from './contexts/rockPaperScissorsContext';
import { useDrawerContext } from './contexts/drawerContext';

function App() {
    const { currentUser } = useUserContext();
    const { selectedApp } = useSelectedAppContext();
    const { drawerOpened } = useDrawerContext();

    if (!currentUser)
        return (
            <div className="flex justify-center items-center h-full bg-gray-100 py-20 min-h-screen overflow-y-scroll">
                <SignIn />
            </div>
        );

    return (
        <div className="relative h-full">
            <Navbar />
            <section
                className={`absolute z-9 -left-60 top-0 ${
                    drawerOpened && 'left-0'
                } w-60 h-screen bg-gray-200 overflow-y-scroll no-scrollbar transition-all`}
            >
                <AppsList key={selectedApp.name} />
                {drawerOpened && (
                    <div className="w-[calc(100%-240px)] h-full bg-gray-500" />
                )}
            </section>
            {drawerOpened && (
                <div
                    className={`absolute ml-60 w-[calc(100%-240px)] h-full bg-gray-500 bg-opacity-30 ${
                        !drawerOpened && 'bg-opacity-0'
                    } transition-all ease-in-out`}
                />
            )}
            <div
                className={
                    'flex justify-center w-full overflow-hidden bg-gray-400 h-full'
                }
            >
                {selectedApp.name === 'rock paper scissors' && (
                    <RockPaperScissorsProvider>
                        <RockPaperScissors />
                    </RockPaperScissorsProvider>
                )}
                {selectedApp.name === 'Color Code Game' && (
                    <div>Color Code Game</div>
                )}
                {!selectedApp.name && <div>selecione um app</div>}
            </div>
        </div>
    );
}

export default App;
