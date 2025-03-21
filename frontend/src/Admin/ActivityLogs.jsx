import React from "react";

const ActivityLogs = ({ darkMode }) => {
  const logs = [
    { id: 1, action: "Updated profile", timestamp: "2023-10-01 12:34 PM" },
    { id: 2, action: "Approved KYC", timestamp: "2023-10-01 11:22 AM" },
    {
      id: 3,
      action: "Changed system settings",
      timestamp: "2023-10-01 10:15 AM",
    },
  ];

  return (
    <div className="space-y-6">
      <h2
        className={`text-3xl font-bold ${
          darkMode ? "text-white" : "text-gray-800"
        }`}
      >
        Activity Logs
      </h2>
      <div
        className={`p-6 rounded-lg shadow-md ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        {logs.map((log) => (
          <div
            key={log.id}
            className={`p-4 mb-2 rounded-lg ${
              darkMode ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <p className={darkMode ? "text-gray-200" : "text-gray-700"}>
              <span className="font-semibold">{log.action}</span> -{" "}
              {log.timestamp}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityLogs;
