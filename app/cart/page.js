'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useCart } from '@/contexts/cart-context';
import { Button } from '@/components/ui/button';
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const {
    items,
    totalItems,
    totalPrice,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/auth/signin?callbackUrl=/cart');
      return;
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <ShoppingBag className="mx-auto h-24 w-24 text-gray-300" />
            <h1 className="mt-4 text-3xl font-bold text-gray-900">
              Your cart is empty
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Looks like you haven't added any items to your cart yet.
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="/products">
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="mt-2 text-gray-600">
            {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
          {/* Cart Items */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-4 py-6 sm:px-6">
                <div className="flow-root">
                  <ul className="-my-6 divide-y divide-gray-200">
                    {items.map((item) => (
                      <CartItem
                        key={item._id}
                        item={item}
                        onUpdateQuantity={updateQuantity}
                        onRemove={removeItem}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex justify-between">
              <Button asChild variant="outline">
                <Link href="/products">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Continue Shopping
                </Link>
              </Button>
              <Button
                variant="ghost"
                onClick={clearCart}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="mt-16 lg:col-span-5 lg:mt-0">
            <div className="bg-white rounded-lg shadow-sm px-4 py-6 sm:px-6">
              <h2 className="text-lg font-medium text-gray-900">
                Order Summary
              </h2>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ${totalPrice.toFixed(2)}
                  </dd>
                </div>

                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Shipping</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {totalPrice > 50 ? 'Free' : '$5.99'}
                  </dd>
                </div>

                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Tax</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ${(totalPrice * 0.08).toFixed(2)}
                  </dd>
                </div>

                <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                  <dt className="text-base font-medium text-gray-900">
                    Order total
                  </dt>
                  <dd className="text-base font-medium text-gray-900">
                    $
                    {(
                      totalPrice +
                      (totalPrice > 50 ? 0 : 5.99) +
                      totalPrice * 0.08
                    ).toFixed(2)}
                  </dd>
                </div>
              </div>

              <div className="mt-6">
                <Button asChild className="w-full" size="lg">
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
              </div>

              {totalPrice < 50 && (
                <p className="mt-4 text-sm text-center text-gray-500">
                  Add ${(50 - totalPrice).toFixed(2)} more for free shipping!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
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
    <li className="flex py-6">
      <div className="flex-shrink-0">
        <img
          src={item.image || '/placeholder-product.jpg'}
          alt={item.name}
          className="h-24 w-24 rounded-md object-cover object-center sm:h-32 sm:w-32"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div>
            <div className="flex justify-between">
              <h3 className="text-sm">
                <Link
                  href={`/products/${item._id}`}
                  className="font-medium text-gray-700 hover:text-gray-800"
                >
                  {item.name}
                </Link>
              </h3>
            </div>
            <div className="mt-1 flex text-sm">
              <p className="text-gray-500">{item.category}</p>
            </div>
            <p className="mt-1 text-sm font-medium text-gray-900">
              ${item.price.toFixed(2)}
            </p>
          </div>

          <div className="mt-4 sm:mt-0 sm:pr-9">
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                type="button"
                className="flex items-center justify-center w-8 h-8 text-gray-600 hover:text-gray-800"
                onClick={() => handleQuantityChange(item.quantity - 1)}
              >
                <Minus className="h-4 w-4" />
              </button>

              <span className="flex-1 text-center text-sm font-medium text-gray-900 py-2">
                {item.quantity}
              </span>

              <button
                type="button"
                className="flex items-center justify-center w-8 h-8 text-gray-600 hover:text-gray-800"
                onClick={() => handleQuantityChange(item.quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <div className="absolute top-0 right-0">
              <button
                type="button"
                className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                onClick={() => onRemove(item._id)}
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <p className="mt-4 flex space-x-2 text-sm text-gray-700">
          <span className="font-medium">
            Subtotal: ${(item.price * item.quantity).toFixed(2)}
          </span>
        </p>
      </div>
    </li>
  );
}
