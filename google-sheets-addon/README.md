# BirimCeviri.app Google E-Tablolar Eklentisi

Google E-Tablolar (Google Sheets) içinde `=BIRIMCEVIR(...)` gibi özel
fonksiyonlarla birim dönüşümü yapmanı sağlar. [BirimCeviri.app](https://www.birimceviri.app)'in
genel dönüşüm API'sini (`/api/v1/convert`) kullanır.

## Kurulum (kopyala-yapıştır)

Bu eklenti henüz Google Workspace Marketplace'te yayınlanmadı — resmi
mağazaya yayınlamak bir Google Cloud projesi, OAuth doğrulaması ve
inceleme süreci gerektirir, bu adım ayrıca yapılmalı. Şimdilik
kendi e-tablona ekleyerek kullanabilirsin:

1. Google E-Tablolar'da bir sayfa aç (yeni veya mevcut).
2. Üst menüden **Uzantılar > Apps Script**'i aç.
3. Açılan editördeki varsayılan kodu sil, bu klasördeki `Code.gs`
   dosyasının tüm içeriğini yapıştır.
4. Sol üstteki 💾 (Kaydet) simgesine tıkla.
5. E-Tablolar sekmesine dön, herhangi bir hücreye `=BIRIMCEVIR(5, "kutle", "kg", "lb")`
   yaz — ilk çalıştırmada Google yetkilendirme isteyecektir
   (harici bir siteye istek attığı için normaldir), izin ver.

## Fonksiyonlar

- **`=BIRIMCEVIR(deger, kategori, kaynakBirim, hedefBirim)`** — bir
  değeri bir birimden diğerine çevirir.
  Örnek: `=BIRIMCEVIR(100, "sicaklik", "C", "F")` → 212

- **`=BIRIMCEVIR_BIRIMLER(kategori)`** — bir kategorideki geçerli
  birim sembollerini ve adlarını listeler (hangi kısaltmayı
  yazacağını bulmak için).
  Örnek: `=BIRIMCEVIR_BIRIMLER("kutle")`

- **`=BIRIMCEVIR_KATEGORILER()`** — kullanılabilir tüm kategori
  kodlarını listeler (`kutle`, `uzunluk`, `sicaklik`, `alan` gibi).

## Neden kategori zorunlu?

Bazı birim sembolleri kategoriler arası çakışıyor — örneğin `F` hem
Fahrenheit (sıcaklık) hem Farad (kapasitans) anlamına gelebilir, `C`
hem Celsius hem Coulomb (elektrik yükü). Kategoriyi otomatik tahmin
etmeye çalışmak bu durumlarda sessizce yanlış sonuç üretebilirdi; bu
yüzden kategori parametresi bilerek zorunlu tutuldu.

## Performans notu

Her formül sonucu, aynı girdiler için 1 saat boyunca önbelleğe
alınır (`CacheService`) — bu hem tablo yeniden hesaplandığında hızlı
yanıt verir hem de API'ye gereksiz tekrar istek gitmesini önler.

## Kapsam dışı (bilinçli)

- Google Workspace Marketplace'e fiili yayınlama.
- Konteyner bağımlı (container-bound) otomatik kurulum sihirbazı.
- Birden fazla dilde (EN/DE) fonksiyon isimleri.
