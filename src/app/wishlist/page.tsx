'use client';

import Link from 'next/link';
import { Heart, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ProductCard } from '@/components/product/product-card';
import { useWishlistStore } from '@/lib/store';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function WishlistPage() {
  const { items, clearWishlist } = useWishlistStore();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        
        <main className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <div className="mb-8">
              <Heart className="h-24 w-24 text-gray-300 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Wishlist Kosong</h1>
              <p className="text-gray-600 mb-8">
                Mulai tambahkan produk yang Anda suka ke wishlist!
              </p>
            </div>
            
            <div className="space-y-4">
              <Link href="/products">
                <Button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white">
                  Jelajahi Produk
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="w-full">
                  Kembali ke Beranda
                </Button>
              </Link>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Wishlist Saya</h1>
            <p className="text-gray-600">
              {items.length} produk di wishlist Anda
            </p>
          </div>
          
          <Button
            variant="outline"
            onClick={clearWishlist}
            className="text-red-600 border-red-600 hover:bg-red-50"
          >
            Hapus Semua
          </Button>
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {items.map((item) => (
            <ProductCard key={item.product.id} product={item.product} />
          ))}
        </div>
        
        {/* Continue Shopping */}
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <div className="mb-4">
            <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-2" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Ingin menambahkan lebih banyak?
          </h3>
          <p className="text-gray-600 mb-4">
            Jelajahi koleksi lengkap kami dan temukan produk favorit Anda
          </p>
          <Link href="/products">
            <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white">
              Lanjut Belanja
            </Button>
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}