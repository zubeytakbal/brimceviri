// İsveççe, Norveççe ve Danca zaman aracı sayfalarının metinleri.
// Adresler ve başlıklar o ülkede gerçekten aranan kelimelere göre seçildi
// (sv "stoppur", "väckarklocka", "vad är klockan"; no "stoppeklokke",
// "vekkerklokke", "hva er klokka"; da "stopur", "vækkeur", "hvad er klokken").
import type { NordicLocale } from "../../converter/time/nordicWeek";

export type NordicTimeTool = "timer" | "stopwatch" | "alarm" | "clock" | "pomodoro" | "interval";

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
  pomodoro: { sv: "/sv/pomodoro", no: "/no/pomodoro", da: "/da/pomodoro" },
  interval: { sv: "/sv/intervalltimer", no: "/no/intervalltimer", da: "/da/intervaltimer" },
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
  pomodoro: { sv: "Pomodoro-timer", no: "Pomodoro-timer", da: "Pomodoro-timer" },
  interval: { sv: "Intervalltimer", no: "Intervalltimer", da: "Intervaltimer" },
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
  pomodoro: {
    sv: "25 minuters fokus och korta pauser.",
    no: "25 minutters fokus og korte pauser.",
    da: "25 minutters fokus og korte pauser.",
  },
  interval: {
    sv: "Tabata, HIIT och EMOM med röstsignaler.",
    no: "Tabata, HIIT og EMOM med talesignaler.",
    da: "Tabata, HIIT og EMOM med talesignaler.",
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
  pomodoro: {
    sv: {
      path: NORDIC_TIME_PATHS.pomodoro.sv,
      crumb: "Pomodoro",
      metaTitle: "Pomodoro-timer online – 25 minuters fokus",
      description: "Gratis pomodoro-timer: 25 minuters fokus, 5 minuters paus och en lång paus efter fyra pass. Justerbara tider, aviseringar och dagens statistik.",
      h1: "Pomodoro-timer",
      intro: "Arbeta fokuserat i 25 minuter, ta 5 minuters paus och en längre paus efter fyra pass. Skriv vad du arbetar med och se hur många pomodoros du klarat idag.",
      sections: [
        {
          id: "metoden",
          title: "Så fungerar pomodorometoden",
          paragraphs: [
            "Pomodorotekniken utvecklades av Francesco Cirillo i slutet av 1980-talet. Du arbetar med en enda uppgift i 25 minuter (ett ”pomodoro”), tar sedan 5 minuters paus, och efter fyra pass en längre paus på 15–30 minuter.",
            "De korta passen gör det lättare att komma igång och att hålla fokus, och pauserna motverkar trötthet. Tiderna kan ändras under Inställningar, till exempel 50/10 för längre arbetspass.",
          ],
        },
      ],
      faq: [
        { question: "Varför just 25 minuter?", answer: "25 minuter är tillräckligt kort för att det ska kännas lätt att börja och tillräckligt långt för att hinna göra framsteg. Passar det inte dig kan du ändra tiden under Inställningar." },
        { question: "Sparas mina pomodoros?", answer: "Dagens avslutade pass sparas bara i din webbläsare. Inget laddas upp." },
        { question: "Får jag en signal när passet är slut?", answer: "Ja, ett ljud spelas och du kan också slå på webbläsaraviseringar så att du märker det även i en annan flik." },
      ],
    },
    no: {
      path: NORDIC_TIME_PATHS.pomodoro.no,
      crumb: "Pomodoro",
      metaTitle: "Pomodoro-timer på nett – 25 minutters fokus",
      description: "Gratis pomodoro-timer: 25 minutters fokus, 5 minutters pause og en lang pause etter fire økter. Justerbare tider, varsler og dagens statistikk.",
      h1: "Pomodoro-timer",
      intro: "Jobb fokusert i 25 minutter, ta 5 minutters pause og en lengre pause etter fire økter. Skriv hva du jobber med, og se hvor mange pomodoroer du har klart i dag.",
      sections: [
        {
          id: "metoden",
          title: "Slik fungerer pomodoroteknikken",
          paragraphs: [
            "Pomodoroteknikken ble utviklet av Francesco Cirillo på slutten av 1980-tallet. Du jobber med én oppgave i 25 minutter (en «pomodoro»), tar så 5 minutters pause, og etter fire økter en lengre pause på 15–30 minutter.",
            "De korte øktene gjør det lettere å komme i gang og holde fokus, og pausene motvirker tretthet. Tidene kan endres under Innstillinger, for eksempel 50/10 for lengre arbeidsøkter.",
          ],
        },
      ],
      faq: [
        { question: "Hvorfor akkurat 25 minutter?", answer: "25 minutter er kort nok til at det føles lett å begynne, og langt nok til å komme et stykke på vei. Passer det ikke deg, kan du endre tiden under Innstillinger." },
        { question: "Lagres pomodoroene mine?", answer: "Dagens fullførte økter lagres bare i nettleseren din. Ingenting lastes opp." },
        { question: "Får jeg et signal når økten er over?", answer: "Ja, en lyd spilles av, og du kan også slå på nettleservarsler så du merker det selv i en annen fane." },
      ],
    },
    da: {
      path: NORDIC_TIME_PATHS.pomodoro.da,
      crumb: "Pomodoro",
      metaTitle: "Pomodoro-timer online – 25 minutters fokus",
      description: "Gratis pomodoro-timer: 25 minutters fokus, 5 minutters pause og en lang pause efter fire runder. Justerbare tider, notifikationer og dagens statistik.",
      h1: "Pomodoro-timer",
      intro: "Arbejd fokuseret i 25 minutter, hold 5 minutters pause og en længere pause efter fire runder. Skriv, hvad du arbejder på, og se, hvor mange pomodoroer du har klaret i dag.",
      sections: [
        {
          id: "metoden",
          title: "Sådan virker pomodoroteknikken",
          paragraphs: [
            "Pomodoroteknikken blev udviklet af Francesco Cirillo i slutningen af 1980'erne. Du arbejder med én opgave i 25 minutter (en »pomodoro«), holder så 5 minutters pause og efter fire runder en længere pause på 15–30 minutter.",
            "De korte runder gør det lettere at komme i gang og holde fokus, og pauserne modvirker træthed. Tiderne kan ændres under Indstillinger, for eksempel 50/10 til længere arbejdsrunder.",
          ],
        },
      ],
      faq: [
        { question: "Hvorfor netop 25 minutter?", answer: "25 minutter er kort nok til, at det føles let at begynde, og langt nok til at nå et stykke. Passer det ikke dig, kan du ændre tiden under Indstillinger." },
        { question: "Bliver mine pomodoroer gemt?", answer: "Dagens fuldførte runder gemmes kun i din browser. Intet uploades." },
        { question: "Får jeg et signal, når runden er slut?", answer: "Ja, der afspilles en lyd, og du kan også slå browsernotifikationer til, så du opdager det, selv i en anden fane." },
      ],
    },
  },
  interval: {
    sv: {
      path: NORDIC_TIME_PATHS.interval.sv,
      crumb: "Intervalltimer",
      metaTitle: "Intervalltimer – Tabata, HIIT och EMOM online",
      description: "Gratis intervalltimer för träning: Tabata 20/10, HIIT, EMOM, boxning och planka. Röstsignaler, pip de sista sekunderna och eget program.",
      h1: "Intervalltimer",
      intro: "Välj ett färdigt program som Tabata 20/10 eller HIIT, eller ställ in egna tider för arbete, vila och antal varv. Röstsignaler och pip hjälper dig att hålla takten utan att titta på skärmen.",
      sections: [
        {
          id: "program",
          title: "Tabata, HIIT och EMOM",
          paragraphs: [
            "Tabata är 20 sekunders maximal ansträngning följt av 10 sekunders vila, åtta gånger – totalt fyra minuter. HIIT (högintensiv intervallträning) varierar längden, till exempel 30/30 eller 40/20. Vid EMOM (every minute on the minute) gör du en övning i början av varje minut och vilar resten av minuten.",
          ],
        },
      ],
      faq: [
        { question: "Hur länge varar ett Tabata-pass?", answer: "Åtta varv på 20 sekunders arbete och 10 sekunders vila tar 4 minuter, plus 10 sekunders förberedelse." },
        { question: "Kan jag göra ett eget program?", answer: "Ja, ställ in förberedelse, arbete, vila och antal varv under ”Eget program”." },
        { question: "Fungerar röstsignalerna på mobilen?", answer: "De flesta mobila webbläsare har inbyggd talsyntes. Om rösten inte hörs spelas pipen ändå." },
      ],
    },
    no: {
      path: NORDIC_TIME_PATHS.interval.no,
      crumb: "Intervalltimer",
      metaTitle: "Intervalltimer – Tabata, HIIT og EMOM på nett",
      description: "Gratis intervalltimer for trening: Tabata 20/10, HIIT, EMOM, boksing og planke. Talesignaler, pip de siste sekundene og eget program.",
      h1: "Intervalltimer",
      intro: "Velg et ferdig program som Tabata 20/10 eller HIIT, eller still inn egne tider for arbeid, hvile og antall runder. Talesignaler og pip hjelper deg å holde takten uten å se på skjermen.",
      sections: [
        {
          id: "program",
          title: "Tabata, HIIT og EMOM",
          paragraphs: [
            "Tabata er 20 sekunder maksimal innsats etterfulgt av 10 sekunders hvile, åtte ganger – totalt fire minutter. HIIT (høyintensiv intervalltrening) varierer lengden, for eksempel 30/30 eller 40/20. Ved EMOM (every minute on the minute) gjør du en øvelse i starten av hvert minutt og hviler resten av minuttet.",
          ],
        },
      ],
      faq: [
        { question: "Hvor lang tid tar en Tabata-økt?", answer: "Åtte runder med 20 sekunders arbeid og 10 sekunders hvile tar 4 minutter, pluss 10 sekunders forberedelse." },
        { question: "Kan jeg lage mitt eget program?", answer: "Ja, still inn forberedelse, arbeid, hvile og antall runder under «Eget program»." },
        { question: "Fungerer talesignalene på mobilen?", answer: "De fleste mobilnettlesere har innebygd talesyntese. Hvis stemmen ikke høres, spilles pipene likevel." },
      ],
    },
    da: {
      path: NORDIC_TIME_PATHS.interval.da,
      crumb: "Intervaltimer",
      metaTitle: "Intervaltimer – Tabata, HIIT og EMOM online",
      description: "Gratis intervaltimer til træning: Tabata 20/10, HIIT, EMOM, boksning og planke. Talesignaler, bip de sidste sekunder og eget program.",
      h1: "Intervaltimer",
      intro: "Vælg et færdigt program som Tabata 20/10 eller HIIT, eller indstil egne tider for arbejde, hvile og antal runder. Talesignaler og bip hjælper dig med at holde tempoet uden at kigge på skærmen.",
      sections: [
        {
          id: "program",
          title: "Tabata, HIIT og EMOM",
          paragraphs: [
            "Tabata er 20 sekunders maksimal indsats efterfulgt af 10 sekunders hvile, otte gange – i alt fire minutter. HIIT (højintensiv intervaltræning) varierer længden, for eksempel 30/30 eller 40/20. Ved EMOM (every minute on the minute) laver du en øvelse i starten af hvert minut og hviler resten af minuttet.",
          ],
        },
      ],
      faq: [
        { question: "Hvor lang tid tager et Tabata-pas?", answer: "Otte runder med 20 sekunders arbejde og 10 sekunders hvile tager 4 minutter plus 10 sekunders forberedelse." },
        { question: "Kan jeg lave mit eget program?", answer: "Ja, indstil forberedelse, arbejde, hvile og antal runder under »Eget program«." },
        { question: "Virker talesignalerne på mobilen?", answer: "De fleste mobilbrowsere har indbygget talesyntese. Hvis stemmen ikke høres, afspilles bippene stadig." },
      ],
    },
  },
};
