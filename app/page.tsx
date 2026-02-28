import Converter from "./converter/Converter";
import SiMasterTable from "./converter/siMaterTable";

function UnitLegend() {
  return (
    <div className="unit-legend">
      <h3>Birim sembolleri</h3>

      <div className="unit-legend-grid">
        <div>
          <p>° – Derece</p>
          <p>ac – Acre</p>
          <p>atm – Atmosfer standard</p>
          <p>bar – Bar</p>
          <p>Btu – British Thermal Unit</p>
          <p>cal – Kalori</p>
          <p>cfm – cubic feet per minute</p>
          <p>cl – Santilitre</p>
          <p>cP – Santipoise</p>
          <p>cSt – Centistokes</p>
        </div>

        <div>
          <p>J – Joule</p>
          <p>K – Kelvin</p>
          <p>kcal – Kilokalori</p>
          <p>kg – Kilogram</p>
          <p>kJ – Kilojul</p>
          <p>km – Kilometre</p>
          <p>kPa – Kilopascal</p>
          <p>kW – Kilowatt</p>
          <p>L – Litre</p>
          <p>lb – Pound (ağırlık)</p>
        </div>

        <div>
          <p>N – Newton</p>
          <p>nmi – Deniz mili</p>
          <p>Pa – Pascal</p>
          <p>psi – Pound per square inch</p>
          <p>rad – Radyan</p>
          <p>rpm – Revolutions per minute</p>
          <p>s – Saniye</p>
          <p>t – Ton</p>
          <p>W – Watt</p>
          <p>yd – Yarda</p>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <main>
      <div className="converter-card">
        {/* Başlık */}
        <div className="converter-title">
          <h1>Online Birim Çevirici</h1>
          <p>Mühendisler için basit, hızlı ve net bir birim dönüştürücü.</p>
        </div>

        {/* 1) Ana birim çevirici */}
        <Converter />

        {/* 2) Birim sembolleri rehberi */}
        <UnitLegend />

        {/* 3) En altta: SI birim sistemleri büyük tablosu */}
        <SiMasterTable />
      </div>
    </main>
  );
}