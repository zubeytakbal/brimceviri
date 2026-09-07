export interface CountryPowerInfo {
  id: string;
  nameTr: string;
  voltageLabel: string;
  voltageRange: [number, number];
  frequencyLabel: string;
  frequencies: number[];
  plugTypes: string[];
}

export const plugTypeDescriptions: Record<string, string> = {
  A: "İki düz paralel pim (topraksız) — ABD/Japonya/Kanada tipi",
  B: "İki düz pim + toprak pimi — ABD/Kanada tipi (topraklı)",
  C: "İki yuvarlak pim (topraksız) — Avrupa standardı",
  D: "Üç yuvarlak pim, üçgen düzen (topraklı) — eski İngiliz tipi",
  E: "İki yuvarlak pim + prizde toprak deliği — Fransız tipi",
  F: "İki yuvarlak pim + yanlarda toprak klipsi (Schuko) — Alman tipi",
  G: "Üç dikdörtgen pim — İngiliz (BS 1363) tipi",
  H: "İki eğik yuvarlak pim — İsrail tipi",
  I: "Üç düz pim, V şeklinde — Avustralya/Çin tipi",
  J: "İki yuvarlak pim + toprak pimi — İsviçre tipi",
  K: "İki yuvarlak pim + toprak pimi — Danimarka tipi",
  L: "İki yuvarlak pim + orta toprak pimi — İtalyan tipi",
  M: "Üç kalın yuvarlak pim — Güney Afrika tipi",
  N: "İki/üç yuvarlak pim — Brezilya tipi",
  O: "Üç pimli — Tayland tipi",
};

