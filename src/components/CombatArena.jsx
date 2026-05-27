import { useState, useEffect } from 'react';
import { generateSingleDigitAddition, generateLevel1Addition, generateLevel1Subtraction, generateLevel2Addition, generateLevel5Subtraction, generateChoices } from '../utils/MathEngine';
import DashVector from './vectors/DashVector';
import TitanVector from './vectors/TitanVector';
import AeroVector from './vectors/AeroVector';
import GlitchBotVector from './vectors/GlitchBotVector';
import { Award, AlertCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import voltStrikeSound from '../assets/dash-volt-strike.mp3';
import wrongAnswerSound from '../assets/wrong-answer.mp3';
import levelMasteredSound from '../assets/level-mastered.mp3';
import levelFailedSound from '../assets/level-failed.mp3';

const voltStrikeAudio = new Audio(voltStrikeSound);
voltStrikeAudio.preload = 'auto';

const wrongAnswerAudio = new Audio(wrongAnswerSound);
wrongAnswerAudio.preload = 'auto';

const levelMasteredAudio = new Audio(levelMasteredSound);
levelMasteredAudio.preload = 'auto';

const levelFailedAudio = new Audio(levelFailedSound);
levelFailedAudio.preload = 'auto';

import titanShockWaveSound from '../assets/titan-shock-wave.mp3';
import aeroWhirlwindSound from '../assets/aero-whirlwind.mp3';

const titanShockWaveAudio = new Audio(titanShockWaveSound);
titanShockWaveAudio.preload = 'auto';

const aeroWhirlwindAudio = new Audio(aeroWhirlwindSound);
aeroWhirlwindAudio.preload = 'auto';

export default function CombatArena({ onBack }) {
  const [currentLevel, setCurrentLevel] = useState(1); // 1 | 2 | 3 | 4 | 5
  const [gameState, setGameState] = useState(() => {
    const initialPuzzle = generateSingleDigitAddition();
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
      levelFailedAudio.currentTime = 0;
      levelFailedAudio.play().catch((err) => console.log('Audio playback error:', err));
    }
  }, [isGameOver]);

  const loadNewPuzzle = (level = currentLevel) => {
    let newPuzzle;
    if (level === 1) {
      newPuzzle = generateSingleDigitAddition();
    } else if (level === 2) {
      newPuzzle = generateLevel1Addition();
    } else if (level === 3) {
      newPuzzle = generateLevel1Subtraction();
    } else if (level === 4) {
      newPuzzle = generateLevel2Addition();
    } else if (level === 5) {
      newPuzzle = generateLevel5Subtraction();
    } else {
      newPuzzle = generateSingleDigitAddition();
    }
    setGameState({
      puzzle: newPuzzle,
      choices: generateChoices(newPuzzle)
    });
    setFirstAttempt(true);
    setIncorrectAnswers(new Set());
  };

  const handleChoiceClick = (selectedAnswer) => {
    if (animationState !== 'idle' || isMastered || isGameOver) return;

    if (selectedAnswer === puzzle.correctAnswer) {
      // CORRECT ANSWER: Sprint attack
      setAnimationState('attacking');

      const newHealth = Math.max(0, enemyHealth - 25);

      // Timed screen shake, damage, and pushback based on active hero/level timing
      if (currentLevel === 3) {
        // Titan's slam impact
        titanShockWaveAudio.currentTime = 0;
        titanShockWaveAudio.play().catch((err) => console.log('Audio playback error:', err));

        setTimeout(() => {
          setScreenShake(true);
        }, 500);
        setTimeout(() => {
          setScreenShake(false);
        }, 900);

        setTimeout(() => {
          setIsHit(true);
          setEnemyHealth(newHealth);
          setEnemyProgress((prev) => Math.max(0, prev - 10));
        }, 800);
      } else if (currentLevel === 4 || currentLevel === 5) {
        // Aero's wind cyclone travel & hit
        aeroWhirlwindAudio.currentTime = 0;
        aeroWhirlwindAudio.play().catch((err) => console.log('Audio playback error:', err));

        setTimeout(() => {
          setScreenShake(true);
        }, 800);
        setTimeout(() => {
          setScreenShake(false);
        }, 1100);

        setTimeout(() => {
          setIsHit(true);
          setEnemyHealth(newHealth);
          setEnemyProgress((prev) => Math.max(0, prev - 10));
        }, 850);
      } else {
        // Dash's fast electric strike
        voltStrikeAudio.currentTime = 0;
        voltStrikeAudio.play().catch((err) => console.log('Audio playback error:', err));

        setScreenShake(true);
        setTimeout(() => {
          setScreenShake(false);
        }, 400);

        setTimeout(() => {
          setIsHit(true);
          setEnemyHealth(newHealth);
          setEnemyProgress((prev) => Math.max(0, prev - 10));
        }, 150); // Minor visual delay to match lightning strike travel
      }

      // Correct answer adds 10 to score
      setScore((prev) => prev + 10);

      const attackDuration = currentLevel === 3 ? 1200 : (currentLevel === 4 || currentLevel === 5) ? 1250 : 1000;

      setTimeout(() => {
        setIsHit(false);
        if (newHealth <= 0) {
          // Enemy defeated! Player wins!
          setIsMastered(true); // Victory trigger
          levelMasteredAudio.currentTime = 0;
          levelMasteredAudio.play().catch((err) => console.log('Audio playback error:', err));
        } else {
          loadNewPuzzle();
        }
        setAnimationState('idle');
      }, attackDuration);

    } else {
      // INCORRECT ANSWER: Advance
      if (incorrectAnswers.has(selectedAnswer)) return; // Prevent double-clicking same wrong answer

      wrongAnswerAudio.currentTime = 0;
      wrongAnswerAudio.play().catch((err) => console.log('Audio playback error:', err));

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
                {currentLevel === 1 && 'Sector 09: Single Digit Addition'}
                {currentLevel === 2 && 'Sector 09: Addition'}
                {currentLevel === 3 && 'Sector 09: Subtraction'}
                {currentLevel === 4 && 'Sector 09: Carry Addition'}
                {currentLevel === 5 && 'Sector 09: Borrow Subtraction'}
              </h2>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">
                Hero: {(currentLevel === 1 || currentLevel === 2) ? 'Dash' : currentLevel === 3 ? 'Titan' : 'Aero'} // Level {currentLevel}
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

          {/* Volt Strike Lightning Bolt (Addition) */}
          {animationState === 'attacking' && (currentLevel === 1 || currentLevel === 2) && (
            <svg
              className="volt-strike-container glow-yellow-lightning animate-lightning-bolt"
              style={{
                '--bot-left': `${80 - enemyProgress * 0.58}%`
              }}
              viewBox="0 0 100 20"
              preserveAspectRatio="none"
            >
              {/* Outer glowing path */}
              <path
                d="M 0 12 L 12 4 L 20 14 L 35 3 L 42 16 L 55 6 L 68 15 L 76 8 L 88 13 L 100 8"
                fill="none"
                stroke="#facc15"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-70"
              />
              {/* Inner bright core */}
              <path
                d="M 0 12 L 12 4 L 20 14 L 35 3 L 42 16 L 55 6 L 68 15 L 76 8 L 88 13 L 100 8"
                fill="none"
                stroke="#ffffff"
                strokeWidth="0.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              {/* Secondary electric arcs/branches */}
              <path
                d="M 20 14 L 28 19 L 33 17"
                fill="none"
                stroke="#eab308"
                strokeWidth="0.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-50"
              />
              <path
                d="M 55 6 L 62 2 L 68 5"
                fill="none"
                stroke="#eab308"
                strokeWidth="0.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-50"
              />
              <path
                d="M 76 8 L 82 13 L 87 11"
                fill="none"
                stroke="#eab308"
                strokeWidth="0.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-50"
              />
            </svg>
          )}

          {/* Quake Smash Kinetic Shockwave (Level 3) */}
          {animationState === 'attacking' && currentLevel === 3 && (
            <div 
              className="quake-shockwave-rings-container"
              style={{
                '--bot-left': `${80 - enemyProgress * 0.58}%`
              }}
            >
              <div className="quake-ring ring-1" />
              <div className="quake-ring ring-2" />
              <div className="quake-ring ring-3" />
            </div>
          )}

          {/* Aero's Cyclone Blast (Level 4 & 5) */}
          {animationState === 'attacking' && (currentLevel === 4 || currentLevel === 5) && (
            <div 
              className="cyclone-blast-container"
              style={{
                '--bot-left': `${80 - enemyProgress * 0.58}%`
              }}
            >
              <svg
                className="cyclone-vortex animate-cyclone-travel"
                viewBox="0 0 60 80"
                preserveAspectRatio="none"
              >
                {/* Wavy inverted triangle wind lines */}
                <path
                  d="M 5 5 C 15 25 15 15 25 45 C 28 55 25 65 30 80 C 35 65 32 55 35 45 C 45 15 45 25 55 5 Z"
                  fill="rgba(52, 211, 153, 0.15)"
                  stroke="#10b981"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Inner winds */}
                <path
                  d="M 12 15 C 25 35 15 45 28 65 C 29 70 30 75 30 80"
                  fill="none"
                  stroke="#a7f3d0"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  className="opacity-70"
                />
                <path
                  d="M 48 15 C 35 35 45 45 32 65 C 31 70 30 75 30 80"
                  fill="none"
                  stroke="#a7f3d0"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  className="opacity-70"
                />
                {/* Top horizontal wind rings */}
                <ellipse cx="30" cy="8" rx="25" ry="5" fill="none" stroke="#10b981" strokeWidth="1.5" />
                <ellipse cx="30" cy="25" rx="18" ry="4" fill="none" stroke="#10b981" strokeWidth="1.2" />
                <ellipse cx="30" cy="45" rx="12" ry="3" fill="none" stroke="#10b981" strokeWidth="1" />
                <ellipse cx="30" cy="65" rx="6" ry="2" fill="none" stroke="#10b981" strokeWidth="0.8" />
              </svg>
            </div>
          )}

          {/* Left Side Hero - stays in place at left-[5%] */}
          <div className={`flex flex-col items-center absolute bottom-4 z-10 transition-all duration-[400ms] ease-out left-[5%] ${
            animationState === 'attacking' ? 'scale-110 z-30' : ''
          }`}>
            <div className="w-28 h-36">
              {(currentLevel === 1 || currentLevel === 2) && (
                <DashVector state={animationState === 'attacking' ? 'attack' : 'idle'} />
              )}
              {currentLevel === 3 && (
                <TitanVector state={animationState === 'attacking' ? 'attack' : 'idle'} />
              )}
              {(currentLevel === 4 || currentLevel === 5) && (
                <AeroVector state={animationState === 'attacking' ? 'attack' : 'idle'} />
              )}
            </div>
          </div>

          {/* Glitch-Bot: Right Side Target with dynamic creep positioning */}
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

              {/* Bot Puppet */}
              <div className="w-36 h-44">
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

      {/* Mastery Overlay */}
      {isMastered && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="relative w-full max-w-md bg-slate-900 border border-green-500/40 p-6 strict-rounded shadow-[0_0_50px_rgba(34,197,94,0.15)] flex flex-col space-y-4 text-center">
            
            {/* Corner decorations */}
            <div className="absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2 border-green-400 rounded-tl-[2px]"></div>
            <div className="absolute -bottom-px -right-px w-4 h-4 border-b-2 border-r-2 border-green-400 rounded-br-[2px]"></div>

            <div className="flex flex-col items-center space-y-2">
              <div className="p-3 bg-green-500/10 border border-green-500/30 text-green-400 strict-rounded animate-bounce">
                <Award size={48} />
              </div>
              <h3 className="font-display font-black text-green-400 text-xl tracking-wider uppercase pt-2">
                {currentLevel === 1 && 'LEVEL 1 SINGLE DIGIT ADDITION MASTERED!'}
                {currentLevel === 2 && 'LEVEL 2 ADDITION MASTERED!'}
                {currentLevel === 3 && 'LEVEL 3 SUBTRACTION MASTERED!'}
                {currentLevel === 4 && 'LEVEL 4 CARRY ADDITION MASTERED!'}
                {currentLevel === 5 && 'LEVEL 5 FORCED BORROW SUBTRACTION MASTERED!'}
              </h3>
              <span className="font-mono text-xs text-slate-500">MISSION COMPLETED SUCCESSFULLY</span>
            </div>

            <div className="space-y-3 py-2 text-slate-300 text-sm leading-relaxed font-sans font-medium">
              <p>
                {currentLevel === 1 && 'Fantastic job! You solved the single digit addition equations, defeated the Glitch-Bot, and protected the mainframe!'}
                {currentLevel === 2 && 'Fantastic job! You solved the addition equations, defeated the Glitch-Bot, and protected the mainframe!'}
                {currentLevel === 3 && 'Fantastic job! You solved the subtraction equations, defeated the Glitch-Bot, and protected the mainframe!'}
                {currentLevel === 4 && 'Fantastic job! You solved the carry addition equations, defeated the Glitch-Bot, and protected the mainframe!'}
                {currentLevel === 5 && 'Fantastic job! You solved the borrow subtraction equations, defeated the Glitch-Bot, and protected the mainframe!'}
              </p>
              <div className="border border-slate-800 p-3 bg-slate-950/40 strict-rounded flex flex-col gap-3">
                <div className="flex justify-center">
                  <div>
                    <span className="block text-slate-500 font-bold uppercase tracking-wider text-[10px] mb-1">SCORE EARNED</span>
                    <span className="text-2xl text-green-400 font-black font-display">{score}</span>
                  </div>
                </div>
                <div className="text-xs text-slate-400 border-t border-slate-800/40 pt-2 text-center">
                  {currentLevel === 1 && 'Level 1 Single Digit Addition complete! Prepare for Addition.'}
                  {currentLevel === 2 && 'Level 2 Addition complete! Prepare for Subtraction.'}
                  {currentLevel === 3 && 'Level 3 Subtraction complete! Prepare for Forced Carry Addition.'}
                  {currentLevel === 4 && 'Level 4 Carry Addition complete! Prepare for Forced Borrow Subtraction.'}
                  {currentLevel === 5 && 'All math defense training levels complete! Math Hero Squad operations fully online.'}
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-center pt-3 w-full">
              {currentLevel === 1 && (
                <>
                  <button
                    onClick={handleReset}
                    className="px-5 py-3 bg-slate-950 border border-slate-800 text-slate-400 hover:border-slate-500 hover:text-white font-mono text-xs uppercase strict-rounded transition-colors cursor-pointer font-bold flex-1"
                  >
                    Reset Single Digit Addition
                  </button>
                  <button
                    onClick={() => {
                      setCurrentLevel(2);
                      setEnemyHealth(100);
                      setEnemyProgress(0);
                      setIsMastered(false);
                      setIsGameOver(false);
                      loadNewPuzzle(2);
                    }}
                    className="px-5 py-3 bg-green-950 border border-green-500 text-green-400 hover:bg-green-900 font-mono text-xs uppercase strict-rounded transition-colors cursor-pointer font-bold flex-1"
                  >
                    Next Level: Addition
                  </button>
                </>
              )}
              {currentLevel === 2 && (
                <>
                  <button
                    onClick={handleReset}
                    className="px-5 py-3 bg-slate-950 border border-slate-800 text-slate-400 hover:border-slate-500 hover:text-white font-mono text-xs uppercase strict-rounded transition-colors cursor-pointer font-bold flex-1"
                  >
                    Reset Addition
                  </button>
                  <button
                    onClick={() => {
                      setCurrentLevel(3);
                      setEnemyHealth(100);
                      setEnemyProgress(0);
                      setIsMastered(false);
                      setIsGameOver(false);
                      loadNewPuzzle(3);
                    }}
                    className="px-5 py-3 bg-green-950 border border-green-500 text-green-400 hover:bg-green-900 font-mono text-xs uppercase strict-rounded transition-colors cursor-pointer font-bold flex-1"
                  >
                    Next Level: Subtraction
                  </button>
                </>
              )}
              {currentLevel === 3 && (
                <>
                  <button
                    onClick={handleReset}
                    className="px-5 py-3 bg-slate-950 border border-slate-800 text-slate-400 hover:border-slate-500 hover:text-white font-mono text-xs uppercase strict-rounded transition-colors cursor-pointer font-bold flex-1"
                  >
                    Reset Subtraction
                  </button>
                  <button
                    onClick={() => {
                      setCurrentLevel(4);
                      setEnemyHealth(100);
                      setEnemyProgress(0);
                      setIsMastered(false);
                      setIsGameOver(false);
                      loadNewPuzzle(4);
                    }}
                    className="px-5 py-3 bg-green-950 border border-green-500 text-green-400 hover:bg-green-900 font-mono text-xs uppercase strict-rounded transition-colors cursor-pointer font-bold flex-1"
                  >
                    Next Level: Carry Addition
                  </button>
                </>
              )}
              {currentLevel === 4 && (
                <>
                  <button
                    onClick={handleReset}
                    className="px-5 py-3 bg-slate-950 border border-slate-800 text-slate-400 hover:border-slate-500 hover:text-white font-mono text-xs uppercase strict-rounded transition-colors cursor-pointer font-bold flex-1"
                  >
                    Reset Carry Addition
                  </button>
                  <button
                    onClick={() => {
                      setCurrentLevel(5);
                      setEnemyHealth(100);
                      setEnemyProgress(0);
                      setIsMastered(false);
                      setIsGameOver(false);
                      loadNewPuzzle(5);
                    }}
                    className="px-5 py-3 bg-green-950 border border-green-500 text-green-400 hover:bg-green-900 font-mono text-xs uppercase strict-rounded transition-colors cursor-pointer font-bold flex-1"
                  >
                    Next Level: Borrow Subtraction
                  </button>
                </>
              )}
              {currentLevel === 5 && (
                <>
                  <button
                    onClick={handleReset}
                    className="px-5 py-3 bg-slate-950 border border-slate-800 text-slate-400 hover:border-slate-500 hover:text-white font-mono text-xs uppercase strict-rounded transition-colors cursor-pointer font-bold flex-1"
                  >
                    Reset Borrow Subtraction
                  </button>
                  <button
                    onClick={onBack}
                    className="px-5 py-3 bg-green-950 border border-green-500 text-green-400 hover:bg-green-900 font-mono text-xs uppercase strict-rounded transition-colors cursor-pointer font-bold flex-1"
                  >
                    Main Menu
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Game Over Overlay */}
      {isGameOver && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="relative w-full max-w-md bg-slate-900 border border-red-500/40 p-6 strict-rounded shadow-[0_0_50px_rgba(239,68,68,0.15)] flex flex-col space-y-4 text-center">
            
            {/* Corner decorations */}
            <div className="absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2 border-red-400 rounded-tl-[2px]"></div>
            <div className="absolute -bottom-px -right-px w-4 h-4 border-b-2 border-r-2 border-red-400 rounded-br-[2px]"></div>

            <div className="flex flex-col items-center space-y-2">
              <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 strict-rounded animate-pulse">
                <AlertCircle size={48} />
              </div>
              <h3 className="font-display font-black text-red-400 text-xl tracking-wider uppercase pt-2">
                DEFENSE BREACHED
              </h3>
              <span className="font-mono text-xs text-slate-500">GLITCH-BOT REACHED MAIN FRAME</span>
            </div>

            <div className="space-y-3 py-2 text-slate-300 text-sm leading-relaxed font-sans font-medium">
              <p>
                The Glitch-Bot advanced too close and corrupted our calculations!
              </p>
              <div className="text-xs text-slate-400 border border-slate-800 p-3 bg-slate-950/40 strict-rounded flex justify-center">
                <div>
                  <span className="block text-slate-500 font-bold uppercase tracking-wider text-[10px] mb-1">SCORE EARNED</span>
                  <span className="text-2xl text-red-400 font-black font-display">{score}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-center pt-3 w-full">
              <button
                onClick={onBack}
                className="px-5 py-3 bg-slate-950 border border-slate-800 text-slate-400 hover:border-slate-500 hover:text-white font-mono text-xs uppercase strict-rounded transition-colors cursor-pointer font-bold flex-1"
              >
                Exit
              </button>
              <button
                onClick={handleReset}
                className="px-5 py-3 bg-red-950 border border-red-500 text-red-400 hover:bg-red-900 font-mono text-xs uppercase strict-rounded transition-colors cursor-pointer font-bold flex-1 flex items-center justify-center gap-2"
              >
                <RefreshCw size={14} /> Retry Mission
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
