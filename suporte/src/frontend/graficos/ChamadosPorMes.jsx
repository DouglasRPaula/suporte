import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js'
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { useEffect, useState } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ChamadosPorMes() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:5000/chamados/por-mes');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chamados por mês',
      }
    }
  }

  const labels = ['Janeiro', 'Fevereiro', 'Março', 'Abril' , 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Número de chamados',
        data: data.map(item => item.total.number({min: 0, max: 100})),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ]
  }
  return(
    <Bar options={options} data={chartData} />
  )
}