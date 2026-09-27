// CGPA -> yuzde donusumu: yalnizca resmi kaynagi dogrulanmis kurumlar.
// Her kayit sayfa + hesaplayici + gece kaynak takibi (kaynak-kontrol cron)
// icin tek veri kaynagidir. Formul "yuzde = (CGPA - offset) x multiplier".
//
// Yeni kurum eklemek: resmi belgeyi dogrula, bir kayit ekle, verifiedOn'u
// yaz. Takip edilen kaynak degisirse cron "changed" isaretler; formul
// yeniden dogrulaninca verifiedOn guncellenir ve uyari kalkar.

export type CgpaUniversity = {
  slug: string;
  name: string;
  shortName: string;
  location: string;
  multiplier: number;
  offset: number;
  scale: number;
  // Formulun gecerli oldugu program/yonetmelik kapsami (sayfada aynen gosterilir).
  scope: string;
  sourceTitle: string;
  sourceUrl: string;
  // Formulun resmi kaynaktan en son dogrulandigi tarih (YYYY-MM-DD).
  verifiedOn: string;
  notes?: string[];
};

export const cgpaUniversities: CgpaUniversity[] = [
  {
    slug: "vtu",
    name: "Visvesvaraya Technological University",
    shortName: "VTU",
    location: "Belagavi, Karnataka",
    multiplier: 10,
    offset: 0.75,
    scale: 10,
    scope: "B.E./B.Tech and other programmes under the 2015, 2017 and 2018 CBCS schemes",
    sourceTitle: "VTU – CGPA Standard Formula",
    sourceUrl: "https://vtu.ac.in/en/cgpa-standard-formula/",
    verifiedOn: "2026-09-27",
    notes: ["Because of the 0.75 offset, a VTU CGPA of 8.0 is 72.5%, not 80%."],
  },
  {
    slug: "anna-university",
    name: "Anna University",
    shortName: "Anna University",
    location: "Chennai, Tamil Nadu",
    multiplier: 10,
    offset: 0,
    scale: 10,
    scope: "All UG and PG programmes under Regulations R-2015, R-2018 and R-2019",
    sourceTitle: "Anna University ACOE – CGPA to Percentage Conversion",
    sourceUrl: "https://acoe.annauniv.edu/download_forms/student_forms/CGPA_TO_PERCENTAGE_CONVERSION.pdf",
    verifiedOn: "2026-09-27",
    notes: ["Anna University also issues an official CGPA-to-percentage conversion certificate on application to the ACOE."],
  },
  {
    slug: "jntuh",
    name: "Jawaharlal Nehru Technological University Hyderabad",
    shortName: "JNTUH",
    location: "Hyderabad, Telangana",
    multiplier: 10,
    offset: 0.5,
    scale: 10,
    scope: "B.Tech academic regulations (R16 and later)",
    sourceTitle: "JNTUH – R16 B.Tech Academic Regulations",
    sourceUrl:
      "https://jntuh.ac.in/uploads/academics/R16B.Tech.AcademicRegulationsIncludingTransitoryRegulationswithClarificationonEvaluationforMandatoryCourses.pdf",
    verifiedOn: "2026-09-27",
  },
  {
    slug: "gtu",
    name: "Gujarat Technological University",
    shortName: "GTU",
    location: "Ahmedabad, Gujarat",
    multiplier: 10,
    offset: 0.5,
    scale: 10,
    scope: "CPI/CGPA of all courses (Notification 1/2012)",
    sourceTitle: "GTU Notification 1/2012 – CPI/CGPA equivalent percentage",
    sourceUrl: "https://gtu.ac.in/circulars/12APR/Notifi_All_Courses.pdf",
    verifiedOn: "2026-09-27",
    notes: ["GTU classes: 5.5 and above second class, 6.5 and above first class, 7.1 and above first class with distinction."],
  },
  {
    slug: "makaut",
    name: "Maulana Abul Kalam Azad University of Technology",
    shortName: "MAKAUT",
    location: "West Bengal",
    multiplier: 10,
    offset: 0.75,
    scale: 10,
    scope: "Grade point to percentage (MAKAUT announcement)",
    sourceTitle: "MAKAUT – How to Calculate Percentage from Your Grade Point",
    sourceUrl: "https://makautwb.ac.in/announcement/Process_to_Calculate_Percentage_From_Grade_Point.pdf",
    verifiedOn: "2026-09-27",
    notes: ["The official table maps 6.25 to 55%, 7.25 to 65% and 8.25 to 75%, which is the same as (CGPA − 0.75) × 10."],
  },
  {
    slug: "delhi-university",
    name: "University of Delhi",
    shortName: "Delhi University",
    location: "New Delhi",
    multiplier: 9.5,
    offset: 0,
    scale: 10,
    scope: "Programmes under the Choice Based Credit System (CBCS)",
    sourceTitle: "University of Delhi – CGPA to percentage (CBCS)",
    sourceUrl: "https://exam.du.ac.in/old/pdf/11012018/11012018_CGPA.pdf",
    verifiedOn: "2026-09-27",
  },
  {
    slug: "sppu",
    name: "Savitribai Phule Pune University",
    shortName: "SPPU",
    location: "Pune, Maharashtra",
    multiplier: 8.9,
    offset: 0,
    scale: 10,
    scope: "UG degrees of all faculties under the 2019 pattern (Circular No. 332 of 2020)",
    sourceTitle: "SPPU – Conversion from CGPA to percentage",
    sourceUrl: "https://exam.unipune.ac.in/Docs/marksheet/Conversion%20Formula_22082022.pdf",
    verifiedOn: "2026-09-27",
    notes: ["Older SPPU patterns used different rules; check the pattern printed on your marksheet."],
  },
  {
    slug: "rgpv",
    name: "Rajiv Gandhi Proudyogiki Vishwavidyalaya",
    shortName: "RGPV",
    location: "Bhopal, Madhya Pradesh",
    multiplier: 10,
    offset: 0,
    scale: 10,
    scope: "As stated in the RGPV ordinance",
    sourceTitle: "RGPV ordinance",
    sourceUrl: "https://www.rgpv.ac.in/campus/ord_ddipg1415.pdf",
    verifiedOn: "2026-09-27",
  },
  {
    slug: "ggsipu",
    name: "Guru Gobind Singh Indraprastha University",
    shortName: "GGSIPU",
    location: "New Delhi",
    multiplier: 10,
    offset: 0,
    scale: 10,
    scope: "Final consolidated CGPA (GGSIPU notice on CPI and percentage)",
    sourceTitle: "GGSIPU – Elaboration on CPI and Percentage",
    sourceUrl: "https://ipu.ac.in/Pubinfo2022/nt170123515%20(8).pdf",
    verifiedOn: "2026-09-27",
    notes: ["If your marksheet shows a CPI (Cumulative Performance Index) instead, GGSIPU takes the CPI itself as the percentage."],
  },
  {
    slug: "ikgptu",
    name: "I.K. Gujral Punjab Technical University",
    shortName: "IKGPTU",
    location: "Jalandhar, Punjab",
    multiplier: 10,
    offset: 0,
    scale: 10,
    scope: "All students passing out from the April/May 2020 examination session onwards",
    sourceTitle: "IKGPTU – Implementation of multiplier factor 10 for conversion of CGPA to percentage",
    sourceUrl:
      "https://ptu.ac.in/noticeboard/implementation-of-multiplier-factor-10-for-conversion-of-cgpa-to-percentage-for-all-the-students-of-ik-gujral-punjab-technical-university-from-examination-session-april-may-2020-and-onwards-pass-out/",
    verifiedOn: "2026-09-27",
    notes: ["Before the April/May 2020 session IKGPTU used a multiplier of 9.5. If you passed out earlier, check your conversion certificate."],
  },
  {
    slug: "calicut-university",
    name: "University of Calicut",
    shortName: "Calicut University",
    location: "Kerala",
    multiplier: 10,
    offset: 0,
    scale: 10,
    scope: "As modified by U.O. No. 1685/2024/Admn dated 01.02.2024",
    sourceTitle: "University of Calicut – U.O. No. 1685/2024/Admn",
    sourceUrl: "https://docs.uoc.ac.in/website/syllabus/2024-02-07%2013:50:10_syl1782.pdf",
    verifiedOn: "2026-09-27",
    notes: ["The earlier Calicut formula was (CGPA − 0.5) × 10. It was changed to CGPA × 10 by the 2024 order, so older certificates may show a lower percentage."],
  },
  {
    slug: "andhra-university",
    name: "Andhra University",
    shortName: "Andhra University",
    location: "Visakhapatnam, Andhra Pradesh",
    multiplier: 10,
    offset: 0,
    scale: 10,
    scope: "UG and PG courses under the credit-based grading system (2015-16)",
    sourceTitle: "Andhra University – UG/PG Grading System 2015-16",
    sourceUrl: "https://www.andhrauniversity.edu.in/img/syllabus/UG-PG-Grading-System-2015-16.pdf",
    verifiedOn: "2026-09-27",
  },
  {
    slug: "dbatu",
    name: "Dr. Babasaheb Ambedkar Technological University",
    shortName: "DBATU",
    location: "Lonere, Maharashtra",
    multiplier: 10,
    offset: 0.5,
    scale: 10,
    scope: "Percentage of marks for DBATU students (conversion certificate procedure)",
    sourceTitle: "DBATU – Document Procedure (CGPA to percentage)",
    sourceUrl: "https://dbatu.ac.in/document-procedure/",
    verifiedOn: "2026-09-27",
    notes: ["DBATU also issues a formal conversion certificate through the Controller of Examinations."],
  },
  {
    slug: "manipal",
    name: "Manipal Academy of Higher Education",
    shortName: "Manipal (MAHE)",
    location: "Manipal, Karnataka",
    multiplier: 10,
    offset: 0,
    scale: 10,
    scope: "As stated in MAHE programme regulations (10 CGPA = 100%)",
    sourceTitle: "MAHE – M.Pharm CBCS Regulations",
    sourceUrl:
      "https://www.manipal.edu/content/dam/manipal/mu/mcops-manipal/documents/academics-2023/9%20MPL%20MPharm%20CBCS%20Regulations%202017%201.pdf",
    verifiedOn: "2026-09-27",
    notes: ["Manipal University Jaipur is a separate university and issues its own equivalence certificate."],
  },
  {
    slug: "kerala-university",
    name: "University of Kerala",
    shortName: "Kerala University",
    location: "Thiruvananthapuram, Kerala",
    multiplier: 10,
    offset: 0.25,
    scale: 10,
    scope: "B.Tech academic regulations (equivalent percentage = 10 × CGPA − 2.5)",
    sourceTitle: "University of Kerala – Academic Regulations for B.Tech",
    sourceUrl: "https://www.keralauniversity.ac.in/downloads/asdasd1616837643.pdf",
    verifiedOn: "2026-09-27",
  },
  {
    slug: "dtu",
    name: "Delhi Technological University",
    shortName: "DTU",
    location: "New Delhi",
    multiplier: 10,
    offset: 0,
    scale: 10,
    scope: "CGPA on a 10-point scale (DTU conversion of grade point into percentage of marks)",
    sourceTitle: "DTU – Conversion of Grade Point into Percentage of Marks",
    sourceUrl: "https://pg.dtu.ac.in/mtechmba/cgpa%20conversion.pdf",
    verifiedOn: "2026-09-27",
  },
  {
    slug: "jntua",
    name: "Jawaharlal Nehru Technological University Anantapur",
    shortName: "JNTUA",
    location: "Anantapur, Andhra Pradesh",
    multiplier: 10,
    offset: 0.5,
    scale: 10,
    scope: "B.Tech R23 academic regulations",
    sourceTitle: "JNTUA – B.Tech R23 Regulations",
    sourceUrl: "http://dap.jntua.ac.in/wp-content/uploads/2023/12/JNTUA-UG-Programmes-B.Tech_.-R23-Regulations-31.08.2023.pdf",
    verifiedOn: "2026-09-27",
  },
  {
    slug: "cbse",
    name: "Central Board of Secondary Education",
    shortName: "CBSE",
    location: "India",
    multiplier: 9.5,
    offset: 0,
    scale: 10,
    scope: "Class X CGPA under the CCE scheme (indicative percentage)",
    sourceTitle: "CBSE – CCE certificate (indicative percentage = 9.5 × CGPA)",
    sourceUrl: "https://www.cbse.gov.in/cce/CCE%20Certificate-2009-11-A3%20size%20(Coloured)-13-10-2010.pdf",
    verifiedOn: "2026-09-27",
    notes: ["CBSE now reports marks directly; the 9.5 multiplier applies to the older CGPA-based Class X certificates."],
  },
];

