'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Play, Info, Star } from 'lucide-react'
import { api } from '@/lib/api'

interface Movie {
  id: number
  tmdb_id: number
  title: string
  overview: string
  backdrop_path: string
  poster_path: string
  release_date: string
  vote_average: number
  vote_count: number
}

export default function HeroSection() {
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedMovie = async () => {
      try {
        const movies = await api<Movie[]>('/api/movies/trending?limit=1')
        if (movies.length > 0) {
          setFeaturedMovie(movies[0])
        }
      } catch (error) {
        console.error('Error fetching featured movie:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedMovie()
  }, [])

  if (loading) {
    return (
      <div className="relative h-[70vh] bg-tmdb-darker">
        <div className="absolute inset-0 bg-gradient-to-r from-tmdb-dark via-tmdb-dark/50 to-transparent" />
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="animate-pulse">
            <div className="h-12 bg-tmdb-light/30 rounded w-96 mb-4"></div>
            <div className="h-4 bg-tmdb-light/20 rounded w-64"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!featuredMovie) {
    return null
  }

  return (
    <div className="relative h-[70vh] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path})`
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-tmdb-dark via-tmdb-dark/80 to-transparent" />
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 text-shadow">
              {featuredMovie.title}
            </h1>
            
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center space-x-1">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="text-white font-semibold">
                  {featuredMovie.vote_average.toFixed(1)}
                </span>
                <span className="text-tmdb-textSecondary">
                  ({featuredMovie.vote_count.toLocaleString()} votes)
                </span>
              </div>
              <span className="text-tmdb-textSecondary">
                {new Date(featuredMovie.release_date).getFullYear()}
              </span>
            </div>
            
            <p className="text-lg text-tmdb-textSecondary mb-8 leading-relaxed">
              {featuredMovie.overview}
            </p>
            
            <div className="flex space-x-4">
              <Link
                href={`/movie/${featuredMovie.tmdb_id}`}
                className="flex items-center space-x-2 bg-tmdb-accent hover:bg-tmdb-accent/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                <Play className="w-5 h-5" />
                <span>Watch Now</span>
              </Link>
              
              <Link
                href={`/movie/${featuredMovie.tmdb_id}`}
                className="flex items-center space-x-2 bg-tmdb-light/50 hover:bg-tmdb-light/70 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                <Info className="w-5 h-5" />
                <span>More Info</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}