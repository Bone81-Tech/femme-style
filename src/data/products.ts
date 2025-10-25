import { Product, Category } from '@/types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Tas',
    slug: 'tas',
    image: '/handbag1.webp',
    description: 'Koleksi tas wanita terkini',
    subcategories: [
      { id: '1-1', name: 'Tas Tangan', slug: 'tas-tangan', categoryId: '1' },
      { id: '1-2', name: 'Tas Bahu', slug: 'tas-bahu', categoryId: '1' },
      { id: '1-3', name: 'Tas Ransel', slug: 'tas-ransel', categoryId: '1' },
      { id: '1-4', name: 'Clutch', slug: 'clutch', categoryId: '1' },
    ]
  },
  {
    id: '2',
    name: 'Baju',
    slug: 'baju',
    image: '/dress1.webp',
    description: 'Pakaian wanita modern',
    subcategories: [
      { id: '2-1', name: 'Dress', slug: 'dress', categoryId: '2' },
      { id: '2-2', name: 'Atasan', slug: 'atasan', categoryId: '2' },
      { id: '2-3', name: 'Bawahan', slug: 'bawahan', categoryId: '2' },
      { id: '2-4', name: 'Outerwear', slug: 'outerwear', categoryId: '2' },
    ]
  },
  {
    id: '3',
    name: 'Sepatu',
    slug: 'sepatu',
    image: '/shoes1.webp',
    description: 'Sepatu wanita stylish',
    subcategories: [
      { id: '3-1', name: 'High Heels', slug: 'high-heels', categoryId: '3' },
      { id: '3-2', name: 'Sneakers', slug: 'sneakers', categoryId: '3' },
      { id: '3-3', name: 'Flat Shoes', slug: 'flat-shoes', categoryId: '3' },
      { id: '3-4', name: 'Sandals', slug: 'sandals', categoryId: '3' },
    ]
  },
  {
    id: '4',
    name: 'Aksesoris',
    slug: 'aksesoris',
    image: '/watch1.webp',
    description: 'Aksesoris pelengkap penampilan',
    subcategories: [
      { id: '4-1', name: 'Perhiasan', slug: 'perhiasan', categoryId: '4' },
      { id: '4-2', name: 'Jam Tangan', slug: 'jam-tangan', categoryId: '4' },
      { id: '4-3', name: 'Kacamata', slug: 'kacamata', categoryId: '4' },
      { id: '4-4', name: 'Scarf', slug: 'scarf', categoryId: '4' },
    ]
  }
];

