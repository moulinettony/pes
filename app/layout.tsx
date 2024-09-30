import "./globals.css";
import { ReactNode } from 'react';
import { Head } from 'next/document'; // Import Head for meta tags

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
        <meta name="description" content="A dynamic card game created with Next.js and Tailwind CSS" />
        <title>Card Game</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="antialiased min-h-screen bg-gray-100">
        {children}
      </body>
    </html>
  );
}
