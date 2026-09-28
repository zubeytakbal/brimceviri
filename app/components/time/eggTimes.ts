// Eieruhr: Garstufe und Eigröße wählen, der Timer übernimmt die Kochzeit.
// Richtwerte für kühlschrankkalte Eier, in sprudelnd kochendes Wasser gelegt.

export const EGG_STAGES = [
  { id: "sehr-weich", label: "Sehr weich", minutes: 4, text: "Eiweiß gerade gestockt, Eigelb flüssig" },
  { id: "weich", label: "Weich", minutes: 5, text: "Eiweiß fest, Eigelb flüssig" },
  { id: "wachsweich", label: "Wachsweich", minutes: 7, text: "Eigelb außen fest, innen cremig" },
  { id: "fest", label: "Fest", minutes: 8, text: "Eigelb fast durch, noch saftig" },
  { id: "hart", label: "Hart", minutes: 10, text: "Eiweiß und Eigelb schnittfest" },
] as const;

export const EGG_SIZES = [
  { id: "S", label: "S", delta: -1 },
  { id: "M", label: "M", delta: 0 },
  { id: "L", label: "L", delta: 1 },
  { id: "XL", label: "XL", delta: 1.5 },
] as const;
