// Sık kullanılan port numaraları: IANA atamaları ve yaygın varsayılanlar.

export type PortGrubu =
  | "web"
  | "eposta"
  | "uzak"
  | "dosya"
  | "veritabani"
  | "vpn"
  | "altyapi"
  | "medya"
  | "oyun";

export type Port = {
  /** Tek port veya "6881-6889" gibi aralık */
  no: string;
  protokol: "TCP" | "UDP" | "TCP/UDP";
  ad: string;
  aciklama: string;
  grup: PortGrubu;
  /** Resmî IANA ataması değil, yaygın varsayılan */
  gayriResmi?: boolean;
  /** İnternete doğrudan açılmaması gereken hizmetler */
  risk?: string;
};

export const PORT_GRUPLARI: Array<{ id: PortGrubu; ad: string }> = [
  { id: "web", ad: "Web" },
  { id: "eposta", ad: "E-posta" },
  { id: "uzak", ad: "Uzak erişim" },
  { id: "dosya", ad: "Dosya paylaşımı" },
  { id: "veritabani", ad: "Veritabanı" },
  { id: "vpn", ad: "VPN" },
  { id: "altyapi", ad: "Ağ altyapısı" },
  { id: "medya", ad: "Kamera ve medya" },
  { id: "oyun", ad: "Oyun" },
];

const ACMA =
  "İnternete doğrudan açmayın; yalnızca VPN veya güvenlik duvarı arkasından erişin.";

