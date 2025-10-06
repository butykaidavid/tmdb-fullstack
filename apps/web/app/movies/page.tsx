import Navigation from '@/components/Navigation'
import MovieSection from '@/components/MovieSection'

export default function MoviesPage() {
  return (
    <div className="min-h-screen bg-tmdb-dark">
      <Navigation />
      
      <main className="pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <h1 className="text-4xl font-bold text-tmdb-text mb-2">Movies</h1>
          <p className="text-tmdb-textSecondary text-lg">
            Discover the latest movies, trending films, and top-rated cinema.
          </p>
        </div>
        
        <div className="space-y-8">
          <MovieSection
            title="Trending Movies"
            endpoint="/api/movies/trending"
            limit={20}
          />
          
          <MovieSection
            title="Popular Movies"
            endpoint="/api/movies/popular"
            limit={20}
          />
          
          <MovieSection
            title="Top Rated Movies"
            endpoint="/api/movies/top-rated"
            limit={20}
          />
          
          <MovieSection
            title="Now Playing"
            endpoint="/api/movies/now-playing"
            limit={20}
          />
          
          <MovieSection
            title="Upcoming Movies"
            endpoint="/api/movies/upcoming"
            limit={20}
          />
        </div>
      </main>
    </div>
  )
}