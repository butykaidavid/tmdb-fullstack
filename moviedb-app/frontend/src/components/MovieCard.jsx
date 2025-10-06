import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FaStar, FaCalendar } from 'react-icons/fa';
import { getImageUrl, IMAGE_SIZES } from '../services/api';
import 'react-lazy-load-image-component/src/effects/opacity.css';

function MovieCard({ movie, type = 'movie' }) {
  const linkPath = type === 'movie' ? `/movie/${movie.id}` : `/tv-show/${movie.id}`;
  const title = movie.title || movie.name;
  const releaseDate = movie.release_date || movie.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : '';
  
  const getRatingColor = (rating) => {
    if (rating >= 7) return 'bg-green-500';
    if (rating >= 5) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const ratingPercentage = Math.round(movie.vote_average * 10);

  return (
    <Link to={linkPath} className="movie-card block">
      <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
        {/* Image */}
        <div className="aspect-[2/3] bg-gray-200">
          <LazyLoadImage
            src={getImageUrl(movie.poster_path, IMAGE_SIZES.poster.medium)}
            alt={title}
            effect="opacity"
            className="w-full h-full object-cover"
            placeholderSrc="/placeholder-poster.jpg"
          />
        </div>

        {/* Overlay with info */}
        <div className="movie-card-overlay">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white font-bold text-lg mb-1 line-clamp-2">
              {title}
            </h3>
            {year && (
              <div className="flex items-center text-white/80 text-sm mb-2">
                <FaCalendar className="mr-1" size={12} />
                {year}
              </div>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FaStar className="text-yellow-400 mr-1" size={14} />
                <span className="text-white text-sm font-semibold">
                  {movie.vote_average.toFixed(1)}
                </span>
              </div>
              {movie.vote_count > 0 && (
                <span className="text-white/70 text-xs">
                  {movie.vote_count.toLocaleString()} votes
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-2 right-2">
          <div className={`rating-circle ${getRatingColor(movie.vote_average)} shadow-lg`}>
            <span className="text-xs">
              {ratingPercentage}<span className="text-[8px]">%</span>
            </span>
          </div>
        </div>

        {/* Type Badge */}
        {type === 'tv' && (
          <div className="absolute top-2 left-2">
            <span className="bg-tmdb-blue text-white text-xs px-2 py-1 rounded-full font-semibold">
              TV
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}

export default MovieCard;