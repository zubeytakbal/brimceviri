// English labels for the Orthodox fasting engine (server and client safe).
import type { ChurchCalendar, FastKind, FastPeriodId } from "../converter/christian/orthodoxFasting";

export const KIND_LABEL: Record<FastKind, string> = {
  "fast-free": "Fast-free",
  cheesefare: "Cheesefare (no meat)",
  strict: "Strict fast",
  "great-lent": "Great Lent",
  apostles: "Apostles' Fast",
  dormition: "Dormition Fast",
  nativity: "Nativity Fast",
  "wednesday-friday": "Wednesday/Friday fast",
  none: "No fast",
};

export const PERIOD_LABEL: Record<FastPeriodId, string> = {
  svyatki: "Christmastide (Svyatki)",
  "theophany-eve": "Eve of Theophany",
  "publican-pharisee": "Week of the Publican and Pharisee",
  cheesefare: "Cheesefare Week",
  "great-lent": "Great Lent",
  "holy-week": "Holy Week",
  "bright-week": "Bright Week",
  "trinity-week": "Trinity Week",
  apostles: "Apostles' Fast (Peter and Paul Fast)",
  dormition: "Dormition Fast",
  beheading: "Beheading of St. John the Baptist",
  elevation: "Elevation of the Holy Cross",
  nativity: "Nativity Fast (Advent)",
};

export const CALENDAR_LABEL: Record<ChurchCalendar, string> = {
  old: "Old calendar (Russian, Serbian, Georgian, Jerusalem, Athos)",
  new: "New calendar (Greek, Romanian, Bulgarian, Antiochian, OCA)",
};
