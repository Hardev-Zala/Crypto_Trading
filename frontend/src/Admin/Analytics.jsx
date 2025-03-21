import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const Analytics = ({ darkMode }) => {
  const [analyticsData, setAnalyticsData] = useState({
    userGrowth: [],
    kycStatus: [],
    tradePerformance: [],
    transactionTypes: [],
    mostWatchedSymbols: [],
  });

  // Fetch analytics data from the backend
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3500/api/v1/admin/fetch-analytics"
        );
        const data = await response.json();
        if (data.success) {
          setAnalyticsData(data.data);
        }
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    };

    fetchAnalyticsData();
  }, []);

  // Chart options and series for user growth
  const userGrowthOptions = {
    chart: {
      type: "line",
      height: 350,
      foreColor: darkMode ? "#fff" : "#000",
    },
    xaxis: {
      categories: analyticsData.userGrowth.map((item) => item.date),
    },
    title: {
      text: "User Growth Over Time",
      style: {
        color: darkMode ? "#fff" : "#000",
      },
    },
  };

  const userGrowthSeries = [
    {
      name: "Users",
      data: analyticsData.userGrowth.map((item) => item.users),
    },
  ];

  return (
    <div className="space-y-8 p-6">
      <h2
        className={`text-3xl font-bold ${
          darkMode ? "text-white" : "text-gray-800"
        }`}
      >
        Analytics
      </h2>

      {/* User Growth Over Time */}
      <div
        className={`p-6 rounded-lg shadow-md backdrop-blur-sm ${
          darkMode ? "bg-gray-800/50" : "bg-white/50"
        }`}
      >
        <Chart
          options={userGrowthOptions}
          series={userGrowthSeries}
          type="line"
          height={350}
        />
      </div>
    </div>
  );
};

export default Analytics;
