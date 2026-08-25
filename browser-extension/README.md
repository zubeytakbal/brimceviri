# BirimCeviri.app Tarayıcı Eklentisi

Herhangi bir web sayfasında bir değeri seçip sağ tıklayarak veya araç çubuğu simgesinden birim çevirisi yapmanı sağlar. [BirimCeviri.app](https://www.birimceviri.app)'in genel dönüşüm API'sini (`/api/v1/convert`) kullanır.

## Yerel olarak yükleme (paketlenmemiş uzantı)

Bu eklenti henüz Chrome Web Store'da yayınlanmadı — mağazaya yayınlamak Google geliştirici hesabı ve inceleme süreci gerektirir, bu adım ayrıca yapılmalı. Şimdilik "paketlenmemiş uzantı" olarak yükleyebilirsin:

1. Chrome veya Edge'de `chrome://extensions` (Edge'de `edge://extensions`) adresine git.
2. Sağ üstten "Geliştirici modu"nu aç.
3. "Paketlenmemiş öğe yükle"ye tıkla.
4. Bu klasörü (`browser-extension/`) seç.

## Özellikler

- **Araç çubuğu popup'ı:** Simgeye tıklayınca açılan, kategori/birim/değer seçilebilen bir dönüştürücü.
- **Sağ tık menüsü:** Herhangi bir sayfada bir metni seçip sağ tıkladığında "BirimCeviri ile çevir" seçeneği çıkar. Seçim "5 kg" gibi bir sayı+birim içeriyorsa, popup bu değerlerle önceden doldurulmuş açılır.

## Dosyalar

- `manifest.json` — Manifest V3 tanımı.
- `popup.html` / `popup.css` / `popup.js` — araç çubuğu popup arayüzü.
- `background.js` — sağ tık menüsünü kaydeden ve seçili metni ayrıştıran service worker.
- `config.js` — API taban URL'si (yerel test için `http://localhost:3000` olarak değiştirilebilir).
- `icons/` — 16/48/128px simgeler.

## Kapsam dışı (bilinçli)

- Firefox/Safari sürümleri (ayrı manifest formatı gerektirir).
- Chrome Web Store'a fiili yayınlama.
- Sayfaya otomatik gömülen (content script gerektiren) gelişmiş özellikler.
