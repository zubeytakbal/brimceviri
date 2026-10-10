"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { FilePlus, FolderOpen, Maximize, Minimize, Palette, Save, Share2, ShieldCheck, Volume2, VolumeX } from "lucide-react";
import {
  drawParticipants,
  drawWheel,
  indexAtPointer,
  landingRotation,
  listFingerprint,
  parseEntries,
  pickWeighted,
  secureRandom,
  shuffled,
  splitTeams,
  WHEEL_THEMES,
  type WheelThemeId,
} from "./wheelCore";

// Cark cevir: 2.5D cark, sekmeli panel (girdiler, sonuclar, takimlar, cekilis),
// ozellestirme, kayitli carklar, paylasim linki ve 10.000 cevirmelik adillik testi.

const T = {
  tr: {
    locale: "tr-TR",
    toolbar: "Çark araçları",
    customize: "Özelleştir",
    newWheel: "Yeni",
    myWheels: "Çarklarım",
    save: "Kaydet",
    share: "Paylaş",
    fair: "Adil mi?",
    sound: "Ses",
    fullscreen: "Tam ekran",
    exitFullscreen: "Küçült",
    wheelMode: "Çark modu",
    drawMode: "Çekiliş modu",
    spin: "ÇEVİR",
    spinLabel: "Çarkı çevir",
    hint: "Çarka ya da ortadaki düğmeye dokunun · listedeyken Ctrl + Enter",
    tabs: { entries: "Girdiler", results: "Sonuçlar", teams: "Takımlar", draw: "Çekiliş" },
    shuffle: "Karıştır",
    sort: "A–Z",
    dedupe: "Tekrarları sil",
    presets: "Hazır listeler…",
    presetNames: {
      sinif: "Sınıf listesi (örnek)",
      kim: "Kim başlasın?",
      yemek: "Bu akşam ne yesek?",
      dc: "Doğruluk mu cesaret mi?",
      evet: "Evet / Hayır",
      sayi: "1'den 20'ye sayılar",
    },
    namesLabel: "Her satıra bir isim",
    weightHelp: ["Bir ismin çıkma ihtimalini artırmak için sonuna ", " yazın: ", " diğerlerinden üç kat geniş dilim alır."],
    removeMode: "Çıkan ismi listeden çıkar (herkes sırayla gelsin)",
    resultsTitle: "Bu oturumda çıkanlar",
    copy: "Kopyala",
    clear: "Temizle",
    noResults: "Henüz çevirmediniz.",
    teamsHelp: "Listedeki isimleri rastgele ve eşit sayıda takımlara böler.",
    teamCount: "Takım sayısı",
    split: "Böl",
    team: (i: number, n: number) => `${i}. takım (${n})`,
    drawHelp:
      "Instagram yorumları, müşteri listesi ya da katılımcılar için: asıl ve yedek kazananları seçer, sonucu tarih ve liste parmak iziyle bir kart olarak verir.",
    drawList: "Katılımcılar (yorumları olduğu gibi yapıştırabilirsiniz)",
    winners: "Asıl kazanan",
    backups: "Yedek",
    unique: "Aynı kişiyi bir kez say (birden fazla yorum yapanlar)",
    stripAt: "Satır başındaki @ işaretini yok say",
    exclude: "Hariç tutulacaklar (kendi hesabınız, çalışanlar)",
    excludePlaceholder: "örnek: dukkanim, ayse.calisan",
    runDraw: "Çekilişi yap",
    winnerEyebrow: "Çarkın seçimi",
    again: "Tekrar çevir",
    remove: "Listeden çıkar",
    close: "Kapat",
    customTitle: "Özelleştir",
    theme: "Renk teması",
    themeNames: { turkuaz: "Turkuaz", seker: "Şeker", klasik: "Klasik", gece: "Gece" } as Record<WheelThemeId, string>,
    duration: "Dönüş süresi",
    durations: [
      [3000, "Kısa · 3 sn"],
      [6000, "Normal · 6 sn"],
      [10000, "Uzun · 10 sn"],
    ] as Array<[number, string]>,
    tick: "Tık sesi",
    ticks: [
      ["tik", "Tahta tık"],
      ["zil", "Zil"],
      ["yok", "Sessiz"],
    ] as Array<[TickKind, string]>,
    confetti: "Kazanan çıkınca konfeti",
    ok: "Tamam",
    savedTitle: "Çarklarım",
    savedHelp: "Kaydettiğiniz çarklar yalnızca bu cihazda, bu tarayıcıda durur.",
    noSaved: "Henüz kayıtlı çark yok. Bir listeyi “Kaydet” ile saklayın.",
    names: (n: number) => `${n} isim`,
    open: "Aç",
    del: "Sil",
    saveTitle: "Çarkı kaydet",
    saveName: "Çarkın adı",
    savePlaceholder: "örnek: 9-A sınıfı",
    cancel: "Vazgeç",
    defaultName: (n: number) => `Çark ${n}`,
    fairTitle: "Bu çark adil mi? Kendiniz deneyin",
    fairHelp:
      "Çark, gerçek çevirmede kullandığı rastgele seçimi 10.000 kez tekrarlar. Her ismin kaç kez çıktığını ve olması gereken oranı (çizgi) görürsünüz. Oranlar beklenene yakınsa çark tarafsızdır.",
    fairRun: "10.000 kez çevir",
    fairSummary: (dev: string, cut: boolean) => `En büyük sapma: ${dev} puan${cut ? " · ilk 24 isim gösteriliyor" : ""}`,
    drawTitle: "Çekiliş sonucu",
    drawWinner: (n: string) => `🎉 Kazanan: @${n}`,
    drawWinners: "Asıl kazananlar",
    drawBackups: "Yedekler",
    drawDate: "Tarih",
    drawCount: "Katılımcı",
    drawCountValue: (n: number) => `${n} kişi (tekrarlar ve hariç tutulanlar çıkarıldı)`,
    drawPrint: "Liste parmak izi",
    drawPrintHelp:
      "Parmak izi, katılımcı listesinden üretilen bir koddur. Aynı listeyi yapıştıran herkes aynı kodu görür; listenin çekilişten sonra değiştirilmediğini gösterir.",
    copyResult: "Sonucu kopyala",
    drawText: (when: string, w: string, b: string, n: number, p: string) =>
      `Çekiliş sonucu (${when})\nAsıl: ${w}\nYedek: ${b || "-"}\nKatılımcı: ${n}\nListe parmak izi: ${p}`,
    copied: "Panoya kopyalandı",
    copyFail: "Kopyalanamadı; metni seçip kopyalayın",
    linkCopied: "Çarkın linki kopyalandı; açan herkes aynı listeyi görür",
    needTwo: "Çevirmek için en az iki isim yazın",
    needTeams: (k: number) => `${k} takım için en az ${k} isim gerekli`,
    needDraw: (k: number, n: number) => `${k} kişi seçmek için en az ${k} katılımcı gerekli (şu an ${n})`,
    deduped: (n: number) => `${n} tekrar silindi`,
    opened: (k: string) => `“${k}” açıldı`,
    savedToast: (k: string) => `“${k}” kaydedildi`,
    newToast: "Yeni çark: isimleri yazın",
    sharedLoaded: "Paylaşılan çark açıldı",
    noResultsCopy: "Henüz sonuç yok",
    presetsText: {
      sinif: "Ayşe\nMehmet\nZeynep\nEmir\nElif\nYusuf\nDefne\nKerem\nNehir\nAras\nMira\nÖmer",
      kim: "Ben\nSen\nO\nKim kazanırsa",
      yemek: "Lahmacun\nMantı\nKöfte\nPizza\nDöner\nMakarna\nÇorba ve salata\nEv yemeği",
      dc: "Doğruluk\nCesaret\nDoğruluk\nCesaret\nPas hakkı\nSen seç",
      evet: "Evet\nHayır",
      sayi: Array.from({ length: 20 }, (_, i) => String(i + 1)).join("\n"),
    },
    drawSample:
      "@ayse.kaya harika olmuş 😍\n@mehmet_34 katılıyorum\n@zeynepcan ben de!\n@ayse.kaya bir daha yazayım\n@emir.yilmaz @dukkanim\n@elifsu çok güzel\n@yusuf.k ben\n@defne_art şans bende\n@kerem.ozt @zeynepcan\n@nehirr umarım çıkar\n@dukkanim çekilişimiz başladı",
    excludeSample: "dukkanim",
  },
} as const;

