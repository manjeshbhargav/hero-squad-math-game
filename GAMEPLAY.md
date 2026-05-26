# Math Hero Squad! - Gameplay Design Document

## 1. Core Visuals & Appearance

- **Viewport & Framing:** The game utilizes a fixed, zoomed-out viewport layout. This design guarantees that all action elements—the active hero, the advancing enemy, and the associated combat animations—remain completely visible, centered, and properly framed at all times.
- **Aesthetic Styling:** All user interface components (including option buttons, dialogue containers, and progress indicators) strictly enforce a sleek, modern look featuring a precise `2px` border radius.
- **Art Direction & Background:** The setting is an empty, high-tech industrial zone. To keep visual clutter to a minimum and focus purely on the gameplay, the background environment contains no human bystanders or background elements like blimps.

## 2. Characters & Cast

- **Dash (The Speedster):** A blue-and-yellow-clad hero utilizing lightning-fast speed. Dash is the squad's foundational baseline operator.
- **Titan (The Heavy Brawler):** A red-and-silver armored powerhouse who handles the heavy tactical lifting when mathematical equations require numbers to be carried over.
- **Aero (The Tactical Flyer):** A green-and-white high-tech aerial hero who executes precision strikes when operations require numbers to be borrowed.
- **Dr. Null (The Villain):** A mad scientist coordinating robotic attacks from his command center out of frame.
- **The Glitch-Bots (The Minions):** Mechanical, blocky robotic targets sent by Dr. Null. They carry a digital display panel on their chests showing the player's active mathematical problem. When defeated or heavily damaged, their armor plates break away to reveal a humorous polka-dot interior frame.

## 3. Weapons, Combat & Visual Effects

- **Dash’s Volt Strike:** Instantly triggers a jagged yellow lightning flash cutting horizontally across the screen from the hero directly into the Glitch-Bot.
- **Titan’s Quake Smash:** Titan leaps upward and strikes the floor, triggering a heavy visual shake effect across the entire gameplay screen alongside a traveling kinetic shockwave.
- **Aero’s Cyclone Blast:** A spinning green atmospheric vortex that continuously rotates as it travels horizontally toward the target.
- **Turn-Based Combat Rules:** The game environment is entirely turn-based to reduce pressure. Glitch-Bots do not advance on a continuous timer; they only march forward closer to the hero's side of the arena if the player selects an incorrect answer.

## 4. Game Rules & Mastery Logic

Progression is dictated strictly by demonstrating concept mastery, rather than cumulative points or time spent playing.

### The Mastery Criterion

To advance to a higher difficulty tier, the player must achieve an **80% success rate (4 correct answers out of the last 5 unique attempts)** within their current tier. The history window resets upon unlocking a new level.

### Level Progressions

- **Level 1: Base Operations (Active Hero: Dash)**
  - _Rules:_ Two-digit addition equations that require no carrying, and two-digit subtraction equations that require no borrowing. This gives the player an introduction to double-digit math without complex regrouping.
- **Level 2: Heavy Lifting (Active Hero: Titan)**
  - _Rules:_ Double-digit addition problems carefully bounded to strictly force a mathematical carry into the tens place.
- **Level 3: Precision Strikes (Active Hero: Aero)**
  - _Rules:_ Double-digit subtraction problems carefully bounded to strictly force a borrow from the tens column.
- **Level 4: Mixed Mastery Boss Wave (All Heroes)**
  - _Rules:_ The endless final mode. Equations alternate unpredictably between forced-carry addition and forced-borrow subtraction. The active hero on screen dynamically switches back and forth step-by-step to match the required skill (Titan for addition, Aero for subtraction).
