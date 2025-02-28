export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  dietary: string[];
  category: string;
  customization?: {
    options: {
      name: string;
      price: number;
    }[];
  };
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
  customizations: string[];
}

export interface Location {
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  hours: {
    day: string;
    open: string;
    close: string;
  }[];
  coordinates: {
    lat: number;
    lng: number;
  };
}