import BugsPorEmpresa from "./BugsPorEmpresa";
import ChamadosPorEmpresaEMes from "./ChamadosPorEmpresa";
import ChamadosPorMes from "./ChamadosPorMes";
import CriticidadePorMes from "./CriticidadePorMes";

export default function Graficos({ options, data }) {
  return (
    <div className="my-2 app-name">
      <div className="d-flex justify-content-between flex-nowrap align-items-center pb-2 mb-3">
        <h1 className="h4 mb-0">Metricas</h1>
      </div>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="metricas">
            2024
          </a>
        </li>
      </ul>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        <ChamadosPorMes options={options} data={data} />
        <CriticidadePorMes options={options} data={data} />
        <ChamadosPorEmpresaEMes options={options} data={data} />
        <BugsPorEmpresa options={options} data={data} />
      </div>
    </div>
  );
}
