import React, { useState } from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';

export default function MenuBoard() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-12">
      <div className="relative group">
        <img
          src="https://cloud.tupctech.com/apps/photos/api/v1/publicPreview/3971?x=2048&y=2048&token=gNBeETwYPSHDHF0qpOk9azD8fdAAPuV8"
          alt="Digital Menu Board"
          className={`w-full rounded-lg shadow-lg ${isExpanded ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
          onClick={() => setIsExpanded(!isExpanded)}
        />
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full 
            opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {isExpanded ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
        </button>
      </div>

      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsExpanded(false)}
        >
          <img
            src="https://cloud.tupctech.com/apps/photos/api/v1/publicPreview/3971?x=2048&y=2048&token=gNBeETwYPSHDHF0qpOk9azD8fdAAPuV8"
            alt="Digital Menu Board"
            className="max-w-full max-h-[90vh] object-contain"
          />
          <button
            onClick={() => setIsExpanded(false)}
            className="absolute top-4 right-4 bg-white/10 text-white p-2 rounded-full 
              hover:bg-white/20 transition-colors"
          >
            <Minimize2 className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}