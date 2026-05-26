/**
 * GlitchBotVector.jsx
 * Redesigned 2D vector puppet for the Glitch-Bots matching the reference collage.
 */
export default function GlitchBotVector({ className = '', state = 'idle', health = 100, children }) {
  const isArmorBroken = health < 50;

  return (
    <svg 
      viewBox="0 0 100 150" 
      className={`w-full h-full vector-puppet bot-puppet state-${state} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Robot drop shadow */}
      <ellipse cx="50" cy="142" rx="22" ry="4.5" fill="rgba(0,0,0,0.4)" />

      <g className="bot-body-assembly">
        
        {/* Scissoring Mechanical Legs */}
        <g className="bot-legs origin-[50px_105px]">
          {/* Left leg piston */}
          <line x1="62" y1="105" x2="68" y2="135" stroke="#000000" strokeWidth="8" />
          <line x1="62" y1="105" x2="68" y2="135" stroke="#475569" strokeWidth="5" />
          <circle cx="62" cy="105" r="4.5" fill="#334155" stroke="#000000" strokeWidth="1" />
          <rect x="61" y="128" width="13" height="11" fill="#334155" stroke="#000000" strokeWidth="1.2" rx="1" />

          {/* Right leg piston */}
          <line x1="38" y1="105" x2="32" y2="135" stroke="#000000" strokeWidth="8" />
          <line x1="38" y1="105" x2="32" y2="135" stroke="#475569" strokeWidth="5" />
          <circle cx="38" cy="105" r="4.5" fill="#334155" stroke="#000000" strokeWidth="1" />
          <rect x="25" y="128" width="13" height="11" fill="#334155" stroke="#000000" strokeWidth="1.2" rx="1" />
        </g>

        {/* Humorous Polka-dot Underframe Silhouette (revealed when armor slides away) */}
        <rect x="30" y="55" width="40" height="50" fill="#1e1e24" className="polka-dot-bg border-2 border-rose-600 strict-rounded animate-pulse" />

        {/* Outer Armored Plates - styled as vintage CRT monitor casing (Slide apart when damaged < 50%) */}
        <g className={`transition-all duration-700 ${isArmorBroken ? 'translate-x-[24px] opacity-0 pointer-events-none' : 'translate-x-0'}`}>
          {/* Left side casing */}
          <path d="M50 54 L68 54 Q71 54 71 57 L71 103 Q71 106 68 106 L50 106 Z" fill="#64748b" stroke="#000000" strokeWidth="1.8" />
          {/* Rivets */}
          <circle cx="67" cy="58" r="1.2" fill="#cbd5e1" stroke="#000000" strokeWidth="0.5" />
          <circle cx="67" cy="102" r="1.2" fill="#cbd5e1" stroke="#000000" strokeWidth="0.5" />
          {/* Battle damage painted accent plate */}
          <path d="M64 75 L71 78 L71 88 L64 85 Z" fill="#3b82f6" stroke="#000000" strokeWidth="1" />
          {/* Metal crack detail */}
          <path d="M53 62 L60 67" fill="none" stroke="#334155" strokeWidth="1.2" strokeLinecap="round" />
        </g>

        <g className={`transition-all duration-700 ${isArmorBroken ? '-translate-x-[24px] opacity-0 pointer-events-none' : 'translate-x-0'}`}>
          {/* Right side casing */}
          <path d="M50 54 L32 54 Q29 54 29 57 L29 103 Q29 106 32 106 L50 106 Z" fill="#64748b" stroke="#000000" strokeWidth="1.8" />
          {/* Rivets */}
          <circle cx="33" cy="58" r="1.2" fill="#cbd5e1" stroke="#000000" strokeWidth="0.5" />
          <circle cx="33" cy="102" r="1.2" fill="#cbd5e1" stroke="#000000" strokeWidth="0.5" />
          {/* Metal crack detail */}
          <path d="M47 88 L41 93 L43 97" fill="none" stroke="#334155" strokeWidth="1.2" strokeLinecap="round" />
        </g>

        {/* Central Display panel slot (equation rendered here) */}
        <g className="bot-chest-display-container">
          {/* Dark screen backing inside the monitor frame */}
          <rect x="33" y="58" width="34" height="44" fill="#0f172a" stroke="#000000" strokeWidth="1.5" rx="1.5" />
          <foreignObject x="32" y="60" width="36" height="40">
            <div className="w-full h-full flex items-center justify-center">
              {children}
            </div>
          </foreignObject>
        </g>

        {/* Left Piston Arm */}
        <g className="bot-arm-left origin-[74px_65px]">
          <line x1="70" y1="65" x2="84" y2="78" stroke="#000000" strokeWidth="8" strokeLinecap="round" />
          <line x1="70" y1="65" x2="84" y2="78" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
          <line x1="84" y1="78" x2="80" y2="94" stroke="#000000" strokeWidth="7" strokeLinecap="round" />
          <line x1="84" y1="78" x2="80" y2="94" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
          {/* Claw (3-pronged) */}
          <path d="M76 94 Q74 100 78 102 M80 94 Q80 102 81 102 M84 94 Q86 100 84 102" fill="none" stroke="#000000" strokeWidth="1.2" strokeLinecap="round" />
          {/* Shoulder joint cap */}
          <circle cx="74" cy="65" r="4.5" fill="#334155" stroke="#000000" strokeWidth="1" />
        </g>

        {/* Right Piston Arm */}
        <g className="bot-arm-right origin-[26px_65px]">
          <line x1="30" y1="65" x2="16" y2="78" stroke="#000000" strokeWidth="8" strokeLinecap="round" />
          <line x1="30" y1="65" x2="16" y2="78" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
          <line x1="16" y1="78" x2="20" y2="94" stroke="#000000" strokeWidth="7" strokeLinecap="round" />
          <line x1="16" y1="78" x2="20" y2="94" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
          {/* Claw (3-pronged) */}
          <path d="M24 94 Q26 100 22 102 M20 94 Q20 102 19 102 M16 94 Q14 100 16 102" fill="none" stroke="#000000" strokeWidth="1.2" strokeLinecap="round" />
          {/* Shoulder joint cap */}
          <circle cx="26" cy="65" r="4.5" fill="#334155" stroke="#000000" strokeWidth="1" />
        </g>

        {/* Head Block */}
        <g className="bot-head origin-[50px_42px]">
          {/* Cyber Neck */}
          <rect x="45" y="44" width="10" height="8" fill="#334155" stroke="#000000" strokeWidth="1.5" />
          <line x1="47" y1="48" x2="53" y2="48" stroke="#475569" strokeWidth="1" />
          
          {/* Silver rounded head */}
          <path d="M34 38 L34 44 L66 44 L66 38 C66 22 34 22 34 38 Z" fill="#e5e7eb" stroke="#000000" strokeWidth="1.5" strokeLinejoin="round" />
          
          {/* Grid mouth */}
          <rect x="42" y="38" width="16" height="4" fill="#374151" stroke="#000000" strokeWidth="1" />
          <line x1="45" y1="38" x2="45" y2="42" stroke="#000000" strokeWidth="0.5" />
          <line x1="48" y1="38" x2="48" y2="42" stroke="#000000" strokeWidth="0.5" />
          <line x1="52" y1="38" x2="52" y2="42" stroke="#000000" strokeWidth="0.5" />
          <line x1="55" y1="38" x2="55" y2="42" stroke="#000000" strokeWidth="0.5" />

          {/* Two red glowing eyes */}
          <circle cx="43" cy="31" r="2.5" fill="#ef4444" filter="drop-shadow(0 0 2px #ef4444)" stroke="#000000" strokeWidth="0.8" />
          <circle cx="43" cy="31" r="0.8" fill="#ffffff" />
          
          <circle cx="57" cy="31" r="2.5" fill="#ef4444" filter="drop-shadow(0 0 2px #ef4444)" stroke="#000000" strokeWidth="0.8" />
          <circle cx="57" cy="31" r="0.8" fill="#ffffff" />
        </g>

      </g>
    </svg>
  );
}
