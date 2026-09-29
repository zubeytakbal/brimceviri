# Yıllık güncelleme takvimi

Bu dosya, her yıl değişen resmi değerlere dayanan araçları tek yerde toplar. Hatırlatmalar otomatik gelir:
her gece çalışan kontrol (`/api/cron/kaynak-kontrol`) aşağıdaki tarihlerde GitHub'da bir issue açar ve GitHub
bunu e-postayla size gönderir. Güncelleme yapılmazsa sayfalar yeni yılda ziyaretçiye "bu hesaplama geçen yılın
değerlerini kullanıyor" uyarısı gösterir; yanlış sonuç sessizce yayında kalmaz.

**Yapmanız gereken:** Issue e-postası geldiğinde Claude'a "yıllık güncellemeyi yap" demeniz yeterli. Her araçta
değişen sayılar tek bir dosyada toplu durur; güncelleme resmi kaynak kontrolüyle birlikte kısa bir iştir.

> Ön koşul: Vercel ortam değişkenlerinde `GITHUB_ISSUE_TOKEN` ve Upstash Redis tanımlı olmalı; yoksa
> hatırlatma issue'ları açılmaz (sayfa uyarıları yine çalışır).

| Ne zaman | Araç | Ne değişir | Kaynak | Dosya |
|---|---|---|---|---|
| Aralık sonu | Brütten nete maaş | Asgari ücret, SGK tavanı, gelir vergisi dilimleri | Asgari Ücret Tespit Komisyonu, Resmî Gazete (GVK md. 103) | `app/converter/turkishMaas.ts`, `app/converter/turkishTazminat.ts` |
| Aralık sonu | Kıdem ve ihbar tazminatı | Ocak kıdem tavanı, gelir vergisi dilimleri | Mali ve Sosyal Haklar Genelgesi, ÇSGB | `app/converter/turkishTazminat.ts` |
| Temmuz başı | Kıdem tazminatı | Temmuz kıdem tavanı | Mali ve Sosyal Haklar Genelgesi | `app/converter/turkishTazminat.ts` |
| Yıl içinde | Brütten nete maaş | Asgari ücrete ara zam yapılırsa | Resmî Gazete | `app/converter/turkishMaas.ts` |
| Kasım ortası | Brutto-Netto-Rechner (DE) | Lohnsteuer-PAP, Sozialversicherung, Zusatzbeitrag | BMF, SVBezGrV | `app/converter/germanBruttoNetto.ts` |
| Kasım ortası | Pendlerpauschale (DE) | km başına tutar | EStG | `app/converter/germanWork.ts` |
| Kasım ortası | Grunderwerbsteuer (DE) | Eyalet oranları | Eyalet yasaları | `app/converter/germanKaufnebenkosten.ts` |
| Kasım ortası | Arbeitszeitrechner (DE) | ArbZG reformu yasalaştı mı | BMAS | `app/converter/germanArbeitszeit.ts` |
| Haziran | Brückentage (DE) | Yeni yıl sayfası | Eyalet tatilleri (hesaplanıyor) | `app/i18n/germanBrueckentage.ts` |

Değişmeyen (bakım gerektirmeyen) araçlar: altın hesaplama (Darphane ağırlıkları sabit), Mutterschutz,
Kündigungsfrist, birim çevirileri, takvim ve saat araçları.

Hatırlatma listesinin kendisi: `app/converter/annualUpdates.ts`.
