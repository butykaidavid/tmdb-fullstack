import Link from "next/link";
export default function Home(){
  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="text-3xl font-bold">TMDB Full Scraper – Demo</h1>
      <ul className="list-disc pl-6 mt-4">
        <li><Link href="/hu/search">Keresés</Link></li>
      </ul>
    </main>
  );
}
