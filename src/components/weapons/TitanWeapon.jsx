export default function TitanWeapon({ enemyProgress }) {
  return (
    <div 
      className="quake-shockwave-rings-container"
      style={{
        "--bot-left": `${80 - enemyProgress * 0.58}%`
      }}
    >
      <div className="quake-ring ring-1" />
      <div className="quake-ring ring-2" />
      <div className="quake-ring ring-3" />
    </div>
  );
}
