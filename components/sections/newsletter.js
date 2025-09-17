'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the email to your backend
    setIsSubscribed(true);
    setEmail('');
  };

  return (
    <section className="py-20 bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about new
            products, exclusive deals, and special offers.
          </p>

          {isSubscribed ? (
            <div className="bg-green-500 text-white p-4 rounded-lg max-w-md mx-auto">
              <p className="font-semibold">Thank you for subscribing!</p>
              <p>You'll receive our latest updates soon.</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="max-w-md mx-auto flex gap-4"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-white text-gray-900"
              />
              <Button type="submit" variant="secondary">
                Subscribe
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
