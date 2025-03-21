import React, { useState, useEffect } from "react";
import TradingChart from "../components/Trade/TradingChart";
import OrdersList from "../components/Trade/OrdersList";
import { useUserAuthStore } from "../store/UserAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// List of available symbols
const symbols = [
  "BINANCE:BTCUSDT",
  "BINANCE:ETHUSDT",
  "BINANCE:BNBUSDT",
  "BINANCE:DOGEUSDT",
  "BINANCE:SOLUSDT",
  "BINANCE:ADAUSDT",
  "BINANCE:XRPUSDT",
];

const TradingPage = () => {
  const { user } = useUserAuthStore();
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [selectedSymbol, setSelectedSymbol] = useState(symbols[0]); // Default symbol
  const [currentPrice, setCurrentPrice] = useState(0);
  const [orders, setOrders] = useState([]); // State to manage orders
  const [balance, setBalance] = useState(0);
  // Fetch orders when the component mounts or when a new order is placed/closed
  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3500/api/v1/p2p/orders/${userId}`
      );
      if (response.data && Array.isArray(response.data.orders)) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const fetchBalance = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3500/api/v1/auth/fetch-profile",
        { withCredentials: true }
      );
      setBalance(response.data.Profile.balance);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    fetchOrders(); // Fetch orders on component mount
    fetchBalance();
  }, [userId]);

  // Function to handle placing a new order
  const handlePlaceOrder = async (orderDetails) => {
    const orderedAmount = orderDetails.entry * orderDetails.amount;
    const brokerageFee = orderedAmount * 0.001; // 0.1% brokerage fee
    const totalDeduction = orderedAmount + brokerageFee;

    if (totalDeduction.toFixed(2) <= balance) {
      try {
        const response = await axios.post(
          "http://localhost:3500/api/v1/p2p/place-order",
          orderDetails
        );
        await fetchOrders(); // Re-fetch orders after placing a new order
        await fetchBalance(); // Re-fetch balance after placing a new order
        toast.success(
          `Placed Order of ${orderDetails.type}-${
            orderDetails.entry
          } (Brokerage: $${brokerageFee.toFixed(2)})`
        );
        return response.data;
      } catch (error) {
        console.error("Error placing order:", error);
        throw error;
      }
    } else {
      toast.error("Insufficient balance.");
    }
  };

  console.log("Your balance is :- ", balance);

  return (
    <div className="bg-black min-h-screen text-white p-6 flex flex-col items-center">
      <div className="w-full max-w-4xl space-y-6">
        <h1 className="flex items-center text-2xl font-bold">
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
          &nbsp;&nbsp;Trading Page
        </h1>
        {/* Symbol Selection Dropdown */}
        <div className="flex items-center space-x-4">
          <label htmlFor="symbol" className="text-lg font-semibold">
            Select Symbol:
          </label>
          <select
            id="symbol"
            value={selectedSymbol}
            onChange={(e) => setSelectedSymbol(e.target.value)}
            className="bg-gray-700 text-white p-2 rounded-lg"
          >
            {symbols.map((symbol) => (
              <option key={symbol} value={symbol}>
                {symbol}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <TradingChart
            symbol={selectedSymbol}
            userId={userId}
            setCurrentPrice={setCurrentPrice}
            handlePlaceOrder={handlePlaceOrder}
          />
          <OrdersList
            userId={userId}
            currentPrice={currentPrice}
            orders={orders}
            fetchOrders={fetchOrders}
          />
        </div>
      </div>
    </div>
  );
};

export default TradingPage;
