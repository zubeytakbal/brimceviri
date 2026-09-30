import { createHash, randomBytes } from "node:crypto";
import { describe, expect, it } from "vitest";
import {
  altAglar,
  hosttanOnek,
  ipv4Ayristir,
  ipv4Bicimler,
  ipv4Hesapla,
  ipv6Ayristir,
  ipv6Hesapla,
  ipv6Kisa,
  ipv6Sayi,
  maskeOnek,
} from "../app/converter/ag/ip";
import {
  Crc32,
  Md5,
  Sha1,
  Sha256,
  algTahmin,
  hexYaz,
  ozetAl,
  ozetNormal,
} from "../app/converter/ag/hash";
import { macCoz, macTemizle, rastgeleMac } from "../app/converter/ag/mac";
import {
  gerekenHiz,
  indirmeSuresi,
  sureMetni,
} from "../app/converter/ag/indirme";
import { PORTLAR, portAra, portAraligi } from "../app/converter/ag/portlar";
import { crc32 } from "../app/converter/gorsel/zip";

describe("IPv4", () => {
  it("CIDR hesabı", () => {
    const g = ipv4Ayristir("192.168.1.130/26")!;
    expect(ipv4Hesapla(g.adres, g.onek)).toMatchObject({
      maske: "255.255.255.192",
      wildcard: "0.0.0.63",
      ag: "192.168.1.128",
      yayin: "192.168.1.191",
      ilk: "192.168.1.129",
      son: "192.168.1.190",
      toplam: 64,
      kullanilabilir: 62,
      sinif: "C",
      tur: "Özel ağ (RFC 1918)",
    });
  });
  it("maske yazımı, /31 ve /32, /0", () => {
    expect(ipv4Ayristir("10.1.2.3 255.255.0.0")).toEqual({
      adres: 167838211,
      onek: 16,
    });
    expect(maskeOnek("255.0.255.0")).toBeNull();
    expect(ipv4Hesapla(ipv4Ayristir("10.0.0.0/31")!.adres, 31)).toMatchObject({
      kullanilabilir: 2,
      ilk: "10.0.0.0",
      son: "10.0.0.1",
    });
    expect(ipv4Hesapla(ipv4Ayristir("8.8.8.8")!.adres, 32)).toMatchObject({
      kullanilabilir: 1,
      tur: expect.stringMatching(/Genel/),
    });
    expect(ipv4Hesapla(0, 0)).toMatchObject({
      toplam: 4294967296,
      yayin: "255.255.255.255",
    });
    expect(ipv4Ayristir("256.1.1.1")).toBeNull();
    expect(ipv4Ayristir("1.2.3.4/33")).toBeNull();
  });
  it("özel bloklar", () => {
    const t = (s: string) => ipv4Hesapla(ipv4Ayristir(s)!.adres, 32).tur;
    expect(t("100.72.1.1")).toMatch(/CGNAT/);
    expect(t("169.254.3.3")).toMatch(/APIPA/);
    expect(t("172.31.255.255")).toMatch(/RFC 1918/);
    expect(t("172.32.0.1")).toMatch(/Genel/);
    expect(t("255.255.255.255")).toMatch(/Sınırlı yayın/);
    expect(t("239.1.1.1")).toMatch(/multicast/);
  });
  it("alt ağlara bölme ve host sayısı", () => {
    const g = ipv4Ayristir("10.0.0.0/24")!;
    const r = altAglar(g.adres, g.onek, 26);
    expect(r.toplam).toBe(4);
    expect(r.liste.map((x) => `${x.ag}-${x.yayin}`)).toEqual([
      "10.0.0.0-10.0.0.63",
      "10.0.0.64-10.0.0.127",
      "10.0.0.128-10.0.0.191",
      "10.0.0.192-10.0.0.255",
    ]);
    expect(hosttanOnek(50)).toBe(26);
    expect(hosttanOnek(62)).toBe(26);
    expect(hosttanOnek(63)).toBe(25);
    expect(hosttanOnek(2)).toBe(31);
  });
  it("biçim dönüştürme", () => {
    expect(ipv4Bicimler("192.168.1.1")).toMatchObject({
      ondalik: "3232235777",
      onaltili: "0xC0A80101",
      ikili: "11000000.10101000.00000001.00000001",
      ptr: "1.1.168.192.in-addr.arpa",
      ipv6Esleme: "::ffff:192.168.1.1",
    });
    expect(ipv4Bicimler("3232235777")?.noktali).toBe("192.168.1.1");
    expect(ipv4Bicimler("0xC0A80101")?.noktali).toBe("192.168.1.1");
    expect(ipv4Bicimler("11000000101010000000000100000001")?.noktali).toBe(
      "192.168.1.1",
    );
    expect(ipv4Bicimler("4294967296")).toBeNull();
  });
});

