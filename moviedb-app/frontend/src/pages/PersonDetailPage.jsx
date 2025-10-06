import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { personApi, getImageUrl, IMAGE_SIZES } from '../services/api';
import MovieCard from '../components/MovieCard';
import { format } from 'date-fns';
import { FaUser, FaBirthdayCake, FaMapMarkerAlt, FaStar } from 'react-icons/fa';

function PersonDetailPage() {
  const { id } = useParams();

  const { data: person, isLoading, error } = useQuery({
    queryKey: ['person', id],
    queryFn: () => personApi.getDetails(id),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-tmdb-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Loading person details...</p>
        </div>
      </div>
    );
  }

  if (error || !person?.data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load person details</p>
          <Link to="/" className="btn-primary">Back to Home</Link>
        </div>
      </div>
    );
  }

  const personData = person.data;
  const age = personData.birthday 
    ? Math.floor((new Date() - new Date(personData.birthday)) / (365.25 * 24 * 60 * 60 * 1000))
    : null;

  // Combine and sort movie and TV credits
  const allCredits = [
    ...(personData.movie_credits?.cast || []).map(item => ({ ...item, media_type: 'movie' })),
    ...(personData.tv_credits?.cast || []).map(item => ({ ...item, media_type: 'tv' }))
  ].sort((a, b) => {
    const dateA = new Date(a.release_date || a.first_air_date || '0');
    const dateB = new Date(b.release_date || b.first_air_date || '0');
    return dateB - dateA;
  });

  const knownFor = allCredits
    .filter(item => item.vote_count > 100)
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 8);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden sticky top-24">
              {/* Profile Image */}
              <div className="aspect-[2/3]">
                {personData.profile_path ? (
                  <img
                    src={getImageUrl(personData.profile_path, IMAGE_SIZES.profile.large)}
                    alt={personData.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <FaUser className="text-gray-400" size={64} />
                  </div>
                )}
              </div>
              
              {/* Personal Info */}
              <div className="p-6 space-y-4">
                <h2 className="text-xl font-bold">Personal Info</h2>
                
                {personData.known_for_department && (
                  <div>
                    <p className="text-sm text-gray-600">Known For</p>
                    <p className="font-semibold">{personData.known_for_department}</p>
                  </div>
                )}
                
                {personData.birthday && (
                  <div>
                    <p className="text-sm text-gray-600 flex items-center">
                      <FaBirthdayCake className="mr-1" size={12} />
                      Birthday
                    </p>
                    <p className="font-semibold">
                      {format(new Date(personData.birthday), 'MMM dd, yyyy')}
                      {age && ` (${age} years old)`}
                    </p>
                  </div>
                )}
                
                {personData.deathday && (
                  <div>
                    <p className="text-sm text-gray-600">Day of Death</p>
                    <p className="font-semibold">
                      {format(new Date(personData.deathday), 'MMM dd, yyyy')}
                    </p>
                  </div>
                )}
                
                {personData.place_of_birth && (
                  <div>
                    <p className="text-sm text-gray-600 flex items-center">
                      <FaMapMarkerAlt className="mr-1" size={12} />
                      Place of Birth
                    </p>
                    <p className="font-semibold">{personData.place_of_birth}</p>
                  </div>
                )}
                
                {personData.also_known_as && personData.also_known_as.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-600">Also Known As</p>
                    <ul className="space-y-1">
                      {personData.also_known_as.map((name, index) => (
                        <li key={index} className="text-sm">{name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-4xl font-bold mb-2">{personData.name}</h1>
              {personData.known_for_department && (
                <p className="text-lg text-gray-600">{personData.known_for_department}</p>
              )}
            </div>

            {/* Biography */}
            {personData.biography && (
              <section>
                <h2 className="text-2xl font-bold mb-4">Biography</h2>
                <div className="bg-white rounded-lg shadow p-6">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {personData.biography}
                  </p>
                </div>
              </section>
            )}

            {/* Known For */}
            {knownFor.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4">Known For</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {knownFor.map((item) => (
                    <MovieCard
                      key={`${item.media_type}-${item.id}`}
                      movie={item}
                      type={item.media_type}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Filmography */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Filmography</h2>
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="divide-y">
                  {allCredits.slice(0, 20).map((credit) => {
                    const title = credit.title || credit.name;
                    const date = credit.release_date || credit.first_air_date;
                    const year = date ? new Date(date).getFullYear() : '—';
                    const linkPath = credit.media_type === 'movie' 
                      ? `/movie/${credit.id}`
                      : `/tv-show/${credit.id}`;
                    
                    return (
                      <div key={`${credit.media_type}-${credit.id}-${credit.credit_id}`} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-grow">
                            <Link to={linkPath} className="font-semibold hover:text-tmdb-blue transition-colors">
                              {title}
                            </Link>
                            {credit.character && (
                              <span className="text-gray-600 ml-2">
                                as {credit.character}
                              </span>
                            )}
                            <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                              <span>{year}</span>
                              <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">
                                {credit.media_type === 'movie' ? 'Movie' : 'TV'}
                              </span>
                              {credit.vote_average > 0 && (
                                <div className="flex items-center">
                                  <FaStar className="text-yellow-400 mr-1" size={12} />
                                  <span>{credit.vote_average.toFixed(1)}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {allCredits.length > 20 && (
                  <div className="p-4 bg-gray-50 text-center">
                    <p className="text-gray-600">
                      And {allCredits.length - 20} more...
                    </p>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonDetailPage;