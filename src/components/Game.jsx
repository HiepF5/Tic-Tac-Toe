import Board from './Board'
import { useState } from 'react'
export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const [size, setSize] = useState(3);
  
  function handleInput(e){
    const inputValue = +e.target.value;
    setSize(inputValue);
    const newHistory = [Array(inputValue*inputValue).fill(null)];
    setHistory(newHistory);
    setCurrentMove(0);
  }
  function handlePlay(nextSquares) {
    // TODO
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    console.log(nextHistory);
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }
  function jumpTo(nextMove) {
    // TODO
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
        <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });
  return (
    <div className='game'>
      <div className='game-board'>
        <input type = 'number' min= '3' placeholder='Enter size' value= {size} onChange={handleInput} />
        <Board xIsNext={xIsNext} squares={currentSquares} size={size} onPlay={handlePlay}/>
      </div>
      <div className='game-info'>
      <ol>{moves}</ol>
      </div>
    </div>
  )
}
