import Link from 'next/link';

export default function PeoplePage({ params }: { params: { lang: string } }) {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="gradient-bg text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">People</h1>
          <p className="text-xl text-gray-200">Explore actors, directors, and crew members</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <svg className="w-20 h-20 mx-auto text-gray-300 mb-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-700 mb-4">People Directory Coming Soon</h2>
          <p className="text-gray-600 mb-6">
            Browse through actors, directors, and other industry professionals once the data is imported.
          </p>
          <Link href={`/${params.lang}/search`} className="btn-primary inline-block">
            Search People
          </Link>
        </div>
      </div>
    </div>
  );
}
