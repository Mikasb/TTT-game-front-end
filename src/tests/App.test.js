import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';


test('displays game title', () => {
  const { getByText } = render(<App />);
  const titleElement = getByText(/TicTacToe Game/i);
  expect(titleElement).toBeInTheDocument();
});


test('The outcome of the match element is rendered', () => {
  const {queryByTestId} = render(<App />)
  expect(queryByTestId("display-winner")).toBeInTheDocument();
})

it("first square on click changes to X", () => {
  const {queryByTestId} = render(<App/>)

  fireEvent.click(queryByTestId("square1"))

  expect(queryByTestId("square1").innerText).toContain('X');
})

it("second square on click changes to O", () => {
  const {queryByTestId} = render(<App/>)
  fireEvent.click(queryByTestId("square1"))
  fireEvent.click(queryByTestId("square2"))

  expect(queryByTestId("square2").innerText).toContain('O');
})
