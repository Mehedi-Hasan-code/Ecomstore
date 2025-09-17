'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, ShoppingBag } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-purple-700 text-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 animate-fade-in">
            <Star className="w-4 h-4 text-yellow-300" />
            <span className="text-sm font-medium">
              Trusted by 10,000+ customers
            </span>
          </div>

          {/* Main heading with staggered animation */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="block animate-fade-in">Discover</span>
            <span className="block animate-fade-in-up bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
              Amazing Products
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto animate-fade-in-up opacity-0 animate-delay-300">
            Shop the latest electronics, fashion, and home goods at unbeatable
            prices. Quality products, fast shipping, and exceptional customer
            service.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up opacity-0 animate-delay-500">
            <Button
              asChild
              size="lg"
              className="group bg-white text-blue-600 hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Link href="/products" className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Shop Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="group bg-white text-blue-600 hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Link href="/about">Learn More</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto animate-fade-in-up opacity-0 animate-delay-700">
            <div className="text-center">
              <div className="text-2xl font-bold">10K+</div>
              <div className="text-blue-200 text-sm">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">50K+</div>
              <div className="text-blue-200 text-sm">Products Sold</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">4.9★</div>
              <div className="text-blue-200 text-sm">Customer Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}
