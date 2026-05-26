# Technical Specification & Architectural Blueprint

## 1. Technical Stack Constraints

- **Framework Architecture:** Built entirely as a self-contained, client-side React single-page interface layout.
- **Styling Engine:** Tailwind CSS handles all spacing, positioning, and component properties. Custom inline constraints or design parameters must enforce a strict `2px` element corner rule (`rounded-[2px]`).
- **Rendering Methods:** Pure HTML5 Document Object Model (DOM) elements, manipulated via CSS Keyframe triggers. No external visual graphic libraries, heavy 2D engines, Canvas contexts, or WebGL layers are permitted.
- **Feature Flagging:** Deterministic data generation only. The system must operate independently of external API responses, mock generation models, or AI completion layers.
- **Version Control Constraints:** All staging, committing, and repository-tracking operations are managed manually by human operators. Automations and agents must not run git commit commands.
- **Responsive Design Architecture:** All user interfaces must adhere to a strict mobile-first design pattern. Spacing, padding, and layout rules must target compact mobile displays as the default, applying responsive breakpoints (`md:`, `lg:`) only to expand layouts. Global viewport clipping (`overflow-hidden`) must be disabled on mobile devices to allow natural vertical scrolling, preventing double scrollbars or truncated content.

## 2. Core State Structure Blueprint

The application's runtime structure must manage level progression, input performance tracking, character states, and equation contexts synchronously:

- **Progression Tracking:** Tracks the current tier level integer (1 through 4) and handles changing hero visibility strings (`'Dash'`, `'Titan'`, `'Aero'`).
- **Mastery Array:** An isolated, boolean array holding a maximum tracking history of 5 elements representing recent user answer evaluation statuses (`true` or `false`).
- **Combat Metrics:** Tracks enemy structural integrity variables (0-100) and absolute score numbers.
- **Active Puzzle Objects:** Stores numerical pairs (`numA`, `numB`), operational flags (`'addition'` or `'subtraction'`), standard evaluation truths (`correctAnswer`), and a flat integer array containing four shuffled multi-choice answers.
- **Animation State String:** Switches systematically across structural identifiers (`'idle'`, `'attacking'`, `'enemyAdvancing'`, `'victory'`) to apply or remove active CSS classes.

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
    - **Dash:** Blue/yellow attire, baseline operator.
    - **Titan:** Red/silver armor, heavy brawler.
    - **Aero:** Green/white gear, tactical flyer.
    - **Dr. Null:** Mad scientist coordinating robotic attacks from his out-of-frame command center.
  - Interactive "Start Playing" button.
- **Testing Criterion:** Verify page layout, aesthetics, responsive sizing, and that clicking the start button transitions out of the landing page or prompts next actions.

### Phase 2: Level 1 - Basic Non-Carry Addition
- **Scope:** Implement ONLY the Level 1 Addition mechanics.
- **Key Elements:**
  - Active Hero: **Dash** (Volt Strike attack animation).
  - Math Engine: Generate addition problems matching the Basic Non-Carry Addition rules (ones sum < 10, tens sum < 9).
  - UI: Display mathematical equation on the Glitch-Bot's chest panel, four multi-choice option buttons, and success history tracker.
  - Combat & Progression:
    - Correct answer: Dash executes Volt Strike (yellow lightning), Glitch-Bot loses health.
    - Incorrect answer: Glitch-Bot advances closer.
    - Track mastery history (last 5 attempts).
- **Testing Criterion:** Verify addition math logic (no carrying), Dash attack visuals, choice generation (including distractors like operational flips and unique option verification), and mastery progression tracking.

### Phase 3: Level 1 - Basic Non-Borrow Subtraction
- **Scope:** Implement ONLY the Level 1 Subtraction mechanics.
- **Key Elements:**
  - Active Hero: **Dash** (Volt Strike attack animation).
  - Math Engine: Generate subtraction equations matching the Basic Non-Borrow Subtraction rules (onesA >= onesB, tens place results in positive integer).
  - UI: Keep identical layout, but equations switch to subtraction (`-`).
  - Combat & Progression:
    - Distractors: Incorporate Positional Displacement Error options `((tensA - tensB) * 10) + Math.abs(onesA - onesB)`.
- **Testing Criterion:** Verify subtraction equations never require borrowing, check Positional Displacement distractor calculations, and verify combat feedback.

### Phase 4: Level 2 - Forced Carry Addition
- **Scope:** Implement ONLY Level 2 mechanics.
- **Key Elements:**
  - Active Hero: **Titan** (Quake Smash attack animation: leap, floor smash, kinetic shockwave, and full-screen shake).
  - Math Engine: Generate addition equations that strictly force a carry into the tens place.
  - Distractors: Incorporate the Carry Bug option (`correctAnswer - 10`).
  - Progression: Transition to Level 2 when Level 1 mastery (80% / 4 of last 5 correct) is reached.
- **Testing Criterion:** Verify all equations force a carry, Titan's screen-shake and shockwave animations function properly, and the Carry Bug distractor triggers correctly.

### Phase 5: Level 3 - Forced Borrow Subtraction
- **Scope:** Implement ONLY Level 3 mechanics.
- **Key Elements:**
  - Active Hero: **Aero** (Cyclone Blast attack animation: spinning green atmospheric vortex).
  - Math Engine: Generate subtraction equations that strictly force a borrow from the tens column.
  - Progression: Transition to Level 3 when Level 2 mastery is reached.
- **Testing Criterion:** Verify all subtraction equations force a borrow, Aero's cyclone vortex animation behaves correctly, and progression transitions properly.

