/*
  # Populate menu items table
  
  1. Changes
    - Add initial menu items to the menu_items table
    - Include items for all categories: chinese, japanese, sushi, and drinks
    - Each item includes name, description, price, image, dietary tags, and category
*/

-- Populate Chinese dishes
INSERT INTO menu_items (name, description, price, image, dietary, category) VALUES
  ('Kung Pao Chicken', 'Spicy diced chicken with peanuts, vegetables, and chili peppers in our signature sauce', 14.99, 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&q=80', ARRAY['spicy'], 'chinese'),
  ('Vegetable Spring Rolls', 'Crispy rolls filled with fresh mixed vegetables, served with sweet chili sauce', 6.99, 'https://images.unsplash.com/photo-1600470854227-9817ae6f9c48?q=80', ARRAY['vegetarian'], 'chinese'),
  ('Mapo Tofu', 'Spicy tofu in fermented black bean sauce with minced mushrooms and Sichuan peppercorns', 12.99, 'https://images.unsplash.com/photo-1672842744841-1cad5133bc24?q=80', ARRAY['vegetarian', 'spicy'], 'chinese'),
  ('Sweet and Sour Chicken', 'Crispy chicken pieces with bell peppers and pineapple in sweet and sour sauce', 13.99, 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&q=80', ARRAY[]::text[], 'chinese');

-- Populate Japanese dishes
INSERT INTO menu_items (name, description, price, image, dietary, category) VALUES
  ('Tonkotsu Ramen', 'Rich pork bone broth with chashu, soft-boiled egg, bamboo shoots, and fresh vegetables', 15.99, 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80', ARRAY[]::text[], 'japanese'),
  ('Vegetable Tempura', 'Assorted seasonal vegetables in light, crispy batter served with tentsuyu sauce', 11.99, 'https://images.unsplash.com/photo-1615361200141-f45040f367be?auto=format&fit=crop&q=80', ARRAY['vegetarian', 'gluten-free'], 'japanese'),
  ('Chicken Katsu', 'Crispy panko-breaded chicken cutlet served with tonkatsu sauce and shredded cabbage', 14.99, 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80', ARRAY[]::text[], 'japanese');

-- Populate Sushi items
INSERT INTO menu_items (name, description, price, image, dietary, category) VALUES
  ('Dragon Roll', 'Eel and cucumber inside, topped with avocado and sweet eel sauce', 16.99, 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80', ARRAY[]::text[], 'sushi'),
  ('Vegetable Roll', 'Fresh cucumber, avocado, carrot, and pickled radish wrapped in sushi rice', 12.99, 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&q=80', ARRAY['vegetarian', 'gluten-free'], 'sushi'),
  ('Rainbow Roll', 'California roll topped with assorted fresh fish and avocado', 17.99, 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&q=80', ARRAY[]::text[], 'sushi');

-- Populate Drinks
INSERT INTO menu_items (name, description, price, image, dietary, category) VALUES
  ('Premium Green Tea', 'Traditional Japanese sencha green tea, served hot', 3.99, 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&q=80', ARRAY['gluten-free', 'vegetarian'], 'drinks'),
  ('Bubble Tea', 'Classic milk tea with tapioca pearls, choice of flavors', 5.99, 'https://images.unsplash.com/photo-1598679253587-829c6cc6c6fc?q=80', ARRAY['vegetarian'], 'drinks'),
  ('Ramune Soda', 'Japanese marble soda in various flavors', 4.99, 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&q=80', ARRAY['vegetarian'], 'drinks');