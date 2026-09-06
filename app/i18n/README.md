# i18n workflow

Bu klasor, siteyi cok dilli olarak buyutmek icin merkezi omurgayi tutar.

Yeni bir dil eklerken temel akisim:

1. `config.ts`
   Yeni locale kodunu `SUPPORTED_LOCALES` listesine ve `LOCALE_DEFINITIONS` icine ekle.

2. `contentRegistry.ts`
   O dilin `units`, `categories`, `calculators` ve `conversions` verilerini kaydet.

3. `routing.ts`
   Statik sayfa karsiliklarini ve koleksiyon bazli yol prefixlerini ekle.

4. `siteNavigation.ts`
   Header, footer, kategori etiketleri ve genel site metinlerini ekle.

5. Sayfa verileri
   Yeni locale icin localized page listelerini olustur ve ilgili route klasorlerini bagla.

Bu yapiyla header, footer, language switcher ve locale bazli URL cozumleme tek yerden yonetilir.
