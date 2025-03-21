import React, { useEffect, useState } from "react";

const Trades = ({ darkMode }) => {
  const [trades, setTrades] = useState([]);

  // Fetch trades from the backend
  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const response = await fetch(
          "http://localhost:3500/api/v1/admin/fetch-trades"
        );
        const data = await response.json();
        if (data.success) {
          setTrades(data.message);
        }
      } catch (error) {
        console.error("Error fetching trades:", error);
      }
    };

    fetchTrades();
  }, []);

  return (
    <div className="space-y-6">
      <h2
        className={`text-3xl font-bold ${
          darkMode ? "text-white" : "text-gray-800"
        }`}
      >
        Trades
      </h2>
      <div
        className={`p-6 rounded-lg shadow-md backdrop-blur-sm ${
          darkMode ? "bg-gray-800/50" : "bg-white/50"
        }`}
      >
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th
                className={`px-6 py-3 text-left text-xs font-medium ${
                  darkMode ? "text-gray-200" : "text-gray-500"
                } uppercase tracking-wider`}
              >
                User
              </th>
              <th
                className={`px-6 py-3 text-left text-xs font-medium ${
                  darkMode ? "text-gray-200" : "text-gray-500"
                } uppercase tracking-wider`}
              >
                Symbol
              </th>
              <th
                className={`px-6 py-3 text-left text-xs font-medium ${
                  darkMode ? "text-gray-200" : "text-gray-500"
                } uppercase tracking-wider`}
              >
                Type
              </th>
              <th
                className={`px-6 py-3 text-left text-xs font-medium ${
                  darkMode ? "text-gray-200" : "text-gray-500"
                } uppercase tracking-wider`}
              >
                Amount
              </th>
              <th
                className={`px-6 py-3 text-left text-xs font-medium ${
                  darkMode ? "text-gray-200" : "text-gray-500"
                } uppercase tracking-wider`}
              >
                Entry
              </th>
              <th
                className={`px-6 py-3 text-left text-xs font-medium ${
                  darkMode ? "text-gray-200" : "text-gray-500"
                } uppercase tracking-wider`}
              >
                Exit
              </th>
              <th
                className={`px-6 py-3 text-left text-xs font-medium ${
                  darkMode ? "text-gray-200" : "text-gray-500"
                } uppercase tracking-wider`}
              >
                PnL
              </th>
              <th
                className={`px-6 py-3 text-left text-xs font-medium ${
                  darkMode ? "text-gray-200" : "text-gray-500"
                } uppercase tracking-wider`}
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody
            className={`divide-y divide-gray-200 ${
              darkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            {trades.map((trade) => (
              <tr key={trade._id}>
                <td className="px-6 py-4 whitespace-nowrap">{trade.user}</td>
                <td className="px-6 py-4 whitespace-nowrap">{trade.symbol}</td>
                <td className="px-6 py-4 whitespace-nowrap">{trade.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">{trade.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap">{trade.entry}</td>
                <td className="px-6 py-4 whitespace-nowrap">{trade.exit}</td>
                <td
                  className={`px-6 py-4 whitespace-nowrap ${
                    trade.PnL > 0
                      ? "text-green-600"
                      : trade.PnL == 0
                      ? "text-black"
                      : "text-red-600"
                  }`}
                >
                  {trade.PnL?.toFixed(4)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{trade.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Trades;
