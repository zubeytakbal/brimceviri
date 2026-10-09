# Birim Çeviri

Çok dilli birim çevirme ve hesaplama sitesi. Next.js (App Router) ile yazılmıştır. Tamamen statik bir site olarak derlenir (`output: "export"`) ve ücretsiz olarak Cloudflare Pages üzerinde barındırılır; sunucu tarafı kod veya API yoktur.

## Kurulum

```bash
npm install
npm run dev      # http://localhost:3000
```

## Komutlar

| Komut | Açıklama |
| --- | --- |
| `npm run dev` | Geliştirme sunucusu |
| `npm run build` | Statik derleme (`out/` klasörüne) |
| `npm start` | `out/` klasörünü yerelde sunar |
| `npm run lint` | ESLint |
| `npm test` | Birim testleri (Vitest) |
| `npx tsc --noEmit` | Tip kontrolü |

Değişiklikleri push'lamadan önce `npm run lint`, `npx tsc --noEmit` ve `npm test` komutlarının temiz geçtiğinden emin olun.

## Yayınlama (Cloudflare Pages)

`main` dalına her push'ta ve her gün 03:15 UTC'de `.github/workflows/deploy.yml` siteyi derleyip Cloudflare Pages'e yükler. Günlük derleme döviz, altın ve akaryakıt fiyatlarını ve tarihe bağlı sayfaları tazeler. Depo ayarlarında iki sır tanımlı olmalıdır: `CLOUDFLARE_API_TOKEN` ve `CLOUDFLARE_ACCOUNT_ID`.

Statik sitede sunucu olmadığı için yeni bir özellik eklerken API route, `revalidate`, `cookies()`/`headers()` veya istek anında çalışan kod kullanılmamalıdır; dinamik adresli sayfalar `generateStaticParams` ile üretilmelidir.

## Klasör yapısı

- `app/converter/`: Çeviri ve hesaplama mantığı. `convert.ts` ana çeviri fonksiyonudur, birim katsayıları ise `unitRegistry.ts` içinde tutulur.
- `app/components/`: Hesaplayıcı arayüz bileşenleri.
- `app/<dil>/`: Dile özel sayfalar (`en`, `de`, `ar`, `uz`, `bn`, `fr`, `es`, `pt`, `it`, `nl`, `sv`, `no`, `da`). Kök dizindeki sayfalar Türkçedir.
- `app/siteRedirects.ts`: Eski adreslerden yönlendirmeler. `npm run build` sonrasında `out/_redirects` dosyasına yazılır.
- `scripts/`: Derleme sonrası ve GitHub Actions betikleri.
- `tests/`: Vitest birim testleri.

## Çeviri kalite testi

`tests/i18n/` her dilin görünen metinlerini tarar:

- Özel harfleri bozulmuş yazımlar (`forbiddenWords.json`, örn. "langd" yerine "längd") metinde geçmemeli.
- Aynı kelimede İskandinav ve Türkçe harfler karışmamalı.
- Bir dilin bölümüne yeni çevrilmemiş İngilizce metin eklenmemeli. Bugün var olan çevrilmemiş metinler `englishBaseline.json` dosyasında listelidir; bu liste yalnızca küçülmeli. Bir metni çevirdikten sonra listeyi `UPDATE_I18N_BASELINE=1 npx vitest run tests/i18n` ile güncelleyin.

## İçerik kalitesi

Sayfa sayısı artırılmaz, var olan sayfalar iyileştirilir. Standart ve iyileştirme akışı `docs/icerik-kalite-standardi.md` dosyasındadır. `npm run build` sonunda ince sayfa, şablon kopyası ve içerik kalite denetimleri çalışır; `npm run quality` en zayıf sayfaların öncelik listesini verir.

## Birim eklerken

`unitRegistry.ts` dosyasına yeni birim eklerken `siFactor` değerine yuvarlanmış bir sayı değil, tanımdaki kesin değer yazılmalıdır (örneğin US galon = `0.003785411784` m³). `tests/convert.test.ts` testleri id ve sembol çakışmalarını, geçersiz katsayıları ve gidiş-dönüş çevrim hatalarını otomatik olarak yakalar.
