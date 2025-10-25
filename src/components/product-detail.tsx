'use client'

import { useState } from 'react'
import { Star, Heart, Share2, Truck, Shield, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface ProductDetailProps {
  product: {
    id: number
    name: string
    price: number
    originalPrice?: number
    images: string[]
    category: string
    rating: number
    reviews: number
    description: string
    features: string[]
    sizes: string[]
    colors: { name: string; value: string }[]
    stock: number
    badge?: string
  }
  onAddToCart: (quantity: number, size: string, color: string) => void
}

export function ProductDetail({ product, onAddToCart }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [isLiked, setIsLiked] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price)
  }

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Silakan pilih ukuran dan warna terlebih dahulu')
      return
    }
    onAddToCart(quantity, selectedSize, selectedColor)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-2xl bg-gray-50">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-[500px] object-cover"
            />
            {product.badge && (
              <Badge className="absolute top-4 left-4 bg-rose-500 text-white">
                {product.badge}
              </Badge>
            )}
            <div className="absolute top-4 right-4 flex gap-2">
              <Button
                variant="secondary"
                size="icon"
                className="bg-white/80 hover:bg-white"
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="bg-white/80 hover:bg-white"
              >
                <Share2 className="w-4 h-4 text-gray-600" />
              </Button>
            </div>
          </div>
          
          {/* Thumbnail Images */}
          <div className="flex gap-2 overflow-x-auto">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImage === index 
                    ? 'border-rose-500 ring-2 ring-rose-200' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Badge variant="secondary" className="bg-rose-100 text-rose-600">
                {product.category}
              </Badge>
              {product.stock < 10 && (
                <Badge variant="destructive">
                  Hanya {product.stock} tersedia
                </Badge>
              )}
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">
                {product.rating} ({product.reviews} ulasan)
              </span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-rose-600">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <Badge className="bg-green-500 text-white">
                    -{discountPercentage}%
                  </Badge>
                </>
              )}
            </div>
          </div>

          {/* Color Selection */}
          <div>
            <h3 className="font-semibold mb-3">Warna</h3>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`relative w-10 h-10 rounded-full border-2 transition-all ${
                    selectedColor === color.name
                      ? 'border-rose-500 ring-2 ring-rose-200'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                >
                  {selectedColor === color.name && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <h3 className="font-semibold mb-3">Ukuran</h3>
            <div className="flex gap-2 flex-wrap">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-lg border-2 transition-all font-medium ${
                    selectedSize === size
                      ? 'border-rose-500 bg-rose-50 text-rose-600'
                      : 'border-gray-300 hover:border-gray-400 text-gray-700'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <h3 className="font-semibold mb-3">Jumlah</h3>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <span className="w-12 text-center font-semibold">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                disabled={quantity >= product.stock}
              >
                +
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              className="w-full bg-rose-500 hover:bg-rose-600 py-3 text-lg"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? 'Stok Habis' : 'Tambah ke Keranjang'}
            </Button>
            <Button
              variant="outline"
              className="w-full border-rose-200 text-rose-600 hover:bg-rose-50 py-3"
            >
              Beli Sekarang
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-2 p-3 bg-rose-50 rounded-lg">
              <Truck className="w-5 h-5 text-rose-600" />
              <span className="text-sm text-gray-700">Gratis Ongkir</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-pink-50 rounded-lg">
              <Shield className="w-5 h-5 text-pink-600" />
              <span className="text-sm text-gray-700">100% Aman</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg">
              <RefreshCw className="w-5 h-5 text-purple-600" />
              <span className="text-sm text-gray-700">7 Hari Retur</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Deskripsi</TabsTrigger>
            <TabsTrigger value="features">Fitur</TabsTrigger>
            <TabsTrigger value="reviews">Ulasan</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="features" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-8">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="text-4xl font-bold">{product.rating}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-6 h-6 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-2">Berdasarkan {product.reviews} ulasan</p>
                  <Button variant="outline">Lihat Semua Ulasan</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}