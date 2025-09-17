'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Footer from '@/components/footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            We'd love to hear from you. Send us a message and we'll respond as
            soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="text-green-500 text-5xl mb-4">✓</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-gray-600">
                      Thank you for contacting us. We'll get back to you within
                      24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Name
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Subject
                      </label>
                      <Input
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="What is this about?"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us more about your inquiry..."
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      Send Message
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Get in Touch</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="text-primary text-xl">📧</div>
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <p className="text-gray-600">support@ecomstore.com</p>
                      <p className="text-sm text-gray-500">
                        We'll respond within 24 hours
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="text-primary text-xl">📞</div>
                    <div>
                      <h4 className="font-medium">Phone</h4>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                      <p className="text-sm text-gray-500">
                        Mon-Fri, 9AM-6PM EST
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="text-primary text-xl">📍</div>
                    <div>
                      <h4 className="font-medium">Address</h4>
                      <p className="text-gray-600">
                        123 Commerce Street
                        <br />
                        Business District
                        <br />
                        New York, NY 10001
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="text-primary text-xl">💬</div>
                    <div>
                      <h4 className="font-medium">Live Chat</h4>
                      <p className="text-gray-600">Available on our website</p>
                      <p className="text-sm text-gray-500">
                        Mon-Fri, 9AM-6PM EST
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        How can I track my order?
                      </h4>
                      <p className="text-sm text-gray-600">
                        You'll receive a tracking number via email once your
                        order ships.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        What's your return policy?
                      </h4>
                      <p className="text-sm text-gray-600">
                        We offer 30-day returns for items in original condition.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Do you ship internationally?
                      </h4>
                      <p className="text-sm text-gray-600">
                        Yes, we ship to over 50 countries worldwide.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
