// Gemeinsame Links der deutschen Alltagsrechner (Prozent, Dreisatz, Noten …).
export const germanRechnerLinks = [
  { href: "/de/brutto-netto-rechner", label: "Brutto-Netto-Rechner" },
  { href: "/de/mathe-rechner", label: "Mathe-Rechner" },
  { href: "/de/prozentrechner", label: "Prozentrechner" },
  { href: "/de/dreisatz-rechner", label: "Dreisatz-Rechner" },
  { href: "/de/notenrechner", label: "Notenrechner" },
  { href: "/de/pendlerpauschale-rechner", label: "Pendlerpauschale-Rechner" },
  { href: "/de/urlaubsrechner", label: "Urlaubsrechner" },
  { href: "/de/mutterschutzrechner", label: "Mutterschutzrechner" },
  { href: "/de/grunderwerbsteuer-rechner", label: "Grunderwerbsteuer-Rechner" },
  { href: "/de/kuendigungsfrist-rechner", label: "Kündigungsfrist-Rechner" },
  { href: "/de/mehrwertsteuer-rechner", label: "Mehrwertsteuer-Rechner" },
  { href: "/de/zinseszinsrechner", label: "Zinseszinsrechner" },
  { href: "/de/tagerechner", label: "Tagerechner" },
  { href: "/de/waehrungsrechner", label: "Währungsrechner" },
];

export function rechnerRelated(exclude: string) {
  return germanRechnerLinks.filter((l) => l.href !== exclude);
}
