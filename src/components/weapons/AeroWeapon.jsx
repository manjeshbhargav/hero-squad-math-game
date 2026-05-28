export default function AeroWeapon({ enemyProgress }) {
  return (
    <div 
      className="cyclone-blast-container"
      style={{
        "--bot-left": `${80 - enemyProgress * 0.58}%`
      }}
    >
      <svg
        className="cyclone-vortex animate-cyclone-travel"
        viewBox="0 0 60 80"
        preserveAspectRatio="none"
      >
        <path
          d="M 5 5 C 15 25 15 15 25 45 C 28 55 25 65 30 80 C 35 65 32 55 35 45 C 45 15 45 25 55 5 Z"
          fill="rgba(52, 211, 153, 0.15)"
          stroke="#10b981"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
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
        <ellipse cx="30" cy="8" rx="25" ry="5" fill="none" stroke="#10b981" strokeWidth="1.5" />
        <ellipse cx="30" cy="25" rx="18" ry="4" fill="none" stroke="#10b981" strokeWidth="1.2" />
        <ellipse cx="30" cy="45" rx="12" ry="3" fill="none" stroke="#10b981" strokeWidth="1" />
        <ellipse cx="30" cy="65" rx="6" ry="2" fill="none" stroke="#10b981" strokeWidth="0.8" />
      </svg>
    </div>
  );
}
