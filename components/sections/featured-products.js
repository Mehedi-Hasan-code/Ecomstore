'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';

export default function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const products = await response.json();
        // Filter featured products and limit to 3
        const featured = products.filter((p) => p.featured).slice(0, 3);
        setFeaturedProducts(featured);
      }
    } catch (error) {
      console.error('Error fetching featured products:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Check out our most popular products that customers love.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded w-24"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Card
                key={product._id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden">
                    <img
                      src={product.image || '/placeholder-product.jpg'}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-xl">{product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    ${product.price.toFixed(2)}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={`/products/${product._id}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">
              No featured products available.
            </p>
            <Button asChild variant="outline">
              <Link href="/products">View All Products</Link>
            </Button>
          </div>
        )}

        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg">
            <Link href="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
