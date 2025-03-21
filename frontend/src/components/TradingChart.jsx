import React from "react";
import Chart from "react-apexcharts";

const TradingChart = ({ data = {} }) => {
  if (!data || Object.keys(data).length === 0)
    return <p className="text-gray-400">Loading chart...</p>;

  const chartData = Object.keys(data).map((symbol) => ({
    x: symbol,
    y: data[symbol]?.current || 0,
  }));

  const options = {
    chart: {
      id: "trading-chart",
      toolbar: { show: false },
      background: "#1a1a1a",
    },
    xaxis: {
      categories: Object.keys(data),
      labels: { style: { colors: "white" } },
    },
    theme: { mode: "dark" },
    grid: {
      borderColor: "#333",
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    colors: ["#3b82f6"],
  };

  const series = [{ name: "Price", data: chartData }];

  return (
    <div className="text-white">
      <Chart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default TradingChart;
