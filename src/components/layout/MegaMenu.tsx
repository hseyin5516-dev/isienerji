'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, LayoutGrid } from 'lucide-react';

interface MenuItem {
  title: string;
  href: string;
  badge?: string;
  hasDropdown?: boolean;
  columns?: {
    heading: string;
    items: { name: string; href: string }[];
  }[];
}

const menuItems: MenuItem[] = [
  {
    title: 'Yerden Isıtma',
    href: '/yerden-isitma',
    hasDropdown: true,
    columns: [
      {
        heading: 'Avrupa Markaları',
        items: [
          { name: 'Rehau Yerden Isıtma', href: '/rehau-yerden-isitma' },
          { name: 'Fraenkische Yerden Isıtma', href: '/fraenkische-yerden-isitma' },
          { name: 'Danfoss Yerden Isıtma', href: '/marka/danfoss' },
          { name: 'Wavin Yerden Isıtma', href: '/marka/wavin' },
          { name: 'Caleffi Yerden Isıtma', href: '/marka/caleffi' },
          { name: 'Giacomini Yerden Isıtma', href: '/marka/giacomini' },
        ],
      },
      {
        heading: 'Yerli Markalar',
        items: [
          { name: 'Vesbo Yerden Isıtma', href: '/vesbo-yerden-isitma' },
          { name: 'Çetin Yerden Isıtma', href: '/marka/cetin-muhendislik' },
          { name: 'Kas Yerden Isıtma', href: '/marka/kas' },
          { name: 'Kalde Yerden Isıtma', href: '/kalde-yerden-isitma' },
          { name: 'Fırat Yerden Isıtma', href: '/marka/firat' },
        ],
      },
      {
        heading: 'Ürün Grupları',
        items: [
          { name: 'Yerden Isıtma Borusu', href: '/yerden-isitma-borulari' },
          { name: 'Yerden Isıtma Straforu', href: '/yerden-isitma-straforlari' },
          { name: 'Yerden Isıtma Kollektörü', href: '/yerden-isitma-kollektorleri' },
          { name: 'Kenar İzolasyon Bandı', href: '/kenar-izolasyon-bantlari' },
          { name: 'Boru Bağlantı Rakoru', href: '/boru-baglanti-rakorlari' },
          { name: 'Kollektör Vanası', href: '/kollektor-vanalari' },
          { name: 'Oda Termostatı', href: '/oda-termostatlari' },
          { name: 'Kontrol Paneli', href: '/yerden-isitma-kontrol-panelleri' },
        ],
      },
      {
        heading: 'Yardımcı Malzemeler',
        items: [
          { name: 'Aktüatör Vana Motoru', href: '/yerden-isitma-termostatik-vanalar' },
          { name: 'İki Yollu Vana', href: '/2-yollu-vanalar' },
          { name: 'Kollektör Dolabı', href: '/kollektor-dolaplari' },
          { name: 'Kavis Dirsek Poliamid', href: '/kavis-dirsek' },
          { name: 'Sabitleyici Çengel', href: '/sabitleyici-cengel-boru-tutucu' },
          { name: 'Şap Katkı Maddesi', href: '/sap-katki-maddeleri' },
        ],
      },
    ],
  },
  {
    title: 'Sirkülasyon Pompaları',
    href: '/pompalar',
    hasDropdown: true,
    columns: [
      {
        heading: 'Pompa Tipleri',
        items: [
          { name: 'Klasik Sirkülasyon Pompaları', href: '/pompalar' },
          { name: 'Frekans Kontrollü Pompalar', href: '/pompalar' },
          { name: 'Islak Rotorlu Pompalar', href: '/pompalar' },
          { name: 'Güneş Enerjisi Pompaları', href: '/pompalar' },
        ],
      },
      {
        heading: 'Popüler Markalar',
        items: [
          { name: 'Grundfos Sirkülasyon Pompaları', href: '/marka/grundfos' },
          { name: 'Wilo Sirkülasyon Pompaları', href: '/marka/wilo' },
          { name: 'DAB Sirkülasyon Pompaları', href: '/marka/dab' },
          { name: 'Etna Sirkülasyon Pompaları', href: '/marka/etna' },
          { name: 'Sumak Sirkülasyon Pompaları', href: '/marka/sumak' },
          { name: 'Lowara Sirkülasyon Pompaları', href: '/marka/lowara' },
        ],
      },
    ],
  },
  {
    title: 'Hidraforlar',
    href: '/hidraforlar',
    hasDropdown: true,
    columns: [
      {
        heading: 'Hidrafor Çeşitleri',
        items: [
          { name: 'Ev Tipi Hidraforlar', href: '/hidraforlar' },
          { name: 'Tanklı Hidraforlar', href: '/hidraforlar' },
          { name: 'Yatay / Dikey Milli Hidraforlar', href: '/hidraforlar' },
          { name: 'Genleşme Tankları', href: '/hidraforlar' },
        ],
      },
      {
        heading: 'Markalar',
        items: [
          { name: 'Grundfos Hidrafor', href: '/marka/grundfos' },
          { name: 'Wilo Hidrafor', href: '/marka/wilo' },
          { name: 'Baymak Hidrafor', href: '/marka/baymak' },
        ],
      },
    ],
  },
  {
    title: 'Isı Pompaları',
    href: '/isi-pompalari',
    hasDropdown: true,
    columns: [
      {
        heading: 'Sistem Tipleri',
        items: [
          { name: 'Hava Kaynaklı Isı Pompası', href: '/isi-pompalari' },
          { name: 'Hibrit Isı Pompası', href: '/isi-pompalari' },
          { name: 'Su Kaynaklı Isı Pompası', href: '/isi-pompalari' },
        ],
      },
      {
        heading: 'Markalar',
        items: [
          { name: 'Daikin Isı Pompası', href: '/marka/daikin' },
          { name: 'LG Isı Pompası', href: '/marka/lg' },
          { name: 'Baymak Isı Pompası', href: '/marka/baymak' },
        ],
      },
    ],
  },
  {
    title: 'Boylerler',
    href: '/boylerler',
  },
  {
    title: 'Dalgıç Pompalar',
    href: '/dalgic-pompalar',
  },
  {
    title: 'Tesisat & El Aletleri',
    href: '/el-aletleri',
  },
];

