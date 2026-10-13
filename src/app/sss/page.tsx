'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    q: 'Yerden ısıtma sisteminde hangi boru markalarını tercih etmeliyim?',
    a: 'Alman standartlarında üretilen Rehau Rautherm S PE-Xa ve Fraenkische ff-therm multi oksijen bariyerli borular sektörün en çok tercih edilen birinci sınıf borularıdır. Yerli alternatiflerde ise Vesbo ve Kas PE-RT modelleri yüksek fiyat/performans sağlar.',
  },
  {
    q: 'Siparişler ne zaman kargoya verilir?',
    a: 'Saat 17:00’ye kadar verilen tüm siparişler stoktan aynı gün anlaşmalı kargo firmalarımıza teslim edilir. İstanbul içi projelerde ambar ve kurye teslimat seçenekleri de mevcuttur.',
  },
  {
    q: 'Kargo ücreti ne kadar?',
    a: '2.000 TL ve üzeri tüm siparişlerinizde Türkiye genelinde kargo tamamen ücretsizdir.',
  },
  {
    q: 'Kredi kartına taksit imkanı var mı?',
    a: 'Evet, anlaşmalı banka kartlarıyla peşin fiyatına 6 taksite kadar alışveriş yapabilirsiniz.',
  },
  {
    q: 'WhatsApp üzerinden doğrudan sipariş verebilir miyim?',
    a: 'Evet! Sitemizdeki tüm ürünlerde ve sepetinizde bulunan "WhatsApp ile Sipariş Ver" butonuna tıklayarak müşteri temsilcimizle anında iletişime geçebilir, siparişinizi doğrudan oluşturabilirsiniz.',
  },
];

export default function SssPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="bg-white py-12 min-h-[70vh]">
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-2">
          <HelpCircle className="w-10 h-10 text-brand-green mx-auto" />
          <h1 className="text-3xl font-black text-gray-900 font-display">
            Sıkça Sorulan Sorular
          </h1>
          <p className="text-xs text-gray-500">
            Yerden ısıtma, ürünler, teslimat ve ödeme süreçleri hakkında merak edilenler
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-gray-200 rounded-xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex justify-between items-center bg-gray-50/50 hover:bg-gray-100/50 transition-colors"
                >
                  <span className="font-bold text-xs md:text-sm text-gray-900">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 transition-transform ${
                      isOpen ? 'rotate-180 text-brand-green' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 bg-white text-xs text-gray-600 leading-relaxed border-t border-gray-100 animate-in fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
