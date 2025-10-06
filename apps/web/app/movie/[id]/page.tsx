import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LoadingSpinner from '@/components/LoadingSpinner'
import { api } from '@/lib/api'
import { Suspense } from 'react'
import Image from 'next/image'
import { StarIcon, CalendarIcon, ClockIcon, PlayIcon } from '@heroicons/react/24/solid'
import { format } from 'date-fns'

interface MoviePageProps {
  params: {
    id: string
  }
}

async function MovieDetails({ id }: { id: string }) {
  try {
    const movie = await api<any>(`/api/movie/${id}`)
    
    const posterUrl = movie.poster_path 
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : '/placeholder-movie.jpg'
    
    const backdropUrl = movie.backdrop_path
      ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
      : null

    const releaseDate = movie.release_date ? new Date(movie.release_date) : null
    const runtime = movie.runtime || 0
    const hours = Math.floor(runtime / 60)
    const minutes = runtime % 60

    return (
      <div className="space-y-8">
        {/* Hero Section with Backdrop */}
        <div className="relative">
          {backdropUrl && (
            <div className="absolute inset-0 z-0">
              <Image
                src={backdropUrl}
                alt={movie.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/60"></div>
            </div>
          )}
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Poster */}
              <div className="lg:col-span-1">
                <div className="sticky top-8">
                  <Image
                    src={posterUrl}
                    alt={movie.title}
                    width={500}
                    height={750}
                    className="w-full max-w-sm mx-auto rounded-xl shadow-2xl"
                    priority
                  />
                </div>
              </div>
              
              {/* Movie Info */}
              <div className="lg:col-span-2 text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-shadow-lg">
                  {movie.title}
                  {releaseDate && (
                    <span className="text-2xl md:text-3xl font-normal text-gray-300 ml-2">
                      ({releaseDate.getFullYear()})
                    </span>
                  )}
                </h1>
                
                {movie.tagline && (
                  <p className="text-xl text-gray-300 italic mb-6 text-shadow">
                    {movie.tagline}
                  </p>
                )}
                
                {/* Rating and Meta Info */}
                <div className="flex flex-wrap items-center gap-6 mb-6">
                  {movie.vote_average > 0 && (
                    <div className="flex items-center space-x-2 bg-black/50 rounded-full px-4 py-2">
                      <StarIcon className="w-5 h-5 text-yellow-400" />
                      <span className="font-semibold">{movie.vote_average.toFixed(1)}</span>
                      <span className="text-gray-300">/ 10</span>
                    </div>
                  )}
                  
                  {releaseDate && (
                    <div className="flex items-center space-x-2 bg-black/50 rounded-full px-4 py-2">
                      <CalendarIcon className="w-5 h-5 text-primary-400" />
                      <span>{format(releaseDate, 'MMM dd, yyyy')}</span>
                    </div>
                  )}
                  
                  {runtime > 0 && (
                    <div className="flex items-center space-x-2 bg-black/50 rounded-full px-4 py-2">
                      <ClockIcon className="w-5 h-5 text-green-400" />
                      <span>{hours}h {minutes}m</span>
                    </div>
                  )}
                </div>
                
                {/* Genres */}
                {movie.genres && movie.genres.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {movie.genres.map((genre: any) => (
                      <span
                        key={genre.id}
                        className="bg-primary-600/80 text-white px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}
                
                {/* Overview */}
                {movie.overview && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Overview</h2>
                    <p className="text-lg leading-relaxed text-gray-200">
                      {movie.overview}
                    </p>
                  </div>
                )}
                
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <button className="btn-primary flex items-center space-x-2">
                    <PlayIcon className="w-5 h-5" />
                    <span>Watch Trailer</span>
                  </button>
                  <button className="btn-secondary">
                    Add to Watchlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Additional Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Cast Section */}
              <section>
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                  Cast
                </h2>
                <div className="text-gray-600 dark:text-gray-400">
                  Cast information will be loaded from the API
                </div>
              </section>
              
              {/* Reviews Section */}
              <section>
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                  Reviews
                </h2>
                <div className="text-gray-600 dark:text-gray-400">
                  Reviews will be loaded from the API
                </div>
              </section>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="card p-6 space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Status
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {movie.status || 'Released'}
                  </p>
                </div>
                
                {movie.budget > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Budget
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      ${movie.budget.toLocaleString()}
                    </p>
                  </div>
                )}
                
                {movie.revenue > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Revenue
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      ${movie.revenue.toLocaleString()}
                    </p>
                  </div>
                )}
                
                {movie.original_language && (
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Original Language
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {movie.original_language.toUpperCase()}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error fetching movie:', error)
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg">
          Error loading movie details. Please try again.
        </p>
      </div>
    )
  }
}

export default function MoviePage({ params }: MoviePageProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <Suspense fallback={<LoadingSpinner size="lg" className="py-12" />}>
          <MovieDetails id={params.id} />
        </Suspense>
      </main>
      
      <Footer />
    </div>
  )
}