import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MovieGrid from '@/components/MovieGrid'
import LoadingSpinner from '@/components/LoadingSpinner'
import { Suspense } from 'react'

// Mock TV show data
const mockTVShows = [
  {
    id: 1,
    title: "Breaking Bad",
    poster_path: "/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
    vote_average: 9.5,
    release_date: "2008-01-20",
    overview: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine."
  },
  {
    id: 2,
    title: "Game of Thrones",
    poster_path: "/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg",
    vote_average: 9.3,
    release_date: "2011-04-17",
    overview: "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia."
  },
  {
    id: 3,
    title: "The Sopranos",
    poster_path: "/rTc7ZXdroqjkKivFPvCPX0Ru7uw.jpg",
    vote_average: 9.2,
    release_date: "1999-01-10",
    overview: "New Jersey mob boss Tony Soprano deals with personal and professional issues in his home and business life."
  },
  {
    id: 4,
    title: "The Wire",
    poster_path: "/4lbclFySvugI51fwsyxBTOm4DqK.jpg",
    vote_average: 9.3,
    release_date: "2002-06-02",
    overview: "The Baltimore drug scene, as seen through the eyes of drug dealers and law enforcement."
  },
  {
    id: 5,
    title: "Stranger Things",
    poster_path: "/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
    vote_average: 8.7,
    release_date: "2016-07-15",
    overview: "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces."
  },
  {
    id: 6,
    title: "The Crown",
    poster_path: "/1M876KPjulVwppEpldhdc8V4o68.jpg",
    vote_average: 8.6,
    release_date: "2016-11-04",
    overview: "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the 20th century."
  }
]

async function TVShowsContent() {
  // In a real app, you would fetch from your API
  // const tvShows = await api('/api/tv/popular')
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Popular TV Shows
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Discover the most popular TV shows right now
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <select className="input max-w-xs">
            <option value="popularity">Sort by Popularity</option>
            <option value="rating">Sort by Rating</option>
            <option value="first_air_date">Sort by Air Date</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>
      </div>
      
      <MovieGrid movies={mockTVShows} showOverview />
    </div>
  )
}

export default function TVShowsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Suspense fallback={<LoadingSpinner size="lg" className="py-12" />}>
            <TVShowsContent />
          </Suspense>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}