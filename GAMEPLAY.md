# Math Hero Squad! - Gameplay Design Document

## 1. Core Visuals & Appearance

- **Viewport & Framing:** The game utilizes a fixed, zoomed-out viewport layout. This design guarantees that all action elements—the active hero, the advancing enemy, and the associated combat animations—remain completely visible, centered, and properly framed at all times.
- **Aesthetic Styling:** All user interface components (including option buttons, dialogue containers, and progress indicators) strictly enforce a sleek, modern look featuring a precise `2px` border radius.
- **Health Bar Icon:** The health bar of the Glitch-Bot is prepended by a health recovery/first-aid style briefcase icon. This briefcase icon unconditionally displays a "+" logo in all levels (including subtraction stages) to maintain its health/medical thematic appearance.
- **Art Direction & Background:** The setting is an empty, high-tech industrial zone. To keep visual clutter to a minimum and focus purely on the gameplay, the background environment contains no human bystanders or background elements like blimps.
- **Finish Line:** A thick chessboard-patterned finish line (`.checkered-finish-line`) is positioned close to the hero at `22%` progress, featuring a straight alternating grid of dark and light squares with no red borders. The Glitch-Bot must be defeated before it crosses this line.
- **Loading Overlay Modal:** On initial launch, a fullscreen boot sequence overlay modal hides the main landing page, running a 5-second progress bar (0% to 100%) accompanied by system status checkpoints. Upon completion, the "Deploy Hero Squad" button is enabled to reveal the landing page.
- **Intro Audio:** A looping theme song (`intro.mp3`) is preloaded and initiated on entering the landing page (using the loading screen start button click as the user interaction fallback). It is clean-paused when transitioning away from the landing page.

## 2. Characters & Cast (Animated 2D Vector Puppets)

All characters are fully realized 2D human-stylized vector sprites, dynamically animated using skeletal limb rotations to feel alive even when idle (Reference character collage: `./src/assets/character-reference.png`).

- **Dash (The Speedster):** A speedster hero wearing a yellow cowl mask with blue F-shaped ear wings (eyes and mouth uncovered, determined smile). He has no hair. He wears a blue speed suit with gold shoulder/knee/elbow pads, gold wrist gloves, a chest emblem containing a yellow lightning bolt inside a gold circle, and a yellow belt covering his entire waist with a circular buckle containing a blue lightning logo. His feet are represented by triangular shapes attached at their shortest edge to the outer tips of his legs and stretched outwards. During idle, he bounces in a running stance. He is the active hero for **Level 1 Single Digit Addition** and **Level 2 Basic Non-Carry Addition**.
- **Titan (The Heavy Brawler):** A heavy-metal brawler hero wearing a metallic combat helmet with red trim, a glowing red visor, and a mouth grill guard. He wears heavy red-and-silver tactical armor with large silver pauldrons, silver chest plate, belt with a square buckle, and silver heavy boots. His feet are represented by triangular shapes attached at their shortest edge to the outer tips of his legs and stretched outwards. He stands in a solid, grounded stance. He is the active hero for **Level 3 Basic Non-Borrow Subtraction**.
- **Aero (The Tactical Flyer):** A flying human hero with swept-back brown spiky hair. He wears a green-and-white flight suit with a wing-suit featuring detailed multi-blade silver metal wing segments. His feet are represented by white triangular shapes attached at their shortest edge to the outer tips of his legs and stretched outwards. He hovers and flaps wings rapidly. He is the active hero for **Level 4 Forced Carry Addition** and **Level 5 Forced Borrow Subtraction** (Phase 6).
- **Dr. Null (The Villain):** A mad scientist coordinating robotic attacks from his command center out of frame.
- **The Glitch-Bots (The Minions):** Mechanical, blocky robotic targets sent by Dr. Null. They feature a cylindrical neck, dome-shaped head with glowing red eyes, grill mouth, and a dark CRT computer monitor casing on their chest showing the math problem. At under 50% health, their outer armor plates slide apart to reveal a humorous red polka-dot interior frame.

## 3. Weapons, Combat & Visual Effects

- **Dash’s Volt Strike:** Dash fires a Volt Strike lightning bolt straight from his hand to hit the Glitch-Bot. Dash stays in place at his position (`left-[5%]`) while firing, and the lightning bolt is styled as a detailed yellow jagged bolt with a bright white core that dynamically extends to target the Glitch-Bot's chest center. Firing the volt strike triggers the electric sound effect (`dash-volt-strike.mp3`).
- **Titan’s Quake Smash:** Titan leaps upward, raises his vector arms, and strikes the floor, triggering a heavy visual shake effect across the entire gameplay screen alongside concentric shockwave rings that originate under his legs and radiate outwards to hit the Glitch-Bot. Initiating the jump plays the Quake Smash sound effect (`titan-shock-wave.mp3`).
- **Aero’s Cyclone Blast:** Aero spins rapidly on his legs, creating a wavy inverted-triangle-shaped tornado that is vertically centered in the combat arena and quickly sways vertically in a wave path while traveling horizontally to strike the Glitch-Bot. Firing the cyclone blast triggers the whirlwind sound effect (`aero-whirlwind.mp3`).
- **Creeping Mechanics:** Glitch-Bots walk slowly and continuously toward the finish line (advancing 1% progress every 450ms). Questions change immediately on both correct and incorrect answers.
- **Glitch-Bot Pushback & Impact Timing:** When the player answers correctly, the pushback (-10% progress), damage deduction (-25% health), and damage-flash animation on the Glitch-Bot are carefully synchronized to trigger on visual impact:
  * **Volt Strike (Addition):** Features a minor `150ms` delay to match the lightning bolt's travel time to the robot.
  * **Quake Smash (Subtraction):** Features a `500ms` delayed screen-shake on floor impact, followed by a delayed pushback and damage trigger at `800ms` when the expanding concentric shockwave rings collide with the robot.
  * **Cyclone Blast (Carry Addition):** Features a `800ms` delayed screen-shake on wind arrival, followed by a delayed pushback and damage trigger at `850ms` when the wavy vector tornado collides with the robot.

## 4. Game Rules & Scoring Logic

The game progresses based on the player's ability to defeat the Glitch-Bot before it breaches defense lines.

### Scoring & Performance Rules

- **Right Answer:** Adds `+10` points to the score immediately, and inflicts 25% damage and 10% pushback on the Glitch-Bot synchronized to trigger on visual impact (150ms for Volt Strike, 800ms for Quake Smash).
- **Wrong Answer:** Subtracts `-5` points from the score (clamped to a minimum of 0), immediately plays the incorrect answer sound effect (`wrong-answer.mp3`), and penalizes the player by advancing the Glitch-Bot forward by `15%` progress.
- **Defeat / Defeated Count:** The cumulative defeated robots count has been completely removed to focus purely on active session survival scoring.
- **Victory Condition:** The player wins/masters the level by reducing the Glitch-Bot's health from 100% to 0% (requiring 4 correct answers), which immediately displays the Mastery modal and plays the level mastery sound effect (`level-mastered.mp3`).
- **Defeated Condition (Game Over):** If the Glitch-Bot reaches `100%` progress and crosses the checkered finish line, the defense is breached, resulting in a Game Over. This displays the Defense Breached overlay and plays the level failure sound effect (`level-failed.mp3`).
- **Completion Modals:** Both the Level Mastered (Victory) and Defense Breached (Game Over) overlay screens display the final score.
