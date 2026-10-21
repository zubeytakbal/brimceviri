"use client";

// Saat bölümünün saat hesaplayıcısı (Türkçe /saat-hesaplama): siyah başlıkta dört hesap: iki saat arası süre
// (gece yarısını geçen dahil), saate süre ekleme/çıkarma, birden çok süreyi toplama ve mesai (giriş, çıkış, mola →
// net çalışma, haftalık toplam). Sonuç Anton harflerle dev yazılır. Hesap tarayıcıda yapılır, hiçbir şey gönderilmez.
import { useState } from "react";

type Sekme = "arasi" | "ekle" | "topla" | "mesai";
const SEKMELER: Array<[Sekme, string]> = [
  ["arasi", "İki saat arası"],
  ["ekle", "Saate süre ekle"],
  ["topla", "Süre topla"],
  ["mesai", "Mesai hesapla"],
];

const iki = (n: number) => String(n).padStart(2, "0");
/** "08:30" → 510 */
const dakika = (s: string) => {
  const m = /^(\d{1,2}):(\d{2})$/.exec(s.trim());
  return m ? Number(m[1]) * 60 + Number(m[2]) : null;
};
/** 510 → "08:30" (gün içinde) */
const saatYaz = (dk: number) => {
  const m = ((dk % 1440) + 1440) % 1440;
  return `${iki(Math.floor(m / 60))}:${iki(m % 60)}`;
};
/** 465 → "7 sa 45 dk" */
const sureYaz = (dk: number) => {
  const a = Math.abs(dk);
  const s = Math.floor(a / 60);
  const d = a % 60;
  return `${dk < 0 ? "−" : ""}${s ? `${s} sa` : ""}${s && d ? " " : ""}${d || !s ? `${d} dk` : ""}`;
};
const ondalik = (dk: number) => (dk / 60).toLocaleString("tr-TR", { maximumFractionDigits: 2 });

function SaatGirdi({ etiket, deger, degis }: { etiket: string; deger: string; degis: (v: string) => void }) {
  return (
    <label>
      <span>{etiket}</span>
      <input type="time" value={deger} onChange={(e) => degis(e.target.value)} />
    </label>
  );
}

function SayiGirdi({ etiket, deger, degis, en = 999 }: { etiket: string; deger: number; degis: (v: number) => void; en?: number }) {
  return (
    <label>
      <span>{etiket}</span>
      <input type="number" min={0} max={en} inputMode="numeric" value={deger} onChange={(e) => degis(Math.max(0, Math.min(en, Number(e.target.value) || 0)))} />
    </label>
  );
}

