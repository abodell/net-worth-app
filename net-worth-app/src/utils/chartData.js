const mockData = [
    {
      id: 1,
      year: 2016,
      userNetWorth: 15430,
    },
    {
      id: 2,
      year: 2017,
      userNetWorth: 24217,
    },
    {
      id: 3,
      year: 2018,
      userNetWorth: 32018,
    },
    {
      id: 4,
      year: 2019,
      userNetWorth: 39187,
    },
    {
      id: 5,
      year: 2020,
      userNetWorth: 34875,
    }
];

export const chartData = {
  labels: mockData.map((mockData) => mockData.year), 
  datasets: [
    {
      label: "Net Worth",
      data: mockData.map((mockData) => mockData.userNetWorth),
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