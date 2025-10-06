import HeroSection from '@/components/HeroSection';
import MovieSection from '@/components/MovieSection';
import { api } from '@/lib/api';

export default async function LangHome({ params }: { params: { lang: string } }) {
  // Fetch multiple categories of movies
  let popularMovies = [];
  let topRatedMovies = [];
  let upcomingMovies = [];

  try {
    // Try to fetch from API - these endpoints may not exist yet
    const searchRes = await api<any>('/api/search?q=&limit=12').catch(() => ({ movies: [] }));
    popularMovies = searchRes.movies || [];
    
    // For demo purposes, we'll show the same movies in different sections
    // In production, you'd have separate endpoints for each category
    topRatedMovies = popularMovies.slice(0, 12);
    upcomingMovies = popularMovies.slice(0, 12);
  } catch (error) {
    console.error('Error fetching movies:', error);
  }

  return (
    <div>
      <HeroSection lang={params.lang} />
      
      <div className="bg-gray-50">
        {popularMovies.length > 0 && (
          <MovieSection title="Popular Movies" movies={popularMovies} lang={params.lang} />
        )}
        
        {topRatedMovies.length > 0 && (
          <MovieSection title="Top Rated Movies" movies={topRatedMovies} lang={params.lang} />
        )}
        
        {upcomingMovies.length > 0 && (
          <MovieSection title="Upcoming Movies" movies={upcomingMovies} lang={params.lang} />
        )}

        {/* If no movies are available, show a message */}
        {popularMovies.length === 0 && (
          <div className="container mx-auto px-4 py-20 text-center">
            <div className="max-w-2xl mx-auto">
              <svg className="w-24 h-24 mx-auto text-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
              </svg>
              <h2 className="text-2xl font-bold text-gray-700 mb-4">Welcome to MovieDB!</h2>
              <p className="text-gray-600 mb-6">
                The database is being set up. Please run the ETL pipeline to import movie data.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-left">
                <h3 className="font-semibold text-blue-900 mb-2">Quick Setup:</h3>
                <ol className="list-decimal list-inside space-y-2 text-blue-800 text-sm">
                  <li>Make sure Docker containers are running: <code className="bg-blue-100 px-2 py-1 rounded">docker compose up -d</code></li>
                  <li>Run database migrations</li>
                  <li>Start the ETL pipeline to import movie data</li>
                  <li>Refresh this page to see the movies!</li>
                </ol>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
