import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../modal/ErrorMessage";
import { listaChamadosPorMes } from "../redux/chamadosSlice";
import { labels } from "../constants/graficos";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ChamadosPorMes({ ano }) {
  const chamados = useSelector((state) => state.chamado.chamadosPorMes);
  const dispatch = useDispatch();

  const pegarChamados = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/graficos/chamadosPorMes?ano=${ano}`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        ErrorMessage(`Ocorreu um erro: ${response.statusText}`);
        return;
      }

      const data = await response.json();
      dispatch(listaChamadosPorMes(data));
    } catch (error) {
      ErrorMessage("erro ao pegar chamados:", error);
    }
  }, [dispatch, ano]);

  useEffect(() => {
    pegarChamados();
  }, [pegarChamados, ano]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 12,
          },
          boxWidth: 10,
        },
      },
      title: {
        display: true,
        text: "Chamados por mês",
        font: {
          size: 20,
        },
      },
    },
  };

  const chartData = {
    labels,
    datasets: [
      {
        label: "Número de chamados",
        data: labels.map((month, index) => {
          const chamado = chamados.find((item) => item._id.month === index + 1);
          return chamado ? chamado.total : 0;
        }),
        backgroundColor: "rgba(233, 23, 23, 0.521)",
      },
    ],
  };

  return (
    <div style={{ width: "45%", height: "450px" }}>
      <Bar key={ano} options={options} data={chartData} />
    </div>
  );
}
