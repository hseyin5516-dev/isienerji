'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/utils';
import siteConfig from '@/data/siteConfig.json';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
    setName('');
    setPhone('');
    setMessage('');
  };

  const whatsappUrl = getWhatsAppUrl(
    siteConfig.whatsappPhone,
    'Merhabalar, www.isienerji.com.tr üzerinden ulaşıyorum. Ürünleriniz ve projelerimiz hakkında bilgi almak istiyorum.'
  );

  return (
    <div className="bg-white py-12 min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h1 className="text-3xl font-black text-gray-900 font-display">
            Bize Ulaşın
          </h1>
          <p className="text-xs text-gray-500">
            Tüm soru, toptan sipariş ve proje fiyat teklifi talepleriniz için uzman ekibimizle iletişime geçin.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sol: İletişim Bilgileri (5 Kolon) */}
          <div className="lg:col-span-5 bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100 space-y-6">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-3">
              İletişim Kanallarımız
            </h2>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-gray-400 block text-[11px]">Telefon Hatlarımız</span>
                  <a href={`tel:${siteConfig.phone1}`} className="font-bold text-gray-900 block mt-0.5 hover:underline">
                    {siteConfig.phone1}
                  </a>
                  <a href={`tel:${siteConfig.phone2}`} className="text-gray-600 block hover:underline">
                    {siteConfig.phone2}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-100 text-brand-whatsapp flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-gray-400 block text-[11px]">WhatsApp Destek Hattı</span>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-brand-green block mt-0.5 hover:underline"
                  >
                    +90 536 276 91 69 (Canlı Destek)
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-100 text-brand-navy flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-gray-400 block text-[11px]">E-Posta</span>
                  <a href={`mailto:${siteConfig.email}`} className="font-bold text-gray-900 block mt-0.5 hover:underline">
                    {siteConfig.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-gray-400 block text-[11px]">Çalışma Saatleri</span>
                  <span className="font-medium text-gray-800 block mt-0.5">
                    {siteConfig.workingHours}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-brand-whatsapp text-white py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp İle Hemen Yazın</span>
              </a>
            </div>
          </div>

          {/* Sağ: İletişim Formu (7 Kolon) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-6">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-3">
              Mesaj Gönderin
            </h2>

            {sent ? (
              <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-brand-green mx-auto" />
                <h3 className="font-bold text-emerald-950 text-sm">Mesajınız Alındı!</h3>
                <p className="text-xs text-emerald-800">
                  Uzman müşteri temsilcimiz en kısa sürede sizinle iletişime geçecektir.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Adınız Soyadınız *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Adınız Soyadınız"
                      className="w-full p-2.5 rounded border border-gray-300 focus:outline-none focus:border-brand-navy"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Telefon Numaranız *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="05XX XXX XX XX"
                      className="w-full p-2.5 rounded border border-gray-300 focus:outline-none focus:border-brand-navy"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Mesajınız / Teklif Talebiniz *</label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="İhtiyaç duyduğunuz ürünler, m² bilgisi veya sormak istedikleriniz..."
                    className="w-full p-2.5 rounded border border-gray-300 focus:outline-none focus:border-brand-navy"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-brand-navy hover:bg-brand-navyHover text-white px-8 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow-md flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Mesajı Gönder</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
