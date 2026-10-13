import ThermalPage, { thermalMetadata } from "../components/thermal/ThermalPage";

export const metadata = thermalMetadata("uvalue");

export default function Page() {
  return <ThermalPage kind="uvalue" />;
}
