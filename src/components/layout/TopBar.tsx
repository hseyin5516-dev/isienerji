import React from 'react';
import Link from 'next/link';
import { Phone, PackageCheck, Flame } from 'lucide-react';

export default function TopBar() {
  return (
    <header className="w-full text-xs">
      {/* Sarı Üst Duyuru Çubuğu */}
      <div className="bg-[#ffbf00] text-gray-900 py-1.5 px-4 font-medium text-center tracking-wide">
        <span>2.000 TL ve Üzeri Siparişte Ücretsiz Kargo ! Tüm Fiyatlarımıza KDV Dahildir.</span>
      </div>

      {/* Koyu Mavi Üst Bilgi Barı */}
      <div className="bg-brand-navy text-white/90 py-2 px-4 hidden md:block border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Sol Linkler */}
          <div className="flex items-center space-x-6">
            <Link href="/" className="hover:text-white transition-colors">
              Anasayfa
            </Link>
            <Link href="/sayfa/hakkimizda" className="hover:text-white transition-colors">
              Hakkımızda
            </Link>
            <Link href="/iletisim" className="hover:text-white transition-colors">
              İletişim
            </Link>
            <Link href="/siparis-takip" className="hover:text-white transition-colors">
              Siparişlerim
            </Link>
          </div>

          {/* Sağ Linkler */}
          <div className="flex items-center space-x-6">
            <Link
              href="/siparis-takip"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <PackageCheck className="w-3.5 h-3.5" />
              <span>Siparişim Nerede?</span>
            </Link>
            <a
              href="tel:02125469169"
              className="flex items-center gap-1.5 hover:text-brand-yellow font-semibold transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-brand-yellow" />
              <span>0212 546 91 69</span>
            </a>
            <Link
              href="/kampanyalar"
              className="flex items-center gap-1.5 text-brand-yellow hover:text-white font-medium transition-colors"
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Kampanyalar</span>
            </Link>
            <div className="flex items-center gap-1 text-xs text-white/75 bg-white/10 px-2 py-0.5 rounded">
              <span>₺ TRY</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
