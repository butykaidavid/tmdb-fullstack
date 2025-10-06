import Link from "next/link";
import { api } from "@/lib/api";
import Navigation from "@/components/Navigation";
import { Search, Film, Users, Star, Calendar } from "lucide-react";
import Image from "next/image";

export default async function SearchPage({ searchParams }: any){
  const q = searchParams?.q || "";
  const data = q ? await api<any>(`/api/search?q=${encodeURIComponent(q)}`) : {movies:[], people:[]};
  
  return (
    <div className="min-h-screen bg-tmdb-dark">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-tmdb-text mb-6">Search</h1>
          <form className="relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-tmdb-textSecondary w-5 h-5" />
              <input 
                name="q" 
                defaultValue={q} 
                placeholder="Search for movies, TV shows, people..." 
                className="w-full bg-tmdb-light/50 border border-tmdb-light/30 rounded-lg pl-12 pr-4 py-4 text-tmdb-text placeholder-tmdb-textSecondary focus:outline-none focus:ring-2 focus:ring-tmdb-accent focus:border-transparent"
              />
            </div>
          </form>
        </div>

        {q && (
          <div className="space-y-8">
            {/* Movies Section */}
            {data.movies.length > 0 && (
              <section>
                <div className="flex items-center space-x-2 mb-6">
                  <Film className="w-6 h-6 text-tmdb-accent" />
                  <h2 className="text-2xl font-bold text-tmdb-text">Movies</h2>
                  <span className="text-tmdb-textSecondary">({data.movies.length})</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.movies.map((movie: any) => (
                    <Link 
                      key={movie.id} 
                      href={`/movie/${movie.tmdb_id}`}
                      className="group bg-tmdb-light/30 hover:bg-tmdb-light/50 rounded-lg p-4 transition-all duration-200 hover:scale-105"
                    >
                      <div className="flex space-x-4">
                        {movie.poster_path && (
                          <div className="relative w-16 h-24 flex-shrink-0">
                            <Image
                              src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                              alt={movie.title}
                              fill
                              className="rounded object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-tmdb-text group-hover:text-white transition-colors duration-200 line-clamp-2 mb-2">
                            {movie.title}
                          </h3>
                          <div className="flex items-center space-x-2 text-sm text-tmdb-textSecondary">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span>{movie.vote_average?.toFixed(1) || 'N/A'}</span>
                            </div>
                            <span>•</span>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* People Section */}
            {data.people.length > 0 && (
              <section>
                <div className="flex items-center space-x-2 mb-6">
                  <Users className="w-6 h-6 text-tmdb-accent" />
                  <h2 className="text-2xl font-bold text-tmdb-text">People</h2>
                  <span className="text-tmdb-textSecondary">({data.people.length})</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.people.map((person: any) => (
                    <Link 
                      key={person.id} 
                      href={`/person/${person.tmdb_id}`}
                      className="group bg-tmdb-light/30 hover:bg-tmdb-light/50 rounded-lg p-4 transition-all duration-200 hover:scale-105"
                    >
                      <div className="flex space-x-4">
                        {person.profile_path && (
                          <div className="relative w-16 h-16 flex-shrink-0">
                            <Image
                              src={`https://image.tmdb.org/t/p/w92${person.profile_path}`}
                              alt={person.name}
                              fill
                              className="rounded-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-tmdb-text group-hover:text-white transition-colors duration-200 line-clamp-2 mb-2">
                            {person.name}
                          </h3>
                          {person.known_for_department && (
                            <p className="text-sm text-tmdb-textSecondary">
                              {person.known_for_department}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* No Results */}
            {data.movies.length === 0 && data.people.length === 0 && (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-tmdb-textSecondary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-tmdb-text mb-2">No results found</h3>
                <p className="text-tmdb-textSecondary">
                  Try searching for something else or check your spelling.
                </p>
              </div>
            )}
          </div>
        )}

        {!q && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-tmdb-textSecondary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-tmdb-text mb-2">Start searching</h3>
            <p className="text-tmdb-textSecondary">
              Search for movies, TV shows, and people to discover new content.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}