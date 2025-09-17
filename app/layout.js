import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/navigation';
import Providers from '@/components/providers';
import StructuredData from '@/components/structured-data';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'EcomStore - Your Premium E-commerce Destination',
  description:
    'Discover amazing products at unbeatable prices. Shop electronics, fashion, home goods and more.',
  keywords: 'ecommerce, shopping, electronics, fashion, home goods',
  openGraph: {
    title: 'EcomStore - Your Premium E-commerce Destination',
    description: 'Discover amazing products at unbeatable prices',
    type: 'website',
    url: 'https://ecomstore.com',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Navigation />
          <main className="min-h-screen">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
