import Head from 'next/head';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Pulse.gg - Student Forum</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex-grow container">
        {children}
      </main>

      <footer className="bg-gray-200 mt-auto">
        <div className="container mx-auto px-4 py-6 text-center">
          © 2023 Pulse.gg. All rights reserved.
        </div>
      </footer>
    </div>
  );
}