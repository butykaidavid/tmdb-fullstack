import Link from "next/link";

export default function LangHome({ params }: { params: { lang: string } }){
  const { lang } = params;
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Welcome to MovieDB</h1>
      <p className="opacity-80">Explore movies and people. Try search to get started.</p>
      <Link href={`/${lang}/search`} className="inline-block bg-gray-900 text-white px-4 py-2 rounded-lg">Search</Link>
    </div>
  );
}
