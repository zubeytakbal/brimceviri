export type PipeSizeRow = {
  id: string;
  dn: number;
  nps: string;
  outerDiameterMm: number;
};

// DN (nominal cap, EN ISO 6708) - NPS (inc) - gercek dis cap (mm)
// tablosu. DIN/EN standardina gore dis cap degerleri kullanilir; iki
// bagimsiz kaynaktan (Esko Paslanmaz, Borsel Boru) capraz dogrulanmistir
// ve neredeyse birebir ortusuyor. Onemli istisna: DN65 (NPS 2 1/2),
// ASME/ANSI (Amerikan) standardinda 73.0 mm dis capa sahipken, DIN/EN
// standardinda 76.1 mm'dir -- gercek, kucumsenemeyecek bir standart
// farki, yuvarlama hatasi degil.
export const pipeNominalSizeTable: PipeSizeRow[] = [
  { id: "dn6", dn: 6, nps: "1/8\"", outerDiameterMm: 10.2 },
  { id: "dn8", dn: 8, nps: "1/4\"", outerDiameterMm: 13.5 },
  { id: "dn10", dn: 10, nps: "3/8\"", outerDiameterMm: 17.2 },
  { id: "dn15", dn: 15, nps: "1/2\"", outerDiameterMm: 21.3 },
  { id: "dn20", dn: 20, nps: "3/4\"", outerDiameterMm: 26.9 },
  { id: "dn25", dn: 25, nps: "1\"", outerDiameterMm: 33.7 },
  { id: "dn32", dn: 32, nps: "1 1/4\"", outerDiameterMm: 42.4 },
  { id: "dn40", dn: 40, nps: "1 1/2\"", outerDiameterMm: 48.3 },
  { id: "dn50", dn: 50, nps: "2\"", outerDiameterMm: 60.3 },
  { id: "dn65", dn: 65, nps: "2 1/2\"", outerDiameterMm: 76.1 },
  { id: "dn80", dn: 80, nps: "3\"", outerDiameterMm: 88.9 },
  { id: "dn100", dn: 100, nps: "4\"", outerDiameterMm: 114.3 },
  { id: "dn125", dn: 125, nps: "5\"", outerDiameterMm: 139.7 },
  { id: "dn150", dn: 150, nps: "6\"", outerDiameterMm: 168.3 },
  { id: "dn200", dn: 200, nps: "8\"", outerDiameterMm: 219.1 },
  { id: "dn250", dn: 250, nps: "10\"", outerDiameterMm: 273.0 },
  { id: "dn300", dn: 300, nps: "12\"", outerDiameterMm: 323.9 },
  { id: "dn350", dn: 350, nps: "14\"", outerDiameterMm: 355.6 },
  { id: "dn400", dn: 400, nps: "16\"", outerDiameterMm: 406.4 },
  { id: "dn450", dn: 450, nps: "18\"", outerDiameterMm: 457.2 },
  { id: "dn500", dn: 500, nps: "20\"", outerDiameterMm: 508.0 },
  { id: "dn600", dn: 600, nps: "24\"", outerDiameterMm: 609.6 },
  { id: "dn700", dn: 700, nps: "28\"", outerDiameterMm: 711.2 },
  { id: "dn800", dn: 800, nps: "32\"", outerDiameterMm: 812.8 },
  { id: "dn900", dn: 900, nps: "36\"", outerDiameterMm: 914.4 },
  { id: "dn1000", dn: 1000, nps: "40\"", outerDiameterMm: 1016.0 },
];

export function outerDiameterMmToInch(mm: number): number {
  return mm / 25.4;
}
