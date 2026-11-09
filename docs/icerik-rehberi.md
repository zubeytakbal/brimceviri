# İçerik rehberi

Bu rehber birimceviri.app'teki her araç ve kategori sayfasının nasıl yazılacağını belirler.
Amaç: her sayfa, o konuyu bilen bir insanın elinden çıkmış gibi olmalı; şablondan
üretilmiş gibi değil. Yapı örneği Omni Calculator'ın sistemi; metin ve görünüm bizim.

## 1. Sayfanın iskeleti (sıra sabit)

1. **Sayfa yolu** — Ana sayfa › Grup › Sayfa
2. **Başlık (H1)** — sade: "Uzunluk Çevirici", "KDV Hesaplama"
3. **Araç** — her zaman yazıdan önce, ekranın üstünde
4. **İlgili araçlar** — 3–6 link, gerçekten ilgili olanlar
5. **Hazırlayan ve güncelleme tarihi**
6. **İçindekiler** — yalnızca 4'ten fazla bölüm varsa
7. **Makale** — bölümler aşağıdaki kurallara göre
8. **Popüler dönüşümler / tüm birimler** (birim sayfalarında)
9. **Sık sorulan sorular** — en sonda
10. **Kaynaklar**

İskelet sabittir; **bölüm başlıkları sabit değildir.**

## 2. Başlık kuralı: her sayfa kendi başlıklarını taşır

Şablon sitelerin en belirgin izi, her sayfada aynı başlıkların tekrar etmesidir
("X nedir?", "X nasıl hesaplanır?", "X'in kullanım alanları"). Bunu yapmıyoruz.

- Başlıklar konunun kendisinden çıkar: "İnç hayatımızın neresinde?", "Mil mi, deniz mili mi?"
- İki farklı sayfada aynı cümleyle başlayan başlık olmaz (yalnızca "Sık sorulan sorular" ve "Kaynaklar" ortak).
- Başlık bir soruysa, o soru gerçekten aranıyor olmalı (Search Console, Google önerileri).

## 3. Her sayfada en az bir "yalnızca burada" öğesi

Şunlardan en az biri olmalı ve sayfaya özel olmalı:

- hesaplanmış bir tablo (ör. 8×8 birim tablosu)
- Türkiye'ye özgü bir bilgi (tapu, eski ölçüler, mevzuat, yerel kullanım)
- gündelik bir örnek ve hesabı (55 inç televizyonun eni-boyu, lastik ebadının okunuşu)
- tarihçe ya da ilginç bir bilgi — ama sadece konuyu anlamaya yardım ediyorsa

## 4. Örnekler somut ve yerel olur

- Kötü: "Örnek: 5 metre = 16,4 fit."
- İyi: "Kalenin genişliği 7,32 metre; bu tam olarak 8 yarda. Rakam küsuratlı, çünkü kurallar İngiltere'de yarda ile yazılmış."

Örnekler okurun hayatından seçilir: alışveriş, ev, araba, tapu, okul, mutfak, spor.
Her sayı çeviricinin kullandığı değerle tutarlı olmalı.

## 5. "Neden"i anlat, kararları açıkla

- Bir değer neden küsuratlı, neden iki farklı tanımı var, çeviricide hangisini kullandık ve neden.
- Belirsiz bir değer varsa (ör. arşın bölgeye göre değişir) bunu saklama; hangi değeri seçtiğimizi yaz.

## 6. Dil

- Türkçe, sade, konuşur gibi ama ciddi. "Siz" yerine genel anlatım; gerektiğinde "biz" (site).
- Kısa paragraflar (2–4 cümle). Madde işareti yalnızca gerçekten liste olan şeylerde.
- Yasaklı kalıplar: "Bu yazımızda…", "…hakkında bilmeniz gereken her şey", "Sonuç olarak",
  "günümüzde birçok alanda kullanılmaktadır", "önemli bir yere sahiptir", boş giriş/kapanış cümleleri.
- Emoji yok. Ünlem yok.
- Sayılar Türkçe biçimde: 1.609,344 — ondalık virgül, binlik nokta.

## 7. Sık sorulan sorular

- 4–8 soru; Search Console'daki gerçek aramalardan seçilir ("1 inç kaç cm").
- Cevabın ilk cümlesi doğrudan sayıyı verir; ikinci cümle bir bağlam ekler.
- Sayfadaki SSS metni ile yapısal veri (FAQPage) birebir aynıdır.

## 8. Kaynak ve doğruluk

- Tanımlar ve kesin değerler resmî kaynağa dayanır (BIPM, NIST, Resmî Gazete, TSE, ilgili kurum).
- Kaynaklar sayfanın sonunda listelenir.
- Hesaplanan her sayı kodla üretilir (çevirici ile aynı fonksiyon); elle yazılan sayı kontrol edilir.

## 9. Dürüstlük

- Taslaklar yapay zekâ yardımıyla hazırlanır; editör (site sahibi) okur, düzeltir ve onaylar.
  Bu, editoryal politikada açıkça yazılır.
- Uydurma uzman, sahte yorum, sahte "kontrol eden" ismi kullanılmaz.
- Emin olunmayan bilgi yazılmaz.

## 10. Birleştirme kuralı

- Ayrı "birim rehberi" sayfası açılmaz. Birimin tanımı, tarihçesi ve kullanımı
  ilgili çevirici sayfasının içinde anlatılır; eski rehber sayfaları oraya 301 ile yönlenir.
- Çift sayfaları (ör. /uzunluk/inc-santimetre) yalnızca aranıyorsa kalır ve
  kendi sorusuna özel bilgi taşır; aranmayan çiftler ana çeviriciye yönlenir.
