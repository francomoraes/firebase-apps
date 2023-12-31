import React, { useState } from 'react';
import { useRockPaperScissorsContext } from '../../contexts/rockPaperScissorsContext';
import { useBackgroundColorEffect } from '../../hooks/hooks';

const RockPaperScissors = () => {
    const {
        playerScore,
        setPlayerScore,
        computerScore,
        setComputerScore,
        draw,
        setDraw
    } = useRockPaperScissorsContext();

    const [playerChoice, setPlayerChoice] = useState('');
    const [computerChoice, setComputerChoice] = useState('');

    useBackgroundColorEffect('#playerScore', playerScore, '#9ca3af');
    useBackgroundColorEffect('#computerScore', computerScore, '#9ca3af');
    useBackgroundColorEffect('#drawScore', draw, '#9ca3af');

    const playGame = (buttonContent) => {
        const choices = ['rock', 'paper', 'scissors'];
        const randomChoice = Math.floor(Math.random() * choices.length);
        const computerChoice = choices[randomChoice];

        setPlayerChoice(buttonContent);
        setComputerChoice(computerChoice);

        const outcomes = {
            rock: {
                rock: 'draw',
                paper: 'computer',
                scissors: 'player'
            },
            paper: {
                rock: 'player',
                paper: 'draw',
                scissors: 'computer'
            },
            scissors: {
                rock: 'computer',
                paper: 'player',
                scissors: 'draw'
            }
        };

        if (outcomes[buttonContent][computerChoice] === 'player') {
            setPlayerScore((prevScore) => prevScore + 1);
        } else if (outcomes[buttonContent][computerChoice] === 'computer') {
            setComputerScore((prevScore) => prevScore + 1);
        } else {
            setDraw((prevScore) => prevScore + 1);
        }
    };

    const resetScores = () => {
        setPlayerScore(0);
        setComputerScore(0);
        setDraw(0);
    };

    const spanStyle =
        'm-2 p-1 border-2 border-gray-500 rounded-lg flex justify-center w-1/3';
    const buttonStyle =
        'text-2xl my-2 p-4 rounded-lg bg-gray-300 hover:bg-gray-400 active:scale-95 transition duration-250 w-full sm:w-40 sm:mx-2';

    return (
        <div className="flex flex-col items-center justify-center m-2 w-2/3 content-center bg-gray-100 h-full">
            <h1>Rock, Paper, Scissors</h1>
            <div className="flex justify-between m-2 w-full">
                <span className={spanStyle} id="playerScore">
                    Player Score: {playerScore}
                </span>
                <span className={spanStyle} id="drawScore">
                    Draw: {draw}
                </span>
                <span className={spanStyle} id="computerScore">
                    Computer Score: {computerScore}
                </span>
            </div>
            <div className="flex justify-between m-2 items-center w-full">
                <span className={`${spanStyle} w-1/3`}>
                    Player Choice: {playerChoice}
                </span>
                <span className={`${spanStyle} border-none`}>X</span>
                <span className={`${spanStyle} w-1/3`}>
                    Computer Choice: {computerChoice}
                </span>
            </div>
            <div className="w-full flex justify-center flex-col sm:flex-row">
                <button
                    className={buttonStyle}
                    onClick={(e) => playGame('rock')}
                >
                    rock
                </button>
                <button
                    className={buttonStyle}
                    onClick={(e) => playGame('paper')}
                >
                    paper
                </button>
                <button
                    className={buttonStyle}
                    onClick={(e) => playGame('scissors')}
                >
                    scissors
                </button>
            </div>
            <button className={`${buttonStyle} sm:w-96`} onClick={resetScores}>
                Reset Scores
            </button>
        </div>
    );
};

export default RockPaperScissors;
