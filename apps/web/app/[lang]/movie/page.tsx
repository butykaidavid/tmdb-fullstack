import Link from 'next/link';

export default function MoviesPage({ params }: { params: { lang: string } }) {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="gradient-bg text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Movies</h1>
          <p className="text-xl text-gray-200">Explore the world of cinema</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href={`/${params.lang}/movie/popular`} className="bg-white rounded-lg shadow-md p-8 hover:shadow-xl transition-shadow group">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">Popular</h2>
            </div>
            <p className="text-gray-600">Check out the most popular movies right now</p>
          </Link>

          <Link href={`/${params.lang}/movie/top-rated`} className="bg-white rounded-lg shadow-md p-8 hover:shadow-xl transition-shadow group">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">Top Rated</h2>
            </div>
            <p className="text-gray-600">Discover the highest-rated movies of all time</p>
          </Link>

          <Link href={`/${params.lang}/movie/upcoming`} className="bg-white rounded-lg shadow-md p-8 hover:shadow-xl transition-shadow group">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-dark rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">Upcoming</h2>
            </div>
            <p className="text-gray-600">See what movies are coming soon</p>
          </Link>
        </div>

        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">📌 Note</h3>
          <p className="text-blue-800 text-sm">
            Movie browsing pages are placeholders. Once the ETL pipeline imports movie data, 
            you can enhance these pages to display actual movie listings with filtering and sorting options.
          </p>
        </div>
      </div>
    </div>
  );
}
