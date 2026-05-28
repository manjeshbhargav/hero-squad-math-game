import GlitchBotVector from '../components/vectors/GlitchBotVector';
import DrNullVector from '../components/vectors/DrNullVector';

export default class Villain {
  constructor(config) {
    this.id = config.id;
    this.name = config.name;
    this.type = config.type;
    this.vectorComponent = config.vectorComponent;
    this.maxHealth = config.maxHealth || 100;
  }

  /**
   * Calculates the vector component's state based on the villain's type and the active animationState.
   *
   * @param {string} animationState - The current combat animation state ('idle' | 'attacking' | 'enemyAdvancing').
   * @returns {string} The resolved vector state ('idle' | 'walk').
   */
  getState(animationState) {
    if (this.type === 'boss') {
      return 'idle';
    }
    return (animationState === 'idle' || animationState === 'enemyAdvancing') ? 'walk' : 'idle';
  }

  // --- Static Registry ---

  static GLITCH_BOT = new Villain({
    id: 'glitch_bot',
    name: 'Glitch-Bot',
    type: 'bot',
    vectorComponent: GlitchBotVector,
    maxHealth: 100
  });

  static DR_NULL = new Villain({
    id: 'dr_null',
    name: 'Dr. Null',
    type: 'boss',
    vectorComponent: DrNullVector,
    maxHealth: 100
  });

  static registry = [
    Villain.GLITCH_BOT,
    Villain.DR_NULL
  ];

  /**
   * Fetch all registered villains.
   */
  static getAllVillains() {
    return Villain.registry;
  }

  /**
   * Retrieve a villain instance by its ID.
   */
  static getVillainById(id) {
    return Villain.registry.find((v) => v.id === id) || Villain.GLITCH_BOT;
  }
}
