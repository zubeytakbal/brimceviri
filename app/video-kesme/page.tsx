import { VideoSayfasi, videoMeta } from "../components/video/VideoSayfalari";

export const metadata = videoMeta("video-kesme");

export default function Page() {
  return <VideoSayfasi anahtar="video-kesme" />;
}
