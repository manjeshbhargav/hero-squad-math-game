import { useState } from 'react';

export default function useVillainState() {
  const [enemyHealth, setEnemyHealth] = useState(100);
  const [enemyProgress, setEnemyProgress] = useState(0); // 0 is far right, 100 is game over

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
