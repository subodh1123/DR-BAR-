export interface NutritionalFacts {
  calories: number;
  protein: number; // in grams
  carbs: number; // in grams
  fat: number; // in grams
  sugar: number; // in grams
  fiber: number; // in grams
}

export interface Benefit {
  title: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  flavor: string;
  tagline: string;
  price: number;
  subscriptionPrice: number;
  rating: number;
  reviewsCount: number;
  description: string;
  nutritionalFacts: NutritionalFacts;
  benefits: Benefit[];
  ingredients: string[];
  color: string; // Tailwind class color for bg (e.g., 'bg-amber-100')
  accentColor: string; // Tailwind class color text (e.g., 'text-amber-600')
  badgeColor: string; // Hex or tailwind for badges
  image: string;
  isBestSeller?: boolean;
  isPopular?: boolean;
  stock: number;
}

export interface CartItem {
  id: string; // combination of productId and isSubscription (and possibly interval)
  product: Product;
  quantity: number;
  isSubscription: boolean;
  subscriptionInterval: 'monthly' | 'biweekly' | 'weekly';
}

export interface Order {
  id: string;
  date: string;
  items: {
    productName: string;
    flavor: string;
    quantity: number;
    price: number;
    isSubscription: boolean;
  }[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'In Transit';
  trackingNumber: string;
  shippingAddress: {
    fullName: string;
    addressLine1: string;
    city: string;
    zipCode: string;
    country: string;
  };
}

export interface UserSubscription {
  id: string;
  product: Product;
  interval: 'weekly' | 'biweekly' | 'monthly';
  nextDelivery: string;
  status: 'Active' | 'Paused' | 'Cancelled';
  price: number;
  quantity: number;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
  flavor: string;
  avatar?: string;
  likes: number;
}

export interface BlogPost {
  id: string;
  title: string;
  category: 'Fitness' | 'Nutrition' | 'Recipes' | 'Lifestyle' | 'Science';
  author: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string[]; // split by paragraphs
  image: string;
  tags: string[];
}
