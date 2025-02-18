import { useState } from "react";

function calculateWinner(squares) {
  // 勝利のマスのパターンを格納する配列
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    // "X"か"O"のどちらかで勝利のパターンのマスが埋められているか判定する式
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      // 勝った"X"か"O"を返す。
      return { winner: squares[a], winningSquares: [a, b, c] };
    }
  }

  if (!squares.includes(null)) {
    return { winner: "Draw", winningSquares: [] };
  }

  // 勝負が決まっていない時はnullを返す。
  return { winner: null, winningSquares: [] };
}

// イベントを表す props には onSomething という名前を使う
function Square({ value, onSquareClick, isWinningSquare }) {
  return (
    <button
      className={`square ${isWinningSquare ? "highlight" : ""}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares).winner) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares, i); // ここでクリックしたマスのインデックスを渡す
  }

  const { winner, winningSquares } = calculateWinner(squares);
  let status;
  if (winner === "Draw") {
    status = "Draw!";
  } else if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next Player: " + (xIsNext ? "X" : "O");
  }

  const rows = [];
  for (let row = 0; row < 3; row++) {
    const squaresRow = [];
    for (let col = 0; col < 3; col++) {
      const index = row * 3 + col;
      squaresRow.push(
        <Square
          key={index}
          value={squares[index]}
          onSquareClick={() => handleClick(index)}
          isWinningSquare={winningSquares.includes(index)}
        />
      );
    }
    rows.push(
      <div key={row} className="board-row">
        {squaresRow}
      </div>
    );
  }

  return (
    <>
      <div className="status">{status}</div>
      {rows}
    </>
  );
}

function Game() {
  const [history, setHistory] = useState([
    { squares: Array(9).fill(null), location: null },
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;

  function handlePlay(nextSquares, index) {
    const row = Math.floor(index / 3) + 1; // 1-based index
    const col = (index % 3) + 1; // 1-based index
    const nextHistory = [
      ...history.slice(0, currentMove + 1),
      { squares: nextSquares, location: `(${row}, ${col})` },
    ];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function toggleSortOrder() {
    setIsAscending(!isAscending);
  }

  let moves = history.map((step, move) => {
    if (move === currentMove) {
      return <li key={move}>You are at move #{move}</li>;
    } else {
      const description =
        move > 0 ? `Go to move #${move} ${step.location}` : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
      );
    }
  });

  if (!isAscending) {
    moves.reverse();
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <button onClick={toggleSortOrder}>
          {isAscending ? "Sort Descending" : "Sort Ascending"}
        </button>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export default Game;
