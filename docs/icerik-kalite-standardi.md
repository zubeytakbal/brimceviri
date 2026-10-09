# İçerik kalite standardı

Bu sitede sayfa sayısı artırılmaz, var olan sayfalar iyileştirilir. Hiçbir sayfa kalite gerekçesiyle `noindex` yapılmaz; zayıf sayfa düzeltilir. Bu belge "iyi sayfa"nın ne olduğunu ve iyileştirme işinin nasıl yürüdüğünü tanımlar.

## Ziyaretçi testi

Her sayfa şu dört soruya "evet" demelidir:

1. Ziyaretçi aradığı sonucu ilk ekranda, hesaplayıcı veya kısa bir cevapla alıyor mu?
2. Sonucun nasıl bulunduğunu (formül, katsayı, yöntem) görebiliyor mu?
3. Sayfada başka bir sitede kelimesi kelimesine bulamayacağı bir şey var mı? Hesaplanmış bir tablo, gerçek sayılarla çözülmüş bir örnek, yerel bir kural ya da sık yapılan bir hata gibi.
4. Sayfa o dilde yazılmış gibi okunuyor mu? Çeviri kokan cümleler, başka dilden kalmış örnekler ve yanlış birim alışkanlıkları (ör. Almanca sayfada ABD galonu ile örnek) olmamalı.

## Sayfa türlerine göre zorunlu bölümler

| Sayfa türü | Olması gerekenler |
| --- | --- |
| Çevirme sayfası (ör. cm → inç) | Tek cümlelik net cevap, kesin katsayı ve formül, gerçek sayılarla en az iki örnek, hesaplanmış çevrim tablosu, birimin nerede kullanıldığı, ters çevirme ve ilgili birimlere link |
| Hesaplayıcı | Ne hesapladığı ve hangi varsayımla, girdilerin anlamı, adım adım çözülmüş bir örnek, sonucu yorumlama, sınırlar ve sık yapılan hatalar, kaynak (sağlık, hukuk, mali konularda zorunlu) |
| Kategori ve araç merkezi (hub) | Sadece link listesi olamaz. Kategorinin ne işe yaradığını anlatan giriş, araçları amaca göre gruplayan kısa açıklamalar, "hangi aracı seçmeliyim" rehberi, sık sorulan bir iki soru |
| Rehber ve kaynak sayfası | Somut bir soruya cevap, tablo veya karşılaştırma, kaynak, siteye özgü bir değer (hesaplanmış veri, yerel bağlam) |

## Otomatik denetim

`npm run build` sonunda `scripts/qualityGuard.ts` dizine açık her sayfayı ölçer:

| Kusur | Kural | Nasıl düzeltilir |
| --- | --- | --- |
| `ozgun-metin` | Sayfaya özgü metin 1.500 karakterin altında. Aynı dildeki sayfaların %2'sinden fazlasında tekrar eden cümleler (ortak bloklar, sabit uyarılar) sayılmaz. | Yukarıdaki tablodaki eksik bölümleri ekleyin. Başka sayfadan kopyalanan paragraf işe yaramaz, ortak kalıp olarak sayılmaz. |
| `link-yigini` | `<main>` metninin yarısından fazlası link metni. | Linkleri gruplayıp her gruba açıklama yazın; "hangisini ne zaman kullanmalı" bölümü ekleyin. |
| `yapi` | `<h1>` tam bir tane değil ya da ikiden az `<h2>` var. | İçeriği anlamlı `<h2>` bölümlerine ayırın (Nasıl hesaplanır, Örnek, Tablo, Sık sorulanlar). |
| `meta` | Açıklama yok ya da aynı dilde başka sayfanın başlığı/açıklamasıyla aynı. | Sayfaya özgü başlık ve açıklama yazın. |

Bugünkü kusurlar `scripts/qualityBaseline.json` dosyasında listelidir. Bu liste yalnızca küçülür:

- Listede olmayan yeni bir kusur (yeni sayfa veya mevcut sayfada gerileme) build'i durdurur.
- Bir sayfa düzeltildiğinde build uyarı verir. Listeyi küçültmek için `UPDATE_QUALITY_BASELINE=1 npx tsx scripts/postbuild.ts` çalıştırılır ve değişen liste aynı commit'e eklenir.

Otomatik denetim alt sınırdır, kalite tanımı değildir. 1.500 karakteri geçen ama ziyaretçi testinden kalan sayfa da düzeltilmelidir. Karakter sayısını doldurmak için yazılan dolgu metin, tekrar eden cümleler veya anahtar kelime yığını kabul edilmez.

## İyileştirme akışı

1. `npm run build` ve ardından `npm run quality` çalıştırın. Rapor dillere göre özeti ve en zayıf sayfaları verir. Belirli bir dil için `npm run quality -- de 100`, bütün liste için `npm run quality -- --csv rapor.csv`.
2. Her seferinde tek bir dilden ve tek bir sayfa türünden 10–20 sayfalık bir grup seçin. Önce en çok kusuru olanlar, sonra trafik alan sayfalar (Search Console'da gösterim alıp tıklanmayanlar) gelir.
3. Sayfaları yukarıdaki zorunlu bölümlere göre tamamlayın. Sayılar koddan hesaplanmalıdır (`convert`, `unitRegistry`), elle yazılmamalıdır.
4. Build'i çalıştırın, listeyi küçültün, grubu tek commit olarak gönderin.

## AdSense açısından

Google "düşük değerli içerik" kararını sitenin bütününe bakarak verir. Bu yüzden önce en zayıf sayfalar (ince sayfa denetiminde bekleyenler ve link yığını olan merkez sayfaları), sonra özgün metni en düşük diller ele alınır. Başvurudan önceki haftalarda toplu sayfa eklenmez.
