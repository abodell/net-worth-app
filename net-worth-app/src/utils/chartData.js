/* 
Generate random numbers values for the chart that will be displayed on the home screen
*/
const generateRandomData = () => {
  const min = 5000
  const max = 50000
  const startYear = 2019
  const numYears = 6
  return Array.from({ length: numYears}, (v, i) => ({
    year: startYear + i,
    netWorth: Math.floor(Math.random() * (max - min + 1)) + min
  }));
};

/*
Generate the random data once, so it is only updated on refresh, rather than on each state change
*/
const labels = generateRandomData().map(data => data.year)
const data = generateRandomData().map(data => data.netWorth)

/*
Export the chart data so we can pass it to the chart component
*/
export const createChartData = () => {
  return {
    labels: labels, 
    datasets: [
      {
        data: data,
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
};