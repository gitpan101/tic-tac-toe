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

  const calculate = useCallback(() => {
    for (let i = 0; i < grid.current.length; i++) {
      if (grid.current[i][i] == 'X') countX.current++;
      if (grid.current[i][i] == 'O') countO.current++;
    }

    if (checkWin()) return;

    for (let i = 0; i < grid.current.length; i++) {
      if (grid.current[i][grid.current.length - 1 - i] == 'X') countX.current++;
      if (grid.current[i][grid.current.length - 1 - i] == 'O') countO.current++;
    }

    if (checkWin()) return;

    for (let i = 0; i < grid.current.length; i++) {
      if (grid.current[0][i] == 'X') countX.current++;
      if (grid.current[0][i] == 'O') countO.current++;
    }

    if (checkWin()) return;

    for (let i = 0; i < grid.current.length; i++) {
      if (grid.current[grid.current.length - 1][i] == 'X') countX.current++;
      if (grid.current[grid.current.length - 1][i] == 'O') countO.current++;
    }

    if (checkWin()) return;

    for (let i = 0; i < grid.current.length; i++) {
      if (grid.current[i][0] == 'X') countX.current++;
      if (grid.current[i][0] == 'O') countO.current++;
    }

    if (checkWin()) return;

    for (let i = 0; i < grid.current.length; i++) {
      if (grid.current[i][grid.current.length - 1] == 'X') countX.current++;
      if (grid.current[i][grid.current.length - 1] == 'O') countO.current++;
    }

    if (checkWin()) return;

    for (let i = 0; i < grid.current.length; i++) {
      if (grid.current[i][Math.floor(grid.current.length / 2)] == 'X') countX.current++;
      if (grid.current[i][Math.floor(grid.current.length / 2)] == 'O') countO.current++;
    }

    if (checkWin()) return;

    for (let i = 0; i < grid.current.length; i++) {
      if (grid.current[Math.floor(grid.current.length / 2)][i] == 'X') countX.current++;
      if (grid.current[Math.floor(grid.current.length / 2)][i] == 'O') countO.current++;
    }

    if (checkWin()) return;
  }, []);

  const checkWin = () => {
    if (countX.current == grid.current.length) {
      setWinner('X');
      return true;
    }

    if (countO.current == grid.current.length) {
      setWinner('O');
      return true;
    }

    countX.current = 0;
    countO.current = 0;
    return false;
  };

  useEffect(() => {
    setGCT(grid.current.reduce((acc) => acc + '80px ', ''));
  }, []);

  useEffect(() => {
    calculate();
  }, [currSymb, calculate]);

  useEffect(() => {
    if (winner !== '') {
      for (let i = 0; i < grid.current.length; i++) {
        for (let j = 0; j < grid.current.length; j++) {
          grid.current[i][j] = '';
        }
      }

      countX.current = 0;
      countO.current = 0;

      alert(`Winner is ${winner}`);
      setWinner('');
      setCurrSymb('X');
    }
  }, [winner]);

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
                  border: '1px solid white',
                  height: '80px',
                  width: '80px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '72px',
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
