import { Award, AlertCircle, RefreshCw } from 'lucide-react';

const levelNames = [
  'Single Digit Addition',
  'Addition',
  'Subtraction',
  'Carry Addition',
  'Borrow Subtraction',
  'Mixed Mastery Boss Wave'
];

export default function LevelEndedOverlay({
  isMastered,
  currentLevel,
  score,
  onReset,
  onNextLevel,
  onBack
}) {

  const levelName = levelNames[currentLevel - 1] ?? '';
  const nextLevelName = levelNames[currentLevel] ?? '';

  const successDescription = currentLevel === 6
    ? `Incredible! You defeated Dr. Null, shutdown the glitch network, and saved the city! You are a Math Hero Squad legend!`
    : `Fantastic job! You solved the ${levelName.toLowerCase()} equations, defeated the Glitch-Bot, and protected the mainframe!`;

  const successDetail = currentLevel === 6
    ? 'All math defense training levels complete! Math Hero Squad operations fully online.'
    : `Level ${currentLevel} ${levelName} complete! Prepare for ${nextLevelName}.`;

  // Configuration variables distinct to win (mastered) vs loss (failed) modes
  const masteredTheme = {
    border: 'border-green-500/40',
    shadow: 'shadow-[0_0_50px_rgba(34,197,94,0.15)]',
    corner: 'border-green-400',
    iconBg: 'bg-green-500/10',
    iconBorder: 'border-green-500/30',
    iconColor: 'text-green-400',
    iconAnim: 'animate-bounce',
    textColor: 'text-green-400',
    scoreColor: 'text-green-400',
    Icon: Award,
    title: `LEVEL ${currentLevel} ${levelName} MASTERED!`,
    subtitle: 'MISSION COMPLETED SUCCESSFULLY',
    description: successDescription,
    detail: successDetail,
    callToActions: [
      {
        onClick: onReset,
        label: `Reset ${levelName}`,
        className: 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-500 hover:text-white'
      },
      ...(currentLevel === 6 ? [
        {
          onClick: onBack,
          label: 'Main Menu',
          className: 'bg-green-950 border-green-500 text-green-400 hover:bg-green-900'
        }
      ] : [
        {
          onClick: () => onNextLevel(currentLevel + 1),
          label: `Next Level: ${nextLevelName}`,
          className: 'bg-green-950 border-green-500 text-green-400 hover:bg-green-900'
        }
      ])
    ]
  };

  const lostTheme = {
    border: 'border-red-500/40',
    shadow: 'shadow-[0_0_50px_rgba(239,68,68,0.15)]',
    corner: 'border-red-400',
    iconBg: 'bg-red-500/10',
    iconBorder: 'border-red-500/30',
    iconColor: 'text-red-400',
    iconAnim: 'animate-pulse',
    textColor: 'text-red-400',
    scoreColor: 'text-red-400',
    Icon: AlertCircle,
    title: 'DEFENSE BREACHED',
    subtitle: `${currentLevel === 6 ? 'DR. NULL' : 'GLITCH-BOT'} BREACHED MAIN FRAME`,
    description: `${currentLevel === 6 ? 'Dr. Null' : 'The Glitch-Bot'} advanced too close and corrupted our calculations!`,
    detail: null,
    callToActions: [
      {
        onClick: onBack,
        label: 'Exit',
        className: 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-500 hover:text-white'
      },
      {
        onClick: onReset,
        label: <><RefreshCw size={14} /> Retry Mission</>,
        className: 'bg-red-950 border-red-500 text-red-400 hover:bg-red-900 flex items-center justify-center gap-2'
      }
    ]
  };

  const theme = isMastered ? masteredTheme : lostTheme;

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className={`relative w-full max-w-md bg-slate-900 border ${theme.border} p-6 strict-rounded ${theme.shadow} flex flex-col space-y-4 text-center`}>
        {/* Corner decorations */}
        <div className={`absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2 ${theme.corner} rounded-tl-[2px]`}></div>
        <div className={`absolute -bottom-px -right-px w-4 h-4 border-b-2 border-r-2 ${theme.corner} rounded-br-[2px]`}></div>

        <div className="flex flex-col items-center space-y-2">
          <div className={`p-3 ${theme.iconBg} border ${theme.iconBorder} ${theme.iconColor} strict-rounded ${theme.iconAnim}`}>
            <theme.Icon size={48} />
          </div>
          <h3 className={`font-display font-black ${theme.textColor} text-xl tracking-wider uppercase pt-2`}>
            {theme.title}
          </h3>
          <span className="font-mono text-xs text-slate-500">{theme.subtitle}</span>
        </div>

        <div className="space-y-3 py-2 text-slate-300 text-sm leading-relaxed font-sans font-medium">
          <p>{theme.description}</p>
          <div className={`text-xs text-slate-400 border border-slate-800 p-3 bg-slate-950/40 strict-rounded flex ${
            theme.detail ? 'flex-col gap-3' : 'justify-center'
          }`}>
            <div className={theme.detail ? '' : 'text-center'}>
              <span className="block text-slate-500 font-bold uppercase tracking-wider text-[10px] mb-1">SCORE EARNED</span>
              <span className={`text-2xl ${theme.scoreColor} font-black font-display`}>{score}</span>
            </div>
            {theme.detail && (
              <div className="text-xs text-slate-400 border-t border-slate-800/40 pt-2 text-center">
                {theme.detail}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-3 justify-center pt-3 w-full">
          {theme.callToActions.map((buttonProps, i) => (
            <button
              key={i}
              onClick={buttonProps.onClick}
              className={`px-5 py-3 border font-mono text-xs uppercase strict-rounded transition-colors cursor-pointer font-bold flex-1 ${buttonProps.className}`}
            >
              {buttonProps.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
