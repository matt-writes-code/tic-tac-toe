import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Square = ({ value, onClick }) => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
};

const Restart = ({ onClick }) => {
  return (
    <button onClick={onClick} className="restart">
      Play Again
    </button>
  );
};

const Game = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const winner = calculateWinner(squares);

  const getStatus = () => {
    if (winner) {
      return "Winner: " + winner;
    } else if (isBoardFull(squares)) {
      return "Draw!";
    } else {
      return "Next player: " + (isXNext ? "X" : "O");
    }
  };

  const renderSquare = i => {
    return (
      <Square
        value={squares[i]}
        onClick={() => {
          if (squares[i] != null || winner != null) {
            return;
          }

          const nextSquares = squares.slice();
          nextSquares[i] = isXNext ? "X" : "O";
          setSquares(nextSquares);
          setIsXNext(!isXNext);
        }}
      />
    );
  };

  const renderRestartButton = () => {
    return (
      <Restart
        onClick={() => {
          setSquares(Array(9).fill(null));
          setIsXNext(true);
        }}
      />
    );
  };

  return (
    <div className="game">
      <div className="container">
        <div className="game">
          <div className="game-board">
            <div className="board-row">
              {renderSquare(0)}
              {renderSquare(1)}
              {renderSquare(2)}
            </div>
            <div className="board-row">
              {renderSquare(3)}
              {renderSquare(4)}
              {renderSquare(5)}
            </div>
            <div className="board-row">
              {renderSquare(6)}
              {renderSquare(7)}
              {renderSquare(8)}
            </div>
          </div>
          <div className="game-info">{getStatus()}</div>
          <div className="restart-button">{renderRestartButton()}</div>
        </div>
      </div>
      <p>
        Tutorial by{" "}
        <a href="https://medium.com/@shifrb/how-to-build-tic-tac-toe-with-react-hooks-ca37f6040022">
          Shif
        </a>
      </p>
    </div>
  );
};

const calculateWinner = squares => {
  const possibleLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < possibleLines.length; i++) {
    const [a, b, c] = possibleLines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
};

const isBoardFull = squares => {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] == null) {
      return false;
    }
  }
  return true;
};

ReactDOM.render(<Game />, document.getElementById("root"));
