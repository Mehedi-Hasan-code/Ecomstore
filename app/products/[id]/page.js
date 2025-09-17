'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useParams, useRouter } from 'next/navigation';
import { useCart } from '@/contexts/cart-context';
import { ShoppingCart, Check } from 'lucide-react';
import Link from 'next/link';

export default function ProductDetailPage() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const params = useParams();
  const router = useRouter();
  const { addItem } = useCart();

  useEffect(() => {
    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/products/${params.id}`);

      if (response.ok) {
        const data = await response.json();
        setProduct(data);
      } else if (response.status === 404) {
        router.push('/products');
      } else {
        console.error('Failed to fetch product');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product.stock) return;

    addItem(product, quantity);
    setIsAdded(true);

    // Reset the success state after 2 seconds
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Product not found.</p>
          <Link href="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Link href="/products">
          <Button variant="outline">← Back to Products</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={product.image || '/placeholder-product.jpg'}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.category}</p>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl font-bold text-green-600">
                ${product.price.toFixed(2)}
              </span>
              {product.featured && (
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                  Featured
                </span>
              )}
            </div>
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Stock Info */}
          <div className="border-t pt-4">
            <p className="text-sm text-gray-600 mb-2">
              Stock: {product.stock || 0} available
            </p>
            {product.stock > 0 ? (
              <span className="text-green-600 text-sm">✓ In Stock</span>
            ) : (
              <span className="text-red-600 text-sm">✗ Out of Stock</span>
            )}
          </div>

          {/* Add to Cart */}
          <div className="border-t pt-4">
            <div className="flex items-center gap-4 mb-4">
              <label htmlFor="quantity" className="text-sm font-medium">
                Quantity:
              </label>
              <select
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="border rounded px-3 py-1"
                disabled={!product.stock}
              >
                {Array.from(
                  { length: Math.min(product.stock || 0, 10) },
                  (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  )
                )}
              </select>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={handleAddToCart}
                disabled={!product.stock || isAdded}
                className="flex-1 transition-all duration-200"
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Added to Cart
                  </>
                ) : product.stock ? (
                  <>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </>
                ) : (
                  'Out of Stock'
                )}
              </Button>
              <Button variant="outline" className="flex-1">
                Add to Wishlist
              </Button>
            </div>
          </div>

          {/* Product Meta */}
          {product.createdAt && (
            <div className="border-t pt-4 text-sm text-gray-500">
              <p>Added: {new Date(product.createdAt).toLocaleDateString()}</p>
              {product.createdBy && <p>By: {product.createdBy}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
