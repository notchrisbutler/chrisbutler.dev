import { Inter } from 'next/font/google';
import './styles.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Earmark: Budget Privately',
  description: 'Simple, Private Money Plan - Master your finances with Earmark',
};

export default function EarmarkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="earmark-container">
      {children}
    </div>
  );
} 