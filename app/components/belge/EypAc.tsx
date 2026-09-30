"use client";

import { useEffect, useRef, useState } from "react";
import {
  tarihMetni,
  type EypBilesen,
  type EypPaket,
  type EypTur,
} from "../../converter/belge/eyp";
import { boyutMetni } from "../../converter/gorsel/formatlar";
import DosyaBirak from "../gorsel/DosyaBirak";
import { indir } from "../gorsel/tuval";

const TUR_ADI: Record<EypTur, string> = {
  ustYazi: "Üst yazı",
  ek: "Ek",
  ustveri: "Üstveri",
  belgeHedef: "Belge hedef",
  paketOzeti: "Paket özeti",
  nihaiOzet: "Nihai özet",
  imza: "E-imza",
  ozellik: "Paket özellikleri",
  diger: "Diğer",
};

const MIME: Record<string, string> = {
  pdf: "application/pdf",
  xml: "application/xml",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  txt: "text/plain",
};

const EN_FAZLA_SAYFA = 30;

/** e-Yazışma Paketini (.eyp) açar: üst yazıyı gösterir, bilgileri ve ekleri listeler. */
export default function EypAc() {
  const [dosya, setDosya] = useState<File | null>(null);
  const [paket, setPaket] = useState<EypPaket | null>(null);
  const [sayfalar, setSayfalar] = useState<string[]>([]);
  const [toplamSayfa, setToplamSayfa] = useState(0);
  const [durum, setDurum] = useState("");
  const [hata, setHata] = useState("");
  const urller = useRef<string[]>([]);
  const oturum = useRef(0);

  useEffect(
    () => () => {
      oturum.current++;
      for (const u of urller.current) URL.revokeObjectURL(u);
    },
    [],
  );

  const url = (veri: Uint8Array, ad: string) => {
    const uz = ad.split(".").pop()!.toLowerCase();
    const u = URL.createObjectURL(
      new Blob([veri as BlobPart], {
        type: MIME[uz] ?? "application/octet-stream",
      }),
    );
    urller.current.push(u);
    return u;
  };

  const ac = async (f: File) => {
    const no = ++oturum.current;
    setHata("");
    setPaket(null);
    setSayfalar([]);
    setToplamSayfa(0);
    setDosya(f);
    setDurum("Paket açılıyor…");
    try {
      const { eypAc } = await import("../../converter/belge/eyp");
      const p = await eypAc(new Uint8Array(await f.arrayBuffer()));
      if (no !== oturum.current) return;
      setPaket(p);
      if (p.ustYazi && /\.pdf$/i.test(p.ustYazi.ad)) {
        setDurum("Üst yazı gösteriliyor…");
        const { pdfAc, sayfaCiz } = await import("../pdf/pdfjs");
        const belge = await pdfAc(await p.ustYazi.ac());
        try {
          setToplamSayfa(belge.numPages);
          const liste: string[] = [];
          for (let i = 1; i <= Math.min(belge.numPages, EN_FAZLA_SAYFA); i++) {
            if (no !== oturum.current) return;
            const c = await sayfaCiz(belge, i, 1.6);
            liste.push(c.toDataURL("image/jpeg", 0.85));
            setSayfalar([...liste]);
          }
        } finally {
          await belge.destroy();
        }
      }
    } catch (e) {
      if (no === oturum.current)
        setHata(e instanceof Error ? e.message : "Paket açılamadı.");
    } finally {
      if (no === oturum.current) setDurum("");
    }
  };

  const bilesenIndir = async (b: EypBilesen) => {
    indir(url(await b.ac(), b.ad), b.ad);
  };

  const ustYaziAc = async () => {
    if (!paket?.ustYazi) return;
    window.open(url(await paket.ustYazi.ac(), paket.ustYazi.ad), "_blank");
  };

  const hepsiniIndir = async () => {
    if (!paket || !dosya) return;
    setDurum("ZIP hazırlanıyor…");
    const { zipSikistir } = await import("../../converter/gorsel/zip");
    const secilen = [
      ...(paket.ustYazi ? [paket.ustYazi] : []),
      ...paket.ekler.flatMap((e) => (e.bilesen ? [e.bilesen] : [])),
    ];
    const z = await zipSikistir(
      await Promise.all(
        secilen.map(async (b) => ({
          ad: b === paket.ustYazi ? `Ust_yazi_${b.ad}` : `Ekler/${b.ad}`,
          veri: await b.ac(),
        })),
      ),
    );
    indir(url(z, "x.zip"), `${dosya.name.replace(/\.eyp$/i, "")}.zip`);
    setDurum("");
  };

  const u = paket?.ustveri;
  const bilgiler: Array<[string, string]> = u
    ? [
        ["Konu", u.konu ?? ""],
        ["Tarih", u.tarih ? tarihMetni(u.tarih) : ""],
        ["Sayı", u.belgeNo ?? ""],
        ["Gönderen", u.olusturan ?? ""],
        ["Dağıtım", u.dagitimlar.join("; ")],
        ["İlgi", u.ilgiler.join("; ")],
        ["Gizlilik", u.guvenlikKodu ?? ""],
      ].filter((x): x is [string, string] => !!x[1])
    : [];

  return (
    <div className="date-calc gorsel-arac">
      <DosyaBirak
        tur="belge"
        accept=".eyp"
        coklu={false}
        max={1}
        baslik={dosya ? "Başka bir EYP seçin" : "EYP dosyasını seçin"}
        onSec={(d) => void ac(d[0])}
      />
      {hata ? <p className="gorsel-hata">{hata}</p> : null}
      {paket && dosya ? (
        <>
          <p className="vesikalik-ozet">
            <b>{dosya.name}</b> · {boyutMetni(dosya.size)}
            {paket.imzali ? " · 🔏 e-imzalı paket" : ""}
          </p>
          {bilgiler.length ? (
            <dl className="eyp-bilgi">
              {bilgiler.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          ) : null}
          <div className="gorsel-alt belge-dugmeler">
            {paket.ustYazi ? (
              <>
                <button
                  type="button"
                  className="time-tool-button"
                  onClick={() => void bilesenIndir(paket.ustYazi!)}
                >
                  Üst yazıyı indir (
                  {paket.ustYazi.ad.split(".").pop()!.toUpperCase()})
                </button>
                <button
                  type="button"
                  className="time-tool-button is-secondary"
                  onClick={() => void ustYaziAc()}
                >
                  Yeni sekmede aç
                </button>
              </>
            ) : null}
            {paket.ekler.some((e) => e.bilesen) ? (
              <button
                type="button"
                className="time-tool-button is-secondary"
                disabled={!!durum}
                onClick={() => void hepsiniIndir()}
              >
                Üst yazı + ekler (ZIP)
              </button>
            ) : null}
          </div>
          {paket.ekler.length ? (
            <>
              <h3 className="eyp-baslik">Ekler ({paket.ekler.length})</h3>
              <ul className="zip-liste">
                {paket.ekler.map((e, i) => (
                  <li key={`${e.ad}-${i}`}>
                    <span title={e.dosyaAdi ?? e.ad}>
                      {e.sira ? `${e.sira}. ` : ""}
                      {e.ad}
                      {e.dosyaAdi && e.dosyaAdi !== e.ad
                        ? ` (${e.dosyaAdi})`
                        : ""}
                    </span>
                    <span>
                      {e.bilesen
                        ? boyutMetni(e.bilesen.boyut)
                        : e.tur === "FZK"
                          ? "fiziksel ek"
                          : e.tur === "HRF"
                            ? "harici bağlantı"
                            : "pakette yok"}
                    </span>
                    {e.bilesen ? (
                      <button
                        type="button"
                        onClick={() => void bilesenIndir(e.bilesen!)}
                        aria-label={`${e.ad} indir`}
                      >
                        ⬇
                      </button>
                    ) : (
                      <span />
                    )}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
          {durum ? <p className="gorsel-durum">{durum}</p> : null}
          {sayfalar.length ? (
            <div className="eyp-sayfalar">
              {sayfalar.map((s, i) => (
                // eslint-disable-next-line @next/next/no-img-element -- yerel önizleme
                <img key={i} src={s} alt={`Üst yazı sayfa ${i + 1}`} />
              ))}
              {toplamSayfa > sayfalar.length && !durum ? (
                <p className="date-calc-note">
                  İlk {sayfalar.length} sayfa gösteriliyor; tamamı için üst
                  yazıyı indirin.
                </p>
              ) : null}
            </div>
          ) : null}
          <details className="eyp-ayrinti">
            <summary>
              Paketin tüm bileşenleri ({paket.bilesenler.length})
            </summary>
            <ul className="zip-liste">
              {paket.bilesenler.map((b) => (
                <li key={b.yol}>
                  <span title={b.yol}>
                    <small>{TUR_ADI[b.tur]}</small> {b.yol}
                  </span>
                  <span>{boyutMetni(b.boyut)}</span>
                  <button
                    type="button"
                    onClick={() => void bilesenIndir(b)}
                    aria-label={`${b.yol} indir`}
                  >
                    ⬇
                  </button>
                </li>
              ))}
            </ul>
          </details>
        </>
      ) : durum ? (
        <p className="gorsel-durum">{durum}</p>
      ) : null}
      <p className="date-calc-note">
        Paket tarayıcınızda açılır, hiçbir sunucuya yüklenmez. Resmî yazı
        içerikleri bu cihazdan çıkmaz. E-imzanın geçerliliği burada doğrulanmaz;
        belgenin aslı için gönderen kurumun doğrulama adresini kullanın.
      </p>
    </div>
  );
}
