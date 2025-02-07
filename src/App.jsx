import { useState } from "react";

function Board() {
  // 次どちらが手番か管理するstate
  const [xIsNext, setXIsNext] = useState(true);
  // 親コンポーネントのBoardでuseStateすることで、九個の盤面の状態をまとめて管理が可能。
  const [squares, setSquares] = useState(Array(9).fill(null));

  // イベントを処理するハンドラ関数の定義には handleSomething という名前を使う
  // もう値が入力されているマス押下時と勝負が決まっている時は早期リターンを行っている。
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    // 直接値を変えない(イミュータビリティ)をすることで、「タイムトラベル」を実装できる。
    const nextSquares = squares.slice();

    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    // setSquaresをすることで、コンポーネントが再レンダーされる。
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let status;

  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next Player: " + (xIsNext ? "x" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

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
      return squares[a];
    }
  }

  // 勝負が決まっていない時はnullを返す。
  return null;
}

// イベントを表す props には onSomething という名前を使う
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default Board;
