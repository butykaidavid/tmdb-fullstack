import { api } from "@/lib/api";
import Link from "next/link";

export default async function TVShowPage({ params }: { params: { id: string, lang: string }}) {
  const show = await api<any>(`/api/tv/${params.id}`).catch(() => null);
  
  if (!show) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-gray-700 mb-4">TV Show Not Found</h1>
        <p className="text-gray-600 mb-6">The TV show you're looking for doesn't exist or hasn't been loaded yet.</p>
        <Link href={`/${params.lang}/tv`} className="btn-primary">
          Browse TV Shows
        </Link>
      </div>
    );
  }

  const year = show.first_air_date ? new Date(show.first_air_date).getFullYear() : '';
  const rating = show.vote_average ? show.vote_average.toFixed(1) : 'N/A';
  
  return (
    <div>
      {/* Backdrop Hero Section */}
      <div className="relative">
        {show.backdrop_path ? (
          <div className="relative h-[500px] overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${show.backdrop_path})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
            
            <div className="relative container mx-auto px-4 h-full flex items-end pb-12">
              <div className="flex gap-8 items-end">
                {show.poster_path && (
                  <img 
                    src={`https://image.tmdb.org/t/p/w342${show.poster_path}`}
                    alt={show.name}
                    className="hidden md:block w-64 rounded-lg shadow-2xl"
                  />
                )}
                
                <div className="text-white flex-1">
                  <h1 className="text-4xl md:text-5xl font-bold mb-3">
                    {show.name} {year && <span className="font-normal text-gray-300">({year})</span>}
                  </h1>
                  
                  <div className="flex flex-wrap items-center gap-4 mb-4 text-sm md:text-base">
                    {show.first_air_date && (
                      <span className="flex items-center gap-1">
                        📅 {new Date(show.first_air_date).toLocaleDateString()}
                      </span>
                    )}
                    {show.number_of_seasons && (
                      <span>📺 {show.number_of_seasons} Season{show.number_of_seasons !== 1 ? 's' : ''}</span>
                    )}
                    {show.number_of_episodes && (
                      <span>🎬 {show.number_of_episodes} Episodes</span>
                    )}
                    {show.vote_average && (
                      <span className="flex items-center gap-1 bg-yellow-500 text-dark px-3 py-1 rounded-full font-semibold">
                        ⭐ {rating}
                      </span>
                    )}
                  </div>
                  
                  {show.genres && show.genres.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {show.genres.map((genre: any) => (
                        <span key={genre.id} className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {show.tagline && (
                    <p className="text-gray-300 italic text-lg mb-4">"{show.tagline}"</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="gradient-bg text-white py-12">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl font-bold mb-3">
                {show.name} {year && <span className="font-normal">({year})</span>}
              </h1>
              {show.tagline && <p className="text-gray-300 italic text-lg">"{show.tagline}"</p>}
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            {show.overview && (
              <section>
                <h2 className="text-2xl font-bold mb-4">Overview</h2>
                <p className="text-gray-700 leading-relaxed text-lg">{show.overview}</p>
              </section>
            )}

            {/* Cast */}
            {show.credits && show.credits.cast && show.credits.cast.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4">Top Cast</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {show.credits.cast.slice(0, 6).map((person: any) => (
                    <Link 
                      key={person.id} 
                      href={`/${params.lang}/person/${person.id}`}
                      className="flex gap-3 p-3 bg-gray-50 rounded-lg hover:shadow-md transition-shadow"
                    >
                      {person.profile_path ? (
                        <img 
                          src={`https://image.tmdb.org/t/p/w92${person.profile_path}`}
                          alt={person.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                          <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate">{person.name}</p>
                        {person.character && (
                          <p className="text-xs text-gray-600 truncate">{person.character}</p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Seasons */}
            {show.seasons && show.seasons.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4">Seasons</h2>
                <div className="space-y-4">
                  {show.seasons.map((season: any) => (
                    <div key={season.id} className="flex gap-4 bg-gray-50 rounded-lg p-4">
                      {season.poster_path && (
                        <img
                          src={`https://image.tmdb.org/t/p/w154${season.poster_path}`}
                          alt={season.name}
                          className="w-24 rounded-lg"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">{season.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {season.air_date && `${new Date(season.air_date).getFullYear()} • `}
                          {season.episode_count} Episodes
                        </p>
                        {season.overview && (
                          <p className="text-sm text-gray-700 line-clamp-3">{season.overview}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-lg mb-4">Info</h3>
              <div className="space-y-3 text-sm">
                {show.status && (
                  <div>
                    <p className="font-semibold text-gray-700">Status</p>
                    <p className="text-gray-600">{show.status}</p>
                  </div>
                )}
                {show.type && (
                  <div>
                    <p className="font-semibold text-gray-700">Type</p>
                    <p className="text-gray-600">{show.type}</p>
                  </div>
                )}
                {show.networks && show.networks.length > 0 && (
                  <div>
                    <p className="font-semibold text-gray-700">Network</p>
                    <p className="text-gray-600">{show.networks[0].name}</p>
                  </div>
                )}
                {show.original_language && (
                  <div>
                    <p className="font-semibold text-gray-700">Original Language</p>
                    <p className="text-gray-600">{show.original_language.toUpperCase()}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
