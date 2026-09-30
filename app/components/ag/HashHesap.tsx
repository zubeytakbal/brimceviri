"use client";

import { useEffect, useRef, useState } from "react";
import {
  AKIS_ALG,
  HASH_ALGLAR,
  TEK_PARCA_SINIR,
  algTahmin,
  base64Yaz,
  hexYaz,
  ozetAl,
  ozetNormal,
  type HashAlg,
} from "../../converter/ag/hash";
import { boyutMetni } from "../../converter/gorsel/formatlar";
import CopyResultButton from "../CopyResultButton";
import DosyaBirak from "../gorsel/DosyaBirak";

const PARCA = 4 * 1024 * 1024;

type Sonuc = Partial<Record<HashAlg, Uint8Array | "buyuk">>;

/** Metin veya dosya için MD5, SHA ve CRC32 özetleri; beklenen değerle karşılaştırma. */
export default function HashHesap({
  odak = "genel",
}: {
  odak?: "genel" | "md5" | "sha256";
}) {
  const [kip, setKip] = useState<"metin" | "dosya">(
    odak === "genel" ? "metin" : "dosya",
  );
  const [secili, setSecili] = useState<HashAlg[]>(
    odak === "md5"
      ? ["MD5"]
      : odak === "sha256"
        ? ["SHA-256"]
        : ["MD5", "SHA-1", "SHA-256"],
  );
  const [metin, setMetin] = useState("");
  const [dosya, setDosya] = useState<File | null>(null);
  const [sonuc, setSonuc] = useState<Sonuc>({});
  const [ilerleme, setIlerleme] = useState<number | null>(null);
  const [buyukHarf, setBuyukHarf] = useState(false);
  const [b64, setB64] = useState(false);
  const [beklenen, setBeklenen] = useState("");
  const oturum = useRef(0);

  useEffect(() => () => void oturum.current++, []);

  // metin kipinde anında hesapla
  useEffect(() => {
    if (kip !== "metin") return;
    const no = ++oturum.current;
    void (async () => {
      const v = new TextEncoder().encode(metin);
      const r: Sonuc = {};
      for (const a of secili) r[a] = await ozetAl(a, v);
      if (no === oturum.current) setSonuc(r);
    })();
  }, [kip, metin, secili]);

  const dosyaHesapla = async (f: File, algs: HashAlg[]) => {
    const no = ++oturum.current;
    setDosya(f);
    setSonuc({});
    setIlerleme(0);
    const akis = algs
      .filter((a) => AKIS_ALG[a])
      .map((a) => [a, AKIS_ALG[a]!()] as const);
    const tek = algs.filter((a) => !AKIS_ALG[a]);
    const r: Sonuc = {};
    try {
      if (akis.length)
        for (let i = 0; i < f.size; i += PARCA) {
          const v = new Uint8Array(await f.slice(i, i + PARCA).arrayBuffer());
          for (const [, o] of akis) o.guncelle(v);
          if (no !== oturum.current) return;
          setIlerleme(Math.min(1, (i + PARCA) / f.size));
          // arayüzün donmaması için
          await new Promise((c) => setTimeout(c, 0));
        }
      for (const [a, o] of akis) r[a] = o.bitir();
      if (tek.length) {
        if (f.size > TEK_PARCA_SINIR) for (const a of tek) r[a] = "buyuk";
        else {
          const v = new Uint8Array(await f.arrayBuffer());
          for (const a of tek) r[a] = await ozetAl(a, v);
        }
      }
      if (no === oturum.current) setSonuc(r);
    } finally {
      if (no === oturum.current) setIlerleme(null);
    }
  };

  const degistir = (a: HashAlg) => {
    const yeni = secili.includes(a)
      ? secili.filter((x) => x !== a)
      : HASH_ALGLAR.filter((x) => x === a || secili.includes(x));
    setSecili(yeni);
    if (kip === "dosya" && dosya) void dosyaHesapla(dosya, yeni);
  };

  const yaz = (v: Uint8Array) => {
    if (b64) return base64Yaz(v);
    const h = hexYaz(v);
    return buyukHarf ? h.toUpperCase() : h;
  };
  const bek = ozetNormal(beklenen);
  const bekAlg = beklenen ? algTahmin(beklenen) : null;
  const eslesen = bek
    ? secili.find((a) => {
        const v = sonuc[a];
        return v && v !== "buyuk" && hexYaz(v) === bek;
      })
    : undefined;

  return (
    <div className="date-calc gorsel-arac">
      <div
        className="date-converter-modes is-light"
        role="tablist"
        aria-label="Girdi"
      >
        {(["metin", "dosya"] as const).map((x) => (
          <button
            key={x}
            type="button"
            role="tab"
            aria-selected={kip === x}
            className={kip === x ? "is-active" : ""}
            onClick={() => {
              setKip(x);
              setSonuc({});
              if (x === "dosya" && dosya) void dosyaHesapla(dosya, secili);
            }}
          >
            {x === "metin" ? "Metin" : "Dosya"}
          </button>
        ))}
      </div>
      <div className="ag-secimler" role="group" aria-label="Algoritmalar">
        {HASH_ALGLAR.map((a) => (
          <label key={a} className="date-calc-check">
            <input
              type="checkbox"
              checked={secili.includes(a)}
              onChange={() => degistir(a)}
            />{" "}
            {a}
          </label>
        ))}
      </div>
      {kip === "metin" ? (
        <div className="date-calc-input">
          <label className="date-calc-field">
            <span>Metin (UTF-8)</span>
            <textarea
              rows={4}
              value={metin}
              spellCheck={false}
              placeholder="Özetini almak istediğiniz metni yazın veya yapıştırın"
              onChange={(e) => setMetin(e.target.value)}
            />
          </label>
        </div>
      ) : (
        <>
          <DosyaBirak
            tur="belge"
            coklu={false}
            max={1}
            baslik={
              dosya ? "Başka bir dosya seçin" : "Özeti alınacak dosyayı seçin"
            }
            onSec={(d) => void dosyaHesapla(d[0], secili)}
          />
          {dosya ? (
            <p className="vesikalik-ozet">
              <b>{dosya.name}</b> · {boyutMetni(dosya.size)}
              {ilerleme !== null
                ? ` · hesaplanıyor %${Math.round(ilerleme * 100)}`
                : ""}
            </p>
          ) : null}
          {ilerleme !== null ? (
            <progress className="ag-ilerleme" max={1} value={ilerleme} />
          ) : null}
        </>
      )}
      {Object.keys(sonuc).length ? (
        <table className="ag-sonuc" aria-label="Özetler">
          <tbody>
            {secili.map((a) => {
              const v = sonuc[a];
              if (!v) return null;
              const t = v === "buyuk" ? "" : yaz(v);
              return (
                <tr
                  key={a}
                  className={eslesen === a ? "is-eslesti" : undefined}
                >
                  <th scope="row">{a}</th>
                  <td>
                    {v === "buyuk" ? (
                      <span>
                        1 GB'tan büyük dosyada tarayıcı bu algoritmayı
                        desteklemiyor.
                      </span>
                    ) : (
                      <code>{t}</code>
                    )}
                  </td>
                  <td>
                    <CopyResultButton
                      text={t}
                      locale="tr"
                      className="ag-kopyala"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : null}
      <div className="ag-secimler">
        <label className="date-calc-check">
          <input
            type="checkbox"
            checked={buyukHarf}
            disabled={b64}
            onChange={(e) => setBuyukHarf(e.target.checked)}
          />{" "}
          Büyük harf
        </label>
        <label className="date-calc-check">
          <input
            type="checkbox"
            checked={b64}
            onChange={(e) => setB64(e.target.checked)}
          />{" "}
          Base64
        </label>
      </div>
      <div className="date-calc-input">
        <label className="date-calc-field">
          <span>Beklenen değer (sitede yayımlanan checksum'ı yapıştırın)</span>
          <span className="date-calc-field-row">
            <input
              type="text"
              spellCheck={false}
              autoCapitalize="off"
              value={beklenen}
              onChange={(e) => setBeklenen(e.target.value)}
            />
          </span>
        </label>
        {bek && Object.keys(sonuc).length && ilerleme === null ? (
          eslesen ? (
            <p className="gorsel-tamam">
              ✅ Eşleşiyor ({eslesen}). Dosya değiştirilmemiş ve eksiksiz.
            </p>
          ) : bekAlg && !secili.includes(bekAlg) ? (
            <p className="gorsel-hata">
              Bu değer bir {bekAlg} özetine benziyor; yukarıda {bekAlg}{" "}
              seçeneğini işaretleyin.
            </p>
          ) : (
            <p className="gorsel-hata">
              ❌ Eşleşmiyor. Dosya eksik indirilmiş, bozulmuş veya farklı bir
              dosya olabilir.
            </p>
          )
        ) : null}
      </div>
      <p className="date-calc-note">
        Özet tarayıcınızda hesaplanır; metin ve dosya hiçbir yere yüklenmez.
        Büyük dosyalar parça parça okunur, bellek sorunu olmaz.
      </p>
    </div>
  );
}
