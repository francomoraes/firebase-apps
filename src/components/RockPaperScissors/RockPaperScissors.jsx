import React, { useState } from 'react';
import './styles.css';
import { useRockPaperScissorsContext } from '../../contexts/rockPaperScissorsContext';

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
            setPlayerScore(playerScore + 1);
        } else if (outcomes[buttonContent][computerChoice] === 'computer') {
            setComputerScore(computerScore + 1);
        } else {
            setDraw(draw + 1);
        }
    };

    const resetScores = () => {
        setPlayerScore(0);
        setComputerScore(0);
        setDraw(0);
    };

    return (
        <div className="rock-paper-scissors-container">
            <h1>Rock, Paper, Scissors</h1>
            <div className="score-container">
                <span>Player Score: {playerScore}</span>
                <span>Draw: {draw}</span>
                <span>Computer Score: {computerScore}</span>
            </div>
            <div className="score-container">
                <p>current play.</p>
                <span>Player Choice: {playerChoice}</span>
                <span>Computer Choice: {computerChoice}</span>
            </div>
            <div className="">
                <button onClick={(e) => playGame(e.target.innerHTML)}>
                    rock
                </button>
                <button onClick={(e) => playGame(e.target.innerHTML)}>
                    paper
                </button>
                <button onClick={(e) => playGame(e.target.innerHTML)}>
                    scissors
                </button>
            </div>
            <button onClick={resetScores}>Reset Scores</button>
        </div>
    );
};

export default RockPaperScissors;
