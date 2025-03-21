import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Analytics from "./Analytics";
import Trades from "./Trades";
import Settings from "./Settings";
import Notifications from "./Notifications";
import { Sun, Moon } from "lucide-react";
// Icons for dark/light mode

function AdminDashboard() {
  const navigate = useNavigate();
  const [present, setPresent] = useState("Dashboard");
  const [darkMode, setDarkMode] = useState(false);

  // Redirect if user is not authorized
  if (localStorage.getItem("userId") !== "67b6e13f72ed5a4f35afcf04") {
    navigate(-1);
  }

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  // Add glassmorphism effect to the sidebar
  useEffect(() => {
    const sidebar = document.querySelector(".sidebar");
    if (sidebar) {
      sidebar.style.backgroundColor = darkMode
        ? "rgba(31, 41, 55, 0.8)"
        : "rgba(37, 99, 235, 0.8)";
      sidebar.style.backdropFilter = "blur(10px)";
    }
  }, [darkMode]);

  return (
    <div
      className={`min-h-screen ${darkMode ? "dark bg-gray-900" : "bg-gray-50"}`}
    >
      {/* Glassmorphism Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 p-6 shadow-lg sidebar ${
          darkMode ? "bg-opacity-80" : "bg-opacity-80"
        }`}
      >
        <h1
          className={`text-2xl font-bold ${
            darkMode ? "text-white" : "text-white"
          } mb-8`}
        >
          Trading AdminDashboard
        </h1>
        <nav className="space-y-2">
          {["Dashboard", "Analytics", "Trades", "Settings"].map((item) => (
            <button
              key={item}
              onClick={() => setPresent(item)}
              className={`flex items-center p-3 w-full text-left ${
                darkMode
                  ? "text-gray-200 hover:bg-gray-700/50"
                  : "text-white hover:bg-blue-700/50"
              } ${
                present === item
                  ? darkMode
                    ? "bg-gray-700/50"
                    : "bg-blue-700/50"
                  : ""
              } rounded-lg transition duration-200`}
            >
              {item}
            </button>
          ))}
        </nav>
        {/* Advanced Dark Mode Toggle */}
        <div className="mt-8">
          <button
            onClick={toggleDarkMode}
            className={`flex items-center justify-center w-full p-3 rounded-lg ${
              darkMode
                ? "bg-gray-700/50 text-gray-200 hover:bg-gray-700/70"
                : "bg-blue-700/50 text-white hover:bg-blue-700/70"
            } transition duration-200`}
          >
            {darkMode ? (
              <>
                <Sun className="w-5 h-5 mr-2" />
                Light Mode
              </>
            ) : (
              <>
                <Moon className="w-5 h-5 mr-2" />
                Dark Mode
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {present === "Dashboard" && <Dashboard darkMode={darkMode} />}
        {present === "Analytics" && <Analytics darkMode={darkMode} />}
        {present === "Trades" && <Trades darkMode={darkMode} />}
        {present === "Settings" && <Settings darkMode={darkMode} />}
      </div>
    </div>
  );
}

export default AdminDashboard;
