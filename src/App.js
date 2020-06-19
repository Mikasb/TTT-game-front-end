import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./App.css";

class App extends Component {
  squareArray = Array(9).fill('_');
  apiData = [];

  constructor() {
    super();
    this.state = {
      turn: "X",
      board: this.squareArray,
      dataList: ''
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
    if (this.squareArray[event.target.dataset.square] === '_') {
      this.squareArray[event.target.dataset.square] = this.state.turn;
      event.target.innerText = this.state.turn;
      let nextTurn = this.state.turn === "X" ? "O" : "X";
      this.setState({
        turn: nextTurn,
      });
    }

     this.sendRequest({
      board: this.squareArray,
      winner: this.determineWinner(),
    });
  }

  determineWinner() {
    const winCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [6, 4, 2],
      [0, 4, 8],
    ];

    for (let comb in winCombinations) {
      if (
        this.squareArray[winCombinations[comb][0]] === this.squareArray[winCombinations[comb][1]] &&
        this.squareArray[winCombinations[comb][0]] === this.squareArray[winCombinations[comb][2]] &&
        this.squareArray[winCombinations[comb][0]] !== '_'
      ) {
        return this.squareArray[comb[0]];
      }
    }

    if (!this.squareArray.includes('_')) {
      return "draw";
    }

    return "none";
  }

   sendRequest(data) {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
     fetch("/api", options)
    .then((res) => {
      return res.json()
    })
    .then((retrievedData) => {
      this.apiData.push(JSON.stringify(retrievedData));
      this.setState({
        dataList: this.apiData.map(data => <li>{data}</li>)
      })
    });
  }

  render() {
    return (
      <div id="game">
        <div id="game-title">TicTacToe Game</div>
        <div id="board" onClick={(event) => this.squareClicked(event)}>
          <div className="square" data-square="0"></div>
          <div className="square" data-square="1"></div>
          <div className="square" data-square="2"></div>
          <div className="square" data-square="3"></div>
          <div className="square" data-square="4"></div>
          <div className="square" data-square="5"></div>
          <div className="square" data-square="6"></div>
          <div className="square" data-square="7"></div>
          <div className="square" data-square="8"></div>
        </div>
        <div id="api-logs">
        <div id="log-title">Activity Log:</div>
          <ol>
            {this.state.dataList}
          </ol>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#game-area"));

export default App;
