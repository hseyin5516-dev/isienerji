import React from 'react';
import StoryCircles from '@/components/home/StoryCircles';
import HeroSlider from '@/components/home/HeroSlider';
import TrustBoxes from '@/components/layout/TrustBoxes';
import ProductTabs from '@/components/home/ProductTabs';
import BrandScroller from '@/components/home/BrandScroller';
import CategoryVitrine from '@/components/home/CategoryVitrine';
import Testimonials from '@/components/home/Testimonials';
import CounterStats from '@/components/home/CounterStats';
import SeoText from '@/components/home/SeoText';
import productsData from '@/data/products.json';
import { Product } from '@/lib/types';

export default function HomePage() {
  const products = productsData as unknown as Product[];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Kategori Hikaye Daireleri */}
      <StoryCircles />

      {/* 2. Ana Kampanya ve Hero Slider */}
      <HeroSlider />

      {/* 3. Güvenlik ve Garanti Rozetleri */}
      <TrustBoxes />

      {/* 4. Kayan Duyuru Bandı */}
      <div className="bg-[#f8f9fa] border-y border-gray-200/80 py-2.5 overflow-hidden">
        <div className="flex space-x-12 animate-marquee whitespace-nowrap text-xs font-bold text-gray-700 tracking-wider">
          {[...Array(8)].map((_, i) => (
            <span key={i} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-green" />
              Tüm Siparişlerde Ücretsiz Kargo ! Tüm Fiyatlarımıza KDV Dahildir.
            </span>
          ))}
        </div>
      </div>

      {/* 5. Sekmeli Ürün Vitrini */}
      <ProductTabs products={products} />

      {/* 6. Dünya Markaları Kayan Şerit */}
      <BrandScroller />

      {/* 7. Kategori Bannerları ve Teklif Bandı */}
      <CategoryVitrine />

      {/* 8. Müşteri Yorumları */}
      <Testimonials />

      {/* 9. Kurumsal Rakamlar ve Sayaçlar */}
      <CounterStats />

      {/* 10. Zengin SEO Açıklama Bloğu */}
      <SeoText />
    </div>
  );
}
