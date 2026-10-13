# Isı Enerji (isienerji.com.tr) – Yeniden Yapım Planı

> Durum: **sadece plan**. Kod yazılmadı. Tüm bulgular `_recon/` klasöründeki ham veriye (sitemap, HTML, CSS, ekran görüntüleri) dayanır.
> Kaynak site: https://www.isienerji.com.tr/ (e-ticaret, TL, Türkçe)

---

## 1. Site Özeti

| Konu | Bulgu |
|---|---|
| Tür | B2C/B2B e-ticaret: yerden ısıtma, pompa, hidrafor, ısı pompası, boyler, tesisat |
| Mevcut altyapı | Özel PHP altyapı (hazır CMS izi yok). Bootstrap 5, jQuery, jQuery UI, Swiper, Font Awesome, Line Awesome, Linearicons |
| Sunucu hızı | Yavaş. Sayfalar 2–16 sn arasında indi (blog ve sss en yavaşlar) |
| Para birimi | TRY (menüde USD, EUR, GBP seçeneği var; ana bağlantılar aynı sayfaya gidiyor) |
| Sipariş yolları | Normal sepet + **WhatsApp'tan sipariş** + **Fiyat teklifi al** (`/teklif-cek-ajax`, `/normal-siparis-ajax`) |
| SEO | Her sayfada özel `<title>`, JSON-LD (`Organization`, `WebSite`), uzun SEO metinleri, ilçe bazlı yerel SEO sayfaları |
| Konsol | Her sayfada 5–6 JS hatası var (eski site kusuru, kopyalamayacağız) |

## 2. Site Haritası (226 URL)

Gerçek sitemap `robots.txt` içinden `custom_sitemaps.php` adresinde. `sitemap.xml` sadece kendini listeliyor.

| Grup | Adet | URL kalıbı | Şablon |
|---|---|---|---|
| Ürün | 97 | `/{slug}-P{id}` | Ürün detay |
| Kategori / alt kategori / marka-kategori | 68 | `/{slug}/` (tek segment) | Kategori listesi |
| Marka | 40 | `/marka/{slug}/` | Kategori listesi (aynı şablon) |
| Statik sayfa | 14 | `/sayfa/{slug}/` | HTML sayfa |
| Blog yazısı | 5 | `/blog/{slug}/` | Blog detay |
| Diğer (liste, hesap, araçlar) | ~2 + aşağıdakiler | bkz. 2.2 | Çeşitli |

### 2.1 Ana gezinme (mega menü)
Yerden Isıtma, Sirkülasyon Pompaları, Hidraforlar, Isı Pompaları, Boylerler, Dalgıç Pompalar, Tesisat (Tüm Kategoriler açılır menüsü de var). Yerden Isıtma altında iki ana grup var: **Avrupa Markaları** (Rehau, Fraenkische, Danfoss, Wavin, Caleffi, Giacomini) ve **Yerli Markalar** (Vesbo, Çetin, Kas, Kalde, Fırat, Formül, Nano). Altında ürün tipleri de listeleniyor (boru, strafor, kollektör, kenar bandı, rakor, vana, termostat, kontrol paneli, aktüatör, kollektör dolabı, kavis dirsek, çengel, kılıf boru, şap katkısı).

> [!NOTE]
> Menüdeki birçok bağlantı `href="/"` (ölü). Sadece sitemap'te karşılığı olan kategoriler gerçek sayfa. Yeni sitede bu menü girişleri ya gerçek kategoriye bağlanacak ya da "yakında" olarak gizlenecek (karar: bkz. Bölüm 9).

### 2.2 Sayfa envanteri

