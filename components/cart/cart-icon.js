'use client';

import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/cart-context';
import { Button } from '@/components/ui/button';

export default function CartIcon({ onClick }) {
  const { totalItems } = useCart();

  return (
    <Button variant="ghost" size="icon" className="relative" onClick={onClick}>
      <ShoppingCart className="h-5 w-5" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </Button>
  );
}