export const products: Product[] = [
  // Tas
  {
    id: '1',
    name: 'Elegant Leather Handbag',
    description: 'Tas tangan kulit premium dengan desain elegan dan ruang penyimpanan yang luas',
    price: 2899000,
    originalPrice: 3599000,
    images: [
      '/handbag1.webp',
      '/handbag1.webp',
      '/handbag1.webp'
    ],
    category: 'Tas',
    subcategory: 'Tas Tangan',
    tags: ['kulit', 'elegan', 'premium'],
    rating: 4.8,
    reviews: 124,
    inStock: true,
    colors: ['Black', 'Brown', 'Tan'],
    material: 'Genuine Leather',
    brand: 'Luxury Brand',
    isSale: true,
    discount: 20
  },
  {
    id: '2',
    name: 'Chic Shoulder Bag',
    description: 'Tas bahu modern dengan detail aksen emas dan kompartemen multifungsi',
    price: 899000,
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=600&fit=crop&format=webp',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=600&fit=crop&format=webp'
    ],
    category: 'Tas',
    subcategory: 'Tas Bahu',
    tags: ['modern', 'stylish', 'multifungsi'],
    rating: 4.6,
    reviews: 89,
    inStock: true,
    colors: ['Beige', 'Pink', 'Navy'],
    material: 'Synthetic Leather',
    brand: 'Chic Style',
    isNew: true
  },
  {
    id: '3',
    name: 'Fashion Backpack',
    description: 'Tas ransel fashion dengan desain minimalis dan kapasitas besar',
    price: 459000,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop&format=webp',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=600&fit=crop&format=webp'
    ],
    category: 'Tas',
    subcategory: 'Tas Ransel',
    tags: ['minimalis', 'kapasitas besar', 'nyaman'],
    rating: 4.5,
    reviews: 67,
    inStock: true,
    colors: ['Black', 'Gray', 'Olive'],
    material: 'Canvas',
    brand: 'Urban Style'
  },
  // Baju
  {
    id: '4',
    name: 'Floral Summer Dress',
    description: 'Dress bunga musim panas dengan bahan adem dan potongan yang flattering',
    price: 329000,
    originalPrice: 429000,
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=600&fit=crop&format=webp',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=600&fit=crop&format=webp'
    ],
    category: 'Baju',
    subcategory: 'Dress',
    tags: ['floral', 'summer', 'adem'],
    rating: 4.7,
    reviews: 156,
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Floral Blue', 'Floral Pink', 'Floral Yellow'],
    material: 'Cotton Blend',
    brand: 'Summer Collection',
    isSale: true,
    discount: 23
  },
  {
    id: '5',
    name: 'Elegant Blouse',
    description: 'Blouse elegan dengan detail lace yang cocok untuk acara formal',
    price: 259000,
    images: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=600&fit=crop&format=webp',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=600&fit=crop&format=webp'
    ],
    category: 'Baju',
    subcategory: 'Atasan',
    tags: ['elegan', 'lace', 'formal'],
    rating: 4.6,
    reviews: 92,
    inStock: true,
    sizes: ['S', 'M', 'L'],
    colors: ['White', 'Cream', 'Light Blue'],
    material: 'Polyester Blend',
    brand: 'Elegant Wear',
    isNew: true
  },
  {
    id: '6',
    name: 'Classic Trench Coat',
    description: 'Trench coat klasik yang timeless dan stylish untuk segala cuaca',
    price: 899000,
    images: [
      'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600&h=600&fit=crop&format=webp',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=600&fit=crop&format=webp'
    ],
    category: 'Baju',
    subcategory: 'Outerwear',
    tags: ['klasik', 'timeless', 'all-weather'],
    rating: 4.8,
    reviews: 78,
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Khaki', 'Black', 'Navy'],
    material: 'Twill Cotton',
    brand: 'Classic Collection'
  },
  // Sepatu
  {
    id: '7',
    name: 'Classic High Heels',
    description: 'High heels klasik dengan desain elegan dan nyaman dipakai seharian',
    price: 679000,
    originalPrice: 899000,
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop&format=webp',
      'https://images.unsplash.com/photo-1543163521-3bf49e38115d?w=600&h=600&fit=crop&format=webp'
    ],
    category: 'Sepatu',
    subcategory: 'High Heels',
    tags: ['klasik', 'nyaman', 'elegan'],
    rating: 4.7,
    reviews: 203,
    inStock: true,
    sizes: ['36', '37', '38', '39', '40'],
    colors: ['Black', 'Nude', 'Red'],
    material: 'Patent Leather',
    brand: 'Elegant Steps',
    isSale: true,
    discount: 24
  },
  {
    id: '8',
    name: 'Fashion Sneakers',
    description: 'Sneakers fashion dengan desain trendy dan nyaman untuk aktivitas harian',
    price: 459000,
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop&format=webp',
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&h=600&fit=crop&format=webp'
    ],
    category: 'Sepatu',
    subcategory: 'Sneakers',
    tags: ['trendy', 'nyaman', 'casual'],
    rating: 4.5,
    reviews: 145,
    inStock: true,
    sizes: ['36', '37', '38', '39', '40', '41'],
    colors: ['White', 'Pink', 'Gray'],
    material: 'Mesh & Rubber',
    brand: 'Urban Steps',
    isNew: true
  },
  {
    id: '9',
    name: 'Comfortable Flats',
    description: 'Sepatu flat yang nyaman dan stylish untuk dipakai sehari-hari',
    price: 289000,
    images: [
      'https://images.unsplash.com/photo-1543163521-3bf49e38115d?w=600&h=600&fit=crop&format=webp',
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&h=600&fit=crop&format=webp'
    ],
    category: 'Sepatu',
    subcategory: 'Flat Shoes',
    tags: ['nyaman', 'stylish', 'casual'],
    rating: 4.4,
    reviews: 98,
    inStock: true,
    sizes: ['36', '37', '38', '39', '40'],
    colors: ['Black', 'Beige', 'Navy'],
    material: 'Synthetic Leather',
    brand: 'Comfort Plus'
  },
  // Aksesoris
  {
    id: '10',
    name: 'Elegant Watch',
    description: 'Jam tangan elegan dengan desain minimalis dan strap kulit premium',
    price: 1299000,
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=600&fit=crop&format=webp',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop&format=webp'
    ],
    category: 'Aksesoris',
    subcategory: 'Jam Tangan',
    tags: ['minimalis', 'premium', 'elegan'],
    rating: 4.9,
    reviews: 67,
    inStock: true,
    colors: ['Rose Gold', 'Silver', 'Gold'],
    material: 'Stainless Steel & Leather',
    brand: 'Timeless Elegance',
    isNew: true
  },
  {
    id: '11',
    name: 'Fashion Sunglasses',
    description: 'Kacamata fashion dengan UV protection dan desain yang kekinian',
    price: 359000,
    images: [
      'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=600&h=600&fit=crop&format=webp',
      'https://images.unsplash.com/photo-1511499767150-a48a237f0085?w=600&h=600&fit=crop&format=webp'
    ],
    category: 'Aksesoris',
    subcategory: 'Kacamata',
    tags: ['UV protection', 'fashion', 'trendy'],
    rating: 4.6,
    reviews: 112,
    inStock: true,
    colors: ['Black', 'Brown', 'Tortoise'],
    material: 'Acetate & Metal',
    brand: 'Sun Style'
  },
  {
    id: '12',
    name: 'Silk Scarf',
    description: 'Scarf sutra premium dengan motif eksklusif dan sentuhan mewah',
    price: 589000,
    originalPrice: 789000,
    images: [
      'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=600&fit=crop&format=webp',
      'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=600&h=600&fit=crop&format=webp'
    ],
    category: 'Aksesoris',
    subcategory: 'Scarf',
    tags: ['sutra', 'premium', 'eksklusif'],
    rating: 4.8,
    reviews: 45,
    inStock: true,
    colors: ['Floral', 'Geometric', 'Solid'],
    material: '100% Silk',
    brand: 'Luxury Scarves',
    isSale: true,
    discount: 25
  }
];

export const getProductsByCategory = (category: string) => {
  return products.filter(product => product.category === category);
};

export const getProductsBySubcategory = (subcategory: string) => {
  return products.filter(product => product.subcategory === subcategory);
};

export const getFeaturedProducts = () => {
  return products.filter(product => product.isSale || product.isNew || product.rating >= 4.7);
};

export const getNewProducts = () => {
  return products.filter(product => product.isNew);
};

export const getSaleProducts = () => {
  return products.filter(product => product.isSale);
};