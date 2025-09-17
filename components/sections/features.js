import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const features = [
  {
    title: 'Fast Shipping',
    description:
      'Free shipping on orders over $50. Get your products delivered in 2-3 business days.',
    icon: '🚚',
  },
  {
    title: 'Quality Products',
    description:
      'Carefully curated selection of high-quality products from trusted brands.',
    icon: '⭐',
  },
  {
    title: 'Secure Payments',
    description:
      'Your payment information is protected with industry-standard encryption.',
    icon: '🔒',
  },
  {
    title: '24/7 Support',
    description:
      'Our customer support team is available around the clock to help you.',
    icon: '💬',
  },
];

export default function Features() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose EcomStore?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're committed to providing you with the best shopping experience
            possible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="text-center hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="text-4xl mb-4">{feature.icon}</div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
