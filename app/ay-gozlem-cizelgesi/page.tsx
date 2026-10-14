import MoonObservationPage, { observationMetadata } from "../components/moon/MoonObservationPage";

export const metadata = observationMetadata();

export default function Page() {
  return <MoonObservationPage />;
}
