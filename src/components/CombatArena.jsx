import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { generateSingleDigitAddition, generateLevel1Addition, generateLevel1Subtraction, generateLevel2Addition, generateLevel5Subtraction, generateLevel6Mixed, generateChoices } from '../utils/MathEngine';
import Hero from '../utils/Hero';
import GlitchBotVector from './vectors/GlitchBotVector';
import DrNullVector from './vectors/DrNullVector';
import { ArrowLeft } from 'lucide-react';
import LevelEndedOverlay from './LevelEndedOverlay';
import wrongAnswerSound from '../assets/wrong-answer.mp3';
import levelMasteredSound from '../assets/level-mastered.mp3';
import levelFailedSound from '../assets/level-failed.mp3';

const getPuzzleForLevel = (level) => {
  const getPuzzle = [
    generateSingleDigitAddition,
    generateLevel1Addition,
    generateLevel1Subtraction,
    generateLevel2Addition,
    generateLevel5Subtraction,
    generateLevel6Mixed
  ][level - 1] ?? generateSingleDigitAddition;
  return getPuzzle();
};

export default function CombatArena({ onBack, initialLevel = 1 }) {
  const wrongAnswerAudio = useRef(null);
  const levelMasteredAudio = useRef(null);
  const levelFailedAudio = useRef(null);

  useEffect(() => {
    wrongAnswerAudio.current = new Audio(wrongAnswerSound);
    wrongAnswerAudio.current.preload = 'auto';

    levelMasteredAudio.current = new Audio(levelMasteredSound);
    levelMasteredAudio.current.preload = 'auto';

    levelFailedAudio.current = new Audio(levelFailedSound);
    levelFailedAudio.current.preload = 'auto';
  }, []);

  const [currentLevel, setCurrentLevel] = useState(initialLevel); // 1 | 2 | 3 | 4 | 5 | 6
  const [gameState, setGameState] = useState(() => {
    const initialPuzzle = getPuzzleForLevel(initialLevel);
    return {
      puzzle: initialPuzzle,
      choices: generateChoices(initialPuzzle)
    };
  });
  const { puzzle, choices } = gameState;

  const [animationState, setAnimationState] = useState('idle'); // 'idle' | 'attacking' | 'enemyAdvancing'
  
  const [enemyHealth, setEnemyHealth] = useState(100);
  const [enemyProgress, setEnemyProgress] = useState(0); // 0 is far right, 100 is game over/cross finish line
  const [score, setScore] = useState(0);
  const [firstAttempt, setFirstAttempt] = useState(true);
  const [incorrectAnswers, setIncorrectAnswers] = useState(new Set());
  
  const [isMastered, setIsMastered] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [screenShake, setScreenShake] = useState(false);
  const [isHit, setIsHit] = useState(false);

  // Continuous bot movement loop
  useEffect(() => {
    if (isGameOver || isMastered || animationState !== 'idle') return;

    const interval = setInterval(() => {
      setEnemyProgress((prev) => {
        const next = prev + 1; // creep by 1%
        if (next >= 100) {
          setIsGameOver(true);
          return 100;
        }
        return next;
      });
    }, 450); // Creeps 1% every 450ms (~45 seconds to travel full length)

    return () => clearInterval(interval);
  }, [isGameOver, isMastered, animationState]);

  // Game over sound effect trigger
  useEffect(() => {
    if (isGameOver) {
      levelFailedAudio.current.currentTime = 0;
      levelFailedAudio.current.play().catch((err) => console.log('Audio playback error:', err));
    }
  }, [isGameOver]);

  const activeHero = useMemo(() => {
    return Hero.getHeroForLevel(currentLevel, puzzle?.sourceLevel);
  }, [currentLevel, puzzle?.sourceLevel]);

  const loadNewPuzzle = useCallback((level = currentLevel) => {
    const newPuzzle = getPuzzleForLevel(level);
    setGameState({
      puzzle: newPuzzle,
      choices: generateChoices(newPuzzle)
    });
    setFirstAttempt(true);
    setIncorrectAnswers(new Set());
  }, [currentLevel]);

  // Cheat codes listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isRight = e.shiftKey && e.key.toLowerCase() === 'n';
      const isLeft = e.shiftKey && e.key.toLowerCase() === 'p';

      if (isRight) {
        e.preventDefault();
        if (currentLevel < 6) {
          const nextLvl = currentLevel + 1;
          setCurrentLevel(nextLvl);
          setEnemyHealth(100);
          setEnemyProgress(0);
          setIsMastered(false);
          setIsGameOver(false);
          loadNewPuzzle(nextLvl);
        } else {
          onBack();
        }
      } else if (isLeft) {
        e.preventDefault();
        if (currentLevel > 1) {
          const prevLvl = currentLevel - 1;
          setCurrentLevel(prevLvl);
          setEnemyHealth(100);
          setEnemyProgress(0);
          setIsMastered(false);
          setIsGameOver(false);
          loadNewPuzzle(prevLvl);
        } else {
          onBack();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentLevel, loadNewPuzzle, onBack]);

  const handleChoiceClick = (selectedAnswer) => {
    if (animationState !== 'idle' || isMastered || isGameOver) return;

    if (selectedAnswer === puzzle.correctAnswer) {
      // CORRECT ANSWER: Sprint attack
      setAnimationState('attacking');

      const damageAmount = currentLevel === 6 ? 5 : 25;
      const newHealth = Math.max(0, enemyHealth - damageAmount);

      // Trigger combat sequence using memoized activeHero
      activeHero.triggerAttack({
        onShakeStart: () => setScreenShake(true),
        onShakeEnd: () => setScreenShake(false),
        onImpact: () => {
          setIsHit(true);
          setEnemyHealth(newHealth);
          setEnemyProgress((prev) => Math.max(0, prev - 10));
        },
        onComplete: () => {
          setIsHit(false);
          if (newHealth <= 0) {
            // Enemy defeated! Player wins!
            setIsMastered(true); // Victory trigger
            levelMasteredAudio.current.currentTime = 0;
            levelMasteredAudio.current.play().catch((err) => console.log('Audio playback error:', err));
          } else {
            loadNewPuzzle();
          }
          setAnimationState('idle');
        }
      });

      // Correct answer adds 10 to score
      setScore((prev) => prev + 10);

    } else {
      // INCORRECT ANSWER: Advance
      if (incorrectAnswers.has(selectedAnswer)) return; // Prevent double-clicking same wrong answer

      wrongAnswerAudio.current.currentTime = 0;
      wrongAnswerAudio.current.play().catch((err) => console.log('Audio playback error:', err));

      setIncorrectAnswers((prev) => {
        const next = new Set(prev);
        next.add(selectedAnswer);
        return next;
      });

      // Record first attempt
      if (firstAttempt) {
        setFirstAttempt(false);
      }

      setAnimationState('enemyAdvancing');
      
      // Wrong answer subtracts 5 from score, unless it is zero
      setScore((prev) => Math.max(0, prev - 5));

      // Advance enemy as a penalty
      setEnemyProgress((prev) => {
        const next = Math.min(100, prev + 15);
        if (next >= 100) {
          setIsGameOver(true);
        }
        return next;
      });

      // For Level 6, wrong answer heals Dr. Null by 5%
      if (currentLevel === 6) {
        setEnemyHealth((prev) => Math.min(100, prev + 5));
      }

      setTimeout(() => {
        loadNewPuzzle(); // Change the question even if the answer is wrong
        setAnimationState('idle');
      }, 800);
    }
  };

  const handleReset = () => {
    setEnemyHealth(100);
    setEnemyProgress(0);
    setScore(0);
    setIsMastered(false);
    setIsGameOver(false);
    loadNewPuzzle();
  };

  const handleNextLevel = (nextLevelVal) => {
    setCurrentLevel(nextLevelVal);
    setEnemyHealth(100);
    setEnemyProgress(0);
    setIsMastered(false);
    setIsGameOver(false);
    loadNewPuzzle(nextLevelVal);
  };

  const getHealthColor = (health) => {
    const hue = (health / 100) * 120;
    return `hsl(${hue}, 85%, 45%)`;
  };

  if (!puzzle) return null;

  return (
    <div className={`min-h-screen lg:h-screen lg:overflow-hidden industrial-bg flex flex-col justify-center items-center p-4 sm:p-6 md:p-8 relative select-none ${screenShake ? 'animate-screen-shake' : ''}`}>
      {/* Scanline Overlay */}
      <div className="scanlines"></div>

      {/* Main Container with 2px borders */}
      <div className="w-full max-w-5xl bg-slate-950/60 border border-cyan-900/40 strict-rounded bracket-corner shadow-2xl backdrop-blur-md flex flex-col overflow-hidden z-10 p-4 sm:p-6 space-y-6">
        
        {/* Arena Header: Scores & Mastery Tracker */}
        <section className="flex flex-col sm:flex-row justify-between items-center border-b border-slate-800/80 pb-4 gap-4 w-full">
          {/* Back Button and Active Ops Info */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onBack}
              className="p-2 bg-slate-900 border border-slate-800 hover:border-cyan-500 hover:text-cyan-400 strict-rounded cursor-pointer transition-colors"
              aria-label="Back to main menu"
            >
              <ArrowLeft size={18} />
            </button>
            <div className="text-left">
              <h2 className="font-display text-sm md:text-base font-bold text-cyan-400 uppercase tracking-wider">
                {currentLevel === 1 && 'Single Digit Addition'}
                {currentLevel === 2 && 'Addition'}
                {currentLevel === 3 && 'Subtraction'}
                {currentLevel === 4 && 'Carry Addition'}
                {currentLevel === 5 && 'Borrow Subtraction'}
                {currentLevel === 6 && 'Mixed Mastery Boss Wave'}
              </h2>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">
                Hero: {activeHero.name} // Level {currentLevel}
              </span>
            </div>
          </div>

          {/* Score */}
          <div className="flex gap-4 text-right">
            <div>
              <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold">SCORE</span>
              <span className="font-display font-black text-white text-base md:text-lg">{score}</span>
            </div>
          </div>
        </section>

        {/* Combat Display Area */}
        <section className="relative w-full h-[260px] sm:h-[300px] bg-slate-950/80 border border-slate-900/80 strict-rounded overflow-hidden flex items-end p-4">
          
          {/* Grid lines background */}
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-950/20 to-transparent pointer-events-none"></div>

          {/* Checkered Finish Line */}
          <div className="checkered-finish-line" />

          {/* Dynamic Weapon Attack component */}
          {animationState === 'attacking' && (
            <activeHero.weaponComponent enemyProgress={enemyProgress} />
          )}

          {/* Left Side Hero - stays in place at left-[5%] */}
          <div className={`flex flex-col items-center absolute bottom-4 z-10 transition-all duration-[400ms] ease-out left-[5%] ${
            animationState === 'attacking' ? 'scale-110 z-30' : ''
          }`}>
            <div className="w-28 h-36">
              {<activeHero.vectorComponent state={animationState === 'attacking' ? 'attack' : 'idle'} />}
            </div>
          </div>

          {/* Glitch-Bot or Dr. Null: Right Side Target with dynamic creep positioning */}
          <div 
            className="flex flex-col items-center absolute bottom-4 z-10 transition-all duration-300 ease-out glitch-bot-container"
            style={{
              left: `${80 - enemyProgress * 0.58}%`
            }}
          >
            <div className="relative flex flex-col items-center">
              
              {/* Health Bar + Briefcase Icon Container */}
              <div className="flex items-center gap-1.5 mb-3 z-20">
                {/* Briefcase with Plus/Minus Icon */}
                <svg
                  className="w-4 h-4 drop-shadow-[0_0_3px_rgba(52,211,153,0.3)] transition-colors duration-300 shrink-0"
                  style={{ color: getHealthColor(enemyHealth) }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M8 7V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3" />
                  <line x1="9" y1="14" x2="15" y2="14" />
                  <line x1="12" y1="11" x2="12" y2="17" />
                </svg>

                {/* Health Bar */}
                <div className="w-24 h-2 bg-slate-900 border border-slate-800 strict-rounded overflow-hidden">
                  <div
                    className="h-full transition-all duration-300"
                    style={{ 
                      width: `${enemyHealth}%`,
                      backgroundColor: getHealthColor(enemyHealth)
                    }}
                  />
                </div>
              </div>

              {/* Bot or Boss Puppet */}
              <div className="w-36 h-44">
                {currentLevel === 6 ? (
                  <DrNullVector
                    state="idle"
                    className={isHit ? 'animate-damage-flash' : ''}
                  >
                    {/* Chest displays the math problem vertically */}
                    <div className="font-display font-black text-sm text-cyan-400 tracking-wider leading-none text-center">
                      {puzzle.numA} <br />
                      <span className="text-yellow-400 font-bold">{puzzle.operation === 'addition' ? '+' : '-'}</span>{puzzle.numB}
                    </div>
                  </DrNullVector>
                ) : (
                  <GlitchBotVector 
                    state={animationState === 'idle' || animationState === 'enemyAdvancing' ? 'walk' : 'idle'}
                    health={enemyHealth}
                    className={isHit ? 'animate-damage-flash' : ''}
                  >
                    {/* Chest displays the math problem vertically */}
                    <div className="font-display font-black text-sm text-cyan-400 tracking-wider leading-none text-center">
                      {puzzle.numA} <br />
                      <span className="text-yellow-400 font-bold">{puzzle.operation === 'addition' ? '+' : '-'}</span>{puzzle.numB}
                    </div>
                  </GlitchBotVector>
                )}
              </div>

            </div>
          </div>
        </section>

        {/* Combat Input Choices Panel */}
        <section className="flex flex-col items-center space-y-4">
          <span className="text-xs md:text-sm font-mono text-cyan-400/80 uppercase tracking-widest font-bold">
            {puzzle.operation === 'addition' ? 'Select the Correct Sum:' : 'Select the Correct Difference:'}
          </span>
          
          <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
            {choices.map((choice, idx) => {
              const isWrong = incorrectAnswers.has(choice);
              return (
                <button
                  key={idx}
                  onClick={() => handleChoiceClick(choice)}
                  disabled={isWrong || animationState !== 'idle'}
                  className={`py-4 px-6 border font-display font-black text-lg md:text-xl strict-rounded transition-all duration-200 transform active:scale-95 cursor-pointer text-center ${
                    isWrong
                      ? 'bg-red-950/40 border-red-950 text-red-700 cursor-not-allowed line-through'
                      : 'bg-slate-900/60 border-cyan-800/60 text-white hover:border-cyan-400 hover:text-cyan-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                  }`}
                >
                  {choice}
                </button>
              );
            })}
          </div>
        </section>

      </div>

      {/* Level Ended Overlay */}
      {(isMastered || isGameOver) && (
        <LevelEndedOverlay
          isMastered={isMastered}
          currentLevel={currentLevel}
          score={score}
          onReset={handleReset}
          onNextLevel={handleNextLevel}
          onBack={onBack}
        />
      )}
    </div>
  );
}
