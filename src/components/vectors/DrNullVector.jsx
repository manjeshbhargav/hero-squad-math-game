/**
 * DrNullVector.jsx
 * Fully realized 2D human-stylized vector puppet for Dr. Null (The Villain).
 * 
 * Group Layers:
 * - null-head (Pivot: 50px 48px) - Bobbing/cackling motion
 * - null-torso (Pivot: 50px 75px) - Robed cyber chest
 * - null-arms (Pivot: 50px 70px) - Holding evil control pad
 */
export default function DrNullVector({ className = '', state = 'idle', children }) {
  return (
    <svg 
      viewBox="0 0 100 150" 
      className={`w-full h-full vector-puppet null-puppet state-${state} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Floating shadow beneath cloak */}
      <ellipse cx="50" cy="142" rx="20" ry="4" fill="rgba(0,0,0,0.45)" />

      <g className="null-body-assembly">
        
        {/* Robe/Cloak bottom trail (Static floating gown) */}
        <path d="M30 110 L70 110 L74 135 L26 135 Z" fill="#6b21a8" />
        <path d="M46 110 L54 110 L56 135 L44 135 Z" fill="#10b981" />

        {/* Torso & Scientist Coat */}
        <g className="null-torso origin-[50px_75px]">
          {/* Cybernetic Purple Robe */}
          <path d="M32 58 L68 58 L70 112 L30 112 Z" fill="#7e22ce" stroke="#4a044e" strokeWidth="1.5" />
          
          {!children && (
            <>
              {/* Green toxic containment vial in center chest */}
              <rect x="44" y="66" width="12" height="24" fill="#0f172a" rx="2" stroke="#10b981" strokeWidth="1.5" />
              <rect x="46" y="74" width="8" height="14" fill="#10b981" opacity="0.8" rx="1" />
              {/* Bubble effects */}
              <circle cx="48" cy="78" r="1" fill="#ffffff" />
              <circle cx="51" cy="84" r="1.5" fill="#ffffff" />
            </>
          )}
        </g>

        {/* Arms pointing outwards/downwards, keeping the chest display completely clear */}
        <g className="null-arms origin-[50px_70px]">
          {/* Left Sleeve & forearm pointing outwards/downwards */}
          <path d="M68 62 L80 82 L74 86 L64 74 Z" fill="#7e22ce" />
          <circle cx="77" cy="84" r="3.5" fill="#fbcfe8" />
          
          {/* Right Sleeve & forearm pointing outwards/downwards */}
          <path d="M32 62 L20 82 L26 86 L36 74 Z" fill="#7e22ce" />
          <circle cx="23" cy="84" r="3.5" fill="#fbcfe8" />
        </g>

        {/* Head Assembly */}
        <g className="null-head origin-[50px_48px]">
          {/* Neck */}
          <line x1="50" y1="58" x2="50" y2="48" stroke="#fbcfe8" strokeWidth="4" strokeLinecap="round" />
          
          {/* Face (Pale pink) */}
          <circle cx="50" cy="38" r="10" fill="#fbcfe8" />
          
          {/* Spiked white mad scientist hair */}
          <path d="M42 30 Q30 5 44 20 Q48 -5 54 22 Q68 5 58 30 Q54 34 44 32 Z" fill="#f3f4f6" />
          
          {/* Cybernetic glowing green monocle eye */}
          <circle cx="46" cy="36" r="3.5" fill="#10b981" filter="drop-shadow(0 0 2px #10b981)" />
          <line x1="38" y1="36" x2="43" y2="36" stroke="#475569" strokeWidth="1" />
          
          {/* Normal eye */}
          <circle cx="54" cy="36" r="1.5" fill="#374151" />
          
          {/* Sinister grin */}
          <path d="M46 43 Q50 48 54 43" stroke="#9d174d" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </g>

        {/* CRT Display Container (Rendered last to stay on top of everything) */}
        {children && (
          <g className="null-chest-display-container">
            {/* Widened retro monitor frame (maintaining strict 2px corner radius) */}
            <rect x="24" y="60" width="52" height="44" fill="#475569" stroke="#1e293b" strokeWidth="1.5" rx="2" ry="2" />
            {/* Screen bezel */}
            <rect x="27" y="63" width="46" height="38" fill="#334155" stroke="#000000" strokeWidth="1" rx="2" ry="2" />
            {/* Screen glass */}
            <rect x="29" y="65" width="42" height="34" fill="#0f172a" stroke="#000000" strokeWidth="1" rx="2" ry="2" />
            {/* CRT glare line */}
            <path d="M30 66 L44 66 L30 80 Z" fill="#ffffff" opacity="0.08" pointerEvents="none" />
            
            <foreignObject x="29" y="65" width="42" height="34">
              <div className="w-full h-full flex items-center justify-center">
                {children}
              </div>
            </foreignObject>
          </g>
        )}

      </g>
    </svg>
  );
}
