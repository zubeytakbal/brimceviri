export type AttendanceMode = "gun" | "yuzde";

export interface AttendanceInput {
  mode: AttendanceMode;
  // gun modu (okul: ilkokul/ortaokul/lise)
  totalSchoolDays: number;
  allowedAbsenceDays: number;
  usedAbsenceDays: number;
  // yuzde modu (universite/kurs)
  totalClassHours: number;
  allowedAbsencePercent: number;
  usedAbsenceHours: number;
}

export interface AttendanceResult {
  mode: AttendanceMode;
  allowedTotal: number;
  used: number;
  remaining: number;
  usedPercent: number;
  isOverLimit: boolean;
  unitLabel: "gün" | "saat";
}

export type AttendanceOutcome =
  | { success: true; result: AttendanceResult }
  | { success: false; message: string };

export function calculateAttendance(input: AttendanceInput): AttendanceOutcome {
  if (input.mode === "gun") {
    const { totalSchoolDays, allowedAbsenceDays, usedAbsenceDays } = input;

    if (!(totalSchoolDays > 0)) {
      return { success: false, message: "Toplam eğitim günü 0'dan büyük olmalı." };
    }
    if (!(allowedAbsenceDays >= 0)) {
      return { success: false, message: "İzin verilen devamsızlık günü 0 veya daha büyük olmalı." };
    }
    if (!(usedAbsenceDays >= 0)) {
      return { success: false, message: "Kullanılan devamsızlık günü 0 veya daha büyük olmalı." };
    }

    const remaining = allowedAbsenceDays - usedAbsenceDays;
    const usedPercent = (usedAbsenceDays / totalSchoolDays) * 100;

    return {
      success: true,
      result: {
        mode: "gun",
        allowedTotal: allowedAbsenceDays,
        used: usedAbsenceDays,
        remaining,
        usedPercent,
        isOverLimit: remaining < 0,
        unitLabel: "gün",
      },
    };
  }

  const { totalClassHours, allowedAbsencePercent, usedAbsenceHours } = input;

  if (!(totalClassHours > 0)) {
    return { success: false, message: "Toplam ders saati 0'dan büyük olmalı." };
  }
  if (!(allowedAbsencePercent >= 0) || allowedAbsencePercent > 100) {
    return { success: false, message: "İzin verilen devamsızlık yüzdesi 0-100 arasında olmalı." };
  }
  if (!(usedAbsenceHours >= 0)) {
    return { success: false, message: "Kullanılan devamsızlık saati 0 veya daha büyük olmalı." };
  }

  const allowedTotal = (totalClassHours * allowedAbsencePercent) / 100;
  const remaining = allowedTotal - usedAbsenceHours;
  const usedPercent = (usedAbsenceHours / totalClassHours) * 100;

  return {
    success: true,
    result: {
      mode: "yuzde",
      allowedTotal,
      used: usedAbsenceHours,
      remaining,
      usedPercent,
      isOverLimit: remaining < 0,
      unitLabel: "saat",
    },
  };
}
