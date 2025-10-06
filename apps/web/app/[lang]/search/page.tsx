import Link from "next/link";
import { api } from "@/lib/api";
import MovieCard from "@/components/MovieCard";
import PersonCard from "@/components/PersonCard";
import TVCard from "@/components/TVCard";

export default async function SearchPage({ searchParams, params }: { searchParams: any, params: { lang: string } }) {
  const q = searchParams?.q || "";
  const data = q ? await api<any>(`/api/search?q=${encodeURIComponent(q)}`).catch(() => ({ movies: [], people: [], tv_shows: [] })) : { movies: [], people: [], tv_shows: [] };
  
  const hasResults = (data.movies?.length > 0) || (data.people?.length > 0) || (data.tv_shows?.length > 0);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Search Header */}
      <div className="gradient-bg text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6">Search</h1>
          <form method="get" className="max-w-3xl">
            <div className="flex shadow-2xl">
              <input
                name="q"
                type="search"
                defaultValue={q}
                placeholder="Search for movies, TV shows, people..."
                className="flex-1 px-6 py-4 text-lg text-gray-900 rounded-l-full focus:outline-none"
                autoFocus
              />
              <button
                type="submit"
                className="bg-primary hover:bg-[#0199c0] px-8 py-4 text-lg font-semibold rounded-r-full transition-colors"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* No query state */}
        {!q && (
          <div className="text-center py-20">
            <svg className="w-24 h-24 mx-auto text-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Start Your Search</h2>
            <p className="text-gray-600">Enter a movie title, TV show, or person's name above</p>
          </div>
        )}

        {/* Results */}
        {q && (
          <>
            {hasResults ? (
              <div className="space-y-12">
                {/* Movies */}
                {data.movies && data.movies.length > 0 && (
                  <section>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-3xl font-bold text-gray-900">
                        Movies
                        <span className="ml-3 text-lg font-normal text-gray-500">({data.movies.length} results)</span>
                      </h2>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                      {data.movies.slice(0, 18).map((movie: any) => (
                        <MovieCard
                          key={movie.id}
                          id={movie.id}
                          title={movie.title}
                          posterPath={movie.poster_path}
                          releaseDate={movie.release_date}
                          voteAverage={movie.vote_average}
                          lang={params.lang}
                        />
                      ))}
                    </div>
                  </section>
                )}

                {/* TV Shows */}
                {data.tv_shows && data.tv_shows.length > 0 && (
                  <section>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-3xl font-bold text-gray-900">
                        TV Shows
                        <span className="ml-3 text-lg font-normal text-gray-500">({data.tv_shows.length} results)</span>
                      </h2>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                      {data.tv_shows.slice(0, 18).map((show: any) => (
                        <TVCard
                          key={show.id}
                          id={show.id}
                          name={show.name}
                          posterPath={show.poster_path}
                          firstAirDate={show.first_air_date}
                          voteAverage={show.vote_average}
                          lang={params.lang}
                        />
                      ))}
                    </div>
                  </section>
                )}

                {/* People */}
                {data.people && data.people.length > 0 && (
                  <section>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-3xl font-bold text-gray-900">
                        People
                        <span className="ml-3 text-lg font-normal text-gray-500">({data.people.length} results)</span>
                      </h2>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                      {data.people.slice(0, 18).map((person: any) => (
                        <PersonCard
                          key={person.id}
                          id={person.id}
                          name={person.name}
                          profilePath={person.profile_path}
                          knownFor={person.known_for_department}
                          lang={params.lang}
                        />
                      ))}
                    </div>
                  </section>
                )}
              </div>
            ) : (
              <div className="text-center py-20">
                <svg className="w-24 h-24 mx-auto text-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-2xl font-bold text-gray-700 mb-4">No Results Found</h2>
                <p className="text-gray-600 mb-6">
                  We couldn't find anything matching "<span className="font-semibold">{q}</span>"
                </p>
                <p className="text-gray-500 text-sm">
                  Try searching with different keywords or check your spelling
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
