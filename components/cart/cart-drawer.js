'use client';

import { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useCart } from '@/contexts/cart-context';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CartDrawer({ isOpen, onClose }) {
  const { data: session } = useSession();
  const {
    items,
    totalItems,
    totalPrice,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">
              Shopping Cart ({totalItems})
            </h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-gray-500 mb-4">
                  Add some products to get started
                </p>
                <Button asChild onClick={onClose}>
                  <Link href="/products">Continue Shopping</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <CartItem
                    key={item._id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeItem}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t p-4 space-y-4">
              {/* Total */}
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <Button asChild className="w-full" onClick={onClose}>
                  <Link
                    href={
                      session
                        ? '/checkout'
                        : '/auth/signin?callbackUrl=/checkout'
                    }
                  >
                    {session ? 'Proceed to Checkout' : 'Sign In to Checkout'}
                  </Link>
                </Button>
                <Button asChild className="w-full" onClick={onClose}>
                  <Link
                    href={session ? '/cart' : '/auth/signin?callbackUrl=/cart'}
                  >
                    View Cart
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={onClose}
                  asChild
                >
                  <Link href="/products">Continue Shopping</Link>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => {
                    clearCart();
                    onClose();
                  }}
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function CartItem({ item, onUpdateQuantity, onRemove }) {
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) {
      onRemove(item._id);
    } else {
      onUpdateQuantity(item._id, newQuantity);
    }
  };

  return (
    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
      {/* Product Image */}
      <div className="flex-shrink-0">
        <img
          src={item.image || '/placeholder-product.jpg'}
          alt={item.name}
          className="w-16 h-16 object-cover rounded-md"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-gray-900 truncate">
          {item.name}
        </h4>
        <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>

        {/* Quantity Controls */}
        <div className="flex items-center space-x-2 mt-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handleQuantityChange(item.quantity - 1)}
          >
            <Minus className="h-3 w-3" />
          </Button>

          <span className="text-sm font-medium w-8 text-center">
            {item.quantity}
          </span>

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handleQuantityChange(item.quantity + 1)}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Remove Button */}
      <Button
        variant="ghost"
        size="icon"
        className="text-red-500 hover:text-red-700 hover:bg-red-50"
        onClick={() => onRemove(item._id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
