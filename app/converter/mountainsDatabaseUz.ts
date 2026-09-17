import { mountainsDatabase, type MountainEntry } from "./mountainsDatabase";

// TR ma'lumotlar bazasidagi raqamli faktlar (balandlik, prominence,
// yillar, rasm) o'zgarmas universal ma'lumot bo'lgani uchun to'g'ridan
// -to'g'ri qayta ishlatiladi; faqat nom/mamlakat kabi matn maydonlari
// o'zbekchaga tarjima qilingan.
export type MountainNameUz = {
  id: string;
  nameUz: string;
  rangeUz: string;
  countriesUz: string[];
};

export const mountainNamesUz: MountainNameUz[] = [
  { id: "everest", nameUz: "Everest", rangeUz: "Himolay", countriesUz: ["Nepal", "Xitoy"] },
  { id: "k2", nameUz: "K2", rangeUz: "Qorako'rum", countriesUz: ["Pokiston", "Xitoy"] },
  { id: "kangchenjunga", nameUz: "Kanchenjunga", rangeUz: "Himolay", countriesUz: ["Nepal", "Hindiston"] },
  { id: "lhotse", nameUz: "Lxotse", rangeUz: "Himolay", countriesUz: ["Nepal", "Xitoy"] },
  { id: "makalu", nameUz: "Makalu", rangeUz: "Himolay", countriesUz: ["Nepal", "Xitoy"] },
  { id: "cho-oyu", nameUz: "Cho-Oyu", rangeUz: "Himolay", countriesUz: ["Nepal", "Xitoy"] },
  { id: "dhaulagiri", nameUz: "Dhavalagiri", rangeUz: "Himolay", countriesUz: ["Nepal"] },
  { id: "manaslu", nameUz: "Manaslu", rangeUz: "Himolay", countriesUz: ["Nepal"] },
  { id: "nanga-parbat", nameUz: "Nanga-Parbat", rangeUz: "Qorako'rum", countriesUz: ["Pokiston"] },
  { id: "annapurna", nameUz: "Annapurna", rangeUz: "Himolay", countriesUz: ["Nepal"] },
  { id: "gasherbrum-1", nameUz: "Gasherbrum I", rangeUz: "Qorako'rum", countriesUz: ["Pokiston", "Xitoy"] },
  { id: "broad-peak", nameUz: "Broad Pik", rangeUz: "Qorako'rum", countriesUz: ["Pokiston", "Xitoy"] },
  { id: "gasherbrum-2", nameUz: "Gasherbrum II", rangeUz: "Qorako'rum", countriesUz: ["Pokiston", "Xitoy"] },
  { id: "shishapangma", nameUz: "Shishapangma", rangeUz: "Himolay", countriesUz: ["Xitoy"] },
];

export type MountainWithUzName = MountainEntry & MountainNameUz;

export function getAllMountainsUz(): MountainWithUzName[] {
  return mountainsDatabase.map((mountain) => {
    const uzName = mountainNamesUz.find((entry) => entry.id === mountain.id);
    return {
      ...mountain,
      nameUz: uzName?.nameUz ?? mountain.nameTr,
      rangeUz: uzName?.rangeUz ?? mountain.rangeTr,
      countriesUz: uzName?.countriesUz ?? mountain.countriesTr,
    };
  });
}

export function findMountainByIdUz(id: string): MountainWithUzName | undefined {
  return getAllMountainsUz().find((mountain) => mountain.id === id);
}

export function findSimilarElevationMountainsUz(
  id: string,
  count: number
): MountainWithUzName[] {
  const all = getAllMountainsUz();
  const target = all.find((mountain) => mountain.id === id);
  if (!target) return [];

  return all
    .filter((mountain) => mountain.id !== id)
    .map((mountain) => ({
      mountain,
      logDistance: Math.abs(
        Math.log(mountain.elevationM) - Math.log(target.elevationM)
      ),
    }))
    .sort((a, b) => a.logDistance - b.logDistance)
    .slice(0, count)
    .map((entry) => entry.mountain);
}
