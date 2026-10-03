// Araç sahibi araçları: araç sayfalarının "ilgili araçlar" bölümü ve /otomotiv-araclari listesi.
export const aracAraclari = [
  { href: "/trafik-cezasi-erken-odeme-hesaplama", label: "Trafik Cezası Erken Ödeme Hesaplama", description: "%25 indirimli tutar ve indirimin son günü; elden, posta ve e-Tebligat." },
  { href: "/ceza-puani-hesaplama", label: "Ceza Puanı Hesaplama", description: "Geçerli ceza puanınız, hangi puanın ne zaman silineceği ve 100 puana kalan." },
  { href: "/arac-muayene-tarihi-hesaplama", label: "Araç Muayene Tarihi Hesaplama", description: "Sıfır araçta ilk muayene ve sonraki muayene tarihleri; hususi, ticari, motosiklet." },
  { href: "/lastik-dot-kodu-okuma", label: "Lastik DOT Kodu Okuma", description: "Lastik üretim tarihi ve yaşı; kaç yıllık lastik değiştirilmeli?" },
  { href: "/lastik-ebati-hesaplama", label: "Lastik Ebatı Hesaplama", description: "Lastik kodundan dış çap ve hız göstergesi sapması." },
  { href: "/yakit-tuketimi-hesaplama", label: "Yakıt Tüketimi Hesaplama", description: "100 km'de kaç litre yakar, km maliyeti." },
  { href: "/lpg-donusum-amortisman-hesaplama", label: "LPG Dönüşüm Amortismanı", description: "LPG kaç yılda kendini çıkarır?" },
  { href: "/ehliyet-yenileme-suresi-hesaplama", label: "Ehliyet Yenileme Süresi", description: "Sürücü belgesi ne zaman yenilenmeli?" },
];

export function aracRelated(exclude: string) {
  return aracAraclari.filter((t) => t.href !== exclude).map(({ href, label }) => ({ href, label }));
}
