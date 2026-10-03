"use client";

import { useState } from "react";
import { boyaKilo, BOYA_YOGUNLUK, dosemeBeton, fayansKutu, kmMaliyet } from "../converter/evHesaplari";
import { ondalik } from "../converter/sayiOku";

const s = (n: number, d = 0) => n.toLocaleString("tr-TR", { maximumFractionDigits: d });

function Alan({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="date-calc-field">
      <span>{label}</span>
      <input inputMode="decimal" value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

function Stat({ main, label, value, note }: { main?: boolean; label: string; value: string; note?: string }) {
  return (
    <div className={`date-calc-stat${main ? " is-main" : ""}`}>
      <span>{label}</span>
      <strong>{value}</strong>
      {note ? <em>{note}</em> : null}
    </div>
  );
}

/* ---------------- Boya: kaç kilo? ---------------- */

export function BoyaKiloHesabi() {
  const [alan, setAlan] = useState("100");
  const [kat, setKat] = useState("2");
  const [sarfiyat, setSarfiyat] = useState("12");
  const r = boyaKilo(ondalik(alan), ondalik(kat), ondalik(sarfiyat));
  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields is-amounts">
          <Alan label="Boyanacak alan (m²)" value={alan} onChange={setAlan} />
          <Alan label="Kat sayısı" value={kat} onChange={setKat} />
          <Alan label="1 kg boya kaç m² boyar (tek kat)" value={sarfiyat} onChange={setSarfiyat} />
        </div>
      </div>
      {r ? (
        <div className="date-calc-results">
          <Stat main label="Gereken boya" value={`${s(r.kg, 1)} kg`} note={`yaklaşık ${s(r.litre, 1)} litre (1 kg ≈ ${s(1 / BOYA_YOGUNLUK, 2)} L)`} />
          <Stat label="Alınacak kutular" value={r.kutular.map((k) => `${k.adet} × ${s(k.kg, 1)} kg`).join(" + ")} note={`toplam ${s(r.alinan, 1)} kg`} />
        </div>
      ) : (
        <p className="date-calc-note">Alan, kat ve sarfiyatı girin.</p>
      )}
      <p className="date-calc-note">Sarfiyat boyanın türüne ve yüzeye göre değişir; kutunun üzerindeki &quot;m²/kg&quot; değerini yazın. Plastik iç cephe boyalarında tek katta genellikle 10–14 m²/kg yazar.</p>
    </div>
  );
}

/* ---------------- Fayans: kaç kutu? ---------------- */

export function FayansKutuHesabi() {
  const [alan, setAlan] = useState("20");
  const [en, setEn] = useState("60");
  const [boy, setBoy] = useState("60");
  const [adet, setAdet] = useState("4");
  const [fire, setFire] = useState("10");
  const r = fayansKutu(ondalik(alan), ondalik(en), ondalik(boy), ondalik(adet), ondalik(fire));
  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields is-amounts">
          <Alan label="Döşenecek alan (m²)" value={alan} onChange={setAlan} />
          <Alan label="Fayans eni (cm)" value={en} onChange={setEn} />
          <Alan label="Fayans boyu (cm)" value={boy} onChange={setBoy} />
          <Alan label="Kutudaki adet" value={adet} onChange={setAdet} />
          <Alan label="Fire (%)" value={fire} onChange={setFire} />
        </div>
      </div>
      {r ? (
        <div className="date-calc-results">
          <Stat main label="Alınacak kutu" value={`${r.kutu} kutu`} note={`${r.adet} adet fayans (fire dahil)`} />
          <Stat label="1 kutu" value={`${s(r.kutuM2, 2)} m²`} note={`tek fayans ${s(r.tekAlan, 3)} m²`} />
          <Stat label="Alınan toplam alan" value={`${s(r.alinanM2, 2)} m²`} />
        </div>
      ) : (
        <p className="date-calc-note">Alanı, fayans ölçüsünü ve kutudaki adedi girin.</p>
      )}
    </div>
  );
}

/* ---------------- Beton: döşeme ve mikser ---------------- */

export function DosemeBetonHesabi() {
  const [alan, setAlan] = useState("100");
  const [kalinlik, setKalinlik] = useState("15");
  const [mikser, setMikser] = useState("8");
  const r = dosemeBeton(ondalik(alan), ondalik(kalinlik), ondalik(mikser));
  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields is-amounts">
          <Alan label="Alan (m²)" value={alan} onChange={setAlan} />
          <Alan label="Kalınlık (cm)" value={kalinlik} onChange={setKalinlik} />
          <Alan label="Mikser kapasitesi (m³)" value={mikser} onChange={setMikser} />
        </div>
      </div>
      {r ? (
        <div className="date-calc-results">
          <Stat main label="Gereken beton" value={`${s(r.m3, 2)} m³`} note={`${s(r.litre)} litre`} />
          <Stat label="Mikser" value={`${r.mikser} mikser`} note={`${s(ondalik(mikser), 1)} m³'lük`} />
          <Stat label="Ağırlık" value={`yaklaşık ${s(r.ton, 1)} ton`} note="1 m³ beton ≈ 2,4 ton" />
        </div>
      ) : (
        <p className="date-calc-note">Alanı ve kalınlığı girin.</p>
      )}
    </div>
  );
}

/* ---------------- Yakıt: km başına maliyet ---------------- */

export function KmMaliyetHesabi() {
  const [tuketim, setTuketim] = useState("7");
  const [fiyat, setFiyat] = useState("");
  const r = kmMaliyet(ondalik(tuketim), ondalik(fiyat));
  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields is-amounts">
          <Alan label="100 km'de kaç litre" value={tuketim} onChange={setTuketim} />
          <Alan label="Yakıtın litre fiyatı (TL)" value={fiyat} onChange={setFiyat} />
        </div>
      </div>
      {r ? (
        <div className="date-calc-results">
          <Stat main label="1 km maliyeti" value={`${s(r.kurusKm, 1)} kuruş`} note={`${s(r.tlKm, 2)} TL/km`} />
          <Stat label="100 km maliyeti" value={`${s(r.tl100km, 2)} TL`} />
        </div>
      ) : (
        <p className="date-calc-note">Güncel litre fiyatını yazın; fiyat sitede saklanmaz.</p>
      )}
    </div>
  );
}
