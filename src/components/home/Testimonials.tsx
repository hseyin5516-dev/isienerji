import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Ramazan Korkmazer',
    title: 'Tesisat Ustası',
    comment:
      'Yerden ısıtma sistemi ve mekanik tesisat malzemelerini Isı Enerji üzerinden temin ettim. Hem ürünlerin kalitesi hem de hızlı teslimat konusunda gerçekten çok memnun kaldım. İhtiyacım olan her aşamada profesyonel destek sağladılar.',
    rating: 5,
  },
  {
    name: 'Kadir Sel',
    title: 'Makine Mühendisi',
    comment:
      'Isı Enerji firmasından www.isienerji.com.tr web sitesinden aldığım malzemeler tam zamanında geldi. Ürünler hem kaliteli hem de teknik destekleri mükemmel. Rehau ve Fraenkische gibi lider markaların ürünlerini güvenle tedarik ediyoruz.',
    rating: 5,
  },
  {
    name: 'Selen Doğrucu',
    title: 'Mimar',
    comment:
      'Bir mimar olarak projelerimde güvenilir tedarikçilere ihtiyaç duyuyorum. Isı Enerji’den aldığımız malzemeler hem beklentilerimi fazlasıyla karşıladı hem de projemizi vaktinde teslim etmemizi sağladı. Kesinlikle tavsiye ederim.',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-14 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
            Müşterimiz Ne Dedi?
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Müşterilerimizden gelen geri bildirimler ile fikir sahibi olabilirsiniz
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-[#fafafa] border border-gray-100 rounded-xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative"
            >
              <Quote className="w-8 h-8 text-brand-green/20 absolute top-4 right-4" />
              <div>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-[#ffbf00] text-[#ffbf00]"
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-600 leading-relaxed italic">
                  &ldquo;{t.comment}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200/60">
                <h4 className="text-xs font-bold text-gray-900">{t.name}</h4>
                <p className="text-[11px] text-brand-green font-medium">
                  {t.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
