'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatPrice, formatDate } from '@/lib/utils';
import ProtectedRoute from '@/components/protected-route';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('products');

  const { data: products, isLoading: productsLoading } = useQuery({
    queryKey: ['dashboard-products'],
    queryFn: async () => {
      const response = await axios.get('/api/products?userOnly=true');
      return response.data;
    },
  });

  const { data: bookings, isLoading: bookingsLoading } = useQuery({
    queryKey: ['dashboard-bookings'],
    queryFn: async () => {
      const response = await axios.get('/api/bookings');
      return response.data;
    },
  });

  const tabs = [
    { id: 'products', label: 'Products', count: products?.length || 0 },
    { id: 'bookings', label: 'Orders', count: bookings?.length || 0 },
    { id: 'analytics', label: 'Analytics', count: null },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Dashboard</h1>
            <p className="text-gray-600">
              Manage your products, orders, and view analytics.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-gray-200 mb-8">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                  {tab.count !== null && (
                    <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === 'products' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Products</h2>
                <div className="flex gap-2">
                  <Button asChild variant="outline">
                    <Link href="/dashboard/products">Manage Products</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/dashboard/products/new">Add New Product</Link>
                  </Button>
                </div>
              </div>

              {productsLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <Card key={i} className="animate-pulse">
                      <CardHeader>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      </CardHeader>
                      <CardContent>
                        <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : products?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <Card
                      key={product._id}
                      className="hover:shadow-lg transition-shadow"
                    >
                      <CardHeader>
                        <CardTitle className="text-lg">
                          {product.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                          {product.description}
                        </p>
                        <p className="text-xl font-bold text-primary mb-2">
                          {formatPrice(product.price)}
                        </p>
                        <p className="text-sm text-gray-500 mb-4">
                          Stock: {product.stock || 0} | Category:{' '}
                          {product.category}
                        </p>
                        <div className="flex space-x-2">
                          <Button asChild variant="outline" size="sm">
                            <Link
                              href={`/dashboard/products/edit/${product._id}`}
                            >
                              Edit
                            </Link>
                          </Button>
                          <Button asChild size="sm">
                            <Link href={`/products/${product._id}`}>View</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No products yet
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Get started by adding your first product.
                    </p>
                    <Button asChild>
                      <Link href="/dashboard/products/new">Add Product</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {activeTab === 'bookings' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Recent Orders
              </h2>

              {bookingsLoading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <Card key={i} className="animate-pulse">
                      <CardContent className="p-6">
                        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : bookings?.length > 0 ? (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <Card key={booking._id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg">
                              Order #{booking._id.slice(-8)}
                            </h3>
                            <p className="text-gray-600">
                              Customer: {booking.userName}
                            </p>
                            <p className="text-gray-600">
                              Email: {booking.userEmail}
                            </p>
                            <p className="text-sm text-gray-500">
                              Ordered on {formatDate(booking.createdAt)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-primary">
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
                        <div className="mt-4">
                          <h4 className="font-medium mb-2">Items:</h4>
                          <ul className="space-y-1">
                            {booking.items.map((item, index) => (
                              <li key={index} className="text-sm text-gray-600">
                                {item.name} x {item.quantity} -{' '}
                                {formatPrice(item.price * item.quantity)}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No orders yet
                    </h3>
                    <p className="text-gray-600">
                      Orders will appear here once customers start purchasing.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {activeTab === 'analytics' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Analytics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-gray-600">
                      Total Products
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">
                      {products?.length || 0}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-gray-600">
                      Total Orders
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">
                      {bookings?.length || 0}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-gray-600">
                      Total Revenue
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">
                      {formatPrice(
                        bookings?.reduce(
                          (sum, booking) => sum + booking.totalAmount,
                          0
                        ) || 0
                      )}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-gray-600">
                      Avg Order Value
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">
                      {bookings?.length > 0
                        ? formatPrice(
                            bookings.reduce(
                              (sum, booking) => sum + booking.totalAmount,
                              0
                            ) / bookings.length
                          )
                        : formatPrice(0)}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
