import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'MovieDB - Discover Movies & TV Shows',
  description: 'Discover movies, TV shows, and celebrities. Find ratings, reviews, and recommendations.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-tmdb-dark text-tmdb-text min-h-screen">
        {children}
      </body>
    </html>
  );
}
