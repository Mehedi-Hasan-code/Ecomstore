'use client';

import { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '@/contexts/cart-context';
import { Button } from '@/components/ui/button';

export default function AddToCartButton({
  product,
  quantity = 1,
  variant = 'default',
  size = 'default',
  className = '',
  disabled = false,
}) {
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    if (disabled) return;

    addItem(product, quantity);
    setIsAdded(true);

    // Reset the success state after 2 seconds
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={`transition-all duration-200 ${className}`}
      onClick={handleAddToCart}
      disabled={disabled || isAdded}
    >
      {isAdded ? (
        <>
          <Check className="w-4 h-4 mr-2" />
          Added to Cart
        </>
      ) : (
        <>
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </>
      )}
    </Button>
  );
}
