'use client';

import React, { useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, ChevronRight } from 'lucide-react';
import productsData from '@/data/products.json';
import { Product } from '@/lib/types';
import ProductCard from '@/components/product/ProductCard';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const products = productsData as unknown as Product[];

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const clean = query.toLowerCase().trim();
    return products.filter((p) => {
      return (
        p.name.toLowerCase().includes(clean) ||
        p.brand.toLowerCase().includes(clean) ||
        p.sku.toLowerCase().includes(clean) ||
        p.category.toLowerCase().includes(clean)
      );
    });
  }, [query, products]);

  return (
    <div className="bg-white py-10 min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        <nav className="flex items-center text-xs text-gray-500 space-x-1.5">
          <Link href="/" className="hover:text-brand-green">Anasayfa</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span>Arama Sonuçları</span>
        </nav>

        <div className="border-b border-gray-100 pb-4">
          <h1 className="text-2xl font-bold text-gray-900 font-display flex items-center gap-2">
            <Search className="w-6 h-6 text-brand-green" />
            <span>&ldquo;{query}&rdquo; için Arama Sonuçları</span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Toplam <strong>{results.length}</strong> ürün bulundu
          </p>
        </div>

        {results.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-xl space-y-3">
            <p className="text-sm font-semibold text-gray-700">
              Aramanızla eşleşen ürün bulunamadı.
            </p>
            <p className="text-xs text-gray-500">
              Farklı bir arama terimi deneyebilir veya kategorilerimizden ürünleri inceleyebilirsiniz.
            </p>
            <Link
              href="/yerden-isitma"
              className="inline-block bg-brand-navy text-white text-xs font-bold px-6 py-2.5 rounded-full uppercase"
            >
              Yerden Isıtma Ürünlerini Gör
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs">Arama yükleniyor...</div>}>
      <SearchContent />
    </Suspense>
  );
}