export default function MegaMenu() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <nav className="bg-white border-b border-gray-200 hidden lg:block relative z-30">
      <div className="max-w-7xl mx-auto px-4 flex items-center">
        {/* Tüm Kategoriler Butonu */}
        <div className="relative group">
          <button className="bg-brand-navy hover:bg-brand-navyHover text-white px-5 py-3 text-xs font-bold tracking-wider uppercase flex items-center gap-2 transition-colors">
            <LayoutGrid className="w-4 h-4 text-brand-yellow" />
            <span>TÜM KATEGORİLER</span>
          </button>
        </div>

        {/* Ana Menü Başlıkları */}
        <div className="flex items-center space-x-1 pl-4 text-xs font-medium text-gray-800">
          {menuItems.map((item) => (
            <div
              key={item.title}
              className="relative"
              onMouseEnter={() => setActiveDropdown(item.title)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={item.href}
                className={`flex items-center gap-1 px-3 py-3 hover:text-brand-green transition-colors ${
                  activeDropdown === item.title ? 'text-brand-green font-semibold' : ''
                }`}
              >
                <span>{item.title}</span>
                {item.hasDropdown && (
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-brand-green" />
                )}
              </Link>

              {/* Mega Açılır Menü */}
              {item.hasDropdown && activeDropdown === item.title && item.columns && (
                <div
                  className="absolute left-0 top-full w-[760px] bg-white border border-gray-200 shadow-xl rounded-b-md p-6 grid grid-cols-4 gap-6 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                  onMouseEnter={() => setActiveDropdown(item.title)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {item.columns.map((col, idx) => (
                    <div key={idx} className="space-y-3">
                      <h4 className="text-xs font-bold text-brand-navy uppercase tracking-wider border-b border-gray-100 pb-1.5">
                        {col.heading}
                      </h4>
                      <ul className="space-y-2">
                        {col.items.map((subItem) => (
                          <li key={subItem.name}>
                            <Link
                              href={subItem.href}
                              className="text-gray-600 hover:text-brand-green hover:translate-x-1 transition-all inline-block text-xs"
                            >
                              {subItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
