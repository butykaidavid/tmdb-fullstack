import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LoadingSpinner from '@/components/LoadingSpinner'
import MovieCard from '@/components/MovieCard'
import { api } from '@/lib/api'
import { Suspense } from 'react'
import Image from 'next/image'
import { CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { format } from 'date-fns'

interface PersonPageProps {
  params: {
    id: string
  }
}

async function PersonDetails({ id }: { id: string }) {
  try {
    const person = await api<any>(`/api/person/${id}`)
    
    const profileUrl = person.profile_path 
      ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
      : '/placeholder-person.jpg'

    const birthday = person.birthday ? new Date(person.birthday) : null
    const deathday = person.deathday ? new Date(person.deathday) : null
    
    // Mock known for movies since API might not have this data
    const mockKnownFor = [
      {
        id: 1,
        title: "Sample Movie 1",
        poster_path: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
        vote_average: 8.5,
        release_date: "2020-01-01"
      },
      {
        id: 2,
        title: "Sample Movie 2",
        poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
        vote_average: 8.2,
        release_date: "2021-01-01"
      }
    ]

    return (
      <div className="space-y-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Image and Basic Info */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                <Image
                  src={profileUrl}
                  alt={person.name}
                  width={500}
                  height={750}
                  className="w-full max-w-sm mx-auto rounded-xl shadow-lg"
                  priority
                />
                
                <div className="card p-6 space-y-4">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Personal Info
                  </h2>
                  
                  {person.known_for_department && (
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        Known For
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {person.known_for_department}
                      </p>
                    </div>
                  )}
                  
                  {birthday && (
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        Birthday
                      </h3>
                      <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                        <CalendarIcon className="w-4 h-4" />
                        <span>{format(birthday, 'MMMM dd, yyyy')}</span>
                      </div>
                    </div>
                  )}
                  
                  {deathday && (
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        Day of Death
                      </h3>
                      <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                        <CalendarIcon className="w-4 h-4" />
                        <span>{format(deathday, 'MMMM dd, yyyy')}</span>
                      </div>
                    </div>
                  )}
                  
                  {person.place_of_birth && (
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        Place of Birth
                      </h3>
                      <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                        <MapPinIcon className="w-4 h-4" />
                        <span>{person.place_of_birth}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                  {person.name}
                </h1>
                
                {person.biography && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                      Biography
                    </h2>
                    <div className="prose prose-gray dark:prose-invert max-w-none">
                      {person.biography.split('\n').map((paragraph: string, index: number) => (
                        <p key={index} className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
                
                {!person.biography && (
                  <p className="text-gray-600 dark:text-gray-400">
                    No biography available for {person.name}.
                  </p>
                )}
              </div>
              
              {/* Known For Section */}
              <section>
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                  Known For
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {mockKnownFor.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} size="sm" />
                  ))}
                </div>
              </section>
              
              {/* Filmography Section */}
              <section>
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                  Filmography
                </h2>
                <div className="text-gray-600 dark:text-gray-400">
                  Filmography will be loaded from the API
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error fetching person:', error)
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg">
          Error loading person details. Please try again.
        </p>
      </div>
    )
  }
}

export default function PersonPage({ params }: PersonPageProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <Suspense fallback={<LoadingSpinner size="lg" className="py-12" />}>
          <PersonDetails id={params.id} />
        </Suspense>
      </main>
      
      <Footer />
    </div>
  )
}