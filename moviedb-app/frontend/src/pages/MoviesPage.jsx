import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { movieApi } from '../services/api';
import MovieCard from '../components/MovieCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FaFire, FaStar, FaCalendarAlt, FaPlayCircle } from 'react-icons/fa';

function MoviesPage() {
  const { category = 'popular' } = useParams();
  const [page, setPage] = useState(1);
  const [allMovies, setAllMovies] = useState([]);

  const categoryConfig = {
    popular: {
      title: 'Popular Movies',
      icon: FaFire,
      description: 'Most popular movies right now',
      fetchFn: movieApi.getPopular,
    },
    'now-playing': {
      title: 'Now Playing',
      icon: FaPlayCircle,
      description: 'Movies currently in theaters',
      fetchFn: movieApi.getNowPlaying,
    },
    upcoming: {
      title: 'Upcoming Movies',
      icon: FaCalendarAlt,
      description: 'Movies coming soon to theaters',
      fetchFn: movieApi.getUpcoming,
    },
    'top-rated': {
      title: 'Top Rated Movies',
      icon: FaStar,
      description: 'Highest rated movies of all time',
      fetchFn: movieApi.getTopRated,
    },
  };

  const currentCategory = categoryConfig[category] || categoryConfig.popular;
  const Icon = currentCategory.icon;

  const { data, isLoading } = useQuery({
    queryKey: ['movies', category, page],
    queryFn: () => currentCategory.fetchFn(page),
  });

  useState(() => {
    if (data?.data?.results) {
      if (page === 1) {
        setAllMovies(data.data.results);
      } else {
        setAllMovies(prev => [...prev, ...data.data.results]);
      }
    }
  }, [data, page]);

  const loadMore = () => {
    if (data?.data?.page < data?.data?.total_pages) {
      setPage(prev => prev + 1);
    }
  };

  const hasMore = data?.data?.page < data?.data?.total_pages;

  if (isLoading && page === 1) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-tmdb-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Loading movies...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-tmdb-dark to-blue-900 py-12">
        <div className="container-custom">
          <div className="flex items-center space-x-4 mb-4">
            <Icon className="text-tmdb-light-blue" size={32} />
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {currentCategory.title}
            </h1>
          </div>
          <p className="text-white/80 text-lg">{currentCategory.description}</p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="bg-white shadow-sm sticky top-16 z-40">
        <div className="container-custom">
          <div className="flex space-x-1 overflow-x-auto scrollbar-hide py-2">
            {Object.entries(categoryConfig).map(([key, config]) => {
              const TabIcon = config.icon;
              return (
                <a
                  key={key}
                  href={`/movies/${key}`}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium whitespace-nowrap transition-colors ${
                    category === key
                      ? 'bg-tmdb-blue text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <TabIcon size={16} />
                  <span>{config.title}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Movies Grid */}
      <div className="container-custom py-8">
        {allMovies.length > 0 && (
          <InfiniteScroll
            dataLength={allMovies.length}
            next={loadMore}
            hasMore={hasMore}
            loader={
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-tmdb-blue mx-auto"></div>
              </div>
            }
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {allMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} type="movie" />
              ))}
            </div>
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
}

export default MoviesPage;