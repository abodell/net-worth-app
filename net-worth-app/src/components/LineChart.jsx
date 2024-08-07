import { Line } from 'react-chartjs-2'
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

const LineChart = ({data}) => {
    return (
        <div>
            <h2 className="text-center">Net Worth</h2>
            <Line 
                data={data}
                options={{
                    animation: {
                        duration: 2000,
                        easing: 'easeInOutQuad'
                    },
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }}
            />
        </div>
    )
}

export default LineChart