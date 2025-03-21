import React, { useEffect, useState } from "react";

const Dashboard = ({ darkMode }) => {
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    totalTrades: 0,
    totalRevenue: 0,
  });

  // Fetch dashboard metrics from the backend
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch(
          "http://localhost:3500/api/v1/admin/fetch-analytics"
        );
        const data = await response.json();
        console.log(data);

        if (data.success) {
          setMetrics({
            totalUsers: data.totalUsers,
            totalTrades: data.totalTrades,
            totalRevenue: data.totalRevenue, // Replace with actual revenue logic
          });
        }
      } catch (error) {
        console.error("Error fetching metrics:", error);
      }
    };

    fetchMetrics();
  }, []);

  return (
    <div className="space-y-6">
      <h2
        className={`text-3xl font-bold ${
          darkMode ? "text-white" : "text-gray-800"
        }`}
      >
        Dashboard
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Users Widget */}
        <div
          className={`p-6 rounded-lg shadow-md backdrop-blur-sm ${
            darkMode ? "bg-gray-800/50 text-white" : "bg-white/50 text-gray-800"
          }`}
        >
          <h3 className={`text-lg font-semibold`}>Total Users</h3>
          <p
            className={`text-2xl font-bold ${
              darkMode ? "text-blue-400" : "text-blue-600"
            }`}
          >
            {metrics.totalUsers}
          </p>
        </div>
        {/* Total Trades Widget */}
        <div
          className={`p-6 rounded-lg shadow-md backdrop-blur-sm ${
            darkMode ? "bg-gray-800/50 text-white" : "bg-white/50 text-gray-800"
          }`}
        >
          <h3 className={`text-lg font-semibold`}>Total Trades</h3>
          <p
            className={`text-2xl font-bold ${
              darkMode ? "text-green-400" : "text-green-600"
            }`}
          >
            {metrics.totalTrades}
          </p>
        </div>
        {/* Total Revenue Widget */}
        <div
          className={`p-6 rounded-lg shadow-md backdrop-blur-sm ${
            darkMode ? "bg-gray-800/50 text-white" : "bg-white/50 text-gray-800"
          }`}
        >
          <h3 className={`text-lg font-semibold`}>Total Revenue</h3>
          <p
            className={`text-2xl font-bold ${
              darkMode ? "text-purple-400" : "text-purple-600"
            }`}
          >
            ${metrics.totalRevenue.toFixed(3)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