**Ana şablonlar**
- `/` Ana sayfa
- `/yerden-isitma/`, `/yerden-isitma-borulari/`, `/yerden-isitma-straforlari/`, `/yerden-isitma-kollektorleri/`, `/kenar-izolasyon-bantlari/`, `/boru-baglanti-rakorlari/`, `/oda-termostatlari/`, `/sap-katki-maddeleri/`, `/kavis-dirsek/`, `/2-yollu-vanalar/`, `/kollektor-dolaplari/`, `/kollektor-vanalari/`, `/yerden-isitma-kontrol-panelleri/`, `/yerden-isitma-termostatik-vanalar/`, `/sabit-deger-ayar-setleri/`, `/sabitleyici-cengel-boru-tutucu/`, `/el-aletleri/`, `/betona-civi-cakma-tabancasi/`, `/mantolama-tabancasi/`, `/pompalar/`, `/kombiler/`, `/kendinden-vanali-kollektorler/`
- Marka-kategori sayfaları: `/rehau-*`, `/fraenkische-*`, `/vesbo-*`, `/kalde-*`, `/hofmann-gazli-civi-cakma-sistemleri/`
- Markalar: `/marka/{rehau, fraenkische, danfoss, wavin, grundfos, giacomini, buderus, viessmann, ...}/` (40 adet), `/marka-listesi/`
- Ürün: 97 adet (örnek: `/rehau-rautherm-s-pe-xa-boru-17x2-mm-oksijen-bariyerli-500m-kangal-P623`)

**Statik / yasal / SEO** (`/sayfa/...`)
`hakkimizda`, `gizlilik-politikasi`, `mesafeli-satis-sozlesmesi`, `iptal-ve-iade-sartlari`, `kisisel-verilerin-korunmasi-kanunu`, `teslimat-politikasi`, `rehau-bayi`, ve 7 yerel SEO sayfası: `arnavutkoy-`, `silivri-`, `catalca-`, `zeytinburnu-`, `atasehir-`, `avcilar-`, `bagcilar-yerden-isitma`

**Blog**: `/bloglar/`, `/bloglar/kategori/yerden-isitma/`, 5 yazı (`yerden-isitma-mi-radyator-mu-daha-ekonomik-ve-verimli`, `yerden-isitma-sistemi-nedir-nasil-calisir`, `yerden-isitma-m2-fiyati-nasil-hesaplanir`, `yerden-isitma-nasil-yapilir`, `yerden-isitma-dogalgaz-tuketimini-dusurur-mu`)

**Hesap / araçlar**: `/uye-girisi/`, `/uyelik/`, `/hesabim/favoriler/`, `/sepet/`, `/siparis-takip/`, `/karsilastirmalar/`, `/odeme-bildirimi/`, `/hesap-numaralarimiz/`, `/iletisim/`, `/sss/`, `/foto-galeri/`, `/video-galeri/`, `/magazalarimiz/`, `/bildirimler/`

> [!IMPORTANT]
> Sitemap'te görünmeyen ama linklenen sayfalar var (`/magazalarimiz/`, `/bildirimler/`, `/iletisim/`). Ürün ID'leri P722'ye kadar gidiyor ama sitemap'te 97 ürün var. Yani **ürün sayısının tamamı henüz doğrulanmadı**, kategori sayfalarını gezerek tamamlanacak (Faz 1).

## 3. Sayfa Şablonları (7 adet)

Tüm sayfalar aynı iskeleti paylaşır: **Üst bant → Header → Mega menü → İçerik → Kayan yazı → Güven kutuları → Footer**.

| # | Şablon | Kullanıldığı yerler | Orijinal ana CSS sınıfı |
|---|---|---|---|
| T1 | Ana sayfa | `/` | `header-main-div`, `slider-main-div`, `urunler-module-main-div`, ... |
| T2 | Kategori / Marka listesi | 68 kategori + 40 marka | `cat-detail-main-div` (`cat-left-main` filtre, `cat-right-main` ürün ızgarası) |
| T3 | Ürün detay | 97 ürün | `urun-detay-main` (`-sol-alan` galeri, `-sag-alan` bilgi, `-desc-main` sekmeler) |
| T4 | Statik / HTML sayfa | 14 sayfa + hakkımızda | `page-banner-main` + `htmlpage-container-main` |
| T5 | Blog liste / detay | `/bloglar/`, 5 yazı | `bloglar-container-main`, `commentfull-div-main` |
| T6 | Form / hesap sayfaları | giriş, üyelik, sipariş takip, ödeme bildirimi, iletişim, sss | `iletisim-container-main`, `sss-faq-container-main`, `register-page-...` |
| T7 | Galeri / liste | foto, video, marka-listesi, hesap numaraları | `fotogaleri-`, `videolar-`, `markadetay-`, `banka-hesap-main-box` |

