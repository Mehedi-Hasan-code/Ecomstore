'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewProductPage() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    image: '',
    stock: '',
    featured: false,
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/dashboard/products');
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to create product');
      }
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Error creating product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <Link href="/dashboard/products">
          <Button variant="outline">← Back to Products</Button>
        </Link>
      </div>

      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">Add New Product</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Product Name *
            </label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter product name"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Price *
              </label>
              <Input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                placeholder="0.00"
              />
            </div>

            <div>
              <label
                htmlFor="stock"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Stock Quantity
              </label>
              <Input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Category *
            </label>
            <Input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              placeholder="e.g., Electronics, Clothing, Books"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter product description"
            />
          </div>

          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Image URL
            </label>
            <Input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
            <p className="text-sm text-gray-500 mt-1">
              Leave empty to use default placeholder image
            </p>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="featured"
              className="ml-2 block text-sm text-gray-700"
            >
              Featured Product
            </label>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Creating...' : 'Create Product'}
            </Button>
            <Link href="/dashboard/products" className="flex-1">
              <Button type="button" variant="outline" className="w-full">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
