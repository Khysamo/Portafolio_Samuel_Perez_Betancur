import type { Metadata } from 'next'
import { Orbitron, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LangProvider } from '@/hooks/use-language'
import './globals.css'

const orbitron = Orbitron({ 
  subsets: ["latin"],
  variable: '--font-orbitron',
  display: 'swap'
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Samuel Perez Betancur | Game Developer',
  description: 'Game Developer creating immersive worlds and interactive experiences. Portfolio showcasing creative projects and game development skills.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${orbitron.variable} ${inter.variable} font-sans antialiased bg-black text-white`} suppressHydrationWarning>
        <LangProvider>
          {children}
        </LangProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
