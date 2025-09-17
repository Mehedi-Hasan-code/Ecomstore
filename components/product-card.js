'use client';

import Link from 'next/link';
import { Star, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AddToCartButton from '@/components/cart/add-to-cart-button';

export default function ProductCard({ product }) {
  const {
    _id,
    name,
    price,
    description,
    image,
    category,
    stock = 0,
    featured = false,
  } = product;

  const isOutOfStock = stock <= 0;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={image || '/placeholder-product.jpg'}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {featured && (
            <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              Featured
            </span>
          )}
          {isOutOfStock && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              Out of Stock
            </span>
          )}
        </div>

        {/* Quick View Button */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            asChild
            size="icon"
            variant="secondary"
            className="rounded-full"
          >
            <Link href={`/products/${_id}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        <p className="text-sm text-gray-500 mb-1 capitalize">{category}</p>

        {/* Product Name */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          <Link
            href={`/products/${_id}`}
            className="hover:text-primary transition-colors"
          >
            {name}
          </Link>
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{description}</p>

        {/* Price and Stock */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-primary">
            ${price.toFixed(2)}
          </span>
          <span className="text-sm text-gray-500">
            {stock > 0 ? `${stock} in stock` : 'Out of stock'}
          </span>
        </div>

        {/* Rating (placeholder) */}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-2">(4.0)</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <AddToCartButton
            product={product}
            disabled={isOutOfStock}
            className="flex-1"
          />
          <Button asChild variant="outline" size="default" className="px-3">
            <Link href={`/products/${_id}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
