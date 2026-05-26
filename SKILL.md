# Technical Specification & Architectural Blueprint

## 1. Technical Stack Constraints

- **Framework Architecture:** Built entirely as a self-contained, client-side React single-page interface layout.
- **Styling Engine:** Tailwind CSS handles all spacing, positioning, and component properties. Custom inline constraints or design parameters must enforce a strict `2px` element corner rule (`rounded-[2px]`).
- **Skeletal 2D Animation Method:** Characters must be built using inline SVG elements broken into grouped structural layers (`<g>` tags for head, torso, left arm, right arm, legs). Animation states are driven purely by toggling CSS classes that apply standard CSS keyframe transformations (e.g., `transform-origin` combined with `rotate()` or `translateY()`). No external visual graphic libraries, heavy 2D engines, Canvas contexts, or WebGL layers are permitted.
- **Feature Flagging:** Deterministic data generation only. The system must operate independently of external API responses, mock generation models, or AI completion layers.
- **Version Control Constraints:** All staging, committing, and repository-tracking operations are managed manually by human operators. Automations and agents must not run git commit commands.
- **Responsive Design Architecture:** All user interfaces must adhere to a strict mobile-first design pattern. Spacing, padding, and layout rules must target compact mobile displays as the default, applying responsive breakpoints (`md:`, `lg:`) only to expand layouts. Global viewport clipping (`overflow-hidden`) must be disabled on mobile devices to allow natural vertical scrolling, preventing double scrollbars or truncated content.

## 2. Core State Structure Blueprint

The application's runtime structure must manage level progression, user scores, character states, and equation contexts synchronously:

- **Progression Tracking:** Tracks the current tier level integer (1 through 4) and handles changing hero visibility strings (`'Dash'`, `'Titan'`, `'Aero'`).
- **Combat & Score Metrics:** 
  - `enemyHealth`: Tracks enemy structural integrity variables (0-100).
  - `enemyProgress`: Tracks enemy horizontal advancement percentage (0-100) towards the checkered finish line.
  - `score`: Tracks the user's score based on math answers (non-negative).
- **Active Puzzle Objects:** Stores numerical pairs (`numA`, `numB`), operational flags (`'addition'` or `'subtraction'`), standard evaluation truths (`correctAnswer`), and a flat integer array containing four shuffled multi-choice answers.
- **Animation State String:** Switches systematically across structural identifiers (`'idle'`, `'attacking'`, `'enemyAdvancing'`) to apply or remove active CSS classes.

## 3. Math Engine Architecture & Constraints

All algorithmic functions must reside in a stateless utility module (`MathEngine.js`). Generation routines require strict upper and lower limits to mathematically guarantee specific errors and operational contexts:

### Basic Non-Carry Addition (Level 1)

- **Ones Place Rule:** Ensure the combined sum of the ones place values is less than 10.
  - `onesA`: Random integer between 0 and 8.
  - `onesB`: Bounded randomly between 0 and `(9 - onesA)`.
- **Tens Place Rule:** Ensure the combined sum of the tens place values is less than 9.
  - `tensA`: Random integer between 1 and 7.
  - `tensB`: Bounded randomly between 1 and `(8 - tensA)`.

### Basic Non-Borrow Subtraction (Level 1)

- **Ones Place Rule:** Ensure the top digit is greater than or equal to the bottom digit.
  - `onesA`: Random integer between 0 and 9.
  - `onesB`: Bounded randomly between 0 and `onesA`.
- **Tens Place Rule:** Ensure a positive integer result.
  - `tensA`: Random integer between 2 and 9.
  - `tensB`: Bounded randomly between 1 and `(tensA - 1)`.

### Forced Carry Addition (Level 2)

- **Ones Place Rule:** Force the values to cross the base-10 threshold.
  - `onesA`: Random integer between 1 and 9.
  - `onesB`: Bounded randomly between `(10 - onesA)` and 9.
- **Tens Place Rule:** Keeps final value beneath three digits.
  - `tensA`: Random integer between 1 and 4.
  - `tensB`: Random integer between 1 and 3.

### Forced Borrow Subtraction (Level 3)

- **Ones Place Rule:** The top column digit must be strictly smaller than the bottom column digit.
  - `onesA`: Random integer between 0 and 8.
  - `onesB`: Bounded randomly between `(onesA + 1)` and 9.
- **Tens Place Rule:** Avoid zero values in the tens column and maintain positive results.
  - `tensA`: Random integer between 2 and 9.
  - `tensB`: Bounded randomly between 1 and `(tensA - 1)`.

## 4. Intelligent Multi-Choice Distractor Generators

The multi-choice logic must generate targeted distractors based on common learning mistakes rather than raw random variance:

- **The Carry Bug Option:** Explicitly yields `correctAnswer - 10` to trap users who forget to carry the regrouped ten.
- **The Positional Displacement Error:** Yields `((tensA - tensB) * 10) + Math.abs(onesA - onesB)` during subtraction intervals. This directly catches users who subtract the smaller number from the larger number blindly, ignoring column direction.
- **Operational Flip Distractors:** Automatically pushes a completely swapped solution (such as calculating `numA + numB` during a subtraction round) to flag operational confusion.
- **Collision Prevention Rule:** All generated distractors must run through unique value checking (such as a JavaScript `Set`) to ensure no duplicate choices are ever mapped to the user interface panel. Shuffling must be executed via randomized indexing arrays.

