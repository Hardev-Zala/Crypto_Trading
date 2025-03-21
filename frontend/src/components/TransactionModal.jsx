import React, { useState } from "react";
import { XIcon } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const TransactionModal = ({ isOpen, onClose }) => {
  const [action, setAction] = useState("deposit"); // deposit, withdraw, transfer
  const [type, setType] = useState("money"); // money, currency
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [recipientId, setRecipientId] = useState("");
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle transaction logic here
    const transactionData = {
      amount: parseFloat(amount),
      currency,
      type: type === "money" ? "money" : "currency",
      recipientId: action === "transfer" ? recipientId : undefined,
    };

    let endpoint;
    switch (action) {
      case "deposit":
        endpoint = "http://localhost:3500/api/v1/auth/deposit";
        break;
      case "withdraw":
        endpoint = "http://localhost:3500/api/v1/auth/withdraw";
        break;
      case "transfer":
        endpoint = "http://localhost:3500/api/v1/auth/transfer";
        break;
      default:
        console.error("Invalid action");
        return;
    }

    try {
      const response = await axios.post(endpoint, transactionData, {
        withCredentials: true,
      });

      if (response.data.success) {
        toast.success(response.data.message || "Transaction successful!");
      } else {
        toast.error(response.data.error || "Transaction failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        error.response?.data?.error || "An error occurred. Please try again."
      );
    }
    // console.log({ action, type, amount, currency, recipientId });
    // setMessage("Transaction successful!");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl shadow-2xl w-11/12 md:w-1/2 lg:w-1/3 p-6 relative overflow-hidden">
        {/* Gradient Border Effect */}
        <div className="absolute inset-0 border-2 border-transparent rounded-xl bg-gradient-to-br from-purple-600 to-blue-500 opacity-20 pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200"
        >
          <XIcon size={24} />
        </button>

        {/* Modal Header */}
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
          Transaction
        </h2>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Action Selection */}
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setAction("deposit")}
              className={`flex-1 py-2 rounded-lg transition-all duration-300 ${
                action === "deposit"
                  ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              Deposit
            </button>
            <button
              type="button"
              onClick={() => setAction("withdraw")}
              className={`flex-1 py-2 rounded-lg transition-all duration-300 ${
                action === "withdraw"
                  ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              Withdraw
            </button>
            <button
              type="button"
              onClick={() => setAction("transfer")}
              className={`flex-1 py-2 rounded-lg transition-all duration-300 ${
                action === "transfer"
                  ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              Transfer
            </button>
          </div>

          {/* Type Selection */}
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setType("money")}
              className={`flex-1 py-2 rounded-lg transition-all duration-300 ${
                type === "money"
                  ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              Money
            </button>
            <button
              type="button"
              onClick={() => setType("currency")}
              className={`flex-1 py-2 rounded-lg transition-all duration-300 ${
                type === "currency"
                  ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              Currency
            </button>
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <label className="text-gray-300">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter amount"
              required
            />
          </div>

          {/* Currency Selection */}
          <div className="space-y-2">
            <label className="text-gray-300">Currency</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="USD">USD</option>
              <option value="BTC">Bitcoin (BTC)</option>
              <option value="ETH">Ethereum (ETH)</option>
              <option value="USDT">Tether (USDT)</option>
            </select>
          </div>

          {/* Recipient ID (for Transfer) */}
          {action === "transfer" && (
            <div className="space-y-2">
              <label className="text-gray-300">Recipient ID</label>
              <input
                type="text"
                value={recipientId}
                onChange={(e) => setRecipientId(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter recipient ID"
                required
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-2 rounded-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-300"
          >
            {action.charAt(0).toUpperCase() + action.slice(1)}
          </button>
        </form>

        {/* Message Display */}
        {/* {message && (
          <div className="mt-4 p-3 bg-green-900/20 border border-green-500/30 rounded-lg text-green-400 text-center">
            {message}
          </div>
        )} */}
      </div>
    </div>
  );
};

export default TransactionModal;
