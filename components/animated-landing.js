'use client';

import { useEffect, useRef } from 'react';
import Hero from '@/components/sections/hero';
import Features from '@/components/sections/features';
import FeaturedProducts from '@/components/sections/featured-products';
import Testimonials from '@/components/sections/testimonials';
import Newsletter from '@/components/sections/newsletter';
import FAQ from '@/components/sections/faq';
import CTA from '@/components/sections/cta';
import Footer from '@/components/footer';

export default function AnimatedLanding() {
  const sectionsRef = useRef([]);

  useEffect(() => {
    // Intersection Observer for scroll reveal animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    // Observe all sections
    sectionsRef.current.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero section with immediate animation */}
      <div className="animate-fade-in">
        <Hero />
      </div>

      {/* Animated sections */}
      <div
        ref={addToRefs}
        className="opacity-0 translate-y-8 transition-all duration-700 ease-out"
      >
        <Features />
      </div>

      <div
        ref={addToRefs}
        className="opacity-0 translate-y-8 transition-all duration-700 ease-out"
      >
        <FeaturedProducts />
      </div>

      <div
        ref={addToRefs}
        className="opacity-0 translate-y-8 transition-all duration-700 ease-out"
      >
        <Testimonials />
      </div>

      <div
        ref={addToRefs}
        className="opacity-0 translate-y-8 transition-all duration-700 ease-out"
      >
        <Newsletter />
      </div>

      <div
        ref={addToRefs}
        className="opacity-0 translate-y-8 transition-all duration-700 ease-out"
      >
        <FAQ />
      </div>

      <div
        ref={addToRefs}
        className="opacity-0 translate-y-8 transition-all duration-700 ease-out"
      >
        <CTA />
      </div>

      <div
        ref={addToRefs}
        className="opacity-0 translate-y-8 transition-all duration-700 ease-out"
      >
        <Footer />
      </div>
    </div>
  );
}
