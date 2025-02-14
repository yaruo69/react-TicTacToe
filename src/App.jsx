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

function Board({ xIsNext, squares, onPlay }) {
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

    // ユーザがマス目をクリックしたときに、Game コンポーネントが Board を更新
    onPlay(nextSquares);
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

function Game() {
  // 次どちらが手番か管理するstate
  const [xIsNext, setXIsNext] = useState(true);
  // 親コンポーネントのGameでuseStateすることで、九個の盤面の状態+履歴をまとめて管理が可能。
  // historyには、配列であり、要素(履歴)も配列で入る。
  const [history, setHistory] = useState([Array(9).fill(null)]);
  // 現在の盤面をレンダーする為に、最後の要素を取り出している。
  const currentSquares = history[history.length - 1];

  // イベントを処理するハンドラ関数の定義には handleSomething という名前を使う
  // ゲーム内容を更新するために Board コンポーネントから呼ばれる
  function handlePlay(nextSquares) {
    // ...(スプレッド構文)を利用することで、イミュータブルな方法で元のhistoryを直接変更させない。
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove) {}

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }

    return (
      <li>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export default Game;
