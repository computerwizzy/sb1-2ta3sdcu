import React from 'react';
import { Filter } from 'lucide-react';

type DietaryFilter = 'all' | 'vegetarian' | 'gluten-free' | 'spicy';

interface MenuFilterProps {
  activeFilter: DietaryFilter;
  onFilterChange: (filter: DietaryFilter) => void;
}

export default function MenuFilter({ activeFilter, onFilterChange }: MenuFilterProps) {
  const filters: { value: DietaryFilter; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'gluten-free', label: 'Gluten-Free' },
    { value: 'spicy', label: 'Spicy' },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8 flex-wrap">
      <div className="flex items-center gap-2">
        <Filter className="w-5 h-5" />
        <span className="font-medium">Filters:</span>
      </div>
      <div className="flex gap-2 flex-wrap">
        {filters.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => onFilterChange(value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap
              ${activeFilter === value
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}