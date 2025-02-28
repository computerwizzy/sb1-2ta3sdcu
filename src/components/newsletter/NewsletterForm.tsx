import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { newsletterService } from '../../services/newsletter';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      await newsletterService.subscribe(email);
      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setErrorMessage('Failed to subscribe. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full px-4 py-3 rounded bg-white/20 border border-white/30 
            placeholder-white/70 text-white focus:outline-none focus:ring-2 
            focus:ring-white"
          disabled={status === 'loading'}
          required
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-white text-red-600 px-6 py-3 rounded font-semibold 
          hover:bg-red-50 transition-colors flex items-center justify-center 
          group disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? (
          'Subscribing...'
        ) : (
          <>
            Subscribe Now
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>

      {status === 'success' && (
        <p className="text-green-300 text-sm">Successfully subscribed to the newsletter!</p>
      )}

      {status === 'error' && (
        <p className="text-red-300 text-sm">{errorMessage}</p>
      )}
    </form>
  );
}