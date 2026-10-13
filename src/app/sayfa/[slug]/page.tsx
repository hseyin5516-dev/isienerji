import React from 'react';
import Link from 'next/link';
import { ChevronRight, ShieldCheck } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const pageContentMap: Record<string, { title: string; content: string }> = {
  hakkimizda: {
    title: 'Hakkımızda',
    content: `
      <h3>Isı Enerji Kimdir?</h3>
      <p>Isı Enerji, yılların getirdiği sektörel tecrübe ile yerden ısıtma sistemleri, sirkülasyon pompaları, hidraforlar, boylerler ve mekanik tesisat malzemeleri alanında öncü bir e-ticaret ve mühendislik firmasıdır.</p>
      <p>Müşterilerimize Rehau, Fraenkische, Danfoss, Grundfos, Wilo, Vesbo ve Kas gibi dünya devi markaların orijinal, garantili ve faturalı ürünlerini en avantajlı fiyat politikasıyla ulaştırıyoruz.</p>
      <h3>Misyonumuz</h3>
      <p>Bireysel konutlardan devasa ticari projelere kadar her yaşam alanında enerji verimliliği ve konforu bir araya getiren doğru tesisat çözümlerini en hızlı lojistik altyapısıyla sunmak.</p>
      <h3>Vizyonumuz</h3>
      <p>Türkiye ve çevre ülkelerde yerden ısıtma ve mekanik tesisat denildiğinde akla gelen ilk, en güvenilir ve en yenilikçi teknoloji odaklı tedarik platformu olmak.</p>
    `,
  },
  'mesafeli-satis-sozlesmesi': {
    title: 'Mesafeli Satış Sözleşmesi',
    content: `
      <h3>1. Taraflar</h3>
      <p>İşbu Sözleşme, Isı Enerji (Satıcı) ile www.isienerji.com.tr üzerinden sipariş veren Müşteri (Alıcı) arasında akdedilmiştir.</p>
      <h3>2. Konu</h3>
      <p>İşbu sözleşmenin konusu, Alıcı'nın Satıcı'ya ait internet sitesinden elektronik ortamda siparişini yaptığı ürünlerin satışı ve teslimi ile ilgili 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmelere Dair Yönetmelik hükümleri gereğince tarafların hak ve yükümlülüklerinin saptanmasıdır.</p>
    `,
  },
  'iptal-ve-iade-sartlari': {
    title: 'İptal ve İade Koşulları',
    content: `
      <h3>İade ve Değişim Hakkı</h3>
      <p>Alıcı, satın aldığı ürünün kendisine veya gösterdiği adresteki kişi/kuruluşa teslim tarihinden itibaren 14 (on dört) gün içerisinde hiçbir hukuki ve cezai sorumluluk üstlenmeksizin ve hiçbir gerekçe göstermeksizin malı reddederek sözleşmeden cayma hakkına sahiptir.</p>
      <p>İade edilecek ürünlerin orijinal ambalajında, açılmamış, bozulmamış ve yeniden satılabilir özelliğini kaybetmemiş olması gerekmektedir.</p>
    `,
  },
  'gizlilik-politikasi': {
    title: 'Gizlilik Politikası',
    content: `
      <p>Isı Enerji olarak kişisel verilerinizin güvenliğine en üst düzeyde önem veriyoruz. Sitemizi ziyaretiniz ve alışverişleriniz esnasında toplanan veriler gizlilik prensiplerimiz doğrultusunda güvenle saklanmaktadır.</p>
    `,
  },
  'kisisel-verilerin-korunmasi-kanunu': {
    title: 'Kişisel Verilerin Korunması Kanunu (KVKK)',
    content: `
      <p>6698 sayılı Kişisel Verilerin Korunması Kanunu uyarınca, veri sorumlusu sıfatıyla Isı Enerji tarafından kişisel verileriniz işlenebilecek, kaydedilebilecek ve mevzuatın izin verdiği ölçüde üçüncü taraflarla paylaşılabilecektir.</p>
    `,
  },
  'teslimat-politikasi': {
    title: 'Teslimat Politikası',
    content: `
      <p>Siparişleriniz saat 17:00'ye kadar aynı gün anlaşmalı kargo firmalarımıza teslim edilmektedir. 2.000 TL ve üzeri tüm alışverişlerinizde kargo ücretsizdir.</p>
    `,
  },
};

export default async function StaticContentPage({ params }: PageProps) {
  const { slug } = await params;
  const pageData = pageContentMap[slug] || {
    title: slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
    content: `<p>Isı Enerji ${slug.replace(/-/g, ' ')} sayfası bilgileri ve detaylı ürün yelpazesi. Kaliteli yerden ısıtma ve mekanik tesisat çözümleri için hemen teklif alın.</p>`,
  };

  return (
    <div className="bg-white py-12 min-h-[70vh]">
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        <nav className="flex items-center text-xs text-gray-500 space-x-1.5">
          <Link href="/" className="hover:text-brand-green">Anasayfa</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-900 font-medium">{pageData.title}</span>
        </nav>

        <h1 className="text-2xl md:text-3xl font-black text-gray-900 font-display border-b border-gray-100 pb-4">
          {pageData.title}
        </h1>

        <div
          className="prose max-w-none text-xs md:text-sm text-gray-700 leading-relaxed space-y-4"
          dangerouslySetInnerHTML={{ __html: pageData.content }}
        />
      </div>
    </div>
  );
}
