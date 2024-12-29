import "./globals.css";
import { ReactNode } from "react";
import Link from 'next/link';

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="A dynamic card game created with Next.js"
        />
        <title>Card Game</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="antialiased min-h-screen bg-gray-100">
        <nav className="bg-black p-4 text-white drop-shadow-[2px_2px_3px_black] fixed top-0 z-[9] w-screen">
          <div className="max-w-[1200px] mx-auto flex justify-center items-center">
            <div className="flex gap-4">
              <Link href="/" className="hover:underline">
                Draw
              </Link>
              <Link href="/stats" className="hover:underline">
                Table
              </Link>
              <Link href="/play" className="hover:underline">
                Game
              </Link>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