### 3.1 Ana sayfa bölüm sırası (yukarıdan aşağıya)
1. Üst bant (sarı, ücretsiz kargo duyurusu)
2. Üst menü + Header (logo, arama, sipariş takip, şubeler, üyelik, sepet) + mega menü
3. `story-main-div`: kategori "story" daireleri (yatay kaydırma)
4. `slider-main-div`: hero slider (%10 indirim kampanyası + WhatsApp butonu)
5. `ticaret-kutulari-main-div`: güven kutuları (güvenli ödeme, garanti, iade, aynı gün kargo)
6. `marquee-container`: kayan yazı ("Tüm Siparişlerde Ücretsiz Kargo")
7. `urunler-module-main-div`: sekmeli ürün vitrini (Yeni, Çok İncelenenler, İndirimdekiler, Fırsat, Bizim Önerimiz, Anında Kargo)
8. `marka-module-main-div`: marka logoları kayan şeridi
9. `firsatlar-urun-module-main-div`: "Fırsatlar Dünyası" (en çok satanlar, yeni gelenler karuselleri)
10. `group-urun-module-main-div`: büyük kategori görselleri (Tesisat, Yerden Isıtma, Pompalar) + kombi ve klima banner'ları + marka şeritleri + Armatür bannerı
11. `product-categories-main-div-vitrin2`: Kategori banner grid'leri (Yangın, Doğalgaz, Boyler, Sıhhi tesisat)
12. `video-block` + `about-module-main-div-boxed`: video ve "Özel teklif al" kutusu (WhatsApp)
13. `kayan-banner-main`: tam genişlik kargo bandı
14. `product-categories-main-div`: "En çok tercih edilenler" kategori kutuları
15. `yorumlar-module-main-div`: müşteri yorumları + `counter-module-main-div` sayaçlar
16. `bloglar-module-main-div`: son 3 blog yazısı
17. SEO metni (uzun, başlıklı)
18. `bultenn-module-main-div`: e-bülten aboneliği
19. Güven kutuları + Footer (5 kolon + ödeme logoları)

### 3.2 Ürün detay sayfası
Breadcrumb, sol: küçük resim şeridi + büyük görsel + WhatsApp yüzen buton. Sağ: başlık, yıldız, "17:00'ye kadar aynı gün kargo", favori ve karşılaştır butonları, Marka / Stok Kodu / Stok Durumu / Kargo ücreti tablosu, değişim bilgi kutusu, fiyat (TL), "Taksit seçeneklerini görün", adet seçici, **SEPETE EKLE** (mavi), **WHATSAPP'TAN SİPARİŞ** (açık yeşil). Altında sekmeler (**Ürün Açıklaması**, **Taksit Seçenekleri**) ve "İlginizi çekebilecek diğer ürünler".

### 3.3 Kategori sayfası
Breadcrumb, H1, kısa SEO paragrafı. Sol kenar: "Sadece" (Ücretsiz Kargo, Hızlı Gönderi) ve "Markalar" onay kutuları. Sağ: sıralama (A-Z, Artan Fiyat, Azalan Fiyat, Yeni Ürünler, En Çok İncelenenler), 3 görünüm düğmesi, 4 sütunlu kart ızgarası. Altında uzun SEO metni (başlıklar H2/H3).

## 4. Tasarım Sistemi

> [!NOTE]
> Değerler `style.css`, `site_style.css` ve Playwright `getComputedStyle` ölçümlerinden alındı. Kesin değerler Faz 1'de her bileşen için ayrıca ölçülecek.

### 4.1 Renkler
| Rol | Değer |
|---|---|
| Üst duyuru bandı | `#ffbf00` (sarı), metin koyu |
| Üst menü / bilgi çubuğu, güven kutuları | `#013f5e` (koyu mavi) |
| Arama butonu, ürün kartı "SEPETE EKLE", sepet ikonu rengi | `#034b26` (koyu yeşil) |
| Ürün detay "SEPETE EKLE" | `#2b57a2` (mavi) |
| WhatsApp | yeşil, `#25d366` tonu (doğrulanacak) |
| Yıldız | `#ffbf00` |
| Metin | `#212529`, ikincil `#666`, `#999` |
| Kenarlık / arka plan | `#ebebeb`, `#f8f8f8`, `#fff` |

