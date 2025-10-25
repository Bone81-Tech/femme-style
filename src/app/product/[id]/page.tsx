'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, Star, Truck, Shield, RefreshCw, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCartStore, useWishlistStore } from '@/lib/store';
import { products } from '@/data/products';
import { ProductCard } from '@/components/product/product-card';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addItem } = useCartStore();
  const { addItem: addToWishlist, isInWishlist, removeItem } = useWishlistStore();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === params.id);

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Produk tidak ditemukan</h1>
            <p className="text-gray-600 mb-8">Maaf, produk yang Anda cari tidak tersedia.</p>
            <Link href="/products">
              <Button>Kembali ke Produk</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem(product, quantity, selectedSize || undefined, selectedColor || undefined);
  };

  const handleToggleWishlist = () => {
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
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <ol className="flex items-center space-x-2">
            <li><Link href="/" className="text-gray-600 hover:text-pink-600">Beranda</Link></li>
            <li className="text-gray-400">/</li>
            <li><Link href="/products" className="text-gray-600 hover:text-pink-600">Produk</Link></li>
            <li className="text-gray-400">/</li>
            <li><Link href={`/category/${product.category.toLowerCase()}`} className="text-gray-600 hover:text-pink-600">{product.category}</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-medium">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-50">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <Badge className="bg-green-500 hover:bg-green-600">New</Badge>
                )}
                {product.isSale && (
                  <Badge className="bg-red-500 hover:bg-red-600">
                    -{discountPercentage}%
                  </Badge>
                )}
              </div>
            </div>
            
            {/* Thumbnail Images */}
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square w-20 overflow-hidden rounded-lg border-2 transition-colors ${
                    selectedImage === index ? 'border-pink-500' : 'border-gray-200'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              {product.brand && (
                <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
              )}
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews} ulasan)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-pink-600">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
                      Hemat {formatPrice(product.originalPrice - product.price)}
                    </Badge>
                  </>
                )}
              </div>

              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Options */}
            <div className="space-y-4">
              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Ukuran
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 border rounded-md transition-colors ${
                          selectedSize === size
                            ? 'border-pink-500 bg-pink-50 text-pink-600'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Warna
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 border rounded-md transition-colors ${
                          selectedColor === color
                            ? 'border-pink-500 bg-pink-50 text-pink-600'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Jumlah
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
                size="lg"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Tambah ke Keranjang
              </Button>
              <Button
                variant="outline"
                onClick={handleToggleWishlist}
                className="border-pink-500 text-pink-600 hover:bg-pink-50"
                size="lg"
              >
                <Heart 
                  className={`h-5 w-5 mr-2 ${
                    isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''
                  }`}
                />
                {isInWishlist(product.id) ? 'Difavoritkan' : 'Favoritkan'}
              </Button>
            </div>

            {/* Product Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
              <div className="flex items-center space-x-3">
                <Truck className="h-5 w-5 text-pink-500" />
                <div>
                  <p className="font-medium text-sm">Gratis Ongkir</p>
                  <p className="text-xs text-gray-500">Min. belanja 500k</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium text-sm">100% Original</p>
                  <p className="text-xs text-gray-500">Jaminan kualitas</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <RefreshCw className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="font-medium text-sm">Pengembalian</p>
                  <p className="text-xs text-gray-500">30 hari garansi</p>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="pt-6 border-t">
              <h3 className="font-semibold text-lg mb-4">Detail Produk</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Material:</span>
                  <span className="ml-2 font-medium">{product.material || '-'}</span>
                </div>
                <div>
                  <span className="text-gray-500">Kategori:</span>
                  <span className="ml-2 font-medium">{product.category}</span>
                </div>
                <div>
                  <span className="text-gray-500">Subkategori:</span>
                  <span className="ml-2 font-medium">{product.subcategory}</span>
                </div>
                <div>
                  <span className="text-gray-500">Stok:</span>
                  <span className="ml-2 font-medium">
                    {product.inStock ? 'Tersedia' : 'Habis'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mb-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Deskripsi</TabsTrigger>
              <TabsTrigger value="reviews">Ulasan</TabsTrigger>
              <TabsTrigger value="shipping">Pengiriman</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Deskripsi Produk</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {product.description}
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Produk ini dibuat dengan material berkualitas tinggi dan desain yang trendy. 
                    Cocok untuk digunakan dalam berbagai kesempatan, baik formal maupun kasual. 
                    Dengan perawatan yang tepat, produk ini akan awet dan tahan lama.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Ulasan Pelanggan</h3>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-pink-600">{product.rating}</div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-500">{product.reviews} ulasan</p>
                    </div>
                  </div>
                  
                  {/* Sample Reviews */}
                  <div className="space-y-4">
                    <div className="border-b pb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                        <span className="font-medium">Sarah M.</span>
                        <span className="text-sm text-gray-500">2 hari yang lalu</span>
                      </div>
                      <p className="text-gray-700">
                        Produk sangat bagus! Kualitas sesuai dengan harga dan pengiriman cepat. 
                        Recommended seller!
                      </p>
                    </div>
                    
                    <div className="border-b pb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-medium">Maya P.</span>
                        <span className="text-sm text-gray-500">1 minggu yang lalu</span>
                      </div>
                      <p className="text-gray-700">
                        Saya suka dengan desainnya. Sangat elegan dan cocok untuk acara formal. 
                        Ukuran sesuai dengan yang diharapkan.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="shipping" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Informasi Pengiriman</h3>
                  <div className="space-y-4 text-gray-700">
                    <div>
                      <h4 className="font-medium mb-2">Metode Pengiriman</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>JNE Regular (2-3 hari kerja)</li>
                        <li>JNE Express (1-2 hari kerja)</li>
                        <li>GoSend Same Day ( Jakarta only)</li>
                        <li>Grab Express (Jakarta only)</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Biaya Pengiriman</h4>
                      <p className="text-sm">
                        Gratis ongkir untuk pembelian minimal Rp 500.000 (Jawa & Bali)
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Waktu Proses</h4>
                      <p className="text-sm">
                        Pesanan akan diproses dalam 1x24 jam pada hari kerja
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Produk Terkait</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}