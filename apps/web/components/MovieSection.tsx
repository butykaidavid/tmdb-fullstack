'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import MovieCard from './MovieCard'
import { api } from '@/lib/api'

interface Movie {
  id: number
  tmdb_id: number
  title: string
  poster_path: string
  release_date: string
  vote_average: number
  vote_count: number
}

interface MovieSectionProps {
  title: string
  endpoint: string
  viewAllHref?: string
  limit?: number
}

export default function MovieSection({ 
  title, 
  endpoint, 
  viewAllHref, 
  limit = 20 
}: MovieSectionProps) {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true)
        const data = await api<Movie[]>(`${endpoint}?limit=${limit}`)
        setMovies(data)
      } catch (err) {
        setError('Failed to load movies')
        console.error('Error fetching movies:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [endpoint, limit])

  if (loading) {
    return (
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-tmdb-text">{title}</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[2/3] bg-tmdb-light/30 rounded-lg mb-3"></div>
                <div className="h-4 bg-tmdb-light/20 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-tmdb-light/20 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-tmdb-textSecondary">
            <p>{error}</p>
          </div>
        </div>
      </section>
    )
  }

  if (movies.length === 0) {
    return null
  }

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-tmdb-text">{title}</h2>
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="flex items-center space-x-1 text-tmdb-accent hover:text-tmdb-accent/80 transition-colors duration-200"
            >
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {movies.map((movie, index) => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              priority={index < 6}
            />
          ))}
        </div>
      </div>
    </section>
  )
}