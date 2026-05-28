import { Skull, Bot } from 'lucide-react';
import GlitchBotVector from '../components/vectors/GlitchBotVector';
import DrNullVector from '../components/vectors/DrNullVector';

export default class Villain {
  constructor(config) {
    this.id = config.id;
    this.name = config.name;
    this.type = config.type;
    this.vectorComponent = config.vectorComponent;
    this.maxHealth = config.maxHealth || 100;
    
    // UI details for registry and carousel
    this.role = config.role;
    this.description = config.description;
    this.suit = config.suit;
    this.weapon = config.weapon;
    this.icon = config.icon;
    this.colorClass = config.colorClass;
    this.bgBorderClass = config.bgBorderClass;
    this.glowClass = config.glowClass;
    this.badge = config.badge;
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
    maxHealth: 100,
    role: 'The Minion',
    description: 'Evil blocky robots sent by Dr. Null to defeat the heroes with tricky math problems!',
    suit: 'Iron chassis with vintage CRT screen body.',
    weapon: 'Wrong answer: Advances rapidly to defeat the heroes.',
    icon: Bot,
    colorClass: 'text-rose-400',
    bgBorderClass: 'border-rose-500/40 hover:border-rose-400 hover:shadow-[0_0_15px_rgba(244,63,94,0.4)]',
    glowClass: 'glow-rose',
    badge: 'Robot Minion'
  });

  static DR_NULL = new Villain({
    id: 'dr_null',
    name: 'Dr. Null',
    type: 'boss',
    vectorComponent: DrNullVector,
    maxHealth: 100,
    role: 'The Villain',
    description: 'A mad scientist sending blocky Glitch-Bots to defeat the heroes with math problems!',
    suit: 'Floating scientist lab robes.',
    weapon: 'Glitch-Bots: Evil blocky robots with math problems on their bodies.',
    icon: Skull,
    colorClass: 'text-purple-400',
    bgBorderClass: 'border-purple-500/40 hover:border-purple-400 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)]',
    glowClass: 'glow-purple',
    badge: 'Villain Boss'
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
