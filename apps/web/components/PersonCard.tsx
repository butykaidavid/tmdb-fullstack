'use client'

import Link from 'next/link'
import Image from 'next/image'

interface Person {
  id: number
  name: string
  profile_path?: string
  known_for_department?: string
  known_for?: Array<{
    id: number
    title?: string
    name?: string
    media_type: string
  }>
}

interface PersonCardProps {
  person: Person
  size?: 'sm' | 'md' | 'lg'
}

export default function PersonCard({ person, size = 'md' }: PersonCardProps) {
  const sizeClasses = {
    sm: 'w-32',
    md: 'w-48',
    lg: 'w-64'
  }

  const profileUrl = person.profile_path 
    ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
    : '/placeholder-person.jpg'

  const knownForTitles = person.known_for
    ?.slice(0, 3)
    .map(item => item.title || item.name)
    .join(', ')

  return (
    <div className={`movie-card ${sizeClasses[size]} flex-shrink-0`}>
      <Link href={`/person/${person.id}`}>
        <div className="relative">
          <Image
            src={profileUrl}
            alt={person.name}
            width={500}
            height={750}
            className="w-full aspect-[2/3] object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = '/placeholder-person.jpg'
            }}
          />
          
          {/* Gradient overlay for better text readability */}
          <div className="gradient-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Name overlay on hover */}
          <div className="absolute bottom-0 left-0 right-0 p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h3 className="font-semibold text-sm leading-tight text-shadow-lg">
              {person.name}
            </h3>
            {person.known_for_department && (
              <p className="text-xs text-gray-300 mt-1">{person.known_for_department}</p>
            )}
          </div>
        </div>
      </Link>
      
      {/* Person info below photo */}
      <div className="p-3">
        <h3 className="font-semibold text-sm leading-tight mb-1">
          {person.name}
        </h3>
        {person.known_for_department && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
            {person.known_for_department}
          </p>
        )}
        
        {knownForTitles && (
          <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
            Known for: {knownForTitles}
          </p>
        )}
      </div>
    </div>
  )
}