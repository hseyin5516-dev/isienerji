'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Package, ShoppingCart, TrendingUp, Users, ArrowUpRight, Plus, ExternalLink } from 'lucide-react';
import productsData from '@/data/products.json';
import { formatPrice } from '@/lib/utils';

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/order')
      .then((res) => res.json())
      .then((data) => setOrders(Array.isArray(data) ? data : []))
      .catch((e) => console.error(e));
  }, []);

  const totalProducts = productsData.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);

  return (
    <div className="space-y-8">
      {/* Üst Karşılama ve Hızlı Buton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Yönetim Paneli Genel Bakış
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Isı Enerji mağaza istatistikleri, ürünler ve gelen siparişler
          </p>
        </div>

        <Link
          href="/admin/urunler"
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow-lg shadow-emerald-950 w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Yeni Ürün Ekle</span>
        </Link>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Toplam Ürün</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white mt-3 font-mono">
            {totalProducts}
          </div>
          <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
            <span>Canlı siteden aktarıldı</span>
          </div>
        </div>

        <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Toplam Sipariş</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <ShoppingCart className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white mt-3 font-mono">
            {totalOrders}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Havale & WhatsApp siparişleri
          </div>
        </div>

        <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Toplam Ciro</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white mt-3 font-mono">
            {formatPrice(totalRevenue)}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            KDV Dahil Net Satış
          </div>
        </div>

        <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">POS Durumu</span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-sm font-bold text-emerald-400 mt-3">
            Hazır (Test Modu)
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            PayTR / İyzico API Entegre
          </div>
        </div>
      </div>

      {/* Son Siparişler Tablosu */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            Son Gelen Siparişler
          </h2>
          <Link
            href="/admin/siparisler"
            className="text-xs text-emerald-400 hover:underline flex items-center gap-1 font-medium"
          >
            <span>Tümünü Gör</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-900/60 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
              <tr>
                <th className="p-4">Sipariş No</th>
                <th className="p-4">Müşteri</th>
                <th className="p-4">Tutar</th>
                <th className="p-4">Yöntem</th>
                <th className="p-4">Tarih</th>
                <th className="p-4">Durum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    Henüz sipariş kaydı bulunmuyor.
                  </td>
                </tr>
              ) : (
                orders.slice(0, 5).map((order, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                    <td className="p-4 font-mono font-bold text-white">
                      {order.orderNumber}
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-white">{order.customer?.fullName}</div>
                      <div className="text-[11px] text-slate-400">{order.customer?.phone}</div>
                    </td>
                    <td className="p-4 font-mono font-bold text-emerald-400">
                      {formatPrice(order.total || 0)}
                    </td>
                    <td className="p-4 uppercase text-[11px] font-semibold text-slate-400">
                      {order.paymentMethod}
                    </td>
                    <td className="p-4 text-slate-400">
                      {new Date(order.createdAt).toLocaleDateString('tr-TR')}
                    </td>
                    <td className="p-4">
                      <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                        Beklemede
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
