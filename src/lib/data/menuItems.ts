import { MenuItemType } from '../../types/menu';

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
  {
    id: 'c2',
    name: 'Vegetable Spring Rolls',
    description: 'Crispy rolls filled with fresh mixed vegetables, served with sweet chili sauce',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1600470854227-9817ae6f9c48?q=80',
    dietary: ['vegetarian'],
    category: 'chinese'
  },
  {
    id: 'j1',
    name: 'Tonkotsu Ramen',
    description: 'Rich pork bone broth with chashu, soft-boiled egg, bamboo shoots, and fresh vegetables',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80',
    dietary: [],
    category: 'japanese'
  },
  {
    id: 's1',
    name: 'Dragon Roll',
    description: 'Eel and cucumber inside, topped with avocado and sweet eel sauce',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80',
    dietary: [],
    category: 'sushi'
  }
];