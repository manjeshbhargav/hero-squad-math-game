import { useEffect } from 'react';

export default function useCheatKeys({ currentLevel, resetVillain, resetGame, onBack }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isRight = e.shiftKey && e.key.toLowerCase() === 'n';
      const isLeft = e.shiftKey && e.key.toLowerCase() === 'p';

      if (isRight) {
        e.preventDefault();
        if (currentLevel < 6) {
          const nextLvl = currentLevel + 1;
          resetVillain();
          resetGame(nextLvl);
        } else {
          onBack();
        }
      } else if (isLeft) {
        e.preventDefault();
        if (currentLevel > 1) {
          const prevLvl = currentLevel - 1;
          resetVillain();
          resetGame(prevLvl);
        } else {
          onBack();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentLevel, resetVillain, resetGame, onBack]);
}
