export interface EverydayCalculator {
  id: string;
  href: string;
  label: string;
}

export const everydayCalculators: EverydayCalculator[] = [
  { id: "boya", href: "/boya-hesaplama", label: "Boya Hesaplama" },
  { id: "fayans", href: "/fayans-hesaplama", label: "Fayans Hesaplama" },
  { id: "tugla", href: "/tugla-hesaplama", label: "Tuğla Hesaplama" },
  { id: "beton", href: "/beton-hesaplama", label: "Beton Hesaplama" },
  { id: "siva", href: "/siva-hesaplama", label: "Sıva Hesaplama" },
  { id: "merdiven", href: "/merdiven-hesaplama", label: "Merdiven Hesaplama" },
  { id: "devamsizlik", href: "/devamsizlik-hesaplama", label: "Devamsızlık Hesaplama" },
  { id: "yas", href: "/yas-hesaplama", label: "Yaş Hesaplama" },
  { id: "kdv", href: "/kdv-hesaplama", label: "KDV Hesaplama" },
  { id: "kredi", href: "/kredi-hesaplama", label: "Kredi Hesaplama" },
  { id: "altin", href: "/altin-hesaplama", label: "Altın Hesaplama (Çeyrek, Yarım, Tam Altın)" },
  { id: "brutten-nete", href: "/brutten-nete-maas-hesaplama", label: "Brütten Nete Maaş Hesaplama" },
  { id: "kidem-tazminati", href: "/kidem-tazminati-hesaplama", label: "Kıdem ve İhbar Tazminatı Hesaplama" },
  { id: "yillik-izin", href: "/yillik-izin-hesaplama", label: "Yıllık İzin Hesaplama" },
  { id: "bmi", href: "/bmi-hesaplama", label: "BMI (Vücut Kitle İndeksi) Hesaplama" },
  {
    id: "gebelik-haftasi",
    href: "/gebelik-haftasi-hesaplama",
    label: "Gebelik Haftası Hesaplama",
  },
  { id: "klima-btu", href: "/klima-btu-hesaplama", label: "Klima BTU Hesaplama" },
  {
    id: "elektrik-tuketimi",
    href: "/elektrik-tuketimi-hesaplama",
    label: "Elektrik Tüketimi Hesaplama",
  },
  { id: "uyku", href: "/uyku-hesaplama", label: "Uyku Hesaplama" },
  { id: "kosu-pace", href: "/kosu-pace-hesaplama", label: "Koşu Pace (Tempo) Hesaplama" },
  {
    id: "yakit-tuketimi",
    href: "/yakit-tuketimi-hesaplama",
    label: "Yakıt Tüketimi Hesaplama",
  },
  { id: "parke", href: "/parke-hesaplama", label: "Parke (Laminat) Hesaplama" },
  {
    id: "duvar-kagidi",
    href: "/duvar-kagidi-hesaplama",
    label: "Duvar Kağıdı Hesaplama",
  },
  {
    id: "tasinma-kutusu",
    href: "/tasinma-kutusu-hesaplama",
    label: "Taşınma Kutusu Hesaplama",
  },
  {
    id: "dogalgaz-tuketimi",
    href: "/dogalgaz-tuketimi-hesaplama",
    label: "Doğalgaz Tüketimi Hesaplama",
  },
  {
    id: "elektrikli-arac-sarj",
    href: "/elektrikli-arac-sarj-hesaplama",
    label: "Elektrikli Araç Şarj Süresi Hesaplama",
  },
  {
    id: "has-hesaplama",
    href: "/has-hesaplama",
    label: "Has Altın ve Gümüş Hesaplama",
  },
  {
    id: "hafriyat-hesaplama",
    href: "/hafriyat-hesaplama",
    label: "Hafriyat ve Kazı Hesaplama",
  },
  {
    id: "mantolama-hesaplama",
    href: "/mantolama-hesaplama",
    label: "Mantolama Hesaplama",
  },
  {
    id: "lastik-ebati-hesaplama",
    href: "/lastik-ebati-hesaplama",
    label: "Lastik Ebatı Hesaplama",
  },
  {
    id: "vucut-yag-orani-hesaplama",
    href: "/vucut-yag-orani-hesaplama",
    label: "Vücut Yağ Oranı Hesaplama",
  },
  {
    id: "ideal-kilo-hesaplama",
    href: "/ideal-kilo-hesaplama",
    label: "İdeal Kilo Hesaplama",
  },
  {
    id: "beden-olcusu-cevirici",
    href: "/beden-olcusu-cevirici",
    label: "Beden Ölçüsü Çevirici",
  },
  {
    id: "emlak-komisyonu-hesaplama",
    href: "/emlak-komisyonu-hesaplama",
    label: "Emlak Komisyonu Hesaplama",
  },
  {
    id: "seyir-suresi-hesaplama",
    href: "/seyir-suresi-hesaplama",
    label: "Seyir Süresi Hesaplama",
  },
  {
    id: "yogunluk-irtifasi-hesaplama",
    href: "/yogunluk-irtifasi-hesaplama",
    label: "Yoğunluk İrtifası Hesaplama",
  },
  {
    id: "yan-ruzgar-hesaplama",
    href: "/yan-ruzgar-hesaplama",
    label: "Yan Rüzgar Bileşeni Hesaplama",
  },
  {
    id: "inis-orani-hesaplama",
    href: "/inis-orani-hesaplama",
    label: "İniş Oranı Hesaplama",
  },
  {
    id: "agirlik-denge-hesaplama",
    href: "/agirlik-denge-hesaplama",
    label: "Ağırlık ve Denge Hesaplama",
  },
  {
    id: "buyuk-daire-mesafesi-hesaplama",
    href: "/buyuk-daire-mesafesi-hesaplama",
    label: "Büyük Daire Mesafesi Hesaplama",
  },
  {
    id: "vucut-yuzey-alani-hesaplama",
    href: "/vucut-yuzey-alani-hesaplama",
    label: "Vücut Yüzey Alanı Hesaplama",
  },
  {
    id: "kreatinin-klirensi-hesaplama",
    href: "/kreatinin-klirensi-hesaplama",
    label: "Kreatinin Klirensi Hesaplama",
  },
  {
    id: "iv-damla-hizi-hesaplama",
    href: "/iv-damla-hizi-hesaplama",
    label: "IV Damla Hızı Hesaplama",
  },
  {
    id: "glasgow-koma-skalasi-hesaplama",
    href: "/glasgow-koma-skalasi-hesaplama",
    label: "Glasgow Koma Skalası Hesaplama",
  },
  {
    id: "apgar-skoru-hesaplama",
    href: "/apgar-skoru-hesaplama",
    label: "APGAR Skoru Hesaplama",
  },
  {
    id: "cha2ds2-vasc-skoru-hesaplama",
    href: "/cha2ds2-vasc-skoru-hesaplama",
    label: "CHA2DS2-VASc Skoru Hesaplama",
  },
  {
    id: "wells-skoru-hesaplama",
    href: "/wells-skoru-hesaplama",
    label: "Wells Skoru Hesaplama",
  },
  {
    id: "qsofa-hesaplama",
    href: "/qsofa-hesaplama",
    label: "qSOFA Hesaplama",
  },
  {
    id: "sofa-skoru-hesaplama",
    href: "/sofa-skoru-hesaplama",
    label: "SOFA Skoru Hesaplama",
  },
  {
    id: "meld-skoru-hesaplama",
    href: "/meld-skoru-hesaplama",
    label: "MELD Skoru Hesaplama",
  },
  {
    id: "morse-dusme-skalasi-hesaplama",
    href: "/morse-dusme-skalasi-hesaplama",
    label: "Morse Düşme Skalası Hesaplama",
  },
  {
    id: "braden-skalasi-hesaplama",
    href: "/braden-skalasi-hesaplama",
    label: "Braden Skalası Hesaplama",
  },
  {
    id: "cbm-hesaplama",
    href: "/cbm-hesaplama",
    label: "CBM ve Hacimsel Ağırlık Hesaplama",
  },
  {
    id: "boru-capi-hesaplama",
    href: "/boru-capi-hesaplama",
    label: "Boru Çapı, Debi ve Akış Hızı Hesaplama",
  },
  {
    id: "basinc-kaybi-hesaplama",
    href: "/basinc-kaybi-hesaplama",
    label: "Basınç Kaybı Hesaplama",
  },
  {
    id: "amortisman-hesaplama",
    href: "/amortisman-hesaplama",
    label: "Amortisman Hesaplama",
  },
];
