export interface BiyolojiTool {
  id: string;
  href: string;
  title: string;
}

export const biyolojiTools: BiyolojiTool[] = [
  {
    id: "amino-asitler",
    href: "/bilim-hesaplayicilari/biyoloji/amino-asitler",
    title: "Amino Asitler (Formülleri, Molar Kütleleri, Esansiyel mi?)",
  },
  {
    id: "kodon-tablosu",
    href: "/bilim-hesaplayicilari/biyoloji/kodon-tablosu",
    title: "Kodon Tablosu ve DNA/RNA Amino Asit Çevirici",
  },
  {
    id: "peptit-molar-kutle",
    href: "/bilim-hesaplayicilari/biyoloji/peptit-molar-kutle-hesaplama",
    title: "Peptit Molar Kütle Hesaplama",
  },
];