export const countryPowerData: CountryPowerInfo[] = [
  { id: "turkiye", nameTr: "Türkiye", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "F"] },
  { id: "almanya", nameTr: "Almanya", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "F"] },
  { id: "fransa", nameTr: "Fransa", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "E"] },
  { id: "italya", nameTr: "İtalya", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "F", "L"] },
  { id: "ispanya", nameTr: "İspanya", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "F"] },
  { id: "portekiz", nameTr: "Portekiz", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "F"] },
  { id: "hollanda", nameTr: "Hollanda", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "F"] },
  { id: "belcika", nameTr: "Belçika", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "E"] },
  { id: "isvicre", nameTr: "İsviçre", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "J"] },
  { id: "avusturya", nameTr: "Avusturya", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "F"] },
  { id: "birlesik-krallik", nameTr: "Birleşik Krallık (İngiltere, İskoçya, Galler)", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["G"] },
  { id: "irlanda", nameTr: "İrlanda", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["G"] },
  { id: "danimarka", nameTr: "Danimarka", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "F", "K"] },
  { id: "norvec", nameTr: "Norveç", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "F"] },
  { id: "isvec", nameTr: "İsveç", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "F"] },
  { id: "finlandiya", nameTr: "Finlandiya", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "F"] },
  { id: "izlanda", nameTr: "İzlanda", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "F"] },
  { id: "polonya", nameTr: "Polonya", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "E"] },
  { id: "cek-cumhuriyeti", nameTr: "Çek Cumhuriyeti", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "E"] },
  { id: "slovakya", nameTr: "Slovakya", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "E"] },
  { id: "macaristan", nameTr: "Macaristan", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "F"] },
  { id: "romanya", nameTr: "Romanya", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "F"] },
  { id: "bulgaristan", nameTr: "Bulgaristan", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "F"] },
  { id: "yunanistan", nameTr: "Yunanistan", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "F"] },
  { id: "hirvatistan", nameTr: "Hırvatistan", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "F"] },
  { id: "sirbistan", nameTr: "Sırbistan", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "F"] },
  { id: "bosna-hersek", nameTr: "Bosna Hersek", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "F"] },
  { id: "karadag", nameTr: "Karadağ", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "F"] },
  { id: "kuzey-makedonya", nameTr: "Kuzey Makedonya", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "F"] },
  { id: "arnavutluk", nameTr: "Arnavutluk", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "F"] },
  { id: "kosova", nameTr: "Kosova", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "F"] },
  { id: "slovenya", nameTr: "Slovenya", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "F"] },
  { id: "ukrayna", nameTr: "Ukrayna", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "F"] },
  { id: "rusya", nameTr: "Rusya", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "F"] },
  { id: "belarus", nameTr: "Belarus", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "F"] },
  { id: "moldova", nameTr: "Moldova", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "F"] },
  { id: "estonya", nameTr: "Estonya", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "F"] },
  { id: "letonya", nameTr: "Letonya", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "F"] },
  { id: "litvanya", nameTr: "Litvanya", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "F"] },
  { id: "kibris", nameTr: "Kıbrıs (Rum Kesimi)", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["G"] },
  { id: "kktc", nameTr: "Kuzey Kıbrıs Türk Cumhuriyeti", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["G"] },
  { id: "malta", nameTr: "Malta", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["G"] },
  { id: "lihtenstayn", nameTr: "Lihtenştayn", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "J"] },
  { id: "luksemburg", nameTr: "Lüksemburg", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "F"] },
  { id: "monako", nameTr: "Monako", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "E"] },
  { id: "gurcistan", nameTr: "Gürcistan", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "F"] },
  { id: "ermenistan", nameTr: "Ermenistan", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "F"] },
  { id: "azerbaycan", nameTr: "Azerbaycan", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "F"] },
  { id: "kazakistan", nameTr: "Kazakistan", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "F"] },
  { id: "ozbekistan", nameTr: "Özbekistan", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "F"] },
  { id: "kirgizistan", nameTr: "Kırgızistan", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "F"] },
  { id: "tacikistan", nameTr: "Tacikistan", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "F"] },
  { id: "turkmenistan", nameTr: "Türkmenistan", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "F"] },
  { id: "amerika-birlesik-devletleri", nameTr: "Amerika Birleşik Devletleri", voltageLabel: "120V", voltageRange: [120, 120], frequencyLabel: "60Hz", frequencies: [60], plugTypes: ["A", "B"] },
  { id: "kanada", nameTr: "Kanada", voltageLabel: "120V", voltageRange: [120, 120], frequencyLabel: "60Hz", frequencies: [60], plugTypes: ["A", "B"] },
  { id: "meksika", nameTr: "Meksika", voltageLabel: "127V", voltageRange: [127, 127], frequencyLabel: "60Hz", frequencies: [60], plugTypes: ["A", "B"] },
  { id: "brezilya", nameTr: "Brezilya", voltageLabel: "127V / 220V (bölgeye göre)", voltageRange: [127, 220], frequencyLabel: "60Hz", frequencies: [60], plugTypes: ["C", "N"] },
  { id: "arjantin", nameTr: "Arjantin", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["I"] },
  { id: "sili", nameTr: "Şili", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "L"] },
  { id: "kolombiya", nameTr: "Kolombiya", voltageLabel: "110V", voltageRange: [110, 110], frequencyLabel: "60Hz", frequencies: [60], plugTypes: ["A", "B"] },
  { id: "peru", nameTr: "Peru", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "60Hz", frequencies: [60], plugTypes: ["A", "B", "C"] },
  { id: "ekvador", nameTr: "Ekvador", voltageLabel: "120V", voltageRange: [120, 120], frequencyLabel: "60Hz", frequencies: [60], plugTypes: ["A", "B"] },
  { id: "venezuela", nameTr: "Venezuela", voltageLabel: "120V", voltageRange: [120, 120], frequencyLabel: "60Hz", frequencies: [60], plugTypes: ["A", "B"] },
  { id: "bolivya", nameTr: "Bolivya", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["A", "B", "C"] },
  { id: "paraguay", nameTr: "Paraguay", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["A", "B", "C", "N"] },
  { id: "uruguay", nameTr: "Uruguay", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "F", "L"] },
  { id: "kosta-rika", nameTr: "Kosta Rika", voltageLabel: "120V", voltageRange: [120, 120], frequencyLabel: "60Hz", frequencies: [60], plugTypes: ["A", "B"] },
  { id: "panama", nameTr: "Panama", voltageLabel: "120V", voltageRange: [120, 120], frequencyLabel: "60Hz", frequencies: [60], plugTypes: ["A", "B"] },
  { id: "guatemala", nameTr: "Guatemala", voltageLabel: "120V", voltageRange: [120, 120], frequencyLabel: "60Hz", frequencies: [60], plugTypes: ["A", "B"] },
  { id: "kuba", nameTr: "Küba", voltageLabel: "120V", voltageRange: [120, 120], frequencyLabel: "60Hz", frequencies: [60], plugTypes: ["A", "B"] },
  { id: "dominik-cumhuriyeti", nameTr: "Dominik Cumhuriyeti", voltageLabel: "120V", voltageRange: [120, 120], frequencyLabel: "60Hz", frequencies: [60], plugTypes: ["A", "B"] },
  { id: "jamaika", nameTr: "Jamaika", voltageLabel: "110V", voltageRange: [110, 110], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["A", "B"] },
  { id: "porto-riko", nameTr: "Porto Riko", voltageLabel: "120V", voltageRange: [120, 120], frequencyLabel: "60Hz", frequencies: [60], plugTypes: ["A", "B"] },
  { id: "japonya", nameTr: "Japonya", voltageLabel: "100V", voltageRange: [100, 100], frequencyLabel: "50Hz (doğu) / 60Hz (batı)", frequencies: [50, 60], plugTypes: ["A", "B"] },
  { id: "guney-kore", nameTr: "Güney Kore", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "60Hz", frequencies: [60], plugTypes: ["C", "F"] },
  { id: "cin", nameTr: "Çin", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["A", "I"] },
  { id: "hong-kong", nameTr: "Hong Kong", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["G"] },
  { id: "tayvan", nameTr: "Tayvan", voltageLabel: "110V", voltageRange: [110, 110], frequencyLabel: "60Hz", frequencies: [60], plugTypes: ["A", "B"] },
  { id: "hindistan", nameTr: "Hindistan", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "D", "M"] },
  { id: "pakistan", nameTr: "Pakistan", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "D"] },
  { id: "bangladesh", nameTr: "Bangladeş", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["A", "C", "D", "G", "M"] },
  { id: "sri-lanka", nameTr: "Sri Lanka", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["G"] },
  { id: "nepal", nameTr: "Nepal", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "D", "M"] },
  { id: "endonezya", nameTr: "Endonezya", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "F"] },
  { id: "malezya", nameTr: "Malezya", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["G"] },
  { id: "singapur", nameTr: "Singapur", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["G"] },
  { id: "tayland", nameTr: "Tayland", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["A", "B", "C", "O"] },
  { id: "vietnam", nameTr: "Vietnam", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["A", "B", "C"] },
  { id: "filipinler", nameTr: "Filipinler", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "60Hz", frequencies: [60], plugTypes: ["A", "B", "C"] },
  { id: "kamboçya", nameTr: "Kamboçya", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["A", "B", "C", "G"] },
  { id: "laos", nameTr: "Laos", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["A", "B", "C"] },
  { id: "myanmar", nameTr: "Myanmar", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "D", "G"] },
  { id: "moğolistan", nameTr: "Moğolistan", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "F"] },
  { id: "avustralya", nameTr: "Avustralya", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["I"] },
  { id: "yeni-zelanda", nameTr: "Yeni Zelanda", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["I"] },
  { id: "fiji", nameTr: "Fiji", voltageLabel: "240V", voltageRange: [240, 240], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["I"] },
  { id: "misir", nameTr: "Mısır", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "F"] },
  { id: "fas", nameTr: "Fas", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "E"] },
  { id: "tunus", nameTr: "Tunus", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "E"] },
  { id: "cezayir", nameTr: "Cezayir", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "F"] },
  { id: "libya", nameTr: "Libya", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "F", "L"] },
  { id: "guney-afrika", nameTr: "Güney Afrika", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "M", "N"] },
  { id: "nijerya", nameTr: "Nijerya", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["G"] },
  { id: "kenya", nameTr: "Kenya", voltageLabel: "240V", voltageRange: [240, 240], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["G"] },
  { id: "etiyopya", nameTr: "Etiyopya", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "F", "G"] },
  { id: "tanzanya", nameTr: "Tanzanya", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["G"] },
  { id: "gana", nameTr: "Gana", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["G"] },
  { id: "senegal", nameTr: "Senegal", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "E"] },
  { id: "birlesik-arap-emirlikleri", nameTr: "Birleşik Arap Emirlikleri", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["G"] },
  { id: "suudi-arabistan", nameTr: "Suudi Arabistan", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "60Hz", frequencies: [60], plugTypes: ["G"] },
  { id: "katar", nameTr: "Katar", voltageLabel: "240V", voltageRange: [240, 240], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["G"] },
  { id: "kuveyt", nameTr: "Kuveyt", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["G"] },
  { id: "bahreyn", nameTr: "Bahreyn", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["G"] },
  { id: "umman", nameTr: "Umman", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["G"] },
  { id: "urdun", nameTr: "Ürdün", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "F", "G"] },
  { id: "lubnan", nameTr: "Lübnan", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "F"] },
  { id: "israil", nameTr: "İsrail", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "H"] },
  { id: "irak", nameTr: "Irak", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "G"] },
  { id: "iran", nameTr: "İran", voltageLabel: "230V", voltageRange: [230, 230], frequencyLabel: "50Hz", frequencies: [50], plugTypes: ["C", "F"] },
];

