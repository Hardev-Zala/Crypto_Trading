import React, { useState, useEffect } from "react";

const Notifications = ({ darkMode }) => {
  const [notifications, setNotifications] = useState([]);

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      setNotifications((prev) => [
        {
          id: Date.now(),
          message: `New trade executed at ${new Date().toLocaleTimeString()}`,
        },
        ...prev,
      ]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <h2
        className={`text-3xl font-bold ${
          darkMode ? "text-white" : "text-gray-800"
        }`}
      >
        Notifications
      </h2>
      <div
        className={`p-6 rounded-lg shadow-md backdrop-blur-sm ${
          darkMode ? "bg-gray-800/50" : "bg-white/50"
        }`}
      >
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 mb-2 rounded-lg ${
              darkMode
                ? "bg-gray-700/50 text-gray-200"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            <p>{notification.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
