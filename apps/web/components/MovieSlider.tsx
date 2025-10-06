'use client'

import { useState, useRef } from 'react'
import MovieCard from './MovieCard'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

interface Movie {
  id: number
  title: string
  poster_path?: string
  vote_average?: number
  release_date?: string
  overview?: string
}

interface MovieSliderProps {
  movies: Movie[]
  title: string
  showOverview?: boolean
}

export default function MovieSlider({ movies, title, showOverview = false }: MovieSliderProps) {
  const [scrollPosition, setScrollPosition] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return
    
    const scrollAmount = 300
    const newPosition = direction === 'left' 
      ? scrollPosition - scrollAmount 
      : scrollPosition + scrollAmount
    
    sliderRef.current.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    })
    
    setScrollPosition(newPosition)
  }

  if (!movies || movies.length === 0) {
    return null
  }

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {title}
        </h2>
        
        <div className="flex space-x-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-full bg-gray-200 dark:bg-dark-700 hover:bg-gray-300 dark:hover:bg-dark-600 transition-colors duration-200"
            disabled={scrollPosition <= 0}
          >
            <ChevronLeftIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-full bg-gray-200 dark:bg-dark-700 hover:bg-gray-300 dark:hover:bg-dark-600 transition-colors duration-200"
          >
            <ChevronRightIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>
      
      <div
        ref={sliderRef}
        className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            size="md"
            showOverview={showOverview}
          />
        ))}
      </div>
    </section>
  )
}