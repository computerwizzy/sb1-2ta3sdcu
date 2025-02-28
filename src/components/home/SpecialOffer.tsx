import React from 'react';
import { Tag } from 'lucide-react';
import NewsletterForm from '../newsletter/NewsletterForm';

export default function SpecialOffer() {
  return (
    <div className="bg-red-600 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 
              className="text-4xl font-bold mb-6"
              style={{ fontFamily: "'Cinzel Decorative', cursive" }}
            >
              Special Offers
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Tag className="w-6 h-6 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Lunch Special $9.99-$11.95</h3>
                  <p className="text-red-100">Monday to Friday, 11 AM - 3 PM</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
            <h3 className="text-2xl font-semibold mb-6">Join Our Newsletter</h3>
            <NewsletterForm />
          </div>
        </div>
      </div>
    </div>
  );
}