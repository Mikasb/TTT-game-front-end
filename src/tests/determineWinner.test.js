import { determineWinner } from "../determineWinner";

test("testing X is the winner outcome", () => {
  const value = determineWinner(["X", "O", "O", "X", "_", "_", "X", "_", "_"]);
  expect(value).toBe("X");
});

test("testing O is the winner outcome", () => {
  const value = determineWinner(["O", "O", "O", "X", "_", "_", "_", "X", "X"]);
  expect(value).toBe("O");
});

test("testing match is draw outcome", () => {
  const value = determineWinner(["O", "X", "O", "X", "X", "O", "X", "O", "X"]);
  expect(value).toBe("draw");
});


