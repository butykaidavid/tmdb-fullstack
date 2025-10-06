import { api } from "@/lib/api";
import Navigation from "@/components/Navigation";
import { Star, Calendar, Clock, Users, Play, Plus, Share2, Tv } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function TvShowPage({ params }: { params: { id: string }}) {
  const show = await api<any>(`/api/tv/${params.id}`);
  const credits = await api<any>(`/api/tv/${params.id}/credits`);
  const similar = await api<any>(`/api/tv/${params.id}/similar`);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="min-h-screen bg-tmdb-dark">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative h-[70vh] overflow-hidden">
        {show.backdrop_path && (
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${show.backdrop_path})`
            }}
          />
        )}
        
        <div className="absolute inset-0 bg-gradient-to-r from-tmdb-dark via-tmdb-dark/80 to-transparent" />
        
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* Poster */}
              <div className="lg:col-span-1">
                {show.poster_path && (
                  <div className="relative aspect-[2/3] max-w-sm mx-auto lg:mx-0">
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                      alt={show.name}
                      fill
                      className="rounded-lg shadow-2xl object-cover"
                    />
                  </div>
                )}
              </div>
              
              {/* Show Info */}
              <div className="lg:col-span-2 text-center lg:text-left">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 text-shadow">
                  {show.name}
                </h1>
                
                {show.tagline && (
                  <p className="text-xl text-tmdb-textSecondary mb-6 italic">
                    "{show.tagline}"
                  </p>
                )}
                
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-6">
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-white font-semibold">
                      {show.vote_average?.toFixed(1) || 'N/A'}
                    </span>
                    <span className="text-tmdb-textSecondary">
                      ({show.vote_count?.toLocaleString()} votes)
                    </span>
                  </div>
                  
                  {show.first_air_date && (
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-5 h-5 text-tmdb-textSecondary" />
                      <span className="text-tmdb-textSecondary">
                        {new Date(show.first_air_date).getFullYear()}
                        {show.last_air_date && show.first_air_date !== show.last_air_date && 
                          ` - ${new Date(show.last_air_date).getFullYear()}`
                        }
                      </span>
                    </div>
                  )}
                  
                  {show.episode_run_time && show.episode_run_time.length > 0 && (
                    <div className="flex items-center space-x-1">
                      <Clock className="w-5 h-5 text-tmdb-textSecondary" />
                      <span className="text-tmdb-textSecondary">
                        {formatRuntime(show.episode_run_time[0])} per episode
                      </span>
                    </div>
                  )}
                  
                  {show.number_of_seasons && (
                    <div className="flex items-center space-x-1">
                      <Tv className="w-5 h-5 text-tmdb-textSecondary" />
                      <span className="text-tmdb-textSecondary">
                        {show.number_of_seasons} season{show.number_of_seasons !== 1 ? 's' : ''}
                      </span>
                    </div>
                  )}
                </div>
                
                <p className="text-lg text-tmdb-textSecondary mb-8 leading-relaxed max-w-3xl">
                  {show.overview}
                </p>
                
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <button className="flex items-center space-x-2 bg-tmdb-accent hover:bg-tmdb-accent/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
                    <Play className="w-5 h-5" />
                    <span>Watch Trailer</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 bg-tmdb-light/50 hover:bg-tmdb-light/70 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
                    <Plus className="w-5 h-5" />
                    <span>Add to List</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 bg-tmdb-light/50 hover:bg-tmdb-light/70 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
                    <Share2 className="w-5 h-5" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Show Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Cast */}
            {credits.cast && credits.cast.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-tmdb-text mb-6">Cast</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {credits.cast.slice(0, 12).map((actor: any) => (
                    <div key={actor.id} className="text-center">
                      <Link href={`/person/${actor.person?.tmdb_id}`}>
                        <div className="relative aspect-[2/3] mb-3 group">
                          {actor.person?.profile_path ? (
                            <Image
                              src={`https://image.tmdb.org/t/p/w300${actor.person.profile_path}`}
                              alt={actor.person.name}
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
                          {actor.person?.name}
                        </h3>
                        <p className="text-xs text-tmdb-textSecondary mt-1 line-clamp-2">
                          {actor.character}
                        </p>
                      </Link>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Similar Shows */}
            {similar && similar.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-tmdb-text mb-6">Similar TV Shows</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {similar.slice(0, 12).map((show: any) => (
                    <Link key={show.id} href={`/tv/${show.tmdb_id}`}>
                      <div className="group">
                        <div className="relative aspect-[2/3] mb-3">
                          {show.poster_path ? (
                            <Image
                              src={`https://image.tmdb.org/t/p/w300${show.poster_path}`}
                              alt={show.name}
                              fill
                              className="rounded-lg object-cover group-hover:scale-105 transition-transform duration-200"
                            />
                          ) : (
                            <div className="w-full h-full bg-tmdb-light/20 rounded-lg flex items-center justify-center">
                              <span className="text-tmdb-textSecondary text-sm">No Image</span>
                            </div>
                          )}
                        </div>
                        <h3 className="font-semibold text-tmdb-text text-sm line-clamp-2 group-hover:text-white transition-colors duration-200">
                          {show.name}
                        </h3>
                        <div className="flex items-center space-x-1 mt-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-tmdb-textSecondary">
                            {show.vote_average?.toFixed(1) || 'N/A'}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Show Facts */}
            <div className="bg-tmdb-light/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-tmdb-text mb-4">Show Facts</h3>
              <div className="space-y-3 text-sm">
                {show.status && (
                  <div>
                    <span className="text-tmdb-textSecondary">Status:</span>
                    <span className="ml-2 text-tmdb-text">{show.status}</span>
                  </div>
                )}
                {show.original_language && (
                  <div>
                    <span className="text-tmdb-textSecondary">Original Language:</span>
                    <span className="ml-2 text-tmdb-text">{show.original_language.toUpperCase()}</span>
                  </div>
                )}
                {show.number_of_seasons && (
                  <div>
                    <span className="text-tmdb-textSecondary">Seasons:</span>
                    <span className="ml-2 text-tmdb-text">{show.number_of_seasons}</span>
                  </div>
                )}
                {show.number_of_episodes && (
                  <div>
                    <span className="text-tmdb-textSecondary">Episodes:</span>
                    <span className="ml-2 text-tmdb-text">{show.number_of_episodes}</span>
                  </div>
                )}
                {show.genres && show.genres.length > 0 && (
                  <div>
                    <span className="text-tmdb-textSecondary">Genres:</span>
                    <div className="mt-1">
                      {show.genres.map((genre: any, index: number) => (
                        <span key={genre.id} className="inline-block bg-tmdb-accent/20 text-tmdb-accent px-2 py-1 rounded text-xs mr-2 mb-1">
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Networks */}
            {show.networks && show.networks.length > 0 && (
              <div className="bg-tmdb-light/30 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-tmdb-text mb-4">Networks</h3>
                <div className="space-y-2">
                  {show.networks.map((network: any) => (
                    <div key={network.id} className="text-sm">
                      <span className="text-tmdb-text">{network.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Created By */}
            {show.created_by && show.created_by.length > 0 && (
              <div className="bg-tmdb-light/30 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-tmdb-text mb-4">Created By</h3>
                <div className="space-y-2">
                  {show.created_by.map((creator: any) => (
                    <div key={creator.id} className="text-sm">
                      <span className="text-tmdb-text">{creator.name}</span>
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