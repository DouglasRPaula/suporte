import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useCallback, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../modal/ErrorMessage";
import { listachamadosPorEmpresaEMes } from "../redux/chamadosSlice";
import {
  empresas,
  empresasBackgroundColors,
  labels,
} from "../constants/graficos";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ChamadosPorEmpresaEMes() {
  const chamadosPorEmpresaEMes = useSelector(
    (state) => state.chamado.chamadosPorEmpresaEMes
  );
  const dispatch = useDispatch();

  const pegarChamados = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/graficos/chamadosPorEmpresaEMes`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        ErrorMessage(`Ocorreu um erro: ${response.statusText}`);
        return;
      }

      const data = await response.json();
      dispatch(listachamadosPorEmpresaEMes(data));
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
        text: "Chamados das empresas por mês",
        font: {
          size: 20,
        },
      },
    },
  };

  const normalizeData = (data) => {
    const normalizedData = [];

    empresas.forEach((empresa) => {
      const empresaData = labels.map((month, index) => {
        const chamado = data.find(
          (item) => item._id.empresa === empresa && item._id.month === index + 1
        );
        return chamado ? chamado.total : 0;
      });
      normalizedData.push(empresaData);
    });

    return normalizedData;
  };
  const chartData = {
    labels,
    datasets: empresas.map((empresa, index) => ({
      label: empresa,
      data: normalizeData(chamadosPorEmpresaEMes)[index],
      backgroundColor: empresasBackgroundColors[index],
    })),
  };

  return (
    <div style={{ width: "45%", height: "450px" }}>
      <Bar options={options} data={chartData} />
    </div>
  );
}
