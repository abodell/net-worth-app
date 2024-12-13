import { Line } from 'react-chartjs-2'
import { createChartData } from '@/utils/chartData';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function transformUserData(userData) {
    const labels = userData.map(item => new Date(item.createdAt).toLocaleDateString());
    const values = userData.map(item => item.balance);

    return {
        labels: labels,
        datasets: [
            {
            data: values,
            backgroundColor: [
                "rgba(75,192,140,1)",
                "&quot;#ecf0f1",
                "#50AF95",
                "#f3ba2f",
                "#2a71d0"
            ],
            borderColor: "#FF7F50",
            borderWidth: 2
            }
        ]
    }
}
const LineChart = ({secondary, userData}) => {

    const themeColor = secondary ? "#D3D3D3" : "black"

    const chartData = userData && userData.length > 0 ? transformUserData(userData) : createChartData()

    return (
        <div className="w-full h-full">
            <Line 
                data={chartData}
                options={{
                    animation: {
                        duration: 2000,
                        easing: 'easeInOutQuad'
                    },
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        x: {
                            ticks: {
                                color: themeColor
                            },
                            grid: {
                                color: themeColor
                            }
                        },
                        y: {
                            ticks: {
                                color: themeColor
                            },
                            grid: {
                                color: themeColor
                            },
                            beginAtZero: true
                        }
                    }
                }}
            />
        </div>
    )
}

export default LineChart