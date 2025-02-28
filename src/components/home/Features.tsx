import React from 'react';
import { Clock, Award, Leaf, UtensilsCrossed } from 'lucide-react';

const features = [
  {
    icon: UtensilsCrossed,
    title: 'Authentic Cuisine',
    description: 'Traditional recipes from China and Japan'
  },
  {
    icon: Award,
    title: 'Quality Assured',
    description: 'Top-rated restaurant in Montevallo'
  },
  {
    icon: Leaf,
    title: 'Fresh Ingredients',
    description: 'Locally sourced, premium ingredients'
  },
  {
    icon: Clock,
    title: 'Quick Service',
    description: 'Dine-in or takeout in 30 minutes'
  }
];

export default function Features() {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 
          className="text-4xl font-bold text-center mb-16"
          style={{ fontFamily: "'Cinzel Decorative', cursive" }}
        >
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature) => (
            <div key={feature.title} className="text-center group hover:transform hover:scale-105 transition-transform duration-200">
              <div className="inline-block p-6 bg-red-50 rounded-full mb-6 group-hover:bg-red-100 transition-colors">
                <feature.icon className="w-10 h-10 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}