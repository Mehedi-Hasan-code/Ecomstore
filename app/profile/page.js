'use client';

import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatPrice, formatDate } from '@/lib/utils';
import ProtectedRoute from '@/components/protected-route';

export default function ProfilePage() {
  const { data: session } = useSession();

  const { data: userBookings, isLoading } = useQuery({
    queryKey: ['user-bookings', session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) return [];
      const response = await axios.get(
        `/api/bookings?userId=${session.user.id}`
      );
      return response.data;
    },
    enabled: !!session?.user?.id,
  });

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

          {/* User Info */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <p className="text-gray-900">
                    {session?.user?.name || 'Not provided'}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <p className="text-gray-900">{session?.user?.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Account Type
                  </label>
                  <p className="text-gray-900">
                    {session?.user?.image ? 'Google Account' : 'Email Account'}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Member Since
                  </label>
                  <p className="text-gray-900">
                    {session?.user?.createdAt
                      ? formatDate(session.user.createdAt)
                      : 'Recently joined'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order History */}
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : userBookings?.length > 0 ? (
                <div className="space-y-4">
                  {userBookings.map((booking) => (
                    <div key={booking._id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">
                            Order #{booking._id.slice(-8)}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {formatDate(booking.createdAt)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">
                            {formatPrice(booking.totalAmount)}
                          </p>
                          <span
                            className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                              booking.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : booking.status === 'completed'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {booking.status}
                          </span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-1">Items:</h4>
                        <ul className="text-sm text-gray-600">
                          {booking.items.map((item, index) => (
                            <li key={index}>
                              {item.name} x {item.quantity} -{' '}
                              {formatPrice(item.price * item.quantity)}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-gray-400 text-4xl mb-4">📦</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No orders yet
                  </h3>
                  <p className="text-gray-600">
                    When you place your first order, it will appear here.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}
