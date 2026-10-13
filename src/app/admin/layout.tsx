'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, ShoppingCart, Sliders, FileText, ArrowLeft, Store, Shield } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const links = [
    { href: '/admin', label: 'Genel Bakış', icon: LayoutDashboard },
    { href: '/admin/urunler', label: 'Ürün Yönetimi', icon: Package },
    { href: '/admin/siparisler', label: 'Siparişler', icon: ShoppingCart },
    { href: '/admin/blog', label: 'Blog Yönetimi', icon: FileText },
    { href: '/admin/ayarlar', label: 'Site & POS Ayarları', icon: Sliders },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex font-sans">
      {/* Sol Sidebar */}
      <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col justify-between p-4 flex-shrink-0">
        <div className="space-y-6">
          {/* Logo & Başlık */}
          <div className="flex items-center gap-3 px-2 py-3 border-b border-slate-800">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-900/50">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-sm text-white tracking-wide">Isı Enerji</div>
              <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Yönetim Paneli</div>
            </div>
          </div>

          {/* Menü Linkleri */}
          <nav className="space-y-1">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Mağazaya Dön Linki */}
        <div className="pt-4 border-t border-slate-800">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg transition-colors"
          >
            <Store className="w-4 h-4 text-emerald-400" />
            <span>Mağazayı Görüntüle</span>
          </Link>
        </div>
      </aside>

      {/* Sağ Ana İçerik */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="h-14 border-b border-slate-800 bg-slate-950/50 backdrop-blur px-8 flex items-center justify-between">
          <div className="text-xs font-medium text-slate-400">
            Yönetici: <span className="text-slate-200 font-bold">Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] text-emerald-400 font-medium">Sistem Çevrimiçi</span>
          </div>
        </header>

        <main className="p-8 flex-1 bg-slate-900">
          {children}
        </main>
      </div>
    </div>
  );
}
