// Tarayıcı kimliği (User-Agent) metninden tarayıcı ve işletim sistemi tahmini.

export type UaSonuc = {
  tarayici: string;
  surum: string;
  isletim: string;
  cihaz: "Mobil" | "Tablet" | "Masaüstü";
};

const ilk = (re: RegExp, s: string) => re.exec(s)?.[1] ?? "";

export function uaCoz(ua: string): UaSonuc {
  let tarayici = "Bilinmiyor";
  let surum = "";
  const t: Array<[string, RegExp]> = [
    ["Samsung Internet", /SamsungBrowser\/([\d.]+)/],
    ["Opera", /(?:OPR|Opera)\/([\d.]+)/],
    ["Yandex Browser", /YaBrowser\/([\d.]+)/],
    ["Microsoft Edge", /Edg(?:A|iOS)?\/([\d.]+)/],
    ["Firefox", /(?:Firefox|FxiOS)\/([\d.]+)/],
    ["Chrome", /(?:Chrome|CriOS)\/([\d.]+)/],
    ["Safari", /Version\/([\d.]+).*Safari/],
  ];
  for (const [ad, re] of t) {
    const s = ilk(re, ua);
    if (s) {
      tarayici = ad;
      surum = s;
      break;
    }
  }
  let isletim = "Bilinmiyor";
  if (/Windows NT 10/.test(ua)) isletim = "Windows 10 veya 11";
  else if (/Windows NT 6\.3/.test(ua)) isletim = "Windows 8.1";
  else if (/Windows NT 6\.1/.test(ua)) isletim = "Windows 7";
  else if (/Windows/.test(ua)) isletim = "Windows";
  else if (/Android/.test(ua))
    isletim = `Android ${ilk(/Android ([\d.]+)/, ua)}`.trim();
  else if (/iPhone|iPad|iPod/.test(ua))
    isletim = `iOS ${ilk(/OS (\d+[_\d]*)/, ua).replace(/_/g, ".")}`.trim();
  else if (/Mac OS X/.test(ua)) isletim = "macOS";
  else if (/CrOS/.test(ua)) isletim = "ChromeOS";
  else if (/Linux/.test(ua)) isletim = "Linux";
  const cihaz =
    /iPad|Tablet/.test(ua) || (/Android/.test(ua) && !/Mobile/.test(ua))
      ? "Tablet"
      : /Mobi|iPhone|Android/.test(ua)
        ? "Mobil"
        : "Masaüstü";
  return { tarayici, surum, isletim, cihaz };
}
