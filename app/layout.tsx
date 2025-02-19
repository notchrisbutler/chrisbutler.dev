import './globals.css';
import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';

const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Chris Butler | Software Engineer',
  description: 'Personal website of Chris Butler, a Software Engineer specializing in Python, Open Source Intelligence gathering, and big data management.. Experienced in building modern web applications and AI solutions.',
  keywords: 'Chris Butler, Software Engineer, Python Developer, Next.js, React, AI, Web Development, Full Stack Developer',
  authors: [{ name: 'Chris Butler' }],
  creator: 'Chris Butler',
  publisher: 'Chris Butler',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://chrisbutler.dev',
    siteName: 'Chris Butler',
    title: 'Chris Butler | Software Engineer',
    description: 'Personal website of Chris Butler, a Software Engineer specializing in Python, Open Source Intelligence gathering, and big data management.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chris Butler | Software Engineer',
    description: 'Software Engineer specializing in Python, Next.js, and Prompt Engineering',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  verification: {
    google: 'x-dummy-google-site-verification',
  },
  alternates: {
    canonical: 'https://chrisbutler.dev',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={`${jetbrainsMono.className} overflow-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}