// Gemeinsame Links der deutschen Alltagsrechner (Prozent, Dreisatz, Noten …).
export const germanRechnerLinks = [
  { href: "/de/prozentrechner", label: "Prozentrechner" },
  { href: "/de/dreisatz-rechner", label: "Dreisatz-Rechner" },
  { href: "/de/notenrechner", label: "Notenrechner" },
  { href: "/de/mehrwertsteuer-rechner", label: "Mehrwertsteuer-Rechner" },
  { href: "/de/tagerechner", label: "Tagerechner" },
  { href: "/de/waehrungsrechner", label: "Währungsrechner" },
];

export function rechnerRelated(exclude: string) {
  return germanRechnerLinks.filter((l) => l.href !== exclude);
}
