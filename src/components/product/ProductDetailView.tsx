'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Truck, ShieldCheck, Heart, Share2, Plus, Minus, ShoppingBag, MessageCircle, CreditCard, ChevronRight } from 'lucide-react';
import { Product } from '@/lib/types';
import { formatPrice, getWhatsAppUrl } from '@/lib/utils';
import { useCart } from '@/components/cart/CartContext';
import ProductCard from '@/components/product/ProductCard';

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailView({ product, relatedProducts }: ProductDetailViewProps) {
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(product.images[0] || '/images/logo/logo.png');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'installments'>('desc');

  const whatsappMessage = `Merhabalar, www.isienerji.com.tr üzerinden ulaşıyorum.\nÜrün: ${product.name} (${product.sku})\nFiyat: ${formatPrice(product.price)}\nAdet: ${quantity}\nSipariş vermek ve detaylı bilgi almak istiyorum.`;
  const whatsappUrl = getWhatsAppUrl('905362769169', whatsappMessage);

  return (
    <div className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs text-gray-500 mb-6 space-x-1.5 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-brand-green">Anasayfa</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link href={`/${product.categorySlug || 'yerden-isitma'}`} className="hover:text-brand-green">
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-900 font-medium truncate max-w-md">{product.name}</span>
        </nav>

        {/* Üst Alan: Sol Galeri & Sağ Bilgi */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-gray-100">
          {/* Sol Galeri (5 Kolon) */}
          <div className="lg:col-span-5 flex flex-col-reverse md:flex-row gap-4">
            {/* Küçük Resimler (Thumbnails) */}
            {product.images.length > 1 && (
              <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto max-h-[460px] scrollbar-none">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-16 h-16 rounded border p-1 flex-shrink-0 bg-white transition-all ${
                      selectedImage === img
                        ? 'border-brand-green ring-1 ring-brand-green'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} - ${idx + 1}`}
                      fill
                      className="object-contain"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Büyük Resim */}
            <div className="relative flex-1 min-h-[350px] md:min-h-[460px] border border-gray-100 rounded-xl p-4 bg-[#fafafa] flex items-center justify-center">
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-contain p-4 transition-all duration-300"
              />
            </div>
          </div>

          {/* Sağ Ürün Bilgileri (7 Kolon) */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight">
                {product.name}
              </h1>

              {/* Yıldız ve Kargo Bilgisi */}
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1">
                  {[...Array(product.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#ffbf00] text-[#ffbf00]" />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">({product.reviewCount || 12} Değerlendirme)</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 px-2.5 py-1 rounded">
                  <Truck className="w-3.5 h-3.5 text-brand-green" />
                  <span>17:00&apos;ye Kadar Aynı Gün Kargo</span>
                </div>
              </div>
            </div>

            {/* Özellik Tablosu */}
            <div className="bg-gray-50/70 rounded-lg p-4 border border-gray-100 divide-y divide-gray-200/60 text-xs">
              <div className="grid grid-cols-2 py-1.5">
                <span className="text-gray-500">Marka:</span>
                <span className="font-bold text-gray-900">{product.brand}</span>
              </div>
              <div className="grid grid-cols-2 py-1.5">
                <span className="text-gray-500">Stok Kodu:</span>
                <span className="font-mono text-gray-800">{product.sku}</span>
              </div>
              <div className="grid grid-cols-2 py-1.5">
                <span className="text-gray-500">Stok Durumu:</span>
                <span className="font-bold text-brand-green">Mevcut</span>
              </div>
              <div className="grid grid-cols-2 py-1.5">
                <span className="text-gray-500">Kargo Ücreti:</span>
                <span className="font-semibold text-gray-800">
                  {product.freeShipping ? 'Ücretsiz Kargo' : 'Standart Kargo'}
                </span>
              </div>
            </div>

            {/* Değişim Bilgi Notu */}
            <div className="bg-blue-50/60 border border-blue-100 rounded-lg p-3 text-xs text-blue-900 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-navy flex-shrink-0 mt-0.5" />
              <p>
                <strong>Değişim süremiz 14 gündür.</strong> Etiketi koparılmamış, kullanılmamış ürünlerin değişimi ve iadesi koşulsuz yapılmaktadır.
              </p>
            </div>

            {/* Fiyat Alanı */}
            <div className="pt-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-gray-900 tracking-tight font-ui">
                  {formatPrice(product.price)}
                </span>
                {product.oldPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
                <span className="text-xs text-gray-500">KDV Dahildir</span>
              </div>
            </div>

            {/* Adet Seçici ve Sepete Ekle / WhatsApp Butonları */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 text-sm font-bold text-gray-900 min-w-[36px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Sepete Ekle Butonu */}
                <button
                  onClick={() => addToCart(product, quantity)}
                  className="flex-1 bg-brand-blue hover:bg-blue-800 active:scale-[0.99] text-white py-3.5 px-6 rounded-lg text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>SEPETE EKLE</span>
                </button>
              </div>

              {/* WhatsApp'tan Sipariş Ver Butonu */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-brand-whatsapp hover:bg-emerald-600 active:scale-[0.99] text-white py-3.5 px-6 rounded-lg text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WHATSAPP&apos;TAN SİPARİŞ VER</span>
              </a>
            </div>
          </div>
        </div>

        {/* Alt Alan: Sekmeler (Açıklama / Taksit) */}
        <div className="mt-12">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('desc')}
              className={`py-3 px-6 text-sm font-bold border-b-2 transition-all ${
                activeTab === 'desc'
                  ? 'border-brand-navy text-brand-navy'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              Ürün Açıklaması
            </button>
            <button
              onClick={() => setActiveTab('installments')}
              className={`py-3 px-6 text-sm font-bold border-b-2 transition-all ${
                activeTab === 'installments'
                  ? 'border-brand-navy text-brand-navy'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              Taksit Seçenekleri
            </button>
          </div>

          <div className="py-6">
            {activeTab === 'desc' ? (
              <div
                className="prose max-w-none text-xs md:text-sm text-gray-700 leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{
                  __html: (product.description || '').replace(/<script[\s\S]*?<\/script>/gi, '')
                }}
              />
            ) : (
              <div className="overflow-x-auto max-w-2xl">
                <table className="w-full text-xs text-left border border-gray-200 rounded-lg overflow-hidden">
                  <thead className="bg-gray-50 font-bold text-gray-700">
                    <tr>
                      <th className="p-3 border-b">Taksit</th>
                      <th className="p-3 border-b">Aylık Tutar</th>
                      <th className="p-3 border-b">Toplam Tutar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="p-3">Tek Çekim</td>
                      <td className="p-3 font-semibold">{formatPrice(product.price)}</td>
                      <td className="p-3 font-bold">{formatPrice(product.price)}</td>
                    </tr>
                    <tr>
                      <td className="p-3">3 Taksit</td>
                      <td className="p-3">{formatPrice(product.price / 3)}</td>
                      <td className="p-3">{formatPrice(product.price)}</td>
                    </tr>
                    <tr>
                      <td className="p-3">6 Taksit</td>
                      <td className="p-3">{formatPrice(product.price / 6)}</td>
                      <td className="p-3">{formatPrice(product.price)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* İlginizi Çekebilecek Diğer Ürünler */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 font-display">
              İLGİNİZİ ÇEKEBİLECEK DİĞER ÜRÜNLER
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.slice(0, 4).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
