import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Start Shopping?
        </h2>
        <p className="text-xl mb-8 text-purple-100">
          Join thousands of satisfied customers and discover amazing products
          today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-white text-purple-600 hover:bg-gray-100"
          >
            <Link href="/products">Browse Products</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="bg-white text-purple-600 hover:bg-gray-100"
          >
            <Link href="/auth/signup">Create Account</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
