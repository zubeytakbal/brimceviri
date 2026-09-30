"use client";

import { useEffect, useRef, useState } from "react";
import { boyutMetni } from "../../converter/gorsel/formatlar";
import type { UdfBelge } from "../../converter/belge/udf";
import DosyaBirak from "../gorsel/DosyaBirak";
import { indir } from "../gorsel/tuval";

type Odak = "ac" | "pdf" | "word";

/** UYAP .udf belgesini açar; PDF (yazdır), Word ve metin olarak kaydeder. */
export default function UdfAc({ odak = "ac" }: { odak?: Odak }) {
  const [dosya, setDosya] = useState<File | null>(null);
  const [belge, setBelge] = useState<UdfBelge | null>(null);
  const [html, setHtml] = useState("");
  const [durum, setDurum] = useState("");
  const [hata, setHata] = useState("");
  const cerceve = useRef<HTMLIFrameElement>(null);
  const urller = useRef<string[]>([]);

  useEffect(
    () => () => {
      for (const u of urller.current) URL.revokeObjectURL(u);
    },
    [],
  );

  const temelAd = (dosya?.name ?? "belge").replace(/\.udf$/i, "");

  const ac = async (f: File) => {
    setHata("");
    setBelge(null);
    setHtml("");
    setDosya(f);
    try {
      const { udfOku, udfHtml } = await import("../../converter/belge/udf");
      const b = await udfOku(new Uint8Array(await f.arrayBuffer()));
      setBelge(b);
      setHtml(udfHtml(b, f.name.replace(/\.udf$/i, "")));
    } catch (e) {
      setHata(
        e instanceof Error ? e.message : "Dosya açılamadı; UDF belgesi değil.",
      );
    }
  };

  const kaydet = (veri: BlobPart, tur: string, ad: string) => {
    const u = URL.createObjectURL(new Blob([veri], { type: tur }));
    urller.current.push(u);
    indir(u, ad);
  };

  const pdf = () => {
    const w = cerceve.current?.contentWindow;
    if (!w) return;
    w.focus();
    w.print();
  };

  const word = async () => {
    if (!belge) return;
    setDurum("Word belgesi hazırlanıyor…");
    try {
      const { udfDocx } = await import("../../converter/belge/docx");
      kaydet(
        (await udfDocx(belge)) as BlobPart,
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        `${temelAd}.docx`,
      );
    } catch (e) {
      setHata(e instanceof Error ? e.message : "Word belgesi oluşturulamadı.");
    } finally {
      setDurum("");
    }
  };

  const txt = async () => {
    if (!belge) return;
    const { udfMetin } = await import("../../converter/belge/udf");
    kaydet("﻿" + udfMetin(belge), "text/plain;charset=utf-8", `${temelAd}.txt`);
  };

  const dugmeler = [
    {
      id: "pdf",
      ad: "PDF olarak kaydet",
      fn: pdf,
    },
    { id: "word", ad: "Word (.docx) indir", fn: () => void word() },
    { id: "txt", ad: "Metin (.txt) indir", fn: () => void txt() },
  ].sort((a, b) => (a.id === odak ? -1 : b.id === odak ? 1 : 0));

  return (
    <div className="date-calc gorsel-arac">
      <DosyaBirak
        tur="belge"
        accept=".udf"
        coklu={false}
        max={1}
        baslik={dosya ? "Başka bir UDF seçin" : "UDF dosyasını seçin"}
        onSec={(d) => void ac(d[0])}
      />
      {hata ? <p className="gorsel-hata">{hata}</p> : null}
      {belge && dosya ? (
        <>
          <p className="vesikalik-ozet">
            <b>{dosya.name}</b> · {boyutMetni(dosya.size)}
            {belge.imzali ? " · 🔏 e-imzalı" : ""}
          </p>
          <div className="gorsel-alt belge-dugmeler">
            {dugmeler.map((d, i) => (
              <button
                key={d.id}
                type="button"
                className={`time-tool-button${i ? " is-secondary" : ""}`}
                disabled={!!durum}
                onClick={d.fn}
              >
                {d.ad}
              </button>
            ))}
            {durum ? <span>{durum}</span> : null}
          </div>
          {odak === "pdf" || odak === "ac" ? (
            <p className="date-calc-note">
              PDF için açılan yazdırma penceresinde hedef olarak{" "}
              <b>&quot;PDF olarak kaydet&quot;</b> seçin. Telefonda: Paylaş →
              Yazdır → PDF olarak kaydet.
            </p>
          ) : null}
          {belge.dogrulamaKodu ? (
            <p className="belge-dogrulama">
              UYAP doğrulama kodu: <code>{belge.dogrulamaKodu}</code>
            </p>
          ) : null}
          <iframe
            ref={cerceve}
            className="udf-onizleme"
            title="UDF belgesinin önizlemesi"
            sandbox="allow-same-origin allow-modals"
            srcDoc={html}
          />
        </>
      ) : null}
      <p className="date-calc-note">
        Belgeniz tarayıcınızda açılır, hiçbir sunucuya yüklenmez. UYAP Doküman
        Editörü veya Java kurmanız gerekmez. E-imza bilgisi korunmaz: dönüşen
        PDF/Word, imzalı aslın yerine geçmez.
      </p>
    </div>
  );
}