### 4.2 Tipografi (Google Fonts)
| Kullanım | Font |
|---|---|
| Gövde | Poppins (body), Open Sans (container) |
| Arayüz (butonlar, arama, kartlar) | **Outfit** |
| Başlıklar (H1, H2) | **DM Sans**, H1 40px / 500, H2 32px / 500 |
| Diğer yüklenenler (muhtemelen kullanılmıyor) | Roboto, Inter, Oswald, Karla, Mulish, Cormorant, Caveat |

### 4.3 Ölçüler ve bileşenler
- Arama kutusu: tam yuvarlak (`border-radius:100px`), 43px yükseklik, içinde yeşil yuvarlak buton
- Butonlar: 4px yarıçap, 15px padding, 15px / 500
- Ürün kartı: ortalı görsel, yıldız, marka (küçük, yeşil), ad (3 satıra kadar), fiyat (kalın), tam genişlik yeşil buton, hafif gölgeli ve yuvarlak köşeli kutu
- Breakpoint'ler: 600, 767, 1000, 1024, 1151, 1279 px (Bootstrap 5 ile eşleştirip sadeleştireceğiz)

## 5. Önerilen Teknoloji (onay bekliyor)

| Katman | Öneri | Gerekçe |
|---|---|---|
| Çatı | **Next.js (App Router) + TypeScript** | SEO (SSR/SSG), hızlı, orijinalin yavaşlığını çözer |
| Stil | **Tailwind CSS** + CSS değişkenleri (tasarım token'ları) | Token'ları tek yerde tutar |
| Veri | **Supabase** (Postgres) | Hesapta zaten bağlı Supabase MCP var; ürün, kategori, marka, blog tabloları |
| Karusel | Swiper (orijinaldekiyle aynı) | Davranış benzerliği |
| Hesap / sepet | Supabase Auth + sepet (localStorage + DB) | Orijinal akışı karşılar |
| Ödeme | **Belirsiz** | Orijinalde `/paymentstep` var ama sağlayıcı belirlenmedi |

Alternatif: statik HTML + Vanilla JS. Daha hızlı kurulur ama 97 ürün ve 108 listeleme sayfası için bakımı zor.

## 6. Veri Modeli (taslak)

`categories` (id, slug, parent_id, title, h1, meta_title, intro, seo_html, image) · `brands` (id, slug, name, logo) · `products` (id, slug, legacy_id `P###`, sku, name, brand_id, price_try, stock_status, free_shipping, same_day_shipping, description_html, meta_title) · `product_images` · `product_categories` · `blog_posts` · `pages` (statik + yerel SEO) · `testimonials` · `banners` (slider, kategori görselleri) · `menu_items` · `bank_accounts` · `stores`.

**Veri kaynağı**: ürün ve kategori sayfalarını `_recon/` içine toplayıp ayrıştırmak (scraper). Görseller `images/...` yolundan indirilecek.

## 7. Uygulama Fazları

### Faz 0 – Hazırlık (tamamlandı)
- [x] Sitemap, robots, ana sayfa, 23 şablon sayfası ve CSS dosyaları indirildi (`_recon/`)
- [x] Ana sayfa, kategori ve ürün sayfası ekran görüntüleri alındı
- [x] Bu plan

### Faz 1 – Eksik keşif (kod yazmadan önce)
1. Tüm 97 ürün + 108 liste sayfasını indir, ürün sayısını ve eksikleri doğrula
2. Mobil (390px) ve tablet (768px) ekran görüntüleri: ana sayfa, kategori, ürün, header menüsü
3. Mega menü açık halinin görüntüsü, hover davranışı
4. Sepet dolu hali, sipariş adımları (`/odeme`, `/paymentstep`), taksit tablosu, üyelik formları alanları
5. Tüm bileşenler için ölçülen CSS (header yüksekliği, kart ölçüleri, gölgeler, ikon seti)
6. Logo, favicon, banner ve ürün görsellerini toplu indir (`images/` klasörü)
7. Ana sayfa slider ve banner'ların kaynak görselleri ve bağlantı hedefleri
8. 404 sayfası, boş kategori, arama sonuç sayfası (`/arama/`)

### Faz 2 – Temel kurulum
Proje iskeleti, tasarım token'ları, fontlar, global layout (üst bant, header, mega menü, footer, WhatsApp yüzen buton, güven kutuları, kayan yazı).

### Faz 3 – Ortak bileşenler
Ürün kartı, yıldız, fiyat, sepet butonu, breadcrumb, sayfa banner'ı, SEO metin bloğu, marka şeridi, Swiper karusel, filtre paneli, sıralama.

### Faz 4 – Sayfalar (öncelik sırasıyla)
1. Ana sayfa (T1)
2. Kategori / marka (T2)
3. Ürün detay (T3)
4. Statik + yerel SEO sayfaları (T4)
5. Blog (T5)
6. İletişim, sss, sipariş takip, ödeme bildirimi, hesap numaraları, galeriler (T6, T7)
7. Üyelik, giriş, favoriler, karşılaştırma, sepet

### Faz 5 – İşlevsellik
Arama, filtre ve sıralama, sepet, WhatsApp sipariş ve teklif linkleri, e-bülten, üyelik, (ödeme: karar sonrası).

### Faz 6 – SEO ve eşleme
Birebir aynı URL yapısı (`/…-P{id}`, `/marka/…`, `/sayfa/…`), title/meta, JSON-LD, sitemap, robots, 301 yönlendirmeleri.

### Faz 7 – Doğrulama
Ekran görüntüsü karşılaştırması (orijinal vs yeni, masaüstü + mobil), Lighthouse, bağlantı kontrolü.

## 8. Riskler

| Risk | Etki | Önlem |
|---|---|---|
| Orijinal site yavaş, toplu indirme uzun sürer | Faz 1 uzar | Paralel ve yavaş istek, önbellek |
| Ödeme / sipariş arka ucu görünmüyor | Sepet ve ödeme birebir olmaz | Önce ödeme sağlayıcısı kararı |
| Ürün sayısı tam doğrulanmadı | Eksik katalog | Kategori sayfalarını sayfa sayfa gezmek |
| Menüde ölü bağlantılar | Yeni sitede kırık menü | Karar: Bölüm 9 |
| Telif / içerik | Marka logoları, ürün görselleri, metinler | Müşterinin kendi sitesi ise sorun yok. Değilse metin ve görselleri değiştir |

## 9. Kararlar (kullanıcıdan onay gerekiyor)

1. **Teknoloji**: Next.js + Tailwind + Supabase (öneri) mi, yoksa statik HTML mi?
2. **Kapsam**: "Aynısı" mı (ölü menü girişleri dahil birebir), yoksa "çok benzeri" mi (ölü menüler temizlenir, yavaşlık ve JS hataları düzeltilir)?
3. **Sepet ve ödeme**: Gerçek çalışacak mı (hangi sağlayıcı?), yoksa şimdilik vitrin + WhatsApp sipariş mi?
4. **Veri**: Ürün ve kategori içerikleri siteden otomatik çekilsin mi, yoksa müşteriden Excel/DB mi gelecek?
5. **Dil/para birimi**: Sadece TRY mi, USD/EUR/GBP seçici çalışsın mı?

## 10. Toplanan Ham Veri (`_recon/`)

| Dosya / klasör | İçerik |
|---|---|
| `urls.txt` | 226 URL'lik sitemap listesi |
| `home.html`, `pages/*.html` | Ana sayfa + 23 şablon örneği (ham HTML) |
| `css/` | `style.css` (273 KB), `site_style.css`, `responsive.css`, `modules_style.css`, `theme.js`, `custom.js` |
| `shots/` | `home-desktop.png`, `category-desktop.png`, `product-desktop.png` |
| `robots.txt`, `sitemap.xml`, `custom_sitemaps.xml` | Sitemap kaynakları |
