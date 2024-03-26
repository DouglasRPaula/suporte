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

export default function CriticidadePorMes() {
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
        text: 'Criticidade por mês',
      }
    }
  }

  const labels = ['Janeiro', 'Fevereiro', 'Março', 'Abril' , 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  const chartData = {
    labels,
    datasets: [
      {
        label: '1',
        data: data.map(item => item.total.number({min: 0, max: 100})),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: '2',
        data: data.map(item => item.total.number({min: 0, max: 100})),
        backgroundColor: 'rgba(80, 235, 19, 0.5)',
      },
      {
        label: '3',
        data: data.map(item => item.total.number({min: 0, max: 100})),
        backgroundColor: 'rgba(98, 31, 223, 0.5)',
      },
      {
        label: '4',
        data: data.map(item => item.total.number({min: 0, max: 100})),
        backgroundColor: 'rgba(228, 241, 40, 0.5)',
      },
      {
        label: '5',
        data: data.map(item => item.total.number({min: 0, max: 100})),
        backgroundColor: 'rgba(235, 99, 20, 0.5)',
      }
    ]
  }
  return(
    <Bar options={options} data={chartData} />
  )
}