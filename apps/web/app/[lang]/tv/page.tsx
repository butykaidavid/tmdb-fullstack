import Link from 'next/link';

export default function TVShowsPage({ params }: { params: { lang: string } }) {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="gradient-bg text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">TV Shows</h1>
          <p className="text-xl text-gray-200">Explore popular TV series and shows</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <svg className="w-20 h-20 mx-auto text-gray-300 mb-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-700 mb-4">TV Shows Coming Soon</h2>
          <p className="text-gray-600 mb-6">
            TV show browsing and details will be available once the data is imported.
          </p>
          <Link href={`/${params.lang}`} className="btn-primary inline-block">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
