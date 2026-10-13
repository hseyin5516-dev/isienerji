import React from 'react';
import Link from 'next/link';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/utils';

export default function CategoryVitrine() {
  const quoteUrl = getWhatsAppUrl(
    '905362769169',
    'Merhabalar, www.isienerji.com.tr üzerinden ulaşıyorum. Projemiz için özel fiyat teklifi almak istiyoruz. Yardımcı olabilir misiniz?'
  );

  return (
    <section className="py-12 bg-gray-50 space-y-10">
      <div className="max-w-7xl mx-auto px-4 space-y-10">
        {/* 3'lü Kategori Kutuları */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm p-6 flex flex-col justify-between min-h-[220px] group hover:shadow-md transition-all">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                KATEGORİ
              </span>
              <h3 className="text-xl font-black text-gray-900">
                Tesisat Malzemeleri
              </h3>
            </div>
            <Link
              href="/el-aletleri"
              className="inline-flex items-center gap-2 bg-gray-900 group-hover:bg-brand-green text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors w-fit"
            >
              <span>Ürünlere Git</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="relative rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm p-6 flex flex-col justify-between min-h-[220px] group hover:shadow-md transition-all">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-brand-green uppercase tracking-widest">
                EN ÇOK TERCİH EDİLEN
              </span>
              <h3 className="text-xl font-black text-gray-900">
                Yerden Isıtma Malzemeleri
              </h3>
            </div>
            <Link
              href="/yerden-isitma"
              className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-greenHover text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors w-fit"
            >
              <span>Ürünlere Git</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="relative rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm p-6 flex flex-col justify-between min-h-[220px] group hover:shadow-md transition-all">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                VERİMLİ SİSTEMLER
              </span>
              <h3 className="text-xl font-black text-gray-900">
                Sirkülasyon Pompaları
              </h3>
            </div>
            <Link
              href="/pompalar"
              className="inline-flex items-center gap-2 bg-gray-900 group-hover:bg-brand-green text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors w-fit"
            >
              <span>Ürünlere Git</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Özel Fiyat Teklifi Al Bannerı (WhatsApp) */}
        <div className="bg-gradient-to-r from-brand-navy to-slate-800 rounded-2xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="max-w-2xl space-y-3">
            <span className="text-brand-yellow font-bold text-xs uppercase tracking-widest">
              Kaçırılmayacak Fırsatlar
            </span>
            <h3 className="text-2xl md:text-3xl font-black leading-tight">
              Tesisat ve Yerden Isıtma Ürünlerinde Özel Teklif Alın
            </h3>
            <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
              Eviniz veya ticari projeniz için tüm tesisat çözümleri tek çatı altında! Yerden ısıtma, sirkülasyon pompaları, doğalgaz malzemeleri ve kollektör çeşitleriyle geniş ürün gamı sunuyoruz.
            </p>
          </div>

          <a
            href={quoteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-3 bg-brand-whatsapp hover:bg-emerald-600 text-white px-8 py-4 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95"
          >
            <MessageCircle className="w-5 h-5" />
            <span>FİYAT TEKLİFİ AL</span>
          </a>
        </div>

        {/* 4'lü Kategori Görsel Vitrini */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[
            { title: 'Yangın Dolapları', link: '/yangin-sistemleri' },
            { title: 'Doğalgaz Malzemeleri', link: '/dogalgaz-malzemeleri' },
            { title: 'Boylerler', link: '/boylerler' },
            { title: 'Sıhhi Tesisat Malzemeleri', link: '/sihhi-tesisat' },
          ].map((cat, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-100 rounded-xl p-5 text-center flex flex-col items-center justify-between min-h-[160px] shadow-sm hover:shadow-md transition-all group"
            >
              <h4 className="font-bold text-sm text-gray-800 group-hover:text-brand-green transition-colors">
                {cat.title}
              </h4>
              <Link
                href={cat.link}
                className="mt-4 text-[11px] font-bold text-gray-700 bg-gray-100 hover:bg-brand-navy hover:text-white px-4 py-2 rounded-full transition-all"
              >
                Ürünleri Gör
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
