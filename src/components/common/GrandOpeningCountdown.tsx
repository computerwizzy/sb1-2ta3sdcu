import React, { useState, useEffect } from 'react';
import { X, PartyPopper } from 'lucide-react';

export default function GrandOpeningCountdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    // Check if the popup has been closed before
    const hasClosedPopup = localStorage.getItem('chinamix_popup_closed');
    
    // Check if the grand opening date has passed
    const grandOpeningDate = new Date("March 3, 2025 00:00:00").getTime();
    const now = new Date().getTime();
    const isAfterOpening = now > grandOpeningDate;
    
    // Don't show popup if it's after the opening date
    if (isAfterOpening) {
      setIsExpired(true);
      return;
    }
    
    // Show popup after a short delay if not closed before
    if (!hasClosedPopup) {
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    // Set the Grand Opening Date (March 3, 2025)
    const grandOpeningDate = new Date("March 3, 2025 00:00:00").getTime();

    // Update the countdown every 1 second
    const countdownInterval = setInterval(() => {
      // Get today's date and time
      const now = new Date().getTime();

      // Find the distance between now and the grand opening date
      const distance = grandOpeningDate - now;

      // If the countdown is finished
      if (distance < 0) {
        clearInterval(countdownInterval);
        setTimeLeft({
          days: '00',
          hours: '00',
          minutes: '00',
          seconds: '00'
        });
        setIsExpired(true);
        setIsOpen(false);
        return;
      }

      // Time calculations for days, hours, minutes and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the results
      setTimeLeft({
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0')
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Store that the user has closed the popup
    localStorage.setItem('chinamix_popup_closed', 'true');
  };

  // Don't render anything if the countdown has expired
  if (isExpired) return null;
  
  // Don't render if popup is closed
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full animate-slide-up">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="p-8 text-center">
          <div className="flex justify-center mb-4">
            <PartyPopper className="w-12 h-12 text-red-600" />
          </div>
          <h2 
            className="text-3xl font-bold mb-2 text-red-600"
            style={{ fontFamily: "'Cinzel Decorative', cursive" }}
          >
            China Mix Restaurant
          </h2>
          <p className="text-xl font-semibold mb-4 text-gray-600">Coming Soon to Montevallo, Alabama</p>
          <p className="text-gray-600 mb-6">
            We're working hard to bring you the best mix of Chinese and Japanese cuisine. Stay tuned!
          </p>

          <div className="flex justify-center gap-4 mb-6">
            <div className="text-center bg-red-50 p-3 rounded-lg w-16">
              <div className="text-3xl font-bold text-red-600">{timeLeft.days}</div>
              <div className="text-xs text-gray-500 font-medium">DAYS</div>
            </div>
            <div className="text-center bg-red-50 p-3 rounded-lg w-16">
              <div className="text-3xl font-bold text-red-600">{timeLeft.hours}</div>
              <div className="text-xs text-gray-500 font-medium">HOURS</div>
            </div>
            <div className="text-center bg-red-50 p-3 rounded-lg w-16">
              <div className="text-3xl font-bold text-red-600">{timeLeft.minutes}</div>
              <div className="text-xs text-gray-500 font-medium">MIN</div>
            </div>
            <div className="text-center bg-red-50 p-3 rounded-lg w-16">
              <div className="text-3xl font-bold text-red-600">{timeLeft.seconds}</div>
              <div className="text-xs text-gray-500 font-medium">SEC</div>
            </div>
          </div>

          <p className="text-gray-600">We are Working Hard for the</p>
          <h3 
            className="text-2xl font-bold my-2 text-red-600"
            style={{ fontFamily: "'Cinzel Decorative', cursive" }}
          >
            Grand Opening on March 3, 2025
          </h3>

          <p className="text-gray-700 font-medium mt-6 mb-2">728 Main St. Montevallo, Al. 35115</p>
          <p className="text-gray-600">Experience the exquisite flavors of China Mix, coming soon!</p>
        </div>
      </div>
    </div>
  );
}