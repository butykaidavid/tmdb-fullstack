import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { FaPlay, FaInfoCircle, FaStar } from 'react-icons/fa';
import { getImageUrl, IMAGE_SIZES } from '../services/api';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

function HeroSlider({ items, type = 'movie' }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!items || items.length === 0) return null;

  return (
    <div className="relative w-full h-[70vh] min-h-[500px] max-h-[700px]">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="h-full"
      >
        {items.slice(0, 10).map((item) => {
          const title = item.title || item.name;
          const releaseDate = item.release_date || item.first_air_date;
          const year = releaseDate ? new Date(releaseDate).getFullYear() : '';
          const linkPath = type === 'movie' ? `/movie/${item.id}` : `/tv-show/${item.id}`;

          return (
            <SwiperSlide key={item.id}>
              <div className="relative h-full">
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={getImageUrl(item.backdrop_path, IMAGE_SIZES.backdrop.large)}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                  {/* Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent"></div>
                </div>

                {/* Content */}
                <div className="relative h-full flex items-center">
                  <div className="container-custom">
                    <div className="max-w-2xl">
                      {/* Badge */}
                      <div className="flex items-center space-x-2 mb-4">
                        <span className="bg-tmdb-blue text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {type === 'movie' ? 'Movie' : 'TV Show'}
                        </span>
                        {year && (
                          <span className="text-white/80 text-sm">
                            {year}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 text-shadow">
                        {title}
                      </h1>

                      {/* Rating */}
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="flex items-center">
                          <FaStar className="text-yellow-400 mr-2" size={20} />
                          <span className="text-white text-lg font-semibold">
                            {item.vote_average.toFixed(1)}
                          </span>
                          <span className="text-white/70 ml-1">/ 10</span>
                        </div>
                        <span className="text-white/70">
                          {item.vote_count.toLocaleString()} votes
                        </span>
                      </div>

                      {/* Overview */}
                      <p className="text-white/90 text-lg mb-6 line-clamp-3">
                        {item.overview}
                      </p>

                      {/* Buttons */}
                      <div className="flex space-x-4">
                        <Link
                          to={linkPath}
                          className="btn-primary flex items-center space-x-2"
                        >
                          <FaPlay size={14} />
                          <span>Watch Now</span>
                        </Link>
                        <Link
                          to={linkPath}
                          className="bg-white/20 backdrop-blur text-white px-6 py-2 rounded-full font-semibold hover:bg-white/30 transition-colors duration-300 flex items-center space-x-2"
                        >
                          <FaInfoCircle size={16} />
                          <span>More Info</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Custom Pagination Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-2">
          {items.slice(0, 10).map((_, index) => (
            <button
              key={index}
              className={`h-1 transition-all duration-300 ${
                index === activeIndex ? 'w-8 bg-tmdb-blue' : 'w-2 bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeroSlider;