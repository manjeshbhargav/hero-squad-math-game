# GameLevel Class Specification

This document details the architectural specification for the unified `GameLevel` class designed to consolidate and encapsulate all level-specific math generators, text assets, enemy status attributes, and level transition parameters in _Math Hero Squad!_.

---

## 1. Class Structure & Blueprint

The proposed `GameLevel` class acts as the single source of truth for each of the six operations/waves in the game. It encapsulates math engines, victory/failure copy, target profiles, and combat rules.

### Class Properties

| Property Name            | Type              | Description                                                                                       |
| :----------------------- | :---------------- | :------------------------------------------------------------------------------------------------ |
| `level`                  | `number`          | The level index (1 through 6).                                                                    |
| `name`                   | `string`          | The operational display name (e.g., `'Carry Addition'`).                                          |
| `puzzleGenerator`        | `Function`        | The math engine generator function.                                                               |
| `enemyType`              | `'bot' \| 'boss'` | Dictates which puppet/vector view to render (Glitch-Bot or Dr. Null).                             |
| `enemyName`              | `string`          | The boss/bot name (e.g., `'Glitch-Bot'` or `'Dr. Null'`).                                         |
| `damagePerCorrectAnswer` | `number`          | Damage dealt to the enemy on a correct answer (e.g., 25 for bots, 5 for boss).                    |
| `healOnWrong`            | `number`          | Percentage of health the enemy recovers upon player failure (e.g., 5 for Dr. Null, 0 for others). |
| `nextLevel`              | `number \| null`  | The level sequence index to proceed to (null for Level 6).                                        |

---

## 2. Core Class Implementation (`GameLevel.js`)

Below is the JavaScript specification for `src/utils/GameLevel.js`:

```javascript
import {
  generateSingleDigitAddition,
  generateLevel1Addition,
  generateLevel1Subtraction,
  generateLevel2Addition,
  generateLevel5Subtraction,
  generateLevel6Mixed,
} from "./MathEngine";
import Hero from "./Hero";

export default class GameLevel {
  constructor(config) {
    this.level = config.level;
    this.name = config.name;
    this.puzzleGenerator = config.puzzleGenerator;
    this.enemyType = config.enemyType;
    this.enemyName = config.enemyName;
    this.damagePerCorrectAnswer = config.damagePerCorrectAnswer;
    this.healOnWrong = config.healOnWrong || 0;
    this.nextLevel = config.nextLevel || null;
  }

  /**
   * Generates a new puzzle instance for this level.
   */
  generatePuzzle() {
    return this.puzzleGenerator();
  }

  /**
   * Resolves the active Hero instance for this level, taking into account mixed levels.
   *
   * @param {number} [puzzleSourceLevel] - The original level if within Level 6.
   * @returns {Hero}
   */
  getHero(puzzleSourceLevel) {
    return Hero.getHeroForLevel(this.level, puzzleSourceLevel);
  }

  /**
   * Constructs the success description shown to the user on completion.
   */
  getSuccessDescription() {
    if (this.level === 6) {
      return "Incredible! You defeated Dr. Null, shutdown the glitch network, and saved the city! You are a Math Hero Squad legend!";
    }
    return `Fantastic job! You solved the ${this.name.toLowerCase()} equations, defeated the Glitch-Bot, and protected the mainframe!`;
  }

  /**
   * Constructs the victory detail text including the prompt for the next level.
   *
   * @param {string} [nextLevelName]
   */
  getSuccessDetail(nextLevelName) {
    if (this.level === 6) {
      return "All math defense training levels complete! Math Hero Squad operations fully online.";
    }
    return `Level ${this.level} ${this.name} complete! Prepare for ${nextLevelName || ""}.`;
  }

  /**
   * Gets the subtitle shown on level failure.
   */
  getLossSubtitle() {
    return `${this.enemyName.toUpperCase()} BREACHED MAIN FRAME`;
  }

  /**
   * Gets the description shown on level failure.
   */
  getLossDescription() {
    return `${this.enemyName} advanced too close and corrupted our calculations!`;
  }

  // --- Static Registry ---

  static LEVEL1 = new GameLevel({
    level: 1,
    name: "Single Digit Addition",
    puzzleGenerator: generateSingleDigitAddition,
    enemyType: "bot",
    enemyName: "Glitch-Bot",
    damagePerCorrectAnswer: 25,
    nextLevel: 2,
  });

  static LEVEL2 = new GameLevel({
    level: 2,
    name: "Addition",
    puzzleGenerator: generateLevel1Addition,
    enemyType: "bot",
    enemyName: "Glitch-Bot",
    damagePerCorrectAnswer: 25,
    nextLevel: 3,
  });

  static LEVEL3 = new GameLevel({
    level: 3,
    name: "Subtraction",
    puzzleGenerator: generateLevel1Subtraction,
    enemyType: "bot",
    enemyName: "Glitch-Bot",
    damagePerCorrectAnswer: 25,
    nextLevel: 4,
  });

  static LEVEL4 = new GameLevel({
    level: 4,
    name: "Carry Addition",
    puzzleGenerator: generateLevel2Addition,
    enemyType: "bot",
    enemyName: "Glitch-Bot",
    damagePerCorrectAnswer: 25,
    nextLevel: 5,
  });

  static LEVEL5 = new GameLevel({
    level: 5,
    name: "Borrow Subtraction",
    puzzleGenerator: generateLevel5Subtraction,
    enemyType: "bot",
    enemyName: "Glitch-Bot",
    damagePerCorrectAnswer: 25,
    nextLevel: 6,
  });

  static LEVEL6 = new GameLevel({
    level: 6,
    name: "Mixed Mastery Boss Wave",
    puzzleGenerator: generateLevel6Mixed,
    enemyType: "boss",
    enemyName: "Dr. Null",
    damagePerCorrectAnswer: 5,
    healOnWrong: 5,
    nextLevel: null,
  });

  static registry = [
    GameLevel.LEVEL1,
    GameLevel.LEVEL2,
    GameLevel.LEVEL3,
    GameLevel.LEVEL4,
    GameLevel.LEVEL5,
    GameLevel.LEVEL6,
  ];

  /**
   * Retrieves a GameLevel configuration by level index.
   *
   * @param {number} levelVal
   * @returns {GameLevel}
   */
  static getLevel(levelVal) {
    return (
      GameLevel.registry.find((gl) => gl.level === levelVal) || GameLevel.LEVEL1
    );
  }
}
```
