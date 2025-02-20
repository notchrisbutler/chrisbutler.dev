'use client';

import { useCallback, useEffect, useState, useRef } from 'react';
import { X, Flag, RotateCw } from 'lucide-react';
import { GameNotification } from './game-notification';
import { ConfirmationModal } from './confirmation-modal';

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
  newGrid[row][col].isFlagged = false;

  // If it's an empty cell, only reveal immediate adjacent cells
  if (newGrid[row][col].adjacentMines === 0 && !newGrid[row][col].isMine) {
    // Only reveal cells that are either empty or have numbers (no mines)
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const newRow = row + i;
        const newCol = col + j;
        
        if (
          newRow >= 0 && newRow < GRID_SIZE &&
          newCol >= 0 && newCol < GRID_SIZE &&
          !newGrid[newRow][newCol].isMine &&
          !newGrid[newRow][newCol].isRevealed
        ) {
          // For empty cells, continue revealing but only in cardinal directions
          if (newGrid[newRow][newCol].adjacentMines === 0 && (i === 0 || j === 0)) {
            const nextGrid = revealCell(newGrid, newRow, newCol);
            // Copy over any changes from recursive calls
            for (let r = 0; r < GRID_SIZE; r++) {
              for (let c = 0; c < GRID_SIZE; c++) {
                newGrid[r][c] = nextGrid[r][c];
              }
            }
          } else {
            // For numbered cells, just reveal them
            newGrid[newRow][newCol].isRevealed = true;
            newGrid[newRow][newCol].isFlagged = false;
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
  const [showNewGameConfirmation, setShowNewGameConfirmation] = useState(false);

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
    if (gameState.isFirstClick) {
      // If it's a fresh game, no need to confirm
      resetGame();
    } else {
      setShowNewGameConfirmation(true);
    }
  };

  const resetGame = () => {
    setGameState({
      grid: createEmptyGrid(),
      gameOver: false,
      won: false,
      minesCount: MINES_COUNT,
      flaggedCount: 0,
      isFirstClick: true,
    });
    setShowNewGameConfirmation(false);
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
    const baseClasses = 'border-2 border-gray-900/50 [-webkit-tap-highlight-color:transparent]';
    
    if (!cell.isRevealed) {
      if (cell.isFlagged) {
        return `${baseClasses} bg-amber-700 sm:hover:bg-amber-600 active:bg-amber-700`;
      }
      return `${baseClasses} bg-gray-700 sm:hover:bg-gray-600 active:bg-gray-700`;
    }
    if (cell.isMine) {
      return `${baseClasses} bg-red-900`;
    }
    return `${baseClasses} bg-gray-800`;
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
        {(gameState.gameOver || gameState.won) && (
          <GameNotification
            message={gameState.won ? 'You won!' : 'Game Over!'}
            buttonText="Play Again"
            onButtonClick={resetGame}
          />
        )}

        {showNewGameConfirmation && (
          <ConfirmationModal
            message="Are you sure you want to start a new game? Your current progress will be lost."
            confirmText="New Game"
            cancelText="Cancel"
            onConfirm={resetGame}
            onCancel={() => setShowNewGameConfirmation(false)}
          />
        )}

        <div className="flex flex-col items-center gap-4 mb-4">
          <div className="text-white text-lg sm:text-xl">
            Flags: {gameState.minesCount - gameState.flaggedCount}
          </div>
          <div className="flex items-center justify-between w-full max-w-[600px] px-4 sm:px-8">
            <button
              onClick={() => setFlagMode(!flagMode)}
              className={`
                w-[140px] h-11 rounded text-base transition-colors flex items-center justify-center gap-2
                ${flagMode 
                  ? 'bg-amber-700 hover:bg-amber-600 text-white' 
                  : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                }
              `}
              aria-pressed={flagMode}
            >
              <Flag className="w-5 h-5" />
              <span>{flagMode ? 'Flagging' : 'Flag'}</span>
            </button>
            <button
              onClick={handleReset}
              className="w-[140px] h-11 bg-green-600 hover:bg-green-700 text-white rounded text-base transition-colors flex items-center justify-center gap-2"
            >
              <RotateCw className="w-5 h-5" />
              <span>New Game</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-9 gap-[0.3rem] sm:gap-1 mb-4">
          {gameState.grid.map((row, i) =>
            row.map((cell, j) => (
              <button
                key={`${i}-${j}`}
                onClick={() => handleCellClick(i, j)}
                className={`
                  w-[1.85rem] h-[1.85rem] sm:w-14 sm:h-14 flex items-center justify-center
                  text-base sm:text-2xl font-bold rounded-sm
                  ${getCellColor(cell)}
                  transition-colors duration-150
                  ${cell.isRevealed ? 'transform scale-[0.98]' : ''}
                  touch-manipulation select-none outline-none
                  appearance-none [-webkit-tap-highlight-color:transparent]
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

        <div className="text-center text-gray-400 mt-4">
          <p className="text-sm">Click cells to reveal, toggle flag mode to place flags</p>
          <p className="text-sm mt-1">Numbers show adjacent mines</p>
        </div>
      </div>
    </div>
  );
} 