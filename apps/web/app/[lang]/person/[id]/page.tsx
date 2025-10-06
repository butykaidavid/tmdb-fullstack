import { api } from "@/lib/api";
import Navigation from "@/components/Navigation";
import { Star, Calendar, MapPin, Users, Film } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Page({ params }: { params: { id: string, lang: string }}) {
  const person = await api<any>(`/api/person/${params.id}`);
  const movieCredits = await api<any>(`/api/person/${params.id}/movie_credits`);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getAge = (birthday: string, deathday?: string) => {
    const birth = new Date(birthday);
    const death = deathday ? new Date(deathday) : new Date();
    const age = death.getFullYear() - birth.getFullYear();
    const monthDiff = death.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && death.getDate() < birth.getDate())) {
      return age - 1;
    }
    return age;
  };

  return (
    <div className="min-h-screen bg-tmdb-dark">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        {person.profile_path && (
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${person.profile_path})`
            }}
          />
        )}
        
        <div className="absolute inset-0 bg-gradient-to-r from-tmdb-dark via-tmdb-dark/80 to-transparent" />
        
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* Profile Image */}
              <div className="lg:col-span-1">
                {person.profile_path && (
                  <div className="relative aspect-[2/3] max-w-sm mx-auto lg:mx-0">
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                      alt={person.name}
                      fill
                      className="rounded-lg shadow-2xl object-cover"
                    />
                  </div>
                )}
              </div>
              
              {/* Person Info */}
              <div className="lg:col-span-2 text-center lg:text-left">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 text-shadow">
                  {person.name}
                </h1>
                
                {person.known_for_department && (
                  <p className="text-xl text-tmdb-textSecondary mb-6">
                    {person.known_for_department}
                  </p>
                )}
                
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-6">
                  {person.birthday && (
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-5 h-5 text-tmdb-textSecondary" />
                      <span className="text-tmdb-textSecondary">
                        {formatDate(person.birthday)}
                        {person.deathday ? ` - ${formatDate(person.deathday)}` : ''}
                        {person.birthday && !person.deathday && (
                          <span className="ml-2">({getAge(person.birthday)} years old)</span>
                        )}
                      </span>
                    </div>
                  )}
                  
                  {person.place_of_birth && (
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-5 h-5 text-tmdb-textSecondary" />
                      <span className="text-tmdb-textSecondary">
                        {person.place_of_birth}
                      </span>
                    </div>
                  )}
                </div>
                
                {person.biography && (
                  <p className="text-lg text-tmdb-textSecondary mb-8 leading-relaxed max-w-3xl">
                    {person.biography}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Person Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Filmography */}
            {movieCredits && movieCredits.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-tmdb-text mb-6">Filmography</h2>
                <div className="space-y-4">
                  {movieCredits.slice(0, 20).map((credit: any) => (
                    <Link key={credit.id} href={`/movie/${credit.movie?.tmdb_id}`}>
                      <div className="group bg-tmdb-light/30 hover:bg-tmdb-light/50 rounded-lg p-4 transition-all duration-200 hover:scale-[1.02]">
                        <div className="flex space-x-4">
                          {credit.movie?.poster_path && (
                            <div className="relative w-16 h-24 flex-shrink-0">
                              <Image
                                src={`https://image.tmdb.org/t/p/w92${credit.movie.poster_path}`}
                                alt={credit.movie.title}
                                fill
                                className="rounded object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-tmdb-text group-hover:text-white transition-colors duration-200 line-clamp-2 mb-2">
                              {credit.movie?.title}
                            </h3>
                            <p className="text-tmdb-textSecondary text-sm mb-2">
                              {credit.character || credit.job}
                            </p>
                            <div className="flex items-center space-x-4 text-sm text-tmdb-textSecondary">
                              {credit.movie?.release_date && (
                                <div className="flex items-center space-x-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>{new Date(credit.movie.release_date).getFullYear()}</span>
                                </div>
                              )}
                              {credit.movie?.vote_average && (
                                <div className="flex items-center space-x-1">
                                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                  <span>{credit.movie.vote_average.toFixed(1)}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Personal Info */}
            <div className="bg-tmdb-light/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-tmdb-text mb-4">Personal Info</h3>
              <div className="space-y-3 text-sm">
                {person.birthday && (
                  <div>
                    <span className="text-tmdb-textSecondary">Born:</span>
                    <span className="ml-2 text-tmdb-text">{formatDate(person.birthday)}</span>
                  </div>
                )}
                {person.deathday && (
                  <div>
                    <span className="text-tmdb-textSecondary">Died:</span>
                    <span className="ml-2 text-tmdb-text">{formatDate(person.deathday)}</span>
                  </div>
                )}
                {person.place_of_birth && (
                  <div>
                    <span className="text-tmdb-textSecondary">Place of Birth:</span>
                    <span className="ml-2 text-tmdb-text">{person.place_of_birth}</span>
                  </div>
                )}
                {person.known_for_department && (
                  <div>
                    <span className="text-tmdb-textSecondary">Known For:</span>
                    <span className="ml-2 text-tmdb-text">{person.known_for_department}</span>
                  </div>
                )}
                {person.popularity && (
                  <div>
                    <span className="text-tmdb-textSecondary">Popularity:</span>
                    <span className="ml-2 text-tmdb-text">{person.popularity.toFixed(1)}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Also Known As */}
            {person.also_known_as && person.also_known_as.length > 0 && (
              <div className="bg-tmdb-light/30 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-tmdb-text mb-4">Also Known As</h3>
                <div className="space-y-2">
                  {person.also_known_as.map((name: string, index: number) => (
                    <div key={index} className="text-sm text-tmdb-text">
                      {name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
