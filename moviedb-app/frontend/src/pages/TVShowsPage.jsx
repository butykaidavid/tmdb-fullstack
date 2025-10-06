import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { tvApi } from '../services/api';
import MovieCard from '../components/MovieCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FaFire, FaStar, FaTv, FaBroadcastTower } from 'react-icons/fa';

function TVShowsPage() {
  const { category = 'popular' } = useParams();
  const [page, setPage] = useState(1);
  const [allShows, setAllShows] = useState([]);

  const categoryConfig = {
    popular: {
      title: 'Popular TV Shows',
      icon: FaFire,
      description: 'Most popular TV shows right now',
      fetchFn: tvApi.getPopular,
    },
    'airing-today': {
      title: 'Airing Today',
      icon: FaTv,
      description: 'TV shows with episodes airing today',
      fetchFn: tvApi.getAiringToday,
    },
    'on-the-air': {
      title: 'Currently On Air',
      icon: FaBroadcastTower,
      description: 'TV shows currently on the air',
      fetchFn: tvApi.getOnTheAir,
    },
    'top-rated': {
      title: 'Top Rated TV Shows',
      icon: FaStar,
      description: 'Highest rated TV shows of all time',
      fetchFn: tvApi.getTopRated,
    },
  };

  const currentCategory = categoryConfig[category] || categoryConfig.popular;
  const Icon = currentCategory.icon;

  const { data, isLoading } = useQuery({
    queryKey: ['tv', category, page],
    queryFn: () => currentCategory.fetchFn(page),
  });

  useEffect(() => {
    if (data?.data?.results) {
      if (page === 1) {
        setAllShows(data.data.results);
      } else {
        setAllShows(prev => [...prev, ...data.data.results]);
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
          <p className="text-gray-600">Loading TV shows...</p>
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
                  href={`/tv/${key}`}
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

      {/* TV Shows Grid */}
      <div className="container-custom py-8">
        {allShows.length > 0 && (
          <InfiniteScroll
            dataLength={allShows.length}
            next={loadMore}
            hasMore={hasMore}
            loader={
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-tmdb-blue mx-auto"></div>
              </div>
            }
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {allShows.map((show) => (
                <MovieCard key={show.id} movie={show} type="tv" />
              ))}
            </div>
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
}

export default TVShowsPage;