import { Bar } from "react-chartjs-2";
import 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

interface GraficoBarrasProps {
    dados: {
        labels: string[];
        datasets: {
            data: number[];
        }[];
    }
    options: {
        plugins: {
            datalabels: {
                formatter: (value: any, ctx: any) => string;
                color: string;
            };
        };
        scales: {
            y: {
                ticks: {
                    callback: (value: any, index: any, ticks: any) => string;
                };
            };
        };
    }
}

const GraficoBarras = (props: GraficoBarrasProps) => {
    return <Bar data={props.dados} options={props.options} plugins={[ChartDataLabels]} />
}

export default GraficoBarras;