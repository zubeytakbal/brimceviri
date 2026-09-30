"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { boyutMetni } from "../../converter/gorsel/formatlar";
import {
  ayiriciBul,
  csvAyristir,
  csvYaz,
  jsonHataKonumu,
  jsonTablo,
  tabloJson,
  turTahmin,
  type Hucre,
  type Tablo,
} from "../../converter/veri/csv";
import type { Sayfa } from "../../converter/veri/xlsx";
import DosyaBirak from "../gorsel/DosyaBirak";
import { indir, zipUrlOlustur } from "../gorsel/tuval";

export type VeriMod = "excel-csv" | "csv-excel" | "csv-json" | "json-csv";

const AYIRICILAR = [
  { a: ";", ad: "Noktalı virgül ( ; ) — Türkçe Excel" },
  { a: ",", ad: "Virgül ( , ) — İngilizce Excel, Google E-Tablolar" },
  { a: "\t", ad: "Sekme (TSV)" },
  { a: "|", ad: "Dikey çizgi ( | )" },
];
const AYIRICI_AD: Record<string, string> = {
  ";": "noktalı virgül",
  ",": "virgül",
  "\t": "sekme",
  "|": "dikey çizgi",
};
const ONIZLEME = 100;

const taban = (ad: string) => ad.replace(/\.[^.]+$/, "") || "veri";

function blobIndir(icerik: BlobPart, tur: string, ad: string) {
  const u = URL.createObjectURL(new Blob([icerik], { type: tur }));
  indir(u, ad);
  setTimeout(() => URL.revokeObjectURL(u), 5000);
}

