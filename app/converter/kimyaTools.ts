export interface KimyaTool {
  id: string;
  href: string;
  title: string;
}

export const kimyaTools: KimyaTool[] = [
  {
    id: "periyodik-tablo",
    href: "/bilim-hesaplayicilari/kimya/periyodik-tablo",
    title: "Periyodik Tablo",
  },
  {
    id: "bilesikler",
    href: "/bilim-hesaplayicilari/kimya/bilesikler",
    title: "Kimyasal Bileşikler (Molar Kütle)",
  },
  {
    id: "mol",
    href: "/bilim-hesaplayicilari/kimya/mol-hesaplama",
    title: "Mol Hesaplama",
  },
  {
    id: "atom-kutlesi",
    href: "/bilim-hesaplayicilari/kimya/atom-kutlesi-hesaplama",
    title: "Atom Kütlesi Hesaplama",
  },
  {
    id: "pil-potansiyeli",
    href: "/bilim-hesaplayicilari/kimya/pil-potansiyeli-hesaplama",
    title: "Pil Potansiyeli Hesaplama",
  },
];
