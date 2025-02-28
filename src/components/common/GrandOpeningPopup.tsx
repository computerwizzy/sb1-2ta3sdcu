import React, { useState, useEffect } from 'react';
import { X, PartyPopper } from 'lucide-react';

export default function GrandOpeningPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup after a short delay
    const timer = setTimeout(() => setIsOpen(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full animate-slide-up">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="p-8 text-center">
          <div className="flex justify-center mb-4">
            <PartyPopper className="w-12 h-12 text-red-600" />
          </div>
          <h2 
            className="text-3xl font-bold mb-4 text-red-600"
            style={{ fontFamily: "'Cinzel Decorative', cursive" }}
          >
            Grand Opening!
          </h2>
          <p className="text-xl font-semibold mb-2">March 3, 2025</p>
          <p className="text-gray-600 mb-6">
            Join us for our grand opening celebration! Special offers and surprises await.
          </p>
          <button
            onClick={() => setIsOpen(false)}
            className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold 
              hover:bg-red-700 transition-colors w-full"
          >
            Can't Wait!
          </button>
        </div>
      </div>
    </div>
  );
}