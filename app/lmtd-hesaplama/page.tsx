import ThermalPage, { thermalMetadata } from "../components/thermal/ThermalPage";

export const metadata = thermalMetadata("lmtd");

export default function Page() {
  return <ThermalPage kind="lmtd" />;
}
