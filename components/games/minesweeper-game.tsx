'use client';

import { useCallback, useEffect, useState, useRef } from 'react';
import { X, Flag } from 'lucide-react';

type Cell = {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  adjacentMines: number;
};

type GameState = {
  grid: Cell[][];
  gameOver: boolean;
  won: boolean;
  minesCount: number;
  flaggedCount: number;
  isFirstClick: boolean;
};

const GRID_SIZE = 9;
const MINES_COUNT = 10;

const createEmptyGrid = (): Cell[][] => {
  return Array(GRID_SIZE).fill(null).map(() =>
    Array(GRID_SIZE).fill(null).map(() => ({
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      adjacentMines: 0,
    }))
  );
};

const initializeGrid = (firstClickRow: number, firstClickCol: number): Cell[][] => {
  const grid = createEmptyGrid();
  let minesPlaced = 0;

  // Place mines randomly, avoiding the first click position and its adjacent cells
  while (minesPlaced < MINES_COUNT) {
    const row = Math.floor(Math.random() * GRID_SIZE);
    const col = Math.floor(Math.random() * GRID_SIZE);

    // Check if it's not too close to the first click
    const isTooClose = Math.abs(row - firstClickRow) <= 1 && Math.abs(col - firstClickCol) <= 1;

    if (!grid[row][col].isMine && !isTooClose) {
      grid[row][col].isMine = true;
      minesPlaced++;
    }
  }

  // Calculate adjacent mines for each cell
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (!grid[row][col].isMine) {
        let count = 0;
        // Check all adjacent cells
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            const newRow = row + i;
            const newCol = col + j;
            if (
              newRow >= 0 && newRow < GRID_SIZE &&
              newCol >= 0 && newCol < GRID_SIZE &&
              grid[newRow][newCol].isMine
            ) {
              count++;
            }
          }
        }
        grid[row][col].adjacentMines = count;
      }
    }
  }

  return grid;
};

const revealCell = (grid: Cell[][], row: number, col: number): Cell[][] => {
  if (
    row < 0 || row >= GRID_SIZE ||
    col < 0 || col >= GRID_SIZE ||
    grid[row][col].isRevealed
  ) {
    return grid;
  }

  const newGrid = grid.map(row => [...row]);
  const wasFlagged = newGrid[row][col].isFlagged;
  newGrid[row][col].isRevealed = true;
  newGrid[row][col].isFlagged = false;

  // If it's an empty cell, reveal adjacent cells
  if (newGrid[row][col].adjacentMines === 0 && !newGrid[row][col].isMine) {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const nextGrid = revealCell(newGrid, row + i, col + j);
        // Copy over any changes from recursive calls
        for (let r = 0; r < GRID_SIZE; r++) {
          for (let c = 0; c < GRID_SIZE; c++) {
            newGrid[r][c] = nextGrid[r][c];
          }
        }
      }
    }
  }

  return newGrid;
};

const checkWin = (grid: Cell[][]): boolean => {
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      const cell = grid[row][col];
      if (!cell.isMine && !cell.isRevealed) {
        return false;
      }
    }
  }
  return true;
};

