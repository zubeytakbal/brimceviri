// İsveççe, Norveççe ve Danca kategori çeviricileri için birim adları.
// Bu birimlerin o dilde ayrı bir birim sayfası yok; ad sözlüğü olmasa
// açılır listede ve "tüm birimler" panelinde İngilizce adları görünüyordu
// ("Tablespoon", "Light-year", "Kilometer per hour"). Anahtar "kategori|sembol".
// Meter, Gram, Joule, Byte gibi üç dilde de aynı yazılan adlar burada yok.

export type ScandinavianLocale = "sv" | "no" | "da";

type Names = Record<ScandinavianLocale, string>;

const n = (sv: string, no: string, da: string): Names => ({ sv, no, da });

export const scandinavianUnitNames: Record<string, Names> = {
  "uzunluk|µm": n("Mikrometer", "Mikrometer", "Mikrometer"),
  "uzunluk|pm": n("Pikometer", "Pikometer", "Pikometer"),
  "uzunluk|nmi": n("Nautisk mil", "Nautisk mil", "Sømil"),
  "uzunluk|AU": n("Astronomisk enhet", "Astronomisk enhet", "Astronomisk enhed"),
  "uzunluk|ly": n("Ljusår", "Lysår", "Lysår"),
  "uzunluk|ftm": n("Famn", "Favn", "Favn"),
  "uzunluk|Å": n("Ångström", "Ångstrøm", "Ångstrøm"),
  "uzunluk|mil": n("Mil", "Mil", "Skandinavisk mil"),

  "alan|cm²": n("Kvadratcentimeter", "Kvadratcentimeter", "Kvadratcentimeter"),
  "alan|mm²": n("Kvadratmillimeter", "Kvadratmillimeter", "Kvadratmillimeter"),
  "alan|km²": n("Kvadratkilometer", "Kvadratkilometer", "Kvadratkilometer"),
  "alan|a": n("Ar", "Ar", "Ar"),
  "alan|dekar": n("Dekar", "Dekar (mål)", "Dekar"),
  "alan|ft²": n("Kvadratfot", "Kvadratfot", "Kvadratfod"),
  "alan|in²": n("Kvadrattum", "Kvadrattomme", "Kvadrattomme"),
  "alan|yd²": n("Kvadratyard", "Kvadratyard", "Kvadratyard"),

  "hacim|yk": n("Matsked", "Spiseskje", "Spiseske"),
  "hacim|çk": n("Tesked", "Teskje", "Teske"),
  "hacim|cm³": n("Kubikcentimeter", "Kubikkcentimeter", "Kubikcentimeter"),
  "hacim|ft³": n("Kubikfot", "Kubikkfot", "Kubikfod"),
  "hacim|in³": n("Kubiktum", "Kubikktomme", "Kubiktomme"),
  "hacim|qt": n("Quart (USA)", "Quart (USA)", "Quart (USA)"),
  "hacim|imp qt": n("Quart (brittisk)", "Quart (britisk)", "Quart (britisk)"),
  "hacim|fl oz": n("Fluid ounce (USA)", "Fluid ounce (USA)", "Fluid ounce (USA)"),
  "hacim|imp fl oz": n("Fluid ounce (brittisk)", "Fluid ounce (britisk)", "Fluid ounce (britisk)"),
  "hacim|pt": n("Pint (USA)", "Pint (USA)", "Pint (USA)"),
  "hacim|imp pt": n("Pint (brittisk)", "Pint (britisk)", "Pint (britisk)"),
  "hacim|imp gal": n("Gallon (brittisk)", "Gallon (britisk)", "Gallon (britisk)"),
  "hacim|bbl": n("Fat (olja)", "Fat (olje)", "Tønde (olie)"),

  "kutle|q": n("Kvintal", "Kvintal", "Kvintal"),
  "kutle|hg": n("Hektogram", "Hektogram", "Hektogram"),
  "kutle|ton": n("Ton", "Tonn", "Ton"),
  "kutle|pond": n("Metriskt pund (500 g)", "Pund (500 g)", "Pund (500 g)"),
  "kutle|oz": n("Uns", "Unse", "Unse"),
  "kutle|ozt": n("Troy-uns", "Troy-unse", "Troy-unse"),
  "kutle|ct": n("Karat", "Karat", "Karat"),

  "zaman|ms": n("Millisekund", "Millisekund", "Millisekund"),
  "zaman|h": n("Timme", "Time", "Time"),
  "zaman|day": n("Dygn", "Døgn", "Døgn"),

  "hiz|km/h": n("Kilometer i timmen", "Kilometer i timen", "Kilometer i timen"),
  "hiz|km/s": n("Kilometer per sekund", "Kilometer per sekund", "Kilometer per sekund"),
  "hiz|km/min": n("Kilometer per minut", "Kilometer per minutt", "Kilometer per minut"),
  "hiz|m/min": n("Meter per minut", "Meter per minutt", "Meter per minut"),
  "hiz|cm/s": n("Centimeter per sekund", "Centimeter per sekund", "Centimeter per sekund"),
  "hiz|ft/s": n("Fot per sekund", "Fot per sekund", "Fod per sekund"),
  "hiz|knot": n("Knop", "Knop", "Knob"),
  "hiz|c": n("Ljusets hastighet", "Lysets hastighet", "Lysets hastighed"),

  "basinc|hPa": n("Hektopascal", "Hektopascal", "Hektopascal"),
  "basinc|at": n("Teknisk atmosfär", "Teknisk atmosfære", "Teknisk atmosfære"),
  "basinc|mmHg": n("Millimeter kvicksilver", "Millimeter kvikksølv", "Millimeter kviksølv"),
  "basinc|mmH2O": n("Millimeter vattenpelare", "Millimeter vannsøyle", "Millimeter vandsøjle"),
  "basinc|kgf/cm²": n("Kilopond per kvadratcentimeter", "Kilopond per kvadratcentimeter", "Kilopond per kvadratcentimeter"),

  "enerji|Wh": n("Wattimme", "Wattime", "Watttime"),
  "enerji|kcal": n("Kilokalori", "Kilokalori", "Kilokalorie"),
  "enerji|eV": n("Elektronvolt", "Elektronvolt", "Elektronvolt"),
  "enerji|quad BTU": n("Kvadriljon BTU", "Kvadrillion BTU", "Kvadrillion BTU"),
};
