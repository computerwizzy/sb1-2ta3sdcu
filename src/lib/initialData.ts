import { MenuItemType } from '../types/menu';

export const initialMenuItems: MenuItemType[] = [
  {
    id: 'c1',
    name: 'Kung Pao Chicken',
    description: 'Spicy diced chicken with peanuts, vegetables, and chili peppers in our signature sauce',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&q=80',
    dietary: ['spicy'],
    category: 'chinese'
  },
  // Add more initial menu items here
];