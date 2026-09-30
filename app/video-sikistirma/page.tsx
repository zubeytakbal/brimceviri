import { VideoSayfasi, videoMeta } from "../components/video/VideoSayfalari";

export const metadata = videoMeta("video-sikistirma");

export default function Page() {
  return <VideoSayfasi anahtar="video-sikistirma" />;
}
