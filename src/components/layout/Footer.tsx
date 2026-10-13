'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Instagram, Youtube, Facebook, Send, ShieldCheck, CreditCard, RotateCcw } from 'lucide-react';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-white border-t border-gray-200">
      {/* E-Bülten Bölümü */}
      <div className="bg-[#fcf8fa] py-10 px-4 border-b border-gray-100 text-center">
        <div className="max-w-xl mx-auto space-y-3">
          <h3 className="text-xl font-bold text-gray-900 tracking-tight">
            E-BÜLTEN ABONELİĞİ
          </h3>
          <p className="text-xs text-gray-500">
            Her türlü indirimden ilk haberdar ol
          </p>
          <form onSubmit={handleNewsletter} className="flex max-w-md mx-auto mt-4 shadow-sm">
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="E-POSTA ADRESİNİZ"
              className="flex-1 px-4 py-2.5 rounded-l border border-gray-300 text-xs focus:outline-none focus:border-brand-navy"
            />
            <button
              type="submit"
              className="bg-brand-navy hover:bg-brand-navyHover text-white px-6 py-2.5 rounded-r text-xs font-bold tracking-wider transition-colors"
            >
              ABONE OL
            </button>
          </form>
          {subscribed && (
            <p className="text-xs text-brand-green font-medium mt-2 animate-in fade-in">
              Teşekkürler! Bültenimize başarıyla abone oldunuz.
            </p>
          )}
        </div>
      </div>

      {/* Ana Footer Kolonları */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* 1. Kolon: Logo ve Hakkında */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo/logo.png"
                alt="Isı Enerji"
                width={190}
                height={45}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-xs text-gray-600 leading-relaxed">
              Tüm hakları saklıdır. Isı Enerji, teknolojik ekipmanları satışı konusunda uzman çözüm ortağınız.
            </p>
            {/* Sosyal Medya İkonları */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://www.instagram.com/isienerji/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-pink-600 hover:text-white flex items-center justify-center text-gray-700 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/@isienerji"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-red-600 hover:text-white flex items-center justify-center text-gray-700 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-blue-600 hover:text-white flex items-center justify-center text-gray-700 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>

            {/* Avantaj Rozetleri */}
            <div className="pt-2 flex flex-wrap gap-2 text-[10px] text-gray-500 font-medium">
              <span className="bg-gray-100 px-2 py-1 rounded flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-brand-green" /> Orijinal Ürün
              </span>
              <span className="bg-gray-100 px-2 py-1 rounded flex items-center gap-1">
                <CreditCard className="w-3 h-3 text-brand-navy" /> 6 Taksit
              </span>
              <span className="bg-gray-100 px-2 py-1 rounded flex items-center gap-1">
                <RotateCcw className="w-3 h-3 text-brand-yellow" /> Kolay İade
              </span>
            </div>
          </div>

          {/* 2. Kolon: Alışveriş */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">
              ALIŞVERİŞ
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-600">
              <li>
                <Link href="/sayfa/mesafeli-satis-sozlesmesi" className="hover:text-brand-green transition-colors">
                  Mesafeli Satış Sözleşmesi
                </Link>
              </li>
              <li>
                <Link href="/sayfa/iptal-ve-iade-sartlari" className="hover:text-brand-green transition-colors">
                  İptal ve İade Koşulları
                </Link>
              </li>
              <li>
                <Link href="/sayfa/gizlilik-politikasi" className="hover:text-brand-green transition-colors">
                  Gizlilik Politikası
                </Link>
              </li>
              <li>
                <Link href="/sayfa/kisisel-verilerin-korunmasi-kanunu" className="hover:text-brand-green transition-colors">
                  Kişisel Verileri Koruma
                </Link>
              </li>
              <li>
                <Link href="/sayfa/teslimat-politikasi" className="hover:text-brand-green transition-colors">
                  Teslimat Politikası
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Kolon: Kurumsal */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">
              KURUMSAL
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-600">
              <li>
                <Link href="/sayfa/hakkimizda" className="hover:text-brand-green transition-colors">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/sss" className="hover:text-brand-green transition-colors">
                  Yardım / SSS
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-brand-green transition-colors">
                  Blog Yazıları
                </Link>
              </li>
              <li>
                <Link href="/foto-galeri" className="hover:text-brand-green transition-colors">
                  Foto Galeri
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="hover:text-brand-green transition-colors">
                  Bize Ulaşın
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. Kolon: Üyelik & İşlemler */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">
              ÜYELİK
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-600">
              <li>
                <Link href="/uyelik" className="hover:text-brand-green transition-colors">
                  Yeni Üyelik Formu
                </Link>
              </li>
              <li>
                <Link href="/uye-girisi" className="hover:text-brand-green transition-colors">
                  Üye Girişi
                </Link>
              </li>
              <li>
                <Link href="/siparis-takip" className="hover:text-brand-green transition-colors">
                  Sipariş Takip
                </Link>
              </li>
              <li>
                <Link href="/hesap-numaralarimiz" className="hover:text-brand-green transition-colors">
                  Hesap Numaralarımız
                </Link>
              </li>
              <li>
                <Link href="/odeme-bildirimi" className="hover:text-brand-green transition-colors">
                  Ödeme Bildirimi Yapın
                </Link>
              </li>
              <li>
                <Link href="/karsilastirmalar" className="hover:text-brand-green transition-colors">
                  Karşılaştırma Sayfası
                </Link>
              </li>
            </ul>
          </div>

          {/* 5. Kolon: Bize Ulaşın */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">
              BİZE ULAŞIN
            </h4>
            <ul className="space-y-3 text-xs text-gray-600">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-green flex-shrink-0" />
                <a href="tel:05362769169" className="hover:text-black font-medium">
                  0536 276 91 69
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-navy flex-shrink-0" />
                <a href="tel:02125469169" className="hover:text-black">
                  0212 546 91 69
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-yellow flex-shrink-0" />
                <a href="mailto:isienerjisi@gmail.com" className="hover:text-black">
                  isienerjisi@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2 pt-1 text-[11px] text-gray-500">
                <MapPin className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <span>İstanbul, Türkiye</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Ödeme Kartları ve Telif Barı */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2026 Isı Enerji ® Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-3 opacity-75 grayscale hover:grayscale-0 transition-all">
            <span className="font-semibold text-gray-700 tracking-wider text-[11px]">
              Advantage • Maximum • CardFinans • Worldcard • Bonus • Axess
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
