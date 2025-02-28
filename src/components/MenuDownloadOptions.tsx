import React from 'react';
import { Download, Eye } from 'lucide-react';

const menuOptions = [
  {
    id: 'lunch',
    title: 'Lunch Menu',
    url: 'https://res.cloudinary.com/dcwwi6uwp/image/upload/v1736716847/chinamix-lunch-menu_nnal0u.pdf'
  },
  {
    id: 'dinner',
    title: 'Dinner Menu',
    url: 'https://res.cloudinary.com/dcwwi6uwp/image/upload/v1736716847/chinamix-dinner-menu_rslnkl.pdf'
  }
];

export default function MenuDownloadOptions() {
  const handleView = (menu: typeof menuOptions[0]) => {
    window.open(menu.url, '_blank');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {menuOptions.map((menu) => (
        <div key={menu.id} className="flex gap-2">
          <button
            onClick={() => handleView(menu)}
            className="flex-1 inline-flex items-center justify-center px-4 sm:px-6 py-3 sm:py-4 
              bg-red-600 text-white text-base sm:text-lg font-semibold rounded-lg 
              hover:bg-red-700 transition-all transform hover:scale-105 
              shadow-lg hover:shadow-red-600/30"
          >
            <Eye className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
            <span className="whitespace-nowrap">View {menu.title}</span>
          </button>
          <button
            onClick={() => window.open(menu.url, '_blank')}
            className="inline-flex items-center justify-center px-3 sm:px-4 py-3 sm:py-4 
              bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 
              transition-all transform hover:scale-105 shadow-lg"
            title={`Download ${menu.title}`}
          >
            <Download className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      ))}
    </div>
  );
}