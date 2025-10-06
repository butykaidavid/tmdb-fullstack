'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HeroSection({ lang = 'en' }: { lang?: string }) {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/${lang}/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="gradient-bg text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to <span className="text-primary">Movie</span><span className="text-secondary">DB</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Discover millions of movies, TV shows, and people. Explore now.
          </p>
          
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex shadow-2xl">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a movie, TV show, or person..."
              className="flex-1 px-6 py-4 text-lg text-gray-900 rounded-l-full focus:outline-none"
            />
            <button
              type="submit"
              className="bg-primary hover:bg-[#0199c0] px-8 py-4 text-lg font-semibold rounded-r-full transition-colors"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
