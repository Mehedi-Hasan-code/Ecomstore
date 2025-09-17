import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Footer from '@/components/footer';

export const metadata = {
  title: 'About Us - EcomStore',
  description:
    'Learn more about EcomStore, our mission, and our commitment to providing quality products.',
};

export default function AboutPage() {
  const team = [
    {
      name: 'John Smith',
      role: 'CEO & Founder',
      description:
        'Passionate about bringing quality products to customers worldwide.',
    },
    {
      name: 'Sarah Johnson',
      role: 'Head of Operations',
      description:
        'Ensures smooth operations and exceptional customer service.',
    },
    {
      name: 'Mike Chen',
      role: 'Product Manager',
      description:
        'Curates our product selection and maintains quality standards.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About EcomStore
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            We're on a mission to make quality products accessible to everyone,
            with exceptional service and unbeatable prices.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="prose prose-lg mx-auto text-gray-600">
              <p className="mb-6">
                Founded in 2020, EcomStore began as a small startup with a big
                vision: to create an online marketplace that prioritizes
                quality, affordability, and customer satisfaction above all
                else.
              </p>
              <p className="mb-6">
                What started as a passion project has grown into a trusted
                destination for thousands of customers worldwide. We carefully
                curate every product in our catalog, working directly with
                manufacturers and authorized distributors to ensure authenticity
                and quality.
              </p>
              <p>
                Today, we're proud to offer an extensive selection of
                electronics, fashion, home goods, and more, all backed by our
                commitment to exceptional customer service and fast, reliable
                shipping.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="text-4xl mb-4">🎯</div>
                <CardTitle>Quality First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We never compromise on quality. Every product is carefully
                  vetted to meet our high standards before it reaches our
                  customers.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="text-4xl mb-4">💝</div>
                <CardTitle>Customer Focused</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our customers are at the heart of everything we do. We're
                  committed to providing exceptional service and support at
                  every step.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="text-4xl mb-4">🌱</div>
                <CardTitle>Sustainable Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We believe in responsible business practices that benefit our
                  customers, partners, and the environment for the long term.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600">
              The passionate people behind EcomStore.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-gray-500 text-2xl">👤</span>
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <p className="text-primary font-medium">{member.role}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
