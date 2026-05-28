import { useState, useCallback } from 'react';
import { generateChoices } from '../utils/MathEngine';
import GameLevel from '../utils/GameLevel';

export default function useGameState(initialLevel = 1) {
  const [currentLevel, setCurrentLevel] = useState(initialLevel); // 1 | 2 | 3 | 4 | 5 | 6
  const [gameState, setGameState] = useState(() => {
    const initialPuzzle = GameLevel.getLevel(initialLevel).generatePuzzle();
    return {
      puzzle: initialPuzzle,
      choices: generateChoices(initialPuzzle)
    };
  });
  const [score, setScore] = useState(0);
  const [firstAttempt, setFirstAttempt] = useState(true);
  const [incorrectAnswers, setIncorrectAnswers] = useState(new Set());
  const [isMastered, setIsMastered] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const loadNewPuzzle = useCallback((levelVal = currentLevel) => {
    const newPuzzle = GameLevel.getLevel(levelVal).generatePuzzle();
    setGameState({
      puzzle: newPuzzle,
      choices: generateChoices(newPuzzle)
    });
    setFirstAttempt(true);
    setIncorrectAnswers(new Set());
  }, [currentLevel]);

  const resetGame = useCallback((levelVal = currentLevel) => {
    setCurrentLevel(levelVal);
    setScore(0);
    setIsMastered(false);
    setIsGameOver(false);
    loadNewPuzzle(levelVal);
  }, [currentLevel, loadNewPuzzle]);

  return {
    currentLevel,
    setCurrentLevel,
    puzzle: gameState.puzzle,
    choices: gameState.choices,
    score,
    setScore,
    firstAttempt,
    setFirstAttempt,
    incorrectAnswers,
    setIncorrectAnswers,
    isMastered,
    setIsMastered,
    isGameOver,
    setIsGameOver,
    loadNewPuzzle,
    resetGame
  };
}
