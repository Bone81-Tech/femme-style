'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, Heart, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useCartStore, useWishlistStore } from '@/lib/store';
import { categories } from '@/data/products';

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getTotalItems } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();

  const cartItemsCount = getTotalItems();
  const wishlistCount = wishlistItems.length;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
              FemmeStyle
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="text-sm font-medium hover:text-pink-600 transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="search"
                placeholder="Cari produk..."
                className="pl-10 w-64"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {/* Mobile Search */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Wishlist */}
            <Link href="/wishlist">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">
                    {wishlistCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User Account */}
            <Link href="/account">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/category/${category.slug}`}
                      className="text-lg font-medium hover:text-pink-600 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Mobile Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-20 lg:hidden">
          <div className="bg-background w-full max-w-lg mx-4 rounded-lg shadow-lg p-4">
            <div className="flex items-center space-x-2">
              <Search className="text-gray-400 h-5 w-5" />
              <Input
                type="search"
                placeholder="Cari produk..."
                className="flex-1"
                autoFocus
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}