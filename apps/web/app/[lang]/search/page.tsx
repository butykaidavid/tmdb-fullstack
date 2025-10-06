import Link from "next/link";
import { api } from "@/lib/api";

export default async function Page({ params, searchParams }: { params: { lang: string }, searchParams: any }){
  const q = searchParams?.q || "";
  const lang = params.lang;
  const data = q ? await api<any>(`/api/search?q=${encodeURIComponent(q)}`) : {movies:[], people:[]};
  return (
    <main className="mx-auto max-w-5xl p-6">
      <form>
        <input name="q" defaultValue={q} placeholder="Keresés..." className="w-full border rounded-xl p-3" />
      </form>
      {q && (
        <div className="grid grid-cols-2 gap-6 mt-6">
          <section>
            <h2 className="text-xl font-semibold mb-2">Filmek</h2>
            <ul className="space-y-2">
              {data.movies.map((m: any) => (
                <li key={m.id} className="flex gap-3 items-center">
                  {m.poster_path && <img src={`https://image.tmdb.org/t/p/w92${m.poster_path}`} alt="" className="rounded"/>}
                  <Link href={`/${lang}/movie/${m.id}`} className="hover:underline">{m.title}</Link>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">Személyek</h2>
            <ul className="space-y-2">
              {data.people.map((p: any) => (
                <li key={p.id} className="flex gap-3 items-center">
                  {p.profile_path && <img src={`https://image.tmdb.org/t/p/w92${p.profile_path}`} alt="" className="rounded"/>}
                  <Link href={`/${lang}/person/${p.id}`} className="hover:underline">{p.name}</Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </main>
  );
}
