"use client";

import Link from "@/app/components/SiteLink";
import { useEffect, useRef, useState } from "react";
import type { DosyaTuru, ImzaPaketi, Imzaci } from "../../converter/belge/imz";
import { boyutMetni } from "../../converter/gorsel/formatlar";
import DosyaBirak from "../gorsel/DosyaBirak";
import { indir } from "../gorsel/tuval";

const EN_FAZLA_SAYFA = 10;

const tarih = (d?: Date | null) =>
  d
    ? d.toLocaleString("tr-TR", {
        dateStyle: "long",
        timeStyle: "short",
        timeZone: "Europe/Istanbul",
      })
    : "—";

/** TC kimlik numarası gibi 11 haneli değerlerin ortasını gizler. */
const maskele = (s: string) =>
  /^\d{11}$/.test(s) ? `${s.slice(0, 3)}*****${s.slice(8)}` : s;

const SONUC = {
  gecerli: {
    sinif: "is-gecerli",
    baslik: "İmza geçerli",
    metin:
      "İmza matematiksel olarak doğru; dosya imzalandıktan sonra değiştirilmemiş.",
  },
  gecersiz: {
    sinif: "is-gecersiz",
    baslik: "İmza geçersiz",
    metin:
      "Dosya imzalandıktan sonra değiştirilmiş veya imza bozuk. Bu dosyaya güvenmeyin.",
  },
  asilGerekli: {
    sinif: "is-bilinmiyor",
    baslik: "Asıl dosya gerekli",
    metin:
      "İmza sağlam; belgenin değişmediğini doğrulamak için imzalanan asıl dosyayı da seçin.",
  },
  dogrulanamadi: {
    sinif: "is-bilinmiyor",
    baslik: "Doğrulanamadı",
    metin:
      "İmza algoritması tarayıcıda desteklenmiyor ya da imzacı sertifikası pakette yok.",
  },
};

function ImzaciKarti({ i, alt = false }: { i: Imzaci; alt?: boolean }) {
  const s = i.sertifika;
  const r = SONUC[i.sonuc];
  const disinda =
    s && i.imzaZamani && s.bitis && s.baslangic
      ? i.imzaZamani > s.bitis || i.imzaZamani < s.baslangic
      : false;
  return (
    <div className={`imz-kart ${r.sinif}${alt ? " is-alt" : ""}`}>
      <div className="imz-kart-ust">
        <b>{s?.ad || "Bilinmeyen imzacı"}</b>
        <span className="imz-rozet">{r.baslik}</span>
      </div>
      <p className="imz-kart-metin">{r.metin}</p>
      <dl className="eyp-bilgi">
        {s?.seriAlan ? (
          <div>
            <dt>Kimlik / seri</dt>
            <dd>{maskele(s.seriAlan)}</dd>
          </div>
        ) : null}
        {s?.kurum ? (
          <div>
            <dt>Kurum</dt>
            <dd>{s.kurum}</dd>
          </div>
        ) : null}
        <div>
          <dt>İmza zamanı</dt>
          <dd>
            {i.zamanDamgasi
              ? `${tarih(i.zamanDamgasi)} (zaman damgalı)`
              : i.imzaZamani
                ? `${tarih(i.imzaZamani)} (imzacının bilgisayar saati)`
                : "Belirtilmemiş"}
          </dd>
        </div>
        {s ? (
          <>
            <div>
              <dt>Sertifikayı veren</dt>
              <dd>{s.yayinci || "—"}</dd>
            </div>
            <div>
              <dt>Sertifika geçerliliği</dt>
              <dd>
                {tarih(s.baslangic)} – {tarih(s.bitis)}
              </dd>
            </div>
            <div>
              <dt>Algoritma</dt>
              <dd>
                {s.anahtar.tur}
                {s.anahtar.bit ? ` ${s.anahtar.bit} bit` : ""}
                {s.anahtar.egri ? ` ${s.anahtar.egri}` : ""} · {i.ozetAlg}
              </dd>
            </div>
          </>
        ) : null}
      </dl>
      {disinda ? (
        <p className="gorsel-hata">
          İmza zamanı sertifikanın geçerlilik süresinin dışında.
        </p>
      ) : null}
      {i.seriImzalar.map((k, n) => (
        <ImzaciKarti key={n} i={k} alt />
      ))}
    </div>
  );
}

