'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, MessageCircle } from 'lucide-react';
import { useCart } from './CartContext';
import { formatPrice, getWhatsAppUrl } from '@/lib/utils';

export default function CartDrawer() {
  const {
    items,
    isDrawerOpen,
    setIsDrawerOpen,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartCount,
  } = useCart();

  if (!isDrawerOpen) return null;

  const freeShippingThreshold = 2000;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartTotal);
  const freeShippingPercent = Math.min(100, (cartTotal / freeShippingThreshold) * 100);

  // WhatsApp sipariş mesajı
  const orderMessage = `Merhabalar, www.isienerji.com.tr sepetimdeki ürünleri sipariş vermek istiyorum:\n\n` +
    items.map((i, idx) => `${idx + 1}. ${i.product.name} (${i.quantity} adet) - ${formatPrice(i.product.price * i.quantity)}`).join('\n') +
    `\n\nToplam Tutar: ${formatPrice(cartTotal)}\nLütfen sipariş ve teslimat için yardımcı olabilir misiniz?`;

  const whatsappUrl = getWhatsAppUrl('905362769169', orderMessage);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={() => setIsDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-brand-green" />
              <h3 className="font-bold text-gray-900 text-sm">
                Sepetiniz ({cartCount} Ürün)
              </h3>
            </div>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Kargo İlerleme Çubuğu */}
          <div className="bg-amber-50/60 p-3 border-b border-amber-100/50 text-xs">
            {remainingForFreeShipping > 0 ? (
              <p className="text-amber-900 font-medium">
                Ücretsiz Kargo için <span className="font-bold text-amber-700">{formatPrice(remainingForFreeShipping)}</span> daha ekleyin!
              </p>
            ) : (
              <p className="text-emerald-700 font-bold flex items-center gap-1">
                🎉 Tebrikler! Ücretsiz Kargo Kazandınız!
              </p>
            )}
            <div className="w-full bg-amber-200/50 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-brand-green h-full rounded-full transition-all duration-300"
                style={{ width: `${freeShippingPercent}%` }}
              />
            </div>
          </div>

          {/* Ürün Listesi */}
          <div className="flex-1 overflow-y-auto p-4 divide-y divide-gray-100">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">Sepetiniz Boş</h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Isı Enerji kaliteli ürünlerini sepetinize ekleyerek alışverişe başlayın.
                  </p>
                </div>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="bg-brand-green text-white text-xs font-semibold px-5 py-2.5 rounded-full hover:bg-brand-greenHover transition-colors"
                >
                  Ürünleri İncele
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.product.id} className="py-3 flex gap-3 items-center">
                  <div className="w-16 h-16 rounded border border-gray-100 p-1 flex-shrink-0 bg-white relative">
                    <Image
                      src={item.product.images[0] || '/images/logo/logo.png'}
                      alt={item.product.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-medium text-gray-800 line-clamp-2 leading-snug">
                      {item.product.name}
                    </h5>
                    <div className="text-xs font-bold text-brand-green mt-1">
                      {formatPrice(item.product.price)}
                    </div>
                    {/* Adet Kontrolü */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-gray-200 rounded">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-gray-500 hover:bg-gray-100 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-gray-700">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-gray-500 hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        title="Ürünü Sil"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Alt Kısım / Toplam & Sipariş Butonları */}
          {items.length > 0 && (
            <div className="p-4 border-t border-gray-200 bg-gray-50/70 space-y-3">
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>Ara Toplam:</span>
                <span className="font-semibold">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex items-center justify-between text-sm font-bold text-gray-900 border-t border-gray-200/80 pt-2">
                <span>Genel Toplam:</span>
                <span className="text-brand-green text-base">{formatPrice(cartTotal)}</span>
              </div>

              {/* Hızlı WhatsApp Sipariş Butonu */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-brand-whatsapp hover:bg-emerald-600 text-white py-2.5 px-4 rounded-md font-bold text-xs tracking-wider uppercase transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp İle Sipariş Ver</span>
              </a>

              {/* Normal Sipariş Tamamla */}
              <Link
                href="/odeme"
                onClick={() => setIsDrawerOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-brand-navy hover:bg-brand-navyHover text-white py-2.5 px-4 rounded-md font-bold text-xs tracking-wider uppercase transition-colors shadow-sm"
              >
                <span>Siparişi Tamamla</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
