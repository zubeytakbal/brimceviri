// e-Yazışma Paketi (.eyp) okuyucu. EYP, Open Packaging Conventions (OPC) yapısında bir ZIP'tir:
// üst yazı (genellikle PDF), ekler, üstveri (XML), paket özeti ve imza bileşenleri.
// Bölüm adları ve ad alanları sürüme göre değişebildiği için ilişkiler (.rels), klasör adları ve
// öneksiz XML adlarıyla hoşgörülü okunur.
import { zipOku, type ZipGirdi } from "../arsiv/zipOku";
import { altlar, bul, hepsi, metin, xmlAyristir, type XmlDugum } from "./xml";

export type EypTur =
  | "ustYazi"
  | "ek"
  | "ustveri"
  | "belgeHedef"
  | "paketOzeti"
  | "nihaiOzet"
  | "imza"
  | "ozellik"
  | "diger";

export type EypBilesen = {
  yol: string;
  ad: string;
  tur: EypTur;
  boyut: number;
  ac: () => Promise<Uint8Array>;
};

export type EypEk = {
  sira?: string;
  ad: string;
  aciklama?: string;
  tur?: string;
  dosyaAdi?: string;
  /** Pakette gömülü dosyası bulunduysa */
  bilesen?: EypBilesen;
};

export type EypUstveri = {
  konu?: string;
  tarih?: string;
  belgeNo?: string;
  guvenlikKodu?: string;
  olusturan?: string;
  dagitimlar: string[];
  ilgiler: string[];
  ekler: EypEk[];
  /** Tüm yaprak alanlar (ham görünüm için) */
  alanlar: Array<[string, string]>;
};

export type EypPaket = {
  ustYazi?: EypBilesen;
  ekler: EypEk[];
  ustveri?: EypUstveri;
  bilesenler: EypBilesen[];
  imzali: boolean;
};

const kucuk = (s: string) => s.toLocaleLowerCase("en");

/** İlişki türü veya yol adından bileşen türünü tahmin eder. */
export function turTahmin(ipucu: string): EypTur {
  const s = kucuk(ipucu)
    .replace(/[üÜ]/g, "u")
    .replace(/[ıİ]/g, "i")
    .replace(/[şŞ]/g, "s")
    .replace(/[çÇ]/g, "c")
    .replace(/[ğĞ]/g, "g")
    .replace(/[öÖ]/g, "o")
    .replace(/[^a-z0-9/._-]/g, "");
  if (/ustyazi|ustyaz/.test(s)) return "ustYazi";
  if (/ustveri/.test(s)) return "ustveri";
  if (/belgehedef/.test(s)) return "belgeHedef";
  if (/paketozeti/.test(s)) return "paketOzeti";
  if (/nihaiozet/.test(s)) return "nihaiOzet";
  if (/imza|signature|\.imz$|\.p7s$/.test(s)) return "imza";
  if (/(^|\/)ekler?(\/|$)|\/ek$/.test(s)) return "ek";
  if (/core|docprops|metadata\/core-properties/.test(s)) return "ozellik";
  return "diger";
}

const yolNormal = (y: string) => decodeURIComponent(y.replace(/^\/+/, ""));

function hedefCoz(relsYolu: string, hedef: string) {
  if (hedef.startsWith("/")) return yolNormal(hedef);
  // "_rels/x.rels" → kaynak klasörü; "A/_rels/b.xml.rels" → "A/"
  const klasor = relsYolu.replace(/_rels\/[^/]*$/, "");
  const parca = (klasor + hedef).split("/");
  const out: string[] = [];
  for (const p of parca) {
    if (p === "..") out.pop();
    else if (p && p !== ".") out.push(p);
  }
  return yolNormal(out.join("/"));
}

const yaprak = (d: XmlDugum | undefined) => (d ? metin(d).trim() : "");

/** Bir düğümün altındaki anlamlı yaprak değerlerini "·" ile birleştirir. */
function ozet(d: XmlDugum) {
  const out: string[] = [];
  const gez = (x: XmlDugum) => {
    const a = altlar(x);
    if (!a.length) {
      const t = metin(x).trim();
      if (t && !/id$|^sira$|^kkk$|kodu?$/i.test(x.yerel) && !out.includes(t))
        out.push(t);
    } else a.forEach(gez);
  };
  gez(d);
  return out.join(" · ");
}

