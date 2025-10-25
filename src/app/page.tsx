'use client'

import { useState, useEffect } from 'react'
import { ShoppingCart, Search, Menu, X, Star, Heart, ChevronRight, Sparkles, Package, Truck, Shield, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { CartSidebar } from '@/components/cart-sidebar'

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  images: string[]
  category: string
  rating: number
  reviews: number
  badge?: string
  description?: string
  features?: string[]
  sizes?: string[]
  colors?: { name: string; value: string }[]
  stock?: number
}

interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
  size?: string
  color?: string
}

export default function Home() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const categories = [
    { id: 'all', name: 'Semua', icon: '✨' },
    { id: 'tas', name: 'Tas', icon: '👜' },
    { id: 'baju', name: 'Baju', icon: '👗' },
    { id: 'sepatu', name: 'Sepatu', icon: '👠' },
    { id: 'aksesoris', name: 'Aksesoris', icon: '💎' }
  ]

  // Fetch products from API
  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      // Transform API data to match component interface
      const transformedProducts = data.map((product: any) => ({
        ...product,
        image: product.images[0] // Use first image as thumbnail
      }))
      setProducts(transformedProducts)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id)
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        size: product.sizes?.[0] || 'One Size',
        color: product.colors?.[0]?.name || 'Default'
      }]
    })
  }

  const updateCartQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    )
  }

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const handleCheckout = () => {
    alert('Checkout functionality would be implemented here!')
  }

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-rose-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-rose-400 to-pink-400 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                HerStyle
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-rose-600 transition-colors">Beranda</a>
              <a href="#products" className="text-gray-700 hover:text-rose-600 transition-colors">Produk</a>
              <a href="#categories" className="text-gray-700 hover:text-rose-600 transition-colors">Kategori</a>
              <a href="#about" className="text-gray-700 hover:text-rose-600 transition-colors">Tentang</a>
            </div>

            {/* Search and Cart */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:block relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Cari produk..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64 border-rose-200 focus:border-rose-400 focus:ring-rose-200"
                />
              </div>
              
              <CartSidebar
                items={cartItems}
                onUpdateQuantity={updateCartQuantity}
                onRemoveItem={removeFromCart}
                onCheckout={handleCheckout}
              >
                <Button variant="outline" size="icon" className="relative border-rose-200 hover:bg-rose-50">
                  <ShoppingCart className="w-5 h-5 text-rose-600" />
                  {getCartCount() > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs w-5 h-5 flex items-center justify-center p-0">
                      {getCartCount()}
                    </Badge>
                  )}
                </Button>
              </CartSidebar>

              {/* Mobile Menu */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="outline" size="icon" className="border-rose-200">
                    <Menu className="w-5 h-5 text-rose-600" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <div className="flex flex-col space-y-4 mt-8">
                    <Input
                      type="text"
                      placeholder="Cari produk..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="border-rose-200 focus:border-rose-400"
                    />
                    <a href="#home" className="text-gray-700 hover:text-rose-600 py-2">Beranda</a>
                    <a href="#products" className="text-gray-700 hover:text-rose-600 py-2">Produk</a>
                    <a href="#categories" className="text-gray-700 hover:text-rose-600 py-2">Kategori</a>
                    <a href="#about" className="text-gray-700 hover:text-rose-600 py-2">Tentang</a>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Temukan Gaya Terbaikmu
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
              Koleksi premium perlengkapan wanita dengan kualitas terbaik dan harga terjangkau
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-rose-600 hover:bg-rose-50 px-8 py-3 text-lg">
                Belanja Sekarang
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-rose-600 px-8 py-3 text-lg">
                Lihat Koleksi
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-rose-50 to-transparent"></div>
      </section>

      {/* Features */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-4 p-6 bg-rose-50 rounded-xl">
              <div className="w-12 h-12 bg-rose-200 rounded-full flex items-center justify-center">
                <Truck className="w-6 h-6 text-rose-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Gratis Ongkir</h3>
                <p className="text-sm text-gray-600">Untuk pembelian minimal Rp 500.000</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-6 bg-pink-50 rounded-xl">
              <div className="w-12 h-12 bg-pink-200 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-pink-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">100% Aman</h3>
                <p className="text-sm text-gray-600">Pembayaran terenkripsi dan aman</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-6 bg-purple-50 rounded-xl">
              <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center">
                <Package className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Kualitas Premium</h3>
                <p className="text-sm text-gray-600">Produk berkualitas dengan garansi</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="py-16 bg-gradient-to-br from-rose-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Kategori Produk
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Temukan berbagai pilihan produk yang sesuai dengan gaya dan kebutuhanmu
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full transition-all ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg'
                    : 'border-rose-200 text-rose-600 hover:bg-rose-50'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section id="products" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Produk Terbaru
            </h2>
            <p className="text-lg text-gray-600">
              Koleksi pilihan dengan model terkini dan kualitas terbaik
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="w-full h-64 bg-gray-200"></div>
                  <CardContent className="p-4">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-rose-100">
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.badge && (
                      <Badge className="absolute top-3 left-3 bg-rose-500 text-white">
                        {product.badge}
                      </Badge>
                    )}
                    {product.originalPrice && (
                      <Badge className="absolute top-3 right-3 bg-green-500 text-white">
                        -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-3 right-3 bg-white/80 hover:bg-white text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-2">
                        ({product.reviews})
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-lg font-bold text-rose-600">
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>
                      <Button
                        id={`add-to-cart-${product.id}`}
                        size="sm"
                        onClick={() => addToCart(product)}
                        className="bg-rose-500 hover:bg-rose-600 text-white transition-all"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-r from-rose-400 to-pink-400 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Dapatkan Penawaran Spesial
          </h2>
          <p className="text-lg mb-8 text-white/90">
            Daftar newsletter kami dan dapatkan diskon 10% untuk pembelian pertama
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Email Anda"
              className="flex-1 px-4 py-3 rounded-lg border-0 text-gray-900"
            />
            <Button className="bg-white text-rose-600 hover:bg-rose-50 px-6 py-3">
              Daftar Sekarang
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-rose-400 to-pink-400 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">HerStyle</span>
              </div>
              <p className="text-gray-400">
                Temukan gaya terbaikmu dengan koleksi premium kami
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Kategori</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Tas</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Baju</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sepatu</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Aksesoris</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Bantuan</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Cara Pemesanan</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pengiriman</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pengembalian</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Kontak</h4>
              <ul className="space-y-2 text-gray-400">
                <li>WhatsApp: +62 812-3456-7890</li>
                <li>Email: info@herstyle.com</li>
                <li>Jakarta, Indonesia</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 HerStyle. Semua hak dilindungi.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}