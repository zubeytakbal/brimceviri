"use client";

import { useEffect } from "react";

// Telefonda uzun rehber metnini kısaltır: kapsayıcıdaki her h2 "+" ile açılan bir başlığa döner, altındaki içerik
// (bir sonraki h2'ye kadar) kapalı başlar. Geniş ekranda her şey açıktır. Metin HTML'de durduğu için arama
// motorları okumaya devam eder; içindekiler bağlantısıyla gelinen bölüm kendiliğinden açılır.
// Destekleyen tarayıcılarda kapalı içerik hidden="until-found" ile gizlenir: "sayfada bul" kapalı bölümdeki metni
// bulur ve bölümü kendiliğinden açar. Desteklemeyenlerde .mb-gizli sınıfı kullanılır.
const KAPSAYICI = ".saat-icerik, .category-article-content, .zm-aile, .zm-bolum";

export default function MobilBolumler() {
  useEffect(() => {
    const dar = window.matchMedia("(max-width: 720px)");
    const basliklar = Array.from(
      document.querySelectorAll<HTMLElement>(`:is(${KAPSAYICI}) > h2`),
    );
    const bolum = (h: HTMLElement) => {
      const out: HTMLElement[] = [];
      for (
        let el = h.nextElementSibling;
        el && el.tagName !== "H2";
        el = el.nextElementSibling
      ) {
        if (el instanceof HTMLElement) out.push(el);
      }
      return out;
    };
    const bulunur = "onbeforematch" in document.body;
    const gizle = (el: HTMLElement, gizli: boolean) => {
      if (bulunur) {
        if (gizli) el.setAttribute("hidden", "until-found");
        else el.removeAttribute("hidden");
      } else el.classList.toggle("mb-gizli", gizli);
    };
    const ac = (h: HTMLElement, acik: boolean) => {
      h.setAttribute("aria-expanded", String(acik));
      for (const el of bolum(h)) gizle(el, !acik);
    };
    // "Sayfada bul" kapalı bir bölümde eşleşme bulduğunda o bölümün başlığını da açık duruma getir.
    const eslesme = (e: Event) => {
      const el = e.target as HTMLElement;
      const h = basliklar.find((b) => bolum(b).some((x) => x === el || x.contains(el)));
      if (h) ac(h, true);
    };
    const kur = () => {
      for (const h of basliklar) {
        if (dar.matches) {
          h.classList.add("mb-baslik");
          h.setAttribute("role", "button");
          h.setAttribute("tabindex", "0");
          ac(h, false);
        } else {
          h.classList.remove("mb-baslik");
          h.removeAttribute("role");
          h.removeAttribute("tabindex");
          h.removeAttribute("aria-expanded");
          for (const el of bolum(h)) gizle(el, false);
        }
      }
      adres();
    };
    const tikla = (e: Event) => {
      if (!dar.matches) return;
      const h = e.currentTarget as HTMLElement;
      if (e instanceof KeyboardEvent && e.key !== "Enter" && e.key !== " ")
        return;
      e.preventDefault();
      ac(h, h.getAttribute("aria-expanded") !== "true");
    };
    // Adresteki #bolum, kapalı bir bölümün içindeyse o bölümü aç.
    const adres = () => {
      if (!dar.matches) return;
      const id = decodeURIComponent(window.location.hash.slice(1));
      const hedef = id ? document.getElementById(id) : null;
      if (!hedef) return;
      const h =
        hedef.tagName === "H2"
          ? hedef
          : basliklar.find((b) =>
              bolum(b).some((el) => el === hedef || el.contains(hedef)),
            );
      if (h && basliklar.includes(h)) ac(h, true);
    };
    for (const h of basliklar) {
      h.addEventListener("click", tikla);
      h.addEventListener("keydown", tikla);
    }
    document.addEventListener("beforematch", eslesme, true);
    kur();
    dar.addEventListener("change", kur);
    window.addEventListener("hashchange", adres);
    return () => {
      for (const h of basliklar) {
        h.removeEventListener("click", tikla);
        h.removeEventListener("keydown", tikla);
      }
      document.removeEventListener("beforematch", eslesme, true);
      dar.removeEventListener("change", kur);
      window.removeEventListener("hashchange", adres);
    };
  }, []);
  return null;
}