type TickKind = "tik" | "zil" | "yok";
type Tab = "entries" | "results" | "teams" | "draw";
type Dialog = null | "winner" | "custom" | "saved" | "save" | "fair" | "draw";
type Settings = { theme: WheelThemeId; duration: number; tick: TickKind; confetti: boolean };
type FairRow = { label: string; p: number; exp: number };
type DrawResult = { winners: string[]; backups: string[]; when: string; count: number; print: string };

const STORE_KEY = "cark-cevir-v1";
const TABS: Tab[] = ["entries", "results", "teams", "draw"];

function encodeList(text: string) {
  const bytes = new TextEncoder().encode(text);
  let bin = "";
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function decodeList(code: string) {
  const bin = atob(code.replace(/-/g, "+").replace(/_/g, "/"));
  return new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0)));
}

export default function WheelSpinner({ lang = "tr" }: { lang?: "tr" }) {
  const t = T[lang];
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const confettiRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef<SVGSVGElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const namesRef = useRef<HTMLTextAreaElement>(null);
  const rotRef = useRef(0);
  const spinningRef = useRef(false);
  const audioRef = useRef<AudioContext | null>(null);
  const toastTimer = useRef<number | undefined>(undefined);
  const loadedRef = useRef(false);

  const [text, setText] = useState<string>(t.presetsText.sinif);
  const [settings, setSettings] = useState<Settings>({ theme: "turkuaz", duration: 6000, tick: "tik", confetti: true });
  const [saved, setSaved] = useState<Record<string, string>>({});
  const [soundOn, setSoundOn] = useState(true);
  const [tab, setTab] = useState<Tab>("entries");
  const [dialog, setDialog] = useState<Dialog>(null);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState<{ index: number; name: string } | null>(null);
  const [removeMode, setRemoveMode] = useState(false);
  const [results, setResults] = useState<Array<{ name: string; at: string }>>([]);
  const [teamCount, setTeamCount] = useState(2);
  const [teams, setTeams] = useState<string[][]>([]);
  const [fairRows, setFairRows] = useState<FairRow[]>([]);
  const [fairSummary, setFairSummary] = useState("");
  const [saveName, setSaveName] = useState("");
  const [toast, setToast] = useState("");
  const [focus, setFocus] = useState(false);
  const [drawText, setDrawText] = useState<string>(t.drawSample);
  const [drawWin, setDrawWin] = useState(1);
  const [drawBackup, setDrawBackup] = useState(2);
  const [drawUnique, setDrawUnique] = useState(true);
  const [drawStripAt, setDrawStripAt] = useState(true);
  const [drawExclude, setDrawExclude] = useState<string>(t.excludeSample);
  const [rolling, setRolling] = useState("");
  const [drawResult, setDrawResult] = useState<DrawResult | null>(null);

  const entries = useMemo(() => parseEntries(text), [text]);
  const entriesRef = useRef(entries);
  const settingsRef = useRef(settings);
  const soundRef = useRef(soundOn);
  useEffect(() => {
    entriesRef.current = entries;
    settingsRef.current = settings;
    soundRef.current = soundOn;
  }, [entries, settings, soundOn]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(""), 2400);
  }, []);

  const copy = useCallback(
    async (value: string, done: string = t.copied) => {
      try {
        await navigator.clipboard.writeText(value);
        showToast(done);
      } catch {
        showToast(t.copyFail);
      }
    },
    [showToast, t],
  );

  // ---------- cizim ----------
  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    const root = rootRef.current;
    if (!canvas || !root) return;
    const heading = getComputedStyle(root).getPropertyValue("--font-heading").trim();
    drawWheel(canvas, entriesRef.current, rotRef.current, settingsRef.current.theme, `${heading ? heading + ", " : ""}Arial, sans-serif`);
  }, []);

  useEffect(() => {
    redraw();
  }, [entries, settings.theme, redraw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(r.width * dpr);
      canvas.height = Math.round(r.height * dpr);
      redraw();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    document.fonts?.ready.then(redraw);
    return () => ro.disconnect();
  }, [redraw]);

  // ---------- kayit ve paylasilan link ----------
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const s = JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
        if (typeof s.text === "string") setText(s.text);
        if (s.settings && s.settings.theme in WHEEL_THEMES) setSettings((old) => ({ ...old, ...s.settings }));
        if (s.saved && typeof s.saved === "object") setSaved(s.saved);
      } catch {
        // kayit okunamazsa varsayilanlarla devam edilir
      }
      const m = window.location.hash.match(/^#c=([A-Za-z0-9_-]+)$/);
      if (m) {
        try {
          setText(decodeList(m[1]));
          showToast(t.sharedLoaded);
        } catch {
          // bozuk link: yok sayilir
        }
      }
      loadedRef.current = true;
    });
    return () => cancelAnimationFrame(frame);
  }, [showToast, t]);

  useEffect(() => {
    if (!loadedRef.current) return;
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify({ text, settings, saved }));
    } catch {
      // gizli pencerede kayit yapilamayabilir
    }
  }, [text, settings, saved]);

  // ---------- ses ----------
  const ensureAudio = () => {
    try {
      const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!audioRef.current && Ctor) audioRef.current = new Ctor();
      audioRef.current?.resume();
    } catch {
      // ses desteklenmiyorsa sessiz calisir
    }
  };
  const tone = useCallback((freq: number, dur: number, type: OscillatorType, vol: number) => {
    const audio = audioRef.current;
    if (!soundRef.current || !audio) return;
    try {
      const now = audio.currentTime;
      const o = audio.createOscillator();
      const g = audio.createGain();
      o.type = type;
      o.frequency.setValueAtTime(freq, now);
      g.gain.setValueAtTime(vol, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + dur);
      o.connect(g).connect(audio.destination);
      o.start(now);
      o.stop(now + dur + 0.01);
    } catch {
      // yok sayilir
    }
  }, []);
  const tick = useCallback(() => {
    const kind = settingsRef.current.tick;
    if (kind === "tik") tone(1100 + secureRandom() * 150, 0.04, "square", 0.06);
    else if (kind === "zil") tone(1760, 0.09, "sine", 0.12);
  }, [tone]);
  const fanfare = useCallback(() => {
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => window.setTimeout(() => tone(f, 0.18, "triangle", 0.16), i * 110));
  }, [tone]);

  // ---------- konfeti ----------
  const confetti = useCallback(() => {
    const c = confettiRef.current;
    const x = c?.getContext("2d");
    if (!c || !x || !settingsRef.current.confetti || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const pal = [...WHEEL_THEMES[settingsRef.current.theme], "#f0b429", "#ffffff"];
    c.hidden = false;
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    const parts = Array.from({ length: 180 }, () => ({
      x: c.width / 2 + (secureRandom() - 0.5) * 160,
      y: c.height * 0.42,
      vx: (secureRandom() - 0.5) * 16,
      vy: -8 - secureRandom() * 11,
      s: 5 + secureRandom() * 7,
      r: secureRandom() * 6,
      vr: (secureRandom() - 0.5) * 0.4,
      c: pal[Math.floor(secureRandom() * pal.length)],
    }));
    const t0 = performance.now();
    const step = (now: number) => {
      x.clearRect(0, 0, c.width, c.height);
      parts.forEach((p) => {
        p.vy += 0.34;
        p.vx *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        p.r += p.vr;
        x.save();
        x.translate(p.x, p.y);
        x.rotate(p.r);
        x.fillStyle = p.c;
        x.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
        x.restore();
      });
      if (now - t0 < 2700) requestAnimationFrame(step);
      else {
        x.clearRect(0, 0, c.width, c.height);
        c.hidden = true;
      }
    };
    requestAnimationFrame(step);
  }, []);

  // ---------- cevirme ----------
  const spin = () => {
    if (spinningRef.current) return;
    const list = entriesRef.current;
    if (list.length < 2) {
      showToast(t.needTwo);
      return;
    }
    ensureAudio();
    spinningRef.current = true;
    setSpinning(true);
    setDialog(null);
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const { duration } = settingsRef.current;
    const index = pickWeighted(list);
    const turns = reduce ? 1 : Math.max(3, Math.round(duration / 1000)) + Math.floor(secureRandom() * 2);
    const start = rotRef.current;
    const end = landingRotation(list, index, start, turns);
    const dur = reduce ? 1200 : duration * (0.9 + secureRandom() * 0.2);
    const t0 = performance.now();
    let last = indexAtPointer(list, start);
    const frame = (now: number) => {
      const k = Math.min(1, (now - t0) / dur);
      rotRef.current = start + (end - start) * (1 - Math.pow(1 - k, 4));
      redraw();
      const idx = indexAtPointer(list, rotRef.current);
      if (idx !== last) {
        last = idx;
        tick();
        const p = pointerRef.current;
        if (p) {
          p.classList.add("is-flick");
          requestAnimationFrame(() => p.classList.remove("is-flick"));
        }
      }
      if (k < 1) {
        requestAnimationFrame(frame);
        return;
      }
      spinningRef.current = false;
      setSpinning(false);
      const name = list[index].label;
      setWinner({ index, name });
      setResults((r) => [{ name, at: new Date().toLocaleTimeString(t.locale) }, ...r]);
      setDialog("winner");
      fanfare();
      try {
        navigator.vibrate?.([30, 40, 60]);
      } catch {
        // titresim yoksa gecilir
      }
      confetti();
    };
    requestAnimationFrame(frame);
  };

  const removeLine = (index: number) => {
    setText((old) => {
      const lines = old.split("\n");
      let seen = -1;
      for (let k = 0; k < lines.length; k++) {
        if (lines[k].trim()) seen++;
        if (seen === index) {
          lines.splice(k, 1);
          break;
        }
      }
      return lines.join("\n");
    });
  };

  const closeWinner = (remove: boolean) => {
    setDialog(null);
    if ((remove || removeMode) && winner) removeLine(winner.index);
    setWinner(null);
  };

  // ---------- diger islemler ----------
  const runFair = () => {
    if (entries.length < 2) {
      showToast(t.needTwo);
      return;
    }
    const N = 10000;
    const counts = new Array(entries.length).fill(0);
    for (let i = 0; i < N; i++) counts[pickWeighted(entries)]++;
    const total = entries.reduce((s, e) => s + e.weight, 0);
    const rows = entries.map((e, i) => ({ label: e.label, p: counts[i] / N, exp: e.weight / total })).slice(0, 24);
    const maxDev = Math.max(...rows.map((r) => Math.abs(r.p - r.exp) * 100));
    setFairRows(rows);
    setFairSummary(t.fairSummary(maxDev.toLocaleString(t.locale, { maximumFractionDigits: 2 }), entries.length > 24));
  };

  const runDraw = async () => {
    const people = drawParticipants(drawText, { unique: drawUnique, stripAt: drawStripAt, exclude: drawExclude, locale: t.locale });
    const W = Math.max(1, Math.floor(drawWin) || 1);
    const B = Math.max(0, Math.floor(drawBackup) || 0);
    if (people.length < W + B) {
      showToast(t.needDraw(W + B, people.length));
      return;
    }
    ensureAudio();
    let print = "—";
    try {
      print = await listFingerprint(people, t.locale);
    } catch {
      // eski tarayicida crypto.subtle yoksa parmak izi gosterilmez
    }
    const picked = shuffled(people).slice(0, W + B);
    setDrawResult(null);
    setDialog("draw");
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t0 = performance.now();
    const dur = reduce ? 300 : 2200;
    let beat = -1;
    await new Promise<void>((resolve) => {
      const roll = (now: number) => {
        if (now - t0 >= dur) return resolve();
        setRolling("@" + people[Math.floor(secureRandom() * people.length)]);
        if (Math.floor(now / 90) !== beat) {
          beat = Math.floor(now / 90);
          tick();
        }
        requestAnimationFrame(roll);
      };
      requestAnimationFrame(roll);
    });
    setRolling(t.drawWinner(picked[0]));
    setDrawResult({
      winners: picked.slice(0, W),
      backups: picked.slice(W),
      when: new Date().toLocaleString(t.locale, { dateStyle: "long", timeStyle: "medium" }),
      count: people.length,
      print,
    });
    fanfare();
    confetti();
  };

  const toggleFocus = () => {
    const root = rootRef.current;
    if (!root) return;
    const next = !focus;
    setFocus(next);
    try {
      if (next && root.requestFullscreen) root.requestFullscreen().catch(() => {});
      else if (!next && document.fullscreenElement) document.exitFullscreen().catch(() => {});
    } catch {
      // tam ekran desteklenmiyorsa sadece odak gorunumu kullanilir
    }
  };

  useEffect(() => {
    const onChange = () => {
      if (!document.fullscreenElement) setFocus(false);
    };
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  useEffect(() => {
    if (!dialog) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (dialog === "winner") {
        setDialog(null);
        setWinner(null);
      } else setDialog(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [dialog]);

  const onTilt = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = tiltRef.current;
    if (!el || spinningRef.current || e.pointerType === "touch" || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - r.left) / r.width - 0.5;
    const dy = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateX(${(-dy * 9).toFixed(2)}deg) rotateY(${(dx * 9).toFixed(2)}deg)`;
  };

  const lines = () => text.split("\n").filter((s) => s.trim());
  const setLines = (list: string[]) => setText(list.join("\n"));
  const dialogProps = (id: Exclude<Dialog, null>, onClose = () => setDialog(null)) => ({
    className: "wheel-overlay",
    hidden: dialog !== id,
    onClick: (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
  });

  const toolbar: Array<{ icon: typeof Palette; label: string; onClick: () => void; pressed?: boolean }> = [
    { icon: Palette, label: t.customize, onClick: () => setDialog("custom") },
    {
      icon: FilePlus,
      label: t.newWheel,
      onClick: () => {
        setText("");
        setTab("entries");
        namesRef.current?.focus();
        showToast(t.newToast);
      },
    },
    { icon: FolderOpen, label: t.myWheels, onClick: () => setDialog("saved") },
    {
      icon: Save,
      label: t.save,
      onClick: () => {
        setSaveName("");
        setDialog("save");
      },
    },
    {
      icon: Share2,
      label: t.share,
      onClick: () => copy(`${window.location.origin}${window.location.pathname}#c=${encodeList(text)}`, t.linkCopied),
    },
    {
      icon: ShieldCheck,
      label: t.fair,
      onClick: () => {
        setFairRows([]);
        setFairSummary("");
        setDialog("fair");
      },
    },
    { icon: soundOn ? Volume2 : VolumeX, label: t.sound, onClick: () => setSoundOn((v) => !v), pressed: soundOn },
    { icon: focus ? Minimize : Maximize, label: focus ? t.exitFullscreen : t.fullscreen, onClick: toggleFocus },
  ];

  const maxP = Math.max(0.0001, ...fairRows.map((r) => Math.max(r.p, r.exp))) * 1.6;
  const pct = (v: number) => (v * 100).toLocaleString(t.locale, { maximumFractionDigits: 1 });
  const saveNow = () => {
    const name = saveName.trim() || t.defaultName(Object.keys(saved).length + 1);
    setSaved((s) => ({ ...s, [name]: text }));
    setDialog(null);
    showToast(t.savedToast(name));
  };

  return (
    <div ref={rootRef} className={`wheel-app${focus ? " is-focus" : ""}`}>
      <div className="wheel-toolbar" role="toolbar" aria-label={t.toolbar}>
        {toolbar.map(({ icon: Icon, label, onClick, pressed }) => (
          <button key={label} type="button" className="wheel-tool" onClick={onClick} aria-pressed={pressed}>
            <Icon aria-hidden="true" size={18} />
            <span>{label}</span>
          </button>
        ))}
      </div>

      <div className="wheel-main">
        <section className="wheel-stage" aria-label={t.spinLabel}>
          <span className="wheel-mode">
            <i aria-hidden="true" />
            {tab === "draw" ? t.drawMode : t.wheelMode}
          </span>
          <div ref={tiltRef} className="wheel-tilt" onPointerMove={onTilt} onPointerLeave={() => tiltRef.current && (tiltRef.current.style.transform = "")}>
            <div className="wheel-floor" aria-hidden="true" />
            <canvas
              ref={canvasRef}
              className="wheel-canvas"
              tabIndex={0}
              role="button"
              aria-label={t.spinLabel}
              onClick={spin}
              onKeyDown={(e) => {
                if (e.key === " " || e.key === "Enter") {
                  e.preventDefault();
                  spin();
                }
              }}
            />
            <svg ref={pointerRef} className="wheel-pointer" viewBox="0 0 46 40" aria-hidden="true">
              <defs>
                <linearGradient id="wheel-pointer-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#ffc861" />
                  <stop offset="1" stopColor="#e2832a" />
                </linearGradient>
              </defs>
              <path d="M2 20 L36 3 A17 17 0 0 1 36 37 Z" fill="url(#wheel-pointer-fill)" stroke="#7a3d0b" strokeOpacity=".35" strokeWidth="1.5" />
              <circle cx="33" cy="20" r="6" fill="#fff" fillOpacity=".85" />
            </svg>
            <button type="button" className="wheel-hub" onClick={spin} disabled={spinning}>
              {t.spin}
            </button>
          </div>
          <p className="wheel-hint">{t.hint}</p>
        </section>

        <aside className="wheel-panel">
          <div className="wheel-tabs" role="tablist">
            {TABS.map((id) => (
              <button
                key={id}
                type="button"
                role="tab"
                id={`wheel-tab-${id}`}
                aria-selected={tab === id}
                aria-controls={`wheel-pane-${id}`}
                className="wheel-tab"
                onClick={() => setTab(id)}
              >
                {t.tabs[id]}
                {id === "entries" && <span className="wheel-badge">{entries.length}</span>}
                {id === "results" && <span className="wheel-badge">{results.length}</span>}
              </button>
            ))}
          </div>

          <div className="wheel-pane" id="wheel-pane-entries" role="tabpanel" aria-labelledby="wheel-tab-entries" hidden={tab !== "entries"}>
            <div className="wheel-row is-between">
              <div className="wheel-row">
                <button type="button" className="wheel-btn" onClick={() => setLines(shuffled(lines()))}>
                  {t.shuffle}
                </button>
                <button type="button" className="wheel-btn" onClick={() => setLines(lines().sort((a, b) => a.localeCompare(b, t.locale)))}>
                  {t.sort}
                </button>
                <button
                  type="button"
                  className="wheel-btn"
                  onClick={() => {
                    const seen = new Set<string>();
                    const kept = lines().filter((s) => {
                      const k = s.trim().toLocaleLowerCase(t.locale);
                      if (seen.has(k)) return false;
                      seen.add(k);
                      return true;
                    });
                    showToast(t.deduped(lines().length - kept.length));
                    setLines(kept);
                  }}
                >
                  {t.dedupe}
                </button>
              </div>
              <select
                className="wheel-select"
                aria-label={t.presets}
                value=""
                onChange={(e) => {
                  const k = e.target.value as keyof typeof t.presetsText;
                  if (k) setText(t.presetsText[k]);
                }}
              >
                <option value="">{t.presets}</option>
                {(Object.keys(t.presetNames) as Array<keyof typeof t.presetNames>).map((k) => (
                  <option key={k} value={k}>
                    {t.presetNames[k]}
                  </option>
                ))}
              </select>
            </div>
            <label className="wheel-field">
              {t.namesLabel}
              <textarea
                ref={namesRef}
                className="wheel-textarea"
                spellCheck={false}
                value={text}
                readOnly={spinning}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                    e.preventDefault();
                    spin();
                  }
                }}
              />
            </label>
            <p className="wheel-help">
              {t.weightHelp[0]}
              <code>*3</code>
              {t.weightHelp[1]}
              <code>Pizza *3</code>
              {t.weightHelp[2]}
            </p>
            <label className="wheel-toggle">
              <input type="checkbox" checked={removeMode} onChange={(e) => setRemoveMode(e.target.checked)} />
              {t.removeMode}
            </label>
          </div>

          <div className="wheel-pane" id="wheel-pane-results" role="tabpanel" aria-labelledby="wheel-tab-results" hidden={tab !== "results"}>
            <div className="wheel-row is-between">
              <strong>{t.resultsTitle}</strong>
              <div className="wheel-row">
                <button
                  type="button"
                  className="wheel-btn"
                  onClick={() => copy(results.map((r, i) => `${i + 1}. ${r.name} (${r.at})`).join("\n") || t.noResultsCopy)}
                >
                  {t.copy}
                </button>
                <button type="button" className="wheel-btn" onClick={() => setResults([])}>
                  {t.clear}
                </button>
              </div>
            </div>
            {results.length ? (
              <ol className="wheel-list">
                {results.map((r, i) => (
                  <li key={`${results.length - i}`}>
                    {r.name}
                    <span>{r.at}</span>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="wheel-empty">{t.noResults}</p>
            )}
          </div>

          <div className="wheel-pane" id="wheel-pane-teams" role="tabpanel" aria-labelledby="wheel-tab-teams" hidden={tab !== "teams"}>
            <p className="wheel-help">{t.teamsHelp}</p>
            <div className="wheel-row">
              <div className="wheel-seg" role="group" aria-label={t.teamCount}>
                {[2, 3, 4, 5, 6].map((k) => (
                  <button key={k} type="button" aria-pressed={teamCount === k} onClick={() => setTeamCount(k)}>
                    {k}
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="wheel-btn is-primary"
                onClick={() => {
                  if (entries.length < teamCount) showToast(t.needTeams(teamCount));
                  else setTeams(splitTeams(entries.map((e) => e.label), teamCount));
                }}
              >
                {t.split}
              </button>
            </div>
            {teams.length > 0 && (
              <div className="wheel-teams">
                {teams.map((team, i) => (
                  <div key={i} className="wheel-team">
                    <strong>{t.team(i + 1, team.length)}</strong>
                    <ul>
                      {team.map((n, j) => (
                        <li key={j}>{n}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="wheel-pane" id="wheel-pane-draw" role="tabpanel" aria-labelledby="wheel-tab-draw" hidden={tab !== "draw"}>
            <p className="wheel-help">{t.drawHelp}</p>
            <label className="wheel-field">
              {t.drawList}
              <textarea className="wheel-textarea is-short" spellCheck={false} value={drawText} onChange={(e) => setDrawText(e.target.value)} />
            </label>
            <div className="wheel-row">
              <label className="wheel-field">
                {t.winners}
                <input className="wheel-input is-number" type="number" min={1} max={50} value={drawWin} onChange={(e) => setDrawWin(Number(e.target.value))} />
              </label>
              <label className="wheel-field">
                {t.backups}
                <input className="wheel-input is-number" type="number" min={0} max={50} value={drawBackup} onChange={(e) => setDrawBackup(Number(e.target.value))} />
              </label>
            </div>
            <label className="wheel-toggle">
              <input type="checkbox" checked={drawUnique} onChange={(e) => setDrawUnique(e.target.checked)} />
              {t.unique}
            </label>
            <label className="wheel-toggle">
              <input type="checkbox" checked={drawStripAt} onChange={(e) => setDrawStripAt(e.target.checked)} />
              {t.stripAt}
            </label>
            <label className="wheel-field">
              {t.exclude}
              <input className="wheel-input" type="text" placeholder={t.excludePlaceholder} value={drawExclude} onChange={(e) => setDrawExclude(e.target.value)} />
            </label>
            <button type="button" className="wheel-btn is-primary" onClick={runDraw}>
              {t.runDraw}
            </button>
          </div>
        </aside>
      </div>

      <div {...dialogProps("winner", () => closeWinner(false))}>
        <div className="wheel-card" role="dialog" aria-modal="true" aria-labelledby="wheel-winner">
          <p className="wheel-eyebrow">{t.winnerEyebrow}</p>
          <p className="wheel-winner" id="wheel-winner">
            {winner?.name}
          </p>
          <div className="wheel-row is-center">
            <button
              type="button"
              className="wheel-btn is-primary"
              onClick={() => {
                closeWinner(false);
                requestAnimationFrame(spin);
              }}
            >
              {t.again}
            </button>
            <button type="button" className="wheel-btn" onClick={() => closeWinner(true)}>
              {t.remove}
            </button>
            <button type="button" className="wheel-btn" onClick={() => closeWinner(false)}>
              {t.close}
            </button>
          </div>
        </div>
      </div>

      <div {...dialogProps("custom")}>
        <div className="wheel-card is-wide" role="dialog" aria-modal="true" aria-labelledby="wheel-custom-title">
          <h2 id="wheel-custom-title">{t.customTitle}</h2>
          <div className="wheel-field">
            {t.theme}
            <div className="wheel-swatches">
              {(Object.keys(WHEEL_THEMES) as WheelThemeId[]).map((k) => (
                <button key={k} type="button" className="wheel-swatch" aria-pressed={settings.theme === k} onClick={() => setSettings((s) => ({ ...s, theme: k }))}>
                  <span className="wheel-chips">
                    {WHEEL_THEMES[k].slice(0, 6).map((c) => (
                      <i key={c} style={{ background: c } as CSSProperties} />
                    ))}
                  </span>
                  {t.themeNames[k]}
                </button>
              ))}
            </div>
          </div>
          <div className="wheel-field">
            {t.duration}
            <div className="wheel-seg" role="group" aria-label={t.duration}>
              {t.durations.map(([d, label]) => (
                <button key={d} type="button" aria-pressed={settings.duration === d} onClick={() => setSettings((s) => ({ ...s, duration: d }))}>
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="wheel-field">
            {t.tick}
            <div className="wheel-seg" role="group" aria-label={t.tick}>
              {t.ticks.map(([k, label]) => (
                <button key={k} type="button" aria-pressed={settings.tick === k} onClick={() => setSettings((s) => ({ ...s, tick: k }))}>
                  {label}
                </button>
              ))}
            </div>
          </div>
          <label className="wheel-toggle">
            <input type="checkbox" checked={settings.confetti} onChange={(e) => setSettings((s) => ({ ...s, confetti: e.target.checked }))} />
            {t.confetti}
          </label>
          <div className="wheel-row is-center">
            <button type="button" className="wheel-btn is-primary" onClick={() => setDialog(null)}>
              {t.ok}
            </button>
          </div>
        </div>
      </div>

      <div {...dialogProps("saved")}>
        <div className="wheel-card" role="dialog" aria-modal="true" aria-labelledby="wheel-saved-title">
          <h2 id="wheel-saved-title">{t.savedTitle}</h2>
          <p className="wheel-help">{t.savedHelp}</p>
          {Object.keys(saved).length ? (
            <ul className="wheel-list">
              {Object.entries(saved).map(([k, v]) => (
                <li key={k}>
                  <strong>{k}</strong>
                  <div className="wheel-row">
                    <span>{t.names(parseEntries(v).length)}</span>
                    <button
                      type="button"
                      className="wheel-btn"
                      onClick={() => {
                        setText(v);
                        setDialog(null);
                        setTab("entries");
                        showToast(t.opened(k));
                      }}
                    >
                      {t.open}
                    </button>
                    <button
                      type="button"
                      className="wheel-btn"
                      onClick={() =>
                        setSaved((s) => {
                          const next = { ...s };
                          delete next[k];
                          return next;
                        })
                      }
                    >
                      {t.del}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="wheel-empty">{t.noSaved}</p>
          )}
          <div className="wheel-row is-center">
            <button type="button" className="wheel-btn" onClick={() => setDialog(null)}>
              {t.close}
            </button>
          </div>
        </div>
      </div>

      <div {...dialogProps("save")}>
        <div className="wheel-card" role="dialog" aria-modal="true" aria-labelledby="wheel-save-title">
          <h2 id="wheel-save-title">{t.saveTitle}</h2>
          <label className="wheel-field">
            {t.saveName}
            <input
              className="wheel-input"
              type="text"
              placeholder={t.savePlaceholder}
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && saveNow()}
            />
          </label>
          <div className="wheel-row is-center">
            <button type="button" className="wheel-btn is-primary" onClick={saveNow}>
              {t.save}
            </button>
            <button type="button" className="wheel-btn" onClick={() => setDialog(null)}>
              {t.cancel}
            </button>
          </div>
        </div>
      </div>

      <div {...dialogProps("fair")}>
        <div className="wheel-card is-wide" role="dialog" aria-modal="true" aria-labelledby="wheel-fair-title">
          <h2 id="wheel-fair-title">{t.fairTitle}</h2>
          <p className="wheel-help">{t.fairHelp}</p>
          <div className="wheel-row">
            <button type="button" className="wheel-btn is-primary" onClick={runFair}>
              {t.fairRun}
            </button>
            <span className="wheel-help">{fairSummary}</span>
          </div>
          <div className="wheel-bars">
            {fairRows.map((r, i) => (
              <div key={i} className="wheel-barrow">
                <span className="wheel-barname">{r.label}</span>
                <span className="wheel-track">
                  <span className="wheel-fill" style={{ width: `${(r.p / maxP) * 100}%` }} />
                  <span className="wheel-expect" style={{ left: `${(r.exp / maxP) * 100}%` }} />
                </span>
                <span className="wheel-pct">%{pct(r.p)}</span>
              </div>
            ))}
          </div>
          <div className="wheel-row is-center">
            <button type="button" className="wheel-btn" onClick={() => setDialog(null)}>
              {t.close}
            </button>
          </div>
        </div>
      </div>

      <div {...dialogProps("draw", () => drawResult && setDialog(null))}>
        <div className="wheel-card is-wide" role="dialog" aria-modal="true" aria-labelledby="wheel-draw-title">
          <p className="wheel-eyebrow" id="wheel-draw-title">
            {t.drawTitle}
          </p>
          <p className="wheel-rolling">{rolling}</p>
          {drawResult && (
            <div className="wheel-result">
              <strong>{t.drawWinners}</strong>
              <ol>
                {drawResult.winners.map((n) => (
                  <li key={n}>@{n}</li>
                ))}
              </ol>
              <strong>{t.drawBackups}</strong>
              <ol>
                {drawResult.backups.length ? drawResult.backups.map((n) => <li key={n}>@{n}</li>) : <li>—</li>}
              </ol>
              <dl>
                <dt>{t.drawDate}</dt>
                <dd>{drawResult.when}</dd>
                <dt>{t.drawCount}</dt>
                <dd>{t.drawCountValue(drawResult.count)}</dd>
                <dt>{t.drawPrint}</dt>
                <dd>{drawResult.print}</dd>
              </dl>
              <p className="wheel-help">{t.drawPrintHelp}</p>
            </div>
          )}
          <div className="wheel-row is-center">
            <button
              type="button"
              className="wheel-btn is-primary"
              disabled={!drawResult}
              onClick={() =>
                drawResult &&
                copy(
                  t.drawText(
                    drawResult.when,
                    drawResult.winners.map((n) => "@" + n).join(", "),
                    drawResult.backups.map((n) => "@" + n).join(", "),
                    drawResult.count,
                    drawResult.print,
                  ),
                )
              }
            >
              {t.copyResult}
            </button>
            <button type="button" className="wheel-btn" disabled={!drawResult} onClick={() => setDialog(null)}>
              {t.close}
            </button>
          </div>
        </div>
      </div>

      <canvas ref={confettiRef} className="wheel-confetti" hidden aria-hidden="true" />
      <div className="wheel-toast" role="status" hidden={!toast}>
        {toast}
      </div>
    </div>
  );
}

