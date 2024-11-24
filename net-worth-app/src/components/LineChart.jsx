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

const LineChart = ({secondary}) => {

    const themeColor = secondary ? "#D3D3D3" : "black"

    return (
        <div className="w-full h-full">
            <Line 
                data={createChartData()}
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