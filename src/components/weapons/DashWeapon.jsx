export default function DashWeapon({ enemyProgress }) {
  return (
    <svg
      className="volt-strike-container glow-yellow-lightning animate-lightning-bolt"
      style={{
        "--bot-left": `${80 - enemyProgress * 0.58}%`
      }}
      viewBox="0 0 100 20"
      preserveAspectRatio="none"
    >
      <path
        d="M 0 12 L 12 4 L 20 14 L 35 3 L 42 16 L 55 6 L 68 15 L 76 8 L 88 13 L 100 8"
        fill="none"
        stroke="#facc15"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="opacity-70"
      />
      <path
        d="M 0 12 L 12 4 L 20 14 L 35 3 L 42 16 L 55 6 L 68 15 L 76 8 L 88 13 L 100 8"
        fill="none"
        stroke="#ffffff"
        strokeWidth="0.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 20 14 L 28 19 L 33 17"
        fill="none"
        stroke="#eab308"
        strokeWidth="0.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="opacity-50"
      />
      <path
        d="M 55 6 L 62 2 L 68 5"
        fill="none"
        stroke="#eab308"
        strokeWidth="0.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="opacity-50"
      />
      <path
        d="M 76 8 L 82 13 L 87 11"
        fill="none"
        stroke="#eab308"
        strokeWidth="0.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="opacity-50"
      />
    </svg>
  );
}
