export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  subcategory: string;
  tags: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  sizes?: string[];
  colors?: string[];
  material?: string;
  brand?: string;
  isNew?: boolean;
  isSale?: boolean;
  discount?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
}

export interface WishlistItem {
  product: Product;
  addedAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: Date;
  helpful: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description?: string;
  subcategories?: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
}

export interface FilterOptions {
  categories: string[];
  priceRange: [number, number];
  sizes: string[];
  colors: string[];
  brands: string[];
  rating: number;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'newest' | 'rating';
}