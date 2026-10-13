import ThermalPage, { thermalMetadata } from "../components/thermal/ThermalPage";

export const metadata = thermalMetadata("pump");

export default function Page() {
  return <ThermalPage kind="pump" />;
}
