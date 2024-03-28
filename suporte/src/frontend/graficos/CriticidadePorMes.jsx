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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function CriticidadePorMes() {
  const chamados = useSelector((state) => state.chamado.chamadosPorMesECriticidade);
  const dispatch = useDispatch();

  const pegarCriticidades = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/chamadosPorMesECriticidade`
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
  }, [dispatch]);

  useEffect(() => {
    pegarCriticidades();
  }, [pegarCriticidades]);

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

  const labels = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const criticidades = ["1", "2", "3", "4", "5"];

  const chartData = {
    labels,
    datasets: criticidades.map(criticidade => {
      let backgroundColor;
      switch (criticidade) {
        case "1":
          backgroundColor = "rgba(255, 0, 0, 0.5)";
          break;
        case "2":
          backgroundColor = "rgba(255, 165, 0, 0.5)";
          break;
        case "3":
          backgroundColor = "rgba(255, 255, 0, 0.5)";
          break;
        case "4":
          backgroundColor = "rgba(0, 128, 0, 0.5)";
          break;
        case "5":
          backgroundColor = "rgba(0, 0, 255, 0.5)";
          break;
        default:
          backgroundColor = "rgba(0, 0, 0, 0.5)";
      }
  
      const dataset = {
        label: criticidade,
        data: new Array(12).fill(0),
        backgroundColor,
      };
  
      chamados.forEach(chamado => {
        if (chamado._id.criticidade === criticidade) {
          dataset.data[chamado._id.month - 1] += chamado.total;
        }
      });
  
      return dataset;
    }),
  };

  return (
    <div style={{ width: "45%", height: "450px" }}>
      <Bar options={options} data={chartData} />
    </div>
  );
}
