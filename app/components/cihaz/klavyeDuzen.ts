// Türkçe Q klavye düzeni: event.code → tuş üzerindeki yazı ve genişlik (birim).

export type Tus = { kod: string; yazi: string; gen?: number };

const h = (kod: string, yazi: string, gen?: number): Tus => ({
  kod,
  yazi,
  gen,
});
const harfler = (s: string, kodlar: string) =>
  Array.from(s).map((c, i) => h(`Key${kodlar[i]}`, c));

export const KLAVYE: Tus[][] = [
  [
    h("Escape", "Esc"),
    ...Array.from({ length: 12 }, (_, i) => h(`F${i + 1}`, `F${i + 1}`)),
  ],
  [
    h("Backquote", '"'),
    ...Array.from({ length: 10 }, (_, i) =>
      h(`Digit${(i + 1) % 10}`, String((i + 1) % 10)),
    ),
    h("Minus", "*"),
    h("Equal", "-"),
    h("Backspace", "⌫", 2),
  ],
  [
    h("Tab", "Tab", 1.5),
    ...harfler("QWERTYUIOP", "QWERTYUIOP"),
    h("BracketLeft", "Ğ"),
    h("BracketRight", "Ü"),
    h("Enter", "Enter", 1.5),
  ],
  [
    h("CapsLock", "Caps", 1.75),
    ...harfler("ASDFGHJKL", "ASDFGHJKL"),
    h("Semicolon", "Ş"),
    h("Quote", "İ"),
    h("Backslash", ",", 1.25),
  ],
  [
    h("ShiftLeft", "Shift", 1.25),
    h("IntlBackslash", "<"),
    ...harfler("ZXCVBNM", "ZXCVBNM"),
    h("Comma", "Ö"),
    h("Period", "Ç"),
    h("Slash", "."),
    h("ShiftRight", "Shift", 2.75),
  ],
  [
    h("ControlLeft", "Ctrl", 1.5),
    h("MetaLeft", "Win", 1.25),
    h("AltLeft", "Alt", 1.25),
    h("Space", "", 6.25),
    h("AltRight", "AltGr", 1.25),
    h("ContextMenu", "Menü", 1.25),
    h("ControlRight", "Ctrl", 1.5),
  ],
];

export const YON: Tus[][] = [
  [h("Insert", "Ins"), h("Home", "Home"), h("PageUp", "PgUp")],
  [h("Delete", "Del"), h("End", "End"), h("PageDown", "PgDn")],
  [h("", ""), h("ArrowUp", "↑"), h("", "")],
  [h("ArrowLeft", "←"), h("ArrowDown", "↓"), h("ArrowRight", "→")],
];

export const TUM_KODLAR = new Set(
  [...KLAVYE.flat(), ...YON.flat()].map((t) => t.kod).filter(Boolean),
);
