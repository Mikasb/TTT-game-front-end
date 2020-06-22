import React, { Component } from "react";
import "./App.css";
import { determineWinner, displayWinner } from "./determineWinUtil";

class App extends Component {
  squareArray = Array(9).fill("_");
  apiData = [];

  constructor() {
    super();
    this.state = {
      turn: "X",
      board: this.squareArray,
      dataList: "",
      winner: "none",
    };
  }

  /**
   * squareClicked method firstly checks if the selected square
   * is empty. If it is it then updates the array containing
   * the moves of each player, updates the turn from X to O
   * and vice versa and displays the turn text on the targeted
   * element.
   * @param {*} event - click on a square
   */
  squareClicked(event) {
    if (
      this.squareArray[event.target.dataset.square] === "_" &&
      this.state.winner === "none"
    ) {
      this.squareArray[event.target.dataset.square] = this.state.turn;
      event.target.innerText = this.state.turn;
      let nextTurn = this.state.turn === "X" ? "O" : "X";

      let getResult = determineWinner(this.squareArray);

      this.setState({
        turn: nextTurn,
        winner: getResult,
      });

      this.sendRequest({
        board: this.squareArray,
        winner: getResult,
      });
    }
  }

  sendRequest(data) {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    fetch("http://localhost:3000/api", options)
      .then((res) => {
        return res.json();
      })
      .then((retrievedData) => {
        this.apiData.push(JSON.stringify(retrievedData));
        this.setState({
          dataList: this.apiData.map((data) => <li>{data}</li>),
        });
      });
  }

  render() {
    return (
      <div id="game">
        <div id="game-title" data-testid="titletest">
          TicTacToe Game
        </div>
        <div id="board" onClick={(event) => this.squareClicked(event)}>
          <div className="square" data-square="0" data-testid="square1"></div>
          <div className="square" data-square="1" data-testid="square2"></div>
          <div className="square" data-square="2"></div>
          <div className="square" data-square="3"></div>
          <div className="square" data-square="4"></div>
          <div className="square" data-square="5"></div>
          <div className="square" data-square="6"></div>
          <div className="square" data-square="7"></div>
          <div className="square" data-square="8"></div>
        </div>
        <div id="winner">
          <h1 data-testid="display-winner">{displayWinner(this.state.winner)}</h1>
        </div>
        <div id="api-logs">
          <div id="log-title">Activity Log:</div>
          <ol>{this.state.dataList}</ol>
        </div>
      </div>
    );
  }
}

export default App;