export function ustveriCoz(xml: string): EypUstveri {
  const k = xmlAyristir(xml);
  const ilk = (ad: string) => hepsi(k, ad)[0];
  const alanlar: Array<[string, string]> = [];
  const gez = (x: XmlDugum, yol: string) => {
    const a = altlar(x);
    if (!a.length) {
      const t = metin(x).trim();
      if (t) alanlar.push([yol, t]);
    } else for (const c of a) gez(c, yol ? `${yol} › ${c.yerel}` : c.yerel);
  };
  gez(k, "");
  const olusturan = ilk("Olusturan");
  const ekKapsayici = ilk("Ekler");
  const ekler: EypEk[] = (ekKapsayici ? altlar(ekKapsayici) : []).map((e) => ({
    sira: yaprak(bul(e, "Sira")) || undefined,
    ad:
      yaprak(bul(e, "Ad")) ||
      yaprak(bul(e, "Adi")) ||
      yaprak(bul(e, "Aciklama")) ||
      yaprak(bul(e, "DosyaAdi")) ||
      ozet(e),
    aciklama: yaprak(bul(e, "Aciklama")) || undefined,
    tur: yaprak(bul(e, "Tur")) || undefined,
    dosyaAdi: yaprak(bul(e, "DosyaAdi")) || undefined,
  }));
  const liste = (kap: string) => {
    const d = ilk(kap);
    return d ? altlar(d).map(ozet).filter(Boolean) : [];
  };
  return {
    konu: yaprak(ilk("Konu")) || undefined,
    tarih: yaprak(ilk("Tarih")) || undefined,
    belgeNo: yaprak(ilk("BelgeNo")) || undefined,
    guvenlikKodu: yaprak(ilk("GuvenlikKodu")) || undefined,
    olusturan: olusturan ? ozet(olusturan) || undefined : undefined,
    dagitimlar: liste("Dagitimlar"),
    ilgiler: liste("Ilgiler"),
    ekler,
    alanlar,
  };
}

export async function eypAc(veri: Uint8Array): Promise<EypPaket> {
  let girdiler: ZipGirdi[];
  try {
    girdiler = zipOku(veri);
  } catch {
    throw new Error(
      "Bu dosya bir e-Yazışma Paketi (EYP) değil veya bozuk. EYP dosyaları ZIP yapısındadır.",
    );
  }
  const dosyalar = girdiler.filter((g) => !g.klasor);
  const cozucu = new TextDecoder();
  // İlişki dosyalarından tür eşlemesi
  const iliskiTuru = new Map<string, EypTur>();
  for (const r of dosyalar.filter((g) => /\.rels$/i.test(g.ad))) {
    try {
      const k = xmlAyristir(cozucu.decode(await r.ac()));
      for (const i of altlar(k)) {
        if (!i.oz.Target || i.oz.TargetMode === "External") continue;
        const t = turTahmin(i.oz.Type ?? "");
        if (t !== "diger")
          iliskiTuru.set(kucuk(hedefCoz(r.ad, i.oz.Target)), t);
      }
    } catch {
      /* bozuk ilişki dosyası: klasör adına göre devam */
    }
  }
  const bilesenler: EypBilesen[] = dosyalar
    .filter(
      (g) => !/\.rels$/i.test(g.ad) && !/^\[content_types\]\.xml$/i.test(g.ad),
    )
    .map((g) => {
      const yol = yolNormal(g.ad);
      let tur = iliskiTuru.get(kucuk(yol)) ?? turTahmin(yol);
      // dosya adı "ustveri.xml" ama klasör yoksa
      if (tur === "diger") tur = turTahmin(yol.split("/").pop()!);
      return {
        yol,
        ad: yol.split("/").pop()!,
        tur,
        boyut: g.boyut,
        ac: g.ac,
      };
    });
  if (!bilesenler.length) throw new Error("Paket boş.");

  const ustYazilar = bilesenler.filter((b) => b.tur === "ustYazi");
  const pdfler = (l: EypBilesen[]) => l.filter((b) => /\.pdf$/i.test(b.ad));
  const ustYazi =
    pdfler(ustYazilar)[0] ??
    ustYazilar[0] ??
    // tür bulunamadıysa ek olmayan en büyük PDF
    pdfler(bilesenler.filter((b) => b.tur === "diger")).sort(
      (a, b) => b.boyut - a.boyut,
    )[0];

  let ustveri: EypUstveri | undefined;
  const uv =
    bilesenler.find((b) => b.tur === "ustveri" && /\.xml$/i.test(b.ad)) ??
    undefined;
  if (uv) {
    try {
      ustveri = ustveriCoz(cozucu.decode(await uv.ac()));
    } catch {
      ustveri = undefined;
    }
  }
  if (!ustYazi && !ustveri)
    throw new Error(
      "Pakette üst yazı veya üstveri bulunamadı; bu dosya bir e-Yazışma Paketi olmayabilir.",
    );

  const ekDosyalari = bilesenler.filter((b) => b.tur === "ek");
  const kullanilan = new Set<EypBilesen>();
  const ekler: EypEk[] = (ustveri?.ekler ?? []).map((e) => {
    const aday = e.dosyaAdi
      ? ekDosyalari.find((b) => kucuk(b.ad) === kucuk(e.dosyaAdi!))
      : undefined;
    if (aday) kullanilan.add(aday);
    return { ...e, bilesen: aday };
  });
  // üstveride adı geçmeyen gömülü ekler
  for (const b of ekDosyalari)
    if (!kullanilan.has(b))
      ekler.push({ ad: b.ad, dosyaAdi: b.ad, bilesen: b });

  return {
    ustYazi,
    ekler,
    ustveri,
    bilesenler,
    imzali: bilesenler.some((b) => b.tur === "imza" && b.boyut > 0),
  };
}

/** ISO tarihi Türkçe biçime çevirir; çözemezse olduğu gibi döndürür. */
export function tarihMetni(t: string) {
  const m = /^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}))?/.exec(t);
  if (!m) return t;
  return `${m[3]}.${m[2]}.${m[1]}${m[4] ? ` ${m[4]}:${m[5]}` : ""}`;
}