/** e-İmzalı dosyayı (.imz, .p7s, .p7m) açar, asıl dosyayı çıkarır ve imzayı gösterir. */
export default function ImzAc({ p7s = false }: { p7s?: boolean }) {
  const [dosya, setDosya] = useState<File | null>(null);
  const [paket, setPaket] = useState<ImzaPaketi | null>(null);
  const [tur, setTur] = useState<(DosyaTuru & { dosyaAdi: string }) | null>(
    null,
  );
  const [asilAdi, setAsilAdi] = useState("");
  const [sayfalar, setSayfalar] = useState<string[]>([]);
  const [gorsel, setGorsel] = useState("");
  const [durum, setDurum] = useState("");
  const [hata, setHata] = useState("");
  const imzaVeri = useRef<Uint8Array | null>(null);
  const urller = useRef<string[]>([]);
  const oturum = useRef(0);

  useEffect(
    () => () => {
      oturum.current++;
      for (const u of urller.current) URL.revokeObjectURL(u);
    },
    [],
  );

  const url = (v: Uint8Array, mime: string) => {
    const u = URL.createObjectURL(new Blob([v as BlobPart], { type: mime }));
    urller.current.push(u);
    return u;
  };

  const ac = async (f: File) => {
    const no = ++oturum.current;
    setHata("");
    setPaket(null);
    setTur(null);
    setAsilAdi("");
    setSayfalar([]);
    setGorsel("");
    setDosya(f);
    setDurum("İmza çözülüyor…");
    try {
      const m = await import("../../converter/belge/imz");
      imzaVeri.current = new Uint8Array(await f.arrayBuffer());
      const p = await m.imzaCoz(imzaVeri.current);
      if (no !== oturum.current) return;
      setPaket(p);
      if (p.icerik) {
        const t = m.dosyaTuru(p.icerik);
        const ad = m.asilAd(f.name, t);
        setTur({ ...t, dosyaAdi: ad });
        if (t.uzanti === "pdf") {
          setDurum("Belge gösteriliyor…");
          const { pdfAc, sayfaCiz } = await import("../pdf/pdfjs");
          const belge = await pdfAc(p.icerik);
          try {
            const liste: string[] = [];
            for (
              let i = 1;
              i <= Math.min(belge.numPages, EN_FAZLA_SAYFA);
              i++
            ) {
              if (no !== oturum.current) return;
              liste.push(
                (await sayfaCiz(belge, i, 1.6)).toDataURL("image/jpeg", 0.85),
              );
              setSayfalar([...liste]);
            }
          } finally {
            await belge.destroy();
          }
        } else if (t.mime.startsWith("image/") && t.uzanti !== "tif")
          setGorsel(url(p.icerik, t.mime));
      }
    } catch (e) {
      if (no === oturum.current)
        setHata(e instanceof Error ? e.message : "Dosya açılamadı.");
    } finally {
      if (no === oturum.current) setDurum("");
    }
  };

  const asilIleDogrula = async (f: File) => {
    if (!imzaVeri.current) return;
    setHata("");
    setDurum("Doğrulanıyor…");
    try {
      const { imzaCoz } = await import("../../converter/belge/imz");
      setPaket(
        await imzaCoz(imzaVeri.current, new Uint8Array(await f.arrayBuffer())),
      );
      setAsilAdi(f.name);
    } catch (e) {
      setHata(e instanceof Error ? e.message : "Doğrulanamadı.");
    } finally {
      setDurum("");
    }
  };

  const hepsiGecerli =
    paket?.imzacilar.length &&
    paket.imzacilar.every((i) => i.sonuc === "gecerli");

  return (
    <div className="date-calc gorsel-arac">
      <DosyaBirak
        tur="belge"
        accept=".imz,.p7s,.p7m,.p7b,.sgn,.pem"
        coklu={false}
        max={1}
        baslik={
          dosya
            ? "Başka bir imzalı dosya seçin"
            : p7s
              ? "P7S / P7M dosyasını seçin"
              : "İMZ dosyasını seçin"
        }
        onSec={(d) => void ac(d[0])}
      />
      {hata ? <p className="gorsel-hata">{hata}</p> : null}
      {durum ? <p className="gorsel-durum">{durum}</p> : null}
      {paket && dosya ? (
        <>
          <p className="vesikalik-ozet">
            <b>{dosya.name}</b> · {boyutMetni(dosya.size)} ·{" "}
            {paket.imzacilar.length} imza
            {hepsiGecerli ? " · ✅ tümü geçerli" : ""}
          </p>
          {paket.icerik && tur ? (
            <div className="imz-asil">
              <div>
                <b>{tur.dosyaAdi}</b>
                <span>
                  {tur.ad} · {boyutMetni(paket.icerik.length)}
                </span>
              </div>
              <div className="gorsel-alt belge-dugmeler">
                <button
                  type="button"
                  className="time-tool-button"
                  onClick={() =>
                    indir(url(paket.icerik!, tur.mime), tur.dosyaAdi)
                  }
                >
                  Asıl dosyayı indir
                </button>
                {tur.uzanti === "pdf" ||
                tur.mime.startsWith("image/") ||
                tur.uzanti === "txt" ? (
                  <button
                    type="button"
                    className="time-tool-button is-secondary"
                    onClick={() =>
                      window.open(url(paket.icerik!, tur.mime), "_blank")
                    }
                  >
                    Yeni sekmede aç
                  </button>
                ) : null}
              </div>
              {tur.uzanti === "udf" ? (
                <p className="date-calc-note">
                  Bu bir UYAP belgesi. İndirdikten sonra{" "}
                  <Link href="/udf-dosyasi-acma">UDF Dosyası Açma</Link>{" "}
                  aracıyla okuyabilir, PDF veya Word&apos;e çevirebilirsiniz.
                </p>
              ) : tur.uzanti === "eyp" ? (
                <p className="date-calc-note">
                  Bu bir e-Yazışma Paketi. İndirdikten sonra{" "}
                  <Link href="/eyp-dosyasi-acma">EYP Dosyası Açma</Link>{" "}
                  aracıyla açabilirsiniz.
                </p>
              ) : null}
            </div>
          ) : null}
          {paket.ayrik ? (
            <div className="imz-asil">
              <p>
                Bu <b>ayrık (detached) imza</b>: imzalanan dosya bu dosyanın
                içinde değil, ayrıca gönderilir. Doğrulamak için imzalanan asıl
                dosyayı da seçin.
              </p>
              <DosyaBirak
                tur="belge"
                coklu={false}
                max={1}
                baslik={
                  asilAdi
                    ? `Seçilen: ${asilAdi}`
                    : "İmzalanan asıl dosyayı seçin"
                }
                onSec={(d) => void asilIleDogrula(d[0])}
              />
            </div>
          ) : null}
          <h3 className="eyp-baslik">İmzalar</h3>
          {paket.imzacilar.map((i, n) => (
            <ImzaciKarti key={n} i={i} />
          ))}
          {gorsel ? (
            <div className="eyp-sayfalar">
              {/* eslint-disable-next-line @next/next/no-img-element -- yerel önizleme */}
              <img src={gorsel} alt="İmzalı görsel" />
            </div>
          ) : null}
          {sayfalar.length ? (
            <div className="eyp-sayfalar">
              {sayfalar.map((s, i) => (
                // eslint-disable-next-line @next/next/no-img-element -- yerel önizleme
                <img key={i} src={s} alt={`Sayfa ${i + 1}`} />
              ))}
            </div>
          ) : null}
        </>
      ) : null}
      <p className="date-calc-note">
        Dosya tarayıcınızda açılır, hiçbir sunucuya yüklenmez. İmzanın
        matematiksel doğruluğu ve dosyanın değişmediği denetlenir; sertifikanın
        iptal durumu ve kök sertifika zinciri denetlenmez. Hukuki işlemlerde
        resmî doğrulama için İmzager gibi onaylı yazılımları kullanın.
      </p>
    </div>
  );
}
