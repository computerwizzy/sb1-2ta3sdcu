import React from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';

interface ImageViewerProps {
  src: string;
  alt: string;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export default function ImageViewer({ src, alt, isExpanded, onToggleExpand }: ImageViewerProps) {
  return (
    <div className="relative group">
      <img
        src={src}
        alt={alt}
        className={`w-full rounded-lg shadow-lg ${isExpanded ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
        onClick={onToggleExpand}
      />
      <button
        onClick={onToggleExpand}
        className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full 
          opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {isExpanded ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
      </button>
    </div>
  );
}