'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, WishlistItem } from '@/types';

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, size?: string, color?: string) => void;
  removeItem: (productId: string, size?: string, color?: string) => void;
  updateQuantity: (productId: string, quantity: number, size?: string, color?: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

interface WishlistStore {
  items: WishlistItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearWishlist: () => void;
  isInWishlist: (productId: string) => boolean;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity = 1, size, color) => {
        const existingItem = get().items.find(
          item => 
            item.product.id === product.id && 
            item.size === size && 
            item.color === color
        );

        if (existingItem) {
          set({
            items: get().items.map(item =>
              item.product.id === product.id && 
              item.size === size && 
              item.color === color
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          });
        } else {
          set({
            items: [...get().items, { product, quantity, size, color }]
          });
        }
      },
      removeItem: (productId, size, color) => {
        set({
          items: get().items.filter(
            item => 
              !(item.product.id === productId && 
                item.size === size && 
                item.color === color)
          )
        });
      },
      updateQuantity: (productId, quantity, size, color) => {
        if (quantity <= 0) {
          get().removeItem(productId, size, color);
        } else {
          set({
            items: get().items.map(item =>
              item.product.id === productId && 
              item.size === size && 
              item.color === color
                ? { ...item, quantity }
                : item
            )
          });
        }
      },
      clearCart: () => set({ items: [] }),
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + (item.product.price * item.quantity), 
          0
        );
      }
    }),
    {
      name: 'cart-storage'
    }
  )
);

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        const existingItem = get().items.find(item => item.product.id === product.id);
        
        if (!existingItem) {
          set({
            items: [...get().items, { product, addedAt: new Date() }]
          });
        }
      },
      removeItem: (productId) => {
        set({
          items: get().items.filter(item => item.product.id !== productId)
        });
      },
      clearWishlist: () => set({ items: [] }),
      isInWishlist: (productId) => {
        return get().items.some(item => item.product.id === productId);
      }
    }),
    {
      name: 'wishlist-storage'
    }
  )
);