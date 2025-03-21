import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";

const TradingChart = ({
  symbol,
  userId,
  setCurrentPrice,
  handlePlaceOrder,
}) => {
  const [chartData, setChartData] = useState([]);
  const [timeStamps, setTimeStamps] = useState([]);
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState("CE"); // CE or PE
  const [message, setMessage] = useState("");

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3500");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      Object.entries(data).forEach(([sym, details]) => {
        if (sym === symbol) {
          setPrice(details.current); // Update current price
          setCurrentPrice(details.current); // Pass current price to parent
          setChartData((prev) => [...prev.slice(-29), details.current]);
          setTimeStamps((prev) => [
            ...prev.slice(-29),
            new Date().toLocaleTimeString(),
          ]);
        }
      });
    };

    return () => ws.close();
  }, [symbol, setCurrentPrice]);

  const handlePlaceOrderClick = async () => {
    try {
      const orderDetails = {
        user: userId,
        symbol,
        type,
        amount,
        entry: price,
      };
      const response = await handlePlaceOrder(orderDetails);
      setMessage(`Order placed successfully: ${response.data.order._id}`);
    } catch (error) {
      setMessage("Error placing order");
      console.error("Error placing order:", error);
    }
  };

  const chartOptions = {
    chart: {
      type: "line",
      height: 350,
      background: "#1F2937", // Dark background
      foreColor: "#FFFFFF", // White text
    },
    xaxis: {
      categories: timeStamps,
      labels: {
        style: {
          colors: "#FFFFFF", // White labels
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#FFFFFF", // White labels
        },
      },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    colors: ["#FF4560"], // Red line color
    tooltip: {
      theme: "dark", // Dark tooltip
    },
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">{symbol} Price Chart</h2>
      <ApexCharts
        options={chartOptions}
        series={[{ name: "Price", data: chartData }]}
        type="line"
        height={350}
      />
      <div className="mt-6 space-y-4">
        <div className="flex space-x-4">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="bg-gray-700 text-white p-2 rounded-lg"
          >
            <option value="CE">Call Option (CE)</option>
            <option value="PE">Put Option (PE)</option>
          </select>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-gray-700 text-white p-2 rounded-lg"
          />
          <button
            onClick={handlePlaceOrderClick}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200"
          >
            Place {type} Order
          </button>
        </div>
        {message && <p className="text-sm text-gray-400">{message}</p>}
      </div>
    </div>
  );
};

export default TradingChart;
