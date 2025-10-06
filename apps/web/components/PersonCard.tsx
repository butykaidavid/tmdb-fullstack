import Link from 'next/link';

interface PersonCardProps {
  id: number;
  name: string;
  profilePath?: string;
  knownFor?: string;
  lang?: string;
}

export default function PersonCard({ id, name, profilePath, knownFor, lang = 'en' }: PersonCardProps) {
  return (
    <Link href={`/${lang}/person/${id}`} className="poster-card block group">
      <div className="relative">
        {profilePath ? (
          <img
            src={`https://image.tmdb.org/t/p/w342${profilePath}`}
            alt={name}
            className="w-full h-auto object-cover"
          />
        ) : (
          <div className="w-full aspect-[2/3] bg-gray-200 flex items-center justify-center">
            <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
      
      <div className="p-3 bg-white">
        <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
          {name}
        </h3>
        {knownFor && <p className="text-sm text-gray-500 mt-1">{knownFor}</p>}
      </div>
    </Link>
  );
}
