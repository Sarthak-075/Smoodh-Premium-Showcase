import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import NoiseOverlay from '@/components/NoiseOverlay';
import Chatbot from '@/components/Chatbot';
import { ProductProvider } from '@/lib/ProductContext';

const outfit = Outfit({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Smoodh — Premium Flavored Milkshakes',
  description: "Experience the rich, velvety texture of Smoodh's premium blends. Lassi, Chocolate, and Chocolate Hazelnut.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} antialiased bg-[#050505]`}>
        <ProductProvider>
          <NoiseOverlay />
          <Navbar />
          {children}
          {/* Chatbot floats above all content, bottom-right */}
          <Chatbot />
        </ProductProvider>
      </body>
    </html>
  );
}
