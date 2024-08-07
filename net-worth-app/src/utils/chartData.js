/* 
Generate random numbers values for the chart that will be displayed on the home screen
*/
const generateRandomData = () => {
  const min = 15000
  const max = 50000
  const startYear = 2019
  const numYears = 6
  return Array.from({ length: numYears}, (v, i) => ({
    year: startYear + i,
    netWorth: Math.floor(Math.random() * (max - min + 1)) + min
  }));
};

/*
Export the chart data so we can pass it to the chart component
*/
export const chartData = {
  labels: generateRandomData().map(data => data.year), 
  datasets: [
    {
      label: "Net Worth",
      data: generateRandomData().map(data => data.netWorth),
      backgroundColor: [
        "rgba(75,192,192,1)",
        "&quot;#ecf0f1",
        "#50AF95",
        "#f3ba2f",
        "#2a71d0"
      ],
      borderColor: "black",
      borderWidth: 2
    }
  ]
};