import { Card, CardContent, CardHeader } from '@/components/ui/card';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Verified Customer',
    content:
      "Amazing quality products and super fast shipping! I've been shopping here for over a year and never been disappointed.",
    rating: 5,
  },
  {
    name: 'Mike Chen',
    role: 'Tech Enthusiast',
    content:
      'The electronics selection is fantastic. Great prices and authentic products. Customer service is top-notch too!',
    rating: 5,
  },
  {
    name: 'Emily Davis',
    role: 'Fashion Lover',
    content:
      'Love the variety of products available. The website is easy to navigate and checkout is seamless.',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers
            have to say.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">
                      ⭐
                    </span>
                  ))}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 italic">"{testimonial.content}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
