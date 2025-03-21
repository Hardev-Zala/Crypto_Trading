import React, { useState, useEffect } from "react";
import axios from "axios"; // For fetching data from the backend
import { generateInvoice } from "../utils/generateInvoice";
import { useNavigate } from "react-router-dom";

const TradeHistory = () => {
  const [trades, setTrades] = useState([]);

  // Fetch trade data from the backend
  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3500/api/v1/fetch/fetch-history/",
          { withCredentials: true }
        ); // Replace with your API endpoint
        setTrades(response.data.message);
      } catch (error) {
        console.error("Error fetching trades:", error);
      }
    };
    fetchTrades();
  }, []);

  const navigate = useNavigate();

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <h1 className="flex items-center text-xl font-bold mb-8 text-center text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          onClick={() => navigate(-1)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        &nbsp;&nbsp;Trade History
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trades.map((trade) => (
          <div
            key={trade._id}
            className="bg-gray-900 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 border-l-4 border-blue-500"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-400">
                {new Date(trade.createdAt).toLocaleDateString()}
              </span>
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  trade.status === "closed"
                    ? "bg-green-900 text-green-300"
                    : "bg-yellow-900 text-yellow-300"
                }`}
              >
                {trade.status}
              </span>
            </div>

            <h2 className="text-xl font-bold mb-2 text-white">
              {trade.symbol}
            </h2>
            <p
              className={`text-lg ${
                trade.type === "CE" ? "text-green-400" : "text-red-400"
              }`}
            >
              {trade.type} - ${trade.entry} → ${trade.exit}
            </p>

            <div className="mt-4">
              <p className="text-sm text-gray-400">Amount: {trade.amount}</p>
              <p
                className={`text-lg font-semibold ${
                  trade.PnL >= 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                PnL: ${trade.PnL.toFixed(4)}
              </p>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <button
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300"
                onClick={() => generateInvoice(trade)}
              >
                Download Invoice
              </button>
              <span className="text-sm text-gray-400">ID: {trade._id}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TradeHistory;
