import BugsPorEmpresa from "./BugsPorEmpresa";
import ChamadosPorEmpresa from "./ChamadosPorEmpresa";
import ChamadosPorMes from "./ChamadosPorMes";
import CriticidadePorMes from "./CriticidadePorMes";

export default function Graficos({ options, data }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
      }}
    >
      <div style={{ width: "45%", height: "450px" }}>
        <ChamadosPorMes options={options} data={data} />
      </div>
      <div style={{ width: "45%", height: "450px" }}>
        <BugsPorEmpresa options={options} data={data} />
      </div>
      <div style={{ width: "45%", height: "450px" }}>
        <CriticidadePorMes options={options} data={data} />
      </div>
      <div style={{ width: "45%", height: "450px" }}>
        <ChamadosPorEmpresa options={options} data={data} />
      </div>
    </div>
  );
}
