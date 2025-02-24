import { JetBrains_Mono } from 'next/font/google';
import './styles.css';

const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'] });

export default function RefinitivTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.className}`} style={{ overflow: 'auto', height: '100%', margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
} 