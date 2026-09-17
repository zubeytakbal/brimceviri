import { uzbekRegionElevations, type RegionElevation } from "./uzbekRegionElevations";
import { getAllMountainsUz, type MountainWithUzName } from "./mountainsDatabaseUz";

export function getAllRegions(): RegionElevation[] {
  return uzbekRegionElevations;
}

export function findRegionById(id: string): RegionElevation | undefined {
  return uzbekRegionElevations.find((region) => region.id === id);
}

export type RegionRankContext = {
  rank: number;
  totalCount: number;
  nextHigher: RegionElevation | null;
  nextLower: RegionElevation | null;
};

export function getRegionRankContext(id: string): RegionRankContext | null {
  const sorted = uzbekRegionElevations
    .slice()
    .sort((a, b) => b.elevationM - a.elevationM);

  const index = sorted.findIndex((region) => region.id === id);
  if (index === -1) return null;

  return {
    rank: index + 1,
    totalCount: sorted.length,
    nextHigher: index > 0 ? sorted[index - 1] : null,
    nextLower: index < sorted.length - 1 ? sorted[index + 1] : null,
  };
}

export function findNearestMountainUz(elevationM: number): MountainWithUzName | null {
  const mountains = getAllMountainsUz();
  if (mountains.length === 0) return null;

  return mountains.reduce((closest, mountain) => {
    const closestDiff = Math.abs(closest.elevationM - elevationM);
    const currentDiff = Math.abs(mountain.elevationM - elevationM);
    return currentDiff < closestDiff ? mountain : closest;
  }, mountains[0]);
}

export function findNearestRegion(elevationM: number): RegionElevation | null {
  if (uzbekRegionElevations.length === 0) return null;

  return uzbekRegionElevations.reduce((closest, region) => {
    const closestDiff = Math.abs(closest.elevationM - elevationM);
    const currentDiff = Math.abs(region.elevationM - elevationM);
    return currentDiff < closestDiff ? region : closest;
  }, uzbekRegionElevations[0]);
}
