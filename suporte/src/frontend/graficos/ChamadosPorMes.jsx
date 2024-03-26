import { useEffect, useRef } from "react";
import { Chart } from "chart.js";
import "chart.js/auto";

export default function ChamadosPorMes({ chamados }) {
    console.log(chamados)
  const chartRef = useRef(null);
  const myChartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current  && chamados && chamados.length > 0) {
      const ctx = chartRef.current.getContext("2d");

      if (myChartRef.current) {
        myChartRef.current.destroy();
      }

const chamadosPorMes = chamados.reduce((acc, chamado) => {
  if (chamado.dataInicio) {
    const mes = new Date(chamado.dataInicio).getMonth();
    acc[mes] = (acc[mes] || 0) + 1;
  }
  return acc;
}, {});

      const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

      myChartRef.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: Object.keys(chamadosPorMes).map(mes => meses[mes]),
          datasets: [
            {
              label: "Chamados por mês",
              data: Object.values(chamadosPorMes),
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
            },
            x: {
                beginAtZero: true,
            }
          },
        },
      });
    }
  }, [chamados]);

  return <canvas ref={chartRef} />;
}
