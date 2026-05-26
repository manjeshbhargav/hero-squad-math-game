import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import CombatArena from './components/CombatArena';

function App() {
  const [view, setView] = useState('landing'); // 'landing' | 'combat'

  return (
    <>
      {view === 'landing' ? (
        <LandingPage onStart={() => setView('combat')} />
      ) : (
        <CombatArena onBack={() => setView('landing')} />
      )}
    </>
  );
}

export default App;
