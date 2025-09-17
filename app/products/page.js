'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import ProductCard from '@/components/product-card';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (query = '') => {
    try {
      setLoading(true);
      const url = query
        ? `/api/products?q=${encodeURIComponent(query)}`
        : '/api/products';
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts(searchQuery);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
        <Link href="/dashboard/products/new">
          <Button>Add Product</Button>
        </Link>
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2 max-w-md">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button type="submit">Search</Button>
          {searchQuery && (
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                fetchProducts();
              }}
            >
              Clear
            </Button>
          )}
        </div>
      </form>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No products found.</p>
          <Link href="/dashboard/products/new">
            <Button>Add Your First Product</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
