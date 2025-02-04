import { useState } from "react";

function Board() {
  // 親コンポーネントのBoardでuseStateすることで、九個の盤面の状態をまとめて管理が可能。
  const [squares, setSquares] = useState(Array(9).fill(null));

  // イベントを処理するハンドラ関数の定義には handleSomething という名前を使う
  function handleClick(i) {
    const nextSquares = squares.slice();
    nextSquares[i] = "X";
    // setSquaresをすることで、コンポーネントが再レンダーされる。
    setSquares(nextSquares);
  }

  return (
    <>
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

// イベントを表す props には onSomething という名前を使う
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default Board;
