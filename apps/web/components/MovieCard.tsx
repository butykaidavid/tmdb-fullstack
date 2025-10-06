'use client'

import Link from 'next/link'
import Image from 'next/image'
import { StarIcon } from '@heroicons/react/24/solid'

interface Movie {
  id: number
  title: string
  poster_path?: string
  vote_average?: number
  release_date?: string
  overview?: string
}

interface MovieCardProps {
  movie: Movie
  size?: 'sm' | 'md' | 'lg'
  showOverview?: boolean
}

export default function MovieCard({ movie, size = 'md', showOverview = false }: MovieCardProps) {
  const sizeClasses = {
    sm: 'w-32',
    md: 'w-48',
    lg: 'w-64'
  }

  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/placeholder-movie.jpg'

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : null

  return (
    <div className={`movie-card ${sizeClasses[size]} flex-shrink-0`}>
      <Link href={`/movie/${movie.id}`}>
        <div className="relative">
          <Image
            src={posterUrl}
            alt={movie.title}
            width={500}
            height={750}
            className="movie-poster"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = '/placeholder-movie.jpg'
            }}
          />
          
          {/* Rating Badge */}
          {movie.vote_average && movie.vote_average > 0 && (
            <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
              <StarIcon className="w-3 h-3 text-yellow-400" />
              <span className="text-white text-xs font-medium">
                {movie.vote_average.toFixed(1)}
              </span>
            </div>
          )}
          
          {/* Gradient overlay for better text readability */}
          <div className="gradient-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Title overlay on hover */}
          <div className="absolute bottom-0 left-0 right-0 p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h3 className="font-semibold text-sm leading-tight text-shadow-lg">
              {movie.title}
            </h3>
            {releaseYear && (
              <p className="text-xs text-gray-300 mt-1">{releaseYear}</p>
            )}
          </div>
        </div>
      </Link>
      
      {/* Movie info below poster */}
      <div className="p-3">
        <h3 className="font-semibold text-sm leading-tight mb-1 line-clamp-2">
          {movie.title}
        </h3>
        {releaseYear && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
            {releaseYear}
          </p>
        )}
        
        {showOverview && movie.overview && (
          <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-3">
            {movie.overview}
          </p>
        )}
      </div>
    </div>
  )
}