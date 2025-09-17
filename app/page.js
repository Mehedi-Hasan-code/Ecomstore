import AnimatedLanding from '@/components/animated-landing';

export const metadata = {
  title: 'NextStore - Premium E-commerce Experience',
  description:
    'Discover amazing products at unbeatable prices. Shop the latest trends in electronics, fashion, home & garden, and more. Fast shipping, secure checkout, and excellent customer service.',
  keywords: [
    'e-commerce',
    'online shopping',
    'electronics',
    'fashion',
    'home decor',
    'best deals',
  ],
  authors: [{ name: 'NextStore Team' }],
  creator: 'NextStore',
  publisher: 'NextStore',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://nextstore.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'NextStore - Premium E-commerce Experience',
    description:
      'Discover amazing products at unbeatable prices. Shop the latest trends with fast shipping and secure checkout.',
    url: 'https://nextstore.com',
    siteName: 'NextStore',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NextStore - Premium E-commerce Experience',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NextStore - Premium E-commerce Experience',
    description:
      'Discover amazing products at unbeatable prices. Shop the latest trends with fast shipping and secure checkout.',
    images: ['/og-image.jpg'],
    creator: '@nextstore',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export default function Home() {
  return <AnimatedLanding />;
}
