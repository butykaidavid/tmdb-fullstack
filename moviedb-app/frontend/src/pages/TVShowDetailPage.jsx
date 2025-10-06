import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FaStar, FaPlay, FaCalendar, FaTv, FaHeart, FaBookmark, FaShare } from 'react-icons/fa';
import { tvApi, getImageUrl, IMAGE_SIZES } from '../services/api';
import MovieCard from '../components/MovieCard';
import { format } from 'date-fns';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

function TVShowDetailPage() {
  const { id } = useParams();

  const { data: show, isLoading, error } = useQuery({
    queryKey: ['tv', id],
    queryFn: () => tvApi.getDetails(id),
  });

  const { data: similar } = useQuery({
    queryKey: ['tv', id, 'similar'],
    queryFn: () => tvApi.getSimilar(id),
    enabled: !!id,
  });

  const { data: recommendations } = useQuery({
    queryKey: ['tv', id, 'recommendations'],
    queryFn: () => tvApi.getRecommendations(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-tmdb-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Loading TV show details...</p>
        </div>
      </div>
    );
  }

  if (error || !show?.data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load TV show details</p>
          <Link to="/tv" className="btn-primary">Back to TV Shows</Link>
        </div>
      </div>
    );
  }

  const showData = show.data;
  const firstAirYear = showData.first_air_date ? new Date(showData.first_air_date).getFullYear() : '';
  const lastAirYear = showData.last_air_date ? new Date(showData.last_air_date).getFullYear() : '';
  const yearRange = firstAirYear === lastAirYear ? firstAirYear : `${firstAirYear} - ${lastAirYear || 'Present'}`;
  
  const trailer = showData.videos?.results?.find(
    (video) => video.type === 'Trailer' && video.site === 'YouTube'
  );

  const creator = showData.created_by?.[0];
  const cast = showData.credits?.cast?.slice(0, 10) || [];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Backdrop */}
      <div className="relative h-[70vh] min-h-[500px]">
        <div className="absolute inset-0">
          <img
            src={getImageUrl(showData.backdrop_path, IMAGE_SIZES.backdrop.large)}
            alt={showData.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30"></div>
        </div>
        
        <div className="relative h-full flex items-end pb-8">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Poster */}
              <div className="flex-shrink-0">
                <img
                  src={getImageUrl(showData.poster_path, IMAGE_SIZES.poster.medium)}
                  alt={showData.name}
                  className="w-48 md:w-64 rounded-lg shadow-2xl"
                />
              </div>
              
              {/* Show Info */}
              <div className="flex-grow text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  {showData.name}
                  {yearRange && (
                    <span className="text-3xl md:text-4xl text-white/70 ml-3">
                      ({yearRange})
                    </span>
                  )}
                </h1>
                
                {showData.tagline && (
                  <p className="text-xl text-white/80 italic mb-4">"{showData.tagline}"</p>
                )}
                
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-2" size={20} />
                    <span className="text-xl font-bold">{showData.vote_average.toFixed(1)}</span>
                    <span className="text-white/70 ml-1">/ 10</span>
                  </div>
                  <span className="text-white/70">({showData.vote_count.toLocaleString()} votes)</span>
                  <span className="text-white/70">•</span>
                  <div className="flex items-center">
                    <FaTv className="mr-2" size={16} />
                    {showData.number_of_seasons} Season{showData.number_of_seasons !== 1 && 's'}
                  </div>
                  <span className="text-white/70">•</span>
                  <span>{showData.number_of_episodes} Episodes</span>
                  <span className="text-white/70">•</span>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    showData.status === 'Returning Series' ? 'bg-green-500' : 'bg-gray-500'
                  }`}>
                    {showData.status}
                  </span>
                </div>
                
                {/* Genres */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {showData.genres?.map((genre) => (
                    <Link
                      key={genre.id}
                      to={`/genre/tv/${genre.id}`}
                      className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-sm hover:bg-white/30 transition-colors"
                    >
                      {genre.name}
                    </Link>
                  ))}
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  {trailer && (
                    <a
                      href={`https://www.youtube.com/watch?v=${trailer.key}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary flex items-center gap-2"
                    >
                      <FaPlay size={14} />
                      Watch Trailer
                    </a>
                  )}
                  <button className="bg-white/20 backdrop-blur text-white px-4 py-2 rounded-full hover:bg-white/30 transition-colors">
                    <FaHeart className="inline mr-2" />
                    Favorite
                  </button>
                  <button className="bg-white/20 backdrop-blur text-white px-4 py-2 rounded-full hover:bg-white/30 transition-colors">
                    <FaBookmark className="inline mr-2" />
                    Watchlist
                  </button>
                  <button className="bg-white/20 backdrop-blur text-white px-4 py-2 rounded-full hover:bg-white/30 transition-colors">
                    <FaShare className="inline mr-2" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p className="text-gray-700 leading-relaxed">
                {showData.overview || 'No overview available.'}
              </p>
            </section>

            {/* Seasons */}
            {showData.seasons && showData.seasons.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4">Seasons</h2>
                <div className="space-y-4">
                  {showData.seasons.filter(s => s.season_number > 0).map((season) => (
                    <div key={season.id} className="bg-white rounded-lg shadow p-4 flex gap-4">
                      {season.poster_path && (
                        <img
                          src={getImageUrl(season.poster_path, IMAGE_SIZES.poster.small)}
                          alt={season.name}
                          className="w-24 h-36 object-cover rounded"
                        />
                      )}
                      <div className="flex-grow">
                        <h3 className="font-bold text-lg mb-1">{season.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {season.air_date ? format(new Date(season.air_date), 'yyyy') : 'TBA'} • {season.episode_count} Episodes
                        </p>
                        {season.overview && (
                          <p className="text-gray-700 text-sm line-clamp-2">{season.overview}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Cast */}
            {cast.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4">Series Cast</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {cast.map((actor) => (
                    <Link
                      key={actor.id}
                      to={`/person/${actor.id}`}
                      className="text-center group"
                    >
                      <div className="aspect-square mb-2 overflow-hidden rounded-lg">
                        <img
                          src={getImageUrl(actor.profile_path, IMAGE_SIZES.profile.medium)}
                          alt={actor.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <p className="font-semibold text-sm group-hover:text-tmdb-blue transition-colors">
                        {actor.name}
                      </p>
                      <p className="text-xs text-gray-600">{actor.character}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Show Info */}
            <section className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4">Show Info</h3>
              <div className="space-y-3">
                {creator && (
                  <div>
                    <p className="text-sm text-gray-600">Creator</p>
                    <p className="font-semibold">{creator.name}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-600">Type</p>
                  <p className="font-semibold">{showData.type || 'Scripted'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Networks</p>
                  <p className="font-semibold">
                    {showData.networks?.map(n => n.name).join(', ') || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">First Air Date</p>
                  <p className="font-semibold">
                    {showData.first_air_date ? format(new Date(showData.first_air_date), 'MMM dd, yyyy') : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Last Air Date</p>
                  <p className="font-semibold">
                    {showData.last_air_date ? format(new Date(showData.last_air_date), 'MMM dd, yyyy') : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Episode Runtime</p>
                  <p className="font-semibold">
                    {showData.episode_run_time?.length > 0 
                      ? `${showData.episode_run_time[0]} minutes` 
                      : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Original Language</p>
                  <p className="font-semibold uppercase">{showData.original_language}</p>
                </div>
              </div>
            </section>

            {/* External Links */}
            {showData.homepage && (
              <section className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold mb-4">External Links</h3>
                <a
                  href={showData.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-tmdb-blue hover:underline"
                >
                  Official Website
                </a>
              </section>
            )}
          </div>
        </div>

        {/* Similar Shows */}
        {similar?.data?.results?.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Similar TV Shows</h2>
            <Swiper
              modules={[Navigation]}
              spaceBetween={20}
              slidesPerView={2}
              navigation={true}
              breakpoints={{
                640: { slidesPerView: 3 },
                768: { slidesPerView: 4 },
                1024: { slidesPerView: 5 },
                1280: { slidesPerView: 6 },
              }}
            >
              {similar.data.results.map((show) => (
                <SwiperSlide key={show.id}>
                  <MovieCard movie={show} type="tv" />
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        )}

        {/* Recommendations */}
        {recommendations?.data?.results?.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Recommended TV Shows</h2>
            <Swiper
              modules={[Navigation]}
              spaceBetween={20}
              slidesPerView={2}
              navigation={true}
              breakpoints={{
                640: { slidesPerView: 3 },
                768: { slidesPerView: 4 },
                1024: { slidesPerView: 5 },
                1280: { slidesPerView: 6 },
              }}
            >
              {recommendations.data.results.map((show) => (
                <SwiperSlide key={show.id}>
                  <MovieCard movie={show} type="tv" />
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        )}
      </div>
    </div>
  );
}

export default TVShowDetailPage;