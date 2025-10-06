import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: 'The Basics',
      links: [
        { name: 'About MovieDB', href: '/about' },
        { name: 'Contact Us', href: '/contact' },
        { name: 'Support Forums', href: '/support' },
        { name: 'API', href: '/api-docs' },
      ]
    },
    {
      title: 'Get Involved',
      links: [
        { name: 'Contribution Bible', href: '/contribute' },
        { name: 'Add New Movie', href: '/movie/new' },
        { name: 'Add New TV Show', href: '/tv/new' },
      ]
    },
    {
      title: 'Community',
      links: [
        { name: 'Guidelines', href: '/guidelines' },
        { name: 'Discussions', href: '/discussions' },
        { name: 'Leaderboard', href: '/leaderboard' },
        { name: 'Twitter', href: 'https://twitter.com' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Terms of Use', href: '/terms' },
        { name: 'API Terms of Use', href: '/api-terms' },
        { name: 'Privacy Policy', href: '/privacy' },
      ]
    }
  ]

  return (
    <footer className="bg-dark-900 border-t border-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-8 pt-8 border-t border-dark-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-white font-bold text-xl">MovieDB</span>
            </div>
            <p className="text-gray-400 text-sm">
              © {currentYear} MovieDB. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}