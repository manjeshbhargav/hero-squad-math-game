import { useState } from 'react';

export default function useHeroState() {
  const [animationState, setAnimationState] = useState('idle'); // 'idle' | 'attacking' | 'enemyAdvancing'
  const [screenShake, setScreenShake] = useState(false);
  const [isHit, setIsHit] = useState(false);

  return {
    animationState,
    setAnimationState,
    screenShake,
    setScreenShake,
    isHit,
    setIsHit
  };
}
