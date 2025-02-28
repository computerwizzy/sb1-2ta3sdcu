import React from 'react';
import MenuItem from './MenuItem';
import { MenuItemType } from '../types/menu';

interface MenuSectionProps {
  title: string;
  items: MenuItemType[];
  activeFilter: string;
}

export default function MenuSection({ title, items, activeFilter }: MenuSectionProps) {
  const filteredItems = activeFilter === 'all'
    ? items
    : items.filter(item => item.dietary.includes(activeFilter));

  if (filteredItems.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <MenuItem key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
}