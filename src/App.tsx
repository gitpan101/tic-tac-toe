import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [currSymb, setCurrSymb] = useState('X');
  const [winner, setWinner] = useState('');
  const [GCT, setGCT] = useState<string | null>(null);
  const countX = useRef(0);
  const countO = useRef(0);
  const grid = useRef<string[][]>([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);
  // const grid = useRef<string[][]>([
  //   ['', '', '', '', ''],
  //   ['', '', '', '', ''],
  //   ['', '', '', '', ''],
  //   ['', '', '', '', ''],
  //   ['', '', '', '', ''],
  // ]);

  const onBoxClick = (row: number, col: number) => {
    grid.current[row][col] = currSymb;
    setCurrSymb(currSymb == 'X' ? 'O' : 'X');
  };

  const reset = useCallback(() => {
    for (let i = 0; i < grid.current.length; i++) {
      for (let j = 0; j < grid.current.length; j++) {
        grid.current[i][j] = '';
      }
    }

    countX.current = 0;
    countO.current = 0;

    if (winner !== '') {
      alert(`Winner is ${winner}`);
      setWinner('');
    }

    setCurrSymb('X');
  }, [winner]);

  const calculate = useCallback(() => {
    // Check rows
    for (let i = 0; i < grid.current.length; i++) {
      if (grid.current[i].every((cell) => cell === 'X')) {
        setWinner('X');
        return;
      }
      if (grid.current[i].every((cell) => cell === 'O')) {
        setWinner('O');
        return;
      }
    }

    // Check columns
    for (let i = 0; i < grid.current.length; i++) {
      if (grid.current.every((row) => row[i] === 'X')) {
        setWinner('X');
        return;
      }
      if (grid.current.every((row) => row[i] === 'O')) {
        setWinner('O');
        return;
      }
    }

    // Check diagonals
    if (grid.current.every((_, i) => grid.current[i][i] === 'X')) {
      setWinner('X');
      return;
    }
    if (grid.current.every((_, i) => grid.current[i][i] === 'O')) {
      setWinner('O');
      return;
    }
    if (grid.current.every((_, i) => grid.current[i][grid.current.length - 1 - i] === 'X')) {
      setWinner('X');
      return;
    }
    if (grid.current.every((_, i) => grid.current[i][grid.current.length - 1 - i] === 'O')) {
      setWinner('O');
      return;
    }

    // Check if the grid is full
    const isGridFull = grid.current.every((row) => row.every((cell) => cell !== ''));
    if (isGridFull) {
      alert("Game Over! It's a draw.");
      setWinner('');
      reset();
    }
  }, [reset]);

  useEffect(() => {
    setGCT(grid.current.reduce((acc) => acc + '80px ', ''));
  }, []);

  useEffect(() => {
    calculate();
  }, [currSymb, calculate]);

  useEffect(() => {
    reset();
  }, [winner, reset]);

  return (
    GCT && (
      <div
        style={{
          display: 'inline-flex',
          justifyContent: 'center',
          width: '100%',
          paddingTop: '200px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: GCT,
          }}
        >
          {grid.current.map((arr, row) =>
            arr.map((val, col) => (
              <div
                key={col}
                style={{
                  border: '2px solid #1B1212',
                  height: '80px',
                  width: '80px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '72px',
                  color: '#1B1212',
                }}
                onClick={() => onBoxClick(row, col)}
              >
                {val}
              </div>
            ))
          )}
        </div>
      </div>
    )
  );
}

export default App;
