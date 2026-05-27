/**
 * MathEngine.js
 * Stateless utility module containing all math puzzle generators and distractor logics.
 */

/**
 * Shuffles an array using a randomized indexing array map.
 * @param {Array} array 
 * @returns {Array} Shuffled array
 */
const shuffleArray = (array) => {
  const indices = array.map((_, index) => index);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices.map(idx => array[idx]);
};

/**
 * Generates Level 1 Single Digit Addition equations:
 * - numA: Random integer between 1 and 9
 * - numB: Random integer between 1 and 9
 */
export const generateSingleDigitAddition = () => {
  const numA = Math.floor(Math.random() * 9) + 1;
  const numB = Math.floor(Math.random() * 9) + 1;
  const correctAnswer = numA + numB;

  return {
    numA,
    numB,
    operation: 'addition',
    correctAnswer,
    onesA: numA,
    onesB: numB,
    tensA: 0,
    tensB: 0
  };
};

/**
 * Generates Level 1 Basic Non-Carry Addition equations:
 * - Combined ones place digits sum < 10
 * - Combined tens place digits sum < 9
 */
export const generateLevel1Addition = () => {
  // onesA: Random integer between 0 and 8
  const onesA = Math.floor(Math.random() * 9);
  // onesB: Bounded randomly between 0 and (9 - onesA)
  const onesMaxB = 9 - onesA;
  const onesB = Math.floor(Math.random() * (onesMaxB + 1));

  // tensA: Random integer between 1 and 7
  const tensA = Math.floor(Math.random() * 7) + 1;
  // tensB: Bounded randomly between 1 and (8 - tensA)
  const tensMaxB = 8 - tensA;
  const tensB = Math.max(1, Math.floor(Math.random() * tensMaxB) + 1);

  const numA = tensA * 10 + onesA;
  const numB = tensB * 10 + onesB;
  const correctAnswer = numA + numB;

  return {
    numA,
    numB,
    operation: 'addition',
    correctAnswer,
    onesA,
    onesB,
    tensA,
    tensB
  };
};
/**
 * Generates Level 1 Basic Non-Borrow Subtraction equations:
 * - Combined ones place digits sum >= 0 (no borrow)
 * - Positive result in tens place
 */
export const generateLevel1Subtraction = () => {
  // onesA: Random integer between 0 and 9
  const onesA = Math.floor(Math.random() * 10);
  // onesB: Bounded randomly between 0 and onesA
  const onesB = Math.floor(Math.random() * (onesA + 1));

  // tensA: Random integer between 2 and 9
  const tensA = Math.floor(Math.random() * 8) + 2;
  // tensB: Bounded randomly between 1 and (tensA - 1)
  const tensB = Math.floor(Math.random() * (tensA - 1)) + 1;

  const numA = tensA * 10 + onesA;
  const numB = tensB * 10 + onesB;
  const correctAnswer = numA - numB;

  return {
    numA,
    numB,
    operation: 'subtraction',
    correctAnswer,
    onesA,
    onesB,
    tensA,
    tensB
  };
};

/**
 * Generates Level 2 Forced Carry Addition equations:
 * - Combined ones place digits sum >= 10 (forces carry)
 * - Combined tens place digits sum + carry < 10 (keeps final sum under 3 digits)
 */
export const generateLevel2Addition = () => {
  // onesA: Random integer between 1 and 9
  const onesA = Math.floor(Math.random() * 9) + 1;
  // onesB: Bounded randomly between (10 - onesA) and 9
  const minOnesB = 10 - onesA;
  const onesB = Math.floor(Math.random() * (10 - minOnesB)) + minOnesB;

  // tensA: Random integer between 1 and 4
  const tensA = Math.floor(Math.random() * 4) + 1;
  // tensB: Bounded randomly between 1 and 3
  const tensB = Math.floor(Math.random() * 3) + 1;

  const numA = tensA * 10 + onesA;
  const numB = tensB * 10 + onesB;
  const correctAnswer = numA + numB;

  return {
    numA,
    numB,
    operation: 'addition',
    correctAnswer,
    onesA,
    onesB,
    tensA,
    tensB
  };
};

