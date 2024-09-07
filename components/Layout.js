import Head from 'next/head';
import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';

export default function Layout({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark' : ''}`}>
      <Head>
        <title>Pulse.gg - Student Forum</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-white bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-90 shadow-lg backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <h1 className="text-2xl font-bold cursor-pointer">
              <span className="text-blue-600 dark:text-blue-400">Pulse</span>
              <span className="text-indigo-600 dark:text-indigo-400">.</span>
              <span className="text-purple-600 dark:text-purple-400">GG</span>
            </h1>
          </Link>
          <Button variant="ghost" onClick={() => setDarkMode(!darkMode)} className="text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300">
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-gray-200 dark:bg-gray-700 mt-auto">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600 dark:text-gray-300">
          © 2023 Pulse.gg. All rights reserved.
        </div>
      </footer>
    </div>
  );
}