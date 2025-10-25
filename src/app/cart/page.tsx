'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCartStore } from '@/lib/store';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, getTotalPrice } = useCartStore();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const subtotal = getTotalPrice();
  const shipping = subtotal > 500000 ? 0 : 15000;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        
        <main className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <div className="mb-8">
              <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Keranjang Belanja Kosong</h1>
              <p className="text-gray-600 mb-8">
                Belum ada produk di keranjang Anda. Mulai belanja sekarang!
              </p>
            </div>
            
            <div className="space-y-4">
              <Link href="/products">
                <Button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white">
                  Mulai Belanja
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Keranjang Belanja</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <Card key={`${item.product.id}-${item.size}-${item.color}-${index}`}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    
                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="min-w-0 flex-1">
                          <Link 
                            href={`/product/${item.product.id}`}
                            className="font-medium text-gray-900 hover:text-pink-600 transition-colors"
                          >
                            {item.product.name}
                          </Link>
                          {item.product.brand && (
                            <p className="text-sm text-gray-500">{item.product.brand}</p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.product.id, item.size, item.color)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      {/* Variants */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {item.size && (
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                            Ukuran: {item.size}
                          </span>
                        )}
                        {item.color && (
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                            Warna: {item.color}
                          </span>
                        )}
                      </div>
                      
                      {/* Price and Quantity */}
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.size, item.color)}
                            className="p-1 border border-gray-300 rounded hover:bg-gray-50"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.size, item.color)}
                            className="p-1 border border-gray-300 rounded hover:bg-gray-50"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        
                        <div className="text-right">
                          <p className="font-semibold text-pink-600">
                            {formatPrice(item.product.price * item.quantity)}
                          </p>
                          {item.product.originalPrice && (
                            <p className="text-xs text-gray-500 line-through">
                              {formatPrice(item.product.originalPrice * item.quantity)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {/* Cart Actions */}
            <div className="flex justify-between items-center pt-4">
              <Button
                variant="outline"
                onClick={clearCart}
                className="text-red-600 border-red-600 hover:bg-red-50"
              >
                Kosongkan Keranjang
              </Button>
              <Link href="/products">
                <Button variant="outline">
                  + Tambah Produk Lain
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Ringkasan Pesanan</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} produk)</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Biaya Pengiriman</span>
                    <span className="font-medium">
                      {shipping === 0 ? (
                        <span className="text-green-600">Gratis</span>
                      ) : (
                        formatPrice(shipping)
                      )}
                    </span>
                  </div>
                  
                  {shipping > 0 && (
                    <div className="text-xs text-green-600 bg-green-50 p-2 rounded">
                      Gratis ongkir untuk pembelian minimal {formatPrice(500000)}
                    </div>
                  )}
                  
                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold">Total</span>
                      <span className="font-bold text-lg text-pink-600">{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white">
                    Checkout
                  </Button>
                  
                  <Link href="/products">
                    <Button variant="outline" className="w-full">
                      Lanjut Belanja
                    </Button>
                  </Link>
                </div>
                
                {/* Security Badge */}
                <div className="mt-6 text-center">
                  <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span>Pembayaran aman & terpercaya</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Recommended Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Rekomendasi Produk</h2>
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-600 mb-4">
              Lihat produk lain yang mungkin Anda suka
            </p>
            <Link href="/products">
              <Button variant="outline">
                Lihat Semua Produk
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}