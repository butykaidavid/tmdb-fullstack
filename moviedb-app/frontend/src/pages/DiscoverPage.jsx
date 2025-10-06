import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { movieApi, tvApi, genreApi } from '../services/api';
import MovieCard from '../components/MovieCard';
import { FaFilter, FaSort } from 'react-icons/fa';
import InfiniteScroll from 'react-infinite-scroll-component';

function DiscoverPage() {
  const [mediaType, setMediaType] = useState('movie');
  const [filters, setFilters] = useState({
    sort_by: 'popularity.desc',
    page: 1,
    with_genres: '',
    year: '',
    'vote_average.gte': '',
  });
  const [allResults, setAllResults] = useState([]);

  const { data: genres } = useQuery({
    queryKey: ['genres', 'all'],
    queryFn: genreApi.getAllGenres,
  });

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['discover', mediaType, filters],
    queryFn: () => {
      const cleanFilters = Object.entries(filters).reduce((acc, [key, value]) => {
        if (value !== '') acc[key] = value;
        return acc;
      }, {});
      return mediaType === 'movie' 
        ? movieApi.discover(cleanFilters)
        : tvApi.discover(cleanFilters);
    },
  });

  useEffect(() => {
    if (data?.data?.results) {
      if (filters.page === 1) {
        setAllResults(data.data.results);
      } else {
        setAllResults(prev => [...prev, ...data.data.results]);
      }
    }
  }, [data, filters.page]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
    setAllResults([]);
  };

  const handleMediaTypeChange = (type) => {
    setMediaType(type);
    setFilters(prev => ({ ...prev, page: 1, with_genres: '' }));
    setAllResults([]);
  };

  const loadMore = () => {
    if (data?.data?.page < data?.data?.total_pages) {
      setFilters(prev => ({ ...prev, page: prev.page + 1 }));
    }
  };

  const hasMore = data?.data?.page < data?.data?.total_pages;
  const currentGenres = mediaType === 'movie' ? genres?.data?.movie : genres?.data?.tv;

  const sortOptions = [
    { value: 'popularity.desc', label: 'Most Popular' },
    { value: 'popularity.asc', label: 'Least Popular' },
    { value: 'vote_average.desc', label: 'Highest Rated' },
    { value: 'vote_average.asc', label: 'Lowest Rated' },
    { value: 'release_date.desc', label: 'Newest First' },
    { value: 'release_date.asc', label: 'Oldest First' },
    { value: 'revenue.desc', label: 'Highest Revenue' },
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-tmdb-dark to-blue-900 py-12">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
            Discover Movies & TV Shows
          </h1>
          <p className="text-white/80 text-lg text-center">
            Explore and filter through millions of movies and TV shows
          </p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white shadow-sm sticky top-16 z-40">
        <div className="container-custom py-4">
          {/* Media Type Toggle */}
          <div className="flex items-center justify-center mb-4">
            <div className="flex bg-gray-100 rounded-full p-1">
              <button
                onClick={() => handleMediaTypeChange('movie')}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  mediaType === 'movie'
                    ? 'bg-tmdb-blue text-white'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                Movies
              </button>
              <button
                onClick={() => handleMediaTypeChange('tv')}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  mediaType === 'tv'
                    ? 'bg-tmdb-blue text-white'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                TV Shows
              </button>
            </div>
          </div>

          {/* Filter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <FaSort className="inline mr-1" size={12} />
                Sort By
              </label>
              <select
                value={filters.sort_by}
                onChange={(e) => handleFilterChange('sort_by', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tmdb-blue"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Genre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <FaFilter className="inline mr-1" size={12} />
                Genre
              </label>
              <select
                value={filters.with_genres}
                onChange={(e) => handleFilterChange('with_genres', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tmdb-blue"
              >
                <option value="">All Genres</option>
                {currentGenres?.map(genre => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Year */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Year
              </label>
              <select
                value={filters.year}
                onChange={(e) => handleFilterChange('year', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tmdb-blue"
              >
                <option value="">All Years</option>
                {years.map(year => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Min Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Min Rating
              </label>
              <select
                value={filters['vote_average.gte']}
                onChange={(e) => handleFilterChange('vote_average.gte', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tmdb-blue"
              >
                <option value="">Any Rating</option>
                {[9, 8, 7, 6, 5, 4, 3, 2, 1].map(rating => (
                  <option key={rating} value={rating}>
                    {rating}+ Stars
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <button
                onClick={() => {
                  setFilters({
                    sort_by: 'popularity.desc',
                    page: 1,
                    with_genres: '',
                    year: '',
                    'vote_average.gte': '',
                  });
                  setAllResults([]);
                }}
                className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container-custom py-8">
        {isLoading && filters.page === 1 ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-tmdb-blue mx-auto mb-4"></div>
            <p className="text-gray-600">Loading results...</p>
          </div>
        ) : allResults.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">
              No results found with the current filters.
            </p>
            <p className="text-gray-500 mt-2">
              Try adjusting your filters to see more results.
            </p>
          </div>
        ) : (
          <InfiniteScroll
            dataLength={allResults.length}
            next={loadMore}
            hasMore={hasMore}
            loader={
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-tmdb-blue mx-auto"></div>
              </div>
            }
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {allResults.map((item) => (
                <MovieCard
                  key={item.id}
                  movie={item}
                  type={mediaType}
                />
              ))}
            </div>
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
}

export default DiscoverPage;