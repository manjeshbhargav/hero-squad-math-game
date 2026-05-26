# Math Hero Squad! - Gameplay Design Document

## 1. Core Visuals & Appearance

- **Viewport & Framing:** The game utilizes a fixed, zoomed-out viewport layout. This design guarantees that all action elements—the active hero, the advancing enemy, and the associated combat animations—remain completely visible, centered, and properly framed at all times.
- **Aesthetic Styling:** All user interface components (including option buttons, dialogue containers, and progress indicators) strictly enforce a sleek, modern look featuring a precise `2px` border radius.
- **Art Direction & Background:** The setting is an empty, high-tech industrial zone. To keep visual clutter to a minimum and focus purely on the gameplay, the background environment contains no human bystanders or background elements like blimps.
- **Finish Line:** A checkered red-bordered finish line (`.checkered-finish-line`) is positioned close to the hero at `22%` progress. The Glitch-Bot must be defeated before it crosses this line.

## 2. Characters & Cast (Animated 2D Vector Puppets)

All characters are fully realized 2D human-stylized vector sprites, dynamically animated using skeletal limb rotations to feel alive even when idle (Reference character collage: `./src/assets/character-reference.png`).

- **Dash (The Speedster):** A young human hero with spiky yellow hair and highlights, big blue eyes, and a determined smile. He wears a blue speed suit with gold shoulder/knee/elbow pads, gold wrist gloves, gold boots, and a chest emblem containing a yellow lightning bolt inside a gold circle. During idle, he bounces in a running stance.
- **Titan (The Heavy Brawler):** A muscular human hero with short spiky brown hair and an angry, determined face with gritted teeth. He wears heavy red-and-silver tactical armor with large silver pauldrons, silver chest plate, belt with square buckle, and silver heavy boots. He stands in a solid, grounded stance.
- **Aero (The Tactical Flyer):** A flying human hero with swept-back brown spiky hair. He wears a green-and-white flight suit with a wing-suit featuring detailed multi-blade silver metal wing segments. He hovers and flaps wings rapidly.
- **Dr. Null (The Villain):** A mad scientist coordinating robotic attacks from his command center out of frame.
- **The Glitch-Bots (The Minions):** Mechanical, blocky robotic targets sent by Dr. Null. They feature a cylindrical neck, dome-shaped head with glowing red eyes, grill mouth, and a dark CRT computer monitor casing on their chest showing the math problem. At under 50% health, their outer armor plates slide apart to reveal a humorous red polka-dot interior frame.

## 3. Weapons, Combat & Visual Effects

- **Dash’s Volt Strike:** Dash fires a Volt Strike lightning bolt straight from his hand to hit the Glitch-Bot. Dash stays in place at his position (`left-[5%]`) while firing, and the lightning bolt is styled as a detailed yellow jagged bolt with a bright white core that dynamically extends to target the Glitch-Bot's chest center.
- **Titan’s Quake Smash:** Titan leaps upward, raises his vector arms, and strikes the floor, triggering a heavy visual shake effect across the entire gameplay screen alongside a traveling kinetic shockwave.
- **Aero’s Cyclone Blast:** Aero spins forward in mid-air, creating a spinning green atmospheric vortex that continuously rotates as it travels horizontally toward the target.
- **Creeping Mechanics:** Glitch-Bots walk slowly and continuously toward the finish line (advancing 1% progress every 450ms). Questions change immediately on both correct and incorrect answers.
- **Glitch-Bot Pushback:** When the Glitch-Bot is hit by the hero's weapon (correct answer), it is pushed back by `10%` progress to the right.

## 4. Game Rules & Scoring Logic

The game progresses based on the player's ability to defeat the Glitch-Bot before it breaches defense lines.

### Scoring & Performance Rules

- **Right Answer:** Adds `+10` points to the score, inflicts 25% damage to the Glitch-Bot, and pushes the Glitch-Bot back by `10%` progress to the right.
- **Wrong Answer:** Subtracts `-5` points from the score (clamped to a minimum of 0), and immediately penalizes the player by advancing the Glitch-Bot forward by `15%` progress.
- **Defeat / Defeated Count:** The cumulative defeated robots count has been completely removed to focus purely on active session survival scoring.
- **Victory Condition:** The player wins/masters the level by reducing the Glitch-Bot's health from 100% to 0% (requiring 4 correct answers).
- **Defeated Condition (Game Over):** If the Glitch-Bot reaches `100%` progress and crosses the checkered finish line, the defense is breached, resulting in a Game Over.
- **Completion Modals:** Both the Level Mastered (Victory) and Defense Breached (Game Over) overlay screens display the final score.
