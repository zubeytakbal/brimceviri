import { VideoSayfasi, videoMeta } from "../components/video/VideoSayfalari";

export const metadata = videoMeta("videodan-sesi-kaldirma");

export default function Page() {
  return <VideoSayfasi anahtar="videodan-sesi-kaldirma" />;
}
