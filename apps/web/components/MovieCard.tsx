'use client'

import Link from 'next/link'
import { Star, Calendar } from 'lucide-react'
import Image from 'next/image'

interface MovieCardProps {
  movie: {
    id: number
    tmdb_id: number
    title: string
    poster_path: string
    release_date: string
    vote_average: number
    vote_count: number
  }
  priority?: boolean
}

export default function MovieCard({ movie, priority = false }: MovieCardProps) {
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'
  
  return (
    <Link 
      href={`/movie/${movie.tmdb_id}`}
      className="group block bg-tmdb-light/30 hover:bg-tmdb-light/50 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        {movie.poster_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            priority={priority}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        ) : (
          <div className="w-full h-full bg-tmdb-light/20 flex items-center justify-center">
            <span className="text-tmdb-textSecondary text-sm">No Image</span>
          </div>
        )}
        
        {/* Rating Badge */}
        <div className="absolute top-2 right-2 bg-tmdb-dark/80 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
          <Star className="w-3 h-3 text-yellow-400 fill-current" />
          <span className="text-xs font-semibold text-white">
            {movie.vote_average.toFixed(1)}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-tmdb-text group-hover:text-white transition-colors duration-200 line-clamp-2 mb-2">
          {movie.title}
        </h3>
        
        <div className="flex items-center justify-between text-sm text-tmdb-textSecondary">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{releaseYear}</span>
          </div>
          
          <span className="text-xs">
            {movie.vote_count.toLocaleString()} votes
          </span>
        </div>
      </div>
    </Link>
  )
}