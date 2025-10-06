import MovieCard from './MovieCard'

interface Movie {
  id: number
  title: string
  poster_path?: string
  vote_average?: number
  release_date?: string
  overview?: string
}

interface MovieGridProps {
  movies: Movie[]
  title?: string
  showOverview?: boolean
  className?: string
}

export default function MovieGrid({ movies, title, showOverview = false, className = '' }: MovieGridProps) {
  if (!movies || movies.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <p className="text-gray-500 dark:text-gray-400">No movies found.</p>
      </div>
    )
  }

  return (
    <section className={className}>
      {title && (
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          {title}
        </h2>
      )}
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            showOverview={showOverview}
          />
        ))}
      </div>
    </section>
  )
}