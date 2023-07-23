import React, { useState, useEffect } from 'react';

const HangmanGame = () => {
    const words = ['apple', 'banana', 'cherry', 'grape', 'kiwi', 'mango']; // Add more words here
    const maxAttempts = 6; // Number of maximum attempts allowed

    const [wordToGuess, setWordToGuess] = useState('');
    const [guessedLetters, setGuessedLetters] = useState(new Set());
    const [attemptsLeft, setAttemptsLeft] = useState(maxAttempts);
    const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'won', 'lost'

    useEffect(() => {
        // Choose a random word from the list
        const randomIndex = Math.floor(Math.random() * words.length);
        setWordToGuess(words[randomIndex]);
    }, []);

    useEffect(() => {
        // Check if the game is won
        const isGameWon = wordToGuess
            .split('')
            .every((letter) => guessedLetters.has(letter));
        if (isGameWon) {
            setGameStatus('won');
        }
    }, [wordToGuess, guessedLetters]);

    useEffect(() => {
        // Check if the game is lost
        if (attemptsLeft === 0) {
            setGameStatus('lost');
        }
    }, [attemptsLeft]);

    const handleGuess = (letter) => {
        if (gameStatus === 'playing') {
            // Add the guessed letter to the set of guessed letters
            setGuessedLetters(
                (prevGuessedLetters) => new Set([...prevGuessedLetters, letter])
            );

            // Decrement attempts left if the guessed letter is incorrect
            if (!wordToGuess.includes(letter)) {
                setAttemptsLeft((prevAttempts) => prevAttempts - 1);
            }
        }
    };

    const renderWord = () => {
        return wordToGuess.split('').map((letter, index) => (
            <span key={index} className="letter">
                {guessedLetters.has(letter) ? letter : '_'}
            </span>
        ));
    };

    const renderAlphabetButtons = () => {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
        return alphabet.map((letter) => (
            <button
                key={letter}
                className={`bg-gray-100 m-2 p-2 alphabet-button ${
                    guessedLetters.has(letter) ? 'opacity-20' : ''
                }`}
                onClick={() => handleGuess(letter)}
                disabled={
                    guessedLetters.has(letter) || gameStatus !== 'playing'
                }
            >
                {letter}
            </button>
        ));
    };

    const handleRestart = () => {
        // Reset the game
        setGuessedLetters(new Set());
        setAttemptsLeft(maxAttempts);
        setGameStatus('playing');

        // Choose a new random word
        const randomIndex = Math.floor(Math.random() * words.length);
        setWordToGuess(words[randomIndex]);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md max-w-sm">
                <h1 className="text-2xl font-bold mb-4">Hangman Game</h1>
                <div className="text-xl font-medium mb-2">{renderWord()}</div>
                <div className="text-lg mb-4">
                    Attempts Left: {attemptsLeft}
                </div>
                <div className="flex flex-wrap mb-4">
                    {renderAlphabetButtons()}
                </div>
                {gameStatus === 'won' && (
                    <div className="text-green-600 mt-4">
                        Congratulations! You won!
                    </div>
                )}
                {gameStatus === 'lost' && (
                    <div className="text-red-600 mt-4">
                        Oops! You lost. The word was "{wordToGuess}"
                    </div>
                )}
                {(gameStatus === 'won' || gameStatus === 'lost') && (
                    <button
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        onClick={handleRestart}
                    >
                        Play Again
                    </button>
                )}
            </div>
        </div>
    );
};

export default HangmanGame;
