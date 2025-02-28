import React, { useState, useEffect } from 'react';
import MenuFilter from '../components/MenuFilter';
import MenuSection from '../components/MenuSection';
import MenuDownloadOptions from '../components/MenuDownloadOptions';
import { menuService } from '../services/menuService';
import { MenuItemType } from '../types/menu';

export default function Menu() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [items, setItems] = useState<MenuItemType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMenuItems() {
      try {
        const data = await menuService.getMenuItems();
        setItems(data);
      } catch (err) {
        console.error('Failed to fetch menu items:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchMenuItems();
  }, []);

  // Group items by category
  const menuItems = {
    chinese: items.filter(item => item.category === 'chinese'),
    japanese: items.filter(item => item.category === 'japanese'),
    sushi: items.filter(item => item.category === 'sushi'),
    drinks: items.filter(item => item.category === 'drinks')
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-gray-600">Loading menu items...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 
            className="text-4xl font-bold mb-4"
            style={{ fontFamily: "'Cinzel Decorative', cursive" }}
          >
            Our Menu
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Explore our diverse selection of authentic Chinese and Japanese dishes, 
            crafted with care using traditional recipes and fresh ingredients.
          </p>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6">Download Our Digital Menu</h2>
            <MenuDownloadOptions />
          </div>
        </div>
        
        <MenuFilter
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        <div className="space-y-16">
          {menuItems.chinese.length > 0 && (
            <MenuSection
              title="Chinese Specialties"
              items={menuItems.chinese}
              activeFilter={activeFilter}
            />
          )}
          {menuItems.japanese.length > 0 && (
            <MenuSection
              title="Japanese Favorites"
              items={menuItems.japanese}
              activeFilter={activeFilter}
            />
          )}
          {menuItems.sushi.length > 0 && (
            <MenuSection
              title="Fresh Sushi"
              items={menuItems.sushi}
              activeFilter={activeFilter}
            />
          )}
          {menuItems.drinks.length > 0 && (
            <MenuSection
              title="Beverages"
              items={menuItems.drinks}
              activeFilter={activeFilter}
            />
          )}
        </div>

        {Object.values(menuItems).every(section => 
          section.filter(item => 
            activeFilter === 'all' || item.dietary.includes(activeFilter)
          ).length === 0
        ) && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No items found with the selected filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}