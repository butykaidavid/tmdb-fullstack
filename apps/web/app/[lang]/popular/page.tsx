import Link from "next/link";
import { api } from "@/lib/api";

export default async function PopularPage({ params }: { params: { lang: string } }){
  const data = await api<{ results: any[] }>(`/api/movies/popular`);
  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="text-3xl font-bold mb-4">Népszerű filmek</h1>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {data.results.map((m) => (
          <li key={m.id} className="group">
            <Link href={`/${params.lang}/movie/${m.id}`} className="block">
              {m.poster_path && (
                <img src={`https://image.tmdb.org/t/p/w342${m.poster_path}`} alt={m.title} className="rounded-xl shadow group-hover:opacity-90 transition" />
              )}
              <div className="mt-2 text-sm line-clamp-2">{m.title}</div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
