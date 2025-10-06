'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import { Tv, Star, Calendar } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { api } from '@/lib/api'

interface TvShow {
  id: number
  tmdb_id: number
  name: string
  poster_path: string
  first_air_date: string
  vote_average: number
  vote_count: number
}

export default function TvPage() {
  const [trending, setTrending] = useState<TvShow[]>([])
  const [popular, setPopular] = useState<TvShow[]>([])
  const [topRated, setTopRated] = useState<TvShow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTvShows = async () => {
      try {
        setLoading(true)
        const [trendingData, popularData, topRatedData] = await Promise.all([
          api<TvShow[]>('/api/tv/trending?limit=20'),
          api<TvShow[]>('/api/tv/popular?limit=20'),
          api<TvShow[]>('/api/tv/top-rated?limit=20')
        ])
        setTrending(trendingData)
        setPopular(popularData)
        setTopRated(topRatedData)
      } catch (err) {
        setError('Failed to load TV shows')
        console.error('Error fetching TV shows:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchTvShows()
  }, [])

  const TvShowCard = ({ show }: { show: TvShow }) => {
    const releaseYear = show.first_air_date ? new Date(show.first_air_date).getFullYear() : 'N/A'
    
    return (
      <Link href={`/tv/${show.tmdb_id}`} className="group block">
        <div className="relative aspect-[2/3] mb-3 group">
          {show.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w300${show.poster_path}`}
              alt={show.name}
              fill
              className="rounded-lg object-cover group-hover:scale-105 transition-transform duration-200"
            />
          ) : (
            <div className="w-full h-full bg-tmdb-light/20 rounded-lg flex items-center justify-center">
              <Tv className="w-8 h-8 text-tmdb-textSecondary" />
            </div>
          )}
          
          {/* Rating Badge */}
          <div className="absolute top-2 right-2 bg-tmdb-dark/80 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span className="text-xs font-semibold text-white">
              {show.vote_average.toFixed(1)}
            </span>
          </div>
        </div>
        
        <h3 className="font-semibold text-tmdb-text text-sm line-clamp-2 group-hover:text-white transition-colors duration-200 mb-1">
          {show.name}
        </h3>
        
        <div className="flex items-center justify-between text-xs text-tmdb-textSecondary">
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>{releaseYear}</span>
          </div>
          <span>{show.vote_count.toLocaleString()} votes</span>
        </div>
      </Link>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-tmdb-dark">
        <Navigation />
        <main className="pt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
            <h1 className="text-4xl font-bold text-tmdb-text mb-2">TV Shows</h1>
            <p className="text-tmdb-textSecondary text-lg">
              Discover trending, popular, and top-rated TV series.
            </p>
          </div>
          <div className="space-y-8">
            {Array.from({ length: 3 }).map((_, sectionIndex) => (
              <section key={sectionIndex} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="h-8 bg-tmdb-light/20 rounded w-48 mb-6"></div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="aspect-[2/3] bg-tmdb-light/30 rounded-lg mb-3"></div>
                      <div className="h-4 bg-tmdb-light/20 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-tmdb-light/20 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </main>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-tmdb-dark">
        <Navigation />
        <main className="pt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-tmdb-textSecondary">{error}</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-tmdb-dark">
      <Navigation />
      
      <main className="pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <h1 className="text-4xl font-bold text-tmdb-text mb-2">TV Shows</h1>
          <p className="text-tmdb-textSecondary text-lg">
            Discover trending, popular, and top-rated TV series.
          </p>
        </div>
        
        <div className="space-y-8">
          {/* Trending TV Shows */}
          {trending.length > 0 && (
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-tmdb-text mb-6">Trending TV Shows</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {trending.map((show) => (
                  <TvShowCard key={show.id} show={show} />
                ))}
              </div>
            </section>
          )}

          {/* Popular TV Shows */}
          {popular.length > 0 && (
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-tmdb-text mb-6">Popular TV Shows</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {popular.map((show) => (
                  <TvShowCard key={show.id} show={show} />
                ))}
              </div>
            </section>
          )}

          {/* Top Rated TV Shows */}
          {topRated.length > 0 && (
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-tmdb-text mb-6">Top Rated TV Shows</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {topRated.map((show) => (
                  <TvShowCard key={show.id} show={show} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  )
}