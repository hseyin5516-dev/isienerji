'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ChevronRight, Filter, MessageCircle } from 'lucide-react';
import { Product } from '@/lib/types';
import ProductCard from '@/components/product/ProductCard';
import { getWhatsAppUrl } from '@/lib/utils';

interface CategoryListingViewProps {
  title: string;
  description?: string;
  seoHtml?: string;
  products: Product[];
  currentSlug: string;
}

export default function CategoryListingView({
  title,
  description,
  seoHtml,
  products,
  currentSlug,
}: CategoryListingViewProps) {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [onlyFreeShipping, setOnlyFreeShipping] = useState(false);
  const [onlyFastShipping, setOnlyFastShipping] = useState(false);
  const [sortBy, setSortBy] = useState('popular');

  // Mevcut markaları topla
  const availableBrands = useMemo(() => {
    const map = new Map<string, number>();
    products.forEach((p) => {
      const b = p.brand || 'Diğer';
      map.set(b, (map.get(b) || 0) + 1);
    });
    return Array.from(map.entries()).map(([brand, count]) => ({ brand, count }));
  }, [products]);

  // Filtreleme ve Sıralama
  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (selectedBrands.length > 0) {
      list = list.filter((p) => selectedBrands.includes(p.brand));
    }

    if (onlyFreeShipping) {
      list = list.filter((p) => p.freeShipping);
    }

    if (onlyFastShipping) {
      list = list.filter((p) => p.fastShipping);
    }

    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name-asc') {
      list.sort((a, b) => a.name.localeCompare(b.name, 'tr'));
    }

    return list;
  }, [products, selectedBrands, onlyFreeShipping, onlyFastShipping, sortBy]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const whatsappUrl = getWhatsAppUrl(
    '905362769169',
    `Merhabalar, www.isienerji.com.tr ${title} kategorisindeki ürünler hakkında bilgi ve toplu fiyat teklifi almak istiyorum.`
  );

  return (
    <div className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs text-gray-500 space-x-1.5">
          <Link href="/" className="hover:text-brand-green">Anasayfa</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-900 font-medium">{title}</span>
        </nav>

        {/* Başlık ve Kısa Açıklama */}
        <div className="border-b border-gray-100 pb-6">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 font-display">
            {title}
          </h1>
          <p className="text-xs md:text-sm text-gray-500 mt-2 max-w-4xl leading-relaxed">
            {description ||
              `Ev ve iş yerlerinizde konforlu ve verimli ısıtma için kaliteli ${title.toLowerCase()} ürünleri burada! Dayanıklı malzeme yapısı ve uzman mühendislik desteğiyle hemen özel teklif alın.`}
          </p>
        </div>

        {/* Ana Gövde: Sol Filtre & Sağ Liste */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sol Kenar Çubuğu (Filtreler) */}
          <aside className="lg:col-span-1 space-y-6">
            {/* Hızlı Filtreler */}
            <div className="bg-gray-50/70 border border-gray-200/80 rounded-xl p-4 space-y-3">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-brand-green" />
                <span>Sadece</span>
              </h3>
              <div className="space-y-2 text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-black">
                  <input
                    type="checkbox"
                    checked={onlyFreeShipping}
                    onChange={(e) => setOnlyFreeShipping(e.target.checked)}
                    className="rounded text-brand-green focus:ring-brand-green"
                  />
                  <span>Ücretsiz Kargo</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-black">
                  <input
                    type="checkbox"
                    checked={onlyFastShipping}
                    onChange={(e) => setOnlyFastShipping(e.target.checked)}
                    className="rounded text-brand-green focus:ring-brand-green"
                  />
                  <span>Hızlı Gönderi</span>
                </label>
              </div>
            </div>

            {/* Marka Filtresi */}
            {availableBrands.length > 0 && (
              <div className="bg-gray-50/70 border border-gray-200/80 rounded-xl p-4 space-y-3">
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                  Markalar
                </h3>
                <div className="space-y-2 text-xs max-h-60 overflow-y-auto scrollbar-thin">
                  {availableBrands.map(({ brand, count }) => (
                    <label
                      key={brand}
                      className="flex items-center justify-between cursor-pointer text-gray-700 hover:text-black"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand)}
                          onChange={() => toggleBrand(brand)}
                          className="rounded text-brand-green focus:ring-brand-green"
                        />
                        <span>{brand}</span>
                      </div>
                      <span className="text-[10px] text-gray-400">({count})</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Yan Menü WhatsApp Destek Kutusu */}
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-center space-y-2">
              <MessageCircle className="w-8 h-8 text-brand-whatsapp mx-auto" />
              <h4 className="text-xs font-bold text-emerald-950">
                Teknik Destek & Proje Fiyatı
              </h4>
              <p className="text-[11px] text-emerald-800">
                Projeniz için kaç metre boru veya kaç ağızlı kollektör gerektiğini uzmanımıza danışın.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full bg-brand-whatsapp hover:bg-emerald-600 text-white text-[11px] font-bold py-2 rounded-lg transition-colors"
              >
                Uzmana Danışın
              </a>
            </div>
          </aside>

          {/* Sağ Alan: Sıralama ve Ürün Kartları */}
          <main className="lg:col-span-3 space-y-6">
            {/* Üst Sıralama Çubuğu */}
            <div className="flex items-center justify-between bg-gray-50/50 p-3 rounded-lg border border-gray-100 text-xs">
              <span className="text-gray-500 font-medium">
                Toplam <strong className="text-gray-900">{filteredProducts.length}</strong> ürün listeleniyor
              </span>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">Sırala:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-800 focus:outline-none focus:border-brand-navy"
                >
                  <option value="popular">Önerilen Sıralama</option>
                  <option value="price-asc">Artan Fiyat</option>
                  <option value="price-desc">Azalan Fiyat</option>
                  <option value="name-asc">A - Z İsim</option>
                </select>
              </div>
            </div>

            {/* Ürün Listesi */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-gray-50 rounded-xl space-y-3">
                <p className="text-sm font-semibold text-gray-700">
                  Seçilen filtrelere uygun ürün bulunamadı.
                </p>
                <button
                  onClick={() => {
                    setSelectedBrands([]);
                    setOnlyFreeShipping(false);
                    setOnlyFastShipping(false);
                  }}
                  className="text-xs text-brand-green font-bold hover:underline"
                >
                  Filtreleri Temizle
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
                {filteredProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </main>
        </div>

        {/* Alt Kısım Zengin SEO Açıklama Alanı */}
        <div className="mt-12 pt-10 border-t border-gray-100 text-xs text-gray-600 space-y-4">
          <h2 className="text-base font-bold text-gray-900 font-display">
            {title} Hakkında Bilgi ve Fiyat Seçenekleri
          </h2>
          <p className="leading-relaxed">
            {title} kategorisinde yer alan tüm ürünlerimiz, Türkiye ve Avrupa standartlarına uygun yüksek kalite sertifikalı malzemelerden üretilmiştir. Isı Enerji güvencesiyle toptan ve perakende satış avantajlarından yararlanabilir, projeleriniz için özel iskonto teklifi alabilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );
}
