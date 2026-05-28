# Villain Class Specification

This document details the architectural specification for the unified `Villain` class designed to consolidate and encapsulate all villain-related data, asset mapping, and combat rendering attributes in _Math Hero Squad!_.

---

## 1. Class Structure & Blueprint

The proposed `Villain` class acts as the single source of truth for all enemies in the game. It is instantiated for each enemy type and registered in a static pool.

### Class Properties

| Property Name     | Type              | Description                                                        |
| :---------------- | :---------------- | :----------------------------------------------------------------- |
| `id`              | `string`          | Unique identifier (e.g., `'glitch_bot'`, `'dr_null'`).             |
| `name`            | `string`          | Display name (e.g., `'Glitch-Bot'`, `'Dr. Null'`).                 |
| `type`            | `'bot' \| 'boss'` | Designation of the enemy tier (e.g. `'boss'` for Dr. Null).        |
| `vectorComponent` | `ReactComponent`  | The 2D puppet component (e.g., `GlitchBotVector`, `DrNullVector`). |
| `maxHealth`       | `number`          | Maximum health capacity of this villain (defaults to 100).         |

---

## 2. Core Class Implementation (`Villain.js`)

Below is the JavaScript specification for `src/utils/Villain.js`:

```javascript
import React from "react";
import GlitchBotVector from "../components/vectors/GlitchBotVector";
import DrNullVector from "../components/vectors/DrNullVector";

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
    if (this.type === "boss") {
      return "idle";
    }
    return animationState === "idle" || animationState === "enemyAdvancing"
      ? "walk"
      : "idle";
  }

  // --- Static Registry ---

  static GLITCH_BOT = new Villain({
    id: "glitch_bot",
    name: "Glitch-Bot",
    type: "bot",
    vectorComponent: GlitchBotVector,
    maxHealth: 100,
  });

  static DR_NULL = new Villain({
    id: "dr_null",
    name: "Dr. Null",
    type: "boss",
    vectorComponent: DrNullVector,
    maxHealth: 100,
  });

  static registry = [Villain.GLITCH_BOT, Villain.DR_NULL];

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
```
