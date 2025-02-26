'use client';

import { useState } from 'react';
import { Gamepad2, KeyRound, Grid3X3, Blocks, X } from 'lucide-react';
import { SnakeGame } from './snake-game';
import { WordleGame } from './wordle-game';
import { MinesweeperGame } from './minesweeper-game';
import { TetrisGame } from './tetris-game';
import { useMediaQuery } from '@/hooks';
import { UI } from '@/constants';

type Game = {
  id: string;
  name: string;
  description: string;
  icon: JSX.Element;
  component: React.ComponentType<{ onClose: () => void }>;
};

const GAMES: Game[] = [
  {
    id: 'snake',
    name: 'Snake',
    description: 'Classic snake game. Use arrow keys to control the snake and eat the food to grow longer.',
    icon: <Gamepad2 className="w-6 h-6" />,
    component: SnakeGame,
  },
  {
    id: 'wordle',
    name: 'Wordle',
    description: 'Guess the five-letter word in six tries. Each guess must be a valid word.',
    icon: <KeyRound className="w-6 h-6" />,
    component: WordleGame,
  },
  {
    id: 'minesweeper',
    name: 'Minesweeper',
    description: 'Clear the minefield without detonating any mines. Flag cells to avoid mines, click to reveal.',
    icon: <Grid3X3 className="w-6 h-6" />,
    component: MinesweeperGame,
  },
  // {
  //   id: 'tetris',
  //   name: 'Tetris',
  //   description: 'Classic block-stacking puzzle game. Clear lines to score points and level up.',
  //   icon: <Blocks className="w-6 h-6" />,
  //   component: TetrisGame,
  // },
];

interface GameMenuProps {
  onClose: () => void;
}

export function GameMenu({ onClose }: GameMenuProps) {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const isMobile = useMediaQuery(`(max-width: ${UI.MOBILE_BREAKPOINT}px)`);

  const handleClose = () => {
    setSelectedGame(null);
    onClose();
  };

  const handleGameSelect = (game: Game) => {
    setSelectedGame(game);
  };

  if (selectedGame) {
    const GameComponent = selectedGame.component;
    return (
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
        <div className={`bg-gray-900 p-4 ${isMobile ? 'sm:p-6' : 'p-6'} rounded-lg shadow-xl w-full max-w-[95vw] sm:max-w-[800px] lg:max-w-[900px] h-[600px] sm:h-[80vh] max-h-[900px] overflow-hidden relative`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-white`}>{selectedGame.name}</h2>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setSelectedGame(null);
              }}
              onTouchEnd={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setSelectedGame(null);
              }}
              className="text-gray-400 hover:text-white transition-colors touch-none p-2"
              aria-label="Close game"
              tabIndex={0}
            >
              <X className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} pointer-events-none`} />
            </button>
          </div>
          <div className="h-[calc(100%-3.5rem)] w-full flex items-center justify-center">
            <GameComponent onClose={() => setSelectedGame(null)} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div className={`bg-gray-900 p-4 ${isMobile ? 'sm:p-6' : 'p-6'} rounded-lg shadow-xl w-full max-w-[95vw] sm:max-w-md`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-white`}>Games</h2>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleClose();
            }}
            onTouchEnd={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleClose();
            }}
            className="text-gray-400 hover:text-white transition-colors touch-none p-2"
            aria-label="Close games menu"
            tabIndex={0}
          >
            <X className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} pointer-events-none`} />
          </button>
        </div>
        <div className="grid gap-3 sm:gap-4 max-h-[60vh] overflow-y-auto">
          {GAMES.map((game) => (
            <button
              key={game.id}
              onClick={() => handleGameSelect(game)}
              className={`bg-gray-800 ${isMobile ? 'p-3' : 'p-4'} rounded-lg text-left hover:bg-gray-700 transition-colors group touch-manipulation`}
              tabIndex={0}
              aria-label={`Play ${game.name}`}
            >
              <div className="flex items-center gap-3">
                <div className="text-gray-400 group-hover:text-white transition-colors">
                  {game.icon}
                </div>
                <div>
                  <h3 className={`font-semibold text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{game.name}</h3>
                  <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-400`}>{game.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}