export const PORTLAR: Port[] = [
  {
    no: "20",
    protokol: "TCP",
    ad: "FTP (veri)",
    aciklama: "FTP dosya aktarımının veri kanalı (etkin kip).",
    grup: "dosya",
    risk: "Şifresizdir; yerine SFTP veya FTPS kullanın.",
  },
  {
    no: "21",
    protokol: "TCP",
    ad: "FTP (kontrol)",
    aciklama: "FTP oturum ve komut kanalı.",
    grup: "dosya",
    risk: "Şifresizdir; kullanıcı adı ve parola açık gider.",
  },
  {
    no: "22",
    protokol: "TCP",
    ad: "SSH / SFTP / SCP",
    aciklama: "Şifreli uzak komut satırı ve güvenli dosya aktarımı.",
    grup: "uzak",
  },
  {
    no: "23",
    protokol: "TCP",
    ad: "Telnet",
    aciklama: "Eski, şifresiz uzak komut satırı.",
    grup: "uzak",
    risk: "Şifresizdir; yerine SSH kullanın. " + ACMA,
  },
  {
    no: "25",
    protokol: "TCP",
    ad: "SMTP",
    aciklama:
      "E-posta sunucuları arasında posta aktarımı. Ev bağlantılarında çoğu servis sağlayıcı engeller.",
    grup: "eposta",
  },
  {
    no: "53",
    protokol: "TCP/UDP",
    ad: "DNS",
    aciklama: "Alan adlarını IP adresine çeviren ad sunucusu sorguları.",
    grup: "altyapi",
  },
  {
    no: "67",
    protokol: "UDP",
    ad: "DHCP (sunucu)",
    aciklama: "Cihazlara otomatik IP adresi dağıtan sunucu.",
    grup: "altyapi",
  },
  {
    no: "68",
    protokol: "UDP",
    ad: "DHCP (istemci)",
    aciklama: "IP adresi isteyen cihaz tarafı.",
    grup: "altyapi",
  },
  {
    no: "69",
    protokol: "UDP",
    ad: "TFTP",
    aciklama:
      "Basit dosya aktarımı; ağ açılışı (PXE) ve cihaz yazılımı yüklemede kullanılır.",
    grup: "dosya",
    risk: ACMA,
  },
  {
    no: "80",
    protokol: "TCP",
    ad: "HTTP",
    aciklama: "Şifresiz web trafiği.",
    grup: "web",
  },
  {
    no: "110",
    protokol: "TCP",
    ad: "POP3",
    aciklama: "E-postayı sunucudan indirme (şifresiz).",
    grup: "eposta",
  },
  {
    no: "123",
    protokol: "UDP",
    ad: "NTP",
    aciklama: "Saat eşitleme.",
    grup: "altyapi",
  },
  {
    no: "135",
    protokol: "TCP",
    ad: "Microsoft RPC",
    aciklama: "Windows uzak yordam çağrısı uç nokta eşleyicisi.",
    grup: "altyapi",
    risk: ACMA,
  },
  {
    no: "137-139",
    protokol: "TCP/UDP",
    ad: "NetBIOS",
    aciklama: "Eski Windows ağ adı ve dosya paylaşımı hizmetleri.",
    grup: "dosya",
    risk: ACMA,
  },
  {
    no: "143",
    protokol: "TCP",
    ad: "IMAP",
    aciklama: "E-postayı sunucuda tutarak okuma (şifresiz).",
    grup: "eposta",
  },
  {
    no: "161",
    protokol: "UDP",
    ad: "SNMP",
    aciklama: "Ağ cihazlarını izleme ve yönetme.",
    grup: "altyapi",
    risk: ACMA,
  },
  {
    no: "162",
    protokol: "UDP",
    ad: "SNMP Trap",
    aciklama: "Cihazlardan gelen SNMP uyarıları.",
    grup: "altyapi",
  },
  {
    no: "179",
    protokol: "TCP",
    ad: "BGP",
    aciklama: "İnternet servis sağlayıcıları arasında yönlendirme bilgisi.",
    grup: "altyapi",
  },
  {
    no: "389",
    protokol: "TCP/UDP",
    ad: "LDAP",
    aciklama: "Dizin hizmetleri (ör. Active Directory) sorguları.",
    grup: "altyapi",
    risk: ACMA,
  },
  {
    no: "443",
    protokol: "TCP",
    ad: "HTTPS",
    aciklama: "TLS ile şifrelenmiş web trafiği.",
    grup: "web",
  },
  {
    no: "443",
    protokol: "UDP",
    ad: "HTTP/3 (QUIC)",
    aciklama: "UDP üzerinden çalışan yeni nesil şifreli web trafiği.",
    grup: "web",
  },
  {
    no: "445",
    protokol: "TCP",
    ad: "SMB",
    aciklama: "Windows dosya ve yazıcı paylaşımı.",
    grup: "dosya",
    risk: "Fidye yazılımlarının sık hedefidir. " + ACMA,
  },
  {
    no: "465",
    protokol: "TCP",
    ad: "SMTPS",
    aciklama: "Baştan TLS ile şifreli e-posta gönderimi.",
    grup: "eposta",
  },
  {
    no: "500",
    protokol: "UDP",
    ad: "IKE (IPsec)",
    aciklama: "IPsec VPN anahtar değişimi.",
    grup: "vpn",
  },
  {
    no: "514",
    protokol: "UDP",
    ad: "Syslog",
    aciklama: "Cihaz ve sunucu günlüklerini merkezi sunucuya gönderme.",
    grup: "altyapi",
  },
  {
    no: "554",
    protokol: "TCP/UDP",
    ad: "RTSP",
    aciklama: "IP kameralardan canlı görüntü akışı.",
    grup: "medya",
    risk: "Kameranın parolasını değiştirmeden internete açmayın.",
  },
  {
    no: "587",
    protokol: "TCP",
    ad: "SMTP gönderim",
    aciklama: "E-posta programlarının posta gönderdiği port (STARTTLS).",
    grup: "eposta",
  },
  {
    no: "631",
    protokol: "TCP",
    ad: "IPP",
    aciklama: "Ağ yazıcısına yazdırma (CUPS, AirPrint).",
    grup: "altyapi",
  },
  {
    no: "636",
    protokol: "TCP",
    ad: "LDAPS",
    aciklama: "TLS ile şifreli LDAP.",
    grup: "altyapi",
  },
  {
    no: "853",
    protokol: "TCP",
    ad: "DNS over TLS",
    aciklama: "Şifreli DNS sorguları (Android 'Özel DNS').",
    grup: "altyapi",
  },
  {
    no: "873",
    protokol: "TCP",
    ad: "rsync",
    aciklama: "Dosya eşitleme ve yedekleme.",
    grup: "dosya",
  },
  {
    no: "989-990",
    protokol: "TCP",
    ad: "FTPS",
    aciklama: "TLS ile şifreli FTP.",
    grup: "dosya",
  },
  {
    no: "993",
    protokol: "TCP",
    ad: "IMAPS",
    aciklama: "TLS ile şifreli IMAP.",
    grup: "eposta",
  },
  {
    no: "995",
    protokol: "TCP",
    ad: "POP3S",
    aciklama: "TLS ile şifreli POP3.",
    grup: "eposta",
  },
  {
    no: "1080",
    protokol: "TCP",
    ad: "SOCKS",
    aciklama: "SOCKS vekil sunucu.",
    grup: "vpn",
  },
  {
    no: "1194",
    protokol: "UDP",
    ad: "OpenVPN",
    aciklama: "OpenVPN'in varsayılan portu (TCP ile de kullanılabilir).",
    grup: "vpn",
  },
  {
    no: "1433",
    protokol: "TCP",
    ad: "Microsoft SQL Server",
    aciklama: "SQL Server veritabanı bağlantıları.",
    grup: "veritabani",
    risk: ACMA,
  },
  {
    no: "1521",
    protokol: "TCP",
    ad: "Oracle Database",
    aciklama: "Oracle veritabanı dinleyicisi.",
    grup: "veritabani",
    risk: ACMA,
  },
  {
    no: "1701",
    protokol: "UDP",
    ad: "L2TP",
    aciklama: "L2TP/IPsec VPN tüneli.",
    grup: "vpn",
  },
  {
    no: "1723",
    protokol: "TCP",
    ad: "PPTP",
    aciklama: "Eski PPTP VPN.",
    grup: "vpn",
    risk: "PPTP güvenli kabul edilmez; WireGuard veya OpenVPN kullanın.",
  },
  {
    no: "1812-1813",
    protokol: "UDP",
    ad: "RADIUS",
    aciklama:
      "Kimlik doğrulama (1812) ve hesap tutma (1813); kurumsal Wi-Fi ve VPN girişleri.",
    grup: "altyapi",
  },
  {
    no: "1883",
    protokol: "TCP",
    ad: "MQTT",
    aciklama: "Nesnelerin interneti (IoT) mesajlaşması, şifresiz.",
    grup: "altyapi",
  },
  {
    no: "1900",
    protokol: "UDP",
    ad: "SSDP / UPnP",
    aciklama: "Yerel ağda cihaz keşfi.",
    grup: "altyapi",
    risk: ACMA,
  },
  {
    no: "1935",
    protokol: "TCP",
    ad: "RTMP",
    aciklama:
      "Canlı yayın yazılımlarından (OBS) yayın sunucusuna görüntü gönderme.",
    grup: "medya",
  },
  {
    no: "2049",
    protokol: "TCP/UDP",
    ad: "NFS",
    aciklama: "Unix/Linux ağ dosya sistemi.",
    grup: "dosya",
    risk: ACMA,
  },
  {
    no: "2082-2083",
    protokol: "TCP",
    ad: "cPanel",
    aciklama: "Hosting kontrol paneli (2083 şifreli).",
    grup: "web",
    gayriResmi: true,
  },
  {
    no: "2375-2376",
    protokol: "TCP",
    ad: "Docker API",
    aciklama: "Docker uzak yönetimi (2376 TLS'li).",
    grup: "uzak",
    risk: "Açık Docker API sunucunun tamamen ele geçirilmesi demektir. " + ACMA,
  },
  {
    no: "3000",
    protokol: "TCP",
    ad: "Geliştirme sunucusu",
    aciklama:
      "Node.js, React, Next.js gibi geliştirme sunucularının sık varsayılanı.",
    grup: "web",
    gayriResmi: true,
  },
  {
    no: "3074",
    protokol: "TCP/UDP",
    ad: "Xbox Live",
    aciklama: "Xbox çevrim içi oyun bağlantıları.",
    grup: "oyun",
  },
  {
    no: "3128",
    protokol: "TCP",
    ad: "Squid proxy",
    aciklama: "Squid vekil sunucunun varsayılan portu.",
    grup: "vpn",
    gayriResmi: true,
  },
  {
    no: "3306",
    protokol: "TCP",
    ad: "MySQL / MariaDB",
    aciklama: "MySQL ve MariaDB veritabanı bağlantıları.",
    grup: "veritabani",
    risk: ACMA,
  },
  {
    no: "3389",
    protokol: "TCP/UDP",
    ad: "Uzak Masaüstü (RDP)",
    aciklama: "Windows Uzak Masaüstü bağlantısı.",
    grup: "uzak",
    risk: "Kaba kuvvet saldırılarının en sık hedeflerindendir. " + ACMA,
  },
  {
    no: "3478",
    protokol: "UDP",
    ad: "STUN / TURN",
    aciklama: "Görüntülü görüşme ve WebRTC için NAT geçişi.",
    grup: "medya",
  },
  {
    no: "4500",
    protokol: "UDP",
    ad: "IPsec NAT-T",
    aciklama: "NAT arkasındaki IPsec VPN trafiği.",
    grup: "vpn",
  },
  {
    no: "5000-5001",
    protokol: "TCP",
    ad: "Synology DSM",
    aciklama: "Synology NAS yönetim paneli (5001 HTTPS).",
    grup: "dosya",
    gayriResmi: true,
  },
  {
    no: "5060",
    protokol: "TCP/UDP",
    ad: "SIP",
    aciklama: "İnternet telefonu (VoIP) çağrı kurulumu.",
    grup: "medya",
  },
  {
    no: "5061",
    protokol: "TCP",
    ad: "SIP (TLS)",
    aciklama: "Şifreli SIP.",
    grup: "medya",
  },
  {
    no: "5222",
    protokol: "TCP",
    ad: "XMPP",
    aciklama: "Anlık mesajlaşma istemci bağlantısı.",
    grup: "web",
  },
  {
    no: "5228",
    protokol: "TCP",
    ad: "Google Play / FCM",
    aciklama: "Android bildirimleri ve Google Play hizmetleri.",
    grup: "web",
  },
  {
    no: "5353",
    protokol: "UDP",
    ad: "mDNS",
    aciklama: "Yerel ağda ad çözümleme (Bonjour, AirPlay, Chromecast keşfi).",
    grup: "altyapi",
  },
  {
    no: "5432",
    protokol: "TCP",
    ad: "PostgreSQL",
    aciklama: "PostgreSQL veritabanı bağlantıları.",
    grup: "veritabani",
    risk: ACMA,
  },
  {
    no: "5900",
    protokol: "TCP",
    ad: "VNC",
    aciklama: "VNC uzak masaüstü (5900 + ekran numarası).",
    grup: "uzak",
    risk: ACMA,
  },
  {
    no: "5938",
    protokol: "TCP/UDP",
    ad: "TeamViewer",
    aciklama: "TeamViewer uzak destek bağlantısı.",
    grup: "uzak",
    gayriResmi: true,
  },
  {
    no: "6379",
    protokol: "TCP",
    ad: "Redis",
    aciklama: "Redis bellek içi veritabanı.",
    grup: "veritabani",
    risk: ACMA,
  },
  {
    no: "6443",
    protokol: "TCP",
    ad: "Kubernetes API",
    aciklama: "Kubernetes küme yönetim arayüzü.",
    grup: "uzak",
    gayriResmi: true,
  },
  {
    no: "6881-6889",
    protokol: "TCP/UDP",
    ad: "BitTorrent",
    aciklama: "Torrent istemcilerinin geleneksel port aralığı.",
    grup: "dosya",
    gayriResmi: true,
  },
  {
    no: "7777",
    protokol: "TCP",
    ad: "Terraria",
    aciklama: "Terraria sunucusunun varsayılan portu.",
    grup: "oyun",
    gayriResmi: true,
  },
  {
    no: "8000",
    protokol: "TCP",
    ad: "HTTP alternatif / Hikvision",
    aciklama:
      "Geliştirme sunucuları; Hikvision kayıt cihazlarının uygulama (SDK) portu.",
    grup: "medya",
    gayriResmi: true,
  },
  {
    no: "8006",
    protokol: "TCP",
    ad: "Proxmox VE",
    aciklama: "Proxmox sanallaştırma web paneli.",
    grup: "uzak",
    gayriResmi: true,
  },
  {
    no: "8080",
    protokol: "TCP",
    ad: "HTTP alternatif",
    aciklama: "Vekil sunucular, Tomcat ve modem/kamera arayüzleri.",
    grup: "web",
  },
  {
    no: "8123",
    protokol: "TCP",
    ad: "Home Assistant",
    aciklama: "Home Assistant akıllı ev paneli.",
    grup: "uzak",
    gayriResmi: true,
  },
  {
    no: "8291",
    protokol: "TCP",
    ad: "MikroTik Winbox",
    aciklama: "MikroTik yönlendirici yönetimi.",
    grup: "altyapi",
    gayriResmi: true,
    risk: ACMA,
  },
  {
    no: "8443",
    protokol: "TCP",
    ad: "HTTPS alternatif",
    aciklama: "Yönetim panelleri ve ikinci HTTPS hizmetleri.",
    grup: "web",
  },
  {
    no: "8883",
    protokol: "TCP",
    ad: "MQTT (TLS)",
    aciklama: "Şifreli MQTT.",
    grup: "altyapi",
  },
  {
    no: "9090",
    protokol: "TCP",
    ad: "Prometheus",
    aciklama: "Prometheus izleme sunucusu.",
    grup: "altyapi",
    gayriResmi: true,
  },
  {
    no: "9100",
    protokol: "TCP",
    ad: "Ağ yazıcısı (RAW / JetDirect)",
    aciklama: "Yazıcıya doğrudan baskı gönderme.",
    grup: "altyapi",
  },
  {
    no: "9200",
    protokol: "TCP",
    ad: "Elasticsearch",
    aciklama: "Elasticsearch REST arayüzü.",
    grup: "veritabani",
    gayriResmi: true,
    risk: ACMA,
  },
  {
    no: "10050-10051",
    protokol: "TCP",
    ad: "Zabbix",
    aciklama: "Zabbix ajanı (10050) ve sunucusu (10051).",
    grup: "altyapi",
  },
  {
    no: "11211",
    protokol: "TCP/UDP",
    ad: "Memcached",
    aciklama: "Önbellek sunucusu.",
    grup: "veritabani",
    risk:
      "Açık Memcached, DDoS yükseltme saldırılarında kullanılmıştır. " + ACMA,
  },
  {
    no: "19132",
    protokol: "UDP",
    ad: "Minecraft Bedrock",
    aciklama: "Minecraft Bedrock sunucusunun varsayılan portu.",
    grup: "oyun",
    gayriResmi: true,
  },
  {
    no: "25565",
    protokol: "TCP",
    ad: "Minecraft Java",
    aciklama: "Minecraft Java sunucusunun varsayılan portu.",
    grup: "oyun",
    gayriResmi: true,
  },
  {
    no: "27015",
    protokol: "TCP/UDP",
    ad: "Steam / Source oyunları",
    aciklama: "Counter-Strike gibi Source motoru oyun sunucuları.",
    grup: "oyun",
  },
  {
    no: "27017",
    protokol: "TCP",
    ad: "MongoDB",
    aciklama: "MongoDB veritabanı bağlantıları.",
    grup: "veritabani",
    risk: ACMA,
  },
  {
    no: "32400",
    protokol: "TCP",
    ad: "Plex",
    aciklama: "Plex medya sunucusu.",
    grup: "medya",
    gayriResmi: true,
  },
  {
    no: "37777",
    protokol: "TCP",
    ad: "Dahua kayıt cihazı",
    aciklama: "Dahua DVR/NVR istemci bağlantı portu.",
    grup: "medya",
    gayriResmi: true,
  },
  {
    no: "51820",
    protokol: "UDP",
    ad: "WireGuard",
    aciklama: "WireGuard VPN'in yaygın varsayılan portu.",
    grup: "vpn",
    gayriResmi: true,
  },
];

/** Port aralığı tanımları: sistem, kayıtlı, dinamik (RFC 6335). */
export function portAraligi(n: number): string {
  if (n < 0 || n > 65535) return "Geçersiz";
  if (n <= 1023) return "Sistem (iyi bilinen) portu: 0–1023";
  if (n <= 49151) return "Kayıtlı port: 1024–49151";
  return "Dinamik / geçici port: 49152–65535";
}

/** Numara, ad veya açıklamaya göre arama. */
export function portAra(sorgu: string, liste = PORTLAR): Port[] {
  const q = sorgu.trim().toLocaleLowerCase("tr");
  if (!q) return liste;
  const n = /^\d+$/.test(q) ? Number(q) : null;
  return liste.filter((p) => {
    if (n !== null) {
      const [a, b] = p.no.split("-").map(Number);
      return b ? n >= a && n <= b : n === a;
    }
    return `${p.no} ${p.ad} ${p.aciklama}`.toLocaleLowerCase("tr").includes(q);
  });
}
