/**
 * DashVector.jsx
 * Redesigned 2D vector puppet for Dash (The Speedster) matching the reference collage.
 */
export default function DashVector({ className = '', state = 'idle' }) {
  return (
    <svg 
      viewBox="0 0 100 150" 
      className={`w-full h-full vector-puppet dash-puppet state-${state} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background shadow for ground reference */}
      <ellipse cx="50" cy="140" rx="24" ry="4" fill="rgba(0,0,0,0.4)" />

      <g className="dash-body-assembly">
        
        {/* Left Arm (Background side) */}
        <g className="dash-arm-left origin-[62px_48px]">
          {/* Shoulder to elbow */}
          <line x1="62" y1="48" x2="75" y2="65" stroke="#000000" strokeWidth="9" strokeLinecap="round" />
          <line x1="62" y1="48" x2="75" y2="65" stroke="#1d4ed8" strokeWidth="6" strokeLinecap="round" />
          {/* Forearm and fist */}
          <line x1="75" y1="65" x2="80" y2="82" stroke="#000000" strokeWidth="8" strokeLinecap="round" />
          <line x1="75" y1="65" x2="80" y2="82" stroke="#facc15" strokeWidth="5" strokeLinecap="round" />
          <circle cx="80" cy="82" r="5.5" fill="#facc15" stroke="#000000" strokeWidth="1.5" />
          {/* Shoulder Pad */}
          <circle cx="62" cy="48" r="7.5" fill="#facc15" stroke="#000000" strokeWidth="1.5" />
        </g>

        {/* Right Arm (Foreground side - moved here so it is behind/overlapped by the torso) */}
        <g className="dash-arm-right origin-[38px_48px]">
          {/* Shoulder to elbow */}
          <line x1="38" y1="48" x2="25" y2="65" stroke="#000000" strokeWidth="9" strokeLinecap="round" />
          <line x1="38" y1="48" x2="25" y2="65" stroke="#2563eb" strokeWidth="6" strokeLinecap="round" />
          {/* Forearm and fist */}
          <line x1="25" y1="65" x2="20" y2="82" stroke="#000000" strokeWidth="8" strokeLinecap="round" />
          <line x1="25" y1="65" x2="20" y2="82" stroke="#facc15" strokeWidth="5" strokeLinecap="round" />
          <circle cx="20" cy="82" r="5.5" fill="#facc15" stroke="#000000" strokeWidth="1.5" />
          {/* Shoulder Pad */}
          <circle cx="38" cy="48" r="7.5" fill="#facc15" stroke="#000000" strokeWidth="1.5" />
        </g>

        {/* Left Leg (Background side) */}
        <g className="dash-leg-left origin-[58px_80px]">
          {/* Thigh */}
          <line x1="58" y1="80" x2="68" y2="105" stroke="#000000" strokeWidth="11" strokeLinecap="round" />
          <line x1="58" y1="80" x2="68" y2="105" stroke="#1d4ed8" strokeWidth="8" strokeLinecap="round" />
          {/* Shin */}
          <line x1="68" y1="105" x2="72" y2="132" stroke="#000000" strokeWidth="9" strokeLinecap="round" />
          <line x1="68" y1="105" x2="72" y2="132" stroke="#facc15" strokeWidth="6" strokeLinecap="round" />
          {/* Knee Pad */}
          <circle cx="68" cy="105" r="5" fill="#facc15" stroke="#000000" strokeWidth="1.5" />
          {/* Running shoe */}
          <path d="M72 128 L71 134 L85 133 Z" fill="#facc15" stroke="#000000" strokeWidth="1.5" strokeLinejoin="round" />
        </g>

        {/* Right Leg (Foreground side) */}
        <g className="dash-leg-right origin-[42px_80px]">
          {/* Thigh */}
          <line x1="42" y1="80" x2="32" y2="105" stroke="#000000" strokeWidth="11" strokeLinecap="round" />
          <line x1="42" y1="80" x2="32" y2="105" stroke="#2563eb" strokeWidth="8" strokeLinecap="round" />
          {/* Shin */}
          <line x1="32" y1="105" x2="28" y2="132" stroke="#000000" strokeWidth="9" strokeLinecap="round" />
          <line x1="32" y1="105" x2="28" y2="132" stroke="#facc15" strokeWidth="6" strokeLinecap="round" />
          {/* Knee Pad */}
          <circle cx="32" cy="105" r="5" fill="#facc15" stroke="#000000" strokeWidth="1.5" />
          {/* Running shoe */}
          <path d="M28 128 L29 134 L15 133 Z" fill="#facc15" stroke="#000000" strokeWidth="1.5" strokeLinejoin="round" />
        </g>

        {/* Torso (Main core) */}
        <g className="dash-torso origin-[50px_60px]">
          {/* Suit body */}
          <path d="M37 44 L63 44 L59 83 L41 83 Z" fill="#1e40af" stroke="#000000" strokeWidth="2.5" strokeLinejoin="round" />
          {/* Side accents */}
          <path d="M37 44 L43 44 L41 83 L39 83 Z" fill="#1d4ed8" />
          <path d="M63 44 L57 44 L59 83 L61 83 Z" fill="#1d4ed8" />
          {/* Center speed stripes */}
          <path d="M45 44 L48 44 L46 83 L43 83 Z" fill="#facc15" />
          <path d="M55 44 L52 44 L54 83 L57 83 Z" fill="#facc15" />
          {/* Collar */}
          <path d="M43 44 C43 49 57 49 57 44 Z" fill="#facc15" stroke="#000000" strokeWidth="1.5" />
          
          {/* Chest Emblem */}
          <circle cx="50" cy="58" r="7.5" fill="#eab308" stroke="#000000" strokeWidth="1.5" />
          <circle cx="50" cy="58" r="6.2" fill="#facc15" />
          {/* Lightning Bolt */}
          <path d="M50 54 L46.5 58.5 L49.5 58.5 L48.5 62 L52.5 57 L49.5 57 Z" fill="#0f68d4" />

          {/* Yellow Belt */}
          <polygon points="38.6,76 61.4,76 61,82 39,82" fill="#facc15" stroke="#000000" strokeWidth="1.5" strokeLinejoin="round" />
          {/* Belt Buckle */}
          <circle cx="50" cy="79" r="5" fill="#eab308" stroke="#000000" strokeWidth="1.2" />
          <circle cx="50" cy="79" r="4" fill="#facc15" />
          {/* Mini Lightning Bolt Logo */}
          <path d="M50 76.5 L47.5 79.5 L49.5 79.5 L48.5 82 L52.5 78.5 L50.5 78.5 Z" fill="#0f68d4" />
        </g>

        {/* Head & Hair Assembly */}
        <g className="dash-head origin-[50px_35px]">
          {/* Neck */}
          <line x1="50" y1="45" x2="50" y2="35" stroke="#000000" strokeWidth="9" strokeLinecap="round" />
          <line x1="50" y1="45" x2="50" y2="35" stroke="#fed7aa" strokeWidth="6" strokeLinecap="round" />
          
          {/* Yellow Cowl Mask Base */}
          <circle cx="50" cy="27" r="11" fill="#facc15" stroke="#000000" strokeWidth="1.5" />

          {/* Blue F-shaped wings at ears */}
          {/* Left Ear Wing */}
          <path d="M60 28 L60 20 L67 18 L66 21 L60 22 L60 24 L65 24 L64 27 L60 27 Z" fill="#2563eb" stroke="#000000" strokeWidth="1" strokeLinejoin="round" />
          {/* Right Ear Wing */}
          <path d="M40 28 L40 20 L33 18 L34 21 L40 22 L40 24 L35 24 L36 27 L40 27 Z" fill="#2563eb" stroke="#000000" strokeWidth="1" strokeLinejoin="round" />

          {/* Skin Cutout for Eyes */}
          <ellipse cx="46.5" cy="25.5" rx="3.2" ry="4.2" fill="#fed7aa" stroke="#000000" strokeWidth="1" />
          <ellipse cx="53.5" cy="25.5" rx="3.2" ry="4.2" fill="#fed7aa" stroke="#000000" strokeWidth="1" />

          {/* Skin Cutout for Mouth/Lower Face */}
          <path d="M42 29 C42 38 58 38 58 29 Z" fill="#fed7aa" stroke="#000000" strokeWidth="1" strokeLinejoin="round" />
          
          {/* Expressive Anime Eyes */}
          {/* Left Eye */}
          <ellipse cx="46.5" cy="25.5" rx="2" ry="3" fill="#ffffff" stroke="#000000" strokeWidth="1" />
          <circle cx="46.5" cy="25.5" r="1.2" fill="#2563eb" />
          <circle cx="47.2" cy="24.5" r="0.5" fill="#ffffff" />
          
          {/* Right Eye */}
          <ellipse cx="53.5" cy="25.5" rx="2" ry="3" fill="#ffffff" stroke="#000000" strokeWidth="1" />
          <circle cx="53.5" cy="25.5" r="1.2" fill="#2563eb" />
          <circle cx="54.2" cy="24.5" r="0.5" fill="#ffffff" />
          
          {/* Eyebrows */}
          <path d="M43.5 21.5 Q46 20 48.5 21.5" fill="none" stroke="#78350f" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M56.5 21.5 Q54 20 51.5 21.5" fill="none" stroke="#78350f" strokeWidth="1.2" strokeLinecap="round" />

          {/* Cheeks Blush */}
          <ellipse cx="42.5" cy="29" rx="1.5" ry="1" fill="#f87171" opacity="0.4" />
          <ellipse cx="57.5" cy="29" rx="1.5" ry="1" fill="#f87171" opacity="0.4" />

          {/* Determined smile */}
          <path d="M46.5 32 Q50 34.5 53.5 32" stroke="#78350f" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </g>

      </g>
    </svg>
  );
}
