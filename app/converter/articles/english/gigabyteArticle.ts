import type { UnitArticle } from "../../unitArticles";

export const gigabyteArticle: UnitArticle = {
  slug: "gigabyte",

  introduction: [
    "The gigabyte (GB) is one of the commonly used units of digital data, appearing constantly in everyday life — from smartphone storage to external drive capacity. By the SI (International System of Units) definition, 1 gigabyte is exactly equal to 1,000,000,000 (1 billion) bytes.",
    "The gigabyte is also one of the most confusing units in the tech world: how many \"GB\" a device has can produce different numbers depending on which calculation method is used. This page explains both the correct conversion and where this confusion comes from.",
  ],

  keyFacts: [
    {
      label: "Symbol",
      value: "GB",
    },
    {
      label: "1 gigabyte (SI/decimal)",
      value: "1,000,000,000 bytes",
    },
    {
      label: "1 gigabyte (binary/computing standard)",
      value: "1,073,741,824 bytes",
    },
    {
      label: "Unit system",
      value: "International System of Units (SI, multiple unit)",
    },
    {
      label: "1 GB",
      value: "1,000 MB (decimal)",
    },
  ],

  sections: [
    {
      title: "What is a gigabyte?",
      paragraphs: [
        "The gigabyte is a data unit used to express computer memory, storage device and file sizes. The prefix \"giga\" represents a factor of 10⁹ (1 billion) in the SI system, so by the SI definition, 1 gigabyte is exactly 1,000,000,000 bytes.",
        "Today, smartphones, computers, external drives and cloud storage services advertise their capacities in gigabytes. A photo might take up roughly 2-5 MB, while an HD movie can take up roughly 1-4 GB.",
        "The gigabyte's larger multiple, the terabyte (1,000 GB), is another standard unit widely used today in external drives and server storage.",
      ],
    },
    {
      title: "Why is 1 GB sometimes 1,000 MB, and sometimes 1,024 MB?",
      paragraphs: [
        "This is one of the most common points of confusion in the tech world, and it stems from two different numbering systems. In the SI (metric) system, the prefixes \"kilo\", \"mega\" and \"giga\" always mean powers of ten (1,000, 1,000,000, 1,000,000,000) — just like kilogram or kilometer.",
        "Computers, however, operate in binary, and memory addressing naturally proceeds in powers of two. Early computer engineers began using \"kilo\" as a practical approximation for 1,024 (2¹⁰) — a number close to 1,000 that fit binary calculations.",
        "In 1998, the International Electrotechnical Commission (IEC) defined a separate \"binary prefix\" system to resolve this ambiguity: kibi (Ki, 1,024), mebi (Mi, 1,048,576), gibi (Gi, 1,073,741,824). Under this system, a unit of 1,024 bytes should technically be called a \"kibibyte (KiB)\", not a \"kilobyte (KB)\".",
      ],
    },
    {
      title: "Why does Windows show a 1 TB drive as 931 GB?",
      paragraphs: [
        "The answer comes directly from the confusion described above. Drive manufacturers (Seagate, Western Digital, Samsung, and others) calculate capacity in decimal (base-1,000) terms in line with the SI standard — 1 TB is exactly 1,000,000,000,000 bytes.",
        "Windows and most operating systems, however, calculate storage in binary (base-1,024) terms while still labeling it \"GB\" or \"TB\". This is why a 1,000,000,000,000-byte drive appears in Windows as roughly 931 GiB (though the screen still shows \"GB\") — the difference isn't lost storage, just a different counting method.",
        "Tools like Google's own calculator and the Microsoft Windows Calculator app use the current SI standard (base-1,000); the conversions on this page are also calculated according to that standard.",
      ],
    },
    {
      title: "The gigabyte and other data units",
      paragraphs: [
        "1 gigabyte (SI) equals 1,000 megabytes, 1,000,000 kilobytes and 1,000,000,000 bytes. For larger datasets, higher units such as the terabyte (1,000 GB) and petabyte (1,000 TB) are used.",
        "Network speeds (internet connections) are usually measured in bits rather than bytes — for example, megabits per second (Mbps). Since 1 byte equals 8 bits, a 100 Mbps internet connection theoretically corresponds to a download speed of about 12.5 MB per second.",
        "When converting between file size and storage capacity, it is important to always use the same standard (decimal or binary) to avoid miscalculation.",
      ],
    },
  ],

  timeline: [
    {
      year: "1960s",
      title: "The concept of the byte emerges",
      description:
        "IBM engineers began using the term \"byte\" to describe the group of bits needed to represent a character; it eventually standardized at 8 bits.",
    },
    {
      year: "1970s-1980s",
      title: "The binary use of \"kilo\" spreads",
      description:
        "Because of computer memory's binary addressing structure, engineers began using \"kilobyte\" in practice to mean 1,024 bytes.",
    },
    {
      year: "1998",
      title: "The IEC defines binary prefixes",
      description:
        "The International Electrotechnical Commission adopted binary prefixes such as kibi/mebi/gibi as an official standard, aiming to resolve the ambiguity between the SI and binary systems.",
    },
    {
      year: "Post-2000s",
      title: "Drive manufacturers adopt the SI standard",
      description:
        "Hard drive and SSD manufacturers adopted the SI (decimal) standard for capacity claims, which became the source of the visible gap with operating systems' (binary) displays.",
    },
  ],

  questions: [
    {
      question: "How many MB is 1 GB?",
      answer:
        "Under the SI (decimal) standard, 1 GB is exactly 1,000 MB. Under the binary system computers use, 1 GB corresponds to approximately 1,024 MB. This page uses the SI standard (base-1,000).",
    },
    {
      question: "How many GB is 1 MB?",
      answer:
        "1 megabyte equals 0.001 gigabytes (one thousandth). To convert megabytes to gigabytes, divide the value by 1,000.",
    },
    {
      question: "Why does my drive show less space than the label says?",
      answer:
        "Drive manufacturers calculate capacity in base-1,000 (SI) terms, while the operating system (Windows, macOS) calculates storage in base-1,024 (binary) terms and still labels it \"GB\". This is not data loss — just a difference between two counting methods.",
    },
    {
      question: "How many bytes is 1 GB?",
      answer:
        "Under the SI standard, 1 gigabyte is exactly 1,000,000,000 (1 billion) bytes.",
    },
  ],
};
