'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import { Users, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { api } from '@/lib/api'

interface Person {
  id: number
  tmdb_id: number
  name: string
  profile_path: string
  known_for_department: string
  popularity: number
}

export default function PeoplePage() {
  const [people, setPeople] = useState<Person[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        setLoading(true)
        const data = await api<Person[]>('/api/people/popular?limit=50')
        setPeople(data)
      } catch (err) {
        setError('Failed to load people')
        console.error('Error fetching people:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPeople()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-tmdb-dark">
        <Navigation />
        <main className="pt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
            <h1 className="text-4xl font-bold text-tmdb-text mb-2">People</h1>
            <p className="text-tmdb-textSecondary text-lg">
              Discover popular actors, directors, and other film industry professionals.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[2/3] bg-tmdb-light/30 rounded-lg mb-3"></div>
                <div className="h-4 bg-tmdb-light/20 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-tmdb-light/20 rounded w-1/2"></div>
              </div>
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
          <h1 className="text-4xl font-bold text-tmdb-text mb-2">People</h1>
          <p className="text-tmdb-textSecondary text-lg">
            Discover popular actors, directors, and other film industry professionals.
          </p>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {people.map((person) => (
              <Link key={person.id} href={`/person/${person.tmdb_id}`}>
                <div className="group text-center">
                  <div className="relative aspect-[2/3] mb-3 group">
                    {person.profile_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w300${person.profile_path}`}
                        alt={person.name}
                        fill
                        className="rounded-lg object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    ) : (
                      <div className="w-full h-full bg-tmdb-light/20 rounded-lg flex items-center justify-center">
                        <Users className="w-8 h-8 text-tmdb-textSecondary" />
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold text-tmdb-text text-sm line-clamp-2 group-hover:text-white transition-colors duration-200">
                    {person.name}
                  </h3>
                  {person.known_for_department && (
                    <p className="text-xs text-tmdb-textSecondary mt-1">
                      {person.known_for_department}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}