// Kalite denetimi (Türkçe Tarih & Saat ve Hesaplamalar sayfaları): derlenmiş siteyi (out/) telefon genişliğinde
// (390 px) açar ve iki kuralı ölçer:
//   1. Okunurluk: görünen her yazının zeminiyle kontrastı yeterli mi (WCAG oranının %70'i altı hata sayılır).
//   2. Telefonda taşma: sayfa yana kayıyor mu; tablo kutusundan taşan tablo var mı. 7 ve daha fazla sütunlu veri
//      tabloları (ödeme planı, gezegen tablosu) kendi kutusunda kayabilir, bilgi olarak raporlanır.
// Kullanım: npm run build && npm run denetim. Hata varsa çıkış kodu 1'dir. Playwright gerekir (PLAYWRIGHT_YOLU ile
// başka bir kurulum gösterilebilir).
import { spawn } from "node:child_process";
import { readdirSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";
import { isHesapAraci } from "../app/components/hesap/hesapBolumu";
import { isSaatAraci, isSaatBolumu } from "../app/components/saat/saatBolumu";

const OUT = join(process.cwd(), "out");
const PORT = Number(process.env.DENETIM_PORT ?? 4599);
const DILLER = new Set(["en", "de", "ar", "uz", "bn", "fr", "es", "pt", "it", "nl", "sv", "no", "da", "embed", "_next"]);
const require = createRequire(import.meta.url);
// Playwright projeye bağımlılık olarak eklenmez; makinedeki kurulum kullanılır.
type Sayfa = {
  goto(url: string, o: { waitUntil: "load"; timeout: number }): Promise<unknown>;
  waitForTimeout(ms: number): Promise<void>;
  evaluate<T>(fn: () => T): Promise<T>;
  close(): Promise<void>;
};
type Tarayici = {
  newContext(o: { viewport: { width: number; height: number } }): Promise<{
    newPage(): Promise<Sayfa>;
    addInitScript(o: { content: string }): Promise<void>;
  }>;
  close(): Promise<void>;
};
const { chromium } = require(process.env.PLAYWRIGHT_YOLU ?? "playwright") as {
  chromium: { launch(o: { executablePath?: string }): Promise<Tarayici> };
};

function sayfalar() {
  const yollar: string[] = [];
  const gez = (dir: string, kok: boolean) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      if (e.isDirectory()) {
        if (!(kok && DILLER.has(e.name))) gez(join(dir, e.name), false);
      } else if (e.name.endsWith(".html")) {
        yollar.push(join(dir, e.name).slice(OUT.length, -5).replace(/\/index$/, "") || "/");
      }
    }
  };
  gez(OUT, true);
  return yollar.filter((p) => isSaatBolumu(p) || isSaatAraci(p) || isHesapAraci(p)).sort();
}

type Sonuc = { yol: string; okunmayan: string[]; tasanTablo: string[]; genisTablo: number; sayfaGenisligi: number; hata?: string };

