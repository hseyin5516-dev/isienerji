'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/lib/types';
import ProductCard from '@/components/product/ProductCard';

interface ProductTabsProps {
  products: Product[];
}

const tabs = [
  { id: 'all', label: 'Tüm Ürünler' },
  { id: 'new', label: 'Yeni Ürünler' },
  { id: 'popular', label: 'Çok İncelenenler' },
  { id: 'discount', label: 'İndirimdekiler' },
  { id: 'deals', label: 'Fırsat Ürünleri' },
  { id: 'shipping', label: 'Anında Kargo' },
];

export default function ProductTabs({ products }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState('all');

  const filteredProducts = products.filter((p, idx) => {
    if (activeTab === 'new') return idx % 3 === 0;
    if (activeTab === 'popular') return idx % 2 === 0;
    if (activeTab === 'discount') return !!p.oldPrice || p.badge === 'İndirim';
    if (activeTab === 'deals') return p.badge === 'Fırsat';
    if (activeTab === 'shipping') return p.fastShipping;
    return true;
  }).slice(0, 12);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Başlık */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
            Size Özel Ürünler
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Bu Ürünleri Keşfedin
          </p>
        </div>

        {/* Sekmeler */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto gap-2 pb-4 scrollbar-none mb-6">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#ffbf00] text-gray-900 shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Ürün Izgarası (4 Sütun) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Tümünü Gör */}
        <div className="text-center mt-10">
          <Link
            href="/yerden-isitma"
            className="inline-flex items-center justify-center bg-brand-navy hover:bg-brand-navyHover text-white px-8 py-3 rounded-full text-xs font-bold tracking-wider uppercase transition-all shadow-md hover:shadow-lg"
          >
            TÜM ÜRÜNLERİ LİSTELE
          </Link>
        </div>
      </div>
    </section>
  );
}
