export type NoteDivision = {
  id: string;
  label: string;
  beats: number;
};

export const noteDivisions: NoteDivision[] = [
  { id: "1-1", label: "Tam Nota (1/1)", beats: 4 },
  { id: "1-2", label: "İkilik (1/2)", beats: 2 },
  { id: "1-4", label: "Dörtlük (1/4)", beats: 1 },
  { id: "1-8", label: "Sekizlik (1/8)", beats: 0.5 },
  { id: "1-16", label: "Onaltılık (1/16)", beats: 0.25 },
  { id: "1-32", label: "Otuzikilik (1/32)", beats: 0.125 },
];

export type NoteTiming = {
  id: string;
  label: string;
  straightMs: number;
  dottedMs: number;
  tripletMs: number;
};

export function calculateNoteTimings(bpm: number): NoteTiming[] | null {
  if (!Number.isFinite(bpm) || bpm <= 0) {
    return null;
  }

  const quarterNoteMs = 60000 / bpm;

  return noteDivisions.map((division) => {
    const straightMs = quarterNoteMs * division.beats;

    return {
      id: division.id,
      label: division.label,
      straightMs,
      dottedMs: straightMs * 1.5,
      tripletMs: straightMs * (2 / 3),
    };
  });
}

export function msToBpm(ms: number, beats: number): number | null {
  if (!Number.isFinite(ms) || ms <= 0 || !Number.isFinite(beats) || beats <= 0) {
    return null;
  }

  return (60000 * beats) / ms;
}
