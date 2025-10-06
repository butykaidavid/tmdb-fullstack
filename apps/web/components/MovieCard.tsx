import Link from 'next/link';

interface MovieCardProps {
  id: number;
  title: string;
  posterPath?: string;
  releaseDate?: string;
  voteAverage?: number;
  lang?: string;
}

export default function MovieCard({ id, title, posterPath, releaseDate, voteAverage, lang = 'en' }: MovieCardProps) {
  const year = releaseDate ? new Date(releaseDate).getFullYear() : '';
  const rating = voteAverage ? voteAverage.toFixed(1) : 'N/A';

  return (
    <Link href={`/${lang}/movie/${id}`} className="poster-card block group">
      <div className="relative">
        {posterPath ? (
          <img
            src={`https://image.tmdb.org/t/p/w342${posterPath}`}
            alt={title}
            className="w-full h-auto object-cover"
          />
        ) : (
          <div className="w-full aspect-[2/3] bg-gray-200 flex items-center justify-center">
            <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
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
          {title}
        </h3>
        {year && <p className="text-sm text-gray-500 mt-1">{year}</p>}
      </div>
    </Link>
  );
}
