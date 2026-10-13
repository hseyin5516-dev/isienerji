'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, ShoppingBag, User, Store, Package, Menu, X } from 'lucide-react';
import { useCart } from '@/components/cart/CartContext';
import { formatPrice } from '@/lib/utils';

export default function Header() {
  const router = useRouter();
  const { cartCount, cartTotal, setIsDrawerOpen } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/arama?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className="bg-white border-b border-gray-100 py-3.5 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 flex items-center">
          <Image
            src="/images/logo/logo.png"
            alt="Isı Enerji"
            width={210}
            height={50}
            className="h-10 sm:h-12 w-auto object-contain"
            priority
          />
        </Link>

        {/* Yuvarlak Arama Kutusu (Masaüstü) */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 max-w-xl mx-4 relative items-center"
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Binlerce ürün içinden arayın..."
            className="w-full h-11 pl-5 pr-12 rounded-full border border-gray-300 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-brand-navy focus:ring-1 focus:ring-brand-navy transition-all shadow-inner"
          />
          <button
            type="submit"
            aria-label="Ara"
            className="absolute right-1.5 w-8 h-8 rounded-full bg-brand-green hover:bg-brand-greenHover text-white flex items-center justify-center transition-colors shadow-sm"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>

        {/* Sağ İşlem Butonları */}
        <div className="hidden lg:flex items-center space-x-6 text-sm font-medium">
          <Link
            href="/siparis-takip"
            className="flex items-center gap-1.5 text-gray-700 hover:text-brand-green transition-colors"
          >
            <Package className="w-4 h-4 text-brand-green" />
            <span className="text-xs">Sipariş Takip</span>
          </Link>

          <Link
            href="/magazalarimiz"
            className="flex items-center gap-1.5 text-gray-700 hover:text-brand-green transition-colors"
          >
            <Store className="w-4 h-4 text-brand-green" />
            <span className="text-xs">Şubeler</span>
          </Link>

          <Link
            href="/uye-girisi"
            className="flex items-center gap-1.5 text-gray-700 hover:text-brand-green transition-colors"
          >
            <User className="w-4 h-4 text-brand-green" />
            <span className="text-xs">Üyelik/Giriş</span>
          </Link>

          {/* Sepet Butonu */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center gap-2 text-brand-green bg-green-50/80 hover:bg-green-100/80 border border-brand-green/20 px-3.5 py-2 rounded-full transition-all group"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-brand-green group-hover:scale-105 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <div className="text-left font-ui">
              <span className="text-xs font-semibold text-gray-800">
                Sepet [{formatPrice(cartTotal)}]
              </span>
            </div>
          </button>
        </div>

        {/* Mobil Butonlar */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="relative p-2 text-brand-green"
          >
            <ShoppingBag className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-700 hover:text-black"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobil Arama Çubuğu */}
      <div className="md:hidden px-4 mt-2">
        <form onSubmit={handleSearch} className="relative flex items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Ürün ara..."
            className="w-full h-10 pl-4 pr-10 rounded-full border border-gray-300 text-sm focus:outline-none focus:border-brand-navy"
          />
          <button
            type="submit"
            className="absolute right-1 w-8 h-8 rounded-full bg-brand-green text-white flex items-center justify-center"
          >
            <Search className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
