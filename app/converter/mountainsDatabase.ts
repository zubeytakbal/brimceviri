// Dunyanin 8.000 metre uzeri 14 zirvesi (eight-thousanders). Hepsi
// Himalaya/Karakoram sıradaglarinda, Wikipedia'nin (Wikidata kaynakli)
// infobox verilerinden alinmis, capraz kontrol edilmis degerler.
export type MountainEntry = {
  id: string;
  nameTr: string;
  elevationM: number;
  prominenceM: number;
  rangeTr: string;
  countriesTr: string[];
  firstAscentYear: number;
};

export const mountainsDatabase: MountainEntry[] = [
  {
    id: "everest",
    nameTr: "Everest",
    elevationM: 8849,
    prominenceM: 8849,
    rangeTr: "Himalaya",
    countriesTr: ["Nepal", "Çin"],
    firstAscentYear: 1953,
  },
  {
    id: "k2",
    nameTr: "K2",
    elevationM: 8611,
    prominenceM: 4020,
    rangeTr: "Karakoram",
    countriesTr: ["Pakistan", "Çin"],
    firstAscentYear: 1954,
  },
  {
    id: "kangchenjunga",
    nameTr: "Kangchenjunga",
    elevationM: 8586,
    prominenceM: 3922,
    rangeTr: "Himalaya",
    countriesTr: ["Nepal", "Hindistan"],
    firstAscentYear: 1955,
  },
  {
    id: "lhotse",
    nameTr: "Lhotse",
    elevationM: 8516,
    prominenceM: 610,
    rangeTr: "Himalaya",
    countriesTr: ["Nepal", "Çin"],
    firstAscentYear: 1956,
  },
  {
    id: "makalu",
    nameTr: "Makalu",
    elevationM: 8485,
    prominenceM: 2378,
    rangeTr: "Himalaya",
    countriesTr: ["Nepal", "Çin"],
    firstAscentYear: 1955,
  },
  {
    id: "cho-oyu",
    nameTr: "Cho Oyu",
    elevationM: 8188,
    prominenceM: 2340,
    rangeTr: "Himalaya",
    countriesTr: ["Nepal", "Çin"],
    firstAscentYear: 1954,
  },
  {
    id: "dhaulagiri",
    nameTr: "Dhaulagiri",
    elevationM: 8167,
    prominenceM: 3357,
    rangeTr: "Himalaya",
    countriesTr: ["Nepal"],
    firstAscentYear: 1960,
  },
  {
    id: "manaslu",
    nameTr: "Manaslu",
    elevationM: 8163,
    prominenceM: 3092,
    rangeTr: "Himalaya",
    countriesTr: ["Nepal"],
    firstAscentYear: 1956,
  },
  {
    id: "nanga-parbat",
    nameTr: "Nanga Parbat",
    elevationM: 8125,
    prominenceM: 4608,
    rangeTr: "Karakoram",
    countriesTr: ["Pakistan"],
    firstAscentYear: 1953,
  },
  {
    id: "annapurna",
    nameTr: "Annapurna",
    elevationM: 8091,
    prominenceM: 2984,
    rangeTr: "Himalaya",
    countriesTr: ["Nepal"],
    firstAscentYear: 1950,
  },
  {
    id: "gasherbrum-1",
    nameTr: "Gasherbrum I",
    elevationM: 8080,
    prominenceM: 2155,
    rangeTr: "Karakoram",
    countriesTr: ["Pakistan", "Çin"],
    firstAscentYear: 1958,
  },
  {
    id: "broad-peak",
    nameTr: "Broad Peak",
    elevationM: 8051,
    prominenceM: 1701,
    rangeTr: "Karakoram",
    countriesTr: ["Pakistan", "Çin"],
    firstAscentYear: 1957,
  },
  {
    id: "gasherbrum-2",
    nameTr: "Gasherbrum II",
    elevationM: 8034,
    prominenceM: 1524,
    rangeTr: "Karakoram",
    countriesTr: ["Pakistan", "Çin"],
    firstAscentYear: 1956,
  },
  {
    id: "shishapangma",
    nameTr: "Shishapangma",
    elevationM: 8027,
    prominenceM: 2897,
    rangeTr: "Himalaya",
    countriesTr: ["Çin"],
    firstAscentYear: 1964,
  },
];
