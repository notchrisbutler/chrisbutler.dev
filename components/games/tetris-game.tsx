'use client';

import { useCallback, useEffect, useState } from 'react';
import { X } from 'lucide-react';

type Point = {
  x: number;
  y: number;
};

type Tetromino = {
  shape: boolean[][];
  position: Point;
  color: string;
};

type GameState = {
  grid: string[][];
  score: number;
  gameOver: boolean;
  currentPiece: Tetromino | null;
  level: number;
  linesCleared: number;
};

const GRID_HEIGHT = 20;
const GRID_WIDTH = 10;
const INITIAL_SPEED = 1000;
const SPEED_INCREASE = 0.85;

const TETROMINOES = [
  {
    shape: [
      [true, true],
      [true, true],
    ],
    color: 'bg-yellow-500',
  }, // O
  {
    shape: [
      [true, true, true, true],
    ],
    color: 'bg-cyan-500',
  }, // I
  {
    shape: [
      [true, true, true],
      [false, true, false],
    ],
    color: 'bg-purple-500',
  }, // T
  {
    shape: [
      [true, true, false],
      [false, true, true],
    ],
    color: 'bg-green-500',
  }, // S
  {
    shape: [
      [false, true, true],
      [true, true, false],
    ],
    color: 'bg-red-500',
  }, // Z
  {
    shape: [
      [true, false, false],
      [true, true, true],
    ],
    color: 'bg-blue-500',
  }, // J
  {
    shape: [
      [false, false, true],
      [true, true, true],
    ],
    color: 'bg-orange-500',
  }, // L
];

const createEmptyGrid = () => 
  Array(GRID_HEIGHT).fill(null).map(() => Array(GRID_WIDTH).fill(''));

const getRandomTetromino = (): Tetromino => {
  const tetromino = TETROMINOES[Math.floor(Math.random() * TETROMINOES.length)];
  return {
    shape: tetromino.shape,
    color: tetromino.color,
    position: {
      x: Math.floor((GRID_WIDTH - tetromino.shape[0].length) / 2),
      y: 0,
    },
  };
};

