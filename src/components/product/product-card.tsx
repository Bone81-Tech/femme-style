'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCartStore, useWishlistStore } from '@/lib/store';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addItem } = useCartStore();
  const { addItem: addToWishlist, isInWishlist, removeItem } = useWishlistStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist(product.id)) {
      removeItem(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link href={`/product/${product.id}`}>
      <Card className={`group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg ${className}`}>
        <CardContent className="p-0">
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden bg-gray-50">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            
            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {product.isNew && (
                <Badge className="bg-green-500 hover:bg-green-600">New</Badge>
              )}
              {product.isSale && (
                <Badge className="bg-red-500 hover:bg-red-600">
                  -{discountPercentage}%
                </Badge>
              )}
            </div>

            {/* Action Buttons */}
            <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                size="icon"
                variant="secondary"
                className="h-8 w-8 rounded-full bg-white/90 hover:bg-white"
                onClick={handleToggleWishlist}
              >
                <Heart 
                  className={`h-4 w-4 ${
                    isInWishlist(product.id) 
                      ? 'fill-red-500 text-red-500' 
                      : 'text-gray-600'
                  }`}
                />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                className="h-8 w-8 rounded-full bg-white/90 hover:bg-white"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-4 w-4 text-gray-600" />
              </Button>
            </div>

            {/* Quick Add Button */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                className="w-full bg-white text-gray-900 hover:bg-gray-100"
                size="sm"
                onClick={handleAddToCart}
              >
                + Keranjang
              </Button>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-4">
            <div className="space-y-2">
              {/* Brand */}
              {product.brand && (
                <p className="text-xs text-gray-500">{product.brand}</p>
              )}
              
              {/* Product Name */}
              <h3 className="font-medium text-sm line-clamp-2 group-hover:text-pink-600 transition-colors">
                {product.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center space-x-1">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500">
                  {product.rating} ({product.reviews})
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-sm text-pink-600">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div className="flex items-center space-x-1">
                  {product.colors.slice(0, 3).map((color, index) => (
                    <div
                      key={index}
                      className="w-4 h-4 rounded-full border border-gray-300"
                      style={{
                        backgroundColor: color.toLowerCase() === 'black' ? '#000' :
                                       color.toLowerCase() === 'white' ? '#fff' :
                                       color.toLowerCase() === 'red' ? '#ef4444' :
                                       color.toLowerCase() === 'blue' ? '#3b82f6' :
                                       color.toLowerCase() === 'green' ? '#10b981' :
                                       color.toLowerCase() === 'yellow' ? '#eab308' :
                                       color.toLowerCase() === 'purple' ? '#a855f7' :
                                       color.toLowerCase() === 'pink' ? '#ec4899' :
                                       color.toLowerCase() === 'brown' ? '#92400e' :
                                       color.toLowerCase() === 'gray' ? '#6b7280' :
                                       color.toLowerCase() === 'navy' ? '#1e3a8a' :
                                       color.toLowerCase() === 'beige' ? '#f5f5dc' :
                                       color.toLowerCase() === 'tan' ? '#d2b48c' :
                                       color.toLowerCase() === 'olive' ? '#808000' :
                                       '#e5e7eb'
                      }}
                      title={color}
                    />
                  ))}
                  {product.colors.length > 3 && (
                    <span className="text-xs text-gray-500">
                      +{product.colors.length - 3}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}