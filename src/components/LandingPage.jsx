import React, { useState } from 'react';
import { Zap, ShieldAlert, Wind, Skull, Play, X, Info, ChevronLeft, ChevronRight } from 'lucide-react';

export default function LandingPage() {
  const [showModal, setShowModal] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const characters = [
    {
      id: 'dash',
      name: 'Dash',
      role: 'The Speedster',
      description: 'Uses lightning-fast speed to zap Glitch-Bots with electricity!',
      suit: 'Blue and yellow lightning suit.',
      weapon: 'Volt Strike: Zaps yellow lightning straight across the screen.',
      icon: Zap,
      colorClass: 'text-yellow-400',
      bgBorderClass: 'border-yellow-500/40 hover:border-yellow-400 hover:shadow-[0_0_15px_rgba(234,179,8,0.4)]',
      glowClass: 'glow-yellow',
      badge: 'Level 1 Hero',
      type: 'hero'
    },
    {
      id: 'titan',
      name: 'Titan',
      role: 'The Heavy Brawler',
      description: 'A super-strong hero who carries numbers when addition equations get heavy!',
      suit: 'Red and silver armored suit.',
      weapon: 'Quake Smash: Shakes the floor to push back robots.',
      icon: ShieldAlert,
      colorClass: 'text-red-500',
      bgBorderClass: 'border-red-600/40 hover:border-red-500 hover:shadow-[0_0_15px_rgba(239,68,68,0.4)]',
      glowClass: 'glow-red',
      badge: 'Level 2 Hero',
      type: 'hero'
    },
    {
      id: 'aero',
      name: 'Aero',
      role: 'The Tactical Flyer',
      description: 'Flies high and uses green cyclone wind power to help borrow numbers in subtraction!',
      suit: 'Green and white wing-suit.',
      weapon: 'Cyclone Blast: Shoots a spinning green tornado at targets.',
      icon: Wind,
      colorClass: 'text-emerald-400',
      bgBorderClass: 'border-emerald-500/40 hover:border-emerald-400 hover:shadow-[0_0_15px_rgba(52,211,153,0.4)]',
      glowClass: 'glow-green',
      badge: 'Level 3 Hero',
      type: 'hero'
    },
    {
      id: 'drnull',
      name: 'Dr. Null',
      role: 'The Villain',
      description: 'A mad scientist sending blocky Glitch-Bots to mess up the city\'s math server!',
      suit: 'Floating scientist lab robes.',
      weapon: 'Glitch-Bots: Evil blocky robots with math puzzles on their chests.',
      icon: Skull,
      colorClass: 'text-purple-400',
      bgBorderClass: 'border-purple-500/40 hover:border-purple-400 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)]',
      glowClass: 'glow-purple',
      badge: 'Villain Boss',
      type: 'villain'
    }
  ];

  // Clamp carousel index within boundaries of the characters list
  const activeIndex = Math.min(carouselIndex, Math.max(0, characters.length - 1));
  const currentChar = characters[activeIndex];

  const handlePrev = () => {
    setCarouselIndex((prev) => (prev === 0 ? characters.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCarouselIndex((prev) => (prev === characters.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen lg:h-screen lg:overflow-hidden industrial-bg flex flex-col justify-center items-center p-4 sm:p-6 md:p-12 relative select-none">
      {/* Scanline Overlay */}
      <div className="scanlines"></div>

      {/* Background Ambience Shaders */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-[150px] pointer-events-none"></div>

      {/* Main Content Area */}
      <main className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 z-10 py-4 items-center">
        
        {/* Left Column: Title & Mission Briefing */}
        <section className="lg:col-span-5 flex flex-col items-stretch lg:items-start text-left space-y-6">
          <div className="space-y-2 text-center lg:text-left">
            <span className="inline-block text-xs font-mono font-bold tracking-[0.3em] text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-2 py-1 strict-rounded">
              TACTICAL MATH OPS
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-white uppercase leading-none pt-2">
              MATH HERO <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-yellow-300 text-glow-cyan">
                SQUAD!
              </span>
            </h1>
          </div>

          <div className="relative p-6 bg-slate-950/60 border border-cyan-900/40 strict-rounded bracket-corner shadow-2xl backdrop-blur-md w-full max-w-lg mx-auto lg:mx-0">
            <h2 className="font-display text-base font-bold tracking-wider text-cyan-400 uppercase mb-3 flex items-center gap-2">
              <Info size={18} /> Mission Directive
            </h2>
            <p className="text-base md:text-lg text-slate-200 leading-relaxed font-sans font-medium">
              Dr. Null is attacking with blocky <strong className="text-purple-400 font-bold">Glitch-Bots</strong>! Help the Math Hero Squad solve math problems on the robots' chests to blast them away and save the day!
            </p>
            <div className="mt-4 pt-4 border-t border-slate-900/60 flex items-center justify-between text-xs md:text-sm font-mono text-cyan-400/90 font-semibold">
              <span>TARGETS: ROBOT MINIONS</span>
              <span>MATH MASTERY REQ: 80%</span>
            </div>
          </div>

          <div className="flex justify-center lg:justify-start w-full">
            <button
              onClick={() => setShowModal(true)}
              className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-display font-black text-lg tracking-wider uppercase strict-rounded transition-all duration-300 transform active:scale-95 shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_35px_rgba(34,211,238,0.6)] cursor-pointer w-full sm:w-auto"
            >
              <Play size={20} className="fill-slate-950 stroke-none group-hover:scale-110 transition-transform" />
              Start Playing
              <span className="absolute right-2 top-2 w-1.5 h-1.5 bg-white strict-rounded animate-ping"></span>
            </button>
          </div>
        </section>

        {/* Right Column: Interactive Character Dossier Carousel */}
        <section className="lg:col-span-7 flex flex-col space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800/80 pb-3 gap-3">
            <h2 className="font-display text-xl font-bold tracking-widest text-slate-200 uppercase mx-auto lg:mx-0 text-center lg:text-left">
              Meet the Squad
            </h2>
          </div>

          {/* Carousel Layout Container */}
          <div className="relative flex flex-col items-center w-full max-w-lg mx-auto p-2">
            
            {/* Inner row containing: Prev button, Active Card, Next button */}
            <div className="flex items-center justify-between w-full gap-4">
              
              {/* Prev Button */}
              <button
                onClick={handlePrev}
                className="p-3 bg-slate-900 border border-cyan-800/60 text-cyan-400 hover:text-cyan-300 hover:border-cyan-500 hover:shadow-[0_0_12px_rgba(6,182,212,0.4)] transition-all strict-rounded cursor-pointer transform active:scale-90"
                aria-label="Previous character"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Character Card Slot */}
              {currentChar && (
                <div
                  className={`w-full p-5 sm:p-6 bg-slate-950/50 backdrop-blur-md border strict-rounded transition-all duration-300 shadow-2xl flex flex-col justify-between min-h-[360px] ${currentChar.bgBorderClass}`}
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 bg-slate-900/80 border border-slate-800 strict-rounded ${currentChar.colorClass} transition-transform`}>
                          {React.createElement(currentChar.icon, { size: 28 })}
                        </div>
                        <div>
                          <h3 className="font-display font-black text-white text-xl sm:text-2xl leading-tight">
                            {currentChar.name}
                          </h3>
                          <span className={`text-xs font-mono tracking-wider uppercase font-bold ${currentChar.colorClass}`}>
                            {currentChar.role}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-slate-300 border border-slate-800/80 px-2.5 py-0.5 strict-rounded bg-slate-950 font-semibold shrink-0">
                        {currentChar.badge}
                      </span>
                    </div>

                    <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-sans font-medium">
                      {currentChar.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-900/60 text-xs sm:text-sm font-mono space-y-2 text-slate-300">
                    <div>
                      <span className="text-slate-500 font-bold">GEAR:</span> {currentChar.suit}
                    </div>
                    <div>
                      <span className="text-slate-500 font-bold">STRIKE:</span> {currentChar.weapon}
                    </div>
                  </div>
                </div>
              )}

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="p-3 bg-slate-900 border border-cyan-800/60 text-cyan-400 hover:text-cyan-300 hover:border-cyan-500 hover:shadow-[0_0_12px_rgba(6,182,212,0.4)] transition-all strict-rounded cursor-pointer transform active:scale-90"
                aria-label="Next character"
              >
                <ChevronRight size={24} />
              </button>

            </div>

            {/* Indicator Dots */}
            <div className="flex gap-2.5 mt-5">
              {characters.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCarouselIndex(idx)}
                  className={`w-3 h-3 strict-rounded transition-all duration-300 cursor-pointer ${
                    idx === activeIndex 
                      ? 'bg-cyan-400 w-6 shadow-[0_0_8px_rgba(34,211,238,0.6)]' 
                      : 'bg-slate-800 hover:bg-slate-700'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

          </div>
        </section>

      </main>

      {/* Phase 1 Fallback Offline Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="relative w-full max-w-md bg-slate-900 border border-cyan-500/40 p-6 strict-rounded shadow-[0_0_50px_rgba(6,182,212,0.15)] flex flex-col space-y-4">
            
            {/* Corner Deco */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400 strict-rounded"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400 strict-rounded"></div>

            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-display font-black text-cyan-400 tracking-wider flex items-center gap-2 text-base uppercase">
                <ShieldAlert size={20} /> System Alert
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3 py-2 text-left">
              <p className="text-sm md:text-base font-mono text-cyan-400 font-bold uppercase tracking-wider">
                &gt; CONNECTION INTERRUPTED
              </p>
              <p className="text-sm md:text-base text-slate-200 font-sans leading-relaxed font-medium">
                The game combat engine is currently <strong className="text-yellow-400 font-bold">offline</strong>. 
                <br /><br />
                Phase 1 is ready! Level 1 addition and combat systems will be unlocked in Phase 2.
              </p>
            </div>

            <div className="flex justify-end pt-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 bg-cyan-950 border border-cyan-500 text-cyan-400 hover:bg-cyan-900 font-mono text-sm uppercase strict-rounded transition-colors cursor-pointer font-bold"
              >
                Acknowledge
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
