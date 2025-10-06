import MovieCard from './MovieCard';

interface Movie {
  id: number;
  title: string;
  poster_path?: string;
  release_date?: string;
  vote_average?: number;
}

interface MovieSectionProps {
  title: string;
  movies: Movie[];
  lang?: string;
}

export default function MovieSection({ title, movies, lang = 'en' }: MovieSectionProps) {
  if (!movies || movies.length === 0) return null;

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="section-title">{title}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {movies.slice(0, 12).map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              posterPath={movie.poster_path}
              releaseDate={movie.release_date}
              voteAverage={movie.vote_average}
              lang={lang}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
