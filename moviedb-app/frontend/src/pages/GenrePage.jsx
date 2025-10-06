import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { movieApi, tvApi, genreApi } from '../services/api';
import MovieCard from '../components/MovieCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FaFilm, FaTv } from 'react-icons/fa';

function GenrePage() {
  const { type, id } = useParams();
  const [page, setPage] = useState(1);
  const [allResults, setAllResults] = useState([]);

  const { data: genres } = useQuery({
    queryKey: ['genres', type],
    queryFn: () => type === 'movie' ? genreApi.getMovieGenres() : genreApi.getTVGenres(),
  });

  const genre = genres?.data?.genres?.find(g => g.id === parseInt(id));

  const { data, isLoading } = useQuery({
    queryKey: ['genre', type, id, page],
    queryFn: () => {
      const filters = {
        with_genres: id,
        page,
        sort_by: 'popularity.desc',
      };
      return type === 'movie' 
        ? movieApi.discover(filters)
        : tvApi.discover(filters);
    },
    enabled: !!genre,
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
    setPage(1);
    setAllResults([]);
  }, [id, type]);

  const loadMore = () => {
    if (data?.data?.page < data?.data?.total_pages) {
      setPage(prev => prev + 1);
    }
  };

  const hasMore = data?.data?.page < data?.data?.total_pages;
  const Icon = type === 'movie' ? FaFilm : FaTv;
  const mediaTypeLabel = type === 'movie' ? 'Movies' : 'TV Shows';

  if (!genre && !isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Genre not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-tmdb-dark to-blue-900 py-12">
        <div className="container-custom">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <Icon className="text-tmdb-light-blue" size={32} />
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {genre?.name} {mediaTypeLabel}
            </h1>
          </div>
          <p className="text-white/80 text-lg text-center">
            Explore the best {genre?.name?.toLowerCase()} {mediaTypeLabel.toLowerCase()} of all time
          </p>
        </div>
      </div>

      {/* Results */}
      <div className="container-custom py-8">
        {isLoading && page === 1 ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-tmdb-blue mx-auto mb-4"></div>
            <p className="text-gray-600">Loading {mediaTypeLabel.toLowerCase()}...</p>
          </div>
        ) : allResults.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">
              No {mediaTypeLabel.toLowerCase()} found in this genre.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                Found {data?.data?.total_results?.toLocaleString()} {mediaTypeLabel.toLowerCase()} in {genre?.name}
              </p>
            </div>
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
                    type={type}
                  />
                ))}
              </div>
            </InfiniteScroll>
          </>
        )}
      </div>
    </div>
  );
}

export default GenrePage;