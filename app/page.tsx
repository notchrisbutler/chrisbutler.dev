'use client';

import { Github, Linkedin, GamepadIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { GameMenu } from '@/components/games/game-menu';
import Script from 'next/script';

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
    <>
      <Script id="structured-data" type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Chris Butler',
          jobTitle: 'Software Engineer',
          url: 'https://chrisbutler.dev',
          sameAs: [
            'https://github.com/notchrisbutler',
            'https://linkedin.com/in/imchrisbutler'
          ],
          knowsAbout: [
            'Python',
            'Next.js',
            'React',
            'TypeScript',
            'JavaScript',
            'Prompt Engineering',
            'AI Development',
            'Web Development'
          ],
          description: 'Software Engineer specializing in Python, Next.js, and Prompt Engineering. Experienced in building modern web applications and AI solutions.'
        })}
      </Script>

      <main className="h-screen w-screen bg-background flex items-center justify-center p-4 overflow-hidden relative" role="main">
        <article className="text-center space-y-2 sm:space-y-3 mb-6 max-w-[90vw]">
          <header>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-semibold tracking-tight text-foreground font-mono">
              Chris Butler
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-mono">
              Software Engineer
            </p>
          </header>
          <nav className="flex items-center justify-center space-x-8 sm:space-x-10 text-muted-foreground pt-4" aria-label="Social Links">
            <a
              href="https://github.com/notchrisbutler"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors touch-manipulation"
              aria-label="GitHub Profile"
              role="button"
              tabIndex={0}
            >
              <Github className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
            <a
              href="https://linkedin.com/in/imchrisbutler"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors touch-manipulation"
              aria-label="LinkedIn Profile"
              role="button"
              tabIndex={0}
            >
              <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
            <button
              onClick={() => setShowGameMenu(true)}
              className="hover:text-foreground transition-colors touch-manipulation sm:hidden"
              aria-label="Open Games Menu"
              tabIndex={0}
            >
              <GamepadIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </nav>
        </article>

        <button
          onClick={() => setShowGameMenu(true)}
          className="absolute bottom-4 right-4 p-2 rounded-full bg-background/5 hover:bg-background/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-foreground/20 touch-manipulation hidden sm:block"
          aria-label="Open Games Menu"
          tabIndex={0}
        >
          <GamepadIcon className="w-4 h-4 text-foreground/20 hover:text-foreground/40 transition-colors duration-200" />
        </button>

        {showGameMenu && <GameMenu onClose={() => setShowGameMenu(false)} />}
      </main>
    </>
  );
}