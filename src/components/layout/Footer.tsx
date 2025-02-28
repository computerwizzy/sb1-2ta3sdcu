import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link 
              to="/"
              onClick={handleLogoClick}
              className="inline-block"
              style={{ fontFamily: "'Cinzel Decorative', cursive" }}
            >
              <h2 className="text-2xl font-bold mb-4 hover:text-red-400 transition-colors">
                ChinaMix
              </h2>
            </Link>
            <p className="text-gray-400">
              Authentic Chinese and Japanese cuisine in Montevallo
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-gray-400">
              <p className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                728 Main St, Montevallo, AL 35115
              </p>
              <a 
                href="tel:(205) 626-8040" 
                className="flex items-center hover:text-red-400 transition-colors"
              >
                <Phone className="w-5 h-5 mr-2" />
                (205) 626-8040
              </a>
               {/* Remove or comment out the email section below */}
              {/* <a 
                href="mailto:info@chinamix.com" 
                className="flex items-center hover:text-red-400 transition-colors"
              >
                <Mail className="w-5 h-5 mr-2" />
                info@chinamixrestaurant.com
              </a> */}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Hours</h3>
            <div className="space-y-2 text-gray-400">
              <p>Mon-Fri: 10:30 AM - 9:00 PM</p>
              <p>Sat: 11:00 AM - 9:00 PM</p>
              <p>Sun: 12:00 AM - 9:00 PM</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          © {new Date().getFullYear()} ChinaMix. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
