import React, { useState, useEffect } from "react";
import axios from "axios"; // or use fetch
import { useNavigate } from "react-router-dom";

// Icons for transaction types (you can use any icon library like Heroicons or FontAwesome)
const TransactionIcon = ({ type }) => {
  const iconClass = "h-6 w-6";
  switch (type) {
    case "deposit_money":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={iconClass}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
    case "withdraw_money":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={iconClass}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
    case "transfer_money":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={iconClass}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
    default:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={iconClass}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
  }
};

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]); // State to store transactions
  const [filter, setFilter] = useState("all"); // State for active filter
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error
  const navigate = useNavigate(-1);
  // Fetch transactions from backend
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3500/api/v1/fetch/fetch-history-transaction",
          { withCredentials: true }
        ); // Replace with your API endpoint
        setTransactions(response.data.message); // Set fetched data to state
      } catch (err) {
        setError(err.message); // Set error message
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchTransactions();
  }, []);

  // Filter transactions based on the selected filter
  const filteredTransactions = transactions.filter((transaction) => {
    if (filter === "all") return true;
    return transaction.type.includes(filter);
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-8">Loading...</div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white p-8">Error: {error}</div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="flex items-center text-3xl font-bold mb-8">
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
        &nbsp;&nbsp;Transaction History
      </h1>

      {/* Filter Buttons */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg ${
            filter === "all"
              ? "bg-blue-600 text-white"
              : "bg-gray-800 text-gray-400"
          } hover:bg-blue-600 hover:text-white transition-colors`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("deposit")}
          className={`px-4 py-2 rounded-lg ${
            filter === "deposit"
              ? "bg-green-600 text-white"
              : "bg-gray-800 text-gray-400"
          } hover:bg-green-600 hover:text-white transition-colors`}
        >
          Deposit
        </button>
        <button
          onClick={() => setFilter("withdraw")}
          className={`px-4 py-2 rounded-lg ${
            filter === "withdraw"
              ? "bg-red-600 text-white"
              : "bg-gray-800 text-gray-400"
          } hover:bg-red-600 hover:text-white transition-colors`}
        >
          Withdraw
        </button>
        <button
          onClick={() => setFilter("transfer")}
          className={`px-4 py-2 rounded-lg ${
            filter === "transfer"
              ? "bg-purple-600 text-white"
              : "bg-gray-800 text-gray-400"
          } hover:bg-purple-600 hover:text-white transition-colors`}
        >
          Transfer
        </button>
      </div>

      {/* Transaction List */}
      <div className="space-y-6">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction, index) => (
            <div key={index} className="flex items-start space-x-4">
              {/* Icon */}
              <div className="flex-shrink-0 p-3 bg-gray-800 rounded-full">
                <TransactionIcon type={transaction.type} />
              </div>
              {/* Transaction Details */}
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold capitalize">
                    {transaction.type.replace(/_/g, " ")}
                  </h3>
                  <p
                    className={`text-lg font-bold ${
                      transaction.type.includes("deposit")
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {transaction.type.includes("deposit") ? "+" : "-"}
                    {transaction.amount} {transaction.currency}
                  </p>
                </div>
                <p className="text-sm text-gray-400">
                  {new Date(transaction.date).toLocaleString()}
                </p>
                {transaction.recipientId && (
                  <p className="text-sm text-gray-400 mt-1">
                    To:{" "}
                    <span className="text-blue-400">
                      {transaction.recipientId}
                    </span>
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-400 text-lg">No transactions found.</p>
            <p className="text-gray-500 text-sm">
              Start making transactions to see them here!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
