import Link from "next/link";
import { api } from "@/lib/api";
export default async function Page({ params }: { params: { id: string, lang: string }}){
  const movie = await api<any>(`/api/movie/${params.id}?lang=${params.lang}`);
  return (
    <main className="mx-auto max-w-5xl p-6">
      <div className="grid md:grid-cols-[200px,1fr] gap-6">
        <div>
          {movie.poster_path && <img alt={movie.title} src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} className="rounded-2xl shadow"/>}
        </div>
        <div>
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="mt-4 opacity-80">{movie.overview}</p>
        </div>
      </div>

      {movie.cast?.length > 0 && (
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Szereplők</h2>
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {movie.cast.map((c: any) => (
              <li key={c.id}>
                <Link href={`/${params.lang}/person/${c.id}`} className="block">
                  {c.profile_path && (
                    <img src={`https://image.tmdb.org/t/p/w185${c.profile_path}`} alt={c.name} className="rounded-xl shadow" />
                  )}
                  <div className="mt-1 text-sm font-medium line-clamp-2">{c.name}</div>
                  {c.character && <div className="text-xs opacity-70 line-clamp-2">{c.character}</div>}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {movie.videos?.length > 0 && (
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Videók</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {movie.videos.map((v: any, idx: number) => (
              <a key={`${v.site}-${v.key}-${idx}`} href={v.site === 'YouTube' ? `https://www.youtube.com/watch?v=${v.key}` : '#'} target="_blank" rel="noreferrer" className="block p-3 rounded-xl border hover:bg-gray-50">
                <div className="font-medium">{v.name}</div>
                <div className="text-xs opacity-70">{v.type}{v.official ? ' • Official' : ''}</div>
              </a>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