/**
 * Generates Level 5 Forced Borrow Subtraction equations:
 * - Combined ones place digits require a borrow (onesA < onesB)
 * - Result in tens place is positive (tensA > tensB)
 */
export const generateLevel5Subtraction = () => {
  // onesA: Random integer between 0 and 8
  const onesA = Math.floor(Math.random() * 9);
  // onesB: Bounded randomly between (onesA + 1) and 9
  const minOnesB = onesA + 1;
  const onesB = Math.floor(Math.random() * (10 - minOnesB)) + minOnesB;

  // tensA: Random integer between 2 and 9
  const tensA = Math.floor(Math.random() * 8) + 2;
  // tensB: Bounded randomly between 1 and (tensA - 1)
  const tensB = Math.floor(Math.random() * (tensA - 1)) + 1;

  const numA = tensA * 10 + onesA;
  const numB = tensB * 10 + onesB;
  const correctAnswer = numA - numB;

  return {
    numA,
    numB,
    operation: 'subtraction',
    correctAnswer,
    onesA,
    onesB,
    tensA,
    tensB
  };
};

/**
 * Generates four unique choices including custom educational distractors.
 * @param {Object} puzzle 
 * @returns {Array} Shuffled choices
 */
export const generateChoices = (puzzle) => {
  const { numA, numB, correctAnswer, operation, onesA, onesB, tensA, tensB } = puzzle;
  const choices = new Set();
  
  // 1. Add correct answer
  choices.add(correctAnswer);

  if (operation === 'addition') {
    // 2. The Carry Bug Option: correctAnswer - 10
    const carryBug = correctAnswer - 10;
    if (carryBug > 0 && carryBug !== correctAnswer) {
      choices.add(carryBug);
    }

    // 3. Operational Flip Distractor: numA - numB (since we are doing addition)
    const opFlip = Math.max(0, numA - numB);
    if (opFlip !== correctAnswer && opFlip > 0) {
      choices.add(opFlip);
    }
  } else if (operation === 'subtraction') {
    // 2. The Positional Displacement Error: ((tensA - tensB) * 10) + Math.abs(onesA - onesB)
    const posDisplacement = ((tensA - tensB) * 10) + Math.abs(onesA - onesB);
    if (posDisplacement > 0 && posDisplacement !== correctAnswer) {
      choices.add(posDisplacement);
    }

    // 3. Operational Flip Distractor: numA + numB (since we are doing subtraction)
    const opFlip = numA + numB;
    if (opFlip !== correctAnswer) {
      choices.add(opFlip);
    }
  }

  // 4. Fill in standard nearby offsets until we have 4 unique options
  const offsets = [1, -1, 10, -2, 2, -10];
  let offsetIndex = 0;
  while (choices.size < 4 && offsetIndex < offsets.length) {
    const candidate = correctAnswer + offsets[offsetIndex];
    if (candidate > 0 && candidate !== correctAnswer) {
      choices.add(candidate);
    }
    offsetIndex++;
  }

  // If we still somehow don't have 4 choices, fill with absolute random additions
  let randomOffset = 3;
  while (choices.size < 4) {
    const candidate = correctAnswer + randomOffset;
    if (candidate > 0) {
      choices.add(candidate);
    }
    randomOffset++;
  }

  // Shuffle via randomized indexing arrays
  return shuffleArray(Array.from(choices));
};

/**
 * Generates Level 6 Mixed Mastery Boss Wave equations:
 * - Randomly selects a source level between 1 and 5
 * - Invokes the corresponding generator
 * - Appends `sourceLevel` to the output object
 */
export const generateLevel6Mixed = () => {
  const levelNum = Math.floor(Math.random() * 5) + 1;
  let puzzle;
  switch (levelNum) {
    case 1:
      puzzle = generateSingleDigitAddition();
      break;
    case 2:
      puzzle = generateLevel1Addition();
      break;
    case 3:
      puzzle = generateLevel1Subtraction();
      break;
    case 4:
      puzzle = generateLevel2Addition();
      break;
    case 5:
      puzzle = generateLevel5Subtraction();
      break;
    default:
      puzzle = generateSingleDigitAddition();
  }
  return {
    ...puzzle,
    sourceLevel: levelNum
  };
};

