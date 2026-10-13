import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/components/cart/CartContext';
import StoreLayoutShell from '@/components/layout/StoreLayoutShell';

export const metadata: Metadata = {
  title: 'Isı Enerji ® | Yerden Isıtma ve Tesisat Sistemleri',
  description:
    'Eviniz ve projeleriniz için yerden ısıtma sistemleri, sirkülasyon pompaları, hidraforlar, boylerler ve kaliteli mekanik tesisat çözümleri.',
  icons: {
    icon: '/images/logo/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="antialiased min-h-screen flex flex-col bg-white">
        <CartProvider>
          <StoreLayoutShell>
            {children}
          </StoreLayoutShell>
        </CartProvider>
      </body>
    </html>
  );
}
