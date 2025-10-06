import Link from "next/link";

export default function LangLayout({ children, params }: { children: React.ReactNode; params: { lang: string } }) {
  const { lang } = params;
  return (
    <>
      <header className="border-b bg-white">
        <div className="mx-auto max-w-6xl p-4 flex items-center gap-6">
          <Link href={`/${lang}`} className="font-semibold">MovieDB</Link>
          <nav className="text-sm flex gap-4">
            <Link href={`/${lang}/search`} className="hover:underline">Search</Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl p-6">{children}</main>
    </>
  );
}
