'use client';

import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import ProtectedRoute from '@/components/protected-route';

export default function EditProductPage({ params }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image: '',
  });

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', params.id],
    queryFn: async () => {
      const response = await axios.get(`/api/products/${params.id}`);
      return response.data;
    },
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price?.toString() || '',
        category: product.category || '',
        stock: product.stock?.toString() || '',
        image: product.image || '',
      });
    }
  }, [product]);

  const updateProductMutation = useMutation({
    mutationFn: async (productData) => {
      const response = await axios.put(
        `/api/products/${params.id}`,
        productData
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['product', params.id]);
      queryClient.invalidateQueries(['dashboard-products']);
      alert('Product updated successfully!');
      router.push('/dashboard');
    },
    onError: (error) => {
      alert('Failed to update product. Please try again.');
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.delete(`/api/products/${params.id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['dashboard-products']);
      alert('Product deleted successfully!');
      router.push('/dashboard');
    },
    onError: (error) => {
      alert('Failed to delete product. Please try again.');
    },
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProductMutation.mutate(formData);
  };

  const handleDelete = () => {
    if (
      confirm(
        'Are you sure you want to delete this product? This action cannot be undone.'
      )
    ) {
      deleteProductMutation.mutate();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h2>
          <Button asChild>
            <Link href="/dashboard">Back to Dashboard</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Button asChild variant="outline">
              <Link href="/dashboard">← Back to Dashboard</Link>
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Edit Product</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Product Name
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter product name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter product description"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Price ($)
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Stock Quantity
                    </label>
                    <Input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleInputChange}
                      placeholder="0"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                    <option value="home">Home & Garden</option>
                    <option value="sports">Sports & Outdoors</option>
                    <option value="books">Books</option>
                    <option value="toys">Toys & Games</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Image URL (optional)
                  </label>
                  <Input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="flex space-x-4">
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={updateProductMutation.isPending}
                  >
                    {updateProductMutation.isPending
                      ? 'Updating...'
                      : 'Update Product'}
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={deleteProductMutation.isPending}
                  >
                    {deleteProductMutation.isPending ? 'Deleting...' : 'Delete'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}
