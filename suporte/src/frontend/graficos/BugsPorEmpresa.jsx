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
import { listaBugsPorEmpresa } from "../redux/chamadosSlice";
import {
  empresas,
  empresasBackgroundColors,
  labels,
} from "../constants/graficos";
import { toast } from "react-toastify";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BugsPorEmpresa({ ano }) {
  const bugsPorEmpresa = useSelector((state) => state.chamado.bugsPorEmpresa);
  const dispatch = useDispatch();

  const pegarChamados = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/graficos/bugsPorEmpresa?ano=${ano}`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        toast.error(`Ocorreu um erro: ${response.statusText}`);
        return;
      }

      const data = await response.json();
      dispatch(listaBugsPorEmpresa(data));
    } catch (error) {
      toast.error("erro ao pegar chamados:", error);
    }
  }, [dispatch, ano]);

  useEffect(() => {
    pegarChamados();
  }, [pegarChamados, ano]);

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
        text: "Bugs por empresa",
        font: {
          size: 20,
        },
      },
    },
  };

  const normalizeData = (data) => {
    const normalizedData = [];
    empresas.forEach((empresa) => {
      const empresaData = labels.map((_, index) => {
        const bug = data.find(
          (item) => item._id.empresa === empresa && item._id.mes === index + 1
        );
        return bug ? bug.total : 0;
      });
      normalizedData.push(empresaData);
    });
    return normalizedData;
  };

  const chartData = {
    labels,
    datasets: empresas.map((empresa, index) => ({
      label: empresa,
      data: normalizeData(bugsPorEmpresa)[index],
      backgroundColor: empresasBackgroundColors[index],
    })),
  };

  return (
    <div style={{ width: "45%", height: "450px" }}>
      <Bar key={ano} options={options} data={chartData} />
    </div>
  );
}