describe("IPv6", () => {
  it("kısaltma RFC 5952", () => {
    const k = (s: string) => ipv6Kisa(ipv6Sayi(s)!);
    expect(k("2001:0db8:0000:0000:0000:ff00:0042:8329")).toBe(
      "2001:db8::ff00:42:8329",
    );
    expect(k("2001:db8:0:0:1:0:0:1")).toBe("2001:db8::1:0:0:1");
    expect(k("2001:db8:0:1:1:1:1:1")).toBe("2001:db8:0:1:1:1:1:1");
    expect(k("::")).toBe("::");
    expect(k("::1")).toBe("::1");
    expect(k("fe80::1%eth0")).toBe("fe80::1");
    expect(k("::ffff:192.0.2.1")).toBe("::ffff:c000:201");
    expect(ipv6Sayi("1::2::3")).toBeNull();
    expect(ipv6Sayi("12345::")).toBeNull();
    expect(ipv6Sayi("1:2:3:4:5:6:7:8:9")).toBeNull();
  });
  it("önek hesabı ve tür", () => {
    const g = ipv6Ayristir("2001:db8:abcd:12::1/48")!;
    const r = ipv6Hesapla(g.adres, g.onek);
    expect(r).toMatchObject({
      ag: "2001:db8:abcd::/48",
      ilk: "2001:db8:abcd::",
      son: "2001:db8:abcd:ffff:ffff:ffff:ffff:ffff",
      toplam: "2^80",
      altAg64: "65.536",
      tur: "Belgeleme",
    });
    expect(r.acik).toBe("2001:0db8:abcd:0012:0000:0000:0000:0001");
    expect(r.ptr.startsWith("1.0.0.0.")).toBe(true);
    expect(ipv6Hesapla(ipv6Sayi("fd12::1")!, 128).tur).toMatch(/ULA/);
    expect(ipv6Hesapla(ipv6Sayi("2a00:1450::1")!, 128).tur).toMatch(/global/);
    expect(ipv6Hesapla(ipv6Sayi("fe80::1")!, 64).toplam).toBe(
      "18.446.744.073.709.551.616",
    );
  });
});

describe("hash", () => {
  const enc = new TextEncoder();
  it("bilinen test vektörleri", async () => {
    expect(hexYaz(await ozetAl("MD5", enc.encode("")))).toBe(
      "d41d8cd98f00b204e9800998ecf8427e",
    );
    expect(hexYaz(await ozetAl("MD5", enc.encode("abc")))).toBe(
      "900150983cd24fb0d6963f7d28e17f72",
    );
    expect(hexYaz(await ozetAl("SHA-1", enc.encode("abc")))).toBe(
      "a9993e364706816aba3e25717850c26c9cd0d89d",
    );
    expect(hexYaz(await ozetAl("SHA-256", enc.encode("abc")))).toBe(
      "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad",
    );
    expect(hexYaz(await ozetAl("CRC32", enc.encode("123456789")))).toBe(
      "cbf43926",
    );
  });
  it("rastgele veride Node crypto ile aynı, parça parça", async () => {
    for (const boy of [0, 1, 55, 56, 63, 64, 65, 119, 120, 1000, 70000]) {
      const v = new Uint8Array(randomBytes(boy));
      for (const [ad, S] of [
        ["md5", Md5],
        ["sha1", Sha1],
        ["sha256", Sha256],
      ] as const) {
        const o = new S();
        // düzensiz parçalar
        for (let i = 0; i < v.length; ) {
          const n = 1 + ((i * 7) % 97);
          o.guncelle(v.subarray(i, i + n));
          i += n;
        }
        expect(hexYaz(o.bitir())).toBe(createHash(ad).update(v).digest("hex"));
      }
      const c = new Crc32();
      c.guncelle(v.subarray(0, 10));
      c.guncelle(v.subarray(10));
      expect(parseInt(hexYaz(c.bitir()), 16)).toBe(crc32(v));
      expect(hexYaz(await ozetAl("SHA-512", v))).toBe(
        createHash("sha512").update(v).digest("hex"),
      );
    }
  });
  it("karşılaştırma yardımcıları", () => {
    expect(ozetNormal("  SHA256: BA78 16BF ")).toBe("ba7816bf");
    expect(algTahmin("d41d8cd98f00b204e9800998ecf8427e")).toBe("MD5");
    expect(algTahmin("x".repeat(64))).toBeNull();
    expect(algTahmin("a".repeat(64))).toBe("SHA-256");
  });
});

