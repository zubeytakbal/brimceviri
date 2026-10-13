import ThermalPage, { thermalMetadata } from "../components/thermal/ThermalPage";

export const metadata = thermalMetadata("flowheat");

export default function Page() {
  return <ThermalPage kind="flowheat" />;
}
