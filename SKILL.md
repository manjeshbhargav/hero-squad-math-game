# Technical Specification & Architectural Blueprint

## 1. Technical Stack Constraints

- **Framework Architecture:** Built entirely as a self-contained, client-side React single-page interface layout.
- **Styling Engine:** Tailwind CSS handles all spacing, positioning, and component properties. Custom inline constraints or design parameters must enforce a strict `2px` element corner rule (`rounded-[2px]`).
- **Skeletal 2D Animation Method:** Characters must be built using inline SVG elements broken into grouped structural layers (`<g>` tags for head, torso, left arm, right arm, legs). Animation states are driven purely by toggling CSS classes that apply standard CSS keyframe transformations (e.g., `transform-origin` combined with `rotate()` or `translateY()`). No external visual graphic libraries, heavy 2D engines, Canvas contexts, or WebGL layers are permitted. All root SVG puppets must enforce `overflow: visible` to prevent vertical or horizontal clipping of body parts (like Titan's head during leaping animations) when moving beyond the default `viewBox` coordinates.
- **Feature Flagging:** Deterministic data generation only. The system must operate independently of external API responses, mock generation models, or AI completion layers.
- **Version Control Constraints:** All staging, committing, and repository-tracking operations are managed manually by human operators. Automations and agents must not run git commit commands.
- **Responsive Design Architecture:** All user interfaces must adhere to a strict mobile-first design pattern. Spacing, padding, and layout rules must target compact mobile displays as the default, applying responsive breakpoints (`md:`, `lg:`) only to expand layouts. Global viewport clipping (`overflow-hidden`) must be disabled on mobile devices to allow natural vertical scrolling, preventing double scrollbars or truncated content.
- **Service Worker Cache Invalidation:** Whenever any application changes are made (e.g. logic updates, styling modifications, or asset updates), the Service Worker cache version variable (`CACHE_NAME`) in `public/sw.js` must be incremented. This ensures that browsers invalidate old cached network shells, preventing visual discrepancies or stale application logic from being served.

## 2. Core State Structure Blueprint

The application's runtime structure must manage level progression, user scores, character states, and equation contexts synchronously. For encapsulation and clean architecture details, all hero data and combat timing structures are centralized in the [Hero Class](./HERO.md):

- **Progression Tracking:** Tracks the current tier level integer (1 through 5) and maps it dynamically to the corresponding active `Hero` model instance (`Hero.getHeroForLevel(level)`).
- **Combat & Score Metrics:**
  - `enemyHealth`: Tracks enemy structural integrity variables (0-100).
  - `enemyProgress`: Tracks enemy horizontal advancement percentage (0-100) towards the checkered finish line.
  - `score`: Tracks the user's score based on math answers (non-negative).
- **Active Puzzle Objects:** Stores numerical pairs (`numA`, `numB`), operational flags (`'addition'` or `'subtraction'`), standard evaluation truths (`correctAnswer`), and a flat integer array containing four shuffled multi-choice answers.
- **Animation State String:** Switches systematically across structural identifiers (`'idle'`, `'attacking'`, `'enemyAdvancing'`) to apply or remove active CSS classes.

## 3. Math Engine Architecture & Constraints

All algorithmic functions must reside in a stateless utility module (`MathEngine.js`). Generation routines require strict upper and lower limits to mathematically guarantee specific errors and operational contexts:

### Single Digit Addition (Level 1)

- **Range Rule:** Generate single digit addition equations.
  - `numA`: Random integer between 1 and 9.
  - `numB`: Random integer between 1 and 9.

### Basic Non-Carry Addition (Level 2)

- **Ones Place Rule:** Ensure the combined sum of the ones place values is less than 10.
  - `onesA`: Random integer between 0 and 8.
  - `onesB`: Bounded randomly between 0 and `(9 - onesA)`.
- **Tens Place Rule:** Ensure the combined sum of the tens place values is less than 9.
  - `tensA`: Random integer between 1 and 7.
  - `tensB`: Bounded randomly between 1 and `(8 - tensA)`.

### Basic Non-Borrow Subtraction (Level 3)

- **Ones Place Rule:** Ensure the top digit is greater than or equal to the bottom digit.
  - `onesA`: Random integer between 0 and 9.
  - `onesB`: Bounded randomly between 0 and `onesA`.
- **Tens Place Rule:** Ensure a positive integer result.
  - `tensA`: Random integer between 2 and 9.
  - `tensB`: Bounded randomly between 1 and `(tensA - 1)`.

### Forced Carry Addition (Level 4)

- **Ones Place Rule:** Force the values to cross the base-10 threshold.
  - `onesA`: Random integer between 1 and 9.
  - `onesB`: Bounded randomly between `(10 - onesA)` and 9.
- **Tens Place Rule:** Keeps final value beneath three digits.
  - `tensA`: Random integer between 1 and 4.
  - `tensB`: Random integer between 1 and 3.

### Forced Borrow Subtraction (Level 5)

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

- **Scope:** Implement the game landing page, loading sequence, and background audio.
- **Key Elements:**
  - **Loading Overlay Modal:** Fullscreen boot sequence modal on initial launch with a 5-second progress bar (0% to 100%) and rotating system check logs. Activates the "Deploy Hero Squad" button at 100% to dismiss the overlay.
  - **Preloaded Background Audio:** Looping `intro.mp3` theme music preloaded at the module level. Playback begins once the loading overlay start button is clicked (resolving autoplay consent blocks) and pauses when the component unmounts.
  - Game title and thematic layout (industrial zone styling, 2px rounded corners).
  - Gameplay summary introducing the mission to defeat Dr. Null and his Glitch-Bots.
  - Character introductions (Hero Squad and Dr. Null):
    - **Dash:** No hair, yellow cowl mask with blue F-shaped ear wings (eyes and mouth uncovered), blue speed suit with gold protective armor pads, chest emblem, a yellow belt covering the entire waist with a lightning logo on the buckle, and triangular feet attached at their shortest edge and stretched outwards.
    - **Titan:** Metallic combat helmet with red trim, a glowing red visor, and a mouth grill guard, wearing heavy red/silver plate armor, with triangular feet attached at their shortest edge and stretched outwards.
    - **Aero:** Brown spiky hair, green/white flight suit with multi-blade silver wings, and white triangular feet attached at their shortest edge and stretched outwards.
    - **Dr. Null:** Mad scientist coordinating robotic attacks.
  - Interactive "Start Playing" button.
- **Testing Criterion:** Verify loading overlay progress timing (5 seconds), status text transitions, deployment button activation, autoplay audio bypass on click, audio muting/unmuting on stage navigation, page layout, dossier carousel responsiveness, and Start button transition.

### Phase 2: Level 1 - Single Digit Addition

- **Scope:** Implement ONLY the Level 1 Addition mechanics.
- **Key Elements:**
  - Active Hero: **Dash** (remains in place at `left-[5%]` firing a Volt Strike yellow lightning bolt directly into the target Glitch-Bot).
  - Math Engine: Generate addition problems matching the Single Digit Addition rules.
  - UI:
    - Display mathematical equation on the Glitch-Bot's chest panel (widened container to `w-36` to fit equations clearly).
    - Four multi-choice option buttons.
    - Thick chessboard-patterned finish line (width 24px, no red borders) at `22%` progress.
    - Health Bar prepended by a briefcase icon with a "+" inside it. The health bar and briefcase icon color dynamically transition from green (full) to red (empty) using an interpolated HSL value.
    - Score counter (no robots defeated count).
  - Combat & Progression:
    - Continuous Creep: Glitch-Bot slowly and continuously walks towards the finish line (1% progress every 450ms).
    - Correct answer: Dash plays the volt strike sound effect (`dash-volt-strike.mp3`) and executes Volt Strike, and after a `150ms` visual delay, the Glitch-Bot flashes, loses 25% health, and is pushed back to the right by `10%` progress. Score increases by `+10` points immediately.
    - Incorrect answer: Plays the incorrect answer sound effect (`wrong-answer.mp3`), Glitch-Bot instantly advances by `15%` progress, and score decreases by `-5` points (clamped to 0).
    - Equation changes immediately on both correct and incorrect selections.
    - Victory: Reduce Glitch-Bot's health to 0% (4 correct answers) before it crosses the finish line.
    - Game Over: Glitch-Bot reaches 100% progress and crosses the finish line, playing the level failed sound effect (`level-failed.mp3`).
    - Modals: Level Mastered (plays victory sound effect `level-mastered.mp3`) and Game Over (plays defeat sound effect `level-failed.mp3`) screens display the final score.
- **Testing Criterion:** Verify single digit addition math logic, Dash attack visuals, Volt Strike sound effect playback, incorrect answer sound effect playback, level mastery sound effect playback, level failure sound effect playback, choice generation, score adjustments (+10/-5), pushback mechanics (-10% progress), health bar and briefcase icon color transitions (green to red), and modal score displays.

### Phase 3: Level 2 - Basic Non-Carry Addition

- **Scope:** Implement ONLY the Level 2 Addition mechanics.
- **Key Elements:**
  - Active Hero: **Dash** (Volt Strike yellow lightning bolt).
  - Math Engine: Generate addition problems matching the Basic Non-Carry Addition rules.
  - UI: Same as Level 1.
  - Combat & Progression: Same as Level 1.
  - Progression: Transition to Level 2 when Level 1 is won.
- **Testing Criterion:** Verify addition math logic (no carrying), Dash attack visuals, Volt Strike sound effect playback, choice generation, score adjustments (+10/-5), pushback mechanics (-10% progress), health bar and briefcase icon color transitions (green to red), and modal score displays.

### Phase 4: Level 3 - Basic Non-Borrow Subtraction

- **Scope:** Implement ONLY the Level 3 Subtraction mechanics.
- **Key Elements:**
  - Active Hero: **Titan** (Quake Smash attack animation, triggering `titan-shock-wave.mp3` sound effect on jump).
  - Math Engine: Generate subtraction equations matching the Basic Non-Borrow Subtraction rules.
  - UI: Keep identical layout, but equations switch to subtraction (`-`). The health bar's briefcase recovery icon continues to display a "+" logo unconditionally in all levels.
  - Combat & Progression:
    - Plays the incorrect answer sound effect (`wrong-answer.mp3`) on incorrect selection and plays the Quake Smash sound effect (`titan-shock-wave.mp3`) when Titan jumps.
    - Screen Shake & Pushback Sync: Screen shake is delayed by `500ms` to match Titan's landing. Glitch-Bot damage, damage-flash, and `10%` pushback are delayed by `800ms` to match the concentric shockwave rings' impact.
    - Distractors: Incorporate Positional Displacement Error options.
  - Progression: Transition to Level 3 when Level 2 is won.
- **Testing Criterion:** Verify subtraction equations never require borrowing, check Positional Displacement distractor calculations, verify incorrect answer sound effect plays on error, verify Titan shockwave sound effect plays on jump, and verify combat feedback.

### Phase 5: Level 4 - Forced Carry Addition

- **Scope:** Implement ONLY Level 4 mechanics.
- **Key Elements:**
  - Active Hero: **Aero** (Cyclone Blast attack animation: rapidly spinning on his legs, launching a wavy inverted-triangle-shaped tornado that is vertically centered in the combat arena).
  - Math Engine: Generate addition equations that strictly force a carry into the tens place.
  - Distractors: Incorporate the Carry Bug option (`correctAnswer - 10`).
  - Combat & Progression: Plays the incorrect answer sound effect (`wrong-answer.mp3`) on incorrect selection and plays the Cyclone Blast sound effect (`aero-whirlwind.mp3`) when Aero launches a whirlwind.
  - Progression: Transition to Level 4 when Level 3 is won.
- **Testing Criterion:** Verify all equations force a carry, Aero's spinning on his legs and wavy tornado travel function properly, verify incorrect answer sound effect plays on error, verify Aero's whirlwind sound effect (`aero-whirlwind.mp3`) plays on attack, and the Carry Bug distractor triggers correctly.

### Phase 6: Level 5 - Forced Borrow Subtraction

- **Scope:** Implement ONLY Level 5 mechanics.
- **Key Elements:**
  - Active Hero: **Aero** (Cyclone Blast attack animation: spinning green atmospheric vortex).
  - Math Engine: Generate subtraction equations that strictly force a borrow from the tens column.
  - Combat & Progression: Plays the incorrect answer sound effect (`wrong-answer.mp3`) on incorrect selection and plays the Cyclone Blast sound effect (`aero-whirlwind.mp3`) when Aero launches a whirlwind.
  - Progression: Transition to Level 5 when Level 4 is won.
- **Testing Criterion:** Verify all subtraction equations force a borrow, Aero's cyclone vortex animation behaves correctly, verify incorrect answer sound effect plays on error, and progression transitions properly.

### Phase 7: Level 6 - Mixed Mastery Boss Wave

- **Scope:** Implement ONLY Level 6 mechanics.
- **Key Elements:**
  - **Combat Opponent:** Dr. Null wearing a retro CRT computer monitor casing displaying the math equation. The gamepad controller he holds is removed, and his arms are moved to his sides to leave the screen completely unobstructed.
  - **Math Engine:** Generate randomized equations chosen from Levels 1-5, retaining a reference to their source level.
  - **Active Hero:** Dynamically swaps the active hero between Dash, Titan, and Aero depending on the problem's source level (Dash for levels 1-2, Titan for level 3, Aero for levels 4-5). Attacks and sound effects must match the active hero's mechanics.
  - **Boss Health & Healing:** Dr. Null starts at 100% health. Correct answers deal 5% damage (requires 20 net correct answers). Incorrect answers heal him by 5% (capped at 100% health) and advance him by 15% progress.
  - **Progression:** Transition to Level 6 from Level 5's victory screen. Level 6 victory concludes all training levels.
- **Testing Criterion:** Verify random selection of problems and active heroes, check CRT display rendering on Dr. Null's chest, verify 5% correct answer damage and 5% incorrect answer heal (capped at 100%), and verify victory and reset states.
