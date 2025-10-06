import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { 
  FilmIcon, 
  TvIcon, 
  UserGroupIcon, 
  ChartBarIcon,
  StarIcon,
  CalendarIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline'

const categories = [
  {
    title: 'Movies',
    description: 'Explore movies by different categories',
    icon: FilmIcon,
    links: [
      { name: 'Popular Movies', href: '/movies' },
      { name: 'Top Rated Movies', href: '/movies/top-rated' },
      { name: 'Upcoming Movies', href: '/movies/upcoming' },
      { name: 'Now Playing', href: '/movies/now-playing' },
    ]
  },
  {
    title: 'TV Shows',
    description: 'Discover TV shows and series',
    icon: TvIcon,
    links: [
      { name: 'Popular TV Shows', href: '/tv' },
      { name: 'Top Rated TV Shows', href: '/tv/top-rated' },
      { name: 'On The Air', href: '/tv/on-air' },
      { name: 'Airing Today', href: '/tv/airing-today' },
    ]
  },
  {
    title: 'People',
    description: 'Find actors, directors, and crew',
    icon: UserGroupIcon,
    links: [
      { name: 'Popular People', href: '/people' },
      { name: 'Trending People', href: '/people/trending' },
    ]
  },
  {
    title: 'Discover',
    description: 'Find new content to watch',
    icon: ChartBarIcon,
    links: [
      { name: 'Trending', href: '/trending' },
      { name: 'Genres', href: '/genres' },
      { name: 'Collections', href: '/collections' },
      { name: 'Keywords', href: '/keywords' },
    ]
  }
]

const quickLinks = [
  { name: 'About MovieDB', href: '/about', icon: BookOpenIcon },
  { name: 'API Documentation', href: '/api-docs', icon: BookOpenIcon },
  { name: 'Support', href: '/support', icon: BookOpenIcon },
  { name: 'Contribute', href: '/contribute', icon: BookOpenIcon },
]

export default function MorePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Explore More
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Discover all the ways to explore movies, TV shows, and people on MovieDB
            </p>
          </div>
          
          {/* Main Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {categories.map((category) => {
              const IconComponent = category.icon
              return (
                <div key={category.title} className="card p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg">
                      <IconComponent className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        {category.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {category.links.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className="block text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
          
          {/* Quick Links */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Quick Links
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickLinks.map((link) => {
                const IconComponent = link.icon
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="card p-4 hover:shadow-lg transition-shadow duration-200 group"
                  >
                    <div className="flex items-center space-x-3">
                      <IconComponent className="w-5 h-5 text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200" />
                      <span className="text-gray-900 dark:text-white font-medium">
                        {link.name}
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
          
          {/* Stats Section */}
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              MovieDB by the Numbers
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  1M+
                </div>
                <div className="text-gray-600 dark:text-gray-400">Movies</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  200K+
                </div>
                <div className="text-gray-600 dark:text-gray-400">TV Shows</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  3M+
                </div>
                <div className="text-gray-600 dark:text-gray-400">People</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  50M+
                </div>
                <div className="text-gray-600 dark:text-gray-400">Images</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}