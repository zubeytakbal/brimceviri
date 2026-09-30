"use client";

import { useEffect, useRef, useState } from "react";
import type { ZipGirdi } from "../../converter/arsiv/zipOku";
import { boyutMetni } from "../../converter/gorsel/formatlar";
import DosyaBirak from "../gorsel/DosyaBirak";
import { indir } from "../gorsel/tuval";

type Secim = { yol: string; dosya: File };

/** Dosya ve klasörlerden sıkıştırılmış ZIP oluşturur. */
export function ZipOlustur() {
  const [dosyalar, setDosyalar] = useState<Secim[]>([]);
  const [ad, setAd] = useState("arsiv");
  const [durum, setDurum] = useState("");
  const [sonuc, setSonuc] = useState<{ url: string; boyut: number } | null>(
    null,
  );
  const [hata, setHata] = useState("");
  const url = useRef<string | null>(null);

  useEffect(
    () => () => {
      if (url.current) URL.revokeObjectURL(url.current);
    },
    [],
  );

  const ekle = (liste: File[]) => {
    setSonuc(null);
    setDosyalar((d) => [
      ...d,
      ...liste.map((f) => ({ yol: f.webkitRelativePath || f.name, dosya: f })),
    ]);
  };

  const olustur = async () => {
    setHata("");
    setSonuc(null);
    try {
      const { zipSikistir } = await import("../../converter/gorsel/zip");
      const girdiler = [];
      for (const [i, d] of dosyalar.entries()) {
        setDurum(`Okunuyor ${i + 1}/${dosyalar.length}…`);
        girdiler.push({
          ad: d.yol,
          veri: new Uint8Array(await d.dosya.arrayBuffer()),
          tarih: new Date(d.dosya.lastModified),
        });
      }
      const z = await zipSikistir(girdiler, (i) =>
        setDurum(`Sıkıştırılıyor ${i + 1}/${girdiler.length}…`),
      );
      if (url.current) URL.revokeObjectURL(url.current);
      url.current = URL.createObjectURL(
        new Blob([z as BlobPart], { type: "application/zip" }),
      );
      setSonuc({ url: url.current, boyut: z.length });
      indir(url.current, `${ad.trim() || "arsiv"}.zip`);
    } catch (e) {
      setHata(
        e instanceof RangeError
          ? "Dosyalar tarayıcı belleğine sığmadı; daha az dosya seçin."
          : e instanceof Error
            ? e.message
            : "ZIP oluşturulamadı.",
      );
    } finally {
      setDurum("");
    }
  };

  const toplam = dosyalar.reduce((t, d) => t + d.dosya.size, 0);

  return (
    <div className="date-calc gorsel-arac">
      <DosyaBirak
        tur="belge"
        max={1000}
        baslik={
          dosyalar.length
            ? "Başka dosya ekleyin"
            : "ZIP'e eklenecek dosyaları seçin"
        }
        onSec={ekle}
      />
      <label className="time-tool-button is-secondary zip-klasor">
        📁 Klasör seç
        <input
          type="file"
          multiple
          // @ts-expect-error -- standart dışı ama tüm güncel tarayıcılarda desteklenir
          webkitdirectory=""
          onChange={(e) => {
            ekle([...(e.target.files ?? [])]);
            e.target.value = "";
          }}
        />
      </label>
      {dosyalar.length ? (
        <>
          <ul className="zip-liste">
            {dosyalar.map((d, i) => (
              <li key={`${d.yol}-${i}`}>
                <span title={d.yol}>{d.yol}</span>
                <span>{boyutMetni(d.dosya.size)}</span>
                <button
                  type="button"
                  aria-label={`${d.yol} kaldır`}
                  onClick={() => {
                    setSonuc(null);
                    setDosyalar((l) => l.filter((_, k) => k !== i));
                  }}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
          <div className="date-calc-input">
            <label className="date-calc-field">
              <span>ZIP dosyasının adı</span>
              <span className="date-calc-field-row">
                <input
                  type="text"
                  value={ad}
                  onChange={(e) => setAd(e.target.value)}
                />
                <span className="zip-uzanti">.zip</span>
              </span>
            </label>
          </div>
          <div className="gorsel-alt">
            <span>
              {durum ||
                `${dosyalar.length} dosya · ${boyutMetni(toplam)}${
                  sonuc
                    ? ` → ${boyutMetni(sonuc.boyut)} (−%${Math.max(0, Math.round((1 - sonuc.boyut / Math.max(1, toplam)) * 100))})`
                    : ""
                }`}
            </span>
            <button
              type="button"
              className="time-tool-button"
              disabled={!!durum}
              onClick={() => void olustur()}
            >
              ZIP oluştur
            </button>
            {sonuc ? (
              <a
                className="time-tool-button is-secondary"
                href={sonuc.url}
                download={`${ad.trim() || "arsiv"}.zip`}
              >
                Tekrar indir
              </a>
            ) : null}
          </div>
        </>
      ) : null}
      {hata ? <p className="gorsel-hata">{hata}</p> : null}
      <p className="date-calc-note">
        Dosyalar tarayıcınızda sıkıştırılır, hiçbir sunucuya yüklenmez. Metin,
        belge ve tablolar çok küçülür; JPG, MP4 ve PDF gibi zaten sıkıştırılmış
        dosyalar neredeyse aynı kalır.
      </p>
    </div>
  );
}

const onizlenebilir = (ad: string) =>
  /\.(jpe?g|png|gif|webp|svg|avif|bmp)$/i.test(ad)
    ? "gorsel"
    : /\.(txt|csv|json|xml|html?|css|js|ts|md|log|ini|yml|yaml)$/i.test(ad)
      ? "metin"
      : null;

const MIME: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
  webp: "image/webp",
  svg: "image/svg+xml",
  avif: "image/avif",
  bmp: "image/bmp",
};

/** ZIP dosyasının içeriğini listeler, dosyaları tek tek açar ve indirir. */
export function ZipAc() {
  const [ad, setAd] = useState("");
  const [girdiler, setGirdiler] = useState<ZipGirdi[]>([]);
  const [onizleme, setOnizleme] = useState<{
    ad: string;
    url?: string;
    metin?: string;
  } | null>(null);
  const [hata, setHata] = useState("");
  const urller = useRef<string[]>([]);

  useEffect(
    () => () => {
      for (const u of urller.current) URL.revokeObjectURL(u);
    },
    [],
  );

  const ac = async (d: File[]) => {
    setHata("");
    setGirdiler([]);
    setOnizleme(null);
    const f = d[0];
    if (/\.(rar|7z|tar|gz|tgz)$/i.test(f.name)) {
      setHata(
        "Bu sayfa yalnızca ZIP içindir. RAR, 7Z ve TAR arşivleri için RAR Açma aracını kullanın (/rar-acma).",
      );
      return;
    }
    try {
      const { zipOku } = await import("../../converter/arsiv/zipOku");
      setGirdiler(zipOku(new Uint8Array(await f.arrayBuffer())));
      setAd(f.name);
    } catch (e) {
      setHata(e instanceof Error ? e.message : "Arşiv açılamadı.");
    }
  };

  const al = async (g: ZipGirdi) => {
    const veri = await g.ac();
    const uz = g.ad.split(".").pop()!.toLowerCase();
    const u = URL.createObjectURL(
      new Blob([veri as BlobPart], {
        type: MIME[uz] ?? "application/octet-stream",
      }),
    );
    urller.current.push(u);
    return { veri, u };
  };

  const indirGirdi = async (g: ZipGirdi) => {
    setHata("");
    try {
      const { u } = await al(g);
      indir(u, g.ad.split("/").pop()!);
    } catch (e) {
      setHata(e instanceof Error ? e.message : "Dosya açılamadı.");
    }
  };

  const goster = async (g: ZipGirdi) => {
    setHata("");
    try {
      const { veri, u } = await al(g);
      setOnizleme(
        onizlenebilir(g.ad) === "gorsel"
          ? { ad: g.ad, url: u }
          : {
              ad: g.ad,
              metin: new TextDecoder().decode(veri.subarray(0, 200_000)),
            },
      );
    } catch (e) {
      setHata(e instanceof Error ? e.message : "Dosya açılamadı.");
    }
  };

  const dosyalar = girdiler.filter((g) => !g.klasor);
  const toplam = dosyalar.reduce((t, g) => t + g.boyut, 0);

  return (
    <div className="date-calc gorsel-arac">
      <DosyaBirak
        tur="belge"
        accept=".zip,application/zip,.rar,.7z"
        coklu={false}
        max={1}
        baslik={ad ? "Başka bir ZIP seçin" : "ZIP dosyası seçin"}
        onSec={(d) => void ac(d)}
      />
      {dosyalar.length ? (
        <>
          <p className="vesikalik-ozet">
            <b>{ad}</b> · {dosyalar.length} dosya · açılmış hâli{" "}
            {boyutMetni(toplam)}
            {dosyalar.some((g) => g.sifreli)
              ? " · şifreli dosyalar açılamaz"
              : ""}
          </p>
          <ul className="zip-liste is-ac">
            {dosyalar.map((g) => (
              <li key={g.ad}>
                <span title={g.ad}>
                  {g.sifreli ? "🔒 " : ""}
                  {g.ad}
                </span>
                <span>
                  {boyutMetni(g.boyut)}
                  {g.tarih ? ` · ${g.tarih.toLocaleDateString("tr-TR")}` : ""}
                </span>
                {onizlenebilir(g.ad) ? (
                  <button
                    type="button"
                    onClick={() => void goster(g)}
                    aria-label={`${g.ad} önizle`}
                  >
                    👁
                  </button>
                ) : (
                  <span />
                )}
                <button
                  type="button"
                  onClick={() => void indirGirdi(g)}
                  aria-label={`${g.ad} indir`}
                >
                  ⬇
                </button>
              </li>
            ))}
          </ul>
          {onizleme ? (
            <div className="zip-onizleme">
              <b>{onizleme.ad}</b>
              {onizleme.url ? (
                // eslint-disable-next-line @next/next/no-img-element -- yerel önizleme
                <img src={onizleme.url} alt={onizleme.ad} />
              ) : (
                <pre>{onizleme.metin}</pre>
              )}
            </div>
          ) : null}
        </>
      ) : ad && !hata ? (
        <p className="gorsel-durum">Arşiv boş.</p>
      ) : null}
      {hata ? <p className="gorsel-hata">{hata}</p> : null}
      <p className="date-calc-note">
        Arşiv tarayıcınızda açılır, hiçbir sunucuya yüklenmez. Türkçe karakterli
        dosya adları (eski Windows ZIP&apos;leri dahil) doğru gösterilir.
      </p>
    </div>
  );
}
