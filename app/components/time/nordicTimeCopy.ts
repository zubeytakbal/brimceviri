// İsveççe, Norveççe ve Danca zaman aracı sayfalarının metinleri.
// Adresler ve başlıklar o ülkede gerçekten aranan kelimelere göre seçildi
// (sv "stoppur", "väckarklocka", "vad är klockan"; no "stoppeklokke",
// "vekkerklokke", "hva er klokka"; da "stopur", "vækkeur", "hvad er klokken").
import type { NordicLocale } from "../../converter/time/nordicWeek";

export type NordicTimeTool = "timer" | "stopwatch" | "alarm" | "clock";

type Section = { id: string; title: string; paragraphs: string[] };

export type NordicTimePageCopy = {
  path: string;
  crumb: string;
  metaTitle: string;
  description: string;
  h1: string;
  intro: string;
  sections: Section[];
  faq: Array<{ question: string; answer: string }>;
};

export const NORDIC_TIME_PATHS: Record<NordicTimeTool, Record<NordicLocale, string>> = {
  timer: { sv: "/sv/timer", no: "/no/timer", da: "/da/timer" },
  stopwatch: { sv: "/sv/stoppur", no: "/no/stoppeklokke", da: "/da/stopur" },
  alarm: { sv: "/sv/vackarklocka", no: "/no/vekkerklokke", da: "/da/vaekkeur" },
  clock: { sv: "/sv/klocka", no: "/no/klokka", da: "/da/klokken" },
};

export const NORDIC_TIME_UI: Record<NordicLocale, { home: string; homeHref: string; crumbLabel: string; ogLocale: string; tocTitle: string; faqTitle: string; relatedTitle: string }> = {
  sv: { home: "Hem", homeHref: "/sv", crumbLabel: "Brödsmulor", ogLocale: "sv_SE", tocTitle: "Innehåll", faqTitle: "Vanliga frågor", relatedTitle: "Fler verktyg" },
  no: { home: "Hjem", homeHref: "/no", crumbLabel: "Brødsmuler", ogLocale: "nb_NO", tocTitle: "Innhold", faqTitle: "Vanlige spørsmål", relatedTitle: "Flere verktøy" },
  da: { home: "Forside", homeHref: "/da", crumbLabel: "Brødkrummer", ogLocale: "da_DK", tocTitle: "Indhold", faqTitle: "Ofte stillede spørgsmål", relatedTitle: "Flere værktøjer" },
};

/** Kart ve "ilgili araçlar" bağlantıları için kısa adlar. */
export const NORDIC_TIME_LABELS: Record<NordicTimeTool, Record<NordicLocale, string>> = {
  timer: { sv: "Timer", no: "Timer", da: "Timer" },
  stopwatch: { sv: "Stoppur", no: "Stoppeklokke", da: "Stopur" },
  alarm: { sv: "Väckarklocka", no: "Vekkerklokke", da: "Vækkeur" },
  clock: { sv: "Vad är klockan?", no: "Hva er klokka?", da: "Hvad er klokken?" },
};

export const NORDIC_TIME_CARD_TEXT: Record<NordicTimeTool, Record<NordicLocale, string>> = {
  timer: {
    sv: "Nedräkning med alarm, snabbval och helskärm.",
    no: "Nedtelling med alarm, hurtigvalg og fullskjerm.",
    da: "Nedtælling med alarm, hurtigvalg og fuld skærm.",
  },
  stopwatch: {
    sv: "Tidtagarur med varvtider och CSV-export.",
    no: "Stoppeklokke med rundetider og CSV-eksport.",
    da: "Stopur med omgangstider og CSV-eksport.",
  },
  alarm: {
    sv: "Ställ in ett alarm i webbläsaren med eget ljud.",
    no: "Still inn en alarm i nettleseren med egen lyd.",
    da: "Indstil en alarm i browseren med din egen lyd.",
  },
  clock: {
    sv: "Exakt tid med sekunder och 34 klockor.",
    no: "Nøyaktig tid med sekunder og 34 klokker.",
    da: "Præcis tid med sekunder og 34 ure.",
  },
};

