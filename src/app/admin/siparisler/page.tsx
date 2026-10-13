'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingCart, MessageCircle, Package, CheckCircle2, Clock } from 'lucide-react';
import { formatPrice, getWhatsAppUrl } from '@/lib/utils';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/order')
      .then((res) => res.json())
      .then((data) => setOrders(Array.isArray(data) ? data : []));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">
          Siparişler ({orders.length})
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Mağazadan gelen tüm web, havale ve WhatsApp sipariş talepleri
        </p>
      </div>

      <div className="space-y-4">
        {orders.length === 0 ? (
          <div className="bg-slate-950 border border-slate-800 p-8 rounded-xl text-center text-slate-500 text-xs">
            Henüz sipariş kaydı bulunmuyor.
          </div>
        ) : (
          orders.map((order, idx) => {
            const customerMsg = `Merhabalar Sayın ${order.customer?.fullName}, ${order.orderNumber} numaralı siparişiniz hakkında Isı Enerji'den iletişime geçiyoruz.`;
            const waUrl = getWhatsAppUrl(order.customer?.phone || '', customerMsg);

            return (
              <div
                key={idx}
                className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-sm text-white">
                      {order.orderNumber}
                    </span>
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                      {order.paymentMethod}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {new Date(order.createdAt).toLocaleString('tr-TR')}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-brand-whatsapp/20 hover:bg-brand-whatsapp text-white text-[11px] font-bold px-3 py-1.5 rounded transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Müşteriye WhatsApp Yaz</span>
                    </a>
                  </div>
                </div>

                {/* Müşteri ve Sipariş Detayları */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-slate-500 block">Müşteri Bilgileri:</span>
                    <div className="font-bold text-white mt-1">{order.customer?.fullName}</div>
                    <div className="text-slate-300">{order.customer?.phone}</div>
                    {order.customer?.email && <div className="text-slate-400">{order.customer?.email}</div>}
                  </div>

                  <div>
                    <span className="text-slate-500 block">Teslimat Adresi:</span>
                    <div className="text-slate-300 mt-1 font-medium">{order.customer?.city}</div>
                    <div className="text-slate-400 text-[11px] mt-0.5">{order.customer?.address}</div>
                    {order.customer?.notes && (
                      <div className="text-amber-400 text-[11px] mt-1 italic">
                        Not: {order.customer?.notes}
                      </div>
                    )}
                  </div>

                  <div className="text-left md:text-right">
                    <span className="text-slate-500 block">Toplam Tutar:</span>
                    <div className="text-xl font-black font-mono text-emerald-400 mt-1">
                      {formatPrice(order.total || 0)}
                    </div>
                  </div>
                </div>

                {/* Ürünler Listesi */}
                <div className="bg-slate-900/60 rounded-lg p-3 border border-slate-800 text-xs">
                  <span className="text-slate-500 text-[11px] font-bold uppercase tracking-wider block mb-2">
                    Sipariş Kalemleri
                  </span>
                  <div className="space-y-1.5">
                    {order.items?.map((item: any, iIdx: number) => (
                      <div key={iIdx} className="flex justify-between text-slate-300">
                        <span>
                          {item.quantity}x {item.name}
                        </span>
                        <span className="font-mono font-semibold">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
