'use client'

import Link from 'next/link'
import { Search, Menu, X, Film, Tv, Users, Star } from 'lucide-react'
import { useState } from 'react'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: 'Movies', href: '/movies', icon: Film },
    { name: 'TV Shows', href: '/tv', icon: Tv },
    { name: 'People', href: '/people', icon: Users },
  ]

  return (
    <nav className="bg-tmdb-darker/95 backdrop-blur-custom border-b border-tmdb-light/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-tmdb-accent rounded-lg flex items-center justify-center">
              <Film className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-tmdb-text">MovieDB</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-2 text-tmdb-textSecondary hover:text-tmdb-text transition-colors duration-200"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Search */}
          <div className="hidden md:flex items-center">
            <Link
              href="/search"
              className="flex items-center space-x-2 bg-tmdb-light/50 hover:bg-tmdb-light/70 px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <Search className="w-4 h-4" />
              <span className="text-tmdb-textSecondary">Search</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-tmdb-textSecondary hover:text-tmdb-text transition-colors duration-200"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-tmdb-light/20">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 text-tmdb-textSecondary hover:text-tmdb-text transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
              <Link
                href="/search"
                className="flex items-center space-x-3 text-tmdb-textSecondary hover:text-tmdb-text transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <Search className="w-5 h-5" />
                <span>Search</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}