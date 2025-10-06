import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hu">
      <body>
        <header className="border-b bg-white/80 backdrop-blur">
          <div className="mx-auto max-w-6xl p-4 flex items-center justify-between">
            <Link href="/hu" className="text-xl font-semibold">Film DB</Link>
            <nav className="text-sm">
              <Link href="/hu/search" className="px-3 py-1 rounded hover:bg-gray-100">Keresés</Link>
              <Link href="/hu/popular" className="ml-2 px-3 py-1 rounded hover:bg-gray-100">Népszerű</Link>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
