import React from 'react';
import { ShieldCheck, Award, RefreshCcw, Truck } from 'lucide-react';

export default function TrustBoxes() {
  const items = [
    {
      icon: ShieldCheck,
      title: 'GÜVENLİ ÖDEME',
      desc: 'Anında Ödeme Yapabilirsiniz',
    },
    {
      icon: Award,
      title: 'ÜRÜN GARANTİSİ',
      desc: 'Tüm Ürünler Garantili ve Faturalı',
    },
    {
      icon: RefreshCcw,
      title: 'ÜCRETSİZ İADE',
      desc: '14 Gün İçinde Koşulsuz Ücretsiz İade',
    },
    {
      icon: Truck,
      title: 'AYNI GÜN KARGO',
      desc: "17:00'e Kadar Aynı Gün Kargo",
    },
  ];

  return (
    <div className="bg-brand-navy text-white py-6 px-4 border-t border-brand-navy/30">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-4 bg-white/5 p-4 rounded-lg border border-white/10 hover:border-brand-yellow/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-brand-yellow/15 flex items-center justify-center flex-shrink-0 text-brand-yellow">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-bold tracking-wider text-white">
                  {item.title}
                </h4>
                <p className="text-[11px] text-gray-300 mt-0.5">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
