import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';

const reviews = [
  {
    id: 1,
    author: 'Sarah M.',
    rating: 5,
    comment: 'The sushi is always fresh and the service is excellent! Best Asian restaurant in Montevallo.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
    date: 'March 3, 2025'
  },
  {
    id: 2,
    author: 'John D.',
    rating: 5,
    comment: 'Best ramen in town. The broth is incredibly flavorful. Their lunch specials are unbeatable!',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80',
    date: 'March 3, 2025'
  },
  {
    id: 3,
    author: 'Emily R.',
    rating: 4,
    comment: 'Love their vegetarian options! The staff is always friendly and accommodating.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80',
    date: 'March 3, 2025'
  }
];

const allReviews = [
  ...reviews,
  {
    id: 4,
    author: 'Michael P.',
    rating: 5,
    comment: 'The Kung Pao Chicken is phenomenal! Perfect balance of spicy and savory. Will definitely be back!',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80',
    date: 'March 3, 2025'
  },
  {
    id: 5,
    author: 'Lisa K.',
    rating: 5,
    comment: 'Dragon rolls are amazing here! Fresh ingredients and beautiful presentation every time.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80',
    date: 'March 4, 2025'
  },
  {
    id: 6,
    author: 'David W.',
    rating: 4,
    comment: 'Great value for money. The portions are generous and the quality is consistently good.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80',
    date: 'March 4, 2025'
  },
  {
    id: 7,
    author: 'Rachel H.',
    rating: 5,
    comment: 'The bubble tea selection is fantastic! Love trying different flavors each visit.',
    avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&q=80',
    date: 'March 3, 2025'
  },
  {
    id: 8,
    author: 'James L.',
    rating: 5,
    comment: 'Best Chinese food in the area! The spring rolls are crispy perfection.',
    avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&q=80',
    date: 'March 3, 2025'
  },
  {
    id: 9,
    author: 'Sofia C.',
    rating: 4,
    comment: 'Love the atmosphere and the friendly staff. Great place for family dinners!',
    avatar: 'https://images.unsplash.com/photo-1557296387-5358ad7997bb?auto=format&fit=crop&q=80',
    date: 'March 4, 2025'
  }
];

export default function Reviews() {
  const [showAll, setShowAll] = React.useState(false);
  const displayedReviews = showAll ? allReviews : reviews;

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 
          className="text-4xl font-bold text-center mb-4"
          style={{ fontFamily: "'Cinzel Decorative', cursive" }}
        >
          Customer Reviews
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Don't just take our word for it. Here's what our customers have to say about their dining experience at ChinaMix.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow relative"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-red-100" />
              <div className="flex items-center mb-6">
                <img
                  src={review.avatar}
                  alt={review.author}
                  className="w-14 h-14 rounded-full object-cover border-2 border-red-100"
                />
                <div className="ml-4">
                  <h3 className="font-semibold text-lg">{review.author}</h3>
                  <div className="flex text-yellow-400 mb-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">{review.comment}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center text-red-600 hover:text-red-700 font-semibold"
          >
            {showAll ? 'Show Less' : 'View All Reviews'}
            <svg className={`w-4 h-4 ml-2 transform transition-transform ${showAll ? 'rotate-180' : ''}`} 
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}