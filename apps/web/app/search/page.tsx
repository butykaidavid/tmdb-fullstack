import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MovieCard from '@/components/MovieCard'
import PersonCard from '@/components/PersonCard'
import LoadingSpinner from '@/components/LoadingSpinner'
import { api } from '@/lib/api'
import { Suspense } from 'react'

interface SearchPageProps {
  searchParams: {
    q?: string
  }
}

async function SearchResults({ query }: { query: string }) {
  if (!query) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          Enter a search term to find movies, TV shows, and people.
        </p>
      </div>
    )
  }

  try {
    const data = await api<any>(`/api/search?q=${encodeURIComponent(query)}`)
    
    return (
      <div className="space-y-8">
        {/* Movies Section */}
        {data.movies && data.movies.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Movies ({data.movies.length})
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {data.movies.map((movie: any) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </section>
        )}

        {/* People Section */}
        {data.people && data.people.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              People ({data.people.length})
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {data.people.map((person: any) => (
                <PersonCard key={person.id} person={person} />
              ))}
            </div>
          </section>
        )}

        {/* No Results */}
        {(!data.movies || data.movies.length === 0) && (!data.people || data.people.length === 0) && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No results found for "{query}". Try a different search term.
            </p>
          </div>
        )}
      </div>
    )
  } catch (error) {
    console.error('Search error:', error)
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg">
          An error occurred while searching. Please try again.
        </p>
      </div>
    )
  }
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ''

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {query && (
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Search Results for "{query}"
              </h1>
            </div>
          )}
          
          <Suspense fallback={<LoadingSpinner size="lg" className="py-12" />}>
            <SearchResults query={query} />
          </Suspense>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}