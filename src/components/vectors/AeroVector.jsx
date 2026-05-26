/**
 * AeroVector.jsx
 * Redesigned 2D vector puppet for Aero (The Tactical Flyer) matching the reference collage.
 */
export default function AeroVector({ className = '', state = 'idle' }) {
  return (
    <svg 
      viewBox="0 0 100 150" 
      className={`w-full h-full vector-puppet aero-puppet state-${state} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Floating ground shadow that expands/contracts slightly as Aero bobs */}
      <ellipse className="aero-shadow" cx="50" cy="142" rx="16" ry="3.5" fill="rgba(0,0,0,0.3)" />

      <g className="aero-body-assembly">
        
        {/* Left Tech Wing (Flaps from shoulder attachment point) */}
        <g className="aero-wing-left origin-[62px_64px]">
          {/* Detailed wing blades */}
          <path d="M64 65 L86 42 L78 54 L66 58 Z" fill="#e5e7eb" stroke="#000000" strokeWidth="1.2" strokeLinejoin="round" />
          <path d="M64 65 L94 48 L84 62 L67 64 Z" fill="#e5e7eb" stroke="#000000" strokeWidth="1.2" strokeLinejoin="round" />
          <path d="M64 65 L98 56 L86 70 L67 68 Z" fill="#e5e7eb" stroke="#000000" strokeWidth="1.2" strokeLinejoin="round" />
          <path d="M64 65 L96 66 L82 78 L65 72 Z" fill="#10b981" stroke="#000000" strokeWidth="1.2" strokeLinejoin="round" />
          {/* Thruster core at base */}
          <circle cx="64" cy="65" r="5" fill="#10b981" stroke="#000000" strokeWidth="1.5" />
        </g>

        {/* Right Tech Wing (Flaps from shoulder attachment point) */}
        <g className="aero-wing-right origin-[38px_64px]">
          {/* Detailed wing blades */}
          <path d="M36 65 L14 42 L22 54 L34 58 Z" fill="#e5e7eb" stroke="#000000" strokeWidth="1.2" strokeLinejoin="round" />
          <path d="M36 65 L6 48 L16 62 L33 64 Z" fill="#e5e7eb" stroke="#000000" strokeWidth="1.2" strokeLinejoin="round" />
          <path d="M36 65 L2 56 L14 70 L33 68 Z" fill="#e5e7eb" stroke="#000000" strokeWidth="1.2" strokeLinejoin="round" />
          <path d="M36 65 L4 66 L18 78 L35 72 Z" fill="#10b981" stroke="#000000" strokeWidth="1.2" strokeLinejoin="round" />
          {/* Thruster core at base */}
          <circle cx="36" cy="65" r="5" fill="#10b981" stroke="#000000" strokeWidth="1.5" />
        </g>

        {/* Dangling Legs */}
        <g className="aero-legs origin-[50px_92px]">
          {/* Left Leg */}
          <line x1="56" y1="92" x2="60" y2="114" stroke="#000000" strokeWidth="8" strokeLinecap="round" />
          <line x1="56" y1="92" x2="60" y2="114" stroke="#10b981" strokeWidth="5" strokeLinecap="round" />
          <line x1="60" y1="114" x2="57" y2="132" stroke="#000000" strokeWidth="7" strokeLinecap="round" />
          <line x1="60" y1="114" x2="57" y2="132" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
          <circle cx="60" cy="114" r="3.5" fill="#ffffff" stroke="#000000" strokeWidth="1.2" />
          <path d="M57 128 L65 133 L63 125 Z" fill="#ffffff" stroke="#000000" strokeWidth="1.2" strokeLinejoin="round" />

          {/* Right Leg */}
          <line x1="44" y1="92" x2="40" y2="114" stroke="#000000" strokeWidth="8" strokeLinecap="round" />
          <line x1="44" y1="92" x2="40" y2="114" stroke="#10b981" strokeWidth="5" strokeLinecap="round" />
          <line x1="40" y1="114" x2="43" y2="132" stroke="#000000" strokeWidth="7" strokeLinecap="round" />
          <line x1="40" y1="114" x2="43" y2="132" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
          <circle cx="40" cy="114" r="3.5" fill="#ffffff" stroke="#000000" strokeWidth="1.2" />
          <path d="M43 128 L35 133 L37 125 Z" fill="#ffffff" stroke="#000000" strokeWidth="1.2" strokeLinejoin="round" />
        </g>

        {/* Torso (Bodysuit core) */}
        <g className="aero-torso origin-[50px_72px]">
          {/* Green bodysuit base */}
          <path d="M37 58 L63 58 L56 92 L44 92 Z" fill="#10b981" stroke="#000000" strokeWidth="2.5" strokeLinejoin="round" />
          {/* White chest panel borders */}
          <path d="M38 58 L44 58 L47 75 L43 92 L37 92 Z" fill="#ffffff" stroke="#000000" strokeWidth="1.2" />
          <path d="M62 58 L56 58 L53 75 L57 92 L63 92 Z" fill="#ffffff" stroke="#000000" strokeWidth="1.2" />
          {/* Tactical Belt */}
          <rect x="42" y="86" width="16" height="5" fill="#374151" stroke="#000000" strokeWidth="1.2" rx="1" />
          <circle cx="50" cy="88.5" r="2" fill="#10b981" stroke="#000000" strokeWidth="0.8" />
          
          {/* Shield Chest Badge */}
          <circle cx="50" cy="67" r="5.5" fill="#ffffff" stroke="#000000" strokeWidth="1.2" />
          <polygon points="48,65 52,65 52,68 50,70 48,68" fill="#10b981" />
        </g>

        {/* Arms */}
        {/* Left Arm */}
        <g className="aero-arm-left origin-[58px_60px]">
          <line x1="58" y1="60" x2="66" y2="76" stroke="#000000" strokeWidth="8" strokeLinecap="round" />
          <line x1="58" y1="60" x2="66" y2="76" stroke="#10b981" strokeWidth="5" strokeLinecap="round" />
          <line x1="66" y1="76" x2="62" y2="88" stroke="#000000" strokeWidth="7" strokeLinecap="round" />
          <line x1="66" y1="76" x2="62" y2="88" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
          <circle cx="62" cy="88" r="4.5" fill="#374151" stroke="#000000" strokeWidth="1.2" />
          <circle cx="58" cy="60" r="5.5" fill="#ffffff" stroke="#000000" strokeWidth="1.2" />
        </g>
        {/* Right Arm */}
        <g className="aero-arm-right origin-[42px_60px]">
          <line x1="42" y1="60" x2="34" y2="76" stroke="#000000" strokeWidth="8" strokeLinecap="round" />
          <line x1="42" y1="60" x2="34" y2="76" stroke="#10b981" strokeWidth="5" strokeLinecap="round" />
          <line x1="34" y1="76" x2="38" y2="88" stroke="#000000" strokeWidth="7" strokeLinecap="round" />
          <line x1="34" y1="76" x2="38" y2="88" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
          <circle cx="38" cy="88" r="4.5" fill="#374151" stroke="#000000" strokeWidth="1.2" />
          <circle cx="42" cy="60" r="5.5" fill="#ffffff" stroke="#000000" strokeWidth="1.2" />
        </g>

        {/* Head Assembly */}
        <g className="aero-head origin-[50px_48px]">
          {/* Neck */}
          <line x1="50" y1="58" x2="50" y2="48" stroke="#000000" strokeWidth="8" strokeLinecap="round" />
          <line x1="50" y1="58" x2="50" y2="48" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
          
          {/* Head & Face base */}
          <circle cx="50" cy="40" r="9.5" fill="#fed7aa" stroke="#000000" strokeWidth="1.5" />
          
          {/* Expressive dark eyes */}
          <ellipse cx="47" cy="40" rx="1.2" ry="2" fill="#ffffff" stroke="#000000" strokeWidth="0.8" />
          <circle cx="47" cy="40" r="0.7" fill="#451a03" />
          
          <ellipse cx="53" cy="40" rx="1.2" ry="2" fill="#ffffff" stroke="#000000" strokeWidth="0.8" />
          <circle cx="53" cy="40" r="0.7" fill="#451a03" />
          
          {/* Eyebrows */}
          <path d="M45 37 Q47 36 49 37" stroke="#451a03" strokeWidth="1" strokeLinecap="round" fill="none" />
          <path d="M55 37 Q53 36 51 37" stroke="#451a03" strokeWidth="1" strokeLinecap="round" fill="none" />

          {/* Smile */}
          <path d="M47.5 44.5 Q50 46.5 52.5 44.5" stroke="#451a03" strokeWidth="1.2" strokeLinecap="round" fill="none" />

          {/* Hair (Spiky brown haircut swept back/up) */}
          <path d="M40 33 Q50 18 60 33 L58 27 Q50 14 42 27 Z" fill="#78350f" stroke="#000000" strokeWidth="1.2" strokeLinejoin="round" />
          <path d="M42 27 Q37 27 38 32 M58 27 Q63 27 62 32" stroke="#78350f" strokeWidth="1.2" strokeLinecap="round" />
        </g>

      </g>
    </svg>
  );
}
