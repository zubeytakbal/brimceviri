// Ağ Araçları panelinin kayıt listesi. Hepsi tarayıcıda çalışır; sunucu kullanmaz.
import type { AracIkon } from "../gorsel/dosyaAraclari";

export const AG_ARACLARI_YOLU = "/ag-araclari";

export type AgKategori = "ip" | "hiz" | "guvenlik" | "cihaz" | "basvuru";

export const AG_KATEGORILER: Array<{ id: AgKategori; ad: string }> = [
  { id: "ip", ad: "IP ve Subnet" },
  { id: "hiz", ad: "Hız ve Bağlantı" },
  { id: "guvenlik", ad: "Hash ve Güvenlik" },
  { id: "cihaz", ad: "Cihaz testleri" },
  { id: "basvuru", ad: "Port ve Başvuru" },
];

export type AgAraci = {
  href: string;
  baslik: string;
  aciklama: string;
  kategoriler: AgKategori[];
  ikon: AracIkon;
  yeni?: boolean;
};

export const AG_ARACLARI: AgAraci[] = [
  {
    href: "/subnet-hesaplama",
    baslik: "Subnet Hesaplama",
    aciklama:
      "CIDR ve maskeden ağ, yayın, IP aralığı ve host sayısı; ağı alt ağlara bölün.",
    kategoriler: ["ip"],
    ikon: { tip: "ag", simge: "subnet" },
    yeni: true,
  },
  {
    href: "/ipv6-subnet-hesaplama",
    baslik: "IPv6 Subnet Hesaplama",
    aciklama: "IPv6 önekinden aralık, /64 sayısı, kısa ve açık yazım.",
    kategoriler: ["ip"],
    ikon: { tip: "ag", simge: "ipv6" },
    yeni: true,
  },
  {
    href: "/ip-adresi-donusturucu",
    baslik: "IP Adresi Dönüştürücü",
    aciklama:
      "IP'yi ikili, onaltılı, ondalık yazın; özel mi genel mi olduğunu görün.",
    kategoriler: ["ip"],
    ikon: { tip: "ag", simge: "ip" },
    yeni: true,
  },
  {
    href: "/mac-adresi-donusturucu",
    baslik: "MAC Adresi Dönüştürücü",
    aciklama:
      "MAC'i farklı yazımlara çevirin, EUI-64 bulun, rastgele MAC üretin.",
    kategoriler: ["ip", "cihaz"],
    ikon: { tip: "ag", simge: "mac" },
    yeni: true,
  },
  {
    href: "/indirme-suresi-hesaplama",
    baslik: "İndirme Süresi Hesaplama",
    aciklama: "Dosya kaç dakikada iner? Mbps ile MB/s farkı ve gereken hız.",
    kategoriler: ["hiz"],
    ikon: { tip: "ag", simge: "indirme" },
    yeni: true,
  },
  {
    href: "/hash-hesaplama",
    baslik: "Hash Hesaplama",
    aciklama:
      "Metin veya dosya için MD5, SHA-1, SHA-256, SHA-512, CRC32; checksum doğrulama.",
    kategoriler: ["guvenlik"],
    ikon: { tip: "ag", simge: "hash" },
    yeni: true,
  },
  {
    href: "/md5-hesaplama",
    baslik: "MD5 Hesaplama",
    aciklama:
      "Dosyanın veya metnin MD5 özetini bulun, indirilen dosyayı doğrulayın.",
    kategoriler: ["guvenlik"],
    ikon: { tip: "ag", simge: "md5" },
    yeni: true,
  },
  {
    href: "/sha256-hesaplama",
    baslik: "SHA-256 Hesaplama",
    aciklama: "ISO ve kurulum dosyalarının SHA-256 checksum'ını kontrol edin.",
    kategoriler: ["guvenlik"],
    ikon: { tip: "ag", simge: "sha" },
    yeni: true,
  },
  {
    href: "/tarayici-bilgisi",
    baslik: "Tarayıcı ve Cihaz Bilgim",
    aciklama:
      "Tarayıcı sürümü, işletim sistemi, ekran çözünürlüğü, dil ve saat dilimi.",
    kategoriler: ["cihaz"],
    ikon: { tip: "ag", simge: "cihaz" },
    yeni: true,
  },
  {
    href: "/mikrofon-testi",
    baslik: "Mikrofon Testi",
    aciklama: "Mikrofonunuz çalışıyor mu? Ses seviyesi, kayıt ve dinleme.",
    kategoriler: ["cihaz"],
    ikon: { tip: "ag", simge: "mikrofon" },
    yeni: true,
  },
  {
    href: "/kamera-testi",
    baslik: "Kamera Testi",
    aciklama:
      "Web kameranızı test edin; çözünürlük, kare hızı ve fotoğraf çekme.",
    kategoriler: ["cihaz"],
    ikon: { tip: "ag", simge: "kamera" },
    yeni: true,
  },
  {
    href: "/hoparlor-testi",
    baslik: "Hoparlör Testi (Sol Sağ)",
    aciklama:
      "Sol ve sağ kanal, stereo ve frekans testi; kulaklık yönünü bulun.",
    kategoriler: ["cihaz"],
    ikon: { tip: "ag", simge: "hoparlor" },
    yeni: true,
  },
  {
    href: "/klavye-testi",
    baslik: "Klavye Testi",
    aciklama:
      "Tuşları tek tek deneyin; basılan, takılan ve çalışmayan tuşları görün.",
    kategoriler: ["cihaz"],
    ikon: { tip: "ag", simge: "klavye" },
    yeni: true,
  },
  {
    href: "/fare-testi",
    baslik: "Fare Testi (Çift Tıklama)",
    aciklama:
      "Sol, sağ, orta tuş ve tekerleği deneyin; istenmeyen çift tıklamayı yakalayın.",
    kategoriler: ["cihaz"],
    ikon: { tip: "ag", simge: "fare" },
    yeni: true,
  },
  {
    href: "/olu-piksel-testi",
    baslik: "Ölü Piksel Testi",
    aciklama:
      "Tam ekran renklerle ölü ve takılı pikselleri, ışık sızmasını bulun.",
    kategoriler: ["cihaz"],
    ikon: { tip: "ag", simge: "piksel" },
    yeni: true,
  },
  {
    href: "/ekran-kaydi",
    baslik: "Ekran Kaydı Alma",
    aciklama: "Program kurmadan ekranı, pencereyi veya sekmeyi sesli kaydedin.",
    kategoriler: ["cihaz"],
    ikon: { tip: "ag", simge: "kayit" },
    yeni: true,
  },
  {
    href: "/port-numaralari",
    baslik: "Port Numaraları Listesi",
    aciklama:
      "80, 443, 3389, 25565… hangi port ne işe yarar, hangisi risklidir.",
    kategoriler: ["basvuru"],
    ikon: { tip: "ag", simge: "port" },
    yeni: true,
  },
];
