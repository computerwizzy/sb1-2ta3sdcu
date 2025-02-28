import React, { useState } from 'react';
import { Info, X } from 'lucide-react';

interface MenuItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  dietary: string[];
}

export default function MenuItem({ id, name, description, price, image, dietary }: MenuItemProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 group">
        <div className="relative overflow-hidden aspect-w-16 aspect-h-9">
          <img
            src={image}
            alt={name}
            className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-2 right-2 flex flex-wrap gap-1 justify-end max-w-[calc(100%-1rem)]">
            {dietary.map((tag) => (
              <span
                key={tag}
                className="inline-block px-2 py-1 bg-black/70 text-white text-xs rounded-full 
                  backdrop-blur-sm uppercase tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-base sm:text-lg">{name}</h3>
            <span className="font-bold text-red-600">${price.toFixed(2)}</span>
          </div>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
          
          <div className="flex justify-end">
            <button
              onClick={() => setShowDetails(true)}
              className="p-2 text-gray-500 hover:text-red-600 transition-colors"
              title="View Details"
            >
              <Info className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {showDetails && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto m-4">
            <div className="relative">
              <img src={image} alt={name} className="w-full h-48 sm:h-64 object-cover" />
              <button
                onClick={() => setShowDetails(false)}
                className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full 
                  hover:bg-black/70 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl sm:text-2xl font-bold">{name}</h2>
                <span className="text-xl sm:text-2xl font-bold text-red-600">${price.toFixed(2)}</span>
              </div>
              
              <p className="text-gray-600 mb-6">{description}</p>
              
              <div>
                <h3 className="font-semibold mb-2">Dietary Information</h3>
                <div className="flex flex-wrap gap-2">
                  {dietary.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}