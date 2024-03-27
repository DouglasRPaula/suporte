import BugsPorEmpresa from "./BugsPorEmpresa";
import ChamadosPorEmpresaEMes from "./ChamadosPorEmpresa";
import ChamadosPorMes from "./ChamadosPorMes";
import CriticidadePorMes from "./CriticidadePorMes";

export default function Graficos({options, data}) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
      }}
    >
      <ChamadosPorMes options={options} data={data}/>
      <CriticidadePorMes options={options} data={data}/>
      <ChamadosPorEmpresaEMes options={options} data={data}/>
      <BugsPorEmpresa options={options} data={data}/>
    </div>
  );
}
