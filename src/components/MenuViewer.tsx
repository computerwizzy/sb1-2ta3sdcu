import React from 'react';
import { X } from 'lucide-react';

interface MenuViewerProps {
  url: string;
  title: string;
  onClose: () => void;
}

export default function MenuViewer({ url, title, onClose }: MenuViewerProps) {
  return (
    <div 
      className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="relative w-full max-w-5xl mx-auto">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-red-400 transition-colors"
        >
          <X className="w-8 h-8" />
        </button>
        
        <h2 className="text-center text-white text-2xl font-bold mb-4">{title}</h2>
        
        <div 
          className="relative bg-white rounded-lg shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={url}
            alt={title}
            className="w-full h-auto max-h-[80vh] object-contain"
          />
        </div>
      </div>
    </div>
  );
}