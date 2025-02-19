'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

const SNAKE_SIZE = 20;
const GAME_SIZE = 400;
const FRAME_RATE = 10;

interface GameState {
  snake: Array<{ x: number; y: number }>;
  food: { x: number; y: number };
  score: number;
}

export function SnakeGame({ onClose }: { onClose: () => void }) {
  const [gameState, setGameState] = useState<GameState>({
    snake: [{ x: 200, y: 200 }],
    food: { x: 300, y: 300 },
    score: 0
  });
  const [direction, setDirection] = useState({ x: 0, y: 0 });
  const [gameActive, setGameActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<number>();
  const lastUpdateRef = useRef<number>(0);
  const stateRef = useRef(gameState);

  // Keep the ref in sync with the state
  useEffect(() => {
    stateRef.current = gameState;
  }, [gameState]);

  const generateFood = useCallback(() => {
    const x = Math.floor(Math.random() * (GAME_SIZE / SNAKE_SIZE)) * SNAKE_SIZE;
    const y = Math.floor(Math.random() * (GAME_SIZE / SNAKE_SIZE)) * SNAKE_SIZE;
    return { x, y };
  }, []);

  const resetGame = useCallback(() => {
    const initialState = {
      snake: [{ x: 200, y: 200 }],
      food: { x: 300, y: 300 },
      score: 0
    };
    setGameState(initialState);
    stateRef.current = initialState;
    setDirection({ x: 0, y: 0 });
    setGameActive(true);
    setGameOver(false);
    lastUpdateRef.current = 0;
  }, []);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (gameActive && !gameOver) {
        event.preventDefault();
        event.stopPropagation();
        
        switch (event.key) {
          case 'ArrowUp':
            if (direction.y === 0) setDirection({ x: 0, y: -SNAKE_SIZE });
            break;
          case 'ArrowDown':
            if (direction.y === 0) setDirection({ x: 0, y: SNAKE_SIZE });
            break;
          case 'ArrowLeft':
            if (direction.x === 0) setDirection({ x: -SNAKE_SIZE, y: 0 });
            break;
          case 'ArrowRight':
            if (direction.x === 0) setDirection({ x: SNAKE_SIZE, y: 0 });
            break;
        }
      }
    },
    [direction, gameActive, gameOver, onClose]
  );

  const checkCollision = useCallback((head: { x: number; y: number }, snakeBody: Array<{ x: number; y: number }>) => {
    if (head.x < 0 || head.x >= GAME_SIZE || head.y < 0 || head.y >= GAME_SIZE) {
      return true;
    }

    for (let i = 1; i < snakeBody.length; i++) {
      if (head.x === snakeBody[i].x && head.y === snakeBody[i].y) {
        return true;
      }
    }

    return false;
  }, []);

  const drawGame = useCallback((ctx: CanvasRenderingContext2D, state: GameState) => {
    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, GAME_SIZE, GAME_SIZE);

    // Draw snake
    ctx.fillStyle = '#4ade80';
    state.snake.forEach(({ x, y }) => {
      ctx.fillRect(x, y, SNAKE_SIZE - 2, SNAKE_SIZE - 2);
    });

    // Draw food
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(state.food.x, state.food.y, SNAKE_SIZE - 2, SNAKE_SIZE - 2);
  }, []);

  const updateGameState = useCallback(() => {
    const currentState = stateRef.current;
    const newSnake = [...currentState.snake];
    const head = {
      x: newSnake[0].x + direction.x,
      y: newSnake[0].y + direction.y,
    };

    if (checkCollision(head, newSnake)) {
      setGameOver(true);
      setGameActive(false);
      return currentState;
    }

    newSnake.unshift(head);
    let newFood = currentState.food;
    let newScore = currentState.score;

    if (head.x === currentState.food.x && head.y === currentState.food.y) {
      newFood = generateFood();
      newScore += 1;
    } else {
      newSnake.pop();
    }

    const newState = {
      snake: newSnake,
      food: newFood,
      score: newScore
    };

    return newState;
  }, [direction, checkCollision, generateFood]);

  const gameLoop = useCallback((timestamp: number) => {
    if (!gameActive || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    if (timestamp - lastUpdateRef.current < 1000 / FRAME_RATE) {
      gameLoopRef.current = requestAnimationFrame(gameLoop);
      return;
    }

    if (!gameOver) {
      const newState = updateGameState();
      setGameState(newState);
      drawGame(ctx, newState);
    }

    lastUpdateRef.current = timestamp;
    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, [gameActive, gameOver, updateGameState, drawGame]);

  useEffect(() => {
    const element = canvasRef.current;
    if (element) {
      element.focus();
    }
    
    window.addEventListener('keydown', handleKeyPress, true);
    return () => {
      window.removeEventListener('keydown', handleKeyPress, true);
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [handleKeyPress]);

  useEffect(() => {
    if (gameActive && !gameOver) {
      gameLoopRef.current = requestAnimationFrame(gameLoop);
      return () => {
        if (gameLoopRef.current) {
          cancelAnimationFrame(gameLoopRef.current);
        }
      };
    }
  }, [gameActive, gameOver, gameLoop]);

  useEffect(() => {
    resetGame();
  }, [resetGame]);

  return (
    <div className="game-container flex flex-col" tabIndex={-1}>
      <div className="game-header mb-4">
        <span className="text-white text-lg">Score: {gameState.score}</span>
        <button onClick={onClose} className="close-button" aria-label="Close game">
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="flex flex-col items-center">
        <canvas
          ref={canvasRef}
          width={GAME_SIZE}
          height={GAME_SIZE}
          className="border border-gray-700 mb-4"
          tabIndex={0}
        />
        <div className="h-[60px] flex items-center justify-center">
          {gameOver ? (
            <div className="text-white text-center">
              <p className="mb-2">Game Over! Final Score: {gameState.score}</p>
              <button
                onClick={resetGame}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded transition-colors"
              >
                Play Again
              </button>
            </div>
          ) : (
            <p className="text-white text-center">Use arrow keys to play</p>
          )}
        </div>
      </div>
    </div>
  );
}