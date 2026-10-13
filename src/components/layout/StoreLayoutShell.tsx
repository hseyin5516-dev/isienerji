'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import TopBar from './TopBar';
import Header from './Header';
import MegaMenu from './MegaMenu';
import Footer from './Footer';
import WhatsAppFloating from './WhatsAppFloating';
import CartDrawer from '@/components/cart/CartDrawer';

export default function StoreLayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <TopBar />
      <Header />
      <MegaMenu />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppFloating />
      <CartDrawer />
    </>
  );
}
