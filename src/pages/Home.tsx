import React from 'react';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import SpecialOffer from '../components/home/SpecialOffer';
import Reviews from '../components/home/Reviews';

export default function Home() {
  return (
    <div className="pt-16">
      <Hero />
      <Features />
      <SpecialOffer />
      <Reviews />
    </div>
  );
}