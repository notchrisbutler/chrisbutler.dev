'use client';

import { useCallback, useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { fetchWordleWord, VALID_WORDS } from '@/lib/games/wordle';

const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;

type GameState = {
  guesses: string[];
  currentGuess: string;
  solution: string;
  gameOver: boolean;
  won: boolean;
};

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']
];

export function WordleGame({ onClose }: { onClose: () => void }) {
  const [gameState, setGameState] = useState<GameState>({
    guesses: [],
    currentGuess: '',
    solution: '',
    gameOver: false,
    won: false,
  });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initGame = async () => {
      try {
        const word = await fetchWordleWord();
        setGameState(prev => ({ ...prev, solution: word }));
      } catch (error) {
        console.error('Failed to initialize game:', error);
      } finally {
        setLoading(false);
      }
    };
    initGame();
  }, []);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (gameState.gameOver) return;
    
    if (event.key === 'Escape') {
      onClose();
      return;
    }

    setError('');

    if (event.key === 'Backspace') {
      setGameState(prev => ({
        ...prev,
        currentGuess: prev.currentGuess.slice(0, -1)
      }));
      return;
    }

    if (event.key === 'Enter') {
      const currentGuessLower = gameState.currentGuess.toLowerCase();
      
      if (currentGuessLower.length !== WORD_LENGTH) {
        setError(`Word must be ${WORD_LENGTH} letters (${currentGuessLower.length}/${WORD_LENGTH})`);
        return;
      }

      // Check if the word is in our word list
      const isValidWord = VALID_WORDS.includes(currentGuessLower);
      if (!isValidWord) {
        setError('Not a valid word');
        return;
      }

      setGameState(prev => {
        const newGuesses = [...prev.guesses, currentGuessLower];
        const won = currentGuessLower === prev.solution;
        const gameOver = won || newGuesses.length === MAX_ATTEMPTS;

        return {
          ...prev,
          guesses: newGuesses,
          currentGuess: '',
          gameOver,
          won,
        };
      });
      return;
    }

    if (/^[a-zA-Z]$/.test(event.key)) {
      setGameState(prev => {
        const newGuess = prev.currentGuess + event.key.toLowerCase();
        if (prev.currentGuess.length < WORD_LENGTH) {
          return {
            ...prev,
            currentGuess: newGuess
          };
        }
        return prev;
      });
    }
  }, [gameState, onClose]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const getLetterStyle = (letter: string, index: number, guess: string) => {
    if (!gameState.solution) return 'bg-gray-800';
    
    if (letter === gameState.solution[index]) {
      return 'bg-green-600';
    }
    if (gameState.solution.includes(letter)) {
      return 'bg-yellow-600';
    }
    return 'bg-gray-700';
  };

  const handleVirtualKeyPress = (key: string) => {
    if (key === '⌫') {
      handleKeyPress({ key: 'Backspace' } as KeyboardEvent);
    } else if (key === 'ENTER') {
      handleKeyPress({ key: 'Enter' } as KeyboardEvent);
    } else {
      handleKeyPress({ key } as KeyboardEvent);
    }
  };

  const getKeyStyle = (key: string) => {
    if (!gameState.solution) return 'bg-gray-700';
    
    // For letter keys, check their status in previous guesses
    if (key !== 'ENTER' && key !== '⌫') {
      const keyLower = key.toLowerCase();
      let bestStatus = '';

      for (const guess of gameState.guesses) {
        for (let i = 0; i < guess.length; i++) {
          if (guess[i] === keyLower) {
            if (guess[i] === gameState.solution[i]) {
              return 'bg-green-600'; // Exact match takes precedence
            } else if (gameState.solution.includes(guess[i])) {
              bestStatus = 'bg-yellow-600'; // Wrong position
            } else if (!bestStatus) {
              bestStatus = 'bg-gray-600'; // Not in word
            }
          }
        }
      }
      
      return bestStatus || 'bg-gray-700';
    }

    return 'bg-gray-700'; // Default for special keys
  };

  if (loading) {
    return (
      <div className="game-container w-full h-full flex items-center justify-center">
        <div className="text-white text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="game-container w-full h-full flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center h-full w-full max-w-[95%]">
        <div className="grid gap-1 mb-4">
          {Array.from({ length: MAX_ATTEMPTS }).map((_, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-5 gap-1">
              {Array.from({ length: WORD_LENGTH }).map((_, colIndex) => {
                const guess = gameState.guesses[rowIndex] || '';
                const letter = guess[colIndex] || '';
                const currentGuessRow = rowIndex === gameState.guesses.length;
                const currentLetter = currentGuessRow ? gameState.currentGuess[colIndex] || '' : letter;
                
                return (
                  <div
                    key={colIndex}
                    className={`
                      w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center
                      text-white text-lg sm:text-2xl font-bold uppercase
                      border-2 ${currentGuessRow ? 'border-gray-600' : 'border-transparent'}
                      ${guess ? getLetterStyle(letter, colIndex, guess) : 'bg-gray-800'}
                    `}
                  >
                    {currentLetter}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {error && (
          <div className="text-red-500 text-center mb-4">{error}</div>
        )}

        {/* Virtual Keyboard - Mobile Only */}
        <div className="sm:hidden w-full max-w-[360px] mt-2">
          {KEYBOARD_ROWS.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-1 mb-1">
              {row.map((key) => {
                const isSpecialKey = key === 'ENTER' || key === '⌫';
                return (
                  <button
                    key={key}
                    onClick={() => handleVirtualKeyPress(key)}
                    className={`
                      ${isSpecialKey ? 'w-14' : 'w-7'} 
                      h-10
                      ${getKeyStyle(key)}
                      text-white font-bold rounded
                      flex items-center justify-center
                      text-xs
                      hover:opacity-90 active:opacity-75
                      transition-all duration-150
                      touch-manipulation
                    `}
                  >
                    {key}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {gameState.gameOver && (
          <div className="text-white text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800/90 p-4 rounded-lg shadow-lg backdrop-blur-sm w-[280px]">
            <p className="mb-3">
              {gameState.won ? 'Congratulations!' : `The word was: ${gameState.solution}`}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded transition-colors w-full"
            >
              Play Again
            </button>
          </div>
        )}

        <div className="text-center text-gray-400 mt-4">
          <p className="hidden sm:block">Use your keyboard to play</p>
          <p className="sm:hidden">Use the virtual keyboard above</p>
          <p className="text-sm mt-1">Type letters, Enter to submit, Backspace to delete</p>
        </div>
      </div>
    </div>
  );
}