'use client';

import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  const [orderItems] = useState([
    {
      id: '1',
      name: 'Wireless Headphones',
      price: 199.99,
      quantity: 1,
    },
    {
      id: '2',
      name: 'Smart Watch',
      price: 299.99,
      quantity: 1,
    },
  ]);

  const totalAmount = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 9.99;
  const tax = totalAmount * 0.08;
  const finalTotal = totalAmount + shipping + tax;

  const createBookingMutation = useMutation({
    mutationFn: async (bookingData) => {
      const response = await axios.post('/api/bookings', bookingData);
      return response.data;
    },
    onSuccess: (data) => {
      // Redirect to success page or dashboard
      router.push('/dashboard?orderSuccess=true');
    },
    onError: (error) => {
      console.error('Order failed:', error);
    },
  });

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/auth/signin?callbackUrl=/checkout');
      return;
    }
    if (session?.user?.email) {
      setFormData((prev) => ({
        ...prev,
        email: session.user.email,
      }));
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const bookingData = {
      userId: session?.user?.id || 'guest-user',
      userEmail: formData.email,
      userName: `${formData.firstName} ${formData.lastName}`,
      items: orderItems,
      totalAmount: finalTotal,
      shippingAddress: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
      },
      paymentMethod: 'credit_card',
    };

    createBookingMutation.mutate(bookingData);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Shipping Information */}
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      First Name
                    </label>
                    <Input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Last Name
                    </label>
                    <Input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Phone
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Address
                  </label>
                  <Input
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      City
                    </label>
                    <Input
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      State
                    </label>
                    <Input
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      ZIP Code
                    </label>
                    <Input
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Country
                    </label>
                    <Input
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full mt-6"
                  disabled={createBookingMutation.isPending}
                >
                  {createBookingMutation.isPending
                    ? 'Processing...'
                    : `Place Order - ${formatPrice(finalTotal)}`}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orderItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center py-2 border-b"
                  >
                    <div>
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}

                <div className="space-y-2 pt-4">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>{formatPrice(totalAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>{formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax:</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>Total:</span>
                    <span>{formatPrice(finalTotal)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
