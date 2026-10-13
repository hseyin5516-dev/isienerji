'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, CheckCircle2, CreditCard, Building2, MessageCircle, ArrowLeft } from 'lucide-react';
import { useCart } from '@/components/cart/CartContext';
import { formatPrice, getWhatsAppUrl } from '@/lib/utils';
import siteConfig from '@/data/siteConfig.json';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, cartTotal, clearCart } = useCart();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'havale' | 'card' | 'whatsapp'>('havale');
  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState<string | null>(null);

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Sepetinizde ürün bulunmuyor.</h2>
        <Link
          href="/"
          className="bg-brand-green text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider"
        >
          Alışverişe Dön
        </Link>
      </div>
    );
  }

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderNumber = `IS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const orderData = {
      orderNumber,
      customer: { fullName, phone, email, city, address, notes },
      items: items.map(i => ({
        id: i.product.id,
        name: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
        sku: i.product.sku,
      })),
      total: cartTotal,
      paymentMethod,
      createdAt: new Date().toISOString(),
    };

    try {
      await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
    } catch (err) {
      console.error('Order save error', err);
    }

    setOrderComplete(orderNumber);
    clearCart();
    setIsSubmitting(false);
  };

  if (orderComplete) {
    const whatsappOrderUrl = getWhatsAppUrl(
      siteConfig.whatsappPhone,
      `Merhabalar, ${orderComplete} numaralı siparişimi oluşturdum. Detaylar ve teslimat süreci için bilgi alabilir miyim?`
    );

    return (
      <div className="py-16 bg-gray-50 min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center space-y-5 border border-gray-100">
          <div className="w-16 h-16 bg-emerald-100 text-brand-green rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h2 className="text-2xl font-black text-gray-900 font-display">
            Siparişiniz Alındı!
          </h2>

          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <div className="text-xs text-gray-500">Sipariş Numaranız</div>
            <div className="text-xl font-bold font-mono text-brand-navy mt-1">
              {orderComplete}
            </div>
          </div>

          <p className="text-xs text-gray-600 leading-relaxed">
            Sipariş bilgileriniz ve kargo takip detaylarınız <strong>{phone}</strong> numaranıza ve e-posta adresinize iletilecektir.
          </p>

          <div className="pt-2 space-y-3">
            <a
              href={whatsappOrderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-brand-whatsapp text-white py-3 rounded-lg text-xs font-bold uppercase tracking-wider"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp ile Onayla</span>
            </a>

            <Link
              href="/"
              className="inline-block text-xs font-semibold text-gray-600 hover:text-black py-2"
            >
              Anasayfaya Dön
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-8">
          <Link href="/sepet" className="text-gray-400 hover:text-black">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 font-display">
            Ödeme ve Teslimat
          </h1>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Sol Kolon: Form Bilgileri ve Ödeme Seçeneği (8 Kolon) */}
          <div className="lg:col-span-8 space-y-8">
            {/* 1. Teslimat Bilgileri */}
            <div className="bg-gray-50/60 p-6 rounded-xl border border-gray-200/80 space-y-4">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                1. Teslimat ve İletişim Bilgileri
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Ad Soyad *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Örn: Ahmet Yılmaz"
                    className="w-full p-2.5 rounded border border-gray-300 focus:outline-none focus:border-brand-navy bg-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Telefon *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Örn: 0532 123 45 67"
                    className="w-full p-2.5 rounded border border-gray-300 focus:outline-none focus:border-brand-navy bg-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">E-Posta Adresi</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ornek@domain.com"
                    className="w-full p-2.5 rounded border border-gray-300 focus:outline-none focus:border-brand-navy bg-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">İl / İlçe *</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Örn: İstanbul / Başakşehir"
                    className="w-full p-2.5 rounded border border-gray-300 focus:outline-none focus:border-brand-navy bg-white"
                  />
                </div>
              </div>

              <div className="text-xs">
                <label className="block font-semibold text-gray-700 mb-1">Teslimat Adresi *</label>
                <textarea
                  required
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Mahalle, Cadde, Sokak, No, Daire..."
                  className="w-full p-2.5 rounded border border-gray-300 focus:outline-none focus:border-brand-navy bg-white"
                />
              </div>

              <div className="text-xs">
                <label className="block font-semibold text-gray-700 mb-1">Sipariş Notu (Opsiyonel)</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Kargoya veya teslimata dair özel notunuz..."
                  className="w-full p-2.5 rounded border border-gray-300 focus:outline-none focus:border-brand-navy bg-white"
                />
              </div>
            </div>

            {/* 2. Ödeme Yöntemi */}
            <div className="bg-gray-50/60 p-6 rounded-xl border border-gray-200/80 space-y-4">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                2. Ödeme Yöntemi Seçin
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label
                  className={`p-4 rounded-xl border-2 flex flex-col items-center text-center cursor-pointer transition-all ${
                    paymentMethod === 'havale'
                      ? 'border-brand-navy bg-white shadow-sm'
                      : 'border-gray-200 bg-white/50 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'havale'}
                    onChange={() => setPaymentMethod('havale')}
                    className="sr-only"
                  />
                  <Building2 className="w-6 h-6 text-brand-navy mb-2" />
                  <span className="text-xs font-bold text-gray-900">Havale / EFT</span>
                  <span className="text-[10px] text-gray-500 mt-0.5">Banka Hesaplarımıza</span>
                </label>

                <label
                  className={`p-4 rounded-xl border-2 flex flex-col items-center text-center cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'border-brand-navy bg-white shadow-sm'
                      : 'border-gray-200 bg-white/50 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="sr-only"
                  />
                  <CreditCard className="w-6 h-6 text-brand-green mb-2" />
                  <span className="text-xs font-bold text-gray-900">Kredi Kartı</span>
                  <span className="text-[10px] text-gray-500 mt-0.5">PayTR / İyzico POS</span>
                </label>

                <label
                  className={`p-4 rounded-xl border-2 flex flex-col items-center text-center cursor-pointer transition-all ${
                    paymentMethod === 'whatsapp'
                      ? 'border-brand-navy bg-white shadow-sm'
                      : 'border-gray-200 bg-white/50 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'whatsapp'}
                    onChange={() => setPaymentMethod('whatsapp')}
                    className="sr-only"
                  />
                  <MessageCircle className="w-6 h-6 text-brand-whatsapp mb-2" />
                  <span className="text-xs font-bold text-gray-900">WhatsApp Sipariş</span>
                  <span className="text-[10px] text-gray-500 mt-0.5">Müşteri Temsilcisi ile</span>
                </label>
              </div>

              {/* Havale Bilgileri Kutusu */}
              {paymentMethod === 'havale' && (
                <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-3 text-xs mt-4">
                  <p className="text-gray-700 font-medium">
                    Siparişinizi tamamladıktan sonra aşağıdaki banka hesaplarımıza ödemenizi yapabilirsiniz:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {siteConfig.bankAccounts.map((b, i) => (
                      <div key={i} className="p-3 bg-gray-50 rounded border border-gray-100">
                        <div className="font-bold text-brand-navy">{b.bank}</div>
                        <div className="text-[11px] text-gray-600">{b.accountName}</div>
                        <div className="font-mono font-bold text-[11px] text-gray-800 mt-1">{b.iban}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Kredi Kartı Formu */}
              {paymentMethod === 'card' && (
                <div className="bg-white p-5 rounded-lg border border-gray-200 space-y-4 text-xs mt-4 max-w-md">
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <ShieldCheck className="w-4 h-4 text-brand-green" />
                    <span className="font-medium text-[11px]">256-Bit SSL Korumalı Güvenli Kart Formu</span>
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Kart Üzerindeki İsim</label>
                    <input
                      type="text"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      placeholder="Ad Soyad"
                      className="w-full p-2 rounded border border-gray-300"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Kart Numarası</label>
                    <input
                      type="text"
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="0000 0000 0000 0000"
                      className="w-full p-2 rounded border border-gray-300 font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">Son Kullanma (AA/YY)</label>
                      <input
                        type="text"
                        maxLength={5}
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full p-2 rounded border border-gray-300 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">CVC / CVV</label>
                      <input
                        type="text"
                        maxLength={4}
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        placeholder="123"
                        className="w-full p-2 rounded border border-gray-300 font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sağ Kolon: Sipariş Özeti ve Onay (4 Kolon) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-gray-50/70 border border-gray-200/80 rounded-xl p-6 space-y-4 shadow-sm sticky top-24">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-2">
                Sepet Kalemleri ({items.length})
              </h3>

              <div className="max-h-60 overflow-y-auto divide-y divide-gray-100 text-xs">
                {items.map((item) => (
                  <div key={item.product.id} className="py-2.5 flex justify-between gap-2">
                    <span className="text-gray-700 line-clamp-1 flex-1">
                      {item.quantity}x {item.product.name}
                    </span>
                    <span className="font-bold text-gray-900 whitespace-nowrap">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-3 space-y-2 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Ara Toplam:</span>
                  <span className="font-semibold text-gray-900">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Kargo:</span>
                  <span className="font-semibold text-brand-green">Ücretsiz</span>
                </div>
                <div className="flex justify-between items-baseline text-sm font-bold text-gray-900 border-t border-gray-200 pt-2">
                  <span>Ödenecek Tutar:</span>
                  <span className="text-xl font-black text-brand-green font-ui">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-green hover:bg-brand-greenHover text-white py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-lg disabled:opacity-50"
              >
                {isSubmitting ? 'İşleniyor...' : 'Siparişi Onayla'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
