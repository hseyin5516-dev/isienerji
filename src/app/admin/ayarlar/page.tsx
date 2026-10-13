'use client';

import React, { useState, useEffect } from 'react';
import { Save, Check, CreditCard, MessageCircle, Phone, Building } from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<any>(null);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((res) => res.json())
      .then((data) => {
        setSettings(data);
        setLoading(false);
      });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (loading || !settings) {
    return <div className="text-xs text-slate-400">Ayarlar yükleniyor...</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Site & POS Ayarları
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Ödeme entegrasyonları, WhatsApp numarası ve iletişim bilgilerini yapılandırın.
          </p>
        </div>

        {saved && (
          <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 animate-in fade-in">
            <Check className="w-4 h-4" />
            <span>Ayarlar Kaydedildi!</span>
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* 1. İletişim & WhatsApp Ayarları */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 space-y-4">
          <h3 className="font-bold text-white text-sm flex items-center gap-2 border-b border-slate-800 pb-3">
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>İletişim & WhatsApp Ayarları</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">WhatsApp Sipariş Numarası</label>
              <input
                type="text"
                value={settings.whatsappPhone || ''}
                onChange={(e) => setSettings({ ...settings, whatsappPhone: e.target.value })}
                placeholder="Örn: 905362769169"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">Ülke kodu ile (90...)</span>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Sabit Telefon</label>
              <input
                type="text"
                value={settings.phone2 || ''}
                onChange={(e) => setSettings({ ...settings, phone2: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">GSM Telefon</label>
              <input
                type="text"
                value={settings.phone1 || ''}
                onChange={(e) => setSettings({ ...settings, phone1: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">E-Posta Adresi</label>
              <input
                type="email"
                value={settings.email || ''}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white"
              />
            </div>
          </div>
        </div>

        {/* 2. Sanal POS Ayarları (PayTR & İyzico) */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 space-y-4">
          <h3 className="font-bold text-white text-sm flex items-center gap-2 border-b border-slate-800 pb-3">
            <CreditCard className="w-4 h-4 text-purple-400" />
            <span>Sanal POS Entegrasyonu (PayTR / İyzico)</span>
          </h3>

          <div className="space-y-4">
            <div className="bg-slate-900/60 p-4 rounded-lg border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">PayTR Entegrasyonu</span>
                <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.payment?.paytrEnabled || false}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        payment: { ...settings.payment, paytrEnabled: e.target.checked },
                      })
                    }
                    className="rounded text-emerald-500"
                  />
                  <span>Aktif</span>
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Merchant ID</label>
                  <input
                    type="text"
                    value={settings.payment?.paytrMerchantId || ''}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        payment: { ...settings.payment, paytrMerchantId: e.target.value },
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">API Key</label>
                  <input
                    type="password"
                    value={settings.payment?.paytrApiKey || ''}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        payment: { ...settings.payment, paytrApiKey: e.target.value },
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Secret Key</label>
                  <input
                    type="password"
                    value={settings.payment?.paytrSecretKey || ''}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        payment: { ...settings.payment, paytrSecretKey: e.target.value },
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white font-mono"
                  />
                </div>
              </div>
            </div>

            {/* İyzico POS */}
            <div className="bg-slate-900/60 p-4 rounded-lg border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">İyzico Entegrasyonu</span>
                <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.payment?.iyzicoEnabled || false}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        payment: { ...settings.payment, iyzicoEnabled: e.target.checked },
                      })
                    }
                    className="rounded text-emerald-500"
                  />
                  <span>Aktif</span>
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">İyzico API Key</label>
                  <input
                    type="text"
                    value={settings.payment?.iyzicoApiKey || ''}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        payment: { ...settings.payment, iyzicoApiKey: e.target.value },
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">İyzico Secret Key</label>
                  <input
                    type="password"
                    value={settings.payment?.iyzicoSecretKey || ''}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        payment: { ...settings.payment, iyzicoSecretKey: e.target.value },
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Kaydet Butonu */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow-lg shadow-emerald-950"
          >
            <Save className="w-4 h-4" />
            <span>Tüm Ayarları Kaydet</span>
          </button>
        </div>
      </form>
    </div>
  );
}
