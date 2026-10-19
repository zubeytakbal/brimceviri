"use client";

// Ana sayfadaki "Mühendislik ve bilim" kartları: beton hacmi, kW → amper ve malzeme ağırlığı (yoğunlukla).
// Hızlı çeviri kartlarıyla aynı görünüm; her kart ilgili aracın tam sayfasına bağlanır. Hesaplar tam sayfalardakiyle aynıdır.
import { useState } from "react";
import Link from "@/app/components/SiteLink";
import { betonHacmi, kwAmper } from "../converter/hizliCevir";

export type KartMalzeme = { id: string; ad: string; yogunluk: number };

const sayiOku = (s: string) => Number(s.replace(/\s/g, "").replace(",", "."));
const bicim = (x: number, basamak = 2) => (Number.isFinite(x) ? x.toLocaleString("tr-TR", { maximumFractionDigits: basamak }) : "—");

function Alan({ etiket, deger, degis, birim }: { etiket: string; deger: string; degis: (v: string) => void; birim?: string }) {
  return (
    <label className="hizli-alan">
      <span>
        {etiket}
        {birim ? ` (${birim})` : ""}
      </span>
      <input type="text" inputMode="decimal" value={deger} onChange={(e) => degis(e.target.value)} />
    </label>
  );
}

function Sonuc({ metin }: { metin: string }) {
  return (
    <div className="hizli-sonuc" aria-live="polite">
      <strong>{metin}</strong>
    </div>
  );
}

function BetonKarti() {
  const [en, setEn] = useState("5");
  const [boy, setBoy] = useState("4");
  const [kal, setKal] = useState("15");
  const m3 = betonHacmi(sayiOku(en), sayiOku(boy), sayiOku(kal), 5);
  return (
    <div className="hizli-kart">
      <div className="hizli-kart-baslik">
        <h3>Beton hesaplama</h3>
      </div>
      <div className="hizli-ikili">
        <Alan etiket="En" birim="m" deger={en} degis={setEn} />
        <Alan etiket="Boy" birim="m" deger={boy} degis={setBoy} />
      </div>
      <Alan etiket="Kalınlık" birim="cm" deger={kal} degis={setKal} />
      <Sonuc metin={`${bicim(m3)} m³`} />
      <p className="hizli-alt">
        <span>%5 fire dahil</span>
        <Link href="/beton-hesaplama">Beton hesaplama</Link>
      </p>
    </div>
  );
}

function AmperKarti() {
  const [kw, setKw] = useState("5,5");
  const [sistem, setSistem] = useState("400-3");
  const [cos, setCos] = useState("0,9");
  const [volt, faz] = sistem.split("-");
  const amper = kwAmper(sayiOku(kw), Number(volt), faz === "3", sayiOku(cos));
  return (
    <div className="hizli-kart">
      <div className="hizli-kart-baslik">
        <h3>kW → Amper</h3>
      </div>
      <Alan etiket="Güç" birim="kW" deger={kw} degis={setKw} />
      <div className="hizli-ikili">
        <label className="hizli-alan">
          <span>Şebeke</span>
          <select value={sistem} onChange={(e) => setSistem(e.target.value)}>
            <option value="230-1">230 V tek faz</option>
            <option value="400-3">400 V üç faz</option>
          </select>
        </label>
        <Alan etiket="cos φ" deger={cos} degis={setCos} />
      </div>
      <Sonuc metin={`${bicim(amper)} A`} />
      <p className="hizli-alt">
        <span>Verim %100 kabul edilir</span>
        <Link href="/muhendislik-hesaplayicilari/elektrik-hesaplari/kw-to-amper-hesaplama">kW to amper</Link>
      </p>
    </div>
  );
}

function MalzemeKarti({ malzemeler }: { malzemeler: KartMalzeme[] }) {
  const [id, setId] = useState(malzemeler.some((m) => m.id === "pekmez") ? "pekmez" : malzemeler[0].id);
  const [litre, setLitre] = useState("1");
  const m = malzemeler.find((x) => x.id === id)!;
  const kg = (sayiOku(litre) / 1000) * m.yogunluk;
  return (
    <div className="hizli-kart">
      <div className="hizli-kart-baslik">
        <h3>Litre kaç kilo?</h3>
      </div>
      <label className="hizli-alan">
        <span>Malzeme</span>
        <select value={id} onChange={(e) => setId(e.target.value)}>
          {malzemeler.map((x) => (
            <option key={x.id} value={x.id}>
              {x.ad}
            </option>
          ))}
        </select>
      </label>
      <Alan etiket="Hacim" birim="litre" deger={litre} degis={setLitre} />
      <Sonuc metin={`${bicim(kg, 3)} kg`} />
      <p className="hizli-alt">
        <span>Yoğunluk {bicim(m.yogunluk, 0)} kg/m³</span>
        <Link href={`/malzeme-ozellikleri/${m.id}`}>{m.ad} özellikleri</Link>
      </p>
    </div>
  );
}

export default function MuhendislikKartlari({ malzemeler }: { malzemeler: KartMalzeme[] }) {
  return (
    <section className="hizli-cevirme" aria-labelledby="muhendislik-kartlari-baslik">
      <div className="hizli-cevirme-ust">
        <h2 id="muhendislik-kartlari-baslik">Mühendislik ve bilim</h2>
        <p>Sık kullanılan üç hesap; ayrıntılı hesap ve açıklamalar için kartın altındaki bağlantıyı kullanın.</p>
      </div>
      <div className="hizli-kartlar">
        <BetonKarti />
        <AmperKarti />
        <MalzemeKarti malzemeler={malzemeler} />
      </div>
    </section>
  );
}
