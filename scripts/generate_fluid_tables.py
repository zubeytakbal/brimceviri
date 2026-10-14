"""Su, doymuş buhar ve hava özellik tablolarını üretir (geliştirme sırasında bir kez çalıştırılır).

Hesap: CoolProp (su için IAPWS-95, hava için Lemmon ve diğ. 2000 sözde saf akışkan modeli).
Doğrulama: aynı noktalar NIST Chemistry WebBook'tan çekilir; fark %0,1'i aşarsa betik durur.
Çıktı: app/converter/thermal/fluidTables.ts (elle düzenlenmez).

Kullanım: python3 scripts/generate_fluid_tables.py  (pip install CoolProp)
"""
import json
import urllib.parse
import urllib.request

from CoolProp.CoolProp import PropsSI

P0 = 101325.0


def sig(x, n=6):
    """Anlamlı basamakla yuvarlar; küçük değerlerde hassasiyet kaybolmaz."""
    return float(f"{x:.{n}g}")
OUT = "app/converter/thermal/fluidTables.ts"


def water_1atm(tc):
    """Doymuş sıvı su (her sıcaklıkta sıvı fazı garanti eder; sıvıda basınç etkisi binde birin altında)."""
    T = tc + 273.15
    g = lambda k: PropsSI(k, "T", T, "Q", 0, "Water")
    rho = g("D")
    mu = g("V")
    return {
        "t": tc,
        "rho": round(rho, 3),
        "mu": round(mu * 1e6, 2),  # µPa·s = 1e-6 Pa·s
        "nu": round(mu / rho * 1e6, 4),  # mm²/s
        "cp": round(g("C") / 1000, 4),
        "k": round(g("L"), 4),
        "pr": round(g("Prandtl"), 3),
        "psat": sig(g("P") / 1000),  # kPa
    }


def sat_row(T=None, P=None):
    if T is None:
        T = PropsSI("T", "P", P, "Q", 0, "Water")
    if P is None:
        P = PropsSI("P", "T", T, "Q", 0, "Water")
    f = lambda k, q: PropsSI(k, "T", T, "Q", q, "Water")
    hf, hg = f("H", 0) / 1000, f("H", 1) / 1000
    return {
        "t": round(T - 273.15, 3),
        "p": sig(P / 1e5),
        "vf": sig(1 / f("D", 0)),
        "vg": sig(1 / f("D", 1)),
        "hf": round(hf, 2),
        "hfg": round(hg - hf, 2),
        "hg": round(hg, 2),
        "sf": round(f("S", 0) / 1000, 4),
        "sg": round(f("S", 1) / 1000, 4),
    }


def air_1atm(tc):
    T = tc + 273.15
    rho = PropsSI("D", "T", T, "P", P0, "Air")
    mu = PropsSI("V", "T", T, "P", P0, "Air")
    return {
        "t": tc,
        "rho": round(rho, 4),
        "mu": round(mu * 1e6, 3),
        "nu": round(mu / rho * 1e6, 3),
        "cp": round(PropsSI("C", "T", T, "P", P0, "Air") / 1000, 4),
        "k": round(PropsSI("L", "T", T, "P", P0, "Air"), 5),
        "pr": round(PropsSI("Prandtl", "T", T, "P", P0, "Air"), 4),
    }


def nist(params):
    base = "https://webbook.nist.gov/cgi/fluid.cgi?"
    q = {"Action": "Data", "Wide": "on", "Digits": "8", "RefState": "DEF", "TUnit": "C", "PUnit": "Pa", "DUnit": "kg/m3", "HUnit": "kJ/kg", "WUnit": "m/s", "VisUnit": "Pa*s", "STUnit": "N/m"}
    q.update(params)
    req = urllib.request.Request(base + urllib.parse.urlencode(q), headers={"User-Agent": "Mozilla/5.0"})
    txt = urllib.request.urlopen(req, timeout=60).read().decode()
    lines = [l.split("\t") for l in txt.strip().split("\n")]
    head = lines[0]
    return [dict(zip(head, l)) for l in lines[1:]]


def check(name, ours, ref, tol=1e-3, abs_tol=0.0):
    # Sıfıra yakın değerlerde (ör. 0,01 °C'de sıvı entalpisi) yuvarlama payı kadar mutlak tolerans tanınır.
    if abs(ours - ref) <= abs_tol:
        return 0.0
    err = abs(ours / ref - 1)
    if err > tol:
        raise SystemExit(f"NIST farkı çok büyük: {name}: CoolProp {ours} / NIST {ref} ({err:.2%})")
    return err


