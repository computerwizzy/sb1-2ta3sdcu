import React, { useState, useRef, useEffect } from 'react';
import { FileText, Download, Maximize2, X, ZoomIn, ZoomOut, MoveUp, MoveDown, MoveLeft, MoveRight, RotateCcw } from 'lucide-react';

const menuItems = [
  {
    id: 1,
    title: "Lunch Menu",
    pdfSrc: "https://res.cloudinary.com/dcwwi6uwp/image/upload/v1736716847/chinamix-lunch-menu_nnal0u.pdf",
    previewSrc: "https://res.cloudinary.com/dcwwi6uwp/image/upload/v1736721430/chinamix-lunch-menu_qlkudx.jpg",
    description: "View our lunch specials and regular menu items"
  },
  {
    id: 2,
    title: "Dinner Menu",
    pdfSrc: "https://res.cloudinary.com/dcwwi6uwp/image/upload/v1736716847/chinamix-dinner-menu_rslnkl.pdf",
    previewSrc: "https://res.cloudinary.com/dcwwi6uwp/image/upload/v1736721430/chinamix-dinner-menu_sewkce.jpg",
    description: "Explore our dinner selections and specialties"
  }
];

const DEFAULT_SCALE = 0.45;

export default function DigitalMenu() {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [scale, setScale] = useState(DEFAULT_SCALE);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setZoomedImage(null);
    setScale(DEFAULT_SCALE);
    setPosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    if (zoomedImage) {
      setScale(DEFAULT_SCALE);
      setPosition({ x: 0, y: 0 });
    }
  }, [zoomedImage]);

  const handleZoom = (delta: number) => {
    setScale(prev => {
      const newScale = prev + delta;
      return Math.min(Math.max(0.2, newScale), 3);
    });
  };

  const handleMove = (direction: 'up' | 'down' | 'left' | 'right') => {
    const step = 50;
    setPosition(prev => {
      switch (direction) {
        case 'up': return { ...prev, y: prev.y - step };
        case 'down': return { ...prev, y: prev.y + step };
        case 'left': return { ...prev, x: prev.x - step };
        case 'right': return { ...prev, x: prev.x + step };
        default: return prev;
      }
    });
  };

  const handleReset = () => {
    setScale(DEFAULT_SCALE);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleMouseUpGlobal = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUpGlobal);
    return () => window.removeEventListener('mouseup', handleMouseUpGlobal);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 
            className="text-4xl font-bold mb-4"
            style={{ fontFamily: "'Cinzel Decorative', cursive" }}
          >
            Digital Menu
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our menu items in high resolution. Click on any menu to view in detail.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {menuItems.map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div 
                className="relative aspect-[4/3] cursor-pointer group"
                onClick={() => setZoomedImage(item.previewSrc)}
              >
                <img
                  src={item.previewSrc}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <Maximize2 className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                
                <div className="flex gap-2">
                  <a
                    href={item.pdfSrc}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg 
                      hover:bg-red-700 transition-colors flex-1 justify-center"
                  >
                    <FileText className="w-5 h-5" />
                    <span>View PDF</span>
                  </a>
                  <a
                    href={item.pdfSrc}
                    download
                    className="flex items-center justify-center p-2 bg-gray-100 text-gray-700 
                      rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Download className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {zoomedImage && (
          <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            onClick={handleClose}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 bg-white/10 text-white p-3 rounded-full 
                hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-8">
              {/* Controls Panel */}
              <div 
                className="bg-black/50 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center gap-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-white font-medium text-lg">
                  Menu Controls
                </div>

                <div className="text-white text-sm font-medium bg-white/10 px-4 py-2 rounded-lg">
                  Zoom: {Math.round(scale * 100)}%
                </div>

                <div className="flex flex-col gap-3 w-full">
                  <button
                    onClick={() => handleZoom(0.1)}
                    className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-lg transition-colors
                      flex items-center justify-center gap-2 w-full"
                  >
                    <ZoomIn className="w-5 h-5" />
                    <span className="text-sm">Zoom In</span>
                  </button>
                  <button
                    onClick={() => handleZoom(-0.1)}
                    className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-lg transition-colors
                      flex items-center justify-center gap-2 w-full"
                  >
                    <ZoomOut className="w-5 h-5" />
                    <span className="text-sm">Zoom Out</span>
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2 w-full">
                  <div></div>
                  <button
                    onClick={() => handleMove('up')}
                    className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-lg transition-colors"
                  >
                    <MoveUp className="w-5 h-5" />
                  </button>
                  <div></div>
                  <button
                    onClick={() => handleMove('left')}
                    className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-lg transition-colors"
                  >
                    <MoveLeft className="w-5 h-5" />
                  </button>
                  <div className="bg-white/10 p-2 rounded-lg flex items-center justify-center">
                    <span className="text-white/80 text-sm font-medium">Move</span>
                  </div>
                  <button
                    onClick={() => handleMove('right')}
                    className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-lg transition-colors"
                  >
                    <MoveRight className="w-5 h-5" />
                  </button>
                  <div></div>
                  <button
                    onClick={() => handleMove('down')}
                    className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-lg transition-colors"
                  >
                    <MoveDown className="w-5 h-5" />
                  </button>
                  <div></div>
                </div>

                <button
                  onClick={handleReset}
                  className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-lg transition-colors
                    flex items-center justify-center gap-2 w-full mt-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span className="text-sm">Reset View</span>
                </button>
              </div>

              {/* Image container with drag functionality */}
              <div 
                ref={containerRef}
                className="relative overflow-hidden w-[75vw] h-[85vh] cursor-grab active:cursor-grabbing"
                onClick={(e) => e.stopPropagation()}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <div 
                  className={`absolute left-1/2 top-1/2 ${isDragging ? '' : 'transition-transform duration-200'}`}
                  style={{
                    transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px)) scale(${scale})`,
                    transformOrigin: 'center',
                  }}
                >
                  <img
                    ref={imageRef}
                    src={zoomedImage}
                    alt="Zoomed menu"
                    className="max-w-none select-none"
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Our menus are available in PDF format for easy viewing and downloading.
            Click any menu image to view it in full size.
          </p>
        </div>
      </div>
    </div>
  );
}