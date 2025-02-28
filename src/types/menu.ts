export interface MenuItemType {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  dietary: string[];
  category: 'chinese' | 'japanese' | 'sushi' | 'drinks';
}