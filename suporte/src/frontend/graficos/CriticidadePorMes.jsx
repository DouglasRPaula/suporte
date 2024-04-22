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
import ErrorMessage from "../modal/ErrorMessage";
import { listaChamadosPorMesECriticidade } from "../redux/chamadosSlice";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { labels } from "../constants/graficos";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function CriticidadePorMes({ ano }) {
  const chamados = useSelector(
    (state) => state.chamado.chamadosPorMesECriticidade
  );
  const dispatch = useDispatch();

  const pegarCriticidades = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/graficos/chamadosPorMesECriticidade?ano=${ano}`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        ErrorMessage(`Ocorreu um erro: ${response.statusText}`);
        return;
      }

      const data = await response.json();
      dispatch(listaChamadosPorMesECriticidade(data));
    } catch (error) {
      ErrorMessage("erro ao pegar chamados:", error);
    }
  }, [dispatch, ano]);

  useEffect(() => {
    pegarCriticidades();
  }, [pegarCriticidades, ano]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
        labels: {
          font: {
            size: 12,
          },
          boxWidth: 10,
        },
      },
      title: {
        display: true,
        text: "Criticidade por mês",
        font: {
          size: 20,
        },
      },
    },
  };

  const criticidades = ["1", "2", "3", "4", "5"];

  const chartData = {
    labels,
    datasets: criticidades.map((criticidade) => {
      let backgroundColor;
      switch (criticidade) {
        case "1":
          backgroundColor = "#d62828";
          break;
        case "2":
          backgroundColor = "#f77f00";
          break;
        case "3":
          backgroundColor = "#fcbf49";
          break;
        case "4":
          backgroundColor = "#81b29a";
          break;
        case "5":
          backgroundColor = "#eae2b7";
          break;
        default:
          backgroundColor = "rgba(0, 0, 0, 0.5)";
      }

      const dataset = {
        label: criticidade,
        data: new Array(12).fill(0),
        backgroundColor,
      };

      chamados.forEach((chamado) => {
        if (chamado._id.criticidade === criticidade) {
          dataset.data[chamado._id.month - 1] += chamado.total;
        }
      });

      return dataset;
    }),
  };

  return (
    <div style={{ width: "45%", height: "450px" }}>
      <Bar key={ano} options={options} data={chartData} />
    </div>
  );
}
