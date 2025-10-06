import { Link } from 'react-router-dom';
import { FaGithub, FaTwitter, FaFacebook, FaInstagram, FaFilm } from 'react-icons/fa';

function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    'The Basics': [
      { label: 'About MovieDB', path: '/about' },
      { label: 'Contact Us', path: '/contact' },
      { label: 'Support Forums', path: '/support' },
      { label: 'API', path: '/api' },
    ],
    'Get Involved': [
      { label: 'Contribution Bible', path: '/contribute' },
      { label: 'Add New Movie', path: '/movie/add' },
      { label: 'Add New TV Show', path: '/tv/add' },
    ],
    'Community': [
      { label: 'Guidelines', path: '/guidelines' },
      { label: 'Discussions', path: '/discussions' },
      { label: 'Leaderboard', path: '/leaderboard' },
    ],
    'Legal': [
      { label: 'Terms of Use', path: '/terms' },
      { label: 'Privacy Policy', path: '/privacy' },
    ],
  };

  const socialLinks = [
    { icon: FaFacebook, url: '#', label: 'Facebook' },
    { icon: FaTwitter, url: '#', label: 'Twitter' },
    { icon: FaInstagram, url: '#', label: 'Instagram' },
    { icon: FaGithub, url: '#', label: 'GitHub' },
  ];

  return (
    <footer className="bg-tmdb-dark text-white mt-16">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 text-2xl font-bold mb-4">
              <FaFilm className="text-tmdb-light-blue" />
              <span>MovieDB</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Millions of movies, TV shows and people to discover. Explore now.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    aria-label={social.label}
                    className="text-gray-400 hover:text-tmdb-light-blue transition-colors"
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-bold text-lg mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-tmdb-light-blue transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} MovieDB. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-2 md:mt-0">
              Data provided by{' '}
              <a
                href="https://www.themoviedb.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-tmdb-light-blue hover:underline"
              >
                The Movie Database (TMDB)
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;