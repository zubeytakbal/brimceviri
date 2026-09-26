# Birim Çeviri

Çok dilli birim çevirme ve hesaplama sitesi. Next.js (App Router) ile yazılmıştır ve Vercel üzerinde çalışır.

## Kurulum

```bash
npm install
npm run dev      # http://localhost:3000
```

## Komutlar

| Komut | Açıklama |
| --- | --- |
| `npm run dev` | Geliştirme sunucusu |
| `npm run build` | Üretim derlemesi |
| `npm run lint` | ESLint |
| `npm test` | Birim testleri (Vitest) |
| `npx tsc --noEmit` | Tip kontrolü |

Değişiklikleri push'lamadan önce `npm run lint`, `npx tsc --noEmit` ve `npm test` komutlarının temiz geçtiğinden emin olun.

## Klasör yapısı

- `app/converter/`: Çeviri ve hesaplama mantığı. `convert.ts` ana çeviri fonksiyonudur, birim katsayıları ise `unitRegistry.ts` içinde tutulur.
- `app/components/`: Hesaplayıcı arayüz bileşenleri.
- `app/<dil>/`: Dile özel sayfalar (`en`, `de`, `ar`, `uz`, `bn`, `fr`, `es`, `pt`, `it`, `nl`, `sv`, `no`, `da`). Kök dizindeki sayfalar Türkçedir.
- `app/api/`: Genel API (`/api/v1/convert`, `/api/v1/categories`) ve cron işleri.
- `browser-extension/`, `google-sheets-addon/`: Ek istemciler.
- `tests/`: Vitest birim testleri.

## Çeviri kalite testi

`tests/i18n/` her dilin görünen metinlerini tarar:

- Özel harfleri bozulmuş yazımlar (`forbiddenWords.json`, örn. "langd" yerine "längd") metinde geçmemeli.
- Aynı kelimede İskandinav ve Türkçe harfler karışmamalı.
- Bir dilin bölümüne yeni çevrilmemiş İngilizce metin eklenmemeli. Bugün var olan çevrilmemiş metinler `englishBaseline.json` dosyasında listelidir; bu liste yalnızca küçülmeli. Bir metni çevirdikten sonra listeyi `UPDATE_I18N_BASELINE=1 npx vitest run tests/i18n` ile güncelleyin.

## Birim eklerken

`unitRegistry.ts` dosyasına yeni birim eklerken `siFactor` değerine yuvarlanmış bir sayı değil, tanımdaki kesin değer yazılmalıdır (örneğin US galon = `0.003785411784` m³). `tests/convert.test.ts` testleri id ve sembol çakışmalarını, geçersiz katsayıları ve gidiş-dönüş çevrim hatalarını otomatik olarak yakalar.
