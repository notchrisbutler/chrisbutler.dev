'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { X, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { GameNotification } from './game-notification';
import { useLocalStorage } from '@/hooks';

const SNAKE_SIZE = 20;
const GAME_SIZE = 600;
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
  const [highScore, setHighScore] = useLocalStorage<number>('snake-high-score', 0);
  const [direction, setDirection] = useState({ x: 0, y: 0 });
  const [gameActive, setGameActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<number>();
  const lastUpdateRef = useRef<number>(0);
  const stateRef = useRef(gameState);
  const isProcessingMove = useRef(false);
  const nextDirection = useRef({ x: 0, y: 0 });

  // Keep the ref in sync with the state
  useEffect(() => {
    stateRef.current = gameState;
  }, [gameState]);

  const generateFood = useCallback(() => {
    // Initialize with values that will be immediately overwritten
    let x: number = 0;
    let y: number = 0;
    let validPosition = false;

    while (!validPosition) {
      x = Math.floor(Math.random() * (GAME_SIZE / SNAKE_SIZE)) * SNAKE_SIZE;
      y = Math.floor(Math.random() * (GAME_SIZE / SNAKE_SIZE)) * SNAKE_SIZE;
      
      // Check if the position overlaps with any snake segment
      validPosition = !stateRef.current.snake.some(
        segment => segment.x === x && segment.y === y
      );
    }

    return { x, y };
  }, []);

  const resetGame = useCallback(() => {
    // Create initial snake position
    const initialSnake = [{ x: 200, y: 200 }];
    
    // Generate initial food position that's not on the snake
    const initialState = {
      snake: initialSnake,
      food: generateFood(),
      score: 0
    };
    setGameState(initialState);
    stateRef.current = initialState;
    setDirection({ x: 0, y: 0 });
    nextDirection.current = { x: 0, y: 0 };
    isProcessingMove.current = false;
    setGameActive(true);
    setGameOver(false);
    lastUpdateRef.current = 0;
  }, [generateFood]);

  const handleDirectionChange = useCallback((newDirection: { x: number; y: number }) => {
    if (gameActive && !gameOver) {
      const currentDirection = isProcessingMove.current ? nextDirection.current : direction;
      
      // Prevent 180-degree turns
      if (
        (newDirection.y !== 0 && currentDirection.y !== -newDirection.y) || // Allow vertical movement if not reversing
        (newDirection.x !== 0 && currentDirection.x !== -newDirection.x)    // Allow horizontal movement if not reversing
      ) {
        if (isProcessingMove.current) {
          nextDirection.current = newDirection;
        } else {
          setDirection(newDirection);
          isProcessingMove.current = true;
        }
      }
    }
  }, [direction, gameActive, gameOver]);

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
            handleDirectionChange({ x: 0, y: -SNAKE_SIZE });
            break;
          case 'ArrowDown':
            handleDirectionChange({ x: 0, y: SNAKE_SIZE });
            break;
          case 'ArrowLeft':
            handleDirectionChange({ x: -SNAKE_SIZE, y: 0 });
            break;
          case 'ArrowRight':
            handleDirectionChange({ x: SNAKE_SIZE, y: 0 });
            break;
        }
      }
    },
    [gameActive, gameOver, onClose, handleDirectionChange]
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
      // Update high score if current score is higher
      if (currentState.score > highScore) {
        setHighScore(currentState.score);
      }
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

    // Movement has been processed, we can now apply the next direction if one exists
    isProcessingMove.current = false;
    if (nextDirection.current.x !== 0 || nextDirection.current.y !== 0) {
      setDirection(nextDirection.current);
      isProcessingMove.current = true;
      nextDirection.current = { x: 0, y: 0 };
    }

    const newState = {
      snake: newSnake,
      food: newFood,
      score: newScore
    };

    return newState;
  }, [direction, checkCollision, generateFood, highScore, setHighScore]);

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

  const DirectionButton = ({ 
    icon: Icon, 
    direction: dir,
    label
  }: { 
    icon: typeof ArrowUp;
    direction: { x: number; y: number };
    label: string;
  }) => {
    const [isActive, setIsActive] = useState(false);
    
    return (
      <button
        onTouchStart={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsActive(true);
          handleDirectionChange(dir);
        }}
        onTouchEnd={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsActive(false);
        }}
        onTouchCancel={() => setIsActive(false)}
        className={`w-14 h-14 rounded-lg flex items-center justify-center transition-colors touch-manipulation select-none ${
          isActive ? 'bg-gray-500' : 'bg-gray-700'
        }`}
        aria-label={label}
        role="button"
        tabIndex={0}
      >
        <Icon className="w-8 h-8 text-white pointer-events-none" />
      </button>
    );
  };

  return (
    <div className="game-container flex flex-col items-center w-full h-full" tabIndex={-1}>
      <div className="flex flex-col items-center justify-center h-full w-full max-w-[95%]">
        {gameOver && (
          <GameNotification
            message={`Game Over! Final Score: ${gameState.score}`}
            buttonText="Play Again"
            onButtonClick={resetGame}
          />
        )}

        <div className="mb-4 text-white text-xl sm:text-2xl">Score: {gameState.score}</div>
        <div className="relative w-full max-w-[400px] sm:max-w-[600px] aspect-square">
          <canvas
            ref={canvasRef}
            width={GAME_SIZE}
            height={GAME_SIZE}
            className="border border-gray-700 w-full h-full"
            tabIndex={0}
          />
        </div>
        
        <div className="mt-6 sm:hidden"> {/* Mobile controls */}
          <div className="grid grid-cols-3 gap-x-4 gap-y-6 w-[220px]">
            <div className="col-start-2">
              <DirectionButton
                icon={ArrowUp}
                direction={{ x: 0, y: -SNAKE_SIZE }}
                label="Move Up"
              />
            </div>
            <div className="col-start-1 row-start-2">
              <DirectionButton
                icon={ArrowLeft}
                direction={{ x: -SNAKE_SIZE, y: 0 }}
                label="Move Left"
              />
            </div>
            <div className="col-start-2 row-start-2">
              <DirectionButton
                icon={ArrowDown}
                direction={{ x: 0, y: SNAKE_SIZE }}
                label="Move Down"
              />
            </div>
            <div className="col-start-3 row-start-2">
              <DirectionButton
                icon={ArrowRight}
                direction={{ x: SNAKE_SIZE, y: 0 }}
                label="Move Right"
              />
            </div>
          </div>
        </div>

        <div className="h-[60px] flex items-center justify-center mt-4">
          <p className="text-white text-center hidden sm:block">Use arrow keys to play</p>
        </div>
      </div>
    </div>
  );
}