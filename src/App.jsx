import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import CombatArena from './components/CombatArena';

function App() {
  const [view, setView] = useState('landing'); // 'landing' | 'combat'
  const [initialLevel, setInitialLevel] = useState(1);

  // Enable Shift + n and Shift + p cheat codes on landing page
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (view === 'landing') {
        if (e.shiftKey && e.key.toLowerCase() === 'n') {
          e.preventDefault();
          setInitialLevel(1);
          setView('combat');
        } else if (e.shiftKey && e.key.toLowerCase() === 'p') {
          e.preventDefault();
          setInitialLevel(6);
          setView('combat');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [view]);

  return (
    <>
      {view === 'landing' ? (
        <LandingPage onStart={() => {
          setInitialLevel(1);
          setView('combat');
        }} />
      ) : (
        <CombatArena 
          key={initialLevel}
          initialLevel={initialLevel}
          onBack={() => setView('landing')} 
        />
      )}
    </>
  );
}

export default App;