export function findCgpaUniversity(slug: string) {
  return cgpaUniversities.find((university) => university.slug === slug);
}

export function cgpaToPercentage(cgpa: number, university: Pick<CgpaUniversity, "multiplier" | "offset" | "scale">) {
  if (!Number.isFinite(cgpa) || cgpa < 0 || cgpa > university.scale) return null;
  return Math.max(0, (cgpa - university.offset) * university.multiplier);
}

export function percentageToCgpa(percentage: number, university: Pick<CgpaUniversity, "multiplier" | "offset" | "scale">) {
  if (!Number.isFinite(percentage) || percentage < 0 || percentage > 100) return null;
  const cgpa = percentage / university.multiplier + university.offset;
  return cgpa > university.scale ? null : cgpa;
}

export function formulaText(university: Pick<CgpaUniversity, "multiplier" | "offset">) {
  return university.offset
    ? `Percentage = (CGPA − ${university.offset}) × ${university.multiplier}`
    : `Percentage = CGPA × ${university.multiplier}`;
}

// SGPA'lardan kredi agirlikli CGPA.
export function sgpaToCgpa(semesters: Array<{ sgpa: number; credits: number }>) {
  const valid = semesters.filter(
    (semester) => Number.isFinite(semester.sgpa) && Number.isFinite(semester.credits) && semester.credits > 0 && semester.sgpa >= 0
  );
  const totalCredits = valid.reduce((sum, semester) => sum + semester.credits, 0);
  if (totalCredits === 0) return null;
  return valid.reduce((sum, semester) => sum + semester.sgpa * semester.credits, 0) / totalCredits;
}
