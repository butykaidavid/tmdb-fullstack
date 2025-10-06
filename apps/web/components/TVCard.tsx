import Link from 'next/link';

interface TVCardProps {
  id: number;
  name: string;
  posterPath?: string;
  firstAirDate?: string;
  voteAverage?: number;
  lang?: string;
}

export default function TVCard({ id, name, posterPath, firstAirDate, voteAverage, lang = 'en' }: TVCardProps) {
  const year = firstAirDate ? new Date(firstAirDate).getFullYear() : '';
  const rating = voteAverage ? voteAverage.toFixed(1) : 'N/A';

  return (
    <Link href={`/${lang}/tv/${id}`} className="poster-card block group">
      <div className="relative">
        {posterPath ? (
          <img
            src={`https://image.tmdb.org/t/p/w342${posterPath}`}
            alt={name}
            className="w-full h-auto object-cover"
          />
        ) : (
          <div className="w-full aspect-[2/3] bg-gray-200 flex items-center justify-center">
            <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
            </svg>
          </div>
        )}
        
        {/* Rating Badge */}
        {voteAverage && voteAverage > 0 && (
          <div className="absolute top-2 right-2 bg-dark/90 text-white px-2 py-1 rounded-full text-sm font-semibold">
            ⭐ {rating}
          </div>
        )}
      </div>
      
      <div className="p-3 bg-white">
        <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
          {name}
        </h3>
        {year && <p className="text-sm text-gray-500 mt-1">{year}</p>}
      </div>
    </Link>
  );
}
