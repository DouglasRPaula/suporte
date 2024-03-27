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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ChamadosPorMes() {
  const chamados = useSelector((state) => state.chamado.chamadosPorMes);
  const dispatch = useDispatch();

  const pegarChamados = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:5000/chamadosPorMes`);

      if (!response.ok) {
        ErrorMessage(`Ocorreu um erro: ${response.statusText}`);
        return;
      }

      const data = await response.json();
      dispatch(listaChamadosPorMes(data));
    } catch (error) {
      ErrorMessage("erro ao pegar chamados:", error);
    }
  }, [dispatch]);

  useEffect(() => {
    pegarChamados();
  }, [pegarChamados]);

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

  const chartData = {
    labels,
    datasets: [
      {
        label: "Número de chamados",
        data: labels.map((month, index) => {
          const chamado = chamados.find((item) => item._id.month === index + 1);
          return chamado ? chamado.total : 0; // Aqui está a correção
        }),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div style={{ width: "45%", height: "450px" }}>
      <Bar options={options} data={chartData} />
    </div>
  );
}
