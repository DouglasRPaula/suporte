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
import axios from "axios";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ChamadosPorEmpresa() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "http://localhost:5000/chamados/por-mes"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chamados por mês",
      },
    },
  };

  const labels = ['Janeiro', 'Fevereiro', 'Março', 'Abril' , 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  const chartData = {
    labels,
    datasets: [
      {
        label: "CBMM",
        data: data.map((item) => item.total.number({ min: 0, max: 100 })),
        backgroundColor: "rgba(39, 67, 224, 0.5)",
      },
      {
        label: "Reta",
        data: data.map((item) => item.total.number({ min: 0, max: 100 })),
        backgroundColor: "rgba(231, 51, 51, 0.5)",
      },
      {
        label: "Vale",
        data: data.map((item) => item.total.number({ min: 0, max: 100 })),
        backgroundColor: "rgba(243, 228, 92, 0.589)",
      },
      {
        label: "Gerdau",
        data: data.map((item) => item.total.number({ min: 0, max: 100 })),
        backgroundColor: "rgba(74, 236, 147, 0.5)",
      },
      {
        label: "JMendes",
        data: data.map((item) => item.total.number({ min: 0, max: 100 })),
        backgroundColor: "rgba(243, 117, 216, 0.5)",
      },
      {
        label: "Eurochem",
        data: data.map((item) => item.total.number({ min: 0, max: 100 })),
        backgroundColor: "rgba(103, 37, 209, 0.5)",
      },
      {
        label: "MCA",
        data: data.map((item) => item.total.number({ min: 0, max: 100 })),
        backgroundColor: "rgba(240, 178, 108, 0.5)",
      },
      {
        label: "Chammas",
        data: data.map((item) => item.total.number({ min: 0, max: 100 })),
        backgroundColor: "rgba(34, 11, 245, 0.5)",
      },
      {
        label: "Samarco",
        data: data.map((item) => item.total.number({ min: 0, max: 100 })),
        backgroundColor: "rgba(255, 238, 1, 0.5)",
      },
    ],
  };
  return <Bar options={options} data={chartData} />;
}