async function main() {
  const liste = sayfalar();
  const sunucu = spawn("npx", ["--yes", "serve", "out", "-l", String(PORT)], { stdio: "ignore" });
  for (let i = 0; i < 60; i++) {
    const hazir = await fetch(`http://localhost:${PORT}/`).then((r) => r.ok).catch(() => false);
    if (hazir) break;
    await new Promise((r) => setTimeout(r, 1000));
  }
  const tarayici = await chromium.launch({ executablePath: process.env.CHROMIUM_YOLU });
  const baglam = await tarayici.newContext({ viewport: { width: 390, height: 844 } });
  // tsx, tarayıcıya giden fonksiyonlara __name ekler; sayfada da tanımlı olmalı.
  await baglam.addInitScript({ content: "window.__name = (f) => f;" });
  const sonuclar: Sonuc[] = [];
  let sira = 0;
  const isci = async () => {
    while (sira < liste.length) {
      const yol = liste[sira++];
      const sayfa = await baglam.newPage();
      try {
        await sayfa.goto(`http://localhost:${PORT}${yol}`, { waitUntil: "load", timeout: 30000 });
        await sayfa.waitForTimeout(500);
        const r = await sayfa.evaluate(() => {
          // Katlanmış bölümler (telefonda + ile açılanlar) da ölçülür.
          document.querySelectorAll("main [hidden]").forEach((e) => e.removeAttribute("hidden"));
          document.querySelectorAll(".mb-gizli").forEach((e) => e.classList.remove("mb-gizli"));
          type Renk = { r: number; g: number; b: number; a: number };
          const renk = (s: string): Renk | null => {
            const m = s.match(/rgba?\(([^)]+)\)/);
            if (m) {
              const v = m[1].split(",").map(Number);
              return { r: v[0], g: v[1], b: v[2], a: v.length > 3 ? v[3] : 1 };
            }
            // color-mix() sonucu "color(srgb 0.1 0.4 0.4 / 1)" biçiminde gelir.
            const c = s.match(/color\(srgb ([\d.\s]+)(?:\/\s*([\d.]+))?\)/);
            if (!c) return null;
            const v = c[1].trim().split(/\s+/).map((x) => Number(x) * 255);
            return { r: v[0], g: v[1], b: v[2], a: c[2] ? Number(c[2]) : 1 };
          };
          const parlaklik = ({ r, g, b }: Renk) => {
            const f = (x: number) => ((x /= 255) <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4));
            return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
          };
          // Saat düzeninin koyu alanı arka plan olarak değil border-image ile çizilir.
          const zemin = (el: Element): Renk | null => {
            for (let e: Element | null = el; e; e = e.parentElement) {
              const st = getComputedStyle(e);
              if (st.borderImageSource.includes("rgb(0, 0, 0)")) return { r: 0, g: 0, b: 0, a: 1 };
              const bg = renk(st.backgroundColor);
              if (bg && bg.a > 0.5) return bg;
              if (st.backgroundImage !== "none" && e !== el) return null;
            }
            return { r: 253, g: 253, b: 251, a: 1 };
          };
          const okunmayan: string[] = [];
          const main = document.querySelector("main") ?? document.body;
          for (const el of main.querySelectorAll("*")) {
            if (![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent!.trim())) continue;
            const st = getComputedStyle(el);
            if (st.visibility === "hidden" || el.getClientRects().length === 0 || el.closest("svg, [aria-hidden=true], .sr-only")) continue;
            // Açılır liste seçenekleri tarayıcının kendi kutusunda çizilir; harf/rakam içermeyen simgeler (☆) yazı değildir.
            if (el.closest("option, optgroup") || !/[\p{L}\p{N}]/u.test(el.textContent!)) continue;
            const yazi = renk(st.color);
            const bg = zemin(el);
            if (!yazi || !bg) continue;
            const karisim = { r: yazi.r * yazi.a + bg.r * (1 - yazi.a), g: yazi.g * yazi.a + bg.g * (1 - yazi.a), b: yazi.b * yazi.a + bg.b * (1 - yazi.a), a: 1 };
            const [l1, l2] = [parlaklik(karisim), parlaklik(bg)];
            const oran = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
            const buyuk = parseFloat(st.fontSize) >= 24 || (parseFloat(st.fontSize) >= 18.6 && Number(st.fontWeight) >= 700);
            if (oran < (buyuk ? 3 : 4.5) * 0.7) okunmayan.push(`${oran.toFixed(1)} ${el.tagName.toLowerCase()} "${el.textContent!.trim().slice(0, 40)}"`);
          }
          const tasanTablo: string[] = [];
          let genisTablo = 0;
          for (const w of document.querySelectorAll(".conversion-table-wrap, .holiday-table-wrap")) {
            if (w.scrollWidth <= w.clientWidth + 1) continue;
            const sutun = w.querySelector("tr")?.children.length ?? 0;
            if (sutun >= 7) genisTablo++;
            else tasanTablo.push(`${w.scrollWidth - w.clientWidth}px, ${sutun} sütun: ${w.querySelector("th")?.textContent?.trim() ?? ""}`);
          }
          return { okunmayan, tasanTablo, genisTablo, sayfaGenisligi: document.documentElement.scrollWidth };
        });
        sonuclar.push({ yol, ...r });
      } catch (e) {
        sonuclar.push({ yol, okunmayan: [], tasanTablo: [], genisTablo: 0, sayfaGenisligi: 0, hata: String(e).slice(0, 120) });
      }
      await sayfa.close();
    }
  };
  await Promise.all([isci(), isci(), isci(), isci()]);
  await tarayici.close();
  sunucu.kill();

  const hatali = sonuclar.filter((s) => s.hata || s.okunmayan.length || s.tasanTablo.length || s.sayfaGenisligi > 392);
  for (const s of hatali) {
    console.log(s.yol);
    if (s.hata) console.log(`  açılamadı: ${s.hata}`);
    for (const o of s.okunmayan.slice(0, 3)) console.log(`  okunmuyor ${o}`);
    if (s.okunmayan.length > 3) console.log(`  … ve ${s.okunmayan.length - 3} yazı daha`);
    for (const t of s.tasanTablo) console.log(`  taşan tablo ${t}`);
    if (s.sayfaGenisligi > 392) console.log(`  sayfa yana kayıyor (${s.sayfaGenisligi}px)`);
  }
  const genis = sonuclar.reduce((t, s) => t + s.genisTablo, 0);
  console.log(`Kalite denetimi: ${sonuclar.length} sayfa, ${hatali.length} sayfada hata; kendi kutusunda kayan ${genis} geniş veri tablosu (7+ sütun).`);
  process.exit(hatali.length ? 1 : 0);
}

main();
