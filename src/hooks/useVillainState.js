import { useState, useEffect } from 'react';

export default function useVillainState({ isGameOver, isMastered, animationState, onGameOver }) {
  const [enemyHealth, setEnemyHealth] = useState(100);
  const [enemyProgress, setEnemyProgress] = useState(0); // 0 is far right, 100 is game over

  // Continuous bot movement loop
  useEffect(() => {
    if (isGameOver || isMastered || animationState !== 'idle') return;

    const interval = setInterval(() => {
      setEnemyProgress((prev) => {
        const next = prev + 1; // creep by 1%
        if (next >= 100) {
          onGameOver();
          return 100;
        }
        return next;
      });
    }, 450); // Creeps 1% every 450ms (~45 seconds to travel full length)

    return () => clearInterval(interval);
  }, [isGameOver, isMastered, animationState, onGameOver]);

  const resetVillain = () => {
    setEnemyHealth(100);
    setEnemyProgress(0);
  };

  return {
    enemyHealth,
    setEnemyHealth,
    enemyProgress,
    setEnemyProgress,
    resetVillain
  };
}
