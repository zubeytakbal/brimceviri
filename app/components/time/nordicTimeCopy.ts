// İsveççe, Norveççe ve Danca araç sayfalarının ortak arayüz metinleri.
import type { NordicLocale } from "../../converter/time/nordicWeek";

export const NORDIC_TIME_UI: Record<NordicLocale, { home: string; homeHref: string; crumbLabel: string; ogLocale: string; tocTitle: string; faqTitle: string; relatedTitle: string }> = {
  sv: { home: "Hem", homeHref: "/sv", crumbLabel: "Brödsmulor", ogLocale: "sv_SE", tocTitle: "Innehåll", faqTitle: "Vanliga frågor", relatedTitle: "Fler verktyg" },
  no: { home: "Hjem", homeHref: "/no", crumbLabel: "Brødsmuler", ogLocale: "nb_NO", tocTitle: "Innhold", faqTitle: "Vanlige spørsmål", relatedTitle: "Flere verktøy" },
  da: { home: "Forside", homeHref: "/da", crumbLabel: "Brødkrummer", ogLocale: "da_DK", tocTitle: "Indhold", faqTitle: "Ofte stillede spørgsmål", relatedTitle: "Flere værktøjer" },
};
