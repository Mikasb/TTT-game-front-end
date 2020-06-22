/**
 * determineWinner method checks if there is a winner
 * in the given array of player moves. It returns
 * the winner if the array contains at least one winning combination,
 * returns "draw" if the match is draw or "none" if there is no winner
 * and the match is still not finished.
 * @param {*} movesArray - given array to check
 */
export function determineWinner(movesArray) {
  const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8],
  ];

  for (let comb in winCombinations) {
    if (
      movesArray[winCombinations[comb][0]] ===
        movesArray[winCombinations[comb][1]] &&
      movesArray[winCombinations[comb][0]] ===
        movesArray[winCombinations[comb][2]] &&
      movesArray[winCombinations[comb][0]] !== "_"
    ) {
      return movesArray[winCombinations[comb][0]];
    }
  }

  if (!movesArray.includes("_")) {
    return "draw";
  }

  return "none";
}

