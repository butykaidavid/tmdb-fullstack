import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FaUser } from 'react-icons/fa';
import { getImageUrl, IMAGE_SIZES } from '../services/api';
import 'react-lazy-load-image-component/src/effects/opacity.css';

function PersonCard({ person }) {
  const knownFor = person.known_for?.map(item => item.title || item.name).join(', ');
  
  return (
    <Link to={`/person/${person.id}`} className="block group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
        {/* Image */}
        <div className="aspect-[2/3] bg-gray-200 relative">
          {person.profile_path ? (
            <LazyLoadImage
              src={getImageUrl(person.profile_path, IMAGE_SIZES.profile.medium)}
              alt={person.name}
              effect="opacity"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-300">
              <FaUser className="text-gray-500" size={48} />
            </div>
          )}
        </div>
        
        {/* Info */}
        <div className="p-4">
          <h3 className="font-bold text-gray-900 group-hover:text-tmdb-blue transition-colors line-clamp-1">
            {person.name}
          </h3>
          {person.known_for_department && (
            <p className="text-sm text-gray-600 mb-1">
              {person.known_for_department}
            </p>
          )}
          {knownFor && (
            <p className="text-xs text-gray-500 line-clamp-2">
              {knownFor}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

export default PersonCard;