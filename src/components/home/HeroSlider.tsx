'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/utils';

const slides = [
  {
    id: 1,
    tag: '%10 İNDİRİM',
    title: 'Belirli markalarda kaçmaz indirimler',
    desc: 'Bugün sipariş verin, indirimli fiyatlarla konforu evinize taşıyın.',
    link: '/yerden-isitma',
    buttonText: 'Alışverişe Başla',
    bgGradient: 'from-blue-50 via-sky-50 to-emerald-50',
    image: 'https://www.isienerji.com.tr/images/slider/slider_rehau-yerden-isitma-malzemeleri-slider25101804295251.jpg',
  },
  {
    id: 2,
    tag: 'ORİJİNAL ALMAN KALİTESİ',
    title: 'Rehau & Fraenkische Yerden Isıtma Sistemleri',
    desc: 'Oksijen bariyerli PE-Xa borular ve debi göstergeli paslanmaz çelik kollektörler stokta.',
    link: '/rehau-yerden-isitma',
    buttonText: 'Ürünleri Gör',
    bgGradient: 'from-amber-50 via-orange-50 to-red-50',
    image: 'https://www.isienerji.com.tr/images/slider/slider_grundfos-sirkulasyon-pompalari-slider7942116291551.jpg',
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];
  const whatsappUrl = getWhatsAppUrl('905362769169', 'Merhabalar, kampanyalı ürünler hakkında fiyat teklifi ve bilgi almak istiyorum.');

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-gray-50 to-slate-100 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 min-h-[420px] md:min-h-[480px] flex items-center justify-between gap-8">
        {/* Sol Yazı Alanı */}
        <div className="max-w-xl space-y-4 z-10 animate-in fade-in duration-500">
          <div className="inline-flex items-center gap-2 bg-brand-green/10 text-brand-green px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
            <span>{slide.tag}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight">
            {slide.title}
          </h1>

          <p className="text-sm md:text-base text-gray-600">
            {slide.desc}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-green hover:bg-brand-greenHover text-white px-6 py-3 rounded-full text-xs font-bold tracking-wider uppercase flex items-center gap-2 shadow-lg shadow-brand-green/20 transition-all active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Destek / {slide.buttonText}</span>
            </a>

            <Link
              href={slide.link}
              className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 px-6 py-3 rounded-full text-xs font-bold tracking-wider uppercase transition-all shadow-sm"
            >
              Tüm Ürünler
            </Link>
          </div>
        </div>

        {/* Sağ Görsel Alanı */}
        <div className="hidden md:flex flex-1 items-center justify-center relative max-h-[380px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slide.image}
            alt={slide.title}
            className="max-h-[340px] w-auto object-contain drop-shadow-2xl rounded-lg animate-in zoom-in-95 duration-500"
          />
        </div>
      </div>

      {/* Oklar */}
      <button
        onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-md flex items-center justify-center transition-all z-20"
        aria-label="Önceki Slayt"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-md flex items-center justify-center transition-all z-20"
        aria-label="Sonraki Slayt"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Noktalar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              current === idx ? 'bg-brand-green w-6' : 'bg-gray-300'
            }`}
            aria-label={`Slayt ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
