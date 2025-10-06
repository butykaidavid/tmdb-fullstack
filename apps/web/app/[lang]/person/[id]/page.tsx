import { api } from "@/lib/api";
import Link from "next/link";

export default async function Page({ params }: { params: { id: string, lang: string }}) {
  const person = await api<any>(`/api/person/${params.id}`).catch(() => null);
  
  if (!person) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-gray-700 mb-4">Person Not Found</h1>
        <p className="text-gray-600 mb-6">The person you're looking for doesn't exist or hasn't been loaded yet.</p>
        <Link href={`/${params.lang}`} className="btn-primary">
          Go Home
        </Link>
      </div>
    );
  }

  const birthYear = person.birthday ? new Date(person.birthday).getFullYear() : null;
  const age = person.birthday && !person.deathday 
    ? new Date().getFullYear() - new Date(person.birthday).getFullYear() 
    : null;
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-4">
              {person.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/h632${person.profile_path}`}
                  alt={person.name}
                  className="w-full h-auto"
                />
              ) : (
                <div className="w-full aspect-[2/3] bg-gray-200 flex items-center justify-center">
                  <svg className="w-24 h-24 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
              
              <div className="p-6">
                <h2 className="font-bold text-lg mb-4">Personal Info</h2>
                
                <div className="space-y-4 text-sm">
                  {person.known_for_department && (
                    <div>
                      <p className="font-semibold text-gray-700">Known For</p>
                      <p className="text-gray-600">{person.known_for_department}</p>
                    </div>
                  )}
                  
                  {person.gender && (
                    <div>
                      <p className="font-semibold text-gray-700">Gender</p>
                      <p className="text-gray-600">
                        {person.gender === 1 ? 'Female' : person.gender === 2 ? 'Male' : 'Other'}
                      </p>
                    </div>
                  )}
                  
                  {person.birthday && (
                    <div>
                      <p className="font-semibold text-gray-700">Birthday</p>
                      <p className="text-gray-600">
                        {new Date(person.birthday).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                        {age && ` (${age} years old)`}
                      </p>
                    </div>
                  )}
                  
                  {person.deathday && (
                    <div>
                      <p className="font-semibold text-gray-700">Day of Death</p>
                      <p className="text-gray-600">
                        {new Date(person.deathday).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                  )}
                  
                  {person.place_of_birth && (
                    <div>
                      <p className="font-semibold text-gray-700">Place of Birth</p>
                      <p className="text-gray-600">{person.place_of_birth}</p>
                    </div>
                  )}
                  
                  {person.also_known_as && person.also_known_as.length > 0 && (
                    <div>
                      <p className="font-semibold text-gray-700">Also Known As</p>
                      <ul className="text-gray-600 space-y-1">
                        {person.also_known_as.slice(0, 5).map((name: string, idx: number) => (
                          <li key={idx}>{name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">{person.name}</h1>
              
              {/* Biography */}
              {person.biography && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Biography</h2>
                  <div className="text-gray-700 leading-relaxed space-y-4">
                    {person.biography.split('\n\n').map((paragraph: string, idx: number) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Known For (if available in movie_credits) */}
            {person.movie_credits && person.movie_credits.cast && person.movie_credits.cast.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Known For</h2>
                <div className="overflow-x-auto">
                  <div className="flex gap-4 pb-4">
                    {person.movie_credits.cast
                      .filter((movie: any) => movie.poster_path)
                      .sort((a: any, b: any) => (b.vote_average || 0) - (a.vote_average || 0))
                      .slice(0, 10)
                      .map((movie: any) => (
                        <Link
                          key={movie.id}
                          href={`/${params.lang}/movie/${movie.id}`}
                          className="flex-shrink-0 w-36 poster-card"
                        >
                          <img
                            src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                            alt={movie.title}
                            className="w-full rounded-lg"
                          />
                          <div className="mt-2">
                            <p className="text-sm font-semibold line-clamp-2">{movie.title}</p>
                            {movie.character && (
                              <p className="text-xs text-gray-600 line-clamp-1">{movie.character}</p>
                            )}
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            )}

            {/* Acting Filmography */}
            {person.movie_credits && person.movie_credits.cast && person.movie_credits.cast.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Acting</h2>
                <div className="space-y-3">
                  {person.movie_credits.cast
                    .sort((a: any, b: any) => {
                      const dateA = a.release_date || '0';
                      const dateB = b.release_date || '0';
                      return dateB.localeCompare(dateA);
                    })
                    .slice(0, 20)
                    .map((movie: any, idx: number) => (
                      <div key={`${movie.id}-${idx}`} className="flex gap-4 py-3 border-b border-gray-100 last:border-0">
                        <div className="w-16 text-center">
                          <span className="text-sm font-semibold text-gray-600">
                            {movie.release_date ? new Date(movie.release_date).getFullYear() : '—'}
                          </span>
                        </div>
                        <div className="flex-1">
                          <Link
                            href={`/${params.lang}/movie/${movie.id}`}
                            className="font-semibold hover:text-primary"
                          >
                            {movie.title}
                          </Link>
                          {movie.character && (
                            <p className="text-sm text-gray-600">as {movie.character}</p>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
