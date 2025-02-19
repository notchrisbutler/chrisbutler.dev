'use client';

import { Github, Linkedin, GamepadIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { GameMenu } from '@/components/games/game-menu';

const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

export default function Home() {
  const { setTheme } = useTheme();
  const [keySequence, setKeySequence] = useState<string[]>([]);
  const [showGameMenu, setShowGameMenu] = useState(false);

  useEffect(() => {
    setTheme('dark');
  }, [setTheme]);

  const handleKeyPress = (event: KeyboardEvent) => {
    if (!showGameMenu) {
      setKeySequence((prev) => {
        const newSequence = [...prev, event.key].slice(-KONAMI_CODE.length);
        if (JSON.stringify(newSequence) === JSON.stringify(KONAMI_CODE)) {
          setShowGameMenu(true);
          return [];
        }
        return newSequence;
      });
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showGameMenu]);

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-light tracking-tight text-foreground font-mono">
          Chris Butler
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground font-mono">
          Software Engineer
        </p>
        <div className="flex items-center justify-center space-x-6 text-muted-foreground">
          <a
            href="https://github.com/notchrisbutler"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
            aria-label="GitHub Profile"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href="https://linkedin.com/in/imchrisbutler"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <button
            onClick={() => setShowGameMenu(true)}
            className="hover:text-foreground transition-colors"
            aria-label="Open Games Menu"
          >
            <GamepadIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      {showGameMenu && <GameMenu onClose={() => setShowGameMenu(false)} />}
    </main>
  );
}