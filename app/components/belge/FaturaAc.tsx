"use client";

import { useEffect, useRef, useState } from "react";
import type { Fatura } from "../../converter/belge/efatura";
import DosyaBirak from "../gorsel/DosyaBirak";
import { indir } from "../gorsel/tuval";

type Kayit = { ad: string; fatura: Fatura; xml: string };

/** XSLT'yi tarayıcıda uygular; desteklenmiyorsa null döner. */
function xsltUygula(xml: string, xslt: string): string | null {
  if (typeof XSLTProcessor === "undefined") return null;
  try {
    const p = new DOMParser();
    const x = p.parseFromString(xml, "application/xml");
    const s = p.parseFromString(xslt, "application/xml");
    if (s.querySelector("parsererror") || x.querySelector("parsererror"))
      return null;
    const islem = new XSLTProcessor();
    islem.importStylesheet(s);
    const sonuc = islem.transformToDocument(x);
    if (!sonuc?.documentElement) return null;
    // Şablondaki betikler çalıştırılmaz; önizlemede gereksiz uyarı olmasın diye kaldırılır
    for (const b of sonuc.querySelectorAll("script")) b.remove();
    return `<!doctype html>${sonuc.documentElement.outerHTML}`;
  } catch {
    return null;
  }
}

/** e-Fatura / e-Arşiv XML görüntüleyici; toplu modda faturaları Excel'e aktarır. */
export default function FaturaAc({
  odak = "gor",
}: {
  odak?: "gor" | "pdf" | "excel";
}) {
  const toplu = odak === "excel";
  const [kayitlar, setKayitlar] = useState<Kayit[]>([]);
  const [hatalar, setHatalar] = useState<Array<{ ad: string; mesaj: string }>>(
    [],
  );
  const [secili, setSecili] = useState(0);
  const [gorunum, setGorunum] = useState<"sade" | "sablon">("sade");
  const [html, setHtml] = useState("");
  const [sablonVar, setSablonVar] = useState(false);
  const [durum, setDurum] = useState("");
  const cerceve = useRef<HTMLIFrameElement>(null);
  const urller = useRef<string[]>([]);

  useEffect(
    () => () => {
      for (const u of urller.current) URL.revokeObjectURL(u);
    },
    [],
  );

  const k = kayitlar[secili];

  useEffect(() => {
    if (!k) return;
    let iptal = false;
    void (async () => {
      const { faturaHtml } = await import("../../converter/belge/efatura");
      const sablon = k.fatura.xslt ? xsltUygula(k.xml, k.fatura.xslt) : null;
      if (iptal) return;
      setSablonVar(!!sablon);
      setHtml(gorunum === "sablon" && sablon ? sablon : faturaHtml(k.fatura));
    })();
    return () => {
      iptal = true;
    };
  }, [k, gorunum]);

  const ac = async (d: File[]) => {
    setDurum("Faturalar okunuyor…");
    setHatalar([]);
    try {
      const { faturalariOku, tekillestir } =
        await import("../../converter/belge/efatura");
      const r = await faturalariOku(
        await Promise.all(
          d.map(async (f) => ({
            ad: f.name,
            veri: new Uint8Array(await f.arrayBuffer()),
          })),
        ),
      );
      const yeni = toplu
        ? tekillestir([...kayitlar, ...r.faturalar])
        : tekillestir(r.faturalar);
      setKayitlar(yeni);
      setHatalar(r.hatalar);
      if (!toplu) setSecili(0);
    } finally {
      setDurum("");
    }
  };

  const kaydet = (v: BlobPart, tur: string, ad: string) => {
    const u = URL.createObjectURL(new Blob([v], { type: tur }));
    urller.current.push(u);
    indir(u, ad);
  };

  const excel = async () => {
    setDurum("Excel hazırlanıyor…");
    try {
      const { faturaTablolari } = await import("../../converter/belge/efatura");
      const { xlsxYaz } = await import("../../converter/veri/xlsx");
      const t = faturaTablolari(kayitlar.map((x) => x.fatura));
      kaydet(
        (await xlsxYaz([
          { ad: "Faturalar", satirlar: t.ozet },
          { ad: "Kalemler", satirlar: t.kalemler },
        ])) as BlobPart,
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        kayitlar.length === 1
          ? `fatura-${kayitlar[0].fatura.no}.xlsx`
          : `faturalar-${kayitlar.length}.xlsx`,
      );
    } finally {
      setDurum("");
    }
  };

  const yazdir = () => {
    const w = cerceve.current?.contentWindow;
    w?.focus();
    w?.print();
  };

  const toplamlar = kayitlar.reduce<Record<string, number>>((t, x) => {
    const b = x.fatura.paraBirimi;
    t[b] = (t[b] ?? 0) + x.fatura.toplam.odenecek;
    return t;
  }, {});

  return (
    <div className="date-calc gorsel-arac">
      <DosyaBirak
        tur="belge"
        accept=".xml,.zip,application/xml,text/xml"
        coklu={toplu}
        max={toplu ? 2000 : 1}
        baslik={
          toplu
            ? kayitlar.length
              ? "Başka fatura ekleyin (XML veya ZIP)"
              : "Fatura XML'lerini veya ZIP'i seçin"
            : kayitlar.length
              ? "Başka bir fatura seçin"
              : "Fatura XML dosyasını seçin"
        }
        onSec={(d) => void ac(d)}
      />
      {durum ? <p className="gorsel-durum">{durum}</p> : null}
      {hatalar.length ? (
        <div className="gorsel-hata">
          {hatalar.slice(0, 10).map((h) => (
            <div key={h.ad}>
              <b>{h.ad}:</b> {h.mesaj}
            </div>
          ))}
          {hatalar.length > 10 ? (
            <div>… ve {hatalar.length - 10} dosya daha</div>
          ) : null}
        </div>
      ) : null}
      {toplu && kayitlar.length ? (
        <>
          <p className="vesikalik-ozet">
            <b>{kayitlar.length} fatura</b> ·{" "}
            {Object.entries(toplamlar)
              .map(
                ([b, v]) =>
                  `${v.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${b === "TRY" ? "TL" : b}`,
              )
              .join(" + ")}{" "}
            ödenecek
          </p>
          <div className="gorsel-alt belge-dugmeler">
            <button
              type="button"
              className="time-tool-button"
              disabled={!!durum}
              onClick={() => void excel()}
            >
              Excel&apos;e aktar (.xlsx)
            </button>
            <button
              type="button"
              className="time-tool-button is-secondary"
              onClick={() => {
                setKayitlar([]);
                setHatalar([]);
                setSecili(0);
              }}
            >
              Listeyi temizle
            </button>
          </div>
          <div className="fatura-liste">
            <table>
              <thead>
                <tr>
                  <th>Tarih</th>
                  <th>Fatura No</th>
                  <th>Satıcı</th>
                  <th>Alıcı</th>
                  <th className="s">Ödenecek</th>
                </tr>
              </thead>
              <tbody>
                {kayitlar.map((x, i) => (
                  <tr
                    key={x.fatura.ettn || i}
                    className={i === secili ? "is-secili" : ""}
                    onClick={() => setSecili(i)}
                  >
                    <td>{x.fatura.tarih.split("-").reverse().join(".")}</td>
                    <td>{x.fatura.no}</td>
                    <td>{x.fatura.satici.unvan}</td>
                    <td>{x.fatura.alici.unvan}</td>
                    <td className="s">
                      {x.fatura.toplam.odenecek.toLocaleString("tr-TR", {
                        minimumFractionDigits: 2,
                      })}{" "}
                      {x.fatura.paraBirimi === "TRY"
                        ? "TL"
                        : x.fatura.paraBirimi}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="date-calc-note">
            Satıra tıklayarak faturayı aşağıda görüntüleyin.
          </p>
        </>
      ) : null}
      {k ? (
        <>
          {!toplu ? (
            <p className="vesikalik-ozet">
              <b>{k.fatura.no}</b> · {k.fatura.satici.unvan} →{" "}
              {k.fatura.alici.unvan}
            </p>
          ) : null}
          <div className="gorsel-alt belge-dugmeler">
            {!toplu ? (
              <>
                <button
                  type="button"
                  className={`time-tool-button${odak === "pdf" ? "" : " is-secondary"}`}
                  onClick={yazdir}
                >
                  PDF olarak kaydet / yazdır
                </button>
                <button
                  type="button"
                  className="time-tool-button is-secondary"
                  onClick={() => void excel()}
                >
                  Kalemleri Excel&apos;e aktar
                </button>
              </>
            ) : null}
            {sablonVar ? (
              <div
                className="date-converter-modes is-light"
                role="tablist"
                aria-label="Görünüm"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={gorunum === "sade"}
                  className={gorunum === "sade" ? "is-active" : ""}
                  onClick={() => setGorunum("sade")}
                >
                  Sade görünüm
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={gorunum === "sablon"}
                  className={gorunum === "sablon" ? "is-active" : ""}
                  onClick={() => setGorunum("sablon")}
                >
                  Faturanın kendi şablonu
                </button>
              </div>
            ) : null}
          </div>
          <iframe
            ref={cerceve}
            className="udf-onizleme"
            title="Faturanın görünümü"
            sandbox="allow-same-origin allow-modals"
            srcDoc={html}
          />
          {!toplu ? (
            <p className="date-calc-note">
              PDF için yazdırma penceresinde hedef olarak &quot;PDF olarak
              kaydet&quot;i seçin.
            </p>
          ) : null}
        </>
      ) : null}
      <p className="date-calc-note">
        Faturalar tarayıcınızda açılır, hiçbir sunucuya yüklenmez. Görüntü bilgi
        amaçlıdır; faturanın mali değeri XML dosyasının kendisindedir ve e-imza
        burada doğrulanmaz.
      </p>
    </div>
  );
}
