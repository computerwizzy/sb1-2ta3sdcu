import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Phone } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative h-[85vh] flex items-center">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80"
          alt="Chinese Fast Food"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center">
          <h1 
            className="text-4xl sm:text-6xl md:text-8xl font-bold text-white mb-4 sm:mb-6 animate-fade-in"
            style={{ fontFamily: "'Cinzel Decorative', cursive" }}
          >
            ChinaMix
          </h1>
          <p className="text-lg sm:text-2xl text-white mb-6 sm:mb-8 max-w-3xl mx-auto animate-slide-up px-4">
            Experience the finest Chinese and Japanese cuisine in Montevallo
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 sm:mb-12 px-4">
            <Link
              to="/digital-menu"
              className="w-full sm:w-64 bg-red-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-lg font-semibold 
                hover:bg-red-700 transition-all duration-300 transform hover:scale-105 
                shadow-lg hover:shadow-red-600/30"
            >
              View Menu
            </Link>
            <Link
              to="/location"
              className="w-full sm:w-64 bg-white text-red-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-lg font-semibold 
                hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 
                shadow-lg hover:shadow-white/30"
            >
              Visit Us
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 text-white max-w-3xl mx-auto px-4">
            <div className="flex items-center justify-center space-x-2 bg-black/30 backdrop-blur-sm p-3 sm:p-4 rounded-lg">
              <Clock className="w-4 sm:w-5 h-4 sm:h-5" />
              <span className="text-sm sm:text-base">Open until 10 PM</span>
            </div>
            <Link
              to="/location"
              className="flex items-center justify-center space-x-2 bg-black/30 backdrop-blur-sm p-3 sm:p-4 rounded-lg
                hover:bg-black/40 transition-colors cursor-pointer"
            >
              <MapPin className="w-4 sm:w-5 h-4 sm:h-5" />
              <span className="text-sm sm:text-base">728 Main St</span>
            </Link>
            <a 
              href="tel:(205) 626-8040"
              className="flex items-center justify-center space-x-2 bg-black/30 backdrop-blur-sm p-3 sm:p-4 rounded-lg
                hover:bg-black/40 transition-colors"
            >
              <Phone className="w-4 sm:w-5 h-4 sm:h-5" />
              <span className="text-sm sm:text-base">(205) 626-8040</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}