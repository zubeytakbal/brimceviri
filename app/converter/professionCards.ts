import type { SiteIconName } from "../components/siteIcons";

export type ProfessionCard = {
  id: string;
  href: string;
  title: string;
  description: string;
  iconName: SiteIconName;
};

export const professionCards: ProfessionCard[] = [
  {
    id: "kuyumcu",
    href: "/kuyumcu-araclari",
    title: "Kuyumcu Araçları",
    description:
      "Ayar/milyem dönüşümleri, has hesaplama, troy ons/karat/dirhem birimleri.",
    iconName: "jewelerHub",
  },
  {
    id: "elektrikci",
    href: "/elektrikci-araclari",
    title: "Elektrikçi Araçları",
    description:
      "Kablo kesiti, gerilim düşümü, motor akımı, amper-kW dönüşümü.",
    iconName: "electricianHub",
  },
  {
    id: "insaatci",
    href: "/insaatci-araclari",
    title: "İnşaatçı Araçları",
    description:
      "Boya, fayans, tuğla, beton, sıva ve merdiven hesaplama.",
    iconName: "builderHub",
  },
  {
    id: "otomotiv",
    href: "/otomotiv-araclari",
    title: "Otomotiv Araçları",
    description:
      "Yakıt tüketimi, lastik ebatı, elektrikli araç şarj, güç-tork dönüşümü.",
    iconName: "automotiveHub",
  },
  {
    id: "asci",
    href: "/asci-araclari",
    title: "Aşçı Araçları",
    description:
      "Mutfak ölçüleri, tarif ölçekleme, fırın sıcaklığı dönüşümleri.",
    iconName: "chefHub",
  },
  {
    id: "diyetisyen",
    href: "/diyetisyen-araclari",
    title: "Diyetisyen Araçları",
    description:
      "BMI, günlük kalori ihtiyacı (BMR/TDEE), vücut yağ oranı hesaplama.",
    iconName: "dietitianHub",
  },
  {
    id: "bilim",
    href: "/bilim-hesaplayicilari",
    title: "Öğrenci Araçları",
    description:
      "Kimya, matematik ve geometri hesaplayıcıları — öğrenciler için.",
    iconName: "geometryCalculator",
  },
  {
    id: "terzi",
    href: "/terzi-araclari",
    title: "Terzi Araçları",
    description:
      "Beden, yüzük ve ayakkabı numarası ölçü çevirme araçları.",
    iconName: "terziHub",
  },
  {
    id: "emlakci",
    href: "/emlakci-araclari",
    title: "Emlakçı Araçları",
    description:
      "Emlak komisyonu hesaplama, dönüm/dekar/m² ve KDV dönüşümleri.",
    iconName: "realtorHub",
  },
  {
    id: "doktor-hemsire",
    href: "/doktor-hemsire-araclari",
    title: "Doktor ve Hemşire Araçları",
    description:
      "Klinik skorlar (GKS, APGAR, CHA2DS2-VASc), BSA, kreatinin klirensi, laboratuvar birim dönüşümleri.",
    iconName: "doctorHub",
  },
  {
    id: "pilot",
    href: "/pilot-araclari",
    title: "Pilot Araçları",
    description:
      "İrtifa (fit), knot, seyir süresi ve uçuş seviyesi referansları.",
    iconName: "pilotHub",
  },
  {
    id: "kaptan",
    href: "/kaptan-araclari",
    title: "Kaptan Araçları",
    description:
      "Deniz mili, knot, seyir süresi ve gemi tonaj birimleri.",
    iconName: "kaptanHub",
  },
  {
    id: "nakliyeci",
    href: "/nakliyeci-araclari",
    title: "Nakliyeci Araçları",
    description:
      "CBM ve hacimsel ağırlık hesaplama, hacim/kütle/uzunluk dönüşümleri.",
    iconName: "nakliyeciHub",
  },
  {
    id: "tesisatci",
    href: "/tesisatci-araclari",
    title: "Tesisatçı Araçları",
    description:
      "Boru çapı, debi, akış hızı ve basınç kaybı hesaplama.",
    iconName: "tesisatciHub",
  },
  {
    id: "muhasebeci",
    href: "/muhasebeci-araclari",
    title: "Muhasebeci Araçları",
    description:
      "Amortisman hesaplama (normal ve azalan bakiyeler), KDV hesaplama.",
    iconName: "muhasebeciHub",
  },
  {
    id: "yazilimci",
    href: "/yazilimci-araclari",
    title: "Yazılımcı Araçları",
    description:
      "Unix zaman damgası, renk kodu (HEX/RGB/HSL), sayı tabanı ve veri depolama dönüşümleri.",
    iconName: "yazilimciHub",
  },
  {
    id: "marangoz",
    href: "/marangoz-araclari",
    title: "Marangoz Araçları",
    description:
      "Kereste metreküp hesaplama, hacim/uzunluk/kütle birim dönüşümleri.",
    iconName: "marangozHub",
  },
  {
    id: "grafik-tasarimci",
    href: "/grafik-tasarimci-araclari",
    title: "Grafik Tasarımcı Araçları",
    description:
      "Piksel, cm ve DPI hesaplama, uzunluk ve alan dönüşümleri.",
    iconName: "grafikTasarimciHub",
  },
  {
    id: "muzisyen",
    href: "/muzisyen-araclari",
    title: "Müzisyen Araçları",
    description:
      "BPM'den delay/reverb süresi hesaplama, Hz/kHz frekans dönüşümleri.",
    iconName: "muzisyenHub",
  },
  {
    id: "veteriner",
    href: "/veteriner-araclari",
    title: "Veteriner Araçları",
    description:
      "Reçete edilen dozun mL hacme çevrilmesi, ağırlık ve vücut sıcaklığı dönüşümleri.",
    iconName: "veterinerHub",
  },
  {
    id: "fotografci",
    href: "/fotografci-araclari",
    title: "Fotoğrafçı Araçları",
    description:
      "Pozlama eşdeğeri (exposure triangle), crop factor / odak uzaklığı, piksel ve DPI hesaplama.",
    iconName: "fotografciHub",
  },
  {
    id: "antrenor",
    href: "/antrenor-araclari",
    title: "Antrenör Araçları",
    description:
      "1RM (bir tekrar maksimum) hesaplama, antrenman yüzdesi tablosu, koşu temposu hesaplama.",
    iconName: "antrenorHub",
  },
  {
    id: "ciftci",
    href: "/ciftci-araclari",
    title: "Çiftçi Araçları",
    description:
      "Gübre ihtiyacı (kg/dekar) ve tohum miktarı (tohumluk) hesaplama, alan birimi dönüşümleri.",
    iconName: "ciftciHub",
  },
  {
    id: "eczaci",
    href: "/eczaci-araclari",
    title: "Eczacı Araçları",
    description:
      "Alkol seyreltme (% derişim), molarite, molalite ve ppm hesaplama.",
    iconName: "eczaciHub",
  },
  {
    id: "barmen",
    href: "/barmen-araclari",
    title: "Barmen Araçları",
    description:
      "Kokteyl ölçüsü (oz/mL/cl) çevirme, ABV ve standart içki hesaplama.",
    iconName: "barmenHub",
  },
  {
    id: "kaynakci",
    href: "/kaynakci-araclari",
    title: "Kaynakçı Araçları",
    description:
      "Elektrot çapına göre amperaj ve ısı girdisi (kJ/mm) hesaplama.",
    iconName: "kaynakciHub",
  },
  {
    id: "cnc-torna",
    href: "/cnc-torna-araclari",
    title: "CNC/Torna Operatörü Araçları",
    description:
      "Kesme hızı, çap ve devir (RPM) hesaplama, uzunluk dönüşümleri.",
    iconName: "cncHub",
  },
  {
    id: "peyzaj",
    href: "/peyzaj-araclari",
    title: "Peyzaj Araçları",
    description:
      "Sulama süresi (damla/sprinkler) hesaplama, alan ve hacim dönüşümleri.",
    iconName: "peyzajHub",
  },
  {
    id: "havuz-teknisyeni",
    href: "/havuz-teknisyeni-araclari",
    title: "Havuz Teknisyeni Araçları",
    description:
      "Havuz hacmi (m³) ve klor dozajı hesaplama, hacim birimi dönüşümleri.",
    iconName: "havuzHub",
  },
  {
    id: "amator-telsiz",
    href: "/amator-telsiz-araclari",
    title: "Amatör Telsiz Araçları",
    description:
      "Dipol/vertikal anten uzunluğu hesaplama, frekans dönüşümleri.",
    iconName: "amatorTelsizHub",
  },
  {
    id: "bilgisayar-donanimcisi",
    href: "/bilgisayar-donanimcisi-araclari",
    title: "Bilgisayar Donanımcısı Araçları",
    description:
      "CPU/GPU gücünden PSU wattajı hesaplama, veri depolama dönüşümleri.",
    iconName: "bilgisayarDonanimciHub",
  },
  {
    id: "video-editor",
    href: "/video-editor-araclari",
    title: "Video Editör Araçları",
    description:
      "Bit hızı ve dosya boyutu hesaplama, veri depolama dönüşümleri.",
    iconName: "videoEditorHub",
  },
  {
    id: "dijital-pazarlamaci",
    href: "/dijital-pazarlamaci-araclari",
    title: "Dijital Pazarlamacı Araçları",
    description:
      "CPM, CTR, CPC ve ROI hesaplama.",
    iconName: "dijitalPazarlamaciHub",
  },
  {
    id: "klima-sogutma-teknisyeni",
    href: "/klima-sogutma-teknisyeni-araclari",
    title: "Klima ve Soğutma Teknisyeni Araçları",
    description:
      "Superheat ve subcooling hesaplama, klima BTU hesaplama.",
    iconName: "klimaSogutmaHub",
  },
  {
    id: "mimar",
    href: "/mimar-araclari",
    title: "Mimar Araçları",
    description:
      "Emsal (KAKS) hesaplama, alan birimi dönüşümleri.",
    iconName: "mimarHub",
  },
  {
    id: "ogretmen",
    href: "/ogretmen-araclari",
    title: "Öğretmen Araçları",
    description:
      "Harf notu (100'lük-4'lük sistem) hesaplama, not ortalaması ve devamsızlık hesaplama.",
    iconName: "ogretmenHub",
  },
];