describe("MAC", () => {
  it("biçimler ve bitler", () => {
    const m = macCoz("00-1A-2b-3C-4d-5E")!;
    expect(m.bicimler[0][1]).toBe("00:1A:2B:3C:4D:5E");
    expect(m.bicimler[2][1]).toBe("001a.2b3c.4d5e");
    expect(m).toMatchObject({
      cokluYayin: false,
      yerel: false,
      oui: "00:1A:2B",
    });
    expect(m.eui64).toBe("021a:2bff:fe3c:4d5e");
    expect(m.linkLocal).toBe("fe80::21a:2bff:fe3c:4d5e");
    expect(macCoz("01:00:5e:00:00:01")!.cokluYayin).toBe(true);
    expect(macCoz("ff:ff:ff:ff:ff:ff")!.yayin).toBe(true);
    expect(macTemizle("001a.2b3c.4d5e")).toBe("001a2b3c4d5e");
    expect(macTemizle("00:1a:2b:3c:4d")).toBeNull();
    expect(macTemizle("00:1a-2b:3c:4d:5e")).toBeNull();
  });
  it("rastgele MAC yerel ve tek noktaya yayın", () => {
    for (let i = 0; i < 50; i++) {
      const m = macCoz(rastgeleMac())!;
      expect(m.yerel).toBe(true);
      expect(m.cokluYayin).toBe(false);
    }
  });
});

describe("indirme", () => {
  it("süre ve gereken hız", () => {
    expect(indirmeSuresi(1, "GB", 100, "Mbps")).toBe(80);
    expect(indirmeSuresi(1, "GiB", 100, "Mbps")).toBeCloseTo(85.899, 2);
    expect(indirmeSuresi(100, "MB", 10, "MB/s")).toBe(10);
    expect(indirmeSuresi(1, "GB", 100, "Mbps", 0.8)).toBe(100);
    expect(indirmeSuresi(0, "GB", 100, "Mbps")).toBeNull();
    expect(gerekenHiz(1, "GB", 80)).toBe(100);
    expect(sureMetni(3725)).toBe("1 sa 2 dk 5 sn");
    expect(sureMetni(90000)).toBe("1 gün 1 sa");
  });
});

describe("portlar", () => {
  it("arama ve aralık", () => {
    expect(portAra("3389")[0].ad).toMatch(/RDP/);
    expect(portAra("6885")[0].ad).toBe("BitTorrent");
    expect(portAra("443").length).toBe(2);
    expect(portAra("minecraft").length).toBe(2);
    expect(portAraligi(80)).toMatch(/Sistem/);
    expect(portAraligi(8080)).toMatch(/Kayıtlı/);
    expect(portAraligi(50000)).toMatch(/Dinamik/);
    // aynı numara+protokol iki kez olmasın
    const anahtar = PORTLAR.map((p) => `${p.no}/${p.protokol}`);
    expect(new Set(anahtar).size).toBe(anahtar.length);
  });
});

import { uaCoz } from "../app/converter/ag/ua";
describe("user agent", () => {
  it("yaygın tarayıcılar", () => {
    expect(
      uaCoz(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36 Edg/140.0.0.0",
      ),
    ).toEqual({
      tarayici: "Microsoft Edge",
      surum: "140.0.0.0",
      isletim: "Windows 10 veya 11",
      cihaz: "Masaüstü",
    });
    expect(
      uaCoz(
        "Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1",
      ),
    ).toEqual({
      tarayici: "Safari",
      surum: "18.5",
      isletim: "iOS 18.5",
      cihaz: "Mobil",
    });
    expect(
      uaCoz(
        "Mozilla/5.0 (Linux; Android 14; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/25.0 Chrome/121.0.0.0 Mobile Safari/537.36",
      ),
    ).toMatchObject({
      tarayici: "Samsung Internet",
      isletim: "Android 14",
      cihaz: "Mobil",
    });
    expect(
      uaCoz(
        "Mozilla/5.0 (X11; Linux x86_64; rv:130.0) Gecko/20100101 Firefox/130.0",
      ),
    ).toMatchObject({ tarayici: "Firefox", isletim: "Linux" });
    expect(
      uaCoz(
        "Mozilla/5.0 (Linux; Android 13; SM-X700) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
      ).cihaz,
    ).toBe("Tablet");
  });
});
