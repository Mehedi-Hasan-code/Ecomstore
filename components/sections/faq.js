'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const faqs = [
  {
    question: 'What is your return policy?',
    answer:
      'We offer a 30-day return policy for all items in original condition. Simply contact our support team to initiate a return.',
  },
  {
    question: 'How long does shipping take?',
    answer:
      'Standard shipping takes 3-5 business days. Express shipping (1-2 days) is available for an additional fee.',
  },
  {
    question: 'Do you ship internationally?',
    answer:
      'Yes, we ship to over 50 countries worldwide. International shipping times vary by location.',
  },
  {
    question: 'Are your products authentic?',
    answer:
      'Absolutely! We only sell authentic products directly from manufacturers or authorized distributors.',
  },
  {
    question: 'How can I track my order?',
    answer:
      "Once your order ships, you'll receive a tracking number via email. You can also track orders in your account dashboard.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Find answers to common questions about our products and services.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card
              key={index}
              className="cursor-pointer hover:shadow-md transition-shadow"
            >
              <CardHeader onClick={() => toggleFAQ(index)}>
                <CardTitle className="flex justify-between items-center">
                  <span>{faq.question}</span>
                  <span className="text-2xl">
                    {openIndex === index ? '−' : '+'}
                  </span>
                </CardTitle>
              </CardHeader>
              {openIndex === index && (
                <CardContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
