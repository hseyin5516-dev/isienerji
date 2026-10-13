'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, MessageCircle, ShieldCheck } from 'lucide-react';
import { useCart } from '@/components/cart/CartContext';
import { formatPrice, getWhatsAppUrl } from '@/lib/utils';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, cartTotal, cartCount, clearCart } = useCart();

  const orderMessage = `Merhabalar, www.isienerji.com.tr sepetimdeki ürünleri sipariş vermek istiyorum:\n\n` +
    items.map((i, idx) => `${idx + 1}. ${i.product.name} (${i.quantity} adet) - ${formatPrice(i.product.price * i.quantity)}`).join('\n') +
    `\n\nToplam: ${formatPrice(cartTotal)}\nLütfen sipariş için yardımcı olabilir misiniz?`;

  const whatsappUrl = getWhatsAppUrl('905362769169', orderMessage);

  return (
    <div className="bg-white py-10 min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-8 font-display">
          Alışveriş Sepetiniz ({cartCount} Ürün)
        </h1>

        {items.length === 0 ? (
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-12 text-center max-w-lg mx-auto space-y-4">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-400">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Sepetinizde Ürün Bulunmuyor</h2>
            <p className="text-xs text-gray-500">
              Isı Enerji kaliteli ürünlerini sepetinize ekleyerek avantajlı fiyatlarla sipariş verebilirsiniz.
            </p>
            <Link
              href="/"
              className="inline-block bg-brand-green hover:bg-brand-greenHover text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
            >
              Alışverişe Başla
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Ürün Listesi Tablosu (8 Kolon) */}
            <div className="lg:col-span-8 bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
              <div className="p-4 bg-gray-50/70 border-b border-gray-100 flex justify-between items-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                <span>Ürünler</span>
                <button
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-700 transition-colors font-medium text-[11px]"
                >
                  Sepeti Boşalt
                </button>
              </div>

              <div className="divide-y divide-gray-100 p-4">
                {items.map((item) => (
                  <div key={item.product.id} className="py-4 flex flex-col sm:flex-row items-center gap-4">
                    <div className="w-20 h-20 relative bg-gray-50 rounded border border-gray-100 flex-shrink-0 p-1">
                      <Image
                        src={item.product.images[0] || '/images/logo/logo.png'}
                        alt={item.product.name}
                        fill
                        className="object-contain"
                      />
                    </div>

                    <div className="flex-1 min-w-0 text-center sm:text-left">
                      <Link
                        href={`/${item.product.slug}`}
                        className="text-xs sm:text-sm font-semibold text-gray-900 hover:text-brand-green transition-colors line-clamp-2"
                      >
                        {item.product.name}
                      </Link>
                      <div className="text-[11px] text-gray-400 mt-0.5">
                        Stok Kodu: {item.product.sku}
                      </div>
                      <div className="text-xs font-bold text-brand-green mt-1">
                        {formatPrice(item.product.price)}
                      </div>
                    </div>

                    {/* Adet Kontrolü */}
                    <div className="flex items-center border border-gray-200 rounded">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1.5 text-gray-500 hover:bg-gray-100"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-bold text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1.5 text-gray-500 hover:bg-gray-100"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Toplam Tutar ve Sil Butonu */}
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-bold text-gray-900 font-ui min-w-[90px] text-right">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-gray-400 hover:text-red-500 p-1"
                        title="Ürünü Sil"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sipariş Özeti (4 Kolon) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-gray-50/70 border border-gray-200/80 rounded-xl p-6 space-y-4 shadow-sm">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-2">
                  Sipariş Özeti
                </h3>

                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Ara Toplam:</span>
                    <span className="font-semibold text-gray-900">{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Kargo:</span>
                    <span className="font-semibold text-brand-green">ÜCRETSİZ</span>
                  </div>
                  <div className="flex justify-between">
                    <span>KDV (%20):</span>
                    <span className="font-semibold text-gray-500">Dahildir</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-3 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-gray-900">Toplam Tutar:</span>
                  <span className="text-xl font-black text-brand-green font-ui">
                    {formatPrice(cartTotal)}
                  </span>
                </div>

                {/* WhatsApp ile Sipariş */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-brand-whatsapp hover:bg-emerald-600 text-white py-3 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp ile Sipariş Ver</span>
                </a>

                {/* Ödeme Sayfasına Geç */}
                <Link
                  href="/odeme"
                  className="w-full flex items-center justify-center gap-2 bg-brand-navy hover:bg-brand-navyHover text-white py-3 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  <span>Siparişi Tamamla</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="pt-2 text-[11px] text-gray-500 flex items-center gap-2 justify-center">
                  <ShieldCheck className="w-4 h-4 text-brand-green" />
                  <span>256-Bit SSL ile Güvenli Alışveriş</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
