import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PersonCard from '@/components/PersonCard'
import LoadingSpinner from '@/components/LoadingSpinner'
import { Suspense } from 'react'

// Mock data for demonstration
const mockPeople = [
  {
    id: 1,
    name: "Leonardo DiCaprio",
    profile_path: "/wo2hJpn04vbtmh0B9utCFdsQhxM.jpg",
    known_for_department: "Acting",
    known_for: [
      { id: 1, title: "Inception", media_type: "movie" },
      { id: 2, title: "The Wolf of Wall Street", media_type: "movie" },
      { id: 3, title: "Titanic", media_type: "movie" }
    ]
  },
  {
    id: 2,
    name: "Scarlett Johansson",
    profile_path: "/6NsMbJXRlDZuDzatN2akFdGuTvx.jpg",
    known_for_department: "Acting",
    known_for: [
      { id: 4, title: "Black Widow", media_type: "movie" },
      { id: 5, title: "Marriage Story", media_type: "movie" },
      { id: 6, title: "Her", media_type: "movie" }
    ]
  },
  {
    id: 3,
    name: "Christopher Nolan",
    profile_path: "/xuAIuYSmsUzKlUMBFGVZaWsY3DZ.jpg",
    known_for_department: "Directing",
    known_for: [
      { id: 7, title: "Inception", media_type: "movie" },
      { id: 8, title: "The Dark Knight", media_type: "movie" },
      { id: 9, title: "Interstellar", media_type: "movie" }
    ]
  },
  {
    id: 4,
    name: "Margot Robbie",
    profile_path: "/euDPyqLnuwaWMHajcU3oZ9uZezR.jpg",
    known_for_department: "Acting",
    known_for: [
      { id: 10, title: "Barbie", media_type: "movie" },
      { id: 11, title: "I, Tonya", media_type: "movie" },
      { id: 12, title: "The Wolf of Wall Street", media_type: "movie" }
    ]
  },
  {
    id: 5,
    name: "Ryan Gosling",
    profile_path: "/lyUyVARQKhGxaxy0FbPJCQRpiaW.jpg",
    known_for_department: "Acting",
    known_for: [
      { id: 13, title: "La La Land", media_type: "movie" },
      { id: 14, title: "Blade Runner 2049", media_type: "movie" },
      { id: 15, title: "The Notebook", media_type: "movie" }
    ]
  },
  {
    id: 6,
    name: "Greta Gerwig",
    profile_path: "/6MKGAZYhEJVlMgVrfJgyKejzCn7.jpg",
    known_for_department: "Directing",
    known_for: [
      { id: 16, title: "Barbie", media_type: "movie" },
      { id: 17, title: "Lady Bird", media_type: "movie" },
      { id: 18, title: "Little Women", media_type: "movie" }
    ]
  }
]

async function PeopleContent() {
  // In a real app, you would fetch from your API
  // const people = await api('/api/people/popular')
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Popular People
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Discover the most popular actors, directors, and crew members
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <select className="input max-w-xs">
            <option value="popularity">Sort by Popularity</option>
            <option value="name">Sort by Name</option>
            <option value="known_for">Sort by Known For</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {mockPeople.map((person) => (
          <PersonCard key={person.id} person={person} />
        ))}
      </div>
    </div>
  )
}

export default function PeoplePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Suspense fallback={<LoadingSpinner size="lg" className="py-12" />}>
            <PeopleContent />
          </Suspense>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}