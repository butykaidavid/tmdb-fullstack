import Link from "next/link";

export default function LangHome({ params }: { params: { lang: string } }){
  const { lang } = params;
  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-3xl font-bold">Film adatbázis</h1>
      <p className="opacity-80 mt-2">Böngéssz filmek és személyek között.</p>
      <nav className="mt-6 flex gap-4">
        <Link href={`/${lang}/search`} className="px-4 py-2 rounded-xl bg-black text-white">Keresés</Link>
        <Link href={`/${lang}/popular`} className="px-4 py-2 rounded-xl bg-gray-200">Népszerű filmek</Link>
      </nav>
    </main>
  );
}