/** Tablonun ilk satırlarını gösterir. */
export function TabloOnizleme({
  tablo,
  baslikVar = true,
}: {
  tablo: Tablo;
  baslikVar?: boolean;
}) {
  if (!tablo.length) return null;
  const [bas, ...govde] = baslikVar ? tablo : [[], ...tablo];
  return (
    <div className="veri-tablo">
      <table>
        {baslikVar ? (
          <thead>
            <tr>
              <th scope="col">#</th>
              {bas.map((h, i) => (
                <th key={i} scope="col">
                  {h === null ? "" : String(h)}
                </th>
              ))}
            </tr>
          </thead>
        ) : null}
        <tbody>
          {govde.slice(0, ONIZLEME).map((r, y) => (
            <tr key={y}>
              <th scope="row">{y + 1}</th>
              {r.map((h, x) => (
                <td
                  key={x}
                  className={typeof h === "number" ? "is-sayi" : undefined}
                >
                  {h === null ? "" : String(h)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {govde.length > ONIZLEME ? (
        <p className="veri-not">
          İlk {ONIZLEME} satır gösteriliyor; dosyanın tamamı (
          {govde.length.toLocaleString("tr-TR")} satır) dönüştürülür.
        </p>
      ) : null}
    </div>
  );
}

/** "85,5" gibi virgül ondalıklı sayıları da sayıya çevirir. */
function hucreTuru(m: string, virgulOndalik: boolean): Hucre {
  if (
    virgulOndalik &&
    /^-?\d{1,3}(\.\d{3})*(,\d+)?$|^-?\d+(,\d+)?$/.test(m) &&
    m.includes(",")
  )
    return Number(m.replace(/\./g, "").replace(",", "."));
  return turTahmin(m);
}

/** Excel ↔ CSV ↔ JSON dönüştürücü. */
export default function VeriDonusturucu({ mod }: { mod: VeriMod }) {
  const [sayfalar, setSayfalar] = useState<Sayfa[]>([]);
  const [secili, setSecili] = useState(0);
  const [ad, setAd] = useState("");
  const [metin, setMetin] = useState("");
  const [ayirici, setAyirici] = useState(";");
  const [girisAyirici, setGirisAyirici] = useState<string>("otomatik");
  const [bom, setBom] = useState(true);
  const [sayilar, setSayilar] = useState(true);
  const [virgulOndalik, setVirgulOndalik] = useState(true);
  const [baslikVar, setBaslikVar] = useState(true);
  const [icIce, setIcIce] = useState(true);
  const [girinti, setGirinti] = useState(2);
  const [hata, setHata] = useState("");
  const [durum, setDurum] = useState("");
  const [kopyalandi, setKopyalandi] = useState(false);
  const urller = useRef<string[]>([]);

  useEffect(
    () => () => {
      for (const u of urller.current) URL.revokeObjectURL(u);
    },
    [],
  );

  const girdiCsv = mod === "csv-excel" || mod === "csv-json";
  const girdiJson = mod === "json-csv";

  // Yapıştırılan veya yüklenen metinden tablo
  const metinTablosu = useMemo((): {
    tablo: Tablo;
    bulunan?: string;
    hata?: string;
  } => {
    if (!metin.trim()) return { tablo: [] };
    if (girdiJson) {
      try {
        return { tablo: jsonTablo(JSON.parse(metin)) };
      } catch (e) {
        const k = e instanceof Error ? jsonHataKonumu(metin, e.message) : null;
        return {
          tablo: [],
          hata: `Geçersiz JSON${k ? ` (satır ${k.satir}, sütun ${k.sutun})` : ""}. JSON Düzenleyici ile hatayı bulabilirsiniz.`,
        };
      }
    }
    const a = girisAyirici === "otomatik" ? ayiriciBul(metin) : girisAyirici;
    return { tablo: csvAyristir(metin, a), bulunan: a };
  }, [metin, girdiJson, girisAyirici]);

  const turlu = (t: Tablo): Tablo =>
    sayilar
      ? t.map((r, y) =>
          r.map((h) =>
            typeof h === "string" && !(baslikVar && y === 0)
              ? hucreTuru(h, virgulOndalik)
              : h,
          ),
        )
      : t;

  const ac = async (d: File[]) => {
    setHata("");
    setDurum("");
    try {
      if (mod === "excel-csv") {
        setDurum("Excel dosyası okunuyor…");
        const { xlsxOku } = await import("../../converter/veri/xlsx");
        const s = await xlsxOku(new Uint8Array(await d[0].arrayBuffer()));
        setSayfalar(s);
        setSecili(0);
        setAd(d[0].name);
        if (!s.some((p) => p.satirlar.length))
          setHata("Çalışma kitabında dolu hücre bulunamadı.");
      } else if (mod === "csv-excel" && d.length > 1) {
        // Birden çok CSV → tek Excel'de ayrı sayfalar
        const s: Sayfa[] = [];
        for (const f of d)
          s.push({
            ad: taban(f.name).slice(0, 31),
            satirlar: csvAyristir(await metinOku(f)),
          });
        setSayfalar(s);
        setSecili(0);
        setMetin("");
        setAd(`${d.length} CSV`);
      } else {
        setSayfalar([]);
        setMetin(await metinOku(d[0]));
        setAd(d[0].name);
      }
    } catch (e) {
      setHata(e instanceof Error ? e.message : "Dosya okunamadı.");
    } finally {
      setDurum("");
    }
  };

  /** UTF-8 değilse Windows-1254 (Türkçe) olarak okur. */
  async function metinOku(f: File) {
    const b = new Uint8Array(await f.arrayBuffer());
    try {
      return new TextDecoder("utf-8", { fatal: true }).decode(b);
    } catch {
      return new TextDecoder("windows-1254").decode(b);
    }
  }

  const aktifTablo: Tablo = useMemo(
    () =>
      sayfalar.length ? (sayfalar[secili]?.satirlar ?? []) : metinTablosu.tablo,
    [sayfalar, secili, metinTablosu],
  );

  const csvCikti = (t: Tablo) => (bom ? "﻿" : "") + csvYaz(t, ayirici);
  const uzanti = ayirici === "\t" ? "tsv" : "csv";

  const csvIndir = () =>
    blobIndir(
      csvCikti(aktifTablo),
      "text/csv;charset=utf-8",
      `${taban(ad || "veri")}${sayfalar.length > 1 ? `-${sayfalar[secili].ad}` : ""}.${uzanti}`,
    );

  const tumSayfalarZip = async () => {
    const u = await zipUrlOlustur(
      sayfalar.map((s) => ({
        ad: `${s.ad}.${uzanti}`,
        blob: new Blob([csvCikti(s.satirlar)], { type: "text/csv" }),
      })),
    );
    urller.current.push(u);
    indir(u, `${taban(ad)}-csv.zip`);
  };

  const excelIndir = async () => {
    setDurum("Excel dosyası hazırlanıyor…");
    try {
      const { xlsxYaz } = await import("../../converter/veri/xlsx");
      const s: Sayfa[] = sayfalar.length
        ? sayfalar.map((p) => ({ ad: p.ad, satirlar: turlu(p.satirlar) }))
        : [
            {
              ad: "Sayfa1",
              satirlar: girdiJson ? aktifTablo : turlu(aktifTablo),
            },
          ];
      blobIndir(
        (await xlsxYaz(s)) as BlobPart,
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        `${taban(ad || "veri")}.xlsx`,
      );
    } finally {
      setDurum("");
    }
  };

  const jsonCikti = useMemo(() => {
    if (mod !== "csv-json" || !aktifTablo.length) return "";
    const v = tabloJson(aktifTablo, { baslikVar, turler: sayilar, icIce });
    return JSON.stringify(v, null, girinti || undefined);
  }, [mod, aktifTablo, baslikVar, sayilar, icIce, girinti]);

  const kopyala = async (m: string) => {
    try {
      await navigator.clipboard.writeText(m);
      setKopyalandi(true);
      setTimeout(() => setKopyalandi(false), 1500);
    } catch {
      /* pano erişimi yok */
    }
  };

  const kabul =
    mod === "excel-csv"
      ? ".xlsx,.xlsm,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      : girdiJson
        ? ".json,application/json,text/plain"
        : ".csv,.tsv,.txt,text/csv,text/plain";

  const satirSayisi = Math.max(0, aktifTablo.length - (baslikVar ? 1 : 0));
  const sutunSayisi = Math.max(0, ...aktifTablo.map((r) => r.length));

  return (
    <div className="date-calc gorsel-arac">
      <DosyaBirak
        tur="belge"
        accept={kabul}
        coklu={mod === "csv-excel"}
        max={mod === "csv-excel" ? 20 : 1}
        baslik={
          mod === "excel-csv"
            ? "Excel dosyası (.xlsx) seçin"
            : girdiJson
              ? "JSON dosyası seçin"
              : mod === "csv-excel"
                ? "CSV dosyalarını seçin (birden fazlası ayrı sayfalar olur)"
                : "CSV dosyası seçin"
        }
        onSec={(d) => void ac(d)}
      />
      {mod !== "excel-csv" ? (
        <label className="date-calc-field veri-yapistir">
          <span>
            veya {girdiJson ? "JSON" : "CSV"} metnini buraya yapıştırın
          </span>
          <textarea
            className="ocr-metin"
            rows={6}
            value={metin}
            spellCheck={false}
            placeholder={
              girdiJson
                ? '[{"ad": "Ayşe", "yas": 30}, {"ad": "Mehmet", "yas": 25}]'
                : "ad;soyad;not\nAyşe;Yılmaz;85,5\nMehmet;Kaya;70"
            }
            onChange={(e) => {
              setSayfalar([]);
              setMetin(e.target.value);
              setAd("");
            }}
          />
        </label>
      ) : null}
      {durum ? <p className="gorsel-durum">{durum}</p> : null}
      {metinTablosu.hata ? (
        <p className="gorsel-hata">{metinTablosu.hata}</p>
      ) : null}

      {aktifTablo.length ? (
        <>
          <div className="date-calc-input">
            <div className="date-calc-fields">
              {sayfalar.length > 1 ? (
                <label className="date-calc-field">
                  <span>Sayfa</span>
                  <span className="date-calc-field-row">
                    <select
                      value={secili}
                      onChange={(e) => setSecili(Number(e.target.value))}
                    >
                      {sayfalar.map((s, i) => (
                        <option key={i} value={i}>
                          {s.ad}
                        </option>
                      ))}
                    </select>
                  </span>
                </label>
              ) : null}
              {girdiCsv && !sayfalar.length ? (
                <label className="date-calc-field">
                  <span>
                    Girdideki ayırıcı
                    {metinTablosu.bulunan && girisAyirici === "otomatik"
                      ? ` (bulunan: ${AYIRICI_AD[metinTablosu.bulunan]})`
                      : ""}
                  </span>
                  <span className="date-calc-field-row">
                    <select
                      value={girisAyirici}
                      onChange={(e) => setGirisAyirici(e.target.value)}
                    >
                      <option value="otomatik">Otomatik</option>
                      {AYIRICILAR.map((a) => (
                        <option key={a.a} value={a.a}>
                          {a.ad}
                        </option>
                      ))}
                    </select>
                  </span>
                </label>
              ) : null}
              {mod === "excel-csv" || mod === "json-csv" ? (
                <label className="date-calc-field">
                  <span>CSV ayırıcısı</span>
                  <span className="date-calc-field-row">
                    <select
                      value={ayirici}
                      onChange={(e) => setAyirici(e.target.value)}
                    >
                      {AYIRICILAR.map((a) => (
                        <option key={a.a} value={a.a}>
                          {a.ad}
                        </option>
                      ))}
                    </select>
                  </span>
                </label>
              ) : null}
              {mod === "csv-json" ? (
                <label className="date-calc-field">
                  <span>Girinti</span>
                  <span className="date-calc-field-row">
                    <select
                      value={girinti}
                      onChange={(e) => setGirinti(Number(e.target.value))}
                    >
                      <option value={2}>2 boşluk</option>
                      <option value={4}>4 boşluk</option>
                      <option value={0}>Tek satır (küçük)</option>
                    </select>
                  </span>
                </label>
              ) : null}
            </div>
            {mod === "excel-csv" || mod === "json-csv" ? (
              <label className="date-calc-check">
                <input
                  type="checkbox"
                  checked={bom}
                  onChange={(e) => setBom(e.target.checked)}
                />{" "}
                Türkçe karakterler Excel&apos;de bozulmasın (UTF-8 BOM ekle)
              </label>
            ) : null}
            {mod === "csv-excel" || mod === "csv-json" ? (
              <>
                <label className="date-calc-check">
                  <input
                    type="checkbox"
                    checked={sayilar}
                    onChange={(e) => setSayilar(e.target.checked)}
                  />{" "}
                  Sayıları ve true/false değerlerini tanı (başında 0 olanlar,
                  ör. TC ve telefon, metin kalır)
                </label>
                {sayilar && mod === "csv-excel" ? (
                  <label className="date-calc-check">
                    <input
                      type="checkbox"
                      checked={virgulOndalik}
                      onChange={(e) => setVirgulOndalik(e.target.checked)}
                    />{" "}
                    Ondalık ayırıcı virgül (85,5 → 85.5 sayı)
                  </label>
                ) : null}
                {mod === "csv-json" ? (
                  <>
                    <label className="date-calc-check">
                      <input
                        type="checkbox"
                        checked={baslikVar}
                        onChange={(e) => setBaslikVar(e.target.checked)}
                      />{" "}
                      İlk satır başlık (nesne dizisi üret)
                    </label>
                    <label className="date-calc-check">
                      <input
                        type="checkbox"
                        checked={icIce}
                        onChange={(e) => setIcIce(e.target.checked)}
                      />{" "}
                      &quot;adres.il&quot; gibi başlıkları iç içe nesneye çevir
                    </label>
                  </>
                ) : null}
              </>
            ) : null}
          </div>

          <p className="vesikalik-ozet">
            {ad ? <b>{ad}</b> : "Yapıştırılan veri"} ·{" "}
            {satirSayisi.toLocaleString("tr-TR")} satır · {sutunSayisi} sütun
          </p>
          <TabloOnizleme
            tablo={aktifTablo}
            baslikVar={mod !== "csv-json" || baslikVar}
          />

          {mod === "csv-json" ? (
            <>
              <textarea
                className="ocr-metin"
                readOnly
                rows={12}
                value={jsonCikti}
                aria-label="JSON çıktısı"
                spellCheck={false}
              />
              <div className="gorsel-alt">
                <span>{boyutMetni(new Blob([jsonCikti]).size)}</span>
                <button
                  type="button"
                  className="time-tool-button"
                  onClick={() => void kopyala(jsonCikti)}
                >
                  {kopyalandi ? "Kopyalandı ✓" : "JSON'u kopyala"}
                </button>
                <button
                  type="button"
                  className="time-tool-button is-secondary"
                  onClick={() =>
                    blobIndir(
                      jsonCikti,
                      "application/json",
                      `${taban(ad || "veri")}.json`,
                    )
                  }
                >
                  JSON indir
                </button>
              </div>
            </>
          ) : (
            <div className="gorsel-alt">
              <span />
              {mod === "csv-excel" ? (
                <button
                  type="button"
                  className="time-tool-button"
                  onClick={() => void excelIndir()}
                >
                  Excel (.xlsx) indir
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    className="time-tool-button"
                    onClick={csvIndir}
                  >
                    {uzanti.toUpperCase()} indir
                  </button>
                  {sayfalar.length > 1 ? (
                    <button
                      type="button"
                      className="time-tool-button is-secondary"
                      onClick={() => void tumSayfalarZip()}
                    >
                      Tüm sayfaları ZIP indir
                    </button>
                  ) : null}
                  {mod === "json-csv" ? (
                    <button
                      type="button"
                      className="time-tool-button is-secondary"
                      onClick={() => void excelIndir()}
                    >
                      Excel (.xlsx) indir
                    </button>
                  ) : null}
                </>
              )}
            </div>
          )}
        </>
      ) : null}
      {hata ? <p className="gorsel-hata">{hata}</p> : null}
      <p className="date-calc-note">
        Dosyalar tarayıcınızda dönüştürülür, hiçbir sunucuya yüklenmez.
        Excel&apos;de yalnızca hücre değerleri aktarılır; biçimlendirme, formül
        ve grafikler aktarılmaz (formüllerin son hesaplanan değeri alınır).
      </p>
    </div>
  );
}

/** JSON biçimlendirici, doğrulayıcı ve küçültücü. */
export function JsonDuzenleyici() {
  const [metin, setMetin] = useState("");
  const [cikti, setCikti] = useState("");
  const [hata, setHata] = useState("");
  const [bilgi, setBilgi] = useState("");
  const [kopyalandi, setKopyalandi] = useState(false);

  const sirala = (v: unknown): unknown =>
    Array.isArray(v)
      ? v.map(sirala)
      : v && typeof v === "object"
        ? Object.fromEntries(
            Object.keys(v as object)
              .sort((a, b) => a.localeCompare(b, "tr"))
              .map((k) => [k, sirala((v as Record<string, unknown>)[k])]),
          )
        : v;

  const isle = (tur: "2" | "4" | "kucult" | "sirala") => {
    setHata("");
    setBilgi("");
    try {
      let v = JSON.parse(metin);
      if (tur === "sirala") v = sirala(v);
      const s = JSON.stringify(
        v,
        null,
        tur === "kucult" ? undefined : tur === "4" ? 4 : 2,
      );
      setCikti(s);
      const tip = Array.isArray(v)
        ? `dizi (${v.length} öğe)`
        : v && typeof v === "object"
          ? `nesne (${Object.keys(v).length} anahtar)`
          : typeof v;
      setBilgi(
        `✓ Geçerli JSON · kök: ${tip} · ${boyutMetni(new Blob([s]).size)}`,
      );
    } catch (e) {
      setCikti("");
      const k = e instanceof Error ? jsonHataKonumu(metin, e.message) : null;
      const satir = k ? metin.split("\n")[k.satir - 1] : "";
      setHata(
        `Geçersiz JSON${k ? ` — satır ${k.satir}, sütun ${k.sutun}` : ""}: ${e instanceof Error ? e.message : ""}${
          satir ? `\n${satir}\n${" ".repeat(Math.max(0, k!.sutun - 1))}^` : ""
        }`,
      );
    }
  };

  return (
    <div className="date-calc gorsel-arac">
      <DosyaBirak
        tur="belge"
        accept=".json,application/json,text/plain"
        coklu={false}
        max={1}
        baslik="JSON dosyası seçin"
        onSec={(d) => void d[0].text().then(setMetin)}
      />
      <label className="date-calc-field veri-yapistir">
        <span>veya JSON metnini yapıştırın</span>
        <textarea
          className="ocr-metin"
          rows={10}
          value={metin}
          spellCheck={false}
          placeholder='{"ad":"Ayşe","diller":["tr","en"],"aktif":true}'
          onChange={(e) => setMetin(e.target.value)}
        />
      </label>
      <div className="veri-dugmeler">
        <button
          type="button"
          className="time-tool-button"
          disabled={!metin.trim()}
          onClick={() => isle("2")}
        >
          Biçimlendir
        </button>
        <button
          type="button"
          className="time-tool-button is-secondary"
          disabled={!metin.trim()}
          onClick={() => isle("4")}
        >
          4 boşlukla
        </button>
        <button
          type="button"
          className="time-tool-button is-secondary"
          disabled={!metin.trim()}
          onClick={() => isle("kucult")}
        >
          Küçült (tek satır)
        </button>
        <button
          type="button"
          className="time-tool-button is-secondary"
          disabled={!metin.trim()}
          onClick={() => isle("sirala")}
        >
          Anahtarları sırala
        </button>
      </div>
      {bilgi ? <p className="gorsel-tamam">{bilgi}</p> : null}
      {hata ? <pre className="gorsel-hata veri-hata">{hata}</pre> : null}
      {cikti ? (
        <>
          <textarea
            className="ocr-metin"
            readOnly
            rows={14}
            value={cikti}
            spellCheck={false}
            aria-label="Sonuç"
          />
          <div className="gorsel-alt">
            <span />
            <button
              type="button"
              className="time-tool-button"
              onClick={() =>
                void navigator.clipboard.writeText(cikti).then(() => {
                  setKopyalandi(true);
                  setTimeout(() => setKopyalandi(false), 1500);
                })
              }
            >
              {kopyalandi ? "Kopyalandı ✓" : "Kopyala"}
            </button>
            <button
              type="button"
              className="time-tool-button is-secondary"
              onClick={() => blobIndir(cikti, "application/json", "veri.json")}
            >
              JSON indir
            </button>
          </div>
        </>
      ) : null}
      <p className="date-calc-note">
        JSON tarayıcınızda işlenir; yapıştırdığınız veri (API anahtarı, müşteri
        kaydı vb.) hiçbir sunucuya gönderilmez.
      </p>
    </div>
  );
}
