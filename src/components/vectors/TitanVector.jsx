/**
 * TitanVector.jsx
 * Redesigned 2D vector puppet for Titan (The Heavy Brawler) matching the reference collage.
 */
export default function TitanVector({ className = '', state = 'idle' }) {
  return (
    <svg 
      viewBox="0 0 100 150" 
      className={`w-full h-full vector-puppet titan-puppet state-${state} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Heavy drop shadow for grounded feel */}
      <ellipse cx="50" cy="142" rx="30" ry="6" fill="rgba(0,0,0,0.5)" />

      <g className="titan-body-assembly">
        
        {/* Legs / Lower Frame */}
        <g className="titan-legs origin-[50px_95px]">
          {/* Left Leg */}
          <line x1="58" y1="95" x2="68" y2="120" stroke="#000000" strokeWidth="12" strokeLinecap="round" />
          <line x1="58" y1="95" x2="68" y2="120" stroke="#dc2626" strokeWidth="9" strokeLinecap="round" />
          <line x1="68" y1="120" x2="72" y2="136" stroke="#000000" strokeWidth="10" strokeLinecap="round" />
          <line x1="68" y1="120" x2="72" y2="136" stroke="#9ca3af" strokeWidth="7" strokeLinecap="round" />
          <circle cx="68" cy="120" r="6" fill="#e5e7eb" stroke="#000000" strokeWidth="1.5" /> {/* Knee pad */}
          <path d="M68 132 L80 138 L78 128 Z" fill="#9ca3af" stroke="#000000" strokeWidth="1.5" strokeLinejoin="round" /> {/* Boot */}

          {/* Right Leg */}
          <line x1="42" y1="95" x2="32" y2="120" stroke="#000000" strokeWidth="12" strokeLinecap="round" />
          <line x1="42" y1="95" x2="32" y2="120" stroke="#dc2626" strokeWidth="9" strokeLinecap="round" />
          <line x1="32" y1="120" x2="28" y2="136" stroke="#000000" strokeWidth="10" strokeLinecap="round" />
          <line x1="32" y1="120" x2="28" y2="136" stroke="#9ca3af" strokeWidth="7" strokeLinecap="round" />
          <circle cx="32" cy="120" r="6" fill="#e5e7eb" stroke="#000000" strokeWidth="1.5" /> {/* Knee pad */}
          <path d="M32 132 L20 138 L22 128 Z" fill="#9ca3af" stroke="#000000" strokeWidth="1.5" strokeLinejoin="round" /> {/* Boot */}
        </g>

        {/* Left Arm (Background side) */}
        <g className="titan-arm-left origin-[68px_55px]">
          {/* Upper arm sleeve */}
          <line x1="68" y1="55" x2="80" y2="72" stroke="#000000" strokeWidth="10" strokeLinecap="round" />
          <line x1="68" y1="55" x2="80" y2="72" stroke="#dc2626" strokeWidth="7" strokeLinecap="round" />
          {/* Forearm and fist */}
          <line x1="80" y1="72" x2="84" y2="90" stroke="#000000" strokeWidth="9" strokeLinecap="round" />
          <line x1="80" y1="72" x2="84" y2="90" stroke="#9ca3af" strokeWidth="6" strokeLinecap="round" />
          <circle cx="80" cy="72" r="4.5" fill="#e5e7eb" stroke="#000000" strokeWidth="1.5" />
          <circle cx="84" cy="90" r="5.5" fill="#374151" stroke="#000000" strokeWidth="1.5" />
        </g>

        {/* Right Arm (Foreground side) */}
        <g className="titan-arm-right origin-[32px_55px]">
          {/* Upper arm sleeve */}
          <line x1="32" y1="55" x2="20" y2="72" stroke="#000000" strokeWidth="10" strokeLinecap="round" />
          <line x1="32" y1="55" x2="20" y2="72" stroke="#dc2626" strokeWidth="7" strokeLinecap="round" />
          {/* Forearm and fist */}
          <line x1="20" y1="72" x2="16" y2="90" stroke="#000000" strokeWidth="9" strokeLinecap="round" />
          <line x1="20" y1="72" x2="16" y2="90" stroke="#9ca3af" strokeWidth="6" strokeLinecap="round" />
          <circle cx="20" cy="72" r="4.5" fill="#e5e7eb" stroke="#000000" strokeWidth="1.5" />
          <circle cx="16" cy="90" r="5.5" fill="#374151" stroke="#000000" strokeWidth="1.5" />
        </g>

        {/* Torso & Shoulder Pads (Pauldrons) */}
        <g className="titan-torso origin-[50px_68px]">
          {/* Red heavy chest plate backing */}
          <path d="M28 50 L72 50 L65 95 L35 95 Z" fill="#dc2626" stroke="#000000" strokeWidth="2.5" strokeLinejoin="round" />
          {/* Silver center armor breastplate */}
          <path d="M34 50 L66 50 L60 90 L40 90 Z" fill="#e5e7eb" stroke="#000000" strokeWidth="1.5" strokeLinejoin="round" />
          {/* Inner chest stripes */}
          <path d="M45 50 L55 50 L54 90 L46 90 Z" fill="#9ca3af" />
          {/* Waist Belt */}
          <rect x="33" y="88" width="34" height="7" fill="#1f2937" stroke="#000000" strokeWidth="1.5" rx="1" />
          <rect x="46" y="86" width="8" height="11" fill="#9ca3af" stroke="#000000" strokeWidth="1.5" rx="1.5" />
          <rect x="49" y="89" width="2" height="5" fill="#f3f4f6" />
          
          {/* Pauldrons (Shoulder Pads) */}
          {/* Left Pauldron */}
          <path d="M64 45 C78 43 82 60 68 64 Z" fill="#e5e7eb" stroke="#000000" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M67 48 C74 47 77 56 69 58 Z" fill="#dc2626" />
          {/* Right Pauldron */}
          <path d="M36 45 C22 43 18 60 32 64 Z" fill="#e5e7eb" stroke="#000000" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M33 48 C26 47 23 56 31 58 Z" fill="#dc2626" />
        </g>

        {/* Head Assembly */}
        <g className="titan-head origin-[50px_42px]">
          {/* Thick Neck */}
          <rect x="43" y="38" width="14" height="9" fill="#fed7aa" stroke="#000000" strokeWidth="1.5" />

          {/* Chin and head base */}
          <path d="M39 25 L40 33 Q50 39 60 33 L61 25 Z" fill="#fed7aa" stroke="#000000" strokeWidth="1.5" strokeLinejoin="round" />
          <circle cx="50" cy="24" r="11" fill="#fed7aa" />

          {/* Hair (Short spiky brown hairstyle) */}
          <path d="M37 20 Q50 10 63 20 L61 14 Q50 5 39 14 Z" fill="#78350f" stroke="#000000" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M39 15 L43 12 L48 14 L52 11 L57 14 L61 11" fill="none" stroke="#78350f" strokeWidth="1.5" strokeLinecap="round" />
          
          {/* Angry Eyebrows */}
          <path d="M41 21 Q45 19 49 22" fill="none" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M59 21 Q55 19 51 22" fill="none" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" />

          {/* Angry Eyes */}
          <polygon points="42,24 48,24 46,26 43,26" fill="#ffffff" stroke="#000000" strokeWidth="0.8" />
          <circle cx="45" cy="25" r="1" fill="#000000" />
          
          <polygon points="58,24 52,24 54,26 57,26" fill="#ffffff" stroke="#000000" strokeWidth="0.8" />
          <circle cx="55" cy="25" r="1" fill="#000000" />

          {/* Nose */}
          <path d="M49 25 L50 28 L51 25" fill="none" stroke="#78350f" strokeWidth="1" />

          {/* Gritted Teeth Mouth */}
          <rect x="45" y="30" width="10" height="4" fill="#ffffff" stroke="#000000" strokeWidth="1.2" rx="0.5" />
          <line x1="45" y1="32" x2="55" y2="32" stroke="#000000" strokeWidth="0.8" />
          <line x1="48" y1="30" x2="48" y2="34" stroke="#000000" strokeWidth="0.6" />
          <line x1="52" y1="30" x2="52" y2="34" stroke="#000000" strokeWidth="0.6" />
        </g>

      </g>
    </svg>
  );
}
