'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Header({ lang = 'en' }: { lang?: string }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/${lang}/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="gradient-bg text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={`/${lang}`} className="flex items-center space-x-2">
            <div className="text-3xl font-bold">
              <span className="text-primary">Movie</span>
              <span className="text-secondary">DB</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href={`/${lang}/movie`} className="hover:text-primary transition-colors font-semibold">
              Movies
            </Link>
            <Link href={`/${lang}/tv`} className="hover:text-primary transition-colors font-semibold">
              TV Shows
            </Link>
            <Link href={`/${lang}/person`} className="hover:text-primary transition-colors font-semibold">
              People
            </Link>
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search movies, TV shows, people..."
              className="px-4 py-2 rounded-l-full text-gray-900 w-64 focus:w-80 transition-all"
            />
            <button
              type="submit"
              className="bg-primary hover:bg-[#0199c0] px-6 py-2 rounded-r-full font-semibold transition-colors"
            >
              Search
            </button>
          </form>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-3">
              <Link href={`/${lang}/movie`} className="hover:text-primary transition-colors font-semibold">
                Movies
              </Link>
              <Link href={`/${lang}/tv`} className="hover:text-primary transition-colors font-semibold">
                TV Shows
              </Link>
              <Link href={`/${lang}/person`} className="hover:text-primary transition-colors font-semibold">
                People
              </Link>
            </nav>
            <form onSubmit={handleSearch} className="mt-4 flex">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="flex-1 px-4 py-2 rounded-l-full text-gray-900"
              />
              <button
                type="submit"
                className="bg-primary hover:bg-[#0199c0] px-6 py-2 rounded-r-full font-semibold"
              >
                Go
              </button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
}
