import React from 'react';
import { Minimize2 } from 'lucide-react';

interface FullscreenViewerProps {
  src: string;
  alt: string;
  onClose: () => void;
}

export default function FullscreenViewer({ src, alt, onClose }: FullscreenViewerProps) {
  return (
    <div 
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <img
        src={src}
        alt={alt}
        className="max-w-full max-h-[90vh] object-contain"
      />
      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-white/10 text-white p-2 rounded-full 
          hover:bg-white/20 transition-colors"
      >
        <Minimize2 className="w-5 h-5" />
      </button>
    </div>
  );
}