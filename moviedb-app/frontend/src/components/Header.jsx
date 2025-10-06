import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaSearch, FaBars, FaTimes, FaFilm } from 'react-icons/fa';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { path: '/movies', label: 'Movies', subItems: [
      { path: '/movies/popular', label: 'Popular' },
      { path: '/movies/now-playing', label: 'Now Playing' },
      { path: '/movies/upcoming', label: 'Upcoming' },
      { path: '/movies/top-rated', label: 'Top Rated' },
    ]},
    { path: '/tv', label: 'TV Shows', subItems: [
      { path: '/tv/popular', label: 'Popular' },
      { path: '/tv/airing-today', label: 'Airing Today' },
      { path: '/tv/on-the-air', label: 'On The Air' },
      { path: '/tv/top-rated', label: 'Top Rated' },
    ]},
    { path: '/discover', label: 'Discover' },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-tmdb-dark'
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-2xl font-bold"
          >
            <FaFilm className={`${isScrolled ? 'text-tmdb-blue' : 'text-tmdb-light-blue'}`} />
            <span className={`${isScrolled ? 'text-tmdb-dark' : 'text-white'}`}>
              MovieDB
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <div key={link.path} className="relative group">
                <Link
                  to={link.path}
                  className={`font-semibold transition-colors duration-200 ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-tmdb-blue' 
                      : 'text-white hover:text-tmdb-light-blue'
                  } ${location.pathname.startsWith(link.path) ? 'text-tmdb-blue' : ''}`}
                >
                  {link.label}
                </Link>
                {link.subItems && (
                  <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-white rounded-lg shadow-lg py-2 w-48">
                      {link.subItems.map((subItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-tmdb-blue transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies, TV shows..."
                className={`pl-4 pr-10 py-2 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-tmdb-light-blue transition-all duration-200 ${
                  isScrolled 
                    ? 'bg-gray-100 text-gray-900 placeholder-gray-500' 
                    : 'bg-white/20 text-white placeholder-white/70'
                }`}
              />
              <button
                type="submit"
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${
                  isScrolled ? 'text-gray-600' : 'text-white/80'
                } hover:text-tmdb-blue transition-colors`}
              >
                <FaSearch />
              </button>
            </div>
          </form>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden ${isScrolled ? 'text-gray-700' : 'text-white'}`}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full pl-4 pr-10 py-2 rounded-full bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-tmdb-light-blue"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-tmdb-blue transition-colors"
                >
                  <FaSearch />
                </button>
              </div>
            </form>
            <nav className="space-y-2">
              {navLinks.map((link) => (
                <div key={link.path}>
                  <Link
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block py-2 font-semibold ${
                      location.pathname.startsWith(link.path)
                        ? 'text-tmdb-blue'
                        : 'text-gray-700'
                    }`}
                  >
                    {link.label}
                  </Link>
                  {link.subItems && (
                    <div className="ml-4 space-y-1">
                      {link.subItems.map((subItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          onClick={() => setIsMenuOpen(false)}
                          className="block py-1 text-gray-600 hover:text-tmdb-blue"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;