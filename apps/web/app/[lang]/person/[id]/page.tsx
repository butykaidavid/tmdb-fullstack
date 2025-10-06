import Link from "next/link";
import { api } from "@/lib/api";
export default async function Page({ params }: { params: { id: string, lang: string }}){
  const person = await api<any>(`/api/person/${params.id}`);
  return (
    <main className="mx-auto max-w-5xl p-6">
      <div className="grid md:grid-cols-[200px,1fr] gap-6">
        <div>
          {person.profile_path && <img alt={person.name} src={`https://image.tmdb.org/t/p/w342${person.profile_path}`} className="rounded-2xl shadow"/>}
        </div>
        <div>
          <h1 className="text-3xl font-bold">{person.name}</h1>
          <div className="mt-2 text-sm opacity-70">
            {person.birthday && <span>Született: {person.birthday}</span>} {person.place_of_birth && <span>• {person.place_of_birth}</span>}
          </div>
          <p className="mt-4 opacity-80 whitespace-pre-line">{person.biography}</p>
        </div>
      </div>

      {person.known_for?.length > 0 && (
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Ismert filmek</h2>
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {person.known_for.map((m: any) => (
              <li key={m.id}>
                <Link href={`/${params.lang}/movie/${m.id}`} className="block">
                  {m.poster_path && <img src={`https://image.tmdb.org/t/p/w185${m.poster_path}`} alt={m.title} className="rounded-xl shadow" />}
                  <div className="mt-1 text-sm line-clamp-2">{m.title}</div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {person.credits?.length > 0 && (
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Közreműködések</h2>
          <ul className="space-y-2">
            {person.credits.map((c: any, idx: number) => (
              <li key={idx} className="flex gap-3 items-center">
                {c.poster_path && <img src={`https://image.tmdb.org/t/p/w92${c.poster_path}`} alt="" className="rounded"/>}
                <Link href={`/${params.lang}/movie/${c.id}`} className="hover:underline font-medium">{c.title}</Link>
                <span className="text-xs opacity-70">{c.credit_type === 'cast' ? c.character : c.job}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