export default function SaatHesap() {
  const [sekme, setSekme] = useState<Sekme>("arasi");
  // İki saat arası
  const [bas, setBas] = useState("08:30");
  const [bit, setBit] = useState("17:45");
  // Süre ekle / çıkar
  const [saat, setSaat] = useState("09:45");
  const [ekSaat, setEkSaat] = useState(2);
  const [ekDk, setEkDk] = useState(30);
  const [cikar, setCikar] = useState(false);
  // Süre topla
  const [sureler, setSureler] = useState(["2:30", "1:45", "0:50"]);
  // Mesai
  const [giris, setGiris] = useState("09:00");
  const [cikis, setCikis] = useState("18:00");
  const [mola, setMola] = useState(60);
  const [gun, setGun] = useState(5);

  let buyuk = "";
  let alt = "";
  const a = dakika(bas);
  const b = dakika(bit);
  if (sekme === "arasi" && a !== null && b !== null) {
    const fark = (((b - a) % 1440) + 1440) % 1440;
    buyuk = sureYaz(fark);
    alt = `${bas} → ${bit}${b < a ? " (ertesi gün)" : ""} · ${fark.toLocaleString("tr-TR")} dakika · ${ondalik(fark)} saat`;
  }
  const s0 = dakika(saat);
  if (sekme === "ekle" && s0 !== null) {
    const delta = (ekSaat * 60 + ekDk) * (cikar ? -1 : 1);
    const t = s0 + delta;
    const gunFark = Math.floor(t / 1440);
    buyuk = saatYaz(t);
    alt = `${saat} ${cikar ? "−" : "+"} ${sureYaz(Math.abs(delta))}${gunFark > 0 ? ` · ${gunFark} gün sonra` : gunFark < 0 ? ` · ${-gunFark} gün önce` : ""}`;
  }
  const toplamlar = sureler.map((s) => dakika(s.includes(":") ? s : `${s}:00`));
  if (sekme === "topla") {
    const toplam = toplamlar.reduce<number>((t, d) => t + (d ?? 0), 0);
    buyuk = sureYaz(toplam);
    alt = `${toplamlar.filter((d) => d !== null).length} süre · ${toplam.toLocaleString("tr-TR")} dakika · ${ondalik(toplam)} saat${toplam >= 1440 ? ` · ${Math.floor(toplam / 1440)} gün ${sureYaz(toplam % 1440)}` : ""}`;
  }
  const g = dakika(giris);
  const c = dakika(cikis);
  if (sekme === "mesai" && g !== null && c !== null) {
    const brut = (((c - g) % 1440) + 1440) % 1440;
    const net = Math.max(0, brut - mola);
    buyuk = sureYaz(net);
    alt = `Günlük net çalışma (${sureYaz(brut)} − ${mola} dk mola) · haftada ${gun} gün: ${sureYaz(net * gun)} · ${ondalik(net * gun)} saat`;
  }

  return (
    <section className="saat-hero sh-hero">
      <div className="saat-hero-ic">
        <div className="saat-hero-ust">
          <div>
            <h1 className="saat-baslik">Saat hesaplama</h1>
            <p className="saat-ulke">İki saat arası süre, saate süre ekleme, süre toplama ve mesai hesabı</p>
          </div>
        </div>

        <div className="saat-eylemler sh-sekmeler" role="tablist" aria-label="Hesap türü">
          {SEKMELER.map(([k, ad]) => (
            <button key={k} type="button" role="tab" aria-selected={sekme === k} onClick={() => setSekme(k)}>
              {ad}
            </button>
          ))}
        </div>

        <p className="saat-dev sh-dev" aria-live="polite">
          {buyuk || "—"}
        </p>
        <p className="saat-alt">{alt}</p>

        <div className="uyku-kac-saat sh-girdiler">
          {sekme === "arasi" ? (
            <div className="uyku-kac-saat-satir">
              <SaatGirdi etiket="Başlangıç" deger={bas} degis={setBas} />
              <SaatGirdi etiket="Bitiş" deger={bit} degis={setBit} />
              <p>Bitiş saati başlangıçtan önceyse gece yarısını geçtiği kabul edilir (ör. 22:30 → 06:15 = 7 sa 45 dk).</p>
            </div>
          ) : null}
          {sekme === "ekle" ? (
            <div className="uyku-kac-saat-satir">
              <SaatGirdi etiket="Saat" deger={saat} degis={setSaat} />
              <SayiGirdi etiket="Saat" deger={ekSaat} degis={setEkSaat} />
              <SayiGirdi etiket="Dakika" deger={ekDk} degis={setEkDk} en={59999} />
              <label className="sh-secim">
                <span>İşlem</span>
                <select value={cikar ? "cikar" : "ekle"} onChange={(e) => setCikar(e.target.value === "cikar")}>
                  <option value="ekle">Ekle (+)</option>
                  <option value="cikar">Çıkar (−)</option>
                </select>
              </label>
            </div>
          ) : null}
          {sekme === "topla" ? (
            <div className="uyku-kac-saat-satir">
              {sureler.map((s, i) => (
                <label key={i}>
                  <span>{i + 1}. süre (sa:dk)</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={s}
                    placeholder="1:30"
                    aria-invalid={toplamlar[i] === null}
                    onChange={(e) => setSureler((l) => l.map((x, j) => (j === i ? e.target.value : x)))}
                  />
                </label>
              ))}
              <div className="saat-eylemler">
                <button type="button" onClick={() => setSureler((l) => [...l, "0:30"])}>
                  + Süre ekle
                </button>
                {sureler.length > 1 ? (
                  <button type="button" onClick={() => setSureler((l) => l.slice(0, -1))}>
                    − Sonuncuyu sil
                  </button>
                ) : null}
              </div>
            </div>
          ) : null}
          {sekme === "mesai" ? (
            <div className="uyku-kac-saat-satir">
              <SaatGirdi etiket="Giriş" deger={giris} degis={setGiris} />
              <SaatGirdi etiket="Çıkış" deger={cikis} degis={setCikis} />
              <SayiGirdi etiket="Mola (dk)" deger={mola} degis={setMola} en={600} />
              <SayiGirdi etiket="Haftada gün" deger={gun} degis={setGun} en={7} />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
