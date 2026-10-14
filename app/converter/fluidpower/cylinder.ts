// Hidrolik ve pnömatik silindir hesapları. Basınç bar (gösterge), çaplar mm, debi L/dk.

export const BAR = 1e5; // Pa
/** Standart atmosfer basıncı (bar, mutlak). */
export const P_ATM_BAR = 1.01325;

/** Piston tarafı (itme) alanı mm². */
export const pistonArea = (boreMm: number) => (Math.PI / 4) * boreMm * boreMm;
/** Rot tarafı (çekme) halka alanı mm². */
export const annulusArea = (boreMm: number, rodMm: number) => (Math.PI / 4) * (boreMm * boreMm - rodMm * rodMm);

/** Teorik kuvvet (N): F = p · A. p bar, A mm² → 1 bar · 1 mm² = 0,1 N. */
export const cylinderForce = (pressureBar: number, areaMm2: number, efficiency = 1) => pressureBar * 0.1 * areaMm2 * efficiency;

/** Gereken basınç (bar) = F / A. */
export const requiredPressure = (forceN: number, areaMm2: number) => forceN / (areaMm2 * 0.1);

/** Piston hızı (m/s): v = Q / A. Q L/dk, A mm². */
export const pistonSpeed = (flowLpm: number, areaMm2: number) => (flowLpm / 1000 / 60) / (areaMm2 * 1e-6);

/** İstenen hız için gereken debi (L/dk). */
export const requiredFlow = (speedMs: number, areaMm2: number) => speedMs * areaMm2 * 1e-6 * 60 * 1000;

/** Bir strokta süpürülen hacim (L). Strok mm. */
export const strokeVolume = (areaMm2: number, strokeMm: number) => (areaMm2 * strokeMm) / 1e6;

/**
 * Pnömatik silindir serbest hava tüketimi (normal litre). Silindir hacmi mutlak basınç oranıyla
 * atmosfer koşuluna indirgenir: V_serbest = V · (p_gösterge + p_atm) / p_atm.
 */
export const freeAirVolume = (cylinderVolumeL: number, gaugeBar: number) => (cylinderVolumeL * (gaugeBar + P_ATM_BAR)) / P_ATM_BAR;

/** ISO 3320 hidrolik silindir piston çapları (mm). */
export const HYDRAULIC_BORES = [25, 32, 40, 50, 63, 80, 100, 125, 160, 200, 250, 320];
/** ISO 15552 / ISO 6432 pnömatik silindir piston çapları (mm). */
export const PNEUMATIC_BORES = [8, 10, 12, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200];