export function MinesweeperGame({ onClose }: { onClose: () => void }) {
  const [gameState, setGameState] = useState<GameState>({
    grid: createEmptyGrid(),
    gameOver: false,
    won: false,
    minesCount: MINES_COUNT,
    flaggedCount: 0,
    isFirstClick: true,
  });
  const [flagMode, setFlagMode] = useState(false);

  const handleCellClick = (row: number, col: number) => {
    if (gameState.gameOver || gameState.won) {
      return;
    }

    if (flagMode) {
      handleFlag(row, col);
      return;
    }

    if (gameState.grid[row][col].isFlagged) {
      return;
    }

    let newGrid = gameState.grid;

    // Handle first click
    if (gameState.isFirstClick) {
      newGrid = initializeGrid(row, col);
      setGameState(prev => ({ ...prev, isFirstClick: false }));
    }

    // If clicked on a mine, game over
    if (newGrid[row][col].isMine) {
      // Reveal all mines
      newGrid = newGrid.map(row =>
        row.map(cell => ({
          ...cell,
          isRevealed: cell.isMine ? true : cell.isRevealed,
        }))
      );
      setGameState(prev => ({ ...prev, grid: newGrid, gameOver: true }));
      return;
    }

    // Count flags before revealing
    const flagsBefore = gameState.grid.reduce((count, row) => 
      count + row.reduce((rowCount, cell) => rowCount + (cell.isFlagged ? 1 : 0), 0), 0
    );

    // Reveal the clicked cell and its adjacent cells if empty
    newGrid = revealCell(newGrid, row, col);

    // Count flags after revealing
    const flagsAfter = newGrid.reduce((count, row) => 
      count + row.reduce((rowCount, cell) => rowCount + (cell.isFlagged ? 1 : 0), 0), 0
    );

    // Calculate how many flags were removed
    const flagsRemoved = flagsBefore - flagsAfter;

    // Check for win
    const won = checkWin(newGrid);

    setGameState(prev => ({
      ...prev,
      grid: newGrid,
      won,
      flaggedCount: prev.flaggedCount - flagsRemoved // Adjust flag count
    }));
  };

  const handleFlag = (row: number, col: number) => {
    if (gameState.gameOver || gameState.won || gameState.grid[row][col].isRevealed) {
      return;
    }

    const newFlagState = !gameState.grid[row][col].isFlagged;
    if (newFlagState && gameState.flaggedCount >= gameState.minesCount) {
      return;
    }

    const newGrid = gameState.grid.map(r => [...r]);
    const cell = newGrid[row][col];
    cell.isFlagged = newFlagState;

    setGameState(prev => ({
      ...prev,
      grid: newGrid,
      flaggedCount: prev.flaggedCount + (cell.isFlagged ? 1 : -1),
    }));
  };

  const handleReset = () => {
    setGameState({
      grid: createEmptyGrid(),
      gameOver: false,
      won: false,
      minesCount: MINES_COUNT,
      flaggedCount: 0,
      isFirstClick: true,
    });
  };

  const getCellContent = (cell: Cell): JSX.Element | string => {
    if (!cell.isRevealed && cell.isFlagged) {
      return <Flag className="w-4 h-4 text-white" />;
    }
    if (!cell.isRevealed) {
      return '';
    }
    if (cell.isMine) {
      return '💣';
    }
    return cell.adjacentMines === 0 ? '' : cell.adjacentMines.toString();
  };

  const getCellColor = (cell: Cell): string => {
    const baseClasses = 'border border-gray-700/50';
    
    if (!cell.isRevealed) {
      if (cell.isFlagged) {
        return `${baseClasses} bg-amber-700 hover:bg-amber-600 shadow-sm`;
      }
      return `${baseClasses} bg-gray-600 hover:bg-gray-500 shadow-sm`;
    }
    if (cell.isMine) {
      return `${baseClasses} bg-red-900 shadow-inner`;
    }
    return `${baseClasses} bg-gray-800 shadow-inner`;
  };

  const getNumberColor = (number: number): string => {
    const colors = [
      'text-blue-300',   // 1
      'text-green-300',  // 2
      'text-red-300',    // 3
      'text-blue-500',   // 4
      'text-red-500',    // 5
      'text-cyan-300',   // 6
      'text-purple-300', // 7
      'text-gray-300',   // 8
    ];
    return colors[number - 1] || '';
  };

  return (
    <div className="game-container w-full h-full flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center h-full w-full max-w-[95%]">
        <div className="mb-4 flex justify-between items-center w-full max-w-[360px]">
          <div className="flex items-center gap-3">
            <div className="text-white">
              Flags: {gameState.minesCount - gameState.flaggedCount}
            </div>
            <button
              onClick={() => setFlagMode(!flagMode)}
              className={`
                px-3 py-1 rounded text-sm transition-colors flex items-center gap-2
                ${flagMode 
                  ? 'bg-amber-700 hover:bg-amber-600 text-white' 
                  : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                }
              `}
              aria-pressed={flagMode}
            >
              <Flag className="w-4 h-4" />
              {flagMode ? 'Flagging' : 'Flag'}
            </button>
          </div>
          <button
            onClick={handleReset}
            className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm transition-colors"
          >
            New Game
          </button>
        </div>

        <div className="grid grid-cols-9 gap-0.5 mb-4">
          {gameState.grid.map((row, i) =>
            row.map((cell, j) => (
              <button
                key={`${i}-${j}`}
                onClick={() => handleCellClick(i, j)}
                className={`
                  w-8 h-8 flex items-center justify-center
                  text-base font-bold rounded-sm
                  ${getCellColor(cell)}
                  transition-all duration-150 ease-in-out
                  ${cell.isRevealed ? 'transform scale-[0.95]' : 'hover:scale-[0.97]'}
                  ${typeof getCellContent(cell) === 'string' && Number(getCellContent(cell)) > 0
                    ? getNumberColor(Number(getCellContent(cell)))
                    : ''
                  }
                  touch-manipulation
                `}
                disabled={gameState.gameOver || gameState.won}
              >
                {getCellContent(cell)}
              </button>
            ))
          )}
        </div>

        {(gameState.gameOver || gameState.won) && (
          <div className="text-white text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800/90 p-4 rounded-lg shadow-lg backdrop-blur-sm w-[280px]">
            <p className="mb-3">
              {gameState.won ? 'You won!' : 'Game Over!'}
            </p>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded transition-colors w-full"
            >
              Play Again
            </button>
          </div>
        )}

        <div className="text-center text-gray-400 mt-4">
          <p>Click cells to reveal, toggle flag mode to place flags</p>
          <p className="text-sm mt-1">Numbers show adjacent mines</p>
        </div>
      </div>
    </div>
  );
} 