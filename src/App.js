import AppsList from './components/AppsList/AppsList';
import Navbar from './components/Navbar/Navbar';
import SignIn from './components/SignIn/SignIn';
import { useSelectedAppContext } from './contexts/selectedAppContext';
import { useUserContext } from './contexts/userContext';
import RockPaperScissors from './components/RockPaperScissors/RockPaperScissors';
import { RockPaperScissorsProvider } from './contexts/rockPaperScissorsContext';
import { useDrawerContext } from './contexts/drawerContext';
import { FaArrowUp } from 'react-icons/fa';
import HangmanGame from './components/Hangman/Hangman';
import { HangmanProvider } from './contexts/hangmanContext';

function App() {
    const { currentUser } = useUserContext();
    const { selectedApp } = useSelectedAppContext();
    const { drawerOpened, setDrawerOpened } = useDrawerContext();

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
                <AppsList key={selectedApp?.name} />
                {drawerOpened && (
                    <div className="w-[calc(100%-240px)] h-full bg-gray-500" />
                )}
            </section>
            {drawerOpened && (
                <div
                    className={`absolute ml-60 w-[calc(100%-240px)] h-full bg-gray-500 bg-opacity-60 ${
                        !drawerOpened && 'bg-opacity-0'
                    } transition-all ease-in-out`}
                    onClick={() => setDrawerOpened(false)}
                />
            )}
            <div
                className={
                    'flex justify-center w-full overflow-hidden bg-gray-400 h-full'
                }
            >
                {selectedApp?.name === 'rock paper scissors' && (
                    <RockPaperScissorsProvider>
                        <RockPaperScissors />
                    </RockPaperScissorsProvider>
                )}
                {selectedApp?.name === 'Color Code Game' && (
                    <div className="flex justify-center w-full h-10 mt-16 text-black">
                        Color Code Game
                    </div>
                )}
                {selectedApp?.name === 'Hangman Game' && (
                    <div className="flex justify-center w-full h-10 mt-16 text-black">
                        <HangmanProvider>
                            <HangmanGame />
                        </HangmanProvider>
                    </div>
                )}
                {!selectedApp.name && (
                    <div className="flex justify-start items-center py-10 w-full h-10 mt-16 text-black animate-bounce">
                        <FaArrowUp className="mx-6" />
                        selecione um app
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
