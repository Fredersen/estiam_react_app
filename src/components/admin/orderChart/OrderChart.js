import './OrderChart.css';
import {CategoryScale, Chart as ChartJS, LinearScale, LineElement, PointElement, TimeScale, Tooltip} from "chart.js";
import moment from 'moment';
import 'chartjs-adapter-moment';
import {useState, useEffect} from "react";
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    TimeScale
);

export default function OrderChart({ orderFromThisMonth }) {
    const [chartData, setChartData] = useState([]);

    const generateChartData = () => {
        const data = [];
        const startDate = moment().subtract(30, 'days');


        for (let i = 0; i <= 30;
             i++) {
            data.push({
                x: startDate.clone().add(i, 'days').format('YYYY-MM-DD'),
                y: orderFromThisMonth.filter(order => {
                    return moment(order.createdAt).format('YYYY-MM-DD') === startDate.clone().add(i, 'days').format('YYYY-MM-DD');
                }).length,
            });
        }
        setChartData(data);
    };

    const options = {
        responsive: true,
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day',
                    displayFormats: {
                        day: 'MMM D',
                    },
                },
            },
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value, index, values) {
                        return value;
                    },
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    useEffect(() => {
        generateChartData();
    }, [orderFromThisMonth]);

    return (
        <>
            <div className="admin-right-content-chart-title">
                <h3 className="admin-right-content-chart-title-text">Nombre de commandes par jour</h3>
            </div>
            <Line
                options={options}
                data={{
                    datasets: [
                        {
                            label: 'Nombre de commandes',
                            data: chartData,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 2,
                            tension: 0.3,
                        },
                    ],
                }}
            />
        </>
    )
}