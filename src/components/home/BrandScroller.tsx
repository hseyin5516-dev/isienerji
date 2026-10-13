import React from 'react';
import Link from 'next/link';

const brands = [
  { name: 'Rehau', slug: 'rehau' },
  { name: 'Fraenkische', slug: 'fraenkische' },
  { name: 'Grundfos', slug: 'grundfos' },
  { name: 'Danfoss', slug: 'danfoss' },
  { name: 'Buderus', slug: 'buderus' },
  { name: 'Wavin', slug: 'wavin' },
  { name: 'Viessmann', slug: 'viessmann' },
  { name: 'Wilo', slug: 'wilo' },
  { name: 'E.C.A.', slug: 'eca' },
  { name: 'Baymak', slug: 'baymak' },
  { name: 'Daikin', slug: 'daikin' },
  { name: 'DemirDöküm', slug: 'demirdokum' },
  { name: 'Kas', slug: 'kas' },
  { name: 'Vesbo', slug: 'vesbo' },
];

export default function BrandScroller() {
  return (
    <div className="bg-white py-8 border-y border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-3 text-center">
        <span className="text-[11px] font-bold tracking-widest uppercase text-gray-400">
          GÜVENİLİR DÜNYA VE YERLİ MARKALAR
        </span>
      </div>

      <div className="flex items-center space-x-6 animate-marquee whitespace-nowrap">
        {[...brands, ...brands].map((brand, idx) => (
          <Link
            key={idx}
            href={`/marka/${brand.slug}`}
            className="inline-flex items-center justify-center min-w-[130px] h-14 bg-white border border-[#e6f3ff] hover:border-brand-green/40 rounded-lg px-4 shadow-sm hover:shadow-md transition-all group"
          >
            <span className="text-sm font-bold tracking-wider text-gray-700 group-hover:text-brand-green uppercase font-display">
              {brand.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
