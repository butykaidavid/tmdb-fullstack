import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import HeroSlider from '../components/HeroSlider';
import MovieCard from '../components/MovieCard';
import { movieApi, tvApi } from '../services/api';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';

function HomePage() {
  const { data: trendingData, isLoading: trendingLoading } = useQuery({
    queryKey: ['trending', 'week'],
    queryFn: () => movieApi.getTrending('week'),
  });

  const { data: popularMovies, isLoading: popularLoading } = useQuery({
    queryKey: ['movies', 'popular'],
    queryFn: () => movieApi.getPopular(),
  });

  const { data: topRatedMovies } = useQuery({
    queryKey: ['movies', 'topRated'],
    queryFn: () => movieApi.getTopRated(),
  });

  const { data: popularTVShows } = useQuery({
    queryKey: ['tv', 'popular'],
    queryFn: () => tvApi.getPopular(),
  });

  const { data: upcomingMovies } = useQuery({
    queryKey: ['movies', 'upcoming'],
    queryFn: () => movieApi.getUpcoming(),
  });

  const MovieSection = ({ title, items, type = 'movie', linkTo }) => (
    <section className="py-8">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
          {linkTo && (
            <Link
              to={linkTo}
              className="flex items-center text-tmdb-blue hover:text-blue-600 transition-colors font-semibold"
            >
              View All <FaArrowRight className="ml-2" size={14} />
            </Link>
          )}
        </div>
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
          className="movie-carousel"
        >
          {items?.map((item) => (
            <SwiperSlide key={item.id}>
              <MovieCard movie={item} type={type} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );

  if (trendingLoading || popularLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-tmdb-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Loading amazing content...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Slider */}
      {trendingData?.data?.results && (
        <HeroSlider items={trendingData.data.results} type="movie" />
      )}

      {/* Welcome Section */}
      <section className="py-12 bg-gradient-to-r from-tmdb-dark to-blue-900">
        <div className="container-custom">
          <div className="text-center text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Welcome to MovieDB
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Millions of movies, TV shows and people to discover. Explore now.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/movies" className="btn-primary inline-block">
                Explore Movies
              </Link>
              <Link to="/tv" className="btn-secondary inline-block">
                Discover TV Shows
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      {popularMovies?.data?.results && (
        <MovieSection
          title="Popular Movies"
          items={popularMovies.data.results}
          type="movie"
          linkTo="/movies/popular"
        />
      )}

      {popularTVShows?.data?.results && (
        <MovieSection
          title="Popular TV Shows"
          items={popularTVShows.data.results}
          type="tv"
          linkTo="/tv/popular"
        />
      )}

      {topRatedMovies?.data?.results && (
        <MovieSection
          title="Top Rated Movies"
          items={topRatedMovies.data.results}
          type="movie"
          linkTo="/movies/top-rated"
        />
      )}

      {upcomingMovies?.data?.results && (
        <MovieSection
          title="Upcoming Movies"
          items={upcomingMovies.data.results}
          type="movie"
          linkTo="/movies/upcoming"
        />
      )}

      {/* Call to Action */}
      <section className="py-16 bg-gray-100">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Join the Community</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Get access to exclusive features, create watchlists, rate movies, and join discussions with millions of movie enthusiasts.
          </p>
          <button className="btn-primary">Sign Up Now - It's Free!</button>
        </div>
      </section>
    </div>
  );
}

export default HomePage;