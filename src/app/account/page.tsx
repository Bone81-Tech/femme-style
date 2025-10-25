'use client';

import { useState } from 'react';
import Link from 'next/link';
import { User, ShoppingBag, Heart, MapPin, CreditCard, Settings, LogOut, Package, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('orders');

  // Mock data for demonstration
  const orders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'delivered',
      total: 2899000,
      items: 3,
      products: [
        { name: 'Elegant Leather Handbag', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop&format=webp' },
        { name: 'Floral Summer Dress', image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=100&h=100&fit=crop&format=webp' },
      ]
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      status: 'processing',
      total: 1599000,
      items: 2,
      products: [
        { name: 'Classic High Heels', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=100&h=100&fit=crop&format=webp' },
      ]
    },
    {
      id: 'ORD-003',
      date: '2024-01-05',
      status: 'shipped',
      total: 879000,
      items: 1,
      products: [
        { name: 'Fashion Sunglasses', image: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=100&h=100&fit=crop&format=webp' },
      ]
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'Terkirim';
      case 'processing':
        return 'Diproses';
      case 'shipped':
        return 'Dikirim';
      case 'cancelled':
        return 'Dibatalkan';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                {/* User Profile */}
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="h-10 w-10 text-white" />
                  </div>
                  <h2 className="font-semibold text-lg">Sarah Johnson</h2>
                  <p className="text-sm text-gray-600">sarah.johnson@email.com</p>
                </div>
                
                {/* Navigation */}
                <nav className="space-y-2">
                  <Button
                    variant={activeTab === 'orders' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setActiveTab('orders')}
                  >
                    <Package className="h-4 w-4 mr-2" />
                    Pesanan Saya
                  </Button>
                  <Button
                    variant={activeTab === 'profile' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setActiveTab('profile')}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profil Saya
                  </Button>
                  <Button
                    variant={activeTab === 'addresses' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setActiveTab('addresses')}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Alamat Pengiriman
                  </Button>
                  <Button
                    variant={activeTab === 'payment' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setActiveTab('payment')}
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Metode Pembayaran
                  </Button>
                  <Button
                    variant={activeTab === 'settings' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setActiveTab('settings')}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Pengaturan
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700">
                    <LogOut className="h-4 w-4 mr-2" />
                    Keluar
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Pesanan Saya</h1>
                
                {orders.length === 0 ? (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada pesanan</h3>
                      <p className="text-gray-600 mb-6">Mulai belanja dan lihat pesanan Anda di sini</p>
                      <Link href="/products">
                        <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white">
                          Mulai Belanja
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <Card key={order.id}>
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="font-semibold text-lg">Pesanan #{order.id}</h3>
                              <p className="text-sm text-gray-600">{order.date}</p>
                            </div>
                            <Badge className={getStatusColor(order.status)}>
                              {getStatusText(order.status)}
                            </Badge>
                          </div>
                          
                          {/* Products */}
                          <div className="flex space-x-4 mb-4">
                            {order.products.map((product, index) => (
                              <div key={index} className="relative w-16 h-16">
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-full h-full object-cover rounded"
                                />
                              </div>
                            ))}
                            {order.items > order.products.length && (
                              <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                                <span className="text-sm text-gray-600">+{order.items - order.products.length}</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm text-gray-600">{order.items} produk</p>
                              <p className="font-semibold text-lg">{formatPrice(order.total)}</p>
                            </div>
                            <Button variant="outline" size="sm">
                              Lihat Detail
                              <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Profil Saya</h1>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nama Lengkap
                        </label>
                        <input
                          type="text"
                          defaultValue="Sarah Johnson"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          defaultValue="sarah.johnson@email.com"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nomor Telepon
                        </label>
                        <input
                          type="tel"
                          defaultValue="+62 812-3456-7890"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tanggal Lahir
                        </label>
                        <input
                          type="date"
                          defaultValue="1990-01-15"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white">
                        Simpan Perubahan
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold text-gray-900">Alamat Pengiriman</h1>
                  <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white">
                    + Tambah Alamat
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-semibold">Alamat Utama</h3>
                        <Badge className="bg-green-100 text-green-800">Utama</Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <p className="font-medium">Sarah Johnson</p>
                        <p className="text-gray-600">+62 812-3456-7890</p>
                        <p className="text-gray-600">
                          Jl. Sudirman No. 123, RT 01/RW 02<br />
                          Kel. Karet Tengsin, Kec. Tanah Abang<br />
                          Jakarta Pusat, DKI Jakarta 10250
                        </p>
                      </div>
                      <div className="mt-4 flex space-x-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm" className="text-red-600">Hapus</Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-semibold">Alamat Kantor</h3>
                      </div>
                      <div className="space-y-2 text-sm">
                        <p className="font-medium">Sarah Johnson</p>
                        <p className="text-gray-600">+62 812-3456-7890</p>
                        <p className="text-gray-600">
                          Gedung Mega Plaza Lt. 15<br />
                          Jl. HR Rasuna Said Kav C-1<br />
                          Jakarta Selatan, DKI Jakarta 12950
                        </p>
                      </div>
                      <div className="mt-4 flex space-x-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm" className="text-red-600">Hapus</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
            
            {/* Payment Tab */}
            {activeTab === 'payment' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold text-gray-900">Metode Pembayaran</h1>
                  <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white">
                    + Tambah Metode
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
                            <span className="text-white text-xs font-bold">VISA</span>
                          </div>
                          <div>
                            <p className="font-medium">Visa ending in 4242</p>
                            <p className="text-sm text-gray-600">Kadaluarsa 12/25</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm" className="text-red-600">Hapus</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-8 bg-orange-500 rounded flex items-center justify-center">
                            <span className="text-white text-xs font-bold">MC</span>
                          </div>
                          <div>
                            <p className="font-medium">Mastercard ending in 8888</p>
                            <p className="text-sm text-gray-600">Kadaluarsa 09/24</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm" className="text-red-600">Hapus</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
            
            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Pengaturan</h1>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold mb-4">Preferensi Email</h3>
                        <div className="space-y-3">
                          <label className="flex items-center space-x-3">
                            <input type="checkbox" defaultChecked className="rounded" />
                            <span className="text-sm">Newsletter dan promosi</span>
                          </label>
                          <label className="flex items-center space-x-3">
                            <input type="checkbox" defaultChecked className="rounded" />
                            <span className="text-sm">Update pesanan</span>
                          </label>
                          <label className="flex items-center space-x-3">
                            <input type="checkbox" defaultChecked className="rounded" />
                            <span className="text-sm">Rekomendasi produk</span>
                          </label>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold mb-4">Privasi</h3>
                        <div className="space-y-3">
                          <label className="flex items-center space-x-3">
                            <input type="checkbox" defaultChecked className="rounded" />
                            <span className="text-sm">Tampilkan profil publik</span>
                          </label>
                          <label className="flex items-center space-x-3">
                            <input type="checkbox" className="rounded" />
                            <span className="text-sm">Bagikan riwayat pembelian</span>
                          </label>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold mb-4">Bahasa dan Wilayah</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Bahasa
                            </label>
                            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500">
                              <option>Bahasa Indonesia</option>
                              <option>English</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Mata Uang
                            </label>
                            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500">
                              <option>IDR - Rupiah</option>
                              <option>USD - Dollar</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t">
                        <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white">
                          Simpan Pengaturan
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}