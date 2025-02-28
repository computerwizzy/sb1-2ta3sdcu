import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Phone } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-lg fixed w-full top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          <Link 
            to="/" 
            className="text-2xl sm:text-3xl font-bold text-red-600 hover:text-red-700 transition-colors"
            style={{ fontFamily: "'Cinzel Decorative', cursive" }}
          >
            ChinaMix
          </Link>

          <nav className="hidden md:flex flex-1 justify-center space-x-1">
            {[
              { path: '/', label: 'Home' },
              { path: '/digital-menu', label: 'Menu' },
              { path: '/location', label: 'Visit Us' },
            ].map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`px-4 py-2 rounded-lg text-base font-medium transition-all duration-200 
                  ${isActive(path)
                    ? 'bg-red-50 text-red-600 shadow-sm'
                    : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                  }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <a 
            href="tel:(205) 626-8040" 
            className="hidden md:flex items-center px-4 py-2 text-base font-medium
              bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors
              shadow-sm hover:shadow-md"
          >
            <Phone className="w-4 h-4 mr-2" />
            <span>(205) 626-8040</span>
          </a>

          <button
            className="md:hidden ml-auto p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile menu */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out
            ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="py-2 space-y-1">
            {[
              { path: '/', label: 'Home' },
              { path: '/digital-menu', label: 'Menu' },
              { path: '/location', label: 'Visit Us' },
            ].map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`block px-4 py-2 rounded-lg text-base font-medium transition-colors
                  ${isActive(path)
                    ? 'bg-red-50 text-red-600'
                    : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                  }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            <a 
              href="tel:(205) 626-8040" 
              className="block px-4 py-2 text-base font-medium text-red-600 hover:bg-red-50
                rounded-lg transition-colors"
            >
              <Phone className="w-4 h-4 inline mr-2" />
              <span>(205) 626-8040</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}