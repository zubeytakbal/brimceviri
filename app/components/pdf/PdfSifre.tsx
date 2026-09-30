"use client";

import { useEffect, useRef, useState } from "react";
import { boyutMetni } from "../../converter/gorsel/formatlar";
import DosyaBirak from "../gorsel/DosyaBirak";
import { indir } from "../gorsel/tuval";

/** PDF'e şifre koyar (AES-256) veya bilinen şifreyi/kısıtlamaları kaldırır. */
export default function PdfSifre({ mod }: { mod: "sifrele" | "kaldir" }) {
  const [dosya, setDosya] = useState<File | null>(null);
  const [sifreli, setSifreli] = useState(false);
  const [sifre, setSifre] = useState("");
  const [tekrar, setTekrar] = useState("");
  const [goster, setGoster] = useState(false);
  const [izin, setIzin] = useState({
    yazdir: true,
    kopyala: false,
    duzenle: false,
  });
  const [durum, setDurum] = useState("");
  const [hata, setHata] = useState("");
  const [sonuc, setSonuc] = useState<{
    url: string;
    boyut: number;
    ad: string;
  } | null>(null);
  const veri = useRef<Uint8Array | null>(null);
  const url = useRef<string | null>(null);

  useEffect(
    () => () => {
      if (url.current) URL.revokeObjectURL(url.current);
    },
    [],
  );

  const ac = async (d: File[]) => {
    setHata("");
    setSonuc(null);
    veri.current = new Uint8Array(await d[0].arrayBuffer());
    const { sifreliMi } = await import("./qpdf");
    setSifreli(sifreliMi(veri.current));
    setDosya(d[0]);
  };

  const calistir = async () => {
    if (!veri.current || !dosya) return;
    setHata("");
    setSonuc(null);
    setDurum(mod === "sifrele" ? "Şifreleniyor…" : "Şifre kaldırılıyor…");
    try {
      const q = await import("./qpdf");
      const cikti =
        mod === "sifrele"
          ? await q.pdfSifrele(veri.current, sifre, izin)
          : await q.pdfSifreKaldir(veri.current, sifre);
      const ad =
        dosya.name.replace(/\.pdf$/i, "") +
        (mod === "sifrele" ? "-sifreli.pdf" : "-sifresiz.pdf");
      if (url.current) URL.revokeObjectURL(url.current);
      url.current = URL.createObjectURL(
        new Blob([cikti as BlobPart], { type: "application/pdf" }),
      );
      setSonuc({ url: url.current, boyut: cikti.length, ad });
      indir(url.current, ad);
    } catch (e) {
      setHata(e instanceof Error ? e.message : "İşlem başarısız.");
    } finally {
      setDurum("");
    }
  };

  const eslesmiyor = mod === "sifrele" && tekrar !== "" && tekrar !== sifre;
  const hazir =
    !!dosya &&
    !durum &&
    (mod === "sifrele"
      ? sifre.length >= 4 && sifre === tekrar && !sifreli
      : sifreli);

  return (
    <div className="date-calc gorsel-arac">
      <DosyaBirak
        tur="pdf"
        coklu={false}
        max={1}
        baslik={
          dosya
            ? "Başka bir PDF seçin"
            : mod === "sifrele"
              ? "Şifrelenecek PDF'i seçin"
              : "Şifreli PDF'i seçin"
        }
        onSec={(d) => void ac(d)}
      />
      {dosya ? (
        <>
          <p className="vesikalik-ozet">
            <b>{dosya.name}</b> · {boyutMetni(dosya.size)} ·{" "}
            {sifreli ? "🔒 şifreli / kısıtlamalı" : "🔓 şifresiz"}
          </p>
          {mod === "sifrele" && sifreli ? (
            <p className="gorsel-hata">
              Bu PDF zaten şifreli. Önce PDF Şifre Kaldırma aracıyla şifresini
              kaldırın.
            </p>
          ) : null}
          {mod === "kaldir" && !sifreli ? (
            <p className="gorsel-tamam">
              Bu PDF&apos;te şifre veya kısıtlama yok; olduğu gibi
              kullanabilirsiniz.
            </p>
          ) : null}
          {(mod === "sifrele" && !sifreli) || (mod === "kaldir" && sifreli) ? (
            <div className="date-calc-input">
              <div className="date-calc-fields">
                <label className="date-calc-field">
                  <span>
                    {mod === "sifrele"
                      ? "Şifre (en az 4 karakter)"
                      : "PDF'i açma şifresi (yalnızca kısıtlama varsa boş bırakın)"}
                  </span>
                  <span className="date-calc-field-row">
                    <input
                      type={goster ? "text" : "password"}
                      value={sifre}
                      autoComplete="new-password"
                      onChange={(e) => setSifre(e.target.value)}
                    />
                  </span>
                </label>
                {mod === "sifrele" ? (
                  <label className="date-calc-field">
                    <span>Şifre tekrar</span>
                    <span className="date-calc-field-row">
                      <input
                        type={goster ? "text" : "password"}
                        value={tekrar}
                        autoComplete="new-password"
                        onChange={(e) => setTekrar(e.target.value)}
                      />
                    </span>
                  </label>
                ) : null}
              </div>
              <label className="date-calc-check">
                <input
                  type="checkbox"
                  checked={goster}
                  onChange={(e) => setGoster(e.target.checked)}
                />{" "}
                Şifreyi göster
              </label>
              {mod === "sifrele" ? (
                <div className="pdf-izinler">
                  <span>PDF açıldıktan sonra izin verilenler:</span>
                  <label className="date-calc-check">
                    <input
                      type="checkbox"
                      checked={izin.yazdir}
                      onChange={(e) =>
                        setIzin((i) => ({ ...i, yazdir: e.target.checked }))
                      }
                    />{" "}
                    Yazdırma
                  </label>
                  <label className="date-calc-check">
                    <input
                      type="checkbox"
                      checked={izin.kopyala}
                      onChange={(e) =>
                        setIzin((i) => ({ ...i, kopyala: e.target.checked }))
                      }
                    />{" "}
                    Metin ve görsel kopyalama
                  </label>
                  <label className="date-calc-check">
                    <input
                      type="checkbox"
                      checked={izin.duzenle}
                      onChange={(e) =>
                        setIzin((i) => ({ ...i, duzenle: e.target.checked }))
                      }
                    />{" "}
                    Düzenleme
                  </label>
                </div>
              ) : null}
              {eslesmiyor ? (
                <p className="gorsel-hata">Şifreler aynı değil.</p>
              ) : null}
            </div>
          ) : null}
          <div className="gorsel-alt">
            <span>{durum}</span>
            <button
              type="button"
              className="time-tool-button"
              disabled={!hazir}
              onClick={() => void calistir()}
            >
              {mod === "sifrele" ? "PDF'i şifrele" : "Şifreyi kaldır"}
            </button>
            {sonuc ? (
              <a
                className="time-tool-button is-secondary"
                href={sonuc.url}
                download={sonuc.ad}
              >
                Tekrar indir ({boyutMetni(sonuc.boyut)})
              </a>
            ) : null}
          </div>
          {sonuc && mod === "sifrele" ? (
            <p className="video-uyari">
              Şifreyi güvenli bir yere not edin; unutulan AES-256 şifresi
              kurtarılamaz. Şifreyi PDF&apos;i gönderdiğiniz kanaldan değil,
              ayrı bir kanaldan (ör. SMS veya telefon) iletin.
            </p>
          ) : null}
        </>
      ) : null}
      {hata ? <p className="gorsel-hata">{hata}</p> : null}
      <p className="date-calc-note">
        PDF ve şifreniz tarayıcınızda işlenir, hiçbir sunucuya gönderilmez.
        Şifreleme motoru (qpdf, yaklaşık 1,4 MB) ilk kullanımda bir kez
        indirilir.
        {mod === "kaldir"
          ? " Yalnızca size ait ya da açma yetkiniz olan belgelerde kullanın."
          : ""}
      </p>
    </div>
  );
}
