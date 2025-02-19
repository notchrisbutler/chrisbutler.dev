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

  if (loading) {
    return (
      <div className="game-container">
        <div className="game-header mb-4">
          <span className="text-white text-lg">Wordle</span>
          <button onClick={onClose} className="close-button" aria-label="Close game">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="text-white text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="game-container" style={{ width: '350px' }}>
      <div className="game-header mb-4">
        <span className="text-white text-lg">Wordle</span>
        <button onClick={onClose} className="close-button" aria-label="Close game">
          <X className="w-4 h-4" />
        </button>
      </div>

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
                    w-14 h-14 flex items-center justify-center
                    text-white text-2xl font-bold uppercase
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

      <div className="h-[60px] flex items-center justify-center">
        {gameState.gameOver && (
          <div className="text-center space-y-2">
            <p className="text-white">
              {gameState.won ? 'Congratulations!' : `The word was: ${gameState.solution}`}
            </p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors"
            >
              Back to Menu
            </button>
          </div>
        )}
      </div>

      <div className="text-center text-gray-400 mt-4">
        <p>Use your keyboard to play:</p>
        <p className="text-sm mt-1">Type letters, Enter to submit, Backspace to delete</p>
      </div>
    </div>
  );
}