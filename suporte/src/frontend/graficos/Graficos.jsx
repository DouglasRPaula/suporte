import {Chart as ChartJS} from "chart.js/auto"
import { Bar, Doughnut, Line } from "react-chartjs-2"

export default function Graficos() {

    return(
        <div>
            <Bar
                data={{
                    labels: ["Janeiro", "Fevereiro", "Março"],
                    datasets: [
                        {
                            label: "Chamados por mês",
                            data: [10,20,30]
                        }
                    ]
                }}
            />

        </div>
    )
}