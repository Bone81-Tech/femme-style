import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                FemmeStyle
              </span>
            </div>
            <p className="text-gray-600 text-sm">
              Toko online terpercaya untuk perlengkapan fashion wanita dengan kualitas premium dan harga terjangkau.
            </p>
            <div className="flex space-x-2">
              <Link href="#" className="p-2 bg-gray-200 rounded-full hover:bg-pink-100 transition-colors">
                <Facebook className="h-4 w-4" />
              </Link>
              <Link href="#" className="p-2 bg-gray-200 rounded-full hover:bg-pink-100 transition-colors">
                <Instagram className="h-4 w-4" />
              </Link>
              <Link href="#" className="p-2 bg-gray-200 rounded-full hover:bg-pink-100 transition-colors">
                <Twitter className="h-4 w-4" />
              </Link>
              <Link href="#" className="p-2 bg-gray-200 rounded-full hover:bg-pink-100 transition-colors">
                <Youtube className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Layanan</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-pink-600 transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-pink-600 transition-colors">
                  Kontak
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-pink-600 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="text-gray-600 hover:text-pink-600 transition-colors">
                  Panduan Ukuran
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-600 hover:text-pink-600 transition-colors">
                  Info Pengiriman
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Layanan Pelanggan</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/returns" className="text-gray-600 hover:text-pink-600 transition-colors">
                  Pengembalian
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="text-gray-600 hover:text-pink-600 transition-colors">
                  Garansi
                </Link>
              </li>
              <li>
                <Link href="/payment" className="text-gray-600 hover:text-pink-600 transition-colors">
                  Metode Pembayaran
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="text-gray-600 hover:text-pink-600 transition-colors">
                  Lacak Pesanan
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-pink-600 transition-colors">
                  Syarat & Ketentuan
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Hubungi Kami</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-pink-500" />
                <span className="text-gray-600">info@femmestyle.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-pink-500" />
                <span className="text-gray-600">+62 812-3456-7890</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-pink-500" />
                <span className="text-gray-600">
                  Jl. Fashion No. 123, Jakarta 12345
                </span>
              </div>
            </div>
            
            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="font-medium text-gray-900 mb-2">Newsletter</h4>
              <p className="text-sm text-gray-600 mb-3">
                Dapatkan penawaran spesial dan update terbaru
              </p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Email Anda"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <button className="px-4 py-2 bg-pink-500 text-white rounded-md text-sm hover:bg-pink-600 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
            <p>&copy; 2025 FemmeStyle. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-pink-600 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-pink-600 transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-pink-600 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}