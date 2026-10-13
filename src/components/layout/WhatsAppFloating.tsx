'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/utils';

interface WhatsAppFloatingProps {
  phone?: string;
  defaultMessage?: string;
}

export default function WhatsAppFloating({
  phone = '905362769169',
  defaultMessage = 'Merhabalar, www.isienerji.com.tr üzerinden ulaşıyorum. Ürünler hakkında bilgi ve fiyat teklifi almak istiyorum.',
}: WhatsAppFloatingProps) {
  const url = getWhatsAppUrl(phone, defaultMessage);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 flex items-center gap-3 bg-brand-whatsapp text-white px-4 py-3 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all group"
      aria-label="WhatsApp Destek"
    >
      <div className="relative">
        <MessageCircle className="w-7 h-7 fill-white text-brand-whatsapp" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full" />
      </div>
      <div className="text-left font-ui hidden sm:block pr-1">
        <div className="text-xs font-bold leading-tight">WhatsApp Destek</div>
        <div className="text-[10px] text-white/90 leading-tight">Bize mesaj gönderin</div>
      </div>
    </a>
  );
}
