'use client';

import { useCallback, useEffect, useState } from 'react';
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
    grid[row][col].isRevealed ||
    grid[row][col].isFlagged
  ) {
    return grid;
  }

  const newGrid = grid.map(row => [...row]);
  newGrid[row][col].isRevealed = true;

  // If it's an empty cell, reveal adjacent cells
  if (newGrid[row][col].adjacentMines === 0 && !newGrid[row][col].isMine) {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        revealCell(newGrid, row + i, col + j);
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

  const handleCellClick = (row: number, col: number) => {
    if (gameState.gameOver || gameState.won || gameState.grid[row][col].isFlagged) {
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

    // Reveal the clicked cell and its adjacent cells if empty
    newGrid = revealCell(newGrid, row, col);

    // Check for win
    const won = checkWin(newGrid);

    setGameState(prev => ({
      ...prev,
      grid: newGrid,
      won,
    }));
  };

  const handleContextMenu = (e: React.MouseEvent, row: number, col: number) => {
    e.preventDefault();
    if (gameState.gameOver || gameState.won || gameState.grid[row][col].isRevealed) {
      return;
    }

    // Prevent flagging more cells than there are mines
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
      return <Flag className="w-4 h-4 text-red-500" />;
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
    const baseClasses = 'border border-gray-600/20';
    
    if (!cell.isRevealed) {
      return `${baseClasses} bg-gray-700 hover:bg-gray-600 shadow-sm`;
    }
    if (cell.isMine) {
      return `${baseClasses} bg-red-900/80 shadow-inner`;
    }
    return `${baseClasses} bg-gray-600 shadow-inner`;
  };

  const getNumberColor = (number: number): string => {
    const colors = [
      'text-blue-400',   // 1
      'text-green-400',  // 2
      'text-red-400',    // 3
      'text-blue-600',   // 4
      'text-red-600',    // 5
      'text-cyan-400',   // 6
      'text-gray-800',   // 7
      'text-gray-600',   // 8
    ];
    return colors[number - 1] || '';
  };

  return (
    <div className="game-container" style={{ width: '400px' }}>
      <div className="game-header mb-4">
        <span className="text-white text-lg">Minesweeper</span>
        <button onClick={onClose} className="close-button" aria-label="Close game">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="mb-4 flex justify-between items-center">
        <div className="text-white">
          Mines: {gameState.minesCount - gameState.flaggedCount}
        </div>
        <button
          onClick={handleReset}
          className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm transition-colors"
        >
          New Game
        </button>
      </div>

      <div className="grid grid-cols-9 gap-1 bg-gray-800 p-3 rounded">
        {gameState.grid.map((row, i) =>
          row.map((cell, j) => (
            <button
              key={`${i}-${j}`}
              onClick={() => handleCellClick(i, j)}
              onContextMenu={(e) => handleContextMenu(e, i, j)}
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
              `}
              disabled={gameState.gameOver || gameState.won}
            >
              {getCellContent(cell)}
            </button>
          ))
        )}
      </div>

      <div className="h-[60px] flex items-center justify-center mt-4">
        {(gameState.gameOver || gameState.won) && (
          <div className="text-center space-y-2">
            <p className="text-white">
              {gameState.won ? 'You won!' : 'Game Over!'}
            </p>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors"
            >
              Play Again
            </button>
          </div>
        )}
      </div>

      <div className="text-center text-gray-400 mt-4">
        <p>Left click to reveal, right click to flag</p>
        <p className="text-sm mt-1">Numbers show adjacent mines</p>
      </div>
    </div>
  );
} 