def verify():
    worst = 0.0
    # Su, 1 atm, izobar
    for row in nist({"ID": "C7732185", "Type": "IsoBar", "P": str(P0), "TLow": "5", "THigh": "95", "TInc": "15"}):
        tc = float(row["Temperature (C)"])
        w = water_1atm(tc)
        worst = max(worst, check(f"su ρ {tc}", w["rho"], float(row["Density (kg/m3)"])))
        worst = max(worst, check(f"su cp {tc}", w["cp"], float(row["Cp (J/g*K)"])))
        worst = max(worst, check(f"su μ {tc}", w["mu"] / 1e6, float(row["Viscosity (Pa*s)"])))
        worst = max(worst, check(f"su k {tc}", w["k"], float(row["Therm. Cond. (W/m*K)"])))
    # Doymuş buhar, sıcaklığa göre
    for row in nist({"ID": "C7732185", "Type": "SatT", "TLow": "20", "THigh": "340", "TInc": "40"}):
        tc = float(row["Temperature (C)"])
        if tc > 373.9:  # kritik nokta; doyma hesabı orada tanımsız
            continue
        s = sat_row(T=tc + 273.15)
        worst = max(worst, check(f"buhar p {tc}", s["p"] * 1e5, float(row["Pressure (Pa)"])))
        worst = max(worst, check(f"buhar hg {tc}", s["hg"], float(row["Enthalpy (v, kJ/kg)"])))
        worst = max(worst, check(f"buhar hf {tc}", s["hf"], float(row["Enthalpy (l, kJ/kg)"]), abs_tol=0.01))
        worst = max(worst, check(f"buhar vg {tc}", s["vg"], 1 / float(row["Density (v, kg/m3)"])))
    # Hava (NIST'te kuru hava yok; azot ve oksijen yerine hava için kendi tutarlılık kontrolü: ideal gaz yoğunluğu)
    for tc in (-40, 0, 20, 100, 200):
        a = air_1atm(tc)
        ideal = P0 / (287.05 * (tc + 273.15))
        worst = max(worst, check(f"hava ρ (ideal gaz) {tc}", a["rho"], ideal, tol=3e-3))
    return worst


def main():
    worst = verify()
    print(f"NIST karşılaştırması geçti; en büyük fark %{worst * 100:.4f}")
    water = [water_1atm(0.01)] + [water_1atm(t) for t in range(1, 101)]
    sat_t = [sat_row(T=0.01 + 273.15)] + [sat_row(T=t + 273.15) for t in list(range(5, 100, 5)) + list(range(100, 340, 10)) + list(range(340, 374, 2))]
    pressures = [0.01, 0.02, 0.05, 0.1, 0.2, 0.3, 0.5, 0.75, 1, 1.01325, 1.5, 2, 2.5, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 25, 30, 40, 50, 60, 70, 80, 90, 100, 120, 150, 160, 170, 180, 190, 200, 205, 210, 215, 220]
    sat_p = [sat_row(P=p * 1e5) for p in pressures]
    # Kaynama noktası – basınç ızgarası (kPa)
    boil = [[round(p, 2), round(PropsSI("T", "P", p * 1000, "Q", 0, "Water") - 273.15, 3)] for p in [25 + 0.5 * i for i in range(0, 171)]]
    air = [air_1atm(t) for t in range(-50, 201, 5)]
    body = {
        "WATER_1ATM": water,
        "SAT_STEAM_T": sat_t,
        "SAT_STEAM_P": sat_p,
        "BOILING_KPA": boil,
        "AIR_1ATM": air,
    }
    header = (
        "// Bu dosya scripts/generate_fluid_tables.py ile üretilir; elle düzenlemeyin.\n"
        "// Kaynak: CoolProp (su IAPWS-95, hava Lemmon ve diğ. 2000). NIST Chemistry WebBook ile\n"
        f"// karşılaştırıldı; en büyük fark %{worst * 100:.4f}.\n"
        "// Birimler: t °C; rho kg/m³; mu µPa·s; nu mm²/s; cp kJ/(kg·K); k W/(m·K); psat kPa;\n"
        "// p bar; vf, vg m³/kg; h kJ/kg; s kJ/(kg·K).\n\n"
    )
    types = (
        "export type WaterRow = { t: number; rho: number; mu: number; nu: number; cp: number; k: number; pr: number; psat: number };\n"
        "export type SatRow = { t: number; p: number; vf: number; vg: number; hf: number; hfg: number; hg: number; sf: number; sg: number };\n"
        "export type AirRow = { t: number; rho: number; mu: number; nu: number; cp: number; k: number; pr: number };\n\n"
    )
    decl = {"WATER_1ATM": "WaterRow[]", "SAT_STEAM_T": "SatRow[]", "SAT_STEAM_P": "SatRow[]", "BOILING_KPA": "Array<[number, number]>", "AIR_1ATM": "AirRow[]"}
    parts = [f"export const {k}: {decl[k]} = {json.dumps(v, separators=(',', ':'))};\n" for k, v in body.items()]
    open(OUT, "w", encoding="utf-8").write(header + types + "\n".join(parts))
    print("yazıldı:", OUT)


if __name__ == "__main__":
    main()