## 5. Phased Development Roadmap

To facilitate iterative verification and human testing, development is structured into distinct, sequential phases. Each phase must be fully functional and testable before proceeding to the next.

### Phase 1: Landing Page & Onboarding

- **Scope:** Implement ONLY the game landing page.
- **Key Elements:**
  - Game title and thematic layout (industrial zone styling, 2px rounded corners).
  - Gameplay summary introducing the mission to defeat Dr. Null and his Glitch-Bots.
  - Character introductions (Hero Squad and Dr. Null):
    - **Dash:** No hair, yellow cowl mask with blue F-shaped ear wings (eyes and mouth uncovered), blue speed suit with gold protective armor pads, chest emblem, a yellow belt covering the entire waist with a lightning logo on the buckle, and triangular feet attached at their shortest edge and stretched outwards.
    - **Titan:** Metallic combat helmet with red trim, a glowing red visor, and a mouth grill guard, wearing heavy red/silver plate armor, with triangular feet attached at their shortest edge and stretched outwards.
    - **Aero:** Brown spiky hair, green/white flight suit with multi-blade silver wings, and white triangular feet attached at their shortest edge and stretched outwards.
    - **Dr. Null:** Mad scientist coordinating robotic attacks.
  - Interactive "Start Playing" button.
- **Testing Criterion:** Verify page layout, aesthetics, responsive sizing, and that clicking the start button transitions out of the landing page.

### Phase 2: Level 1 - Basic Non-Carry Addition

- **Scope:** Implement ONLY the Level 1 Addition mechanics.
- **Key Elements:**
  - Active Hero: **Dash** (remains in place at `left-[5%]` firing a Volt Strike yellow lightning bolt directly into the target Glitch-Bot).
  - Math Engine: Generate addition problems matching the Basic Non-Carry Addition rules.
  - UI: 
    - Display mathematical equation on the Glitch-Bot's chest panel (widened container to `w-36` to fit equations clearly).
    - Four multi-choice option buttons.
    - Thick chessboard-patterned finish line (width 24px, no red borders) at `22%` progress.
    - Health Bar prepended by a briefcase icon with a "+" inside it. The health bar and briefcase icon color dynamically transition from green (full) to red (empty) using an interpolated HSL value.
    - Score counter (no robots defeated count).
  - Combat & Progression:
    - Continuous Creep: Glitch-Bot slowly and continuously walks towards the finish line (1% progress every 450ms).
    - Correct answer: Dash executes Volt Strike, Glitch-Bot loses 25% health, and is pushed back to the right by `10%` progress. Score increases by `+10` points.
    - Incorrect answer: Glitch-Bot instantly advances by `15%` progress, and score decreases by `-5` points (clamped to 0).
    - Equation changes immediately on both correct and incorrect selections.
    - Victory: Reduce Glitch-Bot's health to 0% (4 correct answers) before it crosses the finish line.
    - Game Over: Glitch-Bot reaches 100% progress and crosses the finish line.
    - Modals: Level Mastered and Game Over screens display the final score.
- **Testing Criterion:** Verify addition math logic (no carrying), Dash attack visuals, choice generation, score adjustments (+10/-5), pushback mechanics (-10% progress), health bar and briefcase icon color transitions (green to red), and modal score displays.

### Phase 3: Level 1 - Basic Non-Borrow Subtraction

- **Scope:** Implement ONLY the Level 1 Subtraction mechanics.
- **Key Elements:**
  - Active Hero: **Dash** (Volt Strike attack animation).
  - Math Engine: Generate subtraction equations matching the Basic Non-Borrow Subtraction rules.
  - UI: Keep identical layout, but equations switch to subtraction (`-`).
  - Combat & Progression:
    - Distractors: Incorporate Positional Displacement Error options.
- **Testing Criterion:** Verify subtraction equations never require borrowing, check Positional Displacement distractor calculations, and verify combat feedback.

### Phase 4: Level 2 - Forced Carry Addition

- **Scope:** Implement ONLY Level 2 mechanics.
- **Key Elements:**
  - Active Hero: **Titan** (Quake Smash attack animation: leap, floor smash, kinetic shockwave, and full-screen shake).
  - Math Engine: Generate addition equations that strictly force a carry into the tens place.
  - Distractors: Incorporate the Carry Bug option (`correctAnswer - 10`).
  - Progression: Transition to Level 2 when Level 1 is won.
- **Testing Criterion:** Verify all equations force a carry, Titan's screen-shake and shockwave animations function properly, and the Carry Bug distractor triggers correctly.

### Phase 5: Level 3 - Forced Borrow Subtraction

- **Scope:** Implement ONLY Level 3 mechanics.
- **Key Elements:**
  - Active Hero: **Aero** (Cyclone Blast attack animation: spinning green atmospheric vortex).
  - Math Engine: Generate subtraction equations that strictly force a borrow from the tens column.
  - Progression: Transition to Level 3 when Level 2 is won.
- **Testing Criterion:** Verify all subtraction equations force a borrow, Aero's cyclone vortex animation behaves correctly, and progression transitions properly.
