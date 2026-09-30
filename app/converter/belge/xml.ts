// Küçük, sırayı koruyan XML ayrıştırıcı (tarayıcı ve Node'da aynı çalışır; DOMParser gerektirmez).

export type XmlDugum = {
  /** Önekiyle birlikte etiket adı (ör. "tipler:Konu"). */
  ad: string;
  /** Öneksiz yerel ad (ör. "Konu"). */
  yerel: string;
  oz: Record<string, string>;
  cocuk: Array<XmlDugum | string>;
};

const VARLIK: Record<string, string> = {
  lt: "<",
  gt: ">",
  amp: "&",
  quot: '"',
  apos: "'",
};

export function varlikCoz(s: string) {
  if (!s.includes("&")) return s;
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (h, v: string) => {
    if (v[0] === "#") {
      const n =
        v[1] === "x" || v[1] === "X"
          ? parseInt(v.slice(2), 16)
          : parseInt(v.slice(1), 10);
      return Number.isFinite(n) && n <= 0x10ffff ? String.fromCodePoint(n) : h;
    }
    return VARLIK[v] ?? h;
  });
}

const yerelAd = (ad: string) => ad.slice(ad.indexOf(":") + 1);

/** XML metnini ağaca çevirir; kök düğümü döndürür. */
export function xmlAyristir(metin: string): XmlDugum {
  const s = metin.charCodeAt(0) === 0xfeff ? metin.slice(1) : metin;
  const kok: XmlDugum = { ad: "#belge", yerel: "#belge", oz: {}, cocuk: [] };
  const yigin: XmlDugum[] = [kok];
  let i = 0;
  const ekle = (x: XmlDugum | string) => {
    const ust = yigin[yigin.length - 1];
    if (typeof x === "string") {
      const son = ust.cocuk[ust.cocuk.length - 1];
      if (typeof son === "string") ust.cocuk[ust.cocuk.length - 1] = son + x;
      else ust.cocuk.push(x);
    } else ust.cocuk.push(x);
  };
  while (i < s.length) {
    const lt = s.indexOf("<", i);
    if (lt < 0) {
      ekle(varlikCoz(s.slice(i)));
      break;
    }
    if (lt > i) ekle(varlikCoz(s.slice(i, lt)));
    if (s.startsWith("<!--", lt)) {
      const e = s.indexOf("-->", lt + 4);
      i = e < 0 ? s.length : e + 3;
    } else if (s.startsWith("<![CDATA[", lt)) {
      const e = s.indexOf("]]>", lt + 9);
      ekle(s.slice(lt + 9, e < 0 ? s.length : e));
      i = e < 0 ? s.length : e + 3;
    } else if (s[lt + 1] === "?") {
      const e = s.indexOf("?>", lt + 2);
      i = e < 0 ? s.length : e + 2;
    } else if (s[lt + 1] === "!") {
      // DOCTYPE; iç alt küme köşeli parantezle olabilir
      let d = 0;
      let j = lt + 2;
      for (; j < s.length; j++) {
        if (s[j] === "[") d++;
        else if (s[j] === "]") d--;
        else if (s[j] === ">" && d <= 0) break;
      }
      i = j + 1;
    } else if (s[lt + 1] === "/") {
      const e = s.indexOf(">", lt);
      const ad = s.slice(lt + 2, e).trim();
      // eşleşen açık etikete kadar kapat (bozuk belgelerde hoşgörülü)
      for (let k = yigin.length - 1; k > 0; k--)
        if (yigin[k].ad === ad) {
          yigin.length = k;
          break;
        }
      i = e < 0 ? s.length : e + 1;
    } else {
      // açılış etiketi: tırnak içindeki ">" karakterlerini atla
      let j = lt + 1;
      let tirnak = "";
      for (; j < s.length; j++) {
        const c = s[j];
        if (tirnak) {
          if (c === tirnak) tirnak = "";
        } else if (c === '"' || c === "'") tirnak = c;
        else if (c === ">") break;
      }
      let ic = s.slice(lt + 1, j);
      const kendindenKapali = ic.endsWith("/");
      if (kendindenKapali) ic = ic.slice(0, -1);
      const m = /^[^\s/>]+/.exec(ic);
      const ad = m ? m[0] : "";
      const oz: Record<string, string> = {};
      const re = /([^\s=]+)\s*=\s*("([^"]*)"|'([^']*)')/g;
      let a: RegExpExecArray | null;
      const govde = ic.slice(ad.length);
      while ((a = re.exec(govde))) oz[a[1]] = varlikCoz(a[3] ?? a[4] ?? "");
      const d: XmlDugum = { ad, yerel: yerelAd(ad), oz, cocuk: [] };
      ekle(d);
      if (!kendindenKapali) yigin.push(d);
      i = j + 1;
    }
  }
  const ilk = kok.cocuk.find((c): c is XmlDugum => typeof c !== "string");
  if (!ilk) throw new Error("XML içeriği bulunamadı.");
  return ilk;
}

export const altlar = (d: XmlDugum) =>
  d.cocuk.filter((c): c is XmlDugum => typeof c !== "string");

/** Yerel adı eşleşen ilk alt düğüm (büyük/küçük harf duyarsız). */
export function bul(d: XmlDugum | undefined, yerel: string) {
  if (!d) return undefined;
  const k = yerel.toLowerCase();
  return altlar(d).find((c) => c.yerel.toLowerCase() === k);
}

/** Ağaçta yerel adı eşleşen tüm düğümler (derinlik öncelikli, belge sırasıyla). */
export function hepsi(d: XmlDugum, yerel: string): XmlDugum[] {
  const k = yerel.toLowerCase();
  const out: XmlDugum[] = [];
  const gez = (x: XmlDugum) => {
    for (const c of altlar(x)) {
      if (c.yerel.toLowerCase() === k) out.push(c);
      gez(c);
    }
  };
  gez(d);
  return out;
}

/** Düğümün tüm metni (alt düğümler dahil). */
export function metin(d: XmlDugum | undefined): string {
  if (!d) return "";
  return d.cocuk.map((c) => (typeof c === "string" ? c : metin(c))).join("");
}
