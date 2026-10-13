'use client';

import React from 'react';
import Link from 'next/link';

interface Story {
  name: string;
  href: string;
  image: string;
}

const stories: Story[] = [
  {
    name: 'Yerden Isıtma Borusu',
    href: '/yerden-isitma-borulari',
    image: 'https://www.isienerji.com.tr/images/header/yerden-isitma-borusu23653593955502.jpg',
  },
  {
    name: 'Yerden Isıtma Straforu',
    href: '/yerden-isitma-straforlari',
    image: 'https://www.isienerji.com.tr/images/header/yerden-isitma-straforu21250856207648.jpg',
  },
  {
    name: 'Yerden Isıtma Kollektörü',
    href: '/yerden-isitma-kollektorleri',
    image: 'https://www.isienerji.com.tr/images/header/yerden-isitma-kollektoru78639508219725.jpg',
  },
  {
    name: 'Kenar İzolasyon Bandı',
    href: '/kenar-izolasyon-bantlari',
    image: 'https://www.isienerji.com.tr/images/header/kenar-izolasyon-bandi-yerden-isitma58713250250915.jpg',
  },
  {
    name: 'Boru Bağlantı Rakoru',
    href: '/boru-baglanti-rakorlari',
    image: 'https://www.isienerji.com.tr/images/header/boru-baglanti-rakoru-yerden-isitma77869108140587.jpg',
  },
  {
    name: 'Kollektör Vanası',
    href: '/kollektor-vanalari',
    image: 'https://www.isienerji.com.tr/images/header/kollektor-vanasi-kesme-yerden-isitma68916054039194.jpg',
  },
  {
    name: 'Oda Termostatı',
    href: '/oda-termostatlari',
    image: 'https://www.isienerji.com.tr/images/header/oda-termostati-yerden-isitma86686315586837.jpg',
  },
  {
    name: 'Kontrol Paneli',
    href: '/yerden-isitma-kontrol-panelleri',
    image: 'https://www.isienerji.com.tr/images/header/kontrol-paneli-yerden-isitma66268372894437.jpg',
  },
  {
    name: 'Aktüatör Vana Motoru',
    href: '/yerden-isitma-termostatik-vanalar',
    image: 'https://www.isienerji.com.tr/images/header/aktuator-vana-motoru-yerden-isitma17720079921749.jpg',
  },
  {
    name: 'Kollektör Dolabı',
    href: '/kollektor-dolaplari',
    image: 'https://www.isienerji.com.tr/images/header/kollektor-dolabi-yerden-isitma15831497298466.jpg',
  },
  {
    name: 'Şap Katkı Maddesi',
    href: '/sap-katki-maddeleri',
    image: 'https://www.isienerji.com.tr/images/header/sap-katki-maddesi-yerden-isitma36758611591550.jpg',
  },
];

export default function StoryCircles() {
  return (
    <div className="bg-white border-b border-gray-100 py-4 overflow-x-auto scrollbar-none">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-4 sm:gap-6 min-w-max justify-start md:justify-center">
        {stories.map((story, idx) => (
          <Link
            key={idx}
            href={story.href}
            className="flex flex-col items-center group w-18 sm:w-20 text-center"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full p-0.5 border-2 border-brand-green/30 group-hover:border-brand-green group-hover:scale-105 transition-all shadow-sm overflow-hidden bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={story.image}
                alt={story.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <span className="text-[10px] sm:text-[11px] font-medium text-gray-700 group-hover:text-brand-green transition-colors mt-1.5 line-clamp-1 max-w-[70px]">
              {story.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
