# Hero Class Specification

This document details the architectural specification for the unified `Hero` class designed to consolidate and encapsulate all hero-related data, asset mapping, timing sequences, and combat logic in _Math Hero Squad!_.

---

## 1. Class Structure & Blueprint

The proposed `Hero` class acts as the single source of truth for all heroes. It is instantiated once per hero type and registered in a static pool.

### Class Properties

| Property Name   | Type             | Description                                                                |
| :-------------- | :--------------- | :------------------------------------------------------------------------- |
| `id`            | `string`         | Unique identifier (e.g., `'dash'`, `'titan'`, `'aero'`).                   |
| `name`          | `string`         | Display name (e.g., `'Dash'`, `'Titan'`, `'Aero'`).                        |
| `role`          | `string`         | Hero's squad designation (e.g., `'The Speedster'`).                        |
| `description`   | `string`         | Profile description of the hero's capabilities.                            |
| `gear`          | `string`         | Suit and equipment info.                                                   |
| `weapon`        | `string`         | Description of the special strike.                                         |
| `icon`          | `ReactComponent` | The Lucide icon component used in the UI (e.g. `Zap`, `Wind`).             |
| `vector`        | `ReactComponent` | The 2D puppet component (e.g., `DashVector`, `TitanVector`, `AeroVector`). |
| `colorClass`    | `string`         | Tailwind CSS class for text coloring (e.g., `'text-yellow-400'`).          |
| `bgBorderClass` | `string`         | Tailwind border, hover, and shadow classes for carousel cards.             |
| `glowClass`     | `string`         | Custom CSS class for panel glowing effects.                                |
| `badge`         | `string`         | Level badge representation (e.g., `'Levels 1-2 Hero'`).                    |
| `audioPath`     | `string`         | Path to the hero's combat audio file.                                      |
| `audio`         | `Audio`          | Preloaded, cached HTML5 `Audio` instance for zero-latency combat feedback. |
| `shakeStart`    | `number`         | Delay in milliseconds before screen shake starts.                          |
| `shakeEnd`      | `number`         | Delay in milliseconds before screen shake ends.                            |
| `impact`        | `number`         | Delay in milliseconds when damage/pushback occurs on the robot.            |
| `duration`      | `number`         | Total combat animation cycle duration in milliseconds.                     |

---

## 2. Core Class Implementation (`Hero.js`)

Below is the JavaScript specification for `src/utils/Hero.js`:

```javascript
import React from "react";
import { Zap, ShieldAlert, Wind } from "lucide-react";
import DashVector from "../components/vectors/DashVector";
import TitanVector from "../components/vectors/TitanVector";
import AeroVector from "../components/vectors/AeroVector";

import voltStrikeAudio from "../assets/dash-volt-strike.mp3";
import titanShockWaveAudio from "../assets/titan-shock-wave.mp3";
import aeroWhirlwindAudio from "../assets/aero-whirlwind.mp3";

export default class Hero {
  constructor(config) {
    this.id = config.id;
    this.name = config.name;
    this.role = config.role;
    this.description = config.description;
    this.gear = config.gear;
    this.weapon = config.weapon;
    this.icon = config.icon;
    this.vector = config.vector;
    this.colorClass = config.colorClass;
    this.bgBorderClass = config.bgBorderClass;
    this.glowClass = config.glowClass;
    this.badge = config.badge;
    this.audioPath = config.audioPath;

    // Timing constraints
    this.shakeStart = config.shakeStart;
    this.shakeEnd = config.shakeEnd;
    this.impact = config.impact;
    this.duration = config.duration;

    // Cache preloaded audio
    this.audio = new Audio(this.audioPath);
    this.audio.preload = "auto";
  }

  /**
   * Play the hero's attack sound effect, rewinding to zero if already playing.
   */
  playAttackSound() {
    this.audio.currentTime = 0;
    this.audio
      .play()
      .catch((err) => console.warn("Audio playback error:", err));
  }

  /**
   * Orchestrates the multi-stage timed callbacks of a combat strike.
   *
   * @param {Object} callbacks
   * @param {Function} callbacks.onShakeStart - Callback when the screen shake begins.
   * @param {Function} callbacks.onShakeEnd - Callback when the screen shake concludes.
   * @param {Function} callbacks.onImpact - Callback when weapon hits the target (calculates damage & pushback).
   * @param {Function} callbacks.onComplete - Callback when the full attack sequence finishes (resets state).
   */
  triggerAttack({ onShakeStart, onShakeEnd, onImpact, onComplete }) {
    this.playAttackSound();

    // 1. Screen Shake Start
    if (this.shakeStart === 0) {
      onShakeStart();
    } else {
      setTimeout(onShakeStart, this.shakeStart);
    }

    // 2. Screen Shake End
    setTimeout(onShakeEnd, this.shakeEnd);

    // 3. Combat Impact (Damage & Pushback)
    setTimeout(onImpact, this.impact);

    // 4. Sequence Completion
    setTimeout(onComplete, this.duration);
  }

  // --- Static Registry ---

  static DASH = new Hero({
    id: "dash",
    name: "Dash",
    role: "The Speedster",
    description:
      "Uses lightning-fast speed to zaps Glitch-Bots with electricity!",
    gear: "Blue and yellow lightning suit.",
    weapon: "Volt Strike: Zaps yellow lightning straight across the screen.",
    icon: Zap,
    vector: DashVector,
    colorClass: "text-yellow-400",
    bgBorderClass:
      "border-yellow-500/40 hover:border-yellow-400 hover:shadow-[0_0_15px_rgba(234,179,8,0.4)]",
    glowClass: "glow-yellow",
    badge: "Levels 1-2 Hero",
    audioPath: voltStrikeAudio,
    shakeStart: 0,
    shakeEnd: 400,
    impact: 150,
    duration: 1000,
  });

  static TITAN = new Hero({
    id: "titan",
    name: "Titan",
    role: "The Heavy Brawler",
    description:
      "A super-strong hero who smashes Glitch-Bots with floor-shaking force during subtraction!",
    gear: "Red and silver armored suit.",
    weapon: "Quake Smash: Shakes the floor to push back robots.",
    icon: ShieldAlert,
    vector: TitanVector,
    colorClass: "text-red-500",
    bgBorderClass:
      "border-red-600/40 hover:border-red-500 hover:shadow-[0_0_15px_rgba(239,68,68,0.4)]",
    glowClass: "glow-red",
    badge: "Level 3 Hero",
    audioPath: titanShockWaveAudio,
    shakeStart: 500,
    shakeEnd: 900,
    impact: 800,
    duration: 1200,
  });

  static AERO = new Hero({
    id: "aero",
    name: "Aero",
    role: "The Tactical Flyer",
    description:
      "Flies high and uses green cyclone wind power to carry numbers when addition equations get heavy!",
    gear: "Green and white wing-suit.",
    weapon: "Cyclone Blast: Shoots a spinning green tornado at targets.",
    icon: Wind,
    vector: AeroVector,
    colorClass: "text-emerald-400",
    bgBorderClass:
      "border-emerald-500/40 hover:border-emerald-400 hover:shadow-[0_0_15px_rgba(52,211,153,0.4)]",
    glowClass: "glow-green",
    badge: "Levels 4-5 Hero",
    audioPath: aeroWhirlwindAudio,
    shakeStart: 800,
    shakeEnd: 1100,
    impact: 850,
    duration: 1250,
  });

  static registry = [Hero.DASH, Hero.TITAN, Hero.AERO];

  /**
   * Fetch all registered heroes.
   */
  static getAllHeroes() {
    return Hero.registry;
  }

  /**
   * Retrieve a hero instance by its ID.
   */
  static getHeroById(id) {
    return Hero.registry.find((h) => h.id === id) || Hero.DASH;
  }

  /**
   * Resolve which hero is active based on the level parameters.
   *
   * @param {number} level - The active level (1-6).
   * @param {number} [puzzleSourceLevel] - For Level 6, the level from which the equation originated.
   */
  static getHeroForLevel(level, puzzleSourceLevel) {
    const targetLevel = level === 6 ? puzzleSourceLevel || 1 : level;

    if (targetLevel === 1 || targetLevel === 2) {
      return Hero.DASH;
    }
    if (targetLevel === 3) {
      return Hero.TITAN;
    }
    return Hero.AERO;
  }
}
```
