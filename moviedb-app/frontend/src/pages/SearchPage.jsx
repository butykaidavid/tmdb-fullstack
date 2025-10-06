import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { searchApi } from '../services/api';
import MovieCard from '../components/MovieCard';
import PersonCard from '../components/PersonCard';
import { FaSearch, FaFilter } from 'react-icons/fa';
import InfiniteScroll from 'react-infinite-scroll-component';

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchType, setSearchType] = useState('multi');
  const [page, setPage] = useState(1);
  const [allResults, setAllResults] = useState([]);
  const [searchInput, setSearchInput] = useState(query);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['search', searchType, query, page],
    queryFn: () => {
      if (!query) return null;
      switch (searchType) {
        case 'movies':
          return searchApi.movies(query, page);
        case 'tv':
          return searchApi.tv(query, page);
        case 'people':
          return searchApi.people(query, page);
        default:
          return searchApi.multi(query, page);
      }
    },
    enabled: !!query,
  });

  useEffect(() => {
    if (data?.data?.results) {
      if (page === 1) {
        setAllResults(data.data.results);
      } else {
        setAllResults(prev => [...prev, ...data.data.results]);
      }
    }
  }, [data, page]);

  useEffect(() => {
    setSearchInput(query);
    setPage(1);
    setAllResults([]);
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ q: searchInput.trim() });
      setPage(1);
    }
  };

  const handleTypeChange = (type) => {
    setSearchType(type);
    setPage(1);
    setAllResults([]);
  };

  const loadMore = () => {
    if (data?.data?.page < data?.data?.total_pages) {
      setPage(prev => prev + 1);
    }
  };

  const hasMore = data?.data?.page < data?.data?.total_pages;
  const totalResults = data?.data?.total_results || 0;

  const renderResult = (item) => {
    if (item.media_type === 'person' || searchType === 'people') {
      return <PersonCard key={item.id} person={item} />;
    } else if (item.media_type === 'tv' || searchType === 'tv') {
      return <MovieCard key={`tv-${item.id}`} movie={item} type="tv" />;
    } else {
      return <MovieCard key={`movie-${item.id}`} movie={item} type="movie" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-gradient-to-r from-tmdb-dark to-blue-900 py-12">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
            Search Movies, TV Shows & People
          </h1>
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search for movies, tv shows, people..."
                className="w-full px-6 py-4 pr-12 rounded-full text-lg focus:outline-none focus:ring-4 focus:ring-tmdb-light-blue/50"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-tmdb-blue text-white p-3 rounded-full hover:bg-blue-600 transition-colors"
              >
                <FaSearch size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow-sm sticky top-16 z-40">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FaFilter className="text-gray-600" />
              <span className="text-gray-700 font-semibold">Filter by:</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleTypeChange('multi')}
                  className={`px-4 py-2 rounded-full font-medium transition-colors ${
                    searchType === 'multi'
                      ? 'bg-tmdb-blue text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => handleTypeChange('movies')}
                  className={`px-4 py-2 rounded-full font-medium transition-colors ${
                    searchType === 'movies'
                      ? 'bg-tmdb-blue text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Movies
                </button>
                <button
                  onClick={() => handleTypeChange('tv')}
                  className={`px-4 py-2 rounded-full font-medium transition-colors ${
                    searchType === 'tv'
                      ? 'bg-tmdb-blue text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  TV Shows
                </button>
                <button
                  onClick={() => handleTypeChange('people')}
                  className={`px-4 py-2 rounded-full font-medium transition-colors ${
                    searchType === 'people'
                      ? 'bg-tmdb-blue text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  People
                </button>
              </div>
            </div>
            {totalResults > 0 && (
              <span className="text-gray-600">
                {totalResults.toLocaleString()} results
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container-custom py-8">
        {!query ? (
          <div className="text-center py-16">
            <FaSearch className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-600 text-lg">
              Enter a search term to find movies, TV shows, and people
            </p>
          </div>
        ) : isLoading && page === 1 ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-tmdb-blue mx-auto mb-4"></div>
            <p className="text-gray-600">Searching...</p>
          </div>
        ) : allResults.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg mb-2">
              No results found for "{query}"
            </p>
            <p className="text-gray-500">
              Try searching with different keywords
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
            <div className={`grid gap-6 ${
              searchType === 'people' 
                ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'
                : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
            }`}>
              {allResults.map(renderResult)}
            </div>
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
}

export default SearchPage;