export function TetrisGame({ onClose }: { onClose: () => void }) {
  const [gameState, setGameState] = useState<GameState>({
    grid: createEmptyGrid(),
    score: 0,
    gameOver: false,
    currentPiece: null,
    level: 1,
    linesCleared: 0,
  });
  const [dropTime, setDropTime] = useState<number | null>(INITIAL_SPEED);

  const isColliding = (piece: Tetromino, grid: string[][], offsetX = 0, offsetY = 0): boolean => {
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x]) {
          const newX = piece.position.x + x + offsetX;
          const newY = piece.position.y + y + offsetY;
          
          if (
            newX < 0 || newX >= GRID_WIDTH ||
            newY >= GRID_HEIGHT ||
            (newY >= 0 && grid[newY][newX] !== '')
          ) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const rotatePiece = (piece: Tetromino): boolean[][] => {
    const newShape = piece.shape[0].map((_, index) =>
      piece.shape.map(row => row[index]).reverse()
    );
    return newShape;
  };

  const mergePieceToGrid = (piece: Tetromino, grid: string[][]): string[][] => {
    const newGrid = grid.map(row => [...row]);
    
    piece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value && piece.position.y + y >= 0) {
          newGrid[piece.position.y + y][piece.position.x + x] = piece.color;
        }
      });
    });
    
    return newGrid;
  };

  const clearLines = (grid: string[][]): [string[][], number] => {
    let linesCleared = 0;
    const newGrid = grid.filter(row => {
      const isLineFull = row.every(cell => cell !== '');
      if (isLineFull) linesCleared++;
      return !isLineFull;
    });
    
    while (newGrid.length < GRID_HEIGHT) {
      newGrid.unshift(Array(GRID_WIDTH).fill(''));
    }
    
    return [newGrid, linesCleared];
  };

  const moveDown = useCallback(() => {
    if (!gameState.currentPiece || gameState.gameOver) return;

    if (!isColliding(gameState.currentPiece, gameState.grid, 0, 1)) {
      setGameState(prev => ({
        ...prev,
        currentPiece: {
          ...prev.currentPiece!,
          position: {
            ...prev.currentPiece!.position,
            y: prev.currentPiece!.position.y + 1,
          },
        },
      }));
    } else {
      // Piece has landed
      const newGrid = mergePieceToGrid(gameState.currentPiece, gameState.grid);
      const [clearedGrid, numLinesCleared] = clearLines(newGrid);
      const newScore = gameState.score + (numLinesCleared * 100 * gameState.level);
      const newLinesCleared = gameState.linesCleared + numLinesCleared;
      const newLevel = Math.floor(newLinesCleared / 10) + 1;
      
      // Check if game is over (piece collides immediately)
      const nextPiece = getRandomTetromino();
      const gameOver = isColliding(nextPiece, clearedGrid);

      setGameState(prev => ({
        ...prev,
        grid: clearedGrid,
        score: newScore,
        currentPiece: gameOver ? null : nextPiece,
        gameOver,
        level: newLevel,
        linesCleared: newLinesCleared,
      }));

      if (!gameOver) {
        setDropTime(INITIAL_SPEED * Math.pow(SPEED_INCREASE, newLevel - 1));
      }
    }
  }, [gameState]);

  const movePiece = useCallback((direction: number) => {
    if (!gameState.currentPiece || gameState.gameOver) return;

    if (!isColliding(gameState.currentPiece, gameState.grid, direction, 0)) {
      setGameState(prev => ({
        ...prev,
        currentPiece: {
          ...prev.currentPiece!,
          position: {
            ...prev.currentPiece!.position,
            x: prev.currentPiece!.position.x + direction,
          },
        },
      }));
    }
  }, [gameState]);

  const rotatePieceIfPossible = useCallback(() => {
    if (!gameState.currentPiece || gameState.gameOver) return;

    const newShape = rotatePiece(gameState.currentPiece);
    const rotatedPiece = {
      ...gameState.currentPiece,
      shape: newShape,
    };

    if (!isColliding(rotatedPiece, gameState.grid)) {
      setGameState(prev => ({
        ...prev,
        currentPiece: rotatedPiece,
      }));
    }
  }, [gameState]);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
      return;
    }

    if (gameState.gameOver) return;

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        movePiece(-1);
        break;
      case 'ArrowRight':
        event.preventDefault();
        movePiece(1);
        break;
      case 'ArrowDown':
        event.preventDefault();
        moveDown();
        break;
      case 'ArrowUp':
        event.preventDefault();
        rotatePieceIfPossible();
        break;
      case ' ':
        event.preventDefault();
        // Hard drop
        while (!isColliding(gameState.currentPiece!, gameState.grid, 0, 1)) {
          moveDown();
        }
        moveDown();
        break;
    }
  }, [gameState, moveDown, movePiece, rotatePieceIfPossible, onClose]);

  useEffect(() => {
    const handleStart = () => {
      setGameState({
        grid: createEmptyGrid(),
        score: 0,
        gameOver: false,
        currentPiece: getRandomTetromino(),
        level: 1,
        linesCleared: 0,
      });
      setDropTime(INITIAL_SPEED);
    };

    handleStart();
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    if (!dropTime || gameState.gameOver) return;
    
    const dropInterval = setInterval(() => {
      moveDown();
    }, dropTime);

    return () => clearInterval(dropInterval);
  }, [dropTime, moveDown, gameState.gameOver]);

  const getDisplayGrid = () => {
    const displayGrid = gameState.grid.map(row => [...row]);
    
    if (gameState.currentPiece) {
      gameState.currentPiece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value && gameState.currentPiece!.position.y + y >= 0) {
            displayGrid[gameState.currentPiece!.position.y + y][gameState.currentPiece!.position.x + x] = 
              gameState.currentPiece!.color;
          }
        });
      });
    }
    
    return displayGrid;
  };

  const handleReset = () => {
    setGameState({
      grid: createEmptyGrid(),
      score: 0,
      gameOver: false,
      currentPiece: getRandomTetromino(),
      level: 1,
      linesCleared: 0,
    });
    setDropTime(INITIAL_SPEED);
  };

  return (
    <div className="game-container" style={{ width: '400px' }}>
      <div className="game-header mb-4">
        <span className="text-white text-lg">Tetris</span>
        <button onClick={onClose} className="close-button" aria-label="Close game">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="mb-4 flex justify-between items-center">
        <div className="text-white space-x-4">
          <span>Score: {gameState.score}</span>
          <span>Level: {gameState.level}</span>
        </div>
        <button
          onClick={handleReset}
          className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm transition-colors"
        >
          New Game
        </button>
      </div>

      <div className="bg-gray-800 p-2 rounded">
        <div className="grid grid-cols-10 gap-0.5">
          {getDisplayGrid().map((row, i) =>
            row.map((cell, j) => (
              <div
                key={`${i}-${j}`}
                className={`
                  w-8 h-8 flex items-center justify-center
                  rounded-sm ${cell || 'bg-gray-700'}
                  transition-colors duration-150
                `}
              />
            ))
          )}
        </div>
      </div>

      <div className="h-[60px] flex items-center justify-center mt-4">
        {gameState.gameOver && (
          <div className="text-center space-y-2">
            <p className="text-white">Game Over!</p>
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
        <p>Arrow keys to move and rotate</p>
        <p className="text-sm mt-1">Space to hard drop</p>
      </div>
    </div>
  );
} 