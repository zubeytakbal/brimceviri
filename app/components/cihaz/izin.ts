// Kamera/mikrofon izni ve hata mesajları için ortak yardımcılar.

export function medyaHatasi(e: unknown, cihaz: "mikrofon" | "kamera"): string {
  const ad = e instanceof DOMException ? e.name : "";
  if (ad === "NotAllowedError" || ad === "SecurityError")
    return `${cihaz === "mikrofon" ? "Mikrofon" : "Kamera"} izni verilmedi. Adres çubuğundaki kilit/kamera simgesinden izin verip sayfayı yenileyin.`;
  if (ad === "NotFoundError" || ad === "OverconstrainedError")
    return `Bağlı bir ${cihaz} bulunamadı. Kablosunu ve bağlantısını kontrol edin.`;
  if (ad === "NotReadableError" || ad === "AbortError")
    return `${cihaz === "mikrofon" ? "Mikrofon" : "Kamera"} başka bir program tarafından kullanılıyor olabilir (Zoom, Teams, Discord…). O programı kapatıp tekrar deneyin.`;
  if (typeof navigator !== "undefined" && !navigator.mediaDevices)
    return "Tarayıcınız bu özelliği desteklemiyor veya sayfa güvenli (https) bağlantıda açılmadı.";
  return `${cihaz === "mikrofon" ? "Mikrofon" : "Kamera"} açılamadı.`;
}

export async function cihazlar(tur: "audioinput" | "videoinput") {
  const l = await navigator.mediaDevices.enumerateDevices();
  return l.filter((d) => d.kind === tur);
}
