import { api } from "@/lib/api";
export default async function Page({ params }: { params: { id: string, lang: string }}){
  const movie = await api<any>(`/api/movie/${params.id}`);
  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-3xl font-bold">{movie.title}</h1>
      {movie.poster_path && <img alt={movie.title} src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} className="rounded-2xl shadow"/>}
      <p className="mt-4 opacity-80">{movie.overview}</p>
    </main>
  );
}
