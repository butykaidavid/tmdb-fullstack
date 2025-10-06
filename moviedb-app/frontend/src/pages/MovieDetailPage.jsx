import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FaStar, FaPlay, FaCalendar, FaClock, FaDollarSign, FaGlobe, FaHeart, FaBookmark, FaShare } from 'react-icons/fa';
import { movieApi, getImageUrl, IMAGE_SIZES } from '../services/api';
import MovieCard from '../components/MovieCard';
import { format } from 'date-fns';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

function MovieDetailPage() {
  const { id } = useParams();

  const { data: movie, isLoading, error } = useQuery({
    queryKey: ['movie', id],
    queryFn: () => movieApi.getDetails(id),
  });

  const { data: similar } = useQuery({
    queryKey: ['movie', id, 'similar'],
    queryFn: () => movieApi.getSimilar(id),
    enabled: !!id,
  });

  const { data: recommendations } = useQuery({
    queryKey: ['movie', id, 'recommendations'],
    queryFn: () => movieApi.getRecommendations(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-tmdb-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (error || !movie?.data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load movie details</p>
          <Link to="/movies" className="btn-primary">Back to Movies</Link>
        </div>
      </div>
    );
  }

  const movieData = movie.data;
  const releaseYear = movieData.release_date ? new Date(movieData.release_date).getFullYear() : '';
  const runtime = movieData.runtime ? `${Math.floor(movieData.runtime / 60)}h ${movieData.runtime % 60}m` : 'N/A';
  const budget = movieData.budget ? `$${movieData.budget.toLocaleString()}` : 'N/A';
  const revenue = movieData.revenue ? `$${movieData.revenue.toLocaleString()}` : 'N/A';

  const trailer = movieData.videos?.results?.find(
    (video) => video.type === 'Trailer' && video.site === 'YouTube'
  );

  const director = movieData.credits?.crew?.find(
    (person) => person.job === 'Director'
  );

  const cast = movieData.credits?.cast?.slice(0, 10) || [];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Backdrop */}
      <div className="relative h-[70vh] min-h-[500px]">
        <div className="absolute inset-0">
          <img
            src={getImageUrl(movieData.backdrop_path, IMAGE_SIZES.backdrop.large)}
            alt={movieData.title}
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
                  src={getImageUrl(movieData.poster_path, IMAGE_SIZES.poster.medium)}
                  alt={movieData.title}
                  className="w-48 md:w-64 rounded-lg shadow-2xl"
                />
              </div>
              
              {/* Movie Info */}
              <div className="flex-grow text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  {movieData.title}
                  {releaseYear && (
                    <span className="text-3xl md:text-4xl text-white/70 ml-3">
                      ({releaseYear})
                    </span>
                  )}
                </h1>
                
                {movieData.tagline && (
                  <p className="text-xl text-white/80 italic mb-4">"{movieData.tagline}"</p>
                )}
                
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-2" size={20} />
                    <span className="text-xl font-bold">{movieData.vote_average.toFixed(1)}</span>
                    <span className="text-white/70 ml-1">/ 10</span>
                  </div>
                  <span className="text-white/70">({movieData.vote_count.toLocaleString()} votes)</span>
                  <span className="text-white/70">•</span>
                  <div className="flex items-center">
                    <FaClock className="mr-2" size={16} />
                    {runtime}
                  </div>
                  <span className="text-white/70">•</span>
                  <div className="flex items-center">
                    <FaCalendar className="mr-2" size={16} />
                    {movieData.release_date ? format(new Date(movieData.release_date), 'MMM dd, yyyy') : 'N/A'}
                  </div>
                </div>
                
                {/* Genres */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {movieData.genres?.map((genre) => (
                    <Link
                      key={genre.id}
                      to={`/genre/movie/${genre.id}`}
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
                {movieData.overview || 'No overview available.'}
              </p>
            </section>

            {/* Cast */}
            {cast.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4">Top Cast</h2>
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

            {/* Reviews */}
            {movieData.reviews?.results?.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4">Reviews</h2>
                <div className="space-y-4">
                  {movieData.reviews.results.slice(0, 3).map((review) => (
                    <div key={review.id} className="bg-white p-6 rounded-lg shadow">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{review.author}</h4>
                          {review.author_details?.rating && (
                            <div className="flex items-center mt-1">
                              <FaStar className="text-yellow-400 mr-1" size={14} />
                              <span className="text-sm">{review.author_details.rating}/10</span>
                            </div>
                          )}
                        </div>
                        <span className="text-sm text-gray-500">
                          {format(new Date(review.created_at), 'MMM dd, yyyy')}
                        </span>
                      </div>
                      <p className="text-gray-700 line-clamp-3">{review.content}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Production Info */}
            <section className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4">Production Info</h3>
              <div className="space-y-3">
                {director && (
                  <div>
                    <p className="text-sm text-gray-600">Director</p>
                    <p className="font-semibold">{director.name}</p>
                  </div>
                )}
                {movieData.production_companies?.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-600">Production Companies</p>
                    <p className="font-semibold">
                      {movieData.production_companies.map(c => c.name).join(', ')}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <p className="font-semibold">{movieData.status}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Original Language</p>
                  <p className="font-semibold uppercase">{movieData.original_language}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Budget</p>
                  <p className="font-semibold">{budget}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Revenue</p>
                  <p className="font-semibold">{revenue}</p>
                </div>
              </div>
            </section>

            {/* External Links */}
            {(movieData.homepage || movieData.imdb_id) && (
              <section className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold mb-4">External Links</h3>
                <div className="space-y-2">
                  {movieData.homepage && (
                    <a
                      href={movieData.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-tmdb-blue hover:underline"
                    >
                      <FaGlobe className="mr-2" />
                      Official Website
                    </a>
                  )}
                  {movieData.imdb_id && (
                    <a
                      href={`https://www.imdb.com/title/${movieData.imdb_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-tmdb-blue hover:underline"
                    >
                      IMDb
                    </a>
                  )}
                </div>
              </section>
            )}
          </div>
        </div>

        {/* Similar Movies */}
        {similar?.data?.results?.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Similar Movies</h2>
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
              {similar.data.results.map((movie) => (
                <SwiperSlide key={movie.id}>
                  <MovieCard movie={movie} type="movie" />
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        )}

        {/* Recommendations */}
        {recommendations?.data?.results?.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Recommended Movies</h2>
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
              {recommendations.data.results.map((movie) => (
                <SwiperSlide key={movie.id}>
                  <MovieCard movie={movie} type="movie" />
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        )}
      </div>
    </div>
  );
}

export default MovieDetailPage;