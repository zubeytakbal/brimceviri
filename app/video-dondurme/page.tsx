import { VideoSayfasi, videoMeta } from "../components/video/VideoSayfalari";

export const metadata = videoMeta("video-dondurme");

export default function Page() {
  return <VideoSayfasi anahtar="video-dondurme" />;
}