export function getCountryById(id: string): CountryPowerInfo | undefined {
  return countryPowerData.find((country) => country.id === id);
}

export interface PlugVoltageCompatibilityResult {
  fromCountry: CountryPowerInfo;
  toCountry: CountryPowerInfo;
  plugMatches: boolean;
  sharedPlugTypes: string[];
  missingPlugTypes: string[];
  voltageCompatible: boolean;
  frequencyDiffers: boolean;
  needsAdapter: boolean;
  needsConverter: boolean;
}

export function calculatePlugVoltageCompatibility(
  fromId: string,
  toId: string,
  deviceIsDualVoltage: boolean,
): PlugVoltageCompatibilityResult | null {
  const fromCountry = getCountryById(fromId);
  const toCountry = getCountryById(toId);
  if (!fromCountry || !toCountry) return null;

  const sharedPlugTypes = fromCountry.plugTypes.filter((type) =>
    toCountry.plugTypes.includes(type),
  );
  const plugMatches = sharedPlugTypes.length > 0;
  const missingPlugTypes = toCountry.plugTypes.filter(
    (type) => !fromCountry.plugTypes.includes(type),
  );

  const voltageOverlaps =
    fromCountry.voltageRange[0] <= toCountry.voltageRange[1] &&
    toCountry.voltageRange[0] <= fromCountry.voltageRange[1];
  const voltageCompatible = deviceIsDualVoltage || voltageOverlaps;

  const frequencyDiffers = !fromCountry.frequencies.some((freq) =>
    toCountry.frequencies.includes(freq),
  );

  return {
    fromCountry,
    toCountry,
    plugMatches,
    sharedPlugTypes,
    missingPlugTypes: plugMatches ? [] : missingPlugTypes,
    voltageCompatible,
    frequencyDiffers,
    needsAdapter: !plugMatches,
    needsConverter: !voltageCompatible,
  };
}
