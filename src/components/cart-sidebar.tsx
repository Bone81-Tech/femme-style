'use client'

import { useState } from 'react'
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
  size?: string
  color?: string
}

interface CartSidebarProps {
  items: CartItem[]
  onUpdateQuantity: (id: number, quantity: number) => void
  onRemoveItem: (id: number) => void
  onCheckout: () => void
  children: React.ReactNode
}

export function CartSidebar({ 
  items, 
  onUpdateQuantity, 
  onRemoveItem, 
  onCheckout, 
  children 
}: CartSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price)
  }

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="w-full sm:w-96 overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-rose-600" />
              Keranjang Belanja
            </span>
            {getTotalItems() > 0 && (
              <Badge variant="secondary" className="bg-rose-100 text-rose-600">
                {getTotalItems()} item
              </Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">Keranjang belanja kosong</p>
              <Button 
                onClick={() => setIsOpen(false)}
                className="bg-rose-500 hover:bg-rose-600"
              >
                Mulai Belanja
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-3 bg-gray-50 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm line-clamp-2 mb-1">
                        {item.name}
                      </h4>
                      <p className="text-rose-600 font-semibold mb-2">
                        {formatPrice(item.price)}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="w-6 h-6"
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="text-sm font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="w-6 h-6"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-6 h-6 text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() => onRemoveItem(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatPrice(getTotalPrice())}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Ongkir</span>
                  <span className="font-medium text-green-600">Gratis</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-rose-600">{formatPrice(getTotalPrice())}</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Button 
                  className="w-full bg-rose-500 hover:bg-rose-600 py-3"
                  onClick={() => {
                    onCheckout()
                    setIsOpen(false)
                  }}
                >
                  Checkout
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-rose-200 text-rose-600 hover:bg-rose-50"
                  onClick={() => setIsOpen(false)}
                >
                  Lanjut Belanja
                </Button>
              </div>

              <div className="mt-4 p-3 bg-rose-50 rounded-lg">
                <p className="text-xs text-rose-700">
                  🎉 Gratis ongkir untuk pembelian minimal Rp 500.000
                </p>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}