export const NORDIC_TIME_COPY: Record<NordicTimeTool, Record<NordicLocale, NordicTimePageCopy>> = {
  timer: {
    sv: {
      path: NORDIC_TIME_PATHS.timer.sv,
      crumb: "Timer",
      metaTitle: "Timer online – nedräkning med alarm",
      description: "Gratis timer online: välj en tid, tryck på start och hör ett alarm när tiden är ute. Snabbval från 30 sekunder till 2 timmar, helskärm och paus.",
      h1: "Timer online",
      intro: "Välj ett snabbval eller ställ in en egen tid och tryck på start. Ett alarm ljuder när tiden är ute. Du kan pausa, lägga till en minut eller visa nedräkningen i helskärm.",
      sections: [
        {
          id: "sa-fungerar",
          title: "Så använder du timern",
          paragraphs: [
            "Tryck på ett snabbval, till exempel 5 eller 20 minuter, eller skriv in timmar, minuter och sekunder. Tryck på ”Starta” så börjar nedräkningen. Ringen runt siffrorna visar hur mycket tid som är kvar.",
            "Tiden mäts mot den riktiga klockan, så timern blir klar i tid även om du byter flik. Stäng bara inte fliken; på mobilen kan du slå på ”Håll skärmen tänd”.",
          ],
        },
        {
          id: "anvandning",
          title: "Populära användningar",
          paragraphs: [
            "Matlagning och bakning, träningsintervaller, prov och läxor, möten och presentationer. I helskärm syns timern tydligt även på långt håll, till exempel i ett klassrum.",
          ],
        },
      ],
      faq: [
        { question: "Fortsätter timern i bakgrunden?", answer: "Ja. Tiden räknas mot den verkliga klockan, så nedräkningen blir klar i tid även om du byter flik. Stäng inte fliken." },
        { question: "Vad händer när tiden är ute?", answer: "Det valda ljudet spelas, ringen blir full och flikens titel blinkar. Tryck på ”Stäng av ljudet” för att tysta det." },
        { question: "Kan jag ställa in en timer på flera timmar?", answer: "Ja, du kan ställa in upp till 99 timmar med fälten för timmar, minuter och sekunder." },
      ],
    },
    no: {
      path: NORDIC_TIME_PATHS.timer.no,
      crumb: "Timer",
      metaTitle: "Timer på nett – nedtelling med alarm",
      description: "Gratis timer på nett: velg en tid, trykk start og hør en alarm når tiden er ute. Hurtigvalg fra 30 sekunder til 2 timer, fullskjerm og pause.",
      h1: "Timer på nett",
      intro: "Trykk på et hurtigvalg eller still inn din egen tid, og trykk start. En alarm lyder når tiden er ute. Du kan pause, legge til ett minutt eller vise nedtellingen i fullskjerm.",
      sections: [
        {
          id: "slik-bruker-du",
          title: "Slik bruker du timeren",
          paragraphs: [
            "Trykk på et hurtigvalg, for eksempel 5 eller 20 minutter, eller skriv inn timer, minutter og sekunder. Trykk «Start», så begynner nedtellingen. Ringen rundt tallene viser hvor mye tid som er igjen.",
            "Tiden måles mot den virkelige klokka, så timeren blir ferdig i tide selv om du bytter fane. Bare ikke lukk fanen; på mobilen kan du slå på «Hold skjermen på».",
          ],
        },
        {
          id: "bruk",
          title: "Populære bruksområder",
          paragraphs: [
            "Matlaging og baking, treningsintervaller, prøver og lekser, møter og presentasjoner. I fullskjerm er timeren lett å lese på avstand, for eksempel i et klasserom.",
          ],
        },
      ],
      faq: [
        { question: "Går timeren videre i bakgrunnen?", answer: "Ja. Tiden måles mot den virkelige klokka, så nedtellingen blir ferdig i tide selv om du bytter fane. Ikke lukk fanen." },
        { question: "Hva skjer når tiden er ute?", answer: "Lyden du har valgt spilles av, ringen blir full og fanetittelen blinker. Trykk «Slå av lyden» for å stoppe den." },
        { question: "Kan jeg stille inn en timer på flere timer?", answer: "Ja, du kan stille inn opptil 99 timer med feltene for timer, minutter og sekunder." },
      ],
    },
    da: {
      path: NORDIC_TIME_PATHS.timer.da,
      crumb: "Timer",
      metaTitle: "Timer online – nedtælling med alarm",
      description: "Gratis timer online: vælg en tid, tryk start, og hør en alarm, når tiden er gået. Hurtigvalg fra 30 sekunder til 2 timer, fuld skærm og pause.",
      h1: "Timer online",
      intro: "Tryk på et hurtigvalg, eller indstil din egen tid, og tryk start. En alarm lyder, når tiden er gået. Du kan holde pause, lægge et minut til eller vise nedtællingen i fuld skærm.",
      sections: [
        {
          id: "saadan-bruger-du",
          title: "Sådan bruger du timeren",
          paragraphs: [
            "Tryk på et hurtigvalg, for eksempel 5 eller 20 minutter, eller skriv timer, minutter og sekunder. Tryk på »Start«, så begynder nedtællingen. Ringen om tallene viser, hvor meget tid der er tilbage.",
            "Tiden måles mod det rigtige ur, så timeren bliver færdig til tiden, selv om du skifter fane. Luk bare ikke fanen; på mobilen kan du slå »Hold skærmen tændt« til.",
          ],
        },
        {
          id: "brug",
          title: "Populære anvendelser",
          paragraphs: [
            "Madlavning og bagning, træningsintervaller, prøver og lektier, møder og præsentationer. I fuld skærm kan timeren let læses på afstand, for eksempel i et klasselokale.",
          ],
        },
      ],
      faq: [
        { question: "Kører timeren videre i baggrunden?", answer: "Ja. Tiden måles mod det rigtige ur, så nedtællingen bliver færdig til tiden, selv om du skifter fane. Luk ikke fanen." },
        { question: "Hvad sker der, når tiden er gået?", answer: "Den valgte lyd afspilles, ringen bliver fuld, og fanens titel blinker. Tryk på »Sluk lyden« for at stoppe den." },
        { question: "Kan jeg indstille en timer på flere timer?", answer: "Ja, du kan indstille op til 99 timer med felterne for timer, minutter og sekunder." },
      ],
    },
  },
  stopwatch: {
    sv: {
      path: NORDIC_TIME_PATHS.stopwatch.sv,
      crumb: "Stoppur",
      metaTitle: "Stoppur online – tidtagarur med varvtider",
      description: "Gratis stoppur online med hundradelar och varvtider. Se snabbaste och långsammaste varv och ladda ner tiderna som CSV.",
      h1: "Stoppur online",
      intro: "Ett tidtagarur direkt i webbläsaren. Tryck på start, spara varvtider med ”Varv” och se snabbaste och långsammaste varvet. Tiderna kan laddas ner som CSV.",
      sections: [
        {
          id: "sa-fungerar",
          title: "Så använder du stoppuret",
          paragraphs: [
            "Tryck på ”Starta” för att börja ta tid och på ”Stoppa” för att pausa. Medan stoppuret går sparar ”Varv” en mellantid. Snabbaste och långsammaste varvet markeras automatiskt.",
            "Tiden mäts mot datorns klocka med hundradelars noggrannhet och fortsätter även om du byter flik.",
          ],
        },
      ],
      faq: [
        { question: "Hur exakt är stoppuret?", answer: "Det visar hundradelar av en sekund och mäter mot webbläsarens högupplösta klocka. För officiell tävlingstidtagning används särskild utrustning." },
        { question: "Kan jag spara varvtiderna?", answer: "Ja, tryck på ”Ladda ner varv (CSV)” för att spara alla varvtider som en fil som kan öppnas i Excel eller Google Kalkylark." },
        { question: "Vad är skillnaden mellan stoppur och timer?", answer: "Ett stoppur räknar uppåt från noll och mäter hur lång tid något tar. En timer räknar nedåt från en vald tid och larmar när den är slut." },
      ],
    },
    no: {
      path: NORDIC_TIME_PATHS.stopwatch.no,
      crumb: "Stoppeklokke",
      metaTitle: "Stoppeklokke på nett – med rundetider",
      description: "Gratis stoppeklokke på nett med hundredeler og rundetider. Se raskeste og tregeste runde og last ned tidene som CSV.",
      h1: "Stoppeklokke på nett",
      intro: "En stoppeklokke rett i nettleseren. Trykk start, lagre rundetider med «Runde» og se raskeste og tregeste runde. Tidene kan lastes ned som CSV.",
      sections: [
        {
          id: "slik-bruker-du",
          title: "Slik bruker du stoppeklokka",
          paragraphs: [
            "Trykk «Start» for å begynne tidtakingen og «Stopp» for å pause. Mens stoppeklokka går, lagrer «Runde» en mellomtid. Raskeste og tregeste runde markeres automatisk.",
            "Tiden måles mot datamaskinens klokke med hundredels nøyaktighet og fortsetter selv om du bytter fane.",
          ],
        },
      ],
      faq: [
        { question: "Hvor nøyaktig er stoppeklokka?", answer: "Den viser hundredeler av et sekund og måler mot nettleserens høyoppløselige klokke. Til offisiell tidtaking i konkurranser brukes eget utstyr." },
        { question: "Kan jeg lagre rundetidene?", answer: "Ja, trykk «Last ned runder (CSV)» for å lagre alle rundetidene som en fil som kan åpnes i Excel eller Google Regneark." },
        { question: "Hva er forskjellen på stoppeklokke og timer?", answer: "En stoppeklokke teller oppover fra null og måler hvor lang tid noe tar. En timer teller ned fra en valgt tid og varsler når den er ferdig." },
      ],
    },
    da: {
      path: NORDIC_TIME_PATHS.stopwatch.da,
      crumb: "Stopur",
      metaTitle: "Stopur online – med omgangstider",
      description: "Gratis stopur online med hundrededele og omgangstider. Se den hurtigste og langsomste omgang, og download tiderne som CSV.",
      h1: "Stopur online",
      intro: "Et stopur direkte i browseren. Tryk start, gem omgangstider med »Omgang«, og se den hurtigste og langsomste omgang. Tiderne kan downloades som CSV.",
      sections: [
        {
          id: "saadan-bruger-du",
          title: "Sådan bruger du stopuret",
          paragraphs: [
            "Tryk på »Start« for at begynde tidtagningen og på »Stop« for at holde pause. Mens stopuret kører, gemmer »Omgang« en mellemtid. Den hurtigste og langsomste omgang markeres automatisk.",
            "Tiden måles mod computerens ur med hundrededels nøjagtighed og fortsætter, selv om du skifter fane.",
          ],
        },
      ],
      faq: [
        { question: "Hvor præcist er stopuret?", answer: "Det viser hundrededele af et sekund og måler mod browserens højopløselige ur. Til officiel tidtagning ved konkurrencer bruges særligt udstyr." },
        { question: "Kan jeg gemme omgangstiderne?", answer: "Ja, tryk på »Download omgange (CSV)« for at gemme alle omgangstider som en fil, der kan åbnes i Excel eller Google Sheets." },
        { question: "Hvad er forskellen på et stopur og en timer?", answer: "Et stopur tæller op fra nul og måler, hvor lang tid noget tager. En timer tæller ned fra en valgt tid og giver besked, når den er færdig." },
      ],
    },
  },
  alarm: {
    sv: {
      path: NORDIC_TIME_PATHS.alarm.sv,
      crumb: "Väckarklocka",
      metaTitle: "Väckarklocka online – ställ in alarm gratis",
      description: "Gratis väckarklocka online: ställ in ett eller flera alarm, välj ljud eller ladda upp ditt eget, upprepa dagligen eller på vardagar och snooza i 5 minuter.",
      h1: "Väckarklocka online",
      intro: "Välj en tid och tryck på ”Ställ in alarm”. Du kan ha flera alarm samtidigt, välja ljud, använda en egen ljudfil och upprepa alarmet varje dag eller på vardagar.",
      sections: [
        {
          id: "sa-fungerar",
          title: "Så fungerar väckarklockan",
          paragraphs: [
            "Alarmen sparas i din webbläsare och ringer så länge fliken är öppen. Datorn eller telefonen får inte stängas av, och på mobilen bör du slå på ”Håll skärmen tänd” så att webbläsaren inte somnar.",
            "Inget laddas upp: tiderna och en eventuell egen ljudfil stannar på din enhet.",
          ],
        },
      ],
      faq: [
        { question: "Ringer alarmet om fliken är stängd?", answer: "Nej. En webbsida kan bara spela ljud medan den är öppen. Låt fliken vara öppen och slå på ”Håll skärmen tänd” på mobilen." },
        { question: "Kan jag använda en egen låt som alarm?", answer: "Ja, välj ”Eget ljud” och en MP3-, M4A-, WAV- eller OGG-fil på upp till 15 MB. Filen sparas bara i din webbläsare." },
        { question: "Hur fungerar snooze?", answer: "Tryck på ”Snooza (5 min)” när alarmet ringer så ringer det igen om fem minuter." },
      ],
    },
    no: {
      path: NORDIC_TIME_PATHS.alarm.no,
      crumb: "Vekkerklokke",
      metaTitle: "Vekkerklokke på nett – still inn alarm gratis",
      description: "Gratis vekkerklokke på nett: still inn én eller flere alarmer, velg lyd eller last opp din egen, gjenta hver dag eller på hverdager og slumre i 5 minutter.",
      h1: "Vekkerklokke på nett",
      intro: "Velg et klokkeslett og trykk «Still inn alarm». Du kan ha flere alarmer samtidig, velge lyd, bruke en egen lydfil og gjenta alarmen hver dag eller på hverdager.",
      sections: [
        {
          id: "slik-fungerer",
          title: "Slik fungerer vekkerklokka",
          paragraphs: [
            "Alarmene lagres i nettleseren din og ringer så lenge fanen er åpen. Datamaskinen eller telefonen må ikke slås av, og på mobilen bør du slå på «Hold skjermen på» så nettleseren ikke sovner.",
            "Ingenting lastes opp: tidene og en eventuell egen lydfil blir på enheten din.",
          ],
        },
      ],
      faq: [
        { question: "Ringer alarmen hvis fanen er lukket?", answer: "Nei. En nettside kan bare spille av lyd mens den er åpen. La fanen være åpen og slå på «Hold skjermen på» på mobilen." },
        { question: "Kan jeg bruke min egen sang som alarm?", answer: "Ja, velg «Egen lyd» og en MP3-, M4A-, WAV- eller OGG-fil på opptil 15 MB. Filen lagres bare i nettleseren din." },
        { question: "Hvordan fungerer slumring?", answer: "Trykk «Slumre (5 min)» når alarmen ringer, så ringer den igjen om fem minutter." },
      ],
    },
    da: {
      path: NORDIC_TIME_PATHS.alarm.da,
      crumb: "Vækkeur",
      metaTitle: "Vækkeur online – indstil en gratis alarm",
      description: "Gratis vækkeur online: indstil en eller flere alarmer, vælg lyd eller upload din egen, gentag hver dag eller på hverdage, og snooze i 5 minutter.",
      h1: "Vækkeur online",
      intro: "Vælg et tidspunkt, og tryk på »Indstil alarm«. Du kan have flere alarmer på én gang, vælge lyd, bruge din egen lydfil og gentage alarmen hver dag eller på hverdage.",
      sections: [
        {
          id: "saadan-virker",
          title: "Sådan virker vækkeuret",
          paragraphs: [
            "Alarmerne gemmes i din browser og ringer, så længe fanen er åben. Computeren eller telefonen må ikke slukkes, og på mobilen bør du slå »Hold skærmen tændt« til, så browseren ikke går i dvale.",
            "Intet uploades: tidspunkterne og en eventuel egen lydfil bliver på din enhed.",
          ],
        },
      ],
      faq: [
        { question: "Ringer alarmen, hvis fanen er lukket?", answer: "Nej. En hjemmeside kan kun afspille lyd, mens den er åben. Lad fanen være åben, og slå »Hold skærmen tændt« til på mobilen." },
        { question: "Kan jeg bruge min egen sang som alarm?", answer: "Ja, vælg »Egen lyd« og en MP3-, M4A-, WAV- eller OGG-fil på op til 15 MB. Filen gemmes kun i din browser." },
        { question: "Hvordan virker snooze?", answer: "Tryk på »Snooze (5 min.)«, når alarmen ringer, så ringer den igen om fem minutter." },
      ],
    },
  },
  clock: {
    sv: {
      path: NORDIC_TIME_PATHS.clock.sv,
      crumb: "Klocka",
      metaTitle: "Vad är klockan? Exakt tid nu med sekunder",
      description: "Vad är klockan just nu? Se exakt tid med sekunder och datum i din tidszon. Välj mellan 34 klockor, från stationsur till ordklocka, och visa dem i helskärm.",
      h1: "Vad är klockan?",
      intro: "Exakt tid just nu med sekunder och datum, hämtad från din enhet. Välj bland 34 klockor, slå på tickande och timslag, och visa klockan i helskärm.",
      sections: [
        {
          id: "klockor",
          title: "34 klockor att välja mellan",
          paragraphs: [
            "Analoga klockor som stationsur och pendelur, digitala som LED och vippsiffror, gamla klockor som gökur och fickur, armbandsur och speciella klockor som ordklockan, som skriver tiden i ord: ”Klockan är fem i halv fyra”.",
            "Sverige följer centraleuropeisk tid (CET, UTC+1) och sommartid (CEST, UTC+2) från sista söndagen i mars till sista söndagen i oktober.",
          ],
        },
      ],
      faq: [
        { question: "Hur exakt är klockan?", answer: "Den visar tiden från din dator eller telefon, som normalt synkroniseras automatiskt mot en tidsserver och därmed är exakt på någon sekund när." },
        { question: "Vilken tidszon har Sverige?", answer: "Centraleuropeisk tid, UTC+1. Under sommartid gäller UTC+2." },
        { question: "Kan jag visa klockan i helskärm?", answer: "Ja, tryck på ”Helskärm” under klockan. Slå också på ”Håll skärmen tänd” om klockan ska synas länge." },
      ],
    },
    no: {
      path: NORDIC_TIME_PATHS.clock.no,
      crumb: "Klokka",
      metaTitle: "Hva er klokka? Nøyaktig tid nå med sekunder",
      description: "Hva er klokka nå? Se nøyaktig tid med sekunder og dato i din tidssone. Velg mellom 34 klokker, fra stasjonsur til ordklokke, og vis dem i fullskjerm.",
      h1: "Hva er klokka?",
      intro: "Nøyaktig tid akkurat nå med sekunder og dato, hentet fra enheten din. Velg blant 34 klokker, slå på tikking og timeslag, og vis klokka i fullskjerm.",
      sections: [
        {
          id: "klokker",
          title: "34 klokker å velge mellom",
          paragraphs: [
            "Analoge klokker som stasjonsur og pendelur, digitale som LED og vippetall, gamle klokker som gjøkur og lommeur, armbåndsur og spesielle klokker som ordklokka, som skriver tiden med ord: «Klokka er fem på halv fire».",
            "Norge følger sentraleuropeisk tid (CET, UTC+1) og sommertid (CEST, UTC+2) fra siste søndag i mars til siste søndag i oktober.",
          ],
        },
      ],
      faq: [
        { question: "Hvor nøyaktig er klokka?", answer: "Den viser tiden fra datamaskinen eller telefonen din, som vanligvis synkroniseres automatisk mot en tidsserver og derfor er nøyaktig på noen sekunder nær." },
        { question: "Hvilken tidssone har Norge?", answer: "Sentraleuropeisk tid, UTC+1. Om sommeren gjelder UTC+2." },
        { question: "Kan jeg vise klokka i fullskjerm?", answer: "Ja, trykk «Fullskjerm» under klokka. Slå også på «Hold skjermen på» hvis klokka skal vises lenge." },
      ],
    },
    da: {
      path: NORDIC_TIME_PATHS.clock.da,
      crumb: "Klokken",
      metaTitle: "Hvad er klokken? Præcis tid nu med sekunder",
      description: "Hvad er klokken lige nu? Se den præcise tid med sekunder og dato i din tidszone. Vælg mellem 34 ure, fra stationsur til ordur, og vis dem i fuld skærm.",
      h1: "Hvad er klokken?",
      intro: "Præcis tid lige nu med sekunder og dato, hentet fra din enhed. Vælg mellem 34 ure, slå tikken og timeslag til, og vis uret i fuld skærm.",
      sections: [
        {
          id: "ure",
          title: "34 ure at vælge imellem",
          paragraphs: [
            "Analoge ure som stationsur og pendulur, digitale som LED og vippetal, gamle ure som kukkeur og lommeur, armbåndsure og særlige ure som ordur, der skriver tiden med ord: »Klokken er fem i halv fire«.",
            "Danmark følger centraleuropæisk tid (CET, UTC+1) og sommertid (CEST, UTC+2) fra sidste søndag i marts til sidste søndag i oktober.",
          ],
        },
      ],
      faq: [
        { question: "Hvor præcist er uret?", answer: "Det viser tiden fra din computer eller telefon, som normalt synkroniseres automatisk med en tidsserver og derfor er præcis inden for få sekunder." },
        { question: "Hvilken tidszone har Danmark?", answer: "Centraleuropæisk tid, UTC+1. Om sommeren gælder UTC+2." },
        { question: "Kan jeg vise uret i fuld skærm?", answer: "Ja, tryk på »Fuld skærm« under uret. Slå også »Hold skærmen tændt« til, hvis uret skal vises længe." },
      ],
    },
  },
};
