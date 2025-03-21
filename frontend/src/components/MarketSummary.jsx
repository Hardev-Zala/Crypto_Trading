import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";

export default function MarketSummary() {
  const [btcData, setBtcData] = useState([]);
  const [timeLabels, setTimeLabels] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3500");
    ws.onopen = () => console.log("Connected to WebSocket for Bitcoin Chart");

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      // console.log("Incoming Message:", message);

      // Update Bitcoin data and time labels
      setBtcData((prevData) => {
        const updatedData = [...prevData];
        if (message["BINANCE:BTCUSDT"]) {
          updatedData.push(message["BINANCE:BTCUSDT"].current);

          // Limit the data points for better performance
          if (updatedData.length > 30) {
            updatedData.shift();
          }
        }
        return updatedData;
      });

      setTimeLabels((prevLabels) => {
        const updatedLabels = [...prevLabels];
        if (message["BINANCE:BTCUSDT"]) {
          const currentTime = new Date().toLocaleTimeString();
          updatedLabels.push(currentTime);

          // Limit the labels to match the data points
          if (updatedLabels.length > 30) {
            updatedLabels.shift();
          }
        }
        return updatedLabels;
      });
    };

    ws.onclose = () => console.log("WebSocket Disconnected for Bitcoin Chart");
    return () => ws.close();
  }, []);

  const options = {
    chart: {
      type: "line",
      background: "transparent",
      foreColor: "#4B5563",
      zoom: { enabled: false },
      animations: {
        enabled: true,
        easing: "easeinout",
        dynamicAnimation: {
          speed: 800, // Smoother transition
        },
      },
    },
    stroke: {
      curve: "smooth",
      width: 4, // Thicker line for better visibility
    },
    xaxis: {
      categories: timeLabels,
      labels: {
        style: {
          colors: "#6B7280",
          fontSize: "14px",
        },
      },
      title: {
        text: "Time",
        style: {
          color: "#4B5563",
          fontWeight: 600,
          fontSize: "16px",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#6B7280",
          fontSize: "14px",
        },
      },
      title: {
        text: "Price (USD)",
        style: {
          color: "#4B5563",
          fontWeight: 600,
          fontSize: "16px",
        },
      },
    },
    grid: {
      borderColor: "#E5E7EB",
      strokeDashArray: 4,
    },
    tooltip: {
      theme: "light",
    },
    colors: ["#1D4ED8"], // Blue line for Bitcoin
  };

  const series = [
    {
      name: "Bitcoin",
      data: btcData,
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800 p-4 flex justify-center items-center">
      <div className="w-full max-w-6xl">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
          Live Bitcoin Chart
        </h1>
        <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-200">
          <ApexCharts
            options={options}
            series={series}
            type="line"
            height={500}
          />
        </div>
      </div>
    </div>
  );
}
