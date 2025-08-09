import { api } from "@/lib/api";
export default async function Page({ params }: { params: { id: string, lang: string }}){
  const person = await api<any>(`/api/person/${params.id}`);
  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-3xl font-bold">{person.name}</h1>
      {person.profile_path && <img alt={person.name} src={`https://image.tmdb.org/t/p/w342${person.profile_path}`} className="rounded-2xl shadow"/>}
      <p className="mt-4 opacity-80">{person.biography}</p>
    </main>
  );
}
