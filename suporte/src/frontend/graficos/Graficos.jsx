/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { setAnosDisponiveis, setAnoSelecionado } from "../redux/chamadosSlice";
import BugsPorEmpresa from "./BugsPorEmpresa";
import ChamadosPorEmpresaEMes from "./ChamadosPorEmpresa";
import ChamadosPorMes from "./ChamadosPorMes";
import CriticidadePorMes from "./CriticidadePorMes";
import { useEffect } from "react";

export default function Graficos({ options, data }) {
  const dispatch = useDispatch();
  const anos = useSelector((state) => state.chamado.anosDisponiveis || []);
  const anoSelecionado = useSelector((state) => state.chamado.anoSelecionado);

  const fetchAnosDisponiveis = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/graficos/anosDisponiveis`,
        { credentials: "include" }
      );
      const data = await response.json();
      dispatch(setAnosDisponiveis(data));
    } catch (error) {
      console.log("Erro ao buscar anos disponíveis:", error);
    }
  };

  useEffect(() => {
    fetchAnosDisponiveis();
  }, [dispatch]);

  const handleAnoClick = (ano) => {
    dispatch(setAnoSelecionado(ano));
  };

  return (
    <div className="my-2 app-name">
      <div className="d-flex justify-content-between flex-nowrap align-items-center pb-2 mb-3">
        <h1 className="h4 mb-0">Métricas</h1>
      </div>
      <ul className="nav nav-tabs">
        {anos.length > 0 &&
          anos.map((ano) => (
            <li key={ano} className="nav-item">
              <button
                className={`nav-link year-nav-link ${
                  ano === anoSelecionado ? "active" : ""
                }`}
                onClick={() => handleAnoClick(ano)}
              >
                {ano}
              </button>
            </li>
          ))}
      </ul>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        <ChamadosPorMes ano={anoSelecionado} options={options} data={data} />
        <CriticidadePorMes ano={anoSelecionado} options={options} data={data} />
        <ChamadosPorEmpresaEMes
          ano={anoSelecionado}
          options={options}
          data={data}
        />
        <BugsPorEmpresa ano={anoSelecionado} options={options} data={data} />
      </div>
    </div>
  